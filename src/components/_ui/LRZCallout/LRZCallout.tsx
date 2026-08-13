import type {
    ComponentPropsWithoutRef,
    CSSProperties,
    ElementType,
    ReactNode,
} from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZCallout.module.css";

export type LRZCalloutTone = "surface" | "soft" | "outline";

export type LRZCalloutAccent = "none" | "top" | "start";

export type LRZCalloutPadding = "none" | "sm" | "md" | "lg";

export type LRZCalloutElevation = "none" | "card";

export type LRZCalloutTitleElement = "h2" | "h3" | "h4" | "h5" | "h6";

export type LRZCalloutFooterAlign = "start" | "center" | "end" | "between";

type LRZCalloutOwnProps = {
    /** Contenu libre ou sous-composants LRZCallout. */
    children: ReactNode;
    /** Élément HTML ou composant utilisé comme racine. */
    as?: ElementType;
    /** Couleur d’accent issue de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Couleur CSS d’accent, prioritaire sur la palette. */
    customColor?: string;
    /** Traitement visuel de la surface. */
    tone?: LRZCalloutTone;
    /** Position du filet d’accent. */
    accent?: LRZCalloutAccent;
    /** Espacement intérieur du callout. */
    padding?: LRZCalloutPadding;
    /** Niveau d’élévation visuelle. */
    elevation?: LRZCalloutElevation;
    /** Identifiant HTML du callout. */
    id?: string;
    /** Nom accessible lorsque le callout ne possède pas de titre visible. */
    ariaLabel?: string;
    /** Identifiant du titre visible qui nomme le callout. */
    ariaLabelledby?: string;
    /** Classe additionnelle appliquée à la racine. */
    className?: string;
    /** Styles additionnels appliqués à la racine. */
    style?: CSSProperties;
};

export type LRZCalloutProps<T extends ElementType = "aside"> =
    LRZCalloutOwnProps &
        Omit<ComponentPropsWithoutRef<T>, keyof LRZCalloutOwnProps | "as">;

export type LRZCalloutHeaderProps = {
    /** Sur-titre court : catégorie, provenance ou nature du repère. */
    eyebrow?: ReactNode;
    /** Titre principal du callout. */
    title?: ReactNode;
    /** Niveau HTML explicite du titre. */
    titleAs?: LRZCalloutTitleElement;
    /** Identifiant associé au titre. */
    titleId?: string;
    /** Icône décorative placée avant le bloc de titre. */
    icon?: ReactNode;
    /** Métadonnées placées sur la ligne du sur-titre. */
    metadata?: ReactNode;
    /** Classe additionnelle appliquée à l’en-tête. */
    className?: string;
};

export type LRZCalloutContentProps = ComponentPropsWithoutRef<"div"> & {
    /** Contenu éditorial principal. */
    children: ReactNode;
};

export type LRZCalloutFooterProps = ComponentPropsWithoutRef<"footer"> & {
    /** Source, date, statut ou action secondaire. */
    children: ReactNode;
    /** Alignement des éléments du pied. */
    align?: LRZCalloutFooterAlign;
};

type LRZCalloutStyle = CSSProperties & {
    "--callout-color": string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

export function LRZCallout<T extends ElementType = "aside">({
    children,
    as: Component = "aside",
    color = "ocre",
    customColor,
    tone = "soft",
    accent = "start",
    padding = "md",
    elevation = "none",
    id,
    ariaLabel,
    ariaLabelledby,
    className,
    style,
    ...rootProps
}: LRZCalloutProps<T>) {
    const paletteColor = customColor ?? `var(${LRZ_COLOR_VARIABLES[color]})`;
    const calloutStyle: LRZCalloutStyle = {
        "--callout-color": paletteColor,
        ...style,
    };

    return (
        <Component
            {...rootProps}
            id={id}
            className={joinClassNames(styles.root, className)}
            data-accent={accent}
            data-color={color}
            data-elevation={elevation}
            data-padding={padding}
            data-tone={tone}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            style={calloutStyle}
        >
            {children}
        </Component>
    );
}

export function LRZCalloutHeader({
    eyebrow,
    title,
    titleAs: Title = "h3",
    titleId,
    icon,
    metadata,
    className,
}: LRZCalloutHeaderProps) {
    const hasIcon = icon !== undefined && icon !== null;
    const hasMetaLine = eyebrow !== undefined || metadata !== undefined;

    return (
        <header
            className={joinClassNames(styles.header, className)}
            data-has-icon={hasIcon || undefined}
        >
            {hasIcon ? (
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

                {title !== undefined ? (
                    <Title id={titleId} className={styles.title}>
                        {title}
                    </Title>
                ) : null}
            </div>
        </header>
    );
}

export function LRZCalloutContent({
    className,
    ...props
}: LRZCalloutContentProps) {
    return (
        <div {...props} className={joinClassNames(styles.content, className)} />
    );
}

export function LRZCalloutFooter({
    align = "start",
    className,
    ...props
}: LRZCalloutFooterProps) {
    return (
        <footer
            {...props}
            className={joinClassNames(styles.footer, className)}
            data-align={align}
        />
    );
}

export default LRZCallout;
