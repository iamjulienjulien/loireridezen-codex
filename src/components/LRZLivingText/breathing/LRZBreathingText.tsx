import type { CSSProperties } from "react";

import LRZTypography, {
    type LRZTypographyProps,
} from "@/components/LRZTypography";

import styles from "../LRZLivingText.module.css";

export type LRZBreathingTextProps = LRZTypographyProps & {
    rhythm?: "calm" | "river" | "sleep" | "pulse";
    intensity?: "subtle" | "medium" | "expressive";
    /** Durée d’un cycle. Le rythme choisit sa valeur si elle est omise. */
    duration?: number;
};

type BreathingStyle = CSSProperties & {
    "--breathing-duration"?: string;
};

export default function LRZBreathingText({
    rhythm = "calm",
    intensity = "subtle",
    duration,
    className,
    style,
    ...props
}: LRZBreathingTextProps) {
    const resolvedDuration =
        duration !== undefined && Number.isFinite(duration)
            ? Math.max(800, duration)
            : undefined;

    return (
        <LRZTypography
            {...props}
            className={[styles.breathing, className].filter(Boolean).join(" ")}
            data-intensity={intensity}
            data-rhythm={rhythm}
            style={
                {
                    "--breathing-duration": resolvedDuration
                        ? `${resolvedDuration}ms`
                        : undefined,
                    ...style,
                } as BreathingStyle
            }
        />
    );
}
