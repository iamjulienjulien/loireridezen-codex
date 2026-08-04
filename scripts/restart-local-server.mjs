import { execFile as execFileCallback } from "node:child_process";
import { realpath } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);
const PORT = 3011;
const PROJECT_ROOT = await realpath(
    resolve(dirname(fileURLToPath(import.meta.url)), ".."),
);

async function listeningProcessIds() {
    try {
        const { stdout } = await execFile("lsof", [
            `-tiTCP:${PORT}`,
            "-sTCP:LISTEN",
        ]);

        return [
            ...new Set(
                stdout
                    .split("\n")
                    .map((value) => Number.parseInt(value, 10))
                    .filter(Number.isInteger),
            ),
        ];
    } catch (error) {
        if (error && typeof error === "object" && error.code === 1) return [];
        throw error;
    }
}

async function processWorkingDirectory(processId) {
    const { stdout } = await execFile("lsof", [
        "-a",
        "-p",
        String(processId),
        "-d",
        "cwd",
        "-Fn",
    ]);
    const directory = stdout
        .split("\n")
        .find((line) => line.startsWith("n"))
        ?.slice(1);

    return directory ? realpath(directory) : undefined;
}

async function waitUntilPortIsFree(timeoutMilliseconds = 5000) {
    const deadline = Date.now() + timeoutMilliseconds;

    while (Date.now() < deadline) {
        if ((await listeningProcessIds()).length === 0) return true;
        await new Promise((resolvePromise) => setTimeout(resolvePromise, 100));
    }

    return false;
}

try {
    const processIds = await listeningProcessIds();

    if (processIds.length === 0) {
        console.log(`✓ Aucun serveur à arrêter sur le port ${PORT}`);
    } else {
        const processes = await Promise.all(
            processIds.map(async (processId) => ({
                processId,
                workingDirectory: await processWorkingDirectory(processId),
            })),
        );
        const foreignProcess = processes.find(
            ({ workingDirectory }) => workingDirectory !== PROJECT_ROOT,
        );

        if (foreignProcess) {
            throw new Error(
                `Le port ${PORT} est utilisé par un autre projet (${foreignProcess.workingDirectory ?? "dossier inconnu"}). Arrêt annulé.`,
            );
        }

        console.log(`↻ Arrêt du serveur Codex sur le port ${PORT}…`);
        for (const { processId } of processes)
            process.kill(processId, "SIGTERM");

        if (!(await waitUntilPortIsFree())) {
            throw new Error(
                `Le serveur ne s’est pas arrêté après 5 secondes. Arrête-le manuellement avant de réessayer.`,
            );
        }

        console.log("✓ Serveur précédent arrêté");
    }
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`✗ Redémarrage impossible : ${message}`);
    process.exitCode = 1;
}
