// LRZSection.tsx

import type { CSSProperties, ElementType, ReactNode } from "react";
import LRZSeparateur, {
    type LRZSeparateurPreset,
} from "@/components/LRZSeparateur/LRZSeparateur";
import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZSection.module.css";

export type LRZSectionLayout =
    "stack" | "split" | "sidebar" | "grid" | "full" | "bleed";

export type LRZSectionWidth =
    "narrow" | "reading" | "content" | "wide" | "full";

export type LRZSectionSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type LRZSectionTone =
    "plain" | "surface" | "soft" | "tinted" | "contrast" | "transparent";

export type LRZSectionAlign = "start" | "center" | "end";

export type LRZSectionHeaderLayout = "stack" | "inline" | "split";

export type LRZSectionHeaderPosition = "top" | "side";

export type LRZSectionAsidePosition = "start" | "end";

export type LRZSectionMobileAsidePosition = "before" | "after";

export type LRZSectionSeparatorPreset =
    Exclude<LRZSeparateurPreset, "ornament"> | "none";

export type LRZSectionTitleElement = "h2" | "h3" | "h4";

export type LRZSectionColumns = 2 | 3 | 4;

export type LRZSectionProps = {
    /** Contenu principal de la section. */
    children: ReactNode;

    /** Élément HTML ou composant utilisé comme racine. */
    as?: ElementType;

    /** Identifiant HTML, notamment utilisable comme ancre. */
    id?: string;

    /** Mise en page principale du contenu. */
    layout?: LRZSectionLayout;

    /** Largeur maximale du conteneur intérieur. */
    width?: LRZSectionWidth;

    /** Espacement vertical intérieur. */
    spacing?: LRZSectionSpacing;

    /** Ambiance visuelle de la section. */
    tone?: LRZSectionTone;

    /** Couleur issue de la palette Loire Ride Zen. */
    color?: LRZColor;

    /** Alignement éditorial général. */
    align?: LRZSectionAlign;

    /** Sur-titre court placé avant le titre. */
    eyebrow?: ReactNode;

    /** Titre principal de la section. */
    title?: ReactNode;

    /** Niveau HTML utilisé pour le titre. */
    titleAs?: LRZSectionTitleElement;

    /** Texte introductif de la section. */
    description?: ReactNode;

    /** Composition de l’en-tête. */
    headerLayout?: LRZSectionHeaderLayout;

    /** Position de l’en-tête par rapport au contenu. */
    headerPosition?: LRZSectionHeaderPosition;

    /** Actions ou contrôles associés à l’en-tête. */
    actions?: ReactNode;

    /** Contenu secondaire affiché en pied de section. */
    footer?: ReactNode;

    /** Contenu complémentaire pour les layouts en colonnes. */
    aside?: ReactNode;

    /** Position de l’aside sur desktop. */
    asidePosition?: LRZSectionAsidePosition;

    /** Ordre de l’aside lorsque la section passe en une colonne. */
    mobileAsidePosition?: LRZSectionMobileAsidePosition;

    /** Séparateur affiché avant la section. */
    separatorBefore?: LRZSectionSeparatorPreset;

    /** Séparateur affiché après la section. */
    separatorAfter?: LRZSectionSeparatorPreset;

    /** Couleur des séparateurs. */
    separatorColor?: LRZColor;

    /** Étend visuellement la section hors du conteneur parent. */
    bleed?: boolean;

    /** Supprime le padding horizontal du conteneur sur mobile. */
    flushOnMobile?: boolean;

    /** Masque visuellement le titre tout en le gardant accessible. */
    visuallyHiddenTitle?: boolean;

    /** Largeur maximale personnalisée du conteneur. */
    maxWidth?: CSSProperties["maxWidth"];

    /** Espacement vertical personnalisé. */
    paddingBlock?: CSSProperties["paddingBlock"];

    /** Espacement horizontal personnalisé. */
    paddingInline?: CSSProperties["paddingInline"];

    /** Nombre de colonnes pour le layout grid. */
    columns?: LRZSectionColumns;

    /** Largeur minimale des colonnes automatiques. */
    minColumnWidth?: CSSProperties["minWidth"];

    /** Espacement entre les colonnes et blocs. */
    gap?: CSSProperties["gap"];

    /** Classe additionnelle appliquée à la racine. */
    className?: string;

    /** Classe additionnelle appliquée au conteneur intérieur. */
    containerClassName?: string;

    /** Classe additionnelle appliquée au contenu principal. */
    contentClassName?: string;

    /** Classe additionnelle appliquée à l’en-tête. */
    headerClassName?: string;

    /** Classe additionnelle appliquée à l’aside. */
    asideClassName?: string;

    /** Classe additionnelle appliquée au footer. */
    footerClassName?: string;

    /** Styles additionnels appliqués à la racine. */
    style?: CSSProperties;

    /**
     * Nom accessible de la section.
     *
     * Principalement utile lorsque la section ne possède pas de titre.
     */
    ariaLabel?: string;
};

type LRZSectionStyle = CSSProperties & {
    "--section-color"?: string;
    "--section-max-width"?: string;
    "--section-padding-block"?: string;
    "--section-padding-inline"?: string;
    "--section-gap"?: string;
    "--section-columns"?: number;
    "--section-min-column-width"?: string;
};

function joinClassNames(...classNames: Array<string | undefined | false>) {
    return classNames.filter(Boolean).join(" ");
}

function toCssLength(
    value:
        | CSSProperties["maxWidth"]
        | CSSProperties["minWidth"]
        | CSSProperties["paddingBlock"]
        | CSSProperties["paddingInline"]
        | CSSProperties["gap"]
        | undefined,
) {
    if (value === undefined) {
        return undefined;
    }

    return typeof value === "number" ? `${value}px` : String(value);
}

function SectionSeparator({
    preset,
    color,
}: {
    preset: LRZSectionSeparatorPreset;
    color: LRZColor;
}) {
    if (preset === "none") {
        return null;
    }

    return (
        <LRZSeparateur
            scope="section"
            preset={preset}
            color={color}
            ariaLabel={undefined}
        />
    );
}

export default function LRZSection({
    children,
    as: Component = "section",
    id,
    layout = "stack",
    width = "content",
    spacing = "lg",
    tone = "plain",
    color = "galet",
    align = "start",
    eyebrow,
    title,
    titleAs: Title = "h2",
    description,
    headerLayout = "stack",
    headerPosition = "top",
    actions,
    footer,
    aside,
    asidePosition = "end",
    mobileAsidePosition = "after",
    separatorBefore = "none",
    separatorAfter = "none",
    separatorColor,
    bleed = false,
    flushOnMobile = false,
    visuallyHiddenTitle = false,
    maxWidth,
    paddingBlock,
    paddingInline,
    columns = 3,
    minColumnWidth,
    gap,
    className,
    containerClassName,
    contentClassName,
    headerClassName,
    asideClassName,
    footerClassName,
    style,
    ariaLabel,
}: LRZSectionProps) {
    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;

    const resolvedSeparatorColor = separatorColor ?? color;

    const hasHeadingContent =
        eyebrow !== undefined ||
        title !== undefined ||
        description !== undefined;

    const hasHeader = hasHeadingContent || actions !== undefined;

    const hasAside = aside !== undefined;

    const sectionStyle: LRZSectionStyle = {
        ...style,
        "--section-color": paletteColor,
        "--section-max-width": toCssLength(maxWidth),
        "--section-padding-block": toCssLength(paddingBlock),
        "--section-padding-inline": toCssLength(paddingInline),
        "--section-gap": toCssLength(gap),
        "--section-columns": columns,
        "--section-min-column-width": toCssLength(minColumnWidth),
    };

    const rootClassName = joinClassNames(styles.section, className);

    const innerClassName = joinClassNames(styles.container, containerClassName);

    const resolvedHeaderClassName = joinClassNames(
        styles.header,
        headerClassName,
    );

    const resolvedContentClassName = joinClassNames(
        styles.content,
        contentClassName,
    );

    const resolvedAsideClassName = joinClassNames(styles.aside, asideClassName);

    const resolvedFooterClassName = joinClassNames(
        styles.footer,
        footerClassName,
    );

    const accessibleLabel = title === undefined ? ariaLabel : undefined;

    return (
        <>
            <SectionSeparator
                preset={separatorBefore}
                color={resolvedSeparatorColor}
            />

            <Component
                id={id}
                className={rootClassName}
                data-layout={layout}
                data-width={width}
                data-spacing={spacing}
                data-tone={tone}
                data-align={align}
                data-header-layout={headerLayout}
                data-header-position={headerPosition}
                data-has-header={hasHeader}
                data-has-aside={hasAside}
                data-aside-position={asidePosition}
                data-mobile-aside-position={mobileAsidePosition}
                data-bleed={bleed}
                data-flush-mobile={flushOnMobile}
                aria-label={accessibleLabel}
                style={sectionStyle}
            >
                <div className={innerClassName}>
                    {hasHeader ? (
                        <header className={resolvedHeaderClassName}>
                            {hasHeadingContent ? (
                                <div className={styles.heading}>
                                    {eyebrow !== undefined ? (
                                        <p className={styles.eyebrow}>
                                            {eyebrow}
                                        </p>
                                    ) : null}

                                    {title !== undefined ? (
                                        <Title
                                            className={
                                                visuallyHiddenTitle
                                                    ? styles.srOnly
                                                    : styles.title
                                            }
                                        >
                                            {title}
                                        </Title>
                                    ) : null}

                                    {description !== undefined ? (
                                        <div className={styles.description}>
                                            {description}
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}

                            {actions !== undefined ? (
                                <div className={styles.actions}>{actions}</div>
                            ) : null}
                        </header>
                    ) : null}

                    <div className={styles.layout}>
                        <div className={resolvedContentClassName}>
                            {children}
                        </div>

                        {hasAside ? (
                            <aside className={resolvedAsideClassName}>
                                {aside}
                            </aside>
                        ) : null}
                    </div>

                    {footer !== undefined ? (
                        <footer className={resolvedFooterClassName}>
                            {footer}
                        </footer>
                    ) : null}
                </div>
            </Component>

            <SectionSeparator
                preset={separatorAfter}
                color={resolvedSeparatorColor}
            />
        </>
    );
}
