import { ImageResponse } from "next/og";

async function loadGoogleFont(font: string, text: string) {
    const url =
        `https://fonts.googleapis.com/css2` +
        `?family=${encodeURIComponent(font)}` +
        `&text=${encodeURIComponent(text)}`;

    const cssResponse = await fetch(url);

    if (!cssResponse.ok) {
        throw new Error(
            `Impossible de charger Google Fonts : ${cssResponse.status}`,
        );
    }

    const css = await cssResponse.text();

    const resource = css.match(
        /src:\s*url\(([^)]+)\)\s*format\(['"]?(opentype|truetype|woff)['"]?\)/,
    );

    if (!resource?.[1]) {
        console.error("Réponse Google Fonts incompatible :", css);

        throw new Error(
            `Google Fonts n’a pas retourné de police compatible pour ${font}.`,
        );
    }

    const fontResponse = await fetch(resource[1]);

    if (!fontResponse.ok) {
        throw new Error(
            `Impossible de télécharger ${font} : ${fontResponse.status}`,
        );
    }

    return fontResponse.arrayBuffer();
}

export async function GET(request: Request) {
    const eyebrow = "LOIRE RIDE ZEN";
    const title = "Le Codex Ligérien";

    const logoUrl = new URL("/logo.png", request.url).toString();

    const [fraunces, jetBrainsMono] = await Promise.all([
        loadGoogleFont("Fraunces:wght@600", title),
        loadGoogleFont("JetBrains Mono:wght@600", eyebrow),
    ]);

    return new ImageResponse(
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#d9b787",
            }}
        >
            <img
                src={logoUrl}
                alt=""
                width={256}
                height={256}
                style={{
                    objectFit: "contain",
                    borderRadius: 128,
                }}
            />

            <div
                style={{
                    display: "flex",
                    marginTop: 28,
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: "#a87029",
                        fontFamily: "JetBrains Mono",
                        fontSize: 24,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                    }}
                >
                    {eyebrow}
                </div>

                <div
                    style={{
                        marginTop: 16,
                        color: "#34272a",
                        fontFamily: "Fraunces",
                        fontSize: 72,
                        fontWeight: 600,
                        lineHeight: 1,
                    }}
                >
                    {title}
                </div>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Fraunces",
                    data: fraunces,
                    weight: 600,
                    style: "normal",
                },
                {
                    name: "JetBrains Mono",
                    data: jetBrainsMono,
                    weight: 600,
                    style: "normal",
                },
            ],
        },
    );
}
