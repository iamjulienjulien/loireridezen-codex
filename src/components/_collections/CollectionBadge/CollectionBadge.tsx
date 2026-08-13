// Composant de collection partagé.

import Link from "next/link";
import type { CSSProperties, ElementType, ReactNode } from "react";

import styles from "./CollectionBadge.module.css";

export type CollectionBadgeVariant = "default" | "compact" | "icon";

export type CollectionBadgeSize = "sm" | "md" | "lg";

export type CollectionBadgeType =
    | "general"
    | "architecture"
    | "jardins"
    | "itineraire"
    | "decouverte"
    | "histoire"
    | string;

export type CollectionBadgeData = {
    slug?: string;
    label: string;
    emoji?: string;
    type?: CollectionBadgeType;
};

export type CollectionBadgeProps = {
    collection: CollectionBadgeData;
    variant?: CollectionBadgeVariant;
    size?: CollectionBadgeSize;
    href?: string;
    active?: boolean;
    className?: string;
    prefix?: ReactNode;
    title?: string;
};

type CollectionBadgeVisual = {
    accent: string;
    soft: string;
};

const COLLECTION_BADGE_VISUALS: Record<string, CollectionBadgeVisual> = {
    general: {
        accent: "#b88945",
        soft: "#ead9b7",
    },
    architecture: {
        accent: "#9d6b42",
        soft: "#ead5c5",
    },
    jardins: {
        accent: "#6f8757",
        soft: "#d7e2ce",
    },
    itineraire: {
        accent: "#4f7d8f",
        soft: "#d2e2e7",
    },
    decouverte: {
        accent: "#8b6d91",
        soft: "#e1d6e4",
    },
    histoire: {
        accent: "#8f5746",
        soft: "#e7d1c9",
    },
};

const FALLBACK_VISUAL: CollectionBadgeVisual = {
    accent: "#b88945",
    soft: "#ead9b7",
};

function getCollectionVisual(
    type?: CollectionBadgeType,
): CollectionBadgeVisual {
    if (!type) {
        return FALLBACK_VISUAL;
    }

    return COLLECTION_BADGE_VISUALS[type] ?? FALLBACK_VISUAL;
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export function CollectionBadge({
    collection,
    variant = "default",
    size = "md",
    href,
    active = false,
    className,
    prefix,
    title,
}: CollectionBadgeProps) {
    const visual = getCollectionVisual(collection.type);

    const rootClassName = joinClassNames(
        styles.badge,
        styles[variant],
        styles[size],
        active && styles.active,
        href && styles.interactive,
        className,
    );

    const style = {
        "--collection-badge-accent": visual.accent,
        "--collection-badge-soft": visual.soft,
    } as CSSProperties;

    const content = (
        <>
            <span className={styles.icon} aria-hidden="true">
                {prefix ?? collection.emoji ?? "✦"}
            </span>

            {variant !== "icon" ? (
                <span className={styles.label}>{collection.label}</span>
            ) : null}

            {href && variant !== "icon" ? (
                <span className={styles.arrow} aria-hidden="true">
                    →
                </span>
            ) : null}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={rootClassName}
                style={style}
                title={title ?? collection.label}
                aria-label={variant === "icon" ? collection.label : undefined}
            >
                {content}
            </Link>
        );
    }

    const Element: ElementType = "span";

    return (
        <Element
            className={rootClassName}
            style={style}
            title={title ?? collection.label}
            aria-label={variant === "icon" ? collection.label : undefined}
        >
            {content}
        </Element>
    );
}

export default CollectionBadge;
