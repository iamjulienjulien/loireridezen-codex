import { readdir, stat } from "node:fs/promises";
import { extname, relative, resolve, sep } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const publicRoot = resolve(projectRoot, "public");
const largestLimit = 20;

const walk = async (directory) => {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(
        entries.map(async (entry) => {
            const path = resolve(directory, entry.name);
            return entry.isDirectory() ? walk(path) : [path];
        }),
    );

    return files.flat();
};

const formatBytes = (bytes) => {
    const units = ["o", "Ko", "Mo", "Go"];
    let value = bytes;
    let unit = 0;

    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit += 1;
    }

    return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
};

const paths = await walk(publicRoot);
const files = await Promise.all(
    paths.map(async (path) => ({
        path: relative(projectRoot, path).split(sep).join("/"),
        bytes: (await stat(path)).size,
    })),
);

const totalBytes = files.reduce((total, file) => total + file.bytes, 0);
const byFamily = new Map();
const byExtension = new Map();

for (const file of files) {
    const segments = file.path.split("/");
    const family = segments.length > 2 ? segments[1] : "racine";
    const extension = extname(file.path).toLowerCase() || "sans extension";

    byFamily.set(family, (byFamily.get(family) ?? 0) + file.bytes);
    byExtension.set(extension, (byExtension.get(extension) ?? 0) + file.bytes);
}

const printBreakdown = (title, values) => {
    console.log(`\n${title}`);
    for (const [label, bytes] of [...values].sort((a, b) => b[1] - a[1])) {
        console.log(`- ${label}: ${formatBytes(bytes)}`);
    }
};

console.log(`Public: ${files.length} fichiers · ${formatBytes(totalBytes)}`);
printBreakdown("Par famille", byFamily);
printBreakdown("Par extension", byExtension);

console.log(`\n${largestLimit} fichiers les plus lourds`);
for (const file of files
    .toSorted((a, b) => b.bytes - a.bytes)
    .slice(0, largestLimit)) {
    console.log(`- ${formatBytes(file.bytes)} · ${file.path}`);
}
