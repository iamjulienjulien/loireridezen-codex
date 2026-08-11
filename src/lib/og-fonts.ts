import { readFile } from "node:fs/promises";

const readFont = async (path: URL) => {
    const buffer = await readFile(path);
    return buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
};

const frauncesPromise = readFont(
    new URL("../assets/fonts/og/fraunces-600.ttf", import.meta.url),
);

const jetBrainsMonoPromise = readFont(
    new URL("../assets/fonts/og/jetbrains-mono-600.ttf", import.meta.url),
);

export const loadCodexOgFonts = () =>
    Promise.all([frauncesPromise, jetBrainsMonoPromise]);
