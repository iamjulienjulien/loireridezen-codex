import { readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ENVIRONMENTS = ["development", "staging", "production"];
const REGISTRY_START = "export const FEATURE_FLAGS = defineFeatureFlags({";
const REGISTRY_END = "\n});";
const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_FILE = resolve(PROJECT_ROOT, "src/registry/feature-flags.ts");

function registryBounds(source) {
    const start = source.indexOf(REGISTRY_START);
    if (start === -1)
        throw new Error("Début du registre FEATURE_FLAGS introuvable.");

    const bodyStart = start + REGISTRY_START.length;
    const bodyEnd = source.indexOf(REGISTRY_END, bodyStart);
    if (bodyEnd === -1)
        throw new Error("Fin du registre FEATURE_FLAGS introuvable.");

    return { bodyStart, bodyEnd };
}

export function parseFeatureFlags(source) {
    const { bodyStart, bodyEnd } = registryBounds(source);
    const body = source.slice(bodyStart, bodyEnd);
    const entryPattern = /^\s*([A-Za-z_$][\w$]*):\s*\[([^\]\n]*)\],/gm;
    const flags = [];

    for (const match of body.matchAll(entryPattern)) {
        const [, name, rawEnvironments] = match;
        const environments = rawEnvironments.trim()
            ? rawEnvironments.split(",").map((entry) => {
                  const environmentMatch = entry
                      .trim()
                      .match(/^"(development|staging|production)"$/);
                  if (!environmentMatch) {
                      throw new Error(
                          `Environnement non pris en charge pour ${name} : ${entry.trim()}`,
                      );
                  }
                  return environmentMatch[1];
              })
            : [];

        flags.push({ name, environments });
    }

    if (flags.length === 0) throw new Error("Aucun feature flag trouvé.");
    return flags;
}

export function updateFeatureFlagSource(
    source,
    flagName,
    environment,
    enabled,
) {
    if (!ENVIRONMENTS.includes(environment)) {
        throw new Error(`Environnement invalide : ${environment}`);
    }

    const flags = parseFeatureFlags(source);
    const flag = flags.find(({ name }) => name === flagName);
    if (!flag) throw new Error(`Feature flag inconnu : ${flagName}`);

    const environments = ENVIRONMENTS.filter((candidate) =>
        candidate === environment
            ? enabled
            : flag.environments.includes(candidate),
    );
    const { bodyStart, bodyEnd } = registryBounds(source);
    const body = source.slice(bodyStart, bodyEnd);
    const escapedName = flagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const entryPattern = new RegExp(
        `^(\\s*)${escapedName}:\\s*\\[[^\\]\\n]*\\],(.*)$`,
        "m",
    );
    const replacement = `${flagName}: [${environments.map((value) => `"${value}"`).join(", ")}],`;
    const updatedBody = body.replace(
        entryPattern,
        (_line, indentation, suffix) => `${indentation}${replacement}${suffix}`,
    );

    if (
        updatedBody === body &&
        enabled !== flag.environments.includes(environment)
    ) {
        throw new Error(`Impossible de modifier le feature flag ${flagName}.`);
    }

    return source.slice(0, bodyStart) + updatedBody + source.slice(bodyEnd);
}

function environmentSummary(environments) {
    if (environments.length === 0) return "désactivé partout";
    return environments.join(" + ");
}

function renderFlagList(flags) {
    const width = Math.max(...flags.map(({ name }) => name.length));

    console.log("\n🔥 Feature flags du Codex\n");
    for (const [index, flag] of flags.entries()) {
        console.log(
            `${String(index + 1).padStart(2)}. ${flag.name.padEnd(width)}  ${environmentSummary(flag.environments)}`,
        );
    }
}

async function saveFeatureFlag(flagName, environment, enabled) {
    const source = await readFile(REGISTRY_FILE, "utf8");
    const updatedSource = updateFeatureFlagSource(
        source,
        flagName,
        environment,
        enabled,
    );
    const fileStats = await stat(REGISTRY_FILE);
    const temporaryFile = `${REGISTRY_FILE}.tmp`;

    await writeFile(temporaryFile, updatedSource, {
        encoding: "utf8",
        mode: fileStats.mode,
    });
    await rename(temporaryFile, REGISTRY_FILE);
}

async function manageFlag(readline, flagName) {
    while (true) {
        const source = await readFile(REGISTRY_FILE, "utf8");
        const flag = parseFeatureFlags(source).find(
            ({ name }) => name === flagName,
        );
        if (!flag) throw new Error(`Feature flag inconnu : ${flagName}`);

        console.clear();
        console.log(`\n⚑ ${flag.name}\n`);
        console.log(
            `1. development  ${flag.environments.includes("development") ? "✓ actif" : "○ inactif"}`,
        );
        console.log(
            `2. production   ${flag.environments.includes("production") ? "✓ actif" : "○ inactif"}`,
        );
        console.log("\nb. Retour");

        const answer = (
            await readline.question("\nEnvironnement à activer/désactiver : ")
        )
            .trim()
            .toLowerCase();
        if (answer === "b" || answer === "retour") return;

        const environment =
            answer === "1"
                ? "development"
                : answer === "2"
                  ? "production"
                  : null;
        if (!environment) continue;

        const enabled = !flag.environments.includes(environment);
        await saveFeatureFlag(flag.name, environment, enabled);
        console.log(
            `\n✓ ${flag.name} est maintenant ${enabled ? "actif" : "inactif"} en ${environment}.`,
        );
        await readline.question("Appuie sur Entrée pour continuer…");
    }
}

async function interactiveCli() {
    const readline = createInterface({ input, output });

    try {
        while (true) {
            const source = await readFile(REGISTRY_FILE, "utf8");
            const flags = parseFeatureFlags(source);
            console.clear();
            renderFlagList(flags);
            console.log("\nq. Quitter");

            const answer = (
                await readline.question("\nChoisis un feature flag : ")
            )
                .trim()
                .toLowerCase();
            if (answer === "q" || answer === "quitter") return;

            const index = Number.parseInt(answer, 10) - 1;
            if (!Number.isInteger(index) || !flags[index]) continue;
            await manageFlag(readline, flags[index].name);
        }
    } finally {
        readline.close();
    }
}

async function main() {
    const source = await readFile(REGISTRY_FILE, "utf8");
    if (process.argv.includes("--list")) {
        renderFlagList(parseFeatureFlags(source));
        return;
    }

    if (!input.isTTY || !output.isTTY) {
        throw new Error("Le mode interactif nécessite un terminal.");
    }

    await interactiveCli();
}

const isDirectExecution =
    process.argv[1] &&
    pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution) {
    main().catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`\n✗ ${message}`);
        process.exitCode = 1;
    });
}
