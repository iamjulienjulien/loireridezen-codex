/* eslint-disable @next/next/no-img-element -- ImageResponse requires plain image elements. */
import { ImageResponse } from "next/og";

import { LRZ_CODEX_INDEX_SYMBOLS } from "@/registry/symbols";

import type { CodexOgItem } from "./og-data";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const TEXT_COLOR = "#302621";
const PAPER_COLOR = "#F8F1E6";

const loadGoogleFont = async (font: string, text: string) => {
    const cssUrl = new URL("https://fonts.googleapis.com/css2");
    cssUrl.searchParams.set("family", font);
    cssUrl.searchParams.set("text", text);

    const cssResponse = await fetch(cssUrl);

    if (!cssResponse.ok) {
        throw new Error(`Impossible de charger la police OG : ${font}.`);
    }

    const css = await cssResponse.text();
    const resource = css.match(/src:\s*url\(([^)]+)\)/u);

    if (!resource?.[1]) {
        throw new Error(`Police OG introuvable : ${font}.`);
    }

    const fontResponse = await fetch(resource[1]);

    if (!fontResponse.ok) {
        throw new Error(`Impossible de télécharger la police OG : ${font}.`);
    }

    return fontResponse.arrayBuffer();
};

const getAssetUrl = (path: string, requestUrl: string) =>
    new URL(path, requestUrl).toString();

export const renderCodexOgImage = async (
    item: CodexOgItem,
    requestUrl: string,
) => {
    const fontText = [
        "LOIRE RIDE ZEN",
        "LE CODEX LIGÉRIEN",
        item.indexTitle,
        item.title,
        item.subtitle,
        item.detail,
    ].join(" ");
    const [fraunces, jetBrainsMono] = await Promise.all([
        loadGoogleFont("Fraunces:wght@600", fontText),
        loadGoogleFont("JetBrains Mono:wght@600", fontText),
    ]);
    const indexSymbol = getAssetUrl(
        LRZ_CODEX_INDEX_SYMBOLS[item.indexSlug],
        requestUrl,
    );
    const visual = item.visual
        ? getAssetUrl(item.visual, requestUrl)
        : indexSymbol;
    const titleSize = item.title.length > 34 ? 58 : 72;

    return new ImageResponse(
        <div
            style={{
                position: "relative",
                display: "flex",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: PAPER_COLOR,
                color: TEXT_COLOR,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: -250,
                    right: -120,
                    display: "flex",
                    width: 720,
                    height: 720,
                    borderRadius: 9999,
                    background: item.accent,
                    opacity: 0.13,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    height: 12,
                    background: item.accent,
                }}
            />

            <div
                style={{
                    zIndex: 1,
                    display: "flex",
                    width: "100%",
                    margin: 36,
                    border: `2px solid ${item.accent}`,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "64%",
                        padding: "52px 56px",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={indexSymbol}
                            alt=""
                            width={56}
                            height={56}
                            style={{ objectFit: "contain" }}
                        />
                        <div
                            style={{
                                display: "flex",
                                marginLeft: 18,
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    color: item.accent,
                                    fontFamily: "JetBrains Mono",
                                    fontSize: 16,
                                    fontWeight: 600,
                                    letterSpacing: "0.17em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Index du Codex
                            </span>
                            <span
                                style={{
                                    marginTop: 7,
                                    fontFamily: "Fraunces",
                                    fontSize: 28,
                                    fontWeight: 600,
                                }}
                            >
                                {item.indexTitle}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                            style={{
                                color: item.accent,
                                fontFamily: "JetBrains Mono",
                                fontSize: 16,
                                fontWeight: 600,
                                letterSpacing: "0.17em",
                                textTransform: "uppercase",
                            }}
                        >
                            Loire Ride Zen
                        </span>
                        <span
                            style={{
                                marginTop: 18,
                                fontFamily: "Fraunces",
                                fontSize: titleSize,
                                fontWeight: 600,
                                letterSpacing: "-0.035em",
                                lineHeight: 0.97,
                            }}
                        >
                            {item.title}
                        </span>
                        <span
                            style={{
                                marginTop: 18,
                                color: "#665C55",
                                fontFamily: "Fraunces",
                                fontSize: 28,
                                fontStyle: "italic",
                                lineHeight: 1.15,
                            }}
                        >
                            {item.subtitle}
                        </span>
                    </div>

                    <span
                        style={{
                            color: item.accent,
                            fontFamily: "JetBrains Mono",
                            fontSize: 17,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                        }}
                    >
                        {item.detail}
                    </span>
                </div>

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        width: "36%",
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${item.accent}24`,
                    }}
                >
                    <img
                        src={visual}
                        alt={item.visualAlt ?? item.indexTitle}
                        width={432}
                        height={554}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: item.visualFit,
                            padding: item.visualFit === "contain" ? 52 : 0,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            right: 22,
                            bottom: 22,
                            display: "flex",
                            padding: "10px 13px",
                            background: PAPER_COLOR,
                            color: item.accent,
                            fontFamily: "JetBrains Mono",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: "0.13em",
                            textTransform: "uppercase",
                        }}
                    >
                        Le Codex Ligérien
                    </div>
                </div>
            </div>
        </div>,
        {
            width: OG_WIDTH,
            height: OG_HEIGHT,
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
};
