// LRZSeparateur.tsx

import type { CSSProperties, ElementType, ReactNode } from "react";
import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZSeparateur.module.css";

export type LRZSeparateurScope = "section" | "content";

export type LRZSeparateurPreset =
    "simple" | "spark" | "diamond" | "dot" | "ornament" | "fade" | "none";

export type LRZSeparateurOrientation = "horizontal" | "vertical";

export type LRZSeparateurAlign = "start" | "center" | "end";

export type LRZSeparateurSize = "xs" | "sm" | "md" | "lg" | "xl";

export type LRZSeparateurWeight = "hairline" | "thin" | "regular";

export type LRZSeparateurTone = "subtle" | "muted" | "normal" | "strong";

export type LRZSeparateurProps = {
    /**
     * Contexte d’utilisation du séparateur.
     *
     * `section` ajoute davantage de respiration et limite la largeur.
     * `content` produit une séparation plus compacte dans un bloc.
     */
    scope?: LRZSeparateurScope;

    /** Composition visuelle prédéfinie. */
    preset?: LRZSeparateurPreset;

    /** Orientation du séparateur. */
    orientation?: LRZSeparateurOrientation;

    /**
     * Taille globale.
     *
     * Lorsque cette prop est absente, la taille dépend du scope :
     * `lg` pour une section, `sm` pour du contenu.
     */
    size?: LRZSeparateurSize;

    /** Épaisseur des traits. */
    weight?: LRZSeparateurWeight;

    /**
     * Intensité visuelle.
     *
     * Lorsque cette prop est absente, la tonalité dépend du scope :
     * `muted` pour une section, `subtle` pour du contenu.
     */
    tone?: LRZSeparateurTone;

    /** Couleur issue de la palette Loire Ride Zen. */
    color?: LRZColor;

    /** Alignement du motif et des lignes dans l’espace disponible. */
    align?: LRZSeparateurAlign;

    /**
     * Ornement personnalisé placé au centre.
     *
     * Il remplace automatiquement celui du preset.
     */
    ornament?: ReactNode;

    /**
     * Libellé court placé au centre.
     *
     * Il est prioritaire sur `ornament` et sur le motif du preset.
     */
    label?: ReactNode;

    /** Longueur maximale du séparateur. */
    maxWidth?: CSSProperties["maxWidth"];

    /** Longueur minimale de chaque segment. */
    minLineLength?: CSSProperties["minWidth"];

    /** Espace entre les traits et le contenu central. */
    gap?: CSSProperties["gap"];

    /** Marge extérieure sur l’axe principal de la page. */
    marginBlock?: CSSProperties["marginBlock"];

    /** Ajoute un fondu aux extrémités des traits. */
    fadeEdges?: boolean;

    /** Masque totalement le séparateur sur mobile. */
    hideOnMobile?: boolean;

    /** Réduit automatiquement ses proportions sur mobile. */
    compactOnMobile?: boolean;

    /** Élément HTML ou composant utilisé comme racine. */
    as?: ElementType;

    /** Identifiant HTML, notamment utilisable comme ancre. */
    id?: string;

    /** Classe additionnelle pour le placement dans un parent. */
    className?: string;

    /** Styles additionnels appliqués à la racine. */
    style?: CSSProperties;

    /**
     * Nom accessible facultatif.
     *
     * Sans libellé ni nom accessible, le séparateur est considéré
     * comme purement décoratif.
     */
    ariaLabel?: string;
};

type LRZSeparateurStyle = CSSProperties & {
    "--separator-color"?: string;
    "--separator-max-width"?: string;
    "--separator-min-line-length"?: string;
    "--separator-gap"?: string;
    "--separator-margin-block"?: string;
};

function toCssLength(
    value:
        | CSSProperties["maxWidth"]
        | CSSProperties["minWidth"]
        | CSSProperties["gap"]
        | CSSProperties["marginBlock"]
        | undefined,
) {
    if (value === undefined) {
        return undefined;
    }

    return typeof value === "number" ? `${value}px` : String(value);
}

function SparkOrnament() {
    return (
        <svg
            className={styles.presetIcon}
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M10 1.5c.62 4.84 3.66 7.88 8.5 8.5-4.84.62-7.88 3.66-8.5 8.5C9.38 13.66 6.34 10.62 1.5 10 6.34 9.38 9.38 6.34 10 1.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

function DiamondOrnament() {
    return (
        <svg
            className={styles.presetIcon}
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M10 2.75 17.25 10 10 17.25 2.75 10 10 2.75Z"
                fill="currentColor"
            />
        </svg>
    );
}

function DotOrnament() {
    return <span className={styles.dotOrnament} aria-hidden="true" />;
}

function DefaultOrnament() {
    return (
        <svg
            className={styles.presetIcon}
            viewBox="0 0 24 20"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M12 2.25c.58 3.88 2.87 6.18 6.75 6.75-3.88.58-6.17 2.87-6.75 6.75C11.42 11.87 9.13 9.58 5.25 9 9.13 8.43 11.42 6.13 12 2.25Z"
                fill="currentColor"
            />
            <circle
                cx="20.25"
                cy="4.25"
                r="1.25"
                fill="currentColor"
                opacity="0.72"
            />
            <circle
                cx="3.75"
                cy="14.75"
                r="1"
                fill="currentColor"
                opacity="0.52"
            />
        </svg>
    );
}

function PresetOrnament({ preset }: { preset: LRZSeparateurPreset }) {
    switch (preset) {
        case "spark":
            return <SparkOrnament />;

        case "diamond":
            return <DiamondOrnament />;

        case "dot":
            return <DotOrnament />;

        case "ornament":
            return <DefaultOrnament />;

        case "simple":
        case "fade":
        case "none":
        default:
            return null;
    }
}

export default function LRZSeparateur({
    scope = "content",
    preset = "simple",
    orientation = "horizontal",
    size,
    weight = "hairline",
    tone,
    color = "galet",
    align = "center",
    ornament,
    label,
    maxWidth,
    minLineLength,
    gap,
    marginBlock,
    fadeEdges = false,
    hideOnMobile = false,
    compactOnMobile = true,
    as: Component = "div",
    id,
    className,
    style,
    ariaLabel,
}: LRZSeparateurProps) {
    const resolvedSize = size ?? (scope === "section" ? "lg" : "sm");

    const resolvedTone = tone ?? (scope === "section" ? "muted" : "subtle");

    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;

    const customStyle: LRZSeparateurStyle = {
        ...style,
        "--separator-color": paletteColor,
        "--separator-max-width": toCssLength(maxWidth),
        "--separator-min-line-length": toCssLength(minLineLength),
        "--separator-gap": toCssLength(gap),
        "--separator-margin-block": toCssLength(marginBlock),
    };

    const customCenterContent =
        label !== undefined
            ? label
            : ornament !== undefined
              ? ornament
              : undefined;

    const presetHasCenter =
        preset === "spark" ||
        preset === "diamond" ||
        preset === "dot" ||
        preset === "ornament";

    const hasCenter = customCenterContent !== undefined || presetHasCenter;

    const isDecorative = ariaLabel === undefined && label === undefined;

    const rootClassName = [styles.separator, className]
        .filter(Boolean)
        .join(" ");

    if (preset === "none") {
        return (
            <Component
                id={id}
                className={rootClassName}
                data-scope={scope}
                data-preset={preset}
                data-orientation={orientation}
                data-size={resolvedSize}
                data-weight={weight}
                data-tone={resolvedTone}
                data-align={align}
                data-fade-edges={fadeEdges}
                data-hide-mobile={hideOnMobile}
                data-compact-mobile={compactOnMobile}
                role={isDecorative ? undefined : "separator"}
                aria-label={ariaLabel}
                aria-orientation={isDecorative ? undefined : orientation}
                aria-hidden={isDecorative ? true : undefined}
                style={customStyle}
            />
        );
    }

    return (
        <Component
            id={id}
            className={rootClassName}
            data-scope={scope}
            data-preset={preset}
            data-orientation={orientation}
            data-size={resolvedSize}
            data-weight={weight}
            data-tone={resolvedTone}
            data-align={align}
            data-has-center={hasCenter}
            data-fade-edges={fadeEdges || preset === "fade"}
            data-hide-mobile={hideOnMobile}
            data-compact-mobile={compactOnMobile}
            role={isDecorative ? undefined : "separator"}
            aria-label={ariaLabel}
            aria-orientation={isDecorative ? undefined : orientation}
            aria-hidden={isDecorative ? true : undefined}
            style={customStyle}
        >
            <span
                className={[styles.line, styles.lineBefore].join(" ")}
                aria-hidden="true"
            />

            {hasCenter ? (
                <span className={styles.center}>
                    {label !== undefined ? (
                        <span className={styles.label}>{label}</span>
                    ) : ornament !== undefined ? (
                        <span className={styles.customOrnament}>
                            {ornament}
                        </span>
                    ) : (
                        <PresetOrnament preset={preset} />
                    )}
                </span>
            ) : null}

            <span
                className={[styles.line, styles.lineAfter].join(" ")}
                aria-hidden="true"
            />
        </Component>
    );
}
