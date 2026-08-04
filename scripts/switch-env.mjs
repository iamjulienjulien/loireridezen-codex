import { copyFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const ENVIRONMENT_FILES = {
    development: ".env.development",
    production: ".env.production",
};

const environment = process.argv[2];
const sourceFile = ENVIRONMENT_FILES[environment];

if (!sourceFile) {
    console.error(
        "Environnement invalide. Utilise « development » ou « production ».",
    );
    process.exitCode = 1;
} else {
    const workspaceRoot = process.cwd();
    const sourcePath = resolve(workspaceRoot, sourceFile);
    const destinationPath = resolve(workspaceRoot, ".env.local");

    try {
        const sourceStats = await stat(sourcePath);
        if (!sourceStats.isFile()) {
            throw new Error(`${sourceFile} n’est pas un fichier.`);
        }

        await copyFile(sourcePath, destinationPath);
        console.log(`✓ Environnement ${environment} activé dans .env.local`);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(
            `Impossible d’activer l’environnement ${environment} : ${message}`,
        );
        process.exitCode = 1;
    }
}
