import type { CSSProperties, ReactNode } from "react";

import {
    LRZSymbol,
    type LRZSymbolFrame,
    type LRZSymbolPadding,
    type LRZSymbolShadow,
    type LRZSymbolShape,
} from "@/components/LRZSymbol";
import {
    getLRZSymbolDefinition,
    type LRZSymbolLocator,
} from "@/registry/symbols";
import { getLRZColorVar } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZStamp.module.css";

export type LRZStampVariant = "pill" | "badge" | "chip" | "plaque" | "seal";

export type LRZStampTone = "subtle" | "outline" | "solid" | "ghost";

export type LRZStampSize = "xs" | "sm" | "md" | "lg" | "xl";

export type LRZStampPosition = "start" | "end" | "top";

export type LRZStampPadding = "xs" | "sm" | "md" | "lg";

export type LRZStampGap = "xs" | "sm" | "md" | "lg";

export type LRZStampShadow = "none" | "soft" | "strong";

export type LRZStampFont =
    | "display"
    | "body"
    | "editorial"
    | "mono"
    | "signature"
    | "bodoni"
    | "grotesk"
    | "note";

export type LRZStampLabelSize = "xs" | "sm" | "md" | "lg" | "xl";

export const LRZ_STAMP_SIZE_VALUES: Record<LRZStampSize, number> = {
    xs: 22,
    sm: 28,
    md: 36,
    lg: 46,
    xl: 60,
};

export const LRZ_STAMP_LABEL_SIZE_VALUES: Record<LRZStampLabelSize, number> = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
};

type LRZStampSharedProps = {
    /** Remplace le nom fourni par le registre. */
    label?: ReactNode;
    /** Texte secondaire facultatif. */
    detail?: Exclude<ReactNode, boolean> | false;
    /** Silhouette générale du stamp. */
    variant?: LRZStampVariant;
    /** Intensité de la surface et de la bordure. */
    tone?: LRZStampTone;
    /** Hauteur minimale prédéfinie ou personnalisée en pixels. */
    size?: LRZStampSize | number;
    /** Couleur CSS prioritaire sur l’accent du registre. */
    accent?: string;
    /** Famille typographique utilisée par le label principal. */
    font?: LRZStampFont;
    /** Taille prédéfinie ou personnalisée du label principal en pixels. */
    labelSize?: LRZStampLabelSize | number;
    /** Couleur LRZ du label, prioritaire sur la couleur métier de l’item. */
    labelColor?: LRZColor;
    /** Position du symbole par rapport au texte. */
    symbolPosition?: LRZStampPosition;
    /** Traitement du cadre intérieur du symbole. */
    symbolFrame?: LRZSymbolFrame;
    /** Forme du cadre intérieur du symbole. */
    symbolShape?: LRZSymbolShape;
    /** Espacement intérieur du symbole. */
    symbolPadding?: LRZSymbolPadding | number;
    /** Ombre propre au symbole. */
    symbolShadow?: LRZSymbolShadow;
    /** Facteur appliqué à la taille calculée du symbole, entre 0.5 et 1.4. */
    symbolScale?: number;
    /** Ombre portée du stamp. */
    shadow?: LRZStampShadow;
    /** Espacement intérieur prédéfini ou personnalisé en pixels. */
    padding?: LRZStampPadding | number;
    /** Distance prédéfinie ou personnalisée entre symbole et texte. */
    gap?: LRZStampGap | number;
    /** Étire le composant sur toute la largeur disponible. */
    fullWidth?: boolean;
    /** Largeur maximale du composant. Les nombres sont interprétés en pixels. */
    maxWidth?: number | string;
    /** Tronque visuellement le label et le détail sur une ligne. */
    truncate?: boolean;
    /** Active le traitement lumineux associé au ton. */
    gradient?: boolean;
    /** Force une bordure en pointillés. */
    dashed?: boolean;
    /** Stratégie native de chargement de l’image. */
    loading?: "lazy" | "eager";
    /** Contenu rendu lorsque le registre ne trouve aucune définition. */
    fallback?: ReactNode;
    /** Identifiant HTML du conteneur. */
    id?: string;
    /** Infobulle native facultative. */
    title?: string;
    /** Classe additionnelle appliquée au conteneur. */
    className?: string;
    /** Styles additionnels appliqués au conteneur. */
    style?: CSSProperties;
};

export type LRZStampProps = LRZStampSharedProps & LRZSymbolLocator;

type LRZStampStyle = CSSProperties & {
    "--lrz-stamp-accent"?: string;
    "--lrz-stamp-height"?: string;
    "--lrz-stamp-padding"?: string;
    "--lrz-stamp-gap"?: string;
    "--lrz-stamp-label-color"?: string;
    "--lrz-stamp-label-size"?: string;
    "--lrz-stamp-max-width"?: string;
};

function joinClassNames(...values: Array<string | undefined | false>) {
    return values.filter(Boolean).join(" ");
}

function toSafeNumber(
    value: number,
    fallback: number,
    minimum: number,
    maximum = Number.POSITIVE_INFINITY,
) {
    if (!Number.isFinite(value)) {
        return fallback;
    }

    return Math.min(maximum, Math.max(minimum, value));
}

function toLength(value: number | string) {
    return typeof value === "number" ? `${Math.max(0, value)}px` : value;
}

export default function LRZStamp({
    collection,
    meta,
    slug,
    label,
    detail,
    variant = "pill",
    tone = "subtle",
    size = "md",
    accent,
    font = "body",
    labelSize,
    labelColor,
    symbolPosition,
    symbolFrame = "none",
    symbolShape = "rounded",
    symbolPadding = "none",
    symbolShadow = "none",
    symbolScale = 1,
    shadow = "none",
    padding = "md",
    gap = "sm",
    fullWidth = false,
    maxWidth,
    truncate = false,
    gradient,
    dashed = false,
    loading = "lazy",
    fallback = null,
    id,
    title,
    className,
    style,
}: LRZStampProps) {
    const definition = getLRZSymbolDefinition(collection, meta, slug);

    if (!definition) {
        return fallback;
    }

    const resolvedHeight =
        typeof size === "number"
            ? Math.round(toSafeNumber(size, LRZ_STAMP_SIZE_VALUES.md, 18))
            : LRZ_STAMP_SIZE_VALUES[size];
    const resolvedScale = toSafeNumber(symbolScale, 1, 0.5, 1.4);
    const symbolSize = Math.max(
        12,
        Math.round(resolvedHeight * 0.72 * resolvedScale),
    );
    const resolvedPosition =
        symbolPosition ?? (variant === "seal" ? "top" : "start");
    const resolvedGradient = gradient ?? tone !== "ghost";
    const resolvedPadding =
        typeof padding === "number"
            ? `${Math.round(toSafeNumber(padding, 0, 0))}px`
            : undefined;
    const resolvedGap =
        typeof gap === "number"
            ? `${Math.round(toSafeNumber(gap, 0, 0))}px`
            : undefined;
    const resolvedLabelSize =
        labelSize === undefined
            ? undefined
            : typeof labelSize === "number"
              ? `${Math.round(toSafeNumber(labelSize, LRZ_STAMP_LABEL_SIZE_VALUES.md, 8, 64))}px`
              : `${LRZ_STAMP_LABEL_SIZE_VALUES[labelSize]}px`;
    const resolvedStyle: LRZStampStyle = {
        ...style,
        "--lrz-stamp-accent": accent ?? definition.accent,
        "--lrz-stamp-label-color": getLRZColorVar(
            labelColor ?? definition.color,
        ),
        "--lrz-stamp-height": `${resolvedHeight}px`,
        ...(resolvedPadding ? { "--lrz-stamp-padding": resolvedPadding } : {}),
        ...(resolvedGap ? { "--lrz-stamp-gap": resolvedGap } : {}),
        ...(resolvedLabelSize
            ? { "--lrz-stamp-label-size": resolvedLabelSize }
            : {}),
        ...(maxWidth === undefined
            ? {}
            : { "--lrz-stamp-max-width": toLength(maxWidth) }),
    };
    const hasDetail = detail !== undefined && detail !== false;
    const symbolOptions = {
        size: symbolSize,
        frame: symbolFrame,
        shape: symbolShape,
        padding: symbolPadding,
        shadow: symbolShadow,
        accent: accent ?? definition.accent,
        loading,
        decorative: true as const,
    };
    const renderedSymbol =
        collection === "index" ? (
            <LRZSymbol collection="index" slug={slug} {...symbolOptions} />
        ) : collection === "faune" ? (
            <LRZSymbol
                collection="faune"
                meta={meta}
                slug={slug}
                {...symbolOptions}
            />
        ) : (
            <LRZSymbol
                collection="personnage"
                meta={meta}
                slug={slug}
                {...symbolOptions}
            />
        );

    return (
        <span
            id={id}
            className={joinClassNames(styles.stamp, className)}
            style={resolvedStyle}
            title={title}
            data-collection={collection}
            data-meta={meta}
            data-slug={slug}
            data-variant={variant}
            data-tone={tone}
            data-font={font}
            data-label-size={
                labelSize === undefined
                    ? "auto"
                    : typeof labelSize === "number"
                      ? "custom"
                      : labelSize
            }
            data-size={typeof size === "number" ? "custom" : size}
            data-position={resolvedPosition}
            data-padding={typeof padding === "number" ? "custom" : padding}
            data-gap={typeof gap === "number" ? "custom" : gap}
            data-shadow={shadow}
            data-gradient={String(resolvedGradient)}
            data-dashed={String(dashed)}
            data-full-width={String(fullWidth)}
            data-truncate={String(truncate)}
            data-has-detail={String(hasDetail)}
        >
            {renderedSymbol}
            <span className={styles.copy}>
                <span className={styles.label}>
                    {label ?? definition.label}
                </span>
                {hasDetail ? (
                    <span className={styles.detail}>{detail}</span>
                ) : null}
            </span>
        </span>
    );
}
