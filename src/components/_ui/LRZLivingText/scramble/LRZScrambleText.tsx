"use client";

import { useEffect, useMemo, useState } from "react";

import LRZTypography, {
    type LRZTypographyProps,
} from "@/components/_ui/LRZTypography";

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
    /** Alphabet utilisé durant le brouillage. */
    characterSet?: LRZScrambleCharacterSet;
    /** Utilise une chasse fixe pour donner un rendu plus technique. */
    mono?: boolean;
    /** Retire les espaces et retours à la ligne aux extrémités du texte. */
    trim?: boolean;
    /** Conserve les suites d’espaces et les retours à la ligne dans le rendu. */
    preserveSpaces?: boolean;
    /** Redémarre la révélation au survol ou au focus si `playing` est absent. */
    playOnHover?: boolean;
};

export type LRZScrambleCharacterSet =
    "mixte" | "upper" | "lower" | "ucfirst" | "emoji" | "symbol";

const CHARACTER_SETS = {
    mixte: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789",
    upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
    lower: "abcdefghjkmnpqrstuvwxyz",
    emoji: ["🌊", "🚲", "🏰", "🌿", "🦢", "☀️", "🍇", "🛶"],
    symbol: ["✦", "✧", "✺", "✹", "✷", "◈", "◉", "⌁"],
} as const;

function splitGraphemes(text: string) {
    if (typeof Intl.Segmenter === "function") {
        return Array.from(
            new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(text),
            ({ segment }) => segment,
        );
    }

    return Array.from(text);
}

function normalizeText(text: string, trim: boolean, preserveSpaces: boolean) {
    const trimmedText = trim ? text.trim() : text;

    return preserveSpaces ? trimmedText : trimmedText.replace(/\s+/g, " ");
}

function getScrambleCharacters(
    characterSet: LRZScrambleCharacterSet,
    index: number,
) {
    if (characterSet === "ucfirst") {
        return index === 0 ? CHARACTER_SETS.upper : CHARACTER_SETS.lower;
    }

    return CHARACTER_SETS[characterSet];
}

/** Révèle une phrase à travers un brouillage typographique. */
export default function LRZScrambleText({
    children,
    playing: controlledPlaying,
    speed = 58,
    scrambleFrames = 8,
    characterSet = "mixte",
    mono = false,
    trim = true,
    preserveSpaces = false,
    playOnHover = true,
    className,
    onBlur,
    onFocus,
    onPointerEnter,
    onPointerLeave,
    ...props
}: LRZScrambleTextProps) {
    const text = useMemo(
        () => normalizeText(children, trim, preserveSpaces),
        [children, preserveSpaces, trim],
    );
    const target = useMemo(() => splitGraphemes(text), [text]);
    const [frame, setFrame] = useState(0);
    const [hoverPlaying, setHoverPlaying] = useState(false);
    const playing = controlledPlaying ?? hoverPlaying;
    const resolvedSpeed = Number.isFinite(speed) ? Math.max(16, speed) : 58;
    const resolvedFrames = Number.isFinite(scrambleFrames)
        ? Math.max(1, Math.round(scrambleFrames))
        : 8;
    const totalFrames = target.length + resolvedFrames + 2;

    useEffect(() => {
        if (!playing) return;

        const reducedMotion =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            target.length === 0;
        let interval: number | undefined;

        const animationFrame = window.requestAnimationFrame(() => {
            setFrame(reducedMotion ? totalFrames : 0);
            if (reducedMotion) return;

            interval = window.setInterval(() => {
                setFrame((current) => {
                    if (current >= totalFrames) {
                        if (interval !== undefined) {
                            window.clearInterval(interval);
                        }
                        return current;
                    }

                    return current + 1;
                });
            }, resolvedSpeed);
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            if (interval !== undefined) window.clearInterval(interval);
        };
    }, [playing, resolvedSpeed, target.length, text, totalFrames]);

    const visibleFrame = playing ? frame : totalFrames;

    const visibleText = target
        .map((grapheme, index) => {
            if (/\s/.test(grapheme) || index < visibleFrame - resolvedFrames) {
                return grapheme;
            }

            const characters = getScrambleCharacters(characterSet, index);
            const characterIndex =
                (visibleFrame * 7 + index * 11) % characters.length;
            return characters[characterIndex];
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
            aria-label={text}
            className={[styles.root, className].filter(Boolean).join(" ")}
            data-preserve-spaces={preserveSpaces || undefined}
            data-character-set={characterSet}
            data-mono={mono || undefined}
            onBlur={(event) => {
                stopHoverPlayback();
                onBlur?.(event);
            }}
            onFocus={(event) => {
                startHoverPlayback();
                onFocus?.(event);
            }}
            onPointerEnter={(event) => {
                startHoverPlayback();
                onPointerEnter?.(event);
            }}
            onPointerLeave={(event) => {
                stopHoverPlayback();
                onPointerLeave?.(event);
            }}
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
