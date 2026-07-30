"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import styles from "./LRZTypographyPlayground.module.css";

type PlaybackMode = "auto" | "playing" | "paused";

type AnimationPlayback = {
    cycle: number;
    mode: PlaybackMode;
    playing: boolean;
};

const AnimationPlaybackContext = createContext<AnimationPlayback | null>(null);

export function useLRZAnimationPlayback() {
    const playback = useContext(AnimationPlaybackContext);

    if (!playback) {
        throw new Error(
            "useLRZAnimationPlayback doit être utilisé dans LRZAnimationCard.",
        );
    }

    return playback;
}

export type LRZAnimationCardProps = {
    children: ReactNode;
    className?: string;
    controls?: ReactNode;
    controlsPosition?: "inside" | "above";
    label: string;
};

export default function LRZAnimationCard({
    children,
    className,
    controls,
    controlsPosition = "inside",
    label,
}: LRZAnimationCardProps) {
    const [mode, setMode] = useState<PlaybackMode>("auto");
    const [cycle, setCycle] = useState(0);
    const [hovered, setHovered] = useState(false);
    const playing = mode === "playing" || (mode === "auto" && hovered);

    const togglePlayback = () => {
        if (!playing) setCycle((value) => value + 1);
        setMode(playing ? "paused" : "playing");
    };

    const playbackControl = (
        <button
            className={styles.cardPlayback}
            type="button"
            aria-label={`${playing ? "Mettre en pause" : "Lire"} l’effet ${label}`}
            aria-pressed={playing}
            onClick={togglePlayback}
        >
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            {playing ? "Pause" : "Lire"}
        </button>
    );

    return (
        <AnimationPlaybackContext value={{ cycle, mode, playing }}>
            {controlsPosition === "above" && (
                <div className={styles.animationControls}>
                    {playbackControl}
                    {controls}
                </div>
            )}
            <article
                className={[styles.animationCard, className]
                    .filter(Boolean)
                    .join(" ")}
                data-playback={mode}
                onPointerEnter={() => {
                    setHovered(true);
                    if (mode === "auto") setCycle((value) => value + 1);
                }}
                onPointerLeave={() => setHovered(false)}
            >
                {controlsPosition === "inside" && playbackControl}
                <div className={styles.animationCardContent} key={cycle}>
                    {children}
                </div>
            </article>
        </AnimationPlaybackContext>
    );
}
