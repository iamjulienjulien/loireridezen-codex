"use client";

import { useEffect, useMemo, useState } from "react";

import LRZTypography, {
    type LRZTypographyProps,
} from "@/components/_ui/LRZTypography";

import styles from "./LRZTypewriter.module.css";

export type LRZTypewriterCursor = "bar" | "block" | "underscore" | "none";

export type LRZTypewriterProps = Omit<
    LRZTypographyProps,
    "children" | "cursor" | "motion" | "motionDelay"
> & {
    children: string;
    /** Durée entre deux graphèmes, en millisecondes. */
    speed?: number;
    /** Temps d’attente avant la frappe, en millisecondes. */
    startDelay?: number;
    cursor?: LRZTypewriterCursor;
    cursorAfter?: "keep" | "hide";
    /** Démarre automatiquement la frappe au montage. */
    autoPlay?: boolean;
    /** Redémarre la frappe lorsque le texte est survolé ou focalisé. */
    playOnHover?: boolean;
    onComplete?: () => void;
};

function segmentText(text: string) {
    if (typeof Intl.Segmenter === "function") {
        const segmenter = new Intl.Segmenter("fr", {
            granularity: "grapheme",
        });

        return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }

    return Array.from(text);
}

/** Frappe progressive respectant les graphèmes et les préférences système. */
export default function LRZTypewriter({
    children,
    speed = 55,
    startDelay = 0,
    cursor = "bar",
    cursorAfter = "keep",
    autoPlay = true,
    playOnHover = false,
    onComplete,
    className,
    ...props
}: LRZTypewriterProps) {
    const graphemes = useMemo(() => segmentText(children), [children]);
    const [progress, setProgress] = useState({
        text: children,
        count: autoPlay ? 0 : graphemes.length,
    });
    const [hoverPlaying, setHoverPlaying] = useState(false);
    const playing = autoPlay || (playOnHover && hoverPlaying);
    const count = progress.text === children ? progress.count : 0;
    const complete = count >= graphemes.length;
    const visibleText = graphemes.slice(0, count).join("");
    const resolvedSpeed = Number.isFinite(speed) ? Math.max(1, speed) : 55;
    const resolvedDelay = Number.isFinite(startDelay)
        ? Math.max(0, startDelay)
        : 0;

    useEffect(() => {
        if (!playing) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        let interval: ReturnType<typeof setInterval> | undefined;

        const timeout = window.setTimeout(
            () => {
                if (reduceMotion || graphemes.length === 0) {
                    setProgress({
                        text: children,
                        count: graphemes.length,
                    });
                    onComplete?.();
                    return;
                }

                setProgress({ text: children, count: 0 });
                interval = setInterval(() => {
                    setProgress((current) => {
                        const currentCount =
                            current.text === children ? current.count : 0;
                        const nextCount = Math.min(
                            graphemes.length,
                            currentCount + 1,
                        );

                        if (nextCount === graphemes.length) {
                            if (interval) clearInterval(interval);
                            onComplete?.();
                        }

                        return { text: children, count: nextCount };
                    });
                }, resolvedSpeed);
            },
            reduceMotion ? 0 : resolvedDelay,
        );

        return () => {
            window.clearTimeout(timeout);
            if (interval) clearInterval(interval);
        };
    }, [
        children,
        graphemes,
        onComplete,
        playing,
        resolvedDelay,
        resolvedSpeed,
    ]);

    const startHoverPlayback = () => {
        if (!playOnHover) return;
        setProgress({ text: children, count: 0 });
        setHoverPlaying(true);
    };

    const stopHoverPlayback = () => {
        if (!playOnHover) return;
        setHoverPlaying(false);
        setProgress({ text: children, count: graphemes.length });
    };

    return (
        <span
            className={styles.interaction}
            onBlur={stopHoverPlayback}
            onFocus={startHoverPlayback}
            onPointerEnter={startHoverPlayback}
            onPointerLeave={stopHoverPlayback}
        >
            <LRZTypography
                {...props}
                aria-label={children}
                className={[styles.root, className].filter(Boolean).join(" ")}
                data-complete={complete || undefined}
                data-cursor={cursor}
                data-cursor-after={cursorAfter}
                data-typewriter-text={children}
                tabIndex={playOnHover ? 0 : props.tabIndex}
            >
                <span className={styles.visible} aria-hidden="true">
                    {visibleText}
                    {cursor !== "none" && (
                        <span className={styles.cursor} data-shape={cursor} />
                    )}
                </span>
            </LRZTypography>
        </span>
    );
}
