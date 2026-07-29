"use client";

import { useMemo } from "react";

import LRZTypography from "@/components/LRZTypography";

import styles from "./LRZTypographyPlayground.module.css";

function splitGraphemes(text: string) {
    if (typeof Intl.Segmenter === "function") {
        return Array.from(
            new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(text),
            ({ segment }) => segment,
        );
    }

    return Array.from(text);
}

export function WaveText({ children }: { children: string }) {
    const graphemes = splitGraphemes(children);

    return (
        <LRZTypography
            preset="heading-2"
            as="p"
            aria-label={children}
            className={styles.waveText}
        >
            {graphemes.map((grapheme, index) => (
                <span
                    aria-hidden="true"
                    key={`${grapheme}-${index}`}
                    style={{ "--wave-index": index } as React.CSSProperties}
                >
                    {grapheme === " " ? "\u00a0" : grapheme}
                </span>
            ))}
        </LRZTypography>
    );
}

export function WaveExperiment() {
    return <WaveText>La Loire ondule</WaveText>;
}

export function TopographicText({ children }: { children: string }) {
    return (
        <LRZTypography
            preset="display"
            as="p"
            className={styles.topographicText}
        >
            {children}
        </LRZTypography>
    );
}

export function ConfluenceText({
    left,
    right,
    result,
}: {
    left: string;
    right: string;
    result: string;
}) {
    return (
        <div className={styles.confluenceText} aria-label={result}>
            <span className={styles.confluenceSource} aria-hidden="true">
                {left}
            </span>
            <span className={styles.confluenceSource} aria-hidden="true">
                {right}
            </span>
            <span className={styles.confluenceResult} aria-hidden="true">
                {result}
            </span>
        </div>
    );
}

export function MirageText({ children }: { children: string }) {
    return (
        <div className={styles.mirageText} aria-label={children}>
            <span aria-hidden="true">{children}</span>
            <span
                className={styles.mirageReflection}
                aria-hidden="true"
                data-text={children}
            >
                {children}
            </span>
        </div>
    );
}

export function PelotonText({ children }: { children: string }) {
    const graphemes = splitGraphemes(children);

    return (
        <LRZTypography
            preset="heading-1"
            as="p"
            aria-label={children}
            className={styles.pelotonText}
        >
            {graphemes.map((grapheme, index) => (
                <span
                    aria-hidden="true"
                    key={`${grapheme}-${index}`}
                    style={{ "--peloton-index": index } as React.CSSProperties}
                >
                    {grapheme === " " ? "\u00a0" : grapheme}
                </span>
            ))}
        </LRZTypography>
    );
}

export function SillageText({ children }: { children: string }) {
    return (
        <LRZTypography
            preset="heading-2"
            as="p"
            aria-label={children}
            className={styles.sillageText}
            data-text={children}
        >
            <span aria-hidden="true">{children}</span>
        </LRZTypography>
    );
}
