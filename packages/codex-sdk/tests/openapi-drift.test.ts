import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const packageRoot = fileURLToPath(new URL("../", import.meta.url));
const generator = fileURLToPath(
    new URL("../scripts/generate-openapi.mjs", import.meta.url),
);

describe("generated OpenAPI types", () => {
    it("match the current public contract", () => {
        expect(() =>
            execFileSync(process.execPath, [generator, "--check"], {
                cwd: packageRoot,
                stdio: "pipe",
            }),
        ).not.toThrow();
    }, 15_000);
});
