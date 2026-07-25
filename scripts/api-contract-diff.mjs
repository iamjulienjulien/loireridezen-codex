import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const requiredVersion = "1.17.0";
const contractRelativePath = "public/api/v1/openapi.json";
const severityLevelsPath = join(process.cwd(), "oasdiff-levels.txt");
const releaseUrl = "https://github.com/oasdiff/oasdiff/releases/tag/v1.17.0";

class ContractDiffError extends Error {
    constructor(message, exitCode = 1) {
        super(message);
        this.exitCode = exitCode;
    }
}

const fail = (message, exitCode = 1) => {
    throw new ContractDiffError(message, exitCode);
};

const run = (command, args, options = {}) =>
    spawnSync(command, args, {
        cwd: process.cwd(),
        encoding: "utf8",
        ...options,
    });

const lowerBoundKeywords = new Set([
    "minimum",
    "exclusiveMinimum",
    "minLength",
    "minItems",
    "minProperties",
]);
const upperBoundKeywords = new Set([
    "maximum",
    "exclusiveMaximum",
    "maxLength",
    "maxItems",
    "maxProperties",
]);
const schemaMapKeywords = [
    "properties",
    "patternProperties",
    "dependentSchemas",
    "$defs",
    "definitions",
];
const schemaKeywords = [
    "items",
    "contains",
    "additionalProperties",
    "unevaluatedProperties",
    "propertyNames",
    "not",
    "if",
    "then",
    "else",
];
const schemaArrayKeywords = ["allOf", "anyOf", "oneOf", "prefixItems"];

const isObject = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const encodePointerToken = (token) =>
    String(token).replaceAll("~", "~0").replaceAll("/", "~1");

const isRestrictiveConstraintChange = (keyword, base, revision) => {
    if (lowerBoundKeywords.has(keyword)) {
        return (
            typeof revision === "number" &&
            (typeof base !== "number" || revision > base)
        );
    }
    if (upperBoundKeywords.has(keyword)) {
        return (
            typeof revision === "number" &&
            (typeof base !== "number" || revision < base)
        );
    }
    if (keyword === "pattern") {
        return typeof revision === "string" && revision !== base;
    }
    if (keyword === "multipleOf") {
        if (typeof revision !== "number" || revision === base) return false;
        if (typeof base !== "number" || base <= 0 || revision <= 0) {
            return true;
        }
        const relaxationRatio = base / revision;
        const isExactRelaxation =
            Math.abs(relaxationRatio - Math.round(relaxationRatio)) <
            Number.EPSILON * 10;
        return !isExactRelaxation;
    }
    if (keyword === "uniqueItems") {
        return revision === true && base !== true;
    }
    return false;
};

const compareSchemaObjects = (base, revision, path) => {
    const changes = [];
    if (!isObject(base) || !isObject(revision)) return changes;

    for (const key of [
        ...lowerBoundKeywords,
        ...upperBoundKeywords,
        "pattern",
        "multipleOf",
        "uniqueItems",
    ]) {
        const baseValue = base[key];
        const revisionValue = revision[key];
        const childPath = `${path}/${encodePointerToken(key)}`;

        if (isRestrictiveConstraintChange(key, baseValue, revisionValue)) {
            changes.push({
                path: childPath,
                keyword: key,
                base: baseValue,
                revision: revisionValue,
            });
        }
    }

    for (const keyword of schemaMapKeywords) {
        const baseMap = base[keyword];
        const revisionMap = revision[keyword];
        if (!isObject(baseMap) || !isObject(revisionMap)) continue;

        for (const name of Object.keys(baseMap)) {
            if (!(name in revisionMap)) continue;
            changes.push(
                ...compareSchemaObjects(
                    baseMap[name],
                    revisionMap[name],
                    `${path}/${encodePointerToken(keyword)}/${encodePointerToken(name)}`,
                ),
            );
        }
    }

    for (const keyword of schemaKeywords) {
        if (!isObject(base[keyword]) || !isObject(revision[keyword])) continue;
        changes.push(
            ...compareSchemaObjects(
                base[keyword],
                revision[keyword],
                `${path}/${encodePointerToken(keyword)}`,
            ),
        );
    }

    for (const keyword of schemaArrayKeywords) {
        const baseSchemas = base[keyword];
        const revisionSchemas = revision[keyword];
        if (!Array.isArray(baseSchemas) || !Array.isArray(revisionSchemas)) {
            continue;
        }
        const length = Math.min(baseSchemas.length, revisionSchemas.length);
        for (let index = 0; index < length; index += 1) {
            changes.push(
                ...compareSchemaObjects(
                    baseSchemas[index],
                    revisionSchemas[index],
                    `${path}/${encodePointerToken(keyword)}/${index}`,
                ),
            );
        }
    }

    return changes;
};

export const findRestrictiveConstraintChanges = (base, revision) => {
    const baseComponents = isObject(base?.components)
        ? base.components
        : undefined;
    const revisionComponents = isObject(revision?.components)
        ? revision.components
        : undefined;
    const baseSchemas = isObject(baseComponents?.schemas)
        ? baseComponents.schemas
        : {};
    const revisionSchemas = isObject(revisionComponents?.schemas)
        ? revisionComponents.schemas
        : {};
    const changes = [];

    for (const name of Object.keys(baseSchemas)) {
        if (!(name in revisionSchemas)) continue;
        changes.push(
            ...compareSchemaObjects(
                baseSchemas[name],
                revisionSchemas[name],
                `/components/schemas/${encodePointerToken(name)}`,
            ),
        );
    }

    return changes;
};

const displayValue = (value) =>
    value === undefined ? "<absent>" : JSON.stringify(value);

const parseBaseArgument = () => {
    const args = process.argv.slice(2);
    let base = process.env.API_CONTRACT_BASE;

    for (let index = 0; index < args.length; index += 1) {
        const argument = args[index];
        if (argument === "--") continue;
        if (argument === "--base") {
            const value = args[index + 1];
            if (!value || value.startsWith("--")) {
                fail("Missing Git reference after --base.");
            }
            base = value;
            index += 1;
            continue;
        }
        if (argument.startsWith("--base=")) {
            base = argument.slice("--base=".length);
            continue;
        }
        fail(`Unknown argument: ${argument}`);
    }

    if (base) return base;

    const mergeBase = run("git", ["merge-base", "HEAD", "origin/main"]);
    if (mergeBase.status !== 0 || !mergeBase.stdout.trim()) {
        fail(
            "Unable to find the merge-base of HEAD and origin/main. " +
                "Fetch origin/main or pass --base <git-ref>.",
        );
    }
    return mergeBase.stdout.trim();
};

const checkOasdiffVersion = () => {
    const result = run("oasdiff", ["--version"]);
    if (result.error?.code === "ENOENT") {
        fail(
            [
                `oasdiff ${requiredVersion} is required but was not found in PATH.`,
                `Release: ${releaseUrl}`,
                "macOS: download oasdiff_1.17.0_darwin_all.tar.gz, verify it with checksums.txt, then place oasdiff in PATH.",
                "Linux: download oasdiff_1.17.0_linux_amd64.tar.gz, verify it with checksums.txt, then place oasdiff in PATH.",
            ].join("\n"),
        );
    }
    if (result.status !== 0) {
        fail(
            `Unable to execute oasdiff --version:\n${result.stderr || result.stdout}`,
            result.status ?? 1,
        );
    }

    const detected = result.stdout.trim() || result.stderr.trim();
    const match = detected.match(/\b(\d+\.\d+\.\d+)\b/);
    if (!match || match[1] !== requiredVersion) {
        fail(
            [
                `oasdiff ${requiredVersion} is required.`,
                `Detected: ${detected || "unknown version"}`,
                `Release: ${releaseUrl}`,
                "Install the exact version manually; this script never installs tools.",
            ].join("\n"),
        );
    }
    return detected;
};

const main = () => {
    const baseReference = parseBaseArgument();
    const revisionCheck = run("git", [
        "cat-file",
        "-e",
        `${baseReference}^{commit}`,
    ]);
    if (revisionCheck.status !== 0) {
        fail(`Unknown or non-commit Git base reference: ${baseReference}`);
    }

    const oasdiffVersion = checkOasdiffVersion();
    const temporaryDirectory = mkdtempSync(join(tmpdir(), "lrz-api-contract-"));
    const baseContractPath = join(temporaryDirectory, "openapi-base.json");
    const currentContractPath = join(
        process.cwd(),
        "public",
        "api",
        "v1",
        "openapi.json",
    );

    try {
        const baseContract = run(
            "git",
            ["show", `${baseReference}:${contractRelativePath}`],
            { encoding: "buffer" },
        );
        if (baseContract.status !== 0) {
            fail(
                `Unable to read ${contractRelativePath} from ${baseReference}:\n` +
                    String(baseContract.stderr),
                baseContract.status ?? 1,
            );
        }
        writeFileSync(baseContractPath, baseContract.stdout);
        const baseDocument = JSON.parse(String(baseContract.stdout));
        const revisionDocument = JSON.parse(
            readFileSync(currentContractPath, "utf8"),
        );
        const restrictiveChanges = findRestrictiveConstraintChanges(
            baseDocument,
            revisionDocument,
        );

        console.log(`oasdiff: ${oasdiffVersion}`);
        console.log(`Base contract: ${baseReference}:${contractRelativePath}`);
        console.log(`Revision contract: HEAD:${contractRelativePath}`);

        const args = [
            "breaking",
            "--fail-on",
            "WARN",
            "--allow-external-refs=false",
            "--severity-levels",
            severityLevelsPath,
        ];
        if (process.env.GITHUB_ACTIONS === "true") {
            args.push("--format", "githubactions");
        }
        args.push(baseContractPath, currentContractPath);

        const comparison = spawnSync("oasdiff", args, {
            cwd: process.cwd(),
            stdio: "inherit",
        });
        if (comparison.error) {
            fail(`Unable to execute oasdiff: ${comparison.error.message}`);
        }

        if (restrictiveChanges.length > 0) {
            console.error(
                "\nRestrictive JSON Schema constraint changes detected " +
                    "(oasdiff 1.17.0 compatibility supplement):",
            );
            for (const change of restrictiveChanges) {
                console.error(
                    `- ${change.path}: base=${displayValue(change.base)} revision=${displayValue(change.revision)}`,
                );
            }
        }

        const oasdiffStatus = comparison.status ?? 1;
        process.exitCode =
            oasdiffStatus !== 0
                ? oasdiffStatus
                : restrictiveChanges.length > 0
                  ? 1
                  : 0;
    } finally {
        rmSync(temporaryDirectory, { recursive: true, force: true });
    }
};

if (
    process.argv[1] &&
    import.meta.url === pathToFileURL(process.argv[1]).href
) {
    try {
        main();
    } catch (error) {
        if (error instanceof ContractDiffError) {
            console.error(error.message);
            process.exitCode = error.exitCode;
        } else {
            throw error;
        }
    }
}
