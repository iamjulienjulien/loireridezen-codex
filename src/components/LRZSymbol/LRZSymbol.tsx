import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import { LRZTooltip } from "@/components/LRZTooltip";
import {
    getLRZSymbolDefinition,
    LRZ_COMMON_TERRITOIRE_SYMBOL_DIMENSIONS,
    type LRZCommonTerritoireSymbolSlug,
    type LRZSymbolLocator,
} from "@/registry/symbols";

import styles from "./LRZSymbol.module.css";

export type LRZSymbolSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type LRZSymbolFrame = "none" | "subtle" | "outline" | "solid";

export type LRZSymbolShape = "square" | "rounded" | "circle";

export type LRZSymbolPadding = "none" | "xs" | "sm" | "md";

export type LRZSymbolShadow = "none" | "soft" | "strong";

export const LRZ_SYMBOL_SIZE_VALUES: Record<LRZSymbolSize, number> = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    "2xl": 96,
};

type AccessibleSymbolProps =
    | {
          /** Le symbole répète une information visible à proximité. */
          decorative?: true;
          label?: never;
      }
    | {
          /** Le symbole porte une information qui doit être annoncée. */
          decorative: false;
          label: string;
      };

type LRZSymbolSharedProps = {
    /** Taille prédéfinie ou taille personnalisée en pixels. */
    size?: LRZSymbolSize | number;
    /** Traitement visuel de la surface entourant le symbole. */
    frame?: LRZSymbolFrame;
    /** Forme du cadre. Sans effet visible lorsque frame vaut none. */
    shape?: LRZSymbolShape;
    /** Espacement intérieur prédéfini ou personnalisé en pixels. */
    padding?: LRZSymbolPadding | number;
    /** Niveau d’ombre du symbole ou de son cadre. */
    shadow?: LRZSymbolShadow;
    /** Couleur CSS utilisée par le cadre, prioritaire sur la catégorie. */
    accent?: string;
    /** Stratégie native de chargement de l’image. */
    loading?: "lazy" | "eager";
    /** Contenu rendu si aucune source ne correspond à la combinaison. */
    fallback?: ReactNode;
    /** Identifiant HTML du conteneur. */
    id?: string;
    /** Affiche le libellé résolu du registre dans une infobulle LRZ. */
    tooltip?: boolean;
    /** Infobulle native facultative. */
    title?: string;
    /** Classe additionnelle appliquée au conteneur. */
    className?: string;
    /** Styles additionnels appliqués au conteneur. */
    style?: CSSProperties;
};

export type LRZSymbolProps = LRZSymbolSharedProps &
    AccessibleSymbolProps &
    LRZSymbolLocator;

type LRZSymbolStyle = CSSProperties & {
    "--lrz-symbol-size"?: string;
    "--lrz-symbol-padding"?: string;
    "--lrz-symbol-accent"?: string;
    "--lrz-symbol-image-width"?: string;
};

function joinClassNames(...values: Array<string | undefined | false>) {
    return values.filter(Boolean).join(" ");
}

function toSafePixelValue(value: number, fallback: number, minimum: number) {
    if (!Number.isFinite(value)) {
        return fallback;
    }

    return Math.max(minimum, Math.round(value));
}

export default function LRZSymbol({
    collection,
    meta,
    slug,
    size = "md",
    frame = "none",
    shape = "rounded",
    padding,
    shadow = "none",
    accent,
    loading = "lazy",
    fallback = null,
    decorative = true,
    label,
    id,
    tooltip = false,
    title,
    className,
    style,
}: LRZSymbolProps) {
    const definition = getLRZSymbolDefinition(collection, meta, slug);

    if (!definition) {
        return fallback;
    }

    const resolvedSize =
        typeof size === "number"
            ? toSafePixelValue(size, LRZ_SYMBOL_SIZE_VALUES.md, 1)
            : LRZ_SYMBOL_SIZE_VALUES[size];
    const resolvedPadding = padding ?? (frame === "none" ? "none" : "sm");
    const customPadding =
        typeof resolvedPadding === "number"
            ? Math.min(
                  toSafePixelValue(resolvedPadding, 0, 0),
                  Math.max(0, Math.floor((resolvedSize - 2) / 2)),
              )
            : undefined;
    const territoryDimensions =
        collection === "common" && meta === "territoire"
            ? LRZ_COMMON_TERRITOIRE_SYMBOL_DIMENSIONS[
                  slug as LRZCommonTerritoireSymbolSlug
              ]
            : undefined;
    const resolvedStyle: LRZSymbolStyle = {
        ...style,
        "--lrz-symbol-size": `${resolvedSize}px`,
        "--lrz-symbol-accent": accent ?? definition.accent,
        ...(territoryDimensions
            ? {
                  "--lrz-symbol-image-width": `${(
                      (territoryDimensions.width / territoryDimensions.height) *
                      100
                  ).toFixed(4)}%`,
              }
            : {}),
        ...(customPadding === undefined
            ? {}
            : { "--lrz-symbol-padding": `${customPadding}px` }),
    };

    const resolvedLabel = label ?? definition.label;
    const symbol = (
        <span
            id={id}
            className={joinClassNames(styles.symbol, className)}
            style={resolvedStyle}
            title={title}
            data-collection={collection}
            data-meta={meta}
            data-slug={slug}
            data-size={typeof size === "number" ? "custom" : size}
            data-frame={frame}
            data-shape={shape}
            data-padding={
                typeof resolvedPadding === "number" ? "custom" : resolvedPadding
            }
            data-shadow={shadow}
            aria-hidden={decorative && !tooltip ? true : undefined}
            tabIndex={tooltip ? 0 : undefined}
        >
            <Image
                className={styles.image}
                src={definition.source}
                width={100}
                height={100}
                alt={decorative ? "" : (label ?? "")}
                loading={loading}
                draggable={false}
                unoptimized
            />
        </span>
    );

    if (!tooltip) {
        return symbol;
    }

    return (
        <LRZTooltip content={resolvedLabel} portal>
            {symbol}
        </LRZTooltip>
    );
}
