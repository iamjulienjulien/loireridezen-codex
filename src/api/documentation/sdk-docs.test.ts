import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { headingId } from "@/app/docs/markdown";
import { SDK_DOCUMENTATION_SECTIONS } from "@/app/docs/sdk/markdown";

const rootDir = process.cwd();
const sdkGuidePath = join(rootDir, "packages", "codex-sdk", "README.md");
const sdkPackagePath = join(rootDir, "packages", "codex-sdk", "package.json");
const docsHomePath = join(rootDir, "src", "app", "docs", "page.tsx");
const apiPagePath = join(rootDir, "src", "app", "docs", "api", "page.tsx");
const apiGuidePath = join(rootDir, "docs", "api", "README.md");

const sdkGuide = readFileSync(sdkGuidePath, "utf8");
const sdkPackage = JSON.parse(readFileSync(sdkPackagePath, "utf8")) as {
    name: string;
    version: string;
    license: string;
    sideEffects: boolean;
    main: string;
    types: string;
    files: string[];
    repository: { type: string; url: string; directory: string };
    homepage: string;
    bugs: { url: string };
    keywords: string[];
    publishConfig: { access: string; registry: string };
};
const docsHome = readFileSync(docsHomePath, "utf8");
const apiPage = readFileSync(apiPagePath, "utf8");
const apiGuide = readFileSync(apiGuidePath, "utf8");

describe("SDK developer documentation", () => {
    it("publishes a substantial guide with every navigation section", () => {
        expect(sdkGuide.trim().length).toBeGreaterThan(4_000);

        const headings = new Set(
            [...sdkGuide.matchAll(/^## (.+)$/gm)].map((match) => match[1]),
        );

        for (const section of SDK_DOCUMENTATION_SECTIONS) {
            expect(headings.has(section), `missing section: ${section}`).toBe(
                true,
            );
            expect(headingId(section)).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        }
    });

    it("documents the complete client surface", () => {
        for (const method of [
            "client.api.get()",
            "client.indexes.list()",
            "client.indexes.get(index)",
            "client.entries.list(index)",
            "client.entries.get(index, slug)",
        ]) {
            expect(sdkGuide).toContain(`\`${method}\``);
        }

        expect(sdkGuide).toContain("PublishedIndexSlug");
        expect(sdkGuide).toContain("EntryCollectionResponse");
        expect(sdkGuide).toContain("CodexApiError");
        expect(sdkGuide).toContain("CodexTimeoutError");
        expect(sdkGuide).toContain("CodexResponseError");
    });

    it("sets accurate expectations for Expo, caching and distribution", () => {
        expect(sdkGuide).toMatch(/React Native\/Expo/i);
        expect(sdkGuide).toContain("AsyncStorage");
        expect(sdkGuide).toMatch(/cache hors ligne[\s\S]*appartiennent à l’application/i);
        expect(sdkGuide).toMatch(/distribuée publiquement via[\s\S]*npm/i);
        expect(sdkGuide).toContain("pnpm add @loireridezen/codex-sdk");
        expect(sdkGuide).toMatch(/localhost[\s\S]*appareil lui-même/i);
    });

    it("keeps code and content licensing explicit", () => {
        expect(sdkPackage.license).toBe("MIT");
        expect(sdkGuide).toContain("CC BY-NC-SA 4.0");
        expect(sdkGuide).toContain("tous droits réservés");
        expect(sdkGuide).toMatch(/licence MIT/i);
        expect(sdkGuide).toMatch(/media\.imageUrl[^\n]*`null`/i);
    });

    it("links the dedicated SDK guide from the documentation and API", () => {
        expect(docsHome).toContain('href: "/docs/sdk"');
        expect(apiPage).toContain('href="/docs/sdk"');
        expect(apiGuide).toContain(
            "https://codex.loireridezen.bike/docs/sdk",
        );
    });

    it("keeps the package ready for a public registry", () => {
        expect(sdkPackage.name).toBe("@loireridezen/codex-sdk");
        expect(sdkPackage.version).toBe("1.0.0");
        expect(sdkPackage.sideEffects).toBe(false);
        expect(sdkPackage.main).toBe("./dist/index.js");
        expect(sdkPackage.types).toBe("./dist/index.d.ts");
        expect(sdkPackage.files).toEqual([
            "dist",
            "README.md",
            "CHANGELOG.md",
        ]);
        expect(sdkPackage.repository).toEqual({
            type: "git",
            url: "git+https://github.com/iamjulienjulien/loireridezen-codex.git",
            directory: "packages/codex-sdk",
        });
        expect(sdkPackage.homepage).toBe(
            "https://codex.loireridezen.bike/docs/sdk",
        );
        expect(sdkPackage.bugs.url).toBe(
            "https://github.com/iamjulienjulien/loireridezen-codex/issues",
        );
        expect(sdkPackage.keywords).toEqual(
            expect.arrayContaining(["typescript", "sdk", "expo", "react-native"]),
        );
        expect(sdkPackage.publishConfig.access).toBe("public");
        expect(sdkPackage.publishConfig.registry).toBe(
            "https://registry.npmjs.org/",
        );
    });
});
