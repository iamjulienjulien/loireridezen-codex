"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type {
    ComponentPropsWithoutRef,
    CSSProperties,
    ElementRef,
    ReactNode,
} from "react";
import { forwardRef } from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZDialog.module.css";

export type LRZDialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

export type LRZDialogPlacement = "center" | "top" | "bottom";

export type LRZDialogScrollMode = "content" | "viewport" | "none";

export type LRZDialogVariant = "default" | "editorial" | "immersive";

export type LRZDialogPadding = "none" | "sm" | "md" | "lg";

export type LRZDialogFooterAlign = "start" | "center" | "end" | "between";

export type LRZDialogTitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type LRZDialogProps = ComponentPropsWithoutRef<
    typeof DialogPrimitive.Root
>;

export type LRZDialogTriggerProps = ComponentPropsWithoutRef<
    typeof DialogPrimitive.Trigger
>;

export type LRZDialogPortalProps = ComponentPropsWithoutRef<
    typeof DialogPrimitive.Portal
>;

export type LRZDialogOverlayProps = ComponentPropsWithoutRef<
    typeof DialogPrimitive.Overlay
>;

type LRZDialogContentOwnProps = {
    /** Contenu libre ou sous-composants LRZDialog. */
    children: ReactNode;
    /** Largeur et encombrement général du dialogue. */
    size?: LRZDialogSize;
    /** Position principale dans le viewport. */
    placement?: LRZDialogPlacement;
    /** Stratégie de défilement du contenu. */
    scrollMode?: LRZDialogScrollMode;
    /** Traitement visuel du dialogue. */
    variant?: LRZDialogVariant;
    /** Espacement intérieur de la racine. */
    padding?: LRZDialogPadding;
    /** Couleur d’accent issue de la palette Loire Ride Zen. */
    color?: LRZColor;
    /** Couleur CSS d’accent, prioritaire sur la palette. */
    customColor?: string;
    /** Affiche le bouton de fermeture par défaut. */
    showCloseButton?: boolean;
    /** Nom accessible du bouton de fermeture par défaut. */
    closeLabel?: string;
    /** Empêche la fermeture via une interaction extérieure. */
    preventOutsideClose?: boolean;
    /** Empêche la fermeture avec la touche Échap. */
    preventEscapeClose?: boolean;
    /** Rend l’en-tête visuellement fixe dans les modes compatibles. */
    stickyHeader?: boolean;
    /** Rend le pied visuellement fixe dans les modes compatibles. */
    stickyFooter?: boolean;
    /** Classe additionnelle appliquée au contenu. */
    className?: string;
    /** Styles additionnels appliqués au contenu. */
    style?: CSSProperties;
};

export type LRZDialogContentProps = LRZDialogContentOwnProps &
    Omit<
        ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
        keyof LRZDialogContentOwnProps
    >;

export type LRZDialogCloseProps = ComponentPropsWithoutRef<
    typeof DialogPrimitive.Close
>;

export type LRZDialogHeaderProps = {
    /** Sur-titre court : catégorie, territoire ou statut. */
    eyebrow?: ReactNode;
    /** Titre principal du dialogue. */
    title?: ReactNode;
    /** Niveau HTML du titre lorsque la prop title est utilisée. */
    titleAs?: LRZDialogTitleElement;
    /** Identifiant associé au titre généré. */
    titleId?: string;
    /** Description courte ou sous-titre. */
    description?: ReactNode;
    /** Visuel décoratif placé avant le bloc de titre. */
    icon?: ReactNode;
    /** Badges ou métadonnées associés au titre. */
    metadata?: ReactNode;
    /** Action placée à l’extrémité de l’en-tête. */
    action?: ReactNode;
    /** Centre les éléments de l’en-tête. */
    center?: boolean;
    /** Contenu composé manuellement, après le bloc automatique. */
    children?: ReactNode;
    /** Classe additionnelle appliquée à l’en-tête. */
    className?: string;
};

export type LRZDialogEyebrowProps = ComponentPropsWithoutRef<"p">;

export type LRZDialogTitleProps = ComponentPropsWithoutRef<
    typeof DialogPrimitive.Title
> & {
    /** Élément HTML utilisé pour le titre. */
    as?: LRZDialogTitleElement;
};

export type LRZDialogDescriptionProps = ComponentPropsWithoutRef<
    typeof DialogPrimitive.Description
>;

export type LRZDialogBodyProps = ComponentPropsWithoutRef<"div"> & {
    /** Espacement propre au corps du dialogue. */
    padding?: LRZDialogPadding;
    /** Étire le corps dans les layouts verticaux. */
    grow?: boolean;
};

export type LRZDialogFooterProps = ComponentPropsWithoutRef<"footer"> & {
    /** Alignement des actions du pied de dialogue. */
    align?: LRZDialogFooterAlign;
    /** Affiche une séparation avant le pied. */
    divided?: boolean;
    /** Rend le pied visuellement fixe. */
    sticky?: boolean;
};

type LRZDialogStyle = CSSProperties & {
    "--dialog-color": string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
) {
    return classNames.filter(Boolean).join(" ");
}

function DefaultCloseIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        >
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
        </svg>
    );
}

export function LRZDialog(props: LRZDialogProps) {
    return <DialogPrimitive.Root {...props} />;
}

export function LRZDialogTrigger({
    className,
    ...props
}: LRZDialogTriggerProps) {
    return <DialogPrimitive.Trigger className={className} {...props} />;
}

export function LRZDialogPortal(props: LRZDialogPortalProps) {
    return <DialogPrimitive.Portal {...props} />;
}

export const LRZDialogOverlay = forwardRef<
    ElementRef<typeof DialogPrimitive.Overlay>,
    LRZDialogOverlayProps
>(function LRZDialogOverlay({ className, ...props }, ref) {
    return (
        <DialogPrimitive.Overlay
            ref={ref}
            className={joinClassNames(styles.overlay, className)}
            {...props}
        />
    );
});

export const LRZDialogContent = forwardRef<
    ElementRef<typeof DialogPrimitive.Content>,
    LRZDialogContentProps
>(function LRZDialogContent(
    {
        children,
        size = "md",
        placement = "center",
        scrollMode = "content",
        variant = "default",
        padding = "none",
        color = "ocre",
        customColor,
        showCloseButton = true,
        closeLabel = "Fermer",
        preventOutsideClose = false,
        preventEscapeClose = false,
        stickyHeader = false,
        stickyFooter = false,
        className,
        style,
        onEscapeKeyDown,
        onPointerDownOutside,
        onInteractOutside,
        ...contentProps
    },
    ref,
) {
    const paletteColor = customColor ?? `var(${LRZ_COLOR_VARIABLES[color]})`;

    const dialogStyle: LRZDialogStyle = {
        "--dialog-color": paletteColor,
        ...style,
    };

    return (
        <LRZDialogPortal>
            <LRZDialogOverlay />

            <div
                className={styles.viewport}
                data-placement={placement}
                data-scroll-mode={scrollMode}
            >
                <DialogPrimitive.Content
                    ref={ref}
                    {...contentProps}
                    className={joinClassNames(styles.content, className)}
                    data-color={color}
                    data-padding={padding}
                    data-placement={placement}
                    data-scroll-mode={scrollMode}
                    data-size={size}
                    data-sticky-footer={stickyFooter || undefined}
                    data-sticky-header={stickyHeader || undefined}
                    data-variant={variant}
                    style={dialogStyle}
                    onEscapeKeyDown={(event) => {
                        if (preventEscapeClose) {
                            event.preventDefault();
                        }

                        onEscapeKeyDown?.(event);
                    }}
                    onPointerDownOutside={(event) => {
                        if (preventOutsideClose) {
                            event.preventDefault();
                        }

                        onPointerDownOutside?.(event);
                    }}
                    onInteractOutside={(event) => {
                        if (preventOutsideClose) {
                            event.preventDefault();
                        }

                        onInteractOutside?.(event);
                    }}
                >
                    {showCloseButton ? (
                        <DialogPrimitive.Close
                            className={styles.close}
                            aria-label={closeLabel}
                        >
                            <DefaultCloseIcon />
                        </DialogPrimitive.Close>
                    ) : null}

                    {children}
                </DialogPrimitive.Content>
            </div>
        </LRZDialogPortal>
    );
});

export function LRZDialogClose({ className, ...props }: LRZDialogCloseProps) {
    return (
        <DialogPrimitive.Close
            className={joinClassNames(styles.closePrimitive, className)}
            {...props}
        />
    );
}

export function LRZDialogHeader({
    eyebrow,
    title,
    titleAs = "h2",
    titleId,
    description,
    icon,
    metadata,
    action,
    center = false,
    children,
    className,
}: LRZDialogHeaderProps) {
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
                            <LRZDialogEyebrow>{eyebrow}</LRZDialogEyebrow>
                        ) : null}

                        {metadata !== undefined ? (
                            <div className={styles.metadata}>{metadata}</div>
                        ) : null}
                    </div>
                ) : null}

                {title !== undefined ? (
                    <LRZDialogTitle as={titleAs} id={titleId}>
                        {title}
                    </LRZDialogTitle>
                ) : null}

                {description !== undefined ? (
                    <LRZDialogDescription>{description}</LRZDialogDescription>
                ) : null}

                {children}
            </div>

            {action !== undefined ? (
                <div className={styles.headerAction}>{action}</div>
            ) : null}
        </header>
    );
}

export function LRZDialogEyebrow({
    className,
    ...props
}: LRZDialogEyebrowProps) {
    return (
        <p className={joinClassNames(styles.eyebrow, className)} {...props} />
    );
}

export const LRZDialogTitle = forwardRef<
    ElementRef<typeof DialogPrimitive.Title>,
    LRZDialogTitleProps
>(function LRZDialogTitle(
    { as: Title = "h2", className, children, ...props },
    ref,
) {
    return (
        <DialogPrimitive.Title asChild {...props}>
            <Title
                ref={ref}
                className={joinClassNames(styles.title, className)}
            >
                {children}
            </Title>
        </DialogPrimitive.Title>
    );
});

export const LRZDialogDescription = forwardRef<
    ElementRef<typeof DialogPrimitive.Description>,
    LRZDialogDescriptionProps
>(function LRZDialogDescription({ className, ...props }, ref) {
    return (
        <DialogPrimitive.Description
            ref={ref}
            className={joinClassNames(styles.description, className)}
            {...props}
        />
    );
});

export function LRZDialogBody({
    padding = "md",
    grow = true,
    className,
    ...props
}: LRZDialogBodyProps) {
    return (
        <div
            className={joinClassNames(styles.body, className)}
            data-grow={grow || undefined}
            data-padding={padding}
            {...props}
        />
    );
}

export function LRZDialogFooter({
    align = "end",
    divided = false,
    sticky = false,
    className,
    ...props
}: LRZDialogFooterProps) {
    return (
        <footer
            className={joinClassNames(styles.footer, className)}
            data-align={align}
            data-divided={divided || undefined}
            data-sticky={sticky || undefined}
            {...props}
        />
    );
}

export default LRZDialog;
