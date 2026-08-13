import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { useId } from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZBanner.module.css";

export type LRZBannerTone = "surface" | "soft" | "contrast";

export type LRZBannerPosition = "inline" | "fixed-bottom";

export type LRZBannerTitleElement = "h2" | "h3" | "h4" | "h5" | "h6";

type LRZBannerOwnProps = {
    /** Contenu principal de la bannière. */
    children: ReactNode;
    /** Titre visible qui nomme la bannière. */
    title: ReactNode;
    /** Niveau HTML explicite du titre. */
    titleAs?: LRZBannerTitleElement;
    /** Identifiant associé au titre visible. */
    titleId?: string;
    /** Sur-titre court qui contextualise le message. */
    eyebrow?: ReactNode;
    /** Icône décorative placée avant le contenu. */
    icon?: ReactNode;
    /** Actions proposées à la fin de la bannière. */
    actions?: ReactNode;
    /** Traitement visuel de la surface. */
    tone?: LRZBannerTone;
    /** Position de la bannière dans la page ou dans le viewport. */
    position?: LRZBannerPosition;
    /** Couleur d’accent issue de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Couleur CSS d’accent, prioritaire sur la palette. */
    customColor?: string;
    /** Classe additionnelle appliquée à la racine. */
    className?: string;
    /** Styles additionnels appliqués à la racine. */
    style?: CSSProperties;
};

export type LRZBannerProps = LRZBannerOwnProps &
    Omit<
        ComponentPropsWithoutRef<"section">,
        keyof LRZBannerOwnProps | "aria-labelledby"
    > & {
        /** Identifiant d’un autre élément qui nomme la bannière. */
        ariaLabelledby?: string;
    };

type LRZBannerStyle = CSSProperties & {
    "--banner-color": string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZBanner({
    children,
    title,
    titleAs: Title = "h2",
    titleId,
    eyebrow,
    icon,
    actions,
    tone = "surface",
    position = "inline",
    color = "ocre",
    customColor,
    className,
    style,
    ariaLabelledby,
    ...sectionProps
}: LRZBannerProps) {
    const generatedTitleId = useId();
    const resolvedTitleId = titleId ?? generatedTitleId;
    const bannerStyle: LRZBannerStyle = {
        "--banner-color": customColor ?? `var(${LRZ_COLOR_VARIABLES[color]})`,
        ...style,
    };

    return (
        <section
            {...sectionProps}
            className={joinClassNames(styles.root, className)}
            data-color={color}
            data-position={position}
            data-tone={tone}
            aria-labelledby={ariaLabelledby ?? resolvedTitleId}
            style={bannerStyle}
        >
            <div className={styles.panel}>
                {icon !== undefined ? (
                    <span className={styles.icon} aria-hidden="true">
                        {icon}
                    </span>
                ) : null}

                <div className={styles.copy}>
                    {eyebrow !== undefined ? (
                        <p className={styles.eyebrow}>{eyebrow}</p>
                    ) : null}

                    <Title id={resolvedTitleId} className={styles.title}>
                        {title}
                    </Title>

                    <div className={styles.content}>{children}</div>
                </div>

                {actions !== undefined ? (
                    <div className={styles.actions}>{actions}</div>
                ) : null}
            </div>
        </section>
    );
}

export { LRZBanner };
