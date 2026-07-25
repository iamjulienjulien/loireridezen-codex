import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { GET as getApiRoot } from "@/app/api/v1/route";
import { GET as getEntry } from "@/app/api/v1/indexes/[index]/entries/[slug]/route";
import {
    API_DOCUMENTATION_SECTIONS,
    headingId,
} from "@/app/docs/api/markdown";
import { validatePublicResponse } from "@/api/contract/openapi-response-validator";
import {
    getPublishedEntry,
    getPublishedIndex,
} from "@/api/publication/registry";

type JsonObject = Record<string, unknown>;

process.env.SITE_URL = "https://codex.loireridezen.bike";

const rootDir = process.cwd();
const guidePath = join(rootDir, "docs", "api", "README.md");
const javascriptPath = join(
    rootDir,
    "docs",
    "api",
    "examples",
    "quickstart.js",
);
const typescriptPath = join(
    rootDir,
    "docs",
    "api",
    "examples",
    "quickstart.ts",
);
const openApiPath = join(rootDir, "public", "api", "v1", "openapi.json");
const mainReadmePath = join(rootDir, "README.md");
const brunoRootPath = join(
    rootDir,
    "bruno",
    "codex-public-api",
    "01-discovery",
    "get-api-root.yml",
);

const guide = readFileSync(guidePath, "utf8");
const javascript = readFileSync(javascriptPath, "utf8").trim();
const typescript = readFileSync(typescriptPath, "utf8").trim();
const openApi = JSON.parse(readFileSync(openApiPath, "utf8")) as JsonObject;
const mainReadme = readFileSync(mainReadmePath, "utf8");
const brunoRoot = readFileSync(brunoRootPath, "utf8");

const asObject = (value: unknown) => value as JsonObject;

const fencedBlocks = (language: string) => {
    const opening = `\`\`\`${language}\n`;
    const closing = "\n```";
    const blocks: string[] = [];
    let cursor = 0;

    while (cursor < guide.length) {
        const start = guide.indexOf(opening, cursor);
        if (start === -1) break;
        const contentStart = start + opening.length;
        const end = guide.indexOf(closing, contentStart);
        if (end === -1) break;
        blocks.push(guide.slice(contentStart, end).trim());
        cursor = end + closing.length;
    }

    return blocks;
};

const context = <T extends Record<string, string>>(params: T) =>
    ({ params: Promise.resolve(params) }) as never;

describe("developer documentation", () => {
    it("publishes the canonical guide with every navigation section", () => {
        expect(guide.trim().length).toBeGreaterThan(1_000);

        const headings = new Set(
            [...guide.matchAll(/^## (.+)$/gm)].map((match) => match[1]),
        );
        for (const section of API_DOCUMENTATION_SECTIONS) {
            expect(headings.has(section), `missing section: ${section}`).toBe(
                true,
            );
            expect(headingId(section)).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        }
    });

    it("documents the five GET operations from OpenAPI", () => {
        const expected = {
            "/api/v1": "getApiRoot",
            "/api/v1/indexes": "listIndexes",
            "/api/v1/indexes/{index}": "getIndex",
            "/api/v1/indexes/{index}/entries": "listIndexEntries",
            "/api/v1/indexes/{index}/entries/{slug}": "getIndexEntry",
        } as const;
        const paths = asObject(openApi.paths);

        for (const [path, operationId] of Object.entries(expected)) {
            expect(asObject(asObject(paths[path]).get).operationId).toBe(
                operationId,
            );
            expect(guide).toContain(`\`${operationId}\``);
            expect(guide).toContain(`\`GET ${path}\``);
        }
    });

    it("uses published resources in successful examples", () => {
        expect(getPublishedIndex("faune")).toBeDefined();
        expect(getPublishedEntry("faune", "heron-cendre")).toBeDefined();
        expect(guide).toContain(
            "/api/v1/indexes/faune/entries/heron-cendre",
        );
    });

    it("keeps the documented 404 conformant with runtime and OpenAPI", async () => {
        const jsonExamples = fencedBlocks("json").map(
            (block) => JSON.parse(block) as JsonObject,
        );
        const documentedProblem = jsonExamples.find(
            ({ status }) => status === 404,
        );
        const requestPath = "/api/v1/indexes/faune/entries/inconnu";
        const response = await getEntry(
            new Request(`https://codex.loireridezen.bike${requestPath}`),
            context({ index: "faune", slug: "inconnu" }),
        );
        const validated = await validatePublicResponse({
            method: "GET",
            openApiPath: "/api/v1/indexes/{index}/entries/{slug}",
            requestPath,
            response,
        });

        expect(documentedProblem).toEqual(validated);
    });

    it("keeps relative documentation links valid in the repository", () => {
        const links = [...guide.matchAll(/\]\(([^)]+)\)/g)].map(
            (match) => match[1],
        );
        const relativeLinks = links.filter(
            (href) => href.startsWith("./") || href.startsWith("../"),
        );

        expect(relativeLinks.length).toBeGreaterThan(0);
        for (const href of relativeLinks) {
            const target = href.split("#", 1)[0];
            expect(
                existsSync(resolve(dirname(guidePath), target)),
                `missing link target: ${href}`,
            ).toBe(true);
        }
    });

    it("uses secure public URLs and no authorization header in examples", () => {
        const insecureUrls = [...guide.matchAll(/http:\/\/[^\s)`]+/g)]
            .map(([url]) => url)
            .filter((url) => !url.startsWith("http://localhost:3000"));
        const codeBlocks = [
            ...fencedBlocks("bash"),
            ...fencedBlocks("javascript"),
            ...fencedBlocks("typescript"),
        ].join("\n");

        expect(insecureUrls).toEqual([]);
        expect(codeBlocks).not.toMatch(/authorization\s*:/i);
    });

    it("states pagination, nullability and both license policies", () => {
        expect(guide).toMatch(/ne propose pas de pagination/i);
        expect(guide).toMatch(/summary[\s\S]*media\.imageUrl[\s\S]*null/i);
        expect(guide).toContain("CC BY-NC-SA 4.0");
        expect(guide).toContain("Tous droits réservés");
        expect(guide).toMatch(/autorisation écrite/i);
    });

    it("keeps executable examples identical to their published blocks", () => {
        expect(fencedBlocks("javascript")).toContain(javascript);
        expect(fencedBlocks("typescript")).toContain(typescript);
    });

    it("advertises documentation consistently in runtime and OpenAPI", async () => {
        const runtime = await (await getApiRoot()).json();
        const schemas = asObject(asObject(openApi.components).schemas);
        const rootSchema = asObject(schemas.ApiRootResponse);
        const rootProperties = asObject(rootSchema.properties);
        const linksSchema = asObject(rootProperties.links);
        const linkProperties = asObject(linksSchema.properties);

        expect(runtime.links.documentation).toBe("/docs/api");
        expect(linksSchema.required).toContain("documentation");
        expect(asObject(linkProperties.documentation).const).toBe("/docs/api");
    });

    it("links the guide from the main README and Bruno discovery", () => {
        expect(mainReadme).toContain(
            "https://codex.loireridezen.bike/docs/api",
        );
        expect(mainReadme).toContain("docs/api/README.md");
        expect(brunoRoot).toContain(
            'expect(res.body.links.documentation).to.equal("/docs/api")',
        );
    });
});
