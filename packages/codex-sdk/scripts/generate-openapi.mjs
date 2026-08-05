import { mkdir, readFile, writeFile } from "node:fs/promises";
import openapiTS, { astToString } from "openapi-typescript";

const contractUrl = new URL(
    "../../../public/api/v1/openapi.json",
    import.meta.url,
);
const outputUrl = new URL("../src/generated/openapi.ts", import.meta.url);
const checkOnly = process.argv.includes("--check");
const banner = [
    "/**",
    " * Generated from public/api/v1/openapi.json by openapi-typescript.",
    " * Do not edit by hand. Run `pnpm sdk:generate` from the repository root.",
    " */",
    "",
].join("\n");

const ast = await openapiTS(contractUrl);
const generated = `${banner}${astToString(ast)}`;

if (checkOnly) {
    let current = "";

    try {
        current = await readFile(outputUrl, "utf8");
    } catch {
        // A missing generated file is reported by the comparison below.
    }

    if (current !== generated) {
        process.stderr.write(
            "Generated SDK types are out of date. Run `pnpm sdk:generate`.\n",
        );
        process.exitCode = 1;
    }
} else {
    await mkdir(new URL("../src/generated/", import.meta.url), {
        recursive: true,
    });
    await writeFile(outputUrl, generated, "utf8");
}
