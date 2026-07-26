import type { CSSProperties, ElementType, ReactNode } from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZCard.module.css";

export type LRZCardTone = "surface" | "soft" | "outline" | "transparent";

export type LRZCardAccent = "none" | "top" | "start";

export type LRZCardPadding = "none" | "sm" | "md" | "lg";

export type LRZCardElevation = "none" | "card" | "raised";

export type LRZCardOrientation = "vertical" | "horizontal";

export type LRZCardTitleElement = "h2" | "h3" | "h4" | "h5" | "h6";

export type LRZCardMediaRatio =
    "auto" | "square" | "portrait" | "landscape" | "wide";

export type LRZCardFooterAlign = "start" | "center" | "end" | "between";

export type LRZCardProps = {
    /** Contenu libre ou sous-composants LRZCard. */
    children: ReactNode;
    /** Élément HTML ou composant utilisé comme racine. */
    as?: ElementType;
    /** Couleur d’accent issue de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Traitement visuel de la surface. */
    tone?: LRZCardTone;
    /** Position du filet d’accent. */
    accent?: LRZCardAccent;
    /** Espacement intérieur de la racine. */
    padding?: LRZCardPadding;
    /** Niveau d’élévation visuelle. */
    elevation?: LRZCardElevation;
    /** Organisation principale de la carte. */
    orientation?: LRZCardOrientation;
    /** Étire la carte à la hauteur disponible dans une grille. */
    equalHeight?: boolean;
    /** Identifiant HTML de la carte. */
    id?: string;
    /** Nom accessible lorsque la carte ne possède pas de titre visible. */
    ariaLabel?: string;
    /** Identifiant du titre visible qui nomme la carte. */
    ariaLabelledby?: string;
    /** Classe additionnelle appliquée à la racine. */
    className?: string;
    /** Styles additionnels appliqués à la racine. */
    style?: CSSProperties;
};

export type LRZCardMediaProps = {
    /** Image, illustration, carte ou autre contenu visuel. */
    children: ReactNode;
    /** Ratio réservé à la zone visuelle. */
    ratio?: LRZCardMediaRatio;
    /** Étend le média dans le padding éventuel de la carte. */
    bleed?: boolean;
    /** Classe additionnelle appliquée à la zone média. */
    className?: string;
};

export type LRZCardHeaderProps = {
    /** Sur-titre court : époque, catégorie ou type. */
    eyebrow?: ReactNode;
    /** Titre principal de la carte. */
    title: ReactNode;
    /** Niveau HTML explicite du titre. */
    titleAs?: LRZCardTitleElement;
    /** Identifiant associé au titre. */
    titleId?: string;
    /** Sous-titre ou introduction courte. */
    description?: ReactNode;
    /** Visuel décoratif placé avant le bloc de titre. */
    icon?: ReactNode;
    /** Badges ou statuts associés au titre. */
    metadata?: ReactNode;
    /** Action placée à l’extrémité de l’en-tête. */
    action?: ReactNode;
    /** Classe additionnelle appliquée à l’en-tête. */
    className?: string;
};

export type LRZCardContentProps = {
    /** Contenu principal de la carte. */
    children: ReactNode;
    /** Espacement propre au corps de la carte. */
    padding?: LRZCardPadding;
    /** Classe additionnelle appliquée au corps. */
    className?: string;
};

export type LRZCardFooterProps = {
    /** Actions, statut ou métadonnées terminales. */
    children: ReactNode;
    /** Alignement des éléments du pied de carte. */
    align?: LRZCardFooterAlign;
    /** Affiche une séparation avant le pied de carte. */
    divided?: boolean;
    /** Classe additionnelle appliquée au pied. */
    className?: string;
};

type LRZCardStyle = CSSProperties & {
    "--card-color": string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

export function LRZCard({
    children,
    as: Component = "article",
    color = "ocre",
    tone = "surface",
    accent = "top",
    padding = "none",
    elevation = "card",
    orientation = "vertical",
    equalHeight = false,
    id,
    ariaLabel,
    ariaLabelledby,
    className,
    style,
}: LRZCardProps) {
    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;
    const cardStyle: LRZCardStyle = {
        "--card-color": paletteColor,
        ...style,
    };

    return (
        <Component
            id={id}
            className={joinClassNames(styles.card, className)}
            data-accent={accent}
            data-color={color}
            data-elevation={elevation}
            data-equal-height={equalHeight || undefined}
            data-orientation={orientation}
            data-padding={padding}
            data-tone={tone}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            style={cardStyle}
        >
            {children}
        </Component>
    );
}

export function LRZCardMedia({
    children,
    ratio = "auto",
    bleed = false,
    className,
}: LRZCardMediaProps) {
    return (
        <div
            className={joinClassNames(styles.media, className)}
            data-bleed={bleed || undefined}
            data-ratio={ratio}
        >
            {children}
        </div>
    );
}

export function LRZCardHeader({
    eyebrow,
    title,
    titleAs: Title = "h3",
    titleId,
    description,
    icon,
    metadata,
    action,
    className,
}: LRZCardHeaderProps) {
    const hasMetaLine = eyebrow !== undefined || metadata !== undefined;

    return (
        <header className={joinClassNames(styles.header, className)}>
            {icon !== undefined && icon !== null ? (
                <span className={styles.icon} aria-hidden="true">
                    {icon}
                </span>
            ) : null}

            <div className={styles.heading}>
                {hasMetaLine ? (
                    <div className={styles.metaLine}>
                        {eyebrow !== undefined ? (
                            <p className={styles.eyebrow}>{eyebrow}</p>
                        ) : null}

                        {metadata !== undefined ? (
                            <div className={styles.metadata}>{metadata}</div>
                        ) : null}
                    </div>
                ) : null}

                <Title id={titleId} className={styles.title}>
                    {title}
                </Title>

                {description !== undefined ? (
                    <p className={styles.description}>{description}</p>
                ) : null}
            </div>

            {action !== undefined ? (
                <div className={styles.headerAction}>{action}</div>
            ) : null}
        </header>
    );
}

export function LRZCardContent({
    children,
    padding = "md",
    className,
}: LRZCardContentProps) {
    return (
        <div
            className={joinClassNames(styles.content, className)}
            data-padding={padding}
        >
            {children}
        </div>
    );
}

export function LRZCardFooter({
    children,
    align = "between",
    divided = false,
    className,
}: LRZCardFooterProps) {
    return (
        <footer
            className={joinClassNames(styles.footer, className)}
            data-align={align}
            data-divided={divided || undefined}
        >
            {children}
        </footer>
    );
}

export default LRZCard;
