import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

import { getLRZColorVar } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZMapMarker.module.css";

export type LRZMapMarkerVariant =
    | "pin"
    | "dot"
    | "badge"
    | "square"
    | "diamond"
    | "hexagon"
    | "shield"
    | "star"
    | "image";

export type LRZMapMarkerTone = "solid" | "soft" | "outline";

export type LRZMapMarkerSize = "xs" | "sm" | "md" | "lg" | "xl";

export const LRZ_MAP_MARKER_SIZE_VALUES: Record<LRZMapMarkerSize, number> = {
    xs: 18,
    sm: 24,
    md: 32,
    lg: 42,
    xl: 54,
};

export type LRZMapMarkerProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "color"
> & {
    /** Nom du lieu ou de l’entrée, utilisé comme libellé accessible. */
    label: string;
    /** Précision annoncée avec le label, par exemple une commune ou un type. */
    description?: string;
    /** Silhouette cartographique du marqueur. */
    variant?: LRZMapMarkerVariant;
    /** Traitement de surface du marqueur. */
    tone?: LRZMapMarkerTone;
    /** Taille prédéfinie ou diamètre personnalisé en pixels. */
    size?: LRZMapMarkerSize | number;
    /** Couleur LRZ utilisée si aucun accent CSS n’est fourni. */
    color?: LRZColor;
    /** Accent CSS prioritaire sur la couleur LRZ. */
    accent?: string;
    /** Symbole ou pictogramme placé au cœur du marqueur. */
    symbol?: ReactNode;
    /** Facteur appliqué à la taille du symbole, entre 0.5 et 1.4. */
    symbolScale?: number;
    /** Visuel recadré dans la variante média ou au cœur d’une silhouette. */
    media?: ReactNode;
    /** Indicateur compact, par exemple un nombre de lieux regroupés. */
    badge?: ReactNode;
    /** Affiche le label directement dans la variante badge. */
    showLabel?: boolean;
    /** État actif temporaire, par exemple au survol d’une liste. */
    active?: boolean;
    /** État de sélection persistante. */
    selected?: boolean;
    /** Ajoute un halo animé, à réserver aux repères importants. */
    pulse?: boolean;
    /** Rend le marqueur décoratif plutôt qu’interactif. */
    interactive?: boolean;
};

type LRZMapMarkerStyle = CSSProperties & {
    "--lrz-map-marker-accent"?: string;
    "--lrz-map-marker-size"?: string;
    "--lrz-map-marker-symbol-scale"?: number;
};

const toSafeSize = (size: LRZMapMarkerSize | number) => {
    if (typeof size !== "number") return LRZ_MAP_MARKER_SIZE_VALUES[size];
    if (!Number.isFinite(size)) return LRZ_MAP_MARKER_SIZE_VALUES.md;

    return Math.min(96, Math.max(14, Math.round(size)));
};

const joinClassNames = (...values: Array<string | undefined | false>) =>
    values.filter(Boolean).join(" ");

const toSafeSymbolScale = (scale: number) => {
    if (!Number.isFinite(scale)) return 1;

    return Math.min(1.4, Math.max(0.5, scale));
};

export default function LRZMapMarker({
    label,
    description,
    variant = "pin",
    tone = "solid",
    size = "md",
    color,
    accent,
    symbol,
    symbolScale = 1,
    media,
    badge,
    showLabel = false,
    active = false,
    selected = false,
    pulse = false,
    interactive = true,
    className,
    style,
    type,
    disabled,
    ...buttonProps
}: LRZMapMarkerProps) {
    const accessibleLabel = description ? `${label}, ${description}` : label;
    const markerStyle: LRZMapMarkerStyle = {
        "--lrz-map-marker-accent":
            accent ?? (color ? getLRZColorVar(color) : undefined),
        "--lrz-map-marker-size": `${toSafeSize(size)}px`,
        "--lrz-map-marker-symbol-scale": toSafeSymbolScale(symbolScale),
        ...style,
    };
    const content = (
        <>
            <span className={styles.core} aria-hidden="true">
                {variant === "pin" ? (
                    <svg
                        className={styles.pinShape}
                        viewBox="0 0 64 92"
                        preserveAspectRatio="none"
                    >
                        <path d="M32 2C15.4 2 2 15.4 2 32c0 19 15 29 23 46l5 12c.8 2 3.2 2 4 0l5-12c8-17 23-27 23-46C62 15.4 48.6 2 32 2Z" />
                    </svg>
                ) : null}
                {variant === "badge" ? (
                    <svg
                        className={styles.badgeShape}
                        viewBox="0 0 64 72"
                        preserveAspectRatio="none"
                    >
                        <path d="M10 2h44c4.4 0 8 3.6 8 8v42L32 70 2 52V10c0-4.4 3.6-8 8-8Z" />
                    </svg>
                ) : null}
                {variant === "square" ? (
                    <svg
                        className={styles.squareShape}
                        viewBox="0 0 30 41"
                        preserveAspectRatio="none"
                    >
                        <path d="M24.2 2h.02A4 4 0 0 1 28 6v18.22a4 4 0 0 1-3.78 3.77H24l-.04.01h-1.62a2 2 0 0 0-1.78 1.1l-.07.14v.01l-.01.02-4.56 11.1a1 1 0 0 1-1.84 0L9.5 29.25A2 2 0 0 0 7.66 28H6a4 4 0 0 1-3.96-3.44l-.03-.3a1 1 0 0 1 0-.07l-.01-.2V6a4 4 0 0 1 4-4h18.19Z" />
                    </svg>
                ) : null}
                {variant === "diamond" ? (
                    <svg
                        className={styles.diamondShape}
                        viewBox="0 0 30 41"
                        preserveAspectRatio="none"
                    >
                        <path d="M12.2 1.16a3.97 3.97 0 0 1 5.6 0L28.85 12.2a3.99 3.99 0 0 1 .39 5.16L15.93 40.4a1 1 0 0 1-1.83.05L.69 17.24a3.97 3.97 0 0 1 .47-5.05L12.2 1.16Z" />
                    </svg>
                ) : null}
                {variant === "hexagon" ? (
                    <svg
                        className={styles.hexagonShape}
                        viewBox="0 0 30 33"
                        preserveAspectRatio="none"
                    >
                        <path d="M21.71 2c1.8 0 3.38 1.12 3.94 2.77l4.15 12.36a3.9 3.9 0 0 1-1.06 4.1L17.9 31.76a3.99 3.99 0 0 1-5.8 0L1.23 21.22a3.91 3.91 0 0 1-1.03-4.1L4.35 4.78A4.12 4.12 0 0 1 8.28 2h13.43Z" />
                    </svg>
                ) : null}
                {variant === "shield" ? (
                    <svg
                        className={styles.shieldShape}
                        viewBox="0 0 64 76"
                        preserveAspectRatio="none"
                    >
                        <path d="M0 4c12 6 23 5 32-4 9 9 20 10 32 4v23c0 20-11 36-32 47C11 63 0 47 0 27V4Z" />
                    </svg>
                ) : null}
                {variant === "star" ? (
                    <svg
                        className={styles.starShape}
                        viewBox="0 0 30 35"
                        preserveAspectRatio="none"
                    >
                        <path d="M13.12.7a2.85 2.85 0 0 1 3.76 0l.12.13 1.9 1.85a3 3 0 0 0 2.06.85l2.66.03h.19l.35.06.14.03.2.06.23.09h.01c.87.39 1.5 1.19 1.66 2.14l.03.25v.21l.04 2.64a3 3 0 0 0 .85 2.07L29.2 13a2.85 2.85 0 0 1 0 3.98l-1.87 1.9a3 3 0 0 0-.85 2.07l-.03 2.66a2.85 2.85 0 0 1-2.53 2.8l-.29.02-2.66.03a3 3 0 0 0-1.85.66l-.22.2-.19.18a3 3 0 0 0-.66.98l-.06.14-2.02 5.65-.02.05v.03l-.05.1a.57.57 0 0 1-.09.13 1 1 0 0 1-.7.4h-.12a1 1 0 0 1-.9-.61l-.01-.01v-.01l-2.05-5.72a3 3 0 0 0-.6-1l-.12-.13-.2-.19a3 3 0 0 0-1.78-.84l-.29-.01-2.65-.03a2.85 2.85 0 0 1-2.82-2.82L3.53 21c0-.79-.3-1.55-.86-2.1L.81 17l-.19-.22A2.85 2.85 0 0 1 .82 13l1.85-1.9a3 3 0 0 0 .86-2.07l.02-1.97v-.68a2.85 2.85 0 0 1 2.83-2.82l2.66-.03a3 3 0 0 0 2.06-.85L13 .83l.12-.12Z" />
                    </svg>
                ) : null}
                <span className={styles.surface}>
                    {media ? (
                        <span className={styles.media}>{media}</span>
                    ) : symbol ? (
                        <span className={styles.symbol}>{symbol}</span>
                    ) : null}
                </span>
            </span>
            {showLabel ? (
                <span className={styles.label} aria-hidden="true">
                    {label}
                </span>
            ) : null}
            {badge ? <span className={styles.badge}>{badge}</span> : null}
        </>
    );

    if (!interactive) {
        return (
            <span
                className={joinClassNames(styles.marker, className)}
                style={markerStyle}
                data-variant={variant}
                data-tone={tone}
                data-active={active || undefined}
                data-selected={selected || undefined}
                data-pulse={pulse || undefined}
                role="img"
                aria-label={accessibleLabel}
                title={buttonProps.title ?? accessibleLabel}
            >
                {content}
            </span>
        );
    }

    return (
        <button
            {...buttonProps}
            className={joinClassNames(styles.marker, className)}
            style={markerStyle}
            data-variant={variant}
            data-tone={tone}
            data-active={active || undefined}
            data-selected={selected || undefined}
            data-pulse={pulse || undefined}
            type={type ?? "button"}
            disabled={disabled}
            aria-label={buttonProps["aria-label"] ?? accessibleLabel}
            aria-pressed={selected || undefined}
            title={buttonProps.title ?? accessibleLabel}
        >
            {content}
        </button>
    );
}
