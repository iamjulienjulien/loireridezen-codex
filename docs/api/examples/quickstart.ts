type PublicLicenses = {
    content: {
        id: string;
        name: string;
        url: string;
        attribution: string;
    };
    media: {
        name: string;
        copyright: string;
        reuseAllowed: false;
    };
};

type ApiEnvelope<T> = {
    apiVersion: "1";
    data: T;
    meta: { license: PublicLicenses };
    links: Record<string, string>;
};

type PublicEntry = {
    id: string;
    index: "faune" | "flore" | "chateaux";
    slug: string;
    name: string;
    subtitle: string;
    summary: string | null;
    media: {
        emoji: string;
        imageUrl: string | null;
    };
    attributes: Record<string, unknown>;
};

type Problem = {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
};

const baseUrl = "https://codex.loireridezen.bike";

async function main() {
    const response = await fetch(`${baseUrl}/api/v1/indexes/faune/entries`);
    const body = (await response.json()) as
        ApiEnvelope<PublicEntry[]> | Problem;

    if (!response.ok) {
        const problem = body as Problem;
        throw new Error(
            `${problem.status} ${problem.title}: ${problem.detail}`,
        );
    }

    const envelope = body as ApiEnvelope<PublicEntry[]>;
    for (const entry of envelope.data) {
        const mediaStatus =
            entry.media.imageUrl === null
                ? "sans illustration"
                : "illustration disponible — droits réservés";

        if (entry.index === "faune") {
            const scientificName = entry.attributes.nomScientifique;
            console.log(
                entry.name,
                typeof scientificName === "string"
                    ? scientificName
                    : "(nom scientifique non renseigné)",
                mediaStatus,
            );
        } else {
            console.log(entry.name, mediaStatus);
        }
    }

    const collectionUrl = new URL(envelope.links.self, baseUrl);
    console.log(`Collection : ${collectionUrl}`);
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});

export {};
