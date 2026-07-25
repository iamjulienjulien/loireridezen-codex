import type { ReactNode } from "react";
import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZBadge.module.css";

export type LRZBadgeProps = {
    /** Texte principal du badge, par exemple « LC » ou « Indigène ». */
    label: ReactNode;
    /** Libellé complémentaire affiché après le texte principal. */
    detail?: ReactNode;
    /** Couleur partagée de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Infobulle native facultative. */
    title?: string;
    /** Classe additionnelle pour le placement dans un composant parent. */
    className?: string;
};

export default function LRZBadge({
    label,
    detail,
    color = "galet",
    title,
    className,
}: LRZBadgeProps) {
    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;

    return (
        <span
            className={[styles.badge, className].filter(Boolean).join(" ")}
            data-color={color}
            title={title}
            style={{
                color: paletteColor,
                background: `color-mix(in srgb, ${paletteColor} 16%, transparent)`,
            }}
        >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
            {detail !== undefined ? (
                <span className={styles.detail}>{detail}</span>
            ) : null}
        </span>
    );
}
