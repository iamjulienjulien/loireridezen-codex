import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZTypography.module.css";

export type LRZTypographyPreset =
    | "display"
    | "heading-1"
    | "heading-2"
    | "heading-3"
    | "lede"
    | "body"
    | "body-sm"
    | "editorial"
    | "eyebrow"
    | "caption"
    | "code";

export type LRZTypographyElement =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "small"
    | "strong"
    | "em"
    | "code"
    | "blockquote"
    | "figcaption"
    | "label";

export type LRZTypographyFont =
    "display" | "body" | "mono" | "editorial" | "inherit";

export type LRZTypographySize =
    "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

export type LRZTypographyWeight = "regular" | "medium" | "semibold" | "bold";

export type LRZTypographySemanticColor =
    "primary" | "secondary" | "tertiary" | "accent" | "inherit";

export type LRZTypographyColor = LRZTypographySemanticColor | LRZColor;

export type LRZTypographyAlign = "start" | "center" | "end";

export type LRZTypographyLeading =
    "tight" | "snug" | "normal" | "relaxed" | "loose";

export type LRZTypographyTracking = "tight" | "normal" | "wide" | "wider";

export type LRZTypographyTransform =
    "none" | "uppercase" | "lowercase" | "capitalize";

export type LRZTypographyDecoration = "none" | "underline" | "line-through";

export type LRZTypographyEffect =
    | "none"
    | "gold-leaf"
    | "river"
    | "ink"
    | "highlight"
    | "engraved"
    | "outline"
    | "soft-shadow"
    | "moon-glow"
    | "foil"
    | "ink-reveal"
    | "weathered"
    | "constellation";

export type LRZTypographyMotion =
    "none" | "fade-up" | "reveal" | "tracking-in" | "typewriter";

export type LRZTypographyGradientPreset =
    "royal" | "river" | "sunset" | "forest" | "tuffeau" | "moonlight" | "ember";

export type LRZTypographyCustomGradient = {
    from: LRZColor;
    to: LRZColor;
    angle?: number;
    midpoint?: number;
};

export type LRZTypographyGradient =
    LRZTypographyGradientPreset | LRZTypographyCustomGradient;

export type LRZTypographyProps = Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "color"
> & {
    /** Contenu textuel ou enrichi. */
    children: ReactNode;
    /** Style typographique complet. */
    preset?: LRZTypographyPreset;
    /** Élément HTML réellement rendu. */
    as?: LRZTypographyElement;
    /** Famille de caractères remplaçant celle du preset. */
    font?: LRZTypographyFont;
    /** Taille remplaçant celle du preset. */
    size?: LRZTypographySize;
    /** Graisse remplaçant celle du preset. */
    weight?: LRZTypographyWeight;
    /** Couleur sémantique ou couleur de la palette LRZ. */
    color?: LRZTypographyColor;
    /** Alignement horizontal du texte. */
    align?: LRZTypographyAlign;
    /** Hauteur de ligne remplaçant celle du preset. */
    leading?: LRZTypographyLeading;
    /** Espacement des lettres remplaçant celui du preset. */
    tracking?: LRZTypographyTracking;
    /** Transformation de casse. */
    transform?: LRZTypographyTransform;
    /** Force ou retire l’italique du preset. */
    italic?: boolean;
    /** Équilibre les lignes des titres courts. */
    balance?: boolean;
    /** Empêche le retour à la ligne. */
    noWrap?: boolean;
    /** Tronque le texte sur une ligne avec une ellipse. */
    truncate?: boolean;
    /** Limite le texte à un nombre défini de lignes. */
    lineClamp?: 1 | 2 | 3 | 4;
    /** Décoration appliquée au texte. */
    decoration?: LRZTypographyDecoration;
    /** Effet visuel décoratif, indépendant du preset. */
    effect?: LRZTypographyEffect;
    /** Dégradé prédéfini ou composé avec deux couleurs LRZ. */
    gradient?: LRZTypographyGradient;
    /** Animation d’entrée, indépendante de l’effet visuel. */
    motion?: LRZTypographyMotion;
    /** Délai de l’animation d’entrée, en millisecondes. */
    motionDelay?: number;
    /** Vitesse du mouvement typewriter, en millisecondes par caractère. */
    typewriterSpeed?: number;
    /** Affiche le curseur du mouvement typewriter. */
    cursor?: boolean;
    /** Transforme la première lettre d’un texte éditorial en lettrine. */
    dropCap?: boolean;
    /** Attribut `for` disponible lorsque la racine est un label. */
    htmlFor?: string;
};

type LRZTypographyStyle = CSSProperties & {
    "--typography-color": string;
    "--typography-line-clamp"?: number;
    "--typography-motion-delay"?: string;
    "--typography-gradient-from"?: string;
    "--typography-gradient-to"?: string;
    "--typography-gradient-angle"?: string;
    "--typography-gradient-midpoint"?: string;
    "--typography-character-count"?: number;
    "--typography-typewriter-duration"?: string;
};

const DEFAULT_ELEMENTS: Record<LRZTypographyPreset, LRZTypographyElement> = {
    display: "h1",
    "heading-1": "h1",
    "heading-2": "h2",
    "heading-3": "h3",
    lede: "p",
    body: "p",
    "body-sm": "p",
    editorial: "p",
    eyebrow: "span",
    caption: "small",
    code: "code",
};

const DEFAULT_COLORS: Record<LRZTypographyPreset, LRZTypographySemanticColor> =
    {
        display: "primary",
        "heading-1": "primary",
        "heading-2": "primary",
        "heading-3": "primary",
        lede: "secondary",
        body: "primary",
        "body-sm": "secondary",
        editorial: "secondary",
        eyebrow: "accent",
        caption: "tertiary",
        code: "primary",
    };

const SEMANTIC_COLORS: Record<LRZTypographySemanticColor, string> = {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    tertiary: "var(--text-tertiary)",
    accent: "var(--gold)",
    inherit: "inherit",
};

function isSemanticColor(
    color: LRZTypographyColor,
): color is LRZTypographySemanticColor {
    return color in SEMANTIC_COLORS;
}

function resolveColor(color: LRZTypographyColor) {
    return isSemanticColor(color)
        ? SEMANTIC_COLORS[color]
        : `var(${LRZ_COLOR_VARIABLES[color]})`;
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZTypography({
    children,
    preset = "body",
    as,
    font,
    size,
    weight,
    color,
    align,
    leading,
    tracking,
    transform,
    italic,
    balance,
    noWrap = false,
    truncate = false,
    lineClamp,
    decoration,
    effect = "none",
    gradient,
    motion = "none",
    motionDelay = 0,
    typewriterSpeed = 55,
    cursor = true,
    dropCap = false,
    htmlFor,
    className,
    style,
    ...props
}: LRZTypographyProps) {
    const Component = as ?? DEFAULT_ELEMENTS[preset];
    const resolvedLineClamp = truncate ? undefined : lineClamp;
    const resolvedNoWrap = !truncate && !resolvedLineClamp && noWrap;
    const disablesBalance =
        truncate || resolvedLineClamp !== undefined || resolvedNoWrap;
    const supportsDropCap =
        Component === "p" || Component === "div" || Component === "blockquote";
    const resolvedDropCap =
        dropCap &&
        supportsDropCap &&
        !truncate &&
        resolvedLineClamp === undefined &&
        !resolvedNoWrap;
    const resolvedMotionDelay = Number.isFinite(motionDelay)
        ? Math.max(0, motionDelay)
        : 0;
    const resolvedTypewriterSpeed = Number.isFinite(typewriterSpeed)
        ? Math.max(1, typewriterSpeed)
        : 55;
    const characterCount =
        motion === "typewriter" &&
        (typeof children === "string" || typeof children === "number")
            ? Math.max(1, Array.from(String(children)).length)
            : undefined;
    const customGradient =
        gradient && typeof gradient === "object" ? gradient : undefined;
    const gradientMidpoint = customGradient
        ? Math.min(90, Math.max(10, customGradient.midpoint ?? 50))
        : undefined;
    const typographyStyle: LRZTypographyStyle = {
        "--typography-color": resolveColor(color ?? DEFAULT_COLORS[preset]),
        ...(resolvedLineClamp
            ? { "--typography-line-clamp": resolvedLineClamp }
            : undefined),
        ...(motion !== "none"
            ? { "--typography-motion-delay": `${resolvedMotionDelay}ms` }
            : undefined),
        ...(customGradient
            ? {
                  "--typography-gradient-from": `var(${LRZ_COLOR_VARIABLES[customGradient.from]})`,
                  "--typography-gradient-to": `var(${LRZ_COLOR_VARIABLES[customGradient.to]})`,
                  "--typography-gradient-angle": `${customGradient.angle ?? 105}deg`,
                  "--typography-gradient-midpoint": `${gradientMidpoint}%`,
              }
            : undefined),
        ...(characterCount
            ? {
                  "--typography-character-count": characterCount,
                  "--typography-typewriter-duration": `${characterCount * resolvedTypewriterSpeed}ms`,
              }
            : undefined),
        ...style,
    };

    return (
        <Component
            {...props}
            className={joinClassNames(styles.typography, className)}
            data-align={align}
            data-balance={
                disablesBalance
                    ? "false"
                    : balance === undefined
                      ? undefined
                      : String(balance)
            }
            data-decoration={decoration}
            data-drop-cap={resolvedDropCap || undefined}
            data-effect={effect === "none" ? undefined : effect}
            data-gradient={
                typeof gradient === "string"
                    ? gradient
                    : gradient
                      ? "custom"
                      : undefined
            }
            data-font={font}
            data-italic={italic === undefined ? undefined : String(italic)}
            data-leading={leading}
            data-line-clamp={resolvedLineClamp}
            data-motion={
                motion === "typewriter" && !characterCount
                    ? undefined
                    : motion === "none"
                      ? undefined
                      : motion
            }
            data-typewriter-cursor={
                motion === "typewriter" && characterCount && cursor
                    ? ""
                    : undefined
            }
            data-no-wrap={resolvedNoWrap || undefined}
            data-preset={preset}
            data-size={size}
            data-tracking={tracking}
            data-transform={transform}
            data-truncate={truncate || undefined}
            data-weight={weight}
            htmlFor={Component === "label" ? htmlFor : undefined}
            style={typographyStyle}
        >
            {children}
        </Component>
    );
}
