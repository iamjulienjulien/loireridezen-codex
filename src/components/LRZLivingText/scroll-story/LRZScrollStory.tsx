"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import LRZTypography, {
    type LRZTypographyProps,
} from "@/components/LRZTypography";

import styles from "../LRZLivingText.module.css";

export type LRZScrollStoryProps = Omit<LRZTypographyProps, "children"> & {
    children: string;
    /** Portion du viewport sur laquelle la phrase se révèle. */
    revealDistance?: number;
};

export default function LRZScrollStory({
    children,
    revealDistance = 0.62,
    className,
    ...props
}: LRZScrollStoryProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const words = useMemo(() => children.trim().split(/\s+/), [children]);
    const [revealedWords, setRevealedWords] = useState(0);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reducedMotion) {
            const timeout = window.setTimeout(
                () => setRevealedWords(words.length),
                0,
            );
            return () => window.clearTimeout(timeout);
        }

        let animationFrame = 0;
        const distance = Math.min(0.9, Math.max(0.25, revealDistance));

        const updateProgress = () => {
            const bounds = root.getBoundingClientRect();
            const revealStart = window.innerHeight * 0.88;
            const revealEnd = window.innerHeight * (0.88 - distance);
            const progress = Math.min(
                1,
                Math.max(
                    0,
                    (revealStart - bounds.top) / (revealStart - revealEnd),
                ),
            );

            setRevealedWords(Math.ceil(progress * words.length));
        };

        const scheduleUpdate = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(updateProgress);
        };

        updateProgress();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, [revealDistance, words]);

    return (
        <div className={styles.scrollStoryRoot} ref={rootRef}>
            <LRZTypography
                {...props}
                aria-label={children}
                className={[styles.scrollStory, className]
                    .filter(Boolean)
                    .join(" ")}
            >
                {words.map((word, index) => (
                    <span
                        aria-hidden="true"
                        className={styles.scrollWord}
                        data-revealed={index < revealedWords || undefined}
                        key={`${word}-${index}`}
                    >
                        {word}
                    </span>
                ))}
            </LRZTypography>
        </div>
    );
}
