"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type HTMLAttributes,
    type ReactNode,
} from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type {
    LRZTypographyAlign,
    LRZTypographyColor,
    LRZTypographyFont,
    LRZTypographySize,
    LRZTypographyWeight,
} from "@/components/LRZTypography";
import {
    LRZTooltip,
    type LRZTooltipAlign,
    type LRZTooltipSide,
} from "@/components/LRZTooltip";

import styles from "./LRZTextClamp.module.css";

export type LRZTextClampElement =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "strong"
    | "em"
    | "small";

export type LRZTextClampProps = Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "color"
> & {
    /** Texte à limiter. */
    children: ReactNode;
    /** Élément HTML réellement rendu. */
    as?: LRZTextClampElement;
    /** Nombre maximal de lignes visibles. */
    lines?: number;
    /** Réserve toujours la hauteur correspondant au nombre de lignes. */
    fixedHeight?: boolean;
    /** Affiche le texte complet uniquement lorsqu’il est tronqué. */
    tooltip?: boolean;
    /** Contenu remplaçant le texte complet dans le tooltip. */
    tooltipContent?: ReactNode;
    /** Position du tooltip. */
    tooltipSide?: LRZTooltipSide;
    /** Alignement du tooltip. */
    tooltipAlign?: LRZTooltipAlign;
    /** Délai d’apparition du tooltip, en millisecondes. */
    tooltipDelay?: number;
    /** Rend le tooltip hors des conteneurs susceptibles de le masquer. */
    tooltipPortal?: boolean;
    /** Famille typographique LRZ, ou héritage du parent par défaut. */
    font?: LRZTypographyFont;
    /** Taille typographique LRZ. */
    size?: LRZTypographySize;
    /** Graisse typographique. */
    weight?: LRZTypographyWeight;
    /** Couleur sémantique ou couleur LRZ. */
    color?: LRZTypographyColor;
    /** Alignement horizontal du texte. */
    align?: LRZTypographyAlign;
};

type LRZTextClampStyle = CSSProperties & {
    "--lrz-text-clamp-lines": number;
    "--lrz-text-clamp-color"?: string;
};

const SEMANTIC_COLORS: Record<
    Extract<
        LRZTypographyColor,
        "primary" | "secondary" | "tertiary" | "accent" | "inherit"
    >,
    string
> = {
    primary: "var(--color-ambiance-texte-primaire)",
    secondary: "var(--color-ambiance-texte-secondaire)",
    tertiary: "var(--color-ambiance-texte-tertiaire)",
    accent: "var(--gold)",
    inherit: "inherit",
};

function resolveColor(color: LRZTypographyColor) {
    return color in SEMANTIC_COLORS
        ? SEMANTIC_COLORS[color as keyof typeof SEMANTIC_COLORS]
        : `var(${LRZ_COLOR_VARIABLES[color as keyof typeof LRZ_COLOR_VARIABLES]})`;
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZTextClamp({
    children,
    as = "span",
    lines = 1,
    fixedHeight = false,
    tooltip = true,
    tooltipContent,
    tooltipSide = "top",
    tooltipAlign = "center",
    tooltipDelay = 120,
    tooltipPortal = true,
    font,
    size,
    weight,
    color,
    align,
    className,
    style,
    ...props
}: LRZTextClampProps) {
    const Component = as;
    const textRef = useRef<HTMLSpanElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);
    const resolvedLines = Number.isFinite(lines)
        ? Math.max(1, Math.floor(lines))
        : 1;

    const measureOverflow = useCallback(() => {
        const element = textRef.current;
        if (!element) return;

        const nextIsTruncated =
            element.scrollHeight > element.clientHeight + 1 ||
            element.scrollWidth > element.clientWidth + 1;

        setIsTruncated((current) =>
            current === nextIsTruncated ? current : nextIsTruncated,
        );
    }, []);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        let active = true;
        const frame = requestAnimationFrame(measureOverflow);
        const observer = new ResizeObserver(measureOverflow);
        observer.observe(element);

        void document.fonts?.ready.then(() => {
            if (active) measureOverflow();
        });

        return () => {
            active = false;
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [children, measureOverflow, resolvedLines]);

    const hasTooltip = tooltip && isTruncated;
    const clampStyle: LRZTextClampStyle = {
        "--lrz-text-clamp-lines": resolvedLines,
        ...(color
            ? { "--lrz-text-clamp-color": resolveColor(color) }
            : undefined),
        ...style,
    };

    return (
        <Component
            {...props}
            className={joinClassNames(styles.root, className)}
            data-align={align}
            data-fixed-height={fixedHeight || undefined}
            data-font={font}
            data-lines={resolvedLines}
            data-size={size}
            data-truncated={isTruncated || undefined}
            data-weight={weight}
            style={clampStyle}
        >
            <LRZTooltip
                className={styles.tooltipRoot}
                content={tooltipContent ?? children}
                side={tooltipSide}
                align={tooltipAlign}
                delay={tooltipDelay}
                disabled={!hasTooltip}
                portal={tooltipPortal}
            >
                <span
                    className={styles.text}
                    data-fixed-height={fixedHeight || undefined}
                    ref={textRef}
                    tabIndex={hasTooltip ? 0 : undefined}
                >
                    {children}
                </span>
            </LRZTooltip>
        </Component>
    );
}
