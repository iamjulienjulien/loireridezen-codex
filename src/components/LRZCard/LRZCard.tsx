import type {
    ComponentPropsWithoutRef,
    CSSProperties,
    ElementType,
    ReactNode,
} from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colorsV2";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZCard.module.css";

export type LRZCardTone = "surface" | "soft" | "outline" | "transparent";

export type LRZCardAccent = "none" | "top" | "start";

export type LRZCardPadding = "none" | "sm" | "md" | "lg";

export type LRZCardElevation = "none" | "card" | "raised";

export type LRZCardOrientation = "vertical" | "horizontal";

export type LRZCardLayout =
    "media-top" | "media-bottom" | "media-start" | "media-end";

export type LRZCardSectionTone = "default" | "soft" | "transparent";

export type LRZCardOverlayPosition =
    "top-start" | "top-end" | "bottom-start" | "bottom-end";

export type LRZCardTitleElement = "h2" | "h3" | "h4" | "h5" | "h6";

export type LRZCardMediaRatio =
    "auto" | "square" | "portrait" | "landscape" | "wide";

export type LRZCardFooterAlign = "start" | "center" | "end" | "between";

type LRZCardOwnProps = {
    /** Contenu libre ou sous-composants LRZCard. */
    children: ReactNode;
    /** Élément HTML ou composant utilisé comme racine. */
    as?: ElementType;
    /** Couleur d’accent issue de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Couleur CSS d’accent, prioritaire sur la palette. */
    customColor?: string;
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
    /** Organisation du média, prioritaire sur orientation. */
    layout?: LRZCardLayout;
    /** Active les interactions visuelles gérées en CSS. */
    interactive?: boolean;
    loading?: boolean;
    selected?: boolean;
    active?: boolean;
    disabled?: boolean;
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

export type LRZCardProps<T extends ElementType = "article"> = LRZCardOwnProps &
    Omit<ComponentPropsWithoutRef<T>, keyof LRZCardOwnProps | "as">;

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
    /** Centre les éléments de l’en-tête. */
    center?: boolean;
    /** Classe additionnelle appliquée à l’en-tête. */
    className?: string;
};

export type LRZCardContentProps = {
    /** Contenu principal de la carte. */
    children: ReactNode;
    /** Espacement propre au corps de la carte. */
    padding?: LRZCardPadding;
    /** Étire le contenu pour pousser le footer vers le bas. */
    grow?: boolean;
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
    /** Fixe le footer au bas de la carte quand le layout le permet. */
    sticky?: boolean;
    /** Classe additionnelle appliquée au pied. */
    className?: string;
};

export type LRZCardSectionProps = {
    children: ReactNode;
    padding?: LRZCardPadding;
    tone?: LRZCardSectionTone;
    divided?: boolean;
    className?: string;
};

export type LRZCardOverlayProps = {
    children: ReactNode;
    position?: LRZCardOverlayPosition;
    className?: string;
};

export type LRZCardLinkProps = Omit<LRZCardProps<"a">, "as" | "interactive"> & {
    href: string;
};

type LRZCardStyle = CSSProperties & {
    "--card-color": string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

export function LRZCard<T extends ElementType = "article">({
    children,
    as: Component = "article",
    color = "ocre",
    customColor,
    tone = "surface",
    accent = "top",
    padding = "none",
    elevation = "card",
    orientation = "vertical",
    layout,
    interactive = false,
    loading = false,
    selected = false,
    active = false,
    disabled = false,
    equalHeight = false,
    id,
    ariaLabel,
    ariaLabelledby,
    className,
    style,
    ...rootProps
}: LRZCardProps<T>) {
    const paletteColor = customColor ?? `var(${LRZ_COLOR_VARIABLES[color]})`;
    const cardStyle: LRZCardStyle = {
        "--card-color": paletteColor,
        ...style,
    };

    const resolvedLayout =
        layout ?? (orientation === "horizontal" ? "media-start" : "media-top");

    return (
        <Component
            {...rootProps}
            id={id}
            className={joinClassNames(styles.card, className)}
            data-accent={accent}
            data-color={color}
            data-elevation={elevation}
            data-equal-height={equalHeight || undefined}
            data-interactive={interactive || undefined}
            data-loading={loading || undefined}
            data-selected={selected || undefined}
            data-active={active || undefined}
            data-disabled={disabled || undefined}
            data-layout={resolvedLayout}
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
    center = false,
    className,
}: LRZCardHeaderProps) {
    const hasMetaLine = eyebrow !== undefined || metadata !== undefined;

    return (
        <header
            className={joinClassNames(styles.header, className)}
            data-center={center || undefined}
        >
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
    grow = false,
    className,
}: LRZCardContentProps) {
    return (
        <div
            className={joinClassNames(styles.content, className)}
            data-padding={padding}
            data-grow={grow || undefined}
        >
            {children}
        </div>
    );
}

export function LRZCardFooter({
    children,
    align = "between",
    divided = false,
    sticky = false,
    className,
}: LRZCardFooterProps) {
    return (
        <footer
            className={joinClassNames(styles.footer, className)}
            data-align={align}
            data-divided={divided || undefined}
            data-sticky={sticky || undefined}
        >
            {children}
        </footer>
    );
}

export function LRZCardSection({
    children,
    padding = "md",
    tone = "default",
    divided = false,
    className,
}: LRZCardSectionProps) {
    return (
        <section
            className={joinClassNames(styles.section, className)}
            data-divided={divided || undefined}
            data-padding={padding}
            data-tone={tone}
        >
            {children}
        </section>
    );
}

export function LRZCardOverlay({
    children,
    position = "top-end",
    className,
}: LRZCardOverlayProps) {
    return (
        <div
            className={joinClassNames(styles.overlay, className)}
            data-position={position}
        >
            {children}
        </div>
    );
}

export function LRZCardLink(props: LRZCardLinkProps) {
    return <LRZCard as="a" interactive {...props} />;
}

export default LRZCard;
