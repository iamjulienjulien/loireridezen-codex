"use client";

import { useEffect, useMemo, useState } from "react";

import LRZTypography, {
    type LRZTypographyProps,
} from "@/components/LRZTypography";

import styles from "./LRZScrambleText.module.css";

export type LRZScrambleTextProps = Omit<
    LRZTypographyProps,
    "children" | "motion" | "motionDelay"
> & {
    children: string;
    /** Contrôle la lecture depuis une composition parente. */
    playing?: boolean;
    /** Durée entre deux états, en millisecondes. */
    speed?: number;
    /** Nombre de caractères aléatoires visibles avant la stabilisation. */
    scrambleFrames?: number;
    /** Redémarre la révélation au survol ou au focus si `playing` est absent. */
    playOnHover?: boolean;
};

const CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function splitGraphemes(text: string) {
    if (typeof Intl.Segmenter === "function") {
        return Array.from(
            new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(text),
            ({ segment }) => segment,
        );
    }

    return Array.from(text);
}

/** Révèle une phrase à travers un brouillage typographique. */
export default function LRZScrambleText({
    children,
    playing: controlledPlaying,
    speed = 58,
    scrambleFrames = 8,
    playOnHover = true,
    className,
    ...props
}: LRZScrambleTextProps) {
    const target = useMemo(() => splitGraphemes(children), [children]);
    const [frame, setFrame] = useState(0);
    const [hoverPlaying, setHoverPlaying] = useState(false);
    const playing = controlledPlaying ?? hoverPlaying;
    const resolvedSpeed = Number.isFinite(speed) ? Math.max(16, speed) : 58;
    const resolvedFrames = Number.isFinite(scrambleFrames)
        ? Math.max(1, Math.round(scrambleFrames))
        : 8;
    const totalFrames = target.length + resolvedFrames + 2;

    useEffect(() => {
        if (!playing) {
            setFrame(totalFrames);
            return;
        }

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            target.length === 0
        ) {
            setFrame(totalFrames);
            return;
        }

        setFrame(0);
        const interval = window.setInterval(() => {
            setFrame((current) => {
                if (current >= totalFrames) {
                    window.clearInterval(interval);
                    return current;
                }

                return current + 1;
            });
        }, resolvedSpeed);

        return () => window.clearInterval(interval);
    }, [playing, resolvedSpeed, target.length, totalFrames]);

    const visibleText = target
        .map((grapheme, index) => {
            if (grapheme === " " || index < frame - resolvedFrames) {
                return grapheme;
            }

            const characterIndex =
                (frame * 7 + index * 11) % CHARACTERS.length;
            return CHARACTERS[characterIndex];
        })
        .join("");

    const startHoverPlayback = () => {
        if (controlledPlaying !== undefined || !playOnHover) return;
        setFrame(0);
        setHoverPlaying(true);
    };

    const stopHoverPlayback = () => {
        if (controlledPlaying !== undefined || !playOnHover) return;
        setHoverPlaying(false);
    };

    return (
        <LRZTypography
            {...props}
            aria-label={children}
            className={[styles.root, className].filter(Boolean).join(" ")}
            onBlur={stopHoverPlayback}
            onFocus={startHoverPlayback}
            onPointerEnter={startHoverPlayback}
            onPointerLeave={stopHoverPlayback}
            tabIndex={
                controlledPlaying === undefined && playOnHover
                    ? 0
                    : props.tabIndex
            }
        >
            <span aria-hidden="true">{visibleText}</span>
        </LRZTypography>
    );
}
