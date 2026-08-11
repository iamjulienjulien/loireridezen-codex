/* eslint-disable @next/next/no-img-element -- ImageResponse requires plain image elements. */
import { ImageResponse } from "next/og";

import { loadCodexOgFonts } from "@/lib/og-fonts";

export async function GET(request: Request) {
    const eyebrow = "LOIRE RIDE ZEN";
    const title = "Le Codex Ligérien";

    const logoUrl = new URL("/logo.png", request.url).toString();

    const [fraunces, jetBrainsMono] = await loadCodexOgFonts();

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
