const baseUrl = "https://codex.loireridezen.bike";

async function main() {
    const response = await fetch(`${baseUrl}/api/v1/indexes/faune/entries`);
    const body = await response.json();

    if (!response.ok) {
        throw new Error(`${body.status} ${body.title}: ${body.detail}`);
    }

    for (const entry of body.data) {
        const mediaStatus =
            entry.media.imageUrl === null
                ? "sans illustration"
                : "illustration disponible — droits réservés";
        console.log(`${entry.name} (${entry.slug}) — ${mediaStatus}`);
    }
}

main().catch((error) => {
    console.error(error);
    if (typeof process !== "undefined") process.exitCode = 1;
});
