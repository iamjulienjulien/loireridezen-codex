import {
    type ComponentPropsWithoutRef,
    type ReactNode,
} from "react";

import styles from "./LRZDocCallout.module.css";

export type LRZDocCalloutVariant =
    | "info"
    | "tip"
    | "warning"
    | "danger"
    | "success";

export type LRZDocCalloutProps = Omit<
    ComponentPropsWithoutRef<"aside">,
    "children" | "title"
> & {
    /** Contenu principal de l’encart. */
    children: ReactNode;

    /** Ton visuel et sémantique de l’encart. */
    variant?: LRZDocCalloutVariant;

    /** Titre optionnel affiché dans l’en-tête. */
    title?: ReactNode;

    /** Icône personnalisée. Passe `null` pour masquer l’icône. */
    icon?: ReactNode | null;

    /** Rend l’encart plus compact. */
    compact?: boolean;
};

const DEFAULT_ICONS: Record<LRZDocCalloutVariant, ReactNode> = {
    info: "i",
    tip: "✦",
    warning: "!",
    danger: "×",
    success: "✓",
};

const DEFAULT_TITLES: Record<LRZDocCalloutVariant, string> = {
    info: "Information",
    tip: "Conseil",
    warning: "Attention",
    danger: "Important",
    success: "Validé",
};

export default function LRZDocCallout({
    children,
    variant = "info",
    title,
    icon,
    compact = false,
    className,
    ...props
}: LRZDocCalloutProps) {
    const resolvedIcon =
        icon === undefined ? DEFAULT_ICONS[variant] : icon;

    const resolvedTitle =
        title === undefined ? DEFAULT_TITLES[variant] : title;

    return (
        <aside
            {...props}
            className={[styles.root, className]
                .filter(Boolean)
                .join(" ")}
            data-variant={variant}
            data-compact={compact ? "true" : undefined}
            role={variant === "danger" ? "alert" : "note"}
        >
            <span
                className={styles.rail}
                aria-hidden="true"
            />

            <div className={styles.inner}>
                {(resolvedIcon !== null || resolvedTitle) ? (
                    <div className={styles.header}>
                        {resolvedIcon !== null ? (
                            <span
                                className={styles.icon}
                                aria-hidden="true"
                            >
                                {resolvedIcon}
                            </span>
                        ) : null}

                        {resolvedTitle ? (
                            <strong className={styles.title}>
                                {resolvedTitle}
                            </strong>
                        ) : null}
                    </div>
                ) : null}

                <div className={styles.content}>{children}</div>
            </div>
        </aside>
    );
}
