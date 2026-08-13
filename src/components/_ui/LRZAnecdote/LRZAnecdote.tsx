import type { ReactNode } from "react";
import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZAnecdote.module.css";

export type LRZAnecdoteProps = {
    /** Contenu éditorial mis en exergue. */
    children: ReactNode;
    /** Couleur d’accent partagée de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Signe décoratif placé avant le contenu. */
    mark?: ReactNode;
    /** Classe additionnelle pour le placement dans un composant parent. */
    className?: string;
};

export default function LRZAnecdote({
    children,
    color = "ocre",
    mark = "❝",
    className,
}: LRZAnecdoteProps) {
    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;

    return (
        <blockquote
            className={[styles.anecdote, className].filter(Boolean).join(" ")}
            data-color={color}
            style={{
                borderLeftColor: paletteColor,
                background: `color-mix(in srgb, ${paletteColor} 7%, transparent)`,
            }}
        >
            {mark !== null && mark !== undefined && mark !== "" ? (
                <span
                    className={styles.mark}
                    aria-hidden="true"
                    style={{ color: paletteColor }}
                >
                    {mark}
                </span>
            ) : null}
            <div className={styles.content}>{children}</div>
        </blockquote>
    );
}
