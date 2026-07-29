"use client";

import { useEffect, useMemo, useState } from "react";

import LRZTypography from "@/components/LRZTypography";

import { useLRZAnimationPlayback } from "./LRZAnimationCard";
import styles from "./LRZTypographyPlayground.module.css";

const SCRAMBLE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

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

export function ScrambleText({
    children,
    playing: controlledPlaying,
}: {
    children: string;
    playing?: boolean;
}) {
    const target = useMemo(() => splitGraphemes(children), [children]);
    const [frame, setFrame] = useState(0);
    const [hoverPlaying, setHoverPlaying] = useState(false);
    const playing = controlledPlaying ?? hoverPlaying;
    const totalFrames = target.length + 10;

    useEffect(() => {
        if (!playing) return;

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            target.length === 0
        ) {
            const timeout = window.setTimeout(() => setFrame(totalFrames), 0);
            return () => window.clearTimeout(timeout);
        }

        let interval: number | undefined;
        const startTimeout = window.setTimeout(() => {
            setFrame(0);
            interval = window.setInterval(() => {
                setFrame((current) => {
                    if (current >= totalFrames) {
                        if (interval) window.clearInterval(interval);
                        return current;
                    }
                    return current + 1;
                });
            }, 58);
        }, 0);

        return () => {
            window.clearTimeout(startTimeout);
            if (interval) window.clearInterval(interval);
        };
    }, [playing, target, totalFrames]);

    const visibleText = playing
        ? target
              .map((grapheme, index) => {
                  if (grapheme === " " || index < frame - 8) return grapheme;
                  const characterIndex =
                      (frame * 7 + index * 11) % SCRAMBLE_CHARACTERS.length;
                  return SCRAMBLE_CHARACTERS[characterIndex];
              })
              .join("")
        : children;

    return (
        <LRZTypography
            preset="heading-2"
            as="p"
            aria-label={children}
            className={styles.scrambleText}
            onBlur={() => setHoverPlaying(false)}
            onFocus={() => {
                if (controlledPlaying !== undefined) return;
                setFrame(0);
                setHoverPlaying(true);
            }}
            onPointerEnter={() => {
                if (controlledPlaying !== undefined) return;
                setFrame(0);
                setHoverPlaying(true);
            }}
            onPointerLeave={() => setHoverPlaying(false)}
            tabIndex={controlledPlaying === undefined ? 0 : undefined}
        >
            <span aria-hidden="true">{visibleText}</span>
        </LRZTypography>
    );
}

export function WaveExperiment() {
    return <WaveText>La Loire ondule</WaveText>;
}

export function ScrambleExperiment() {
    const { playing } = useLRZAnimationPlayback();

    return <ScrambleText playing={playing}>CODEX LIGÉRIEN</ScrambleText>;
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
