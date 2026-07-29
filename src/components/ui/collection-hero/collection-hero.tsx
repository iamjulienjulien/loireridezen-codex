// src/components/ui/collection-hero/collection-hero.tsx

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./collection-hero.module.css";
import { LRZColor } from "@/types/lrz";
import { getLRZColorValue } from "@/registry/colorsV2";
import { lighter } from "@/lib/colors";

export type CollectionHeroVariant = "default" | "immersive" | "compact";

export type CollectionHeroType =
    | "general"
    | "architecture"
    | "jardins"
    | "itineraire"
    | "decouverte"
    | "histoire"
    | string;

export type CollectionHeroData = {
    slug: string;
    titre: string;
    emoji?: string;
    sousTitre: string;
    description?: string;
    type: CollectionHeroType;
    totalEntries: number;
    illustration?: string;
    color: LRZColor;
    eyebrow?: string;
    meta?: string[];
};

export type CollectionHeroProps = {
    collection: CollectionHeroData;
    variant?: CollectionHeroVariant;
    anchorId?: string;
    href?: string;
    className?: string;
};

type CollectionVisual = {
    accent: string;
    accentSoft: string;
    label: string;
};

const COLLECTION_VISUALS: Record<string, CollectionVisual> = {
    general: {
        accent: "#b88945",
        accentSoft: "#ead9b7",
        label: "Collection essentielle",
    },
    architecture: {
        accent: "#9d6b42",
        accentSoft: "#ead5c5",
        label: "Architecture",
    },
    jardins: {
        accent: "#6f8757",
        accentSoft: "#d7e2ce",
        label: "Jardins",
    },
    itineraire: {
        accent: "#4f7d8f",
        accentSoft: "#d2e2e7",
        label: "Itinéraire",
    },
    decouverte: {
        accent: "#8b6d91",
        accentSoft: "#e1d6e4",
        label: "Découverte",
    },
    histoire: {
        accent: "#8f5746",
        accentSoft: "#e7d1c9",
        label: "Histoire",
    },
};

const FALLBACK_VISUAL: CollectionVisual = {
    accent: "#b88945",
    accentSoft: "#ead9b7",
    label: "Collection du Codex",
};

function getCollectionVisual(type: string): CollectionVisual {
    return COLLECTION_VISUALS[type] ?? FALLBACK_VISUAL;
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export function CollectionHero({
    collection,
    variant = "default",
    anchorId = "classement",
    href,
    className,
}: CollectionHeroProps) {
    const visual = getCollectionVisual(collection.type);
    const color = getLRZColorValue(collection.color);
    const colorSoft = lighter(color, 0.5);

    const meta = collection.meta ?? [
        `${collection.totalEntries} château${
            collection.totalEntries > 1 ? "x" : ""
        }`,
        visual.label,
        "Val de Loire",
    ];

    return (
        <section
            className={joinClassNames(styles.hero, styles[variant], className)}
            style={
                {
                    "--collection-color": color,
                    "--collection-color-soft": colorSoft,
                    "--collection-accent": visual.accent,
                    "--collection-accent-soft": visual.accentSoft,
                } as CSSProperties
            }
            aria-labelledby={`collection-${collection.slug}-title`}
        >
            <div className={styles.content}>
                <div className={styles.eyebrow}>
                    {collection.emoji ? (
                        <span className={styles.emoji} aria-hidden="true">
                            {collection.emoji}
                        </span>
                    ) : null}

                    <span>{collection.eyebrow ?? "Collection du Codex"}</span>
                </div>

                <h1
                    id={`collection-${collection.slug}-title`}
                    className={styles.title}
                >
                    {collection.titre}
                </h1>

                <p className={styles.subtitle}>{collection.sousTitre}</p>

                {collection.description ? (
                    <p className={styles.description}>
                        {collection.description}
                    </p>
                ) : null}

                {variant !== "compact" && (
                    <ul
                        className={styles.meta}
                        aria-label="Informations sur la collection"
                    >
                        {meta.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                )}

                {variant !== "compact" ? (
                    <div className={styles.actions}>
                        {href ? (
                            <Link href={href} className={styles.primaryAction}>
                                Ouvrir la collection
                                <span aria-hidden="true">→</span>
                            </Link>
                        ) : (
                            <a
                                href={`#${anchorId}`}
                                className={styles.primaryAction}
                            >
                                Découvrir le classement
                                <span aria-hidden="true">↓</span>
                            </a>
                        )}

                        <span className={styles.signature}>
                            Loire Ride Zen · Codex
                        </span>
                    </div>
                ) : null}
            </div>

            <div className={styles.visual}>
                <div className={styles.arch} aria-hidden="true" />

                <div className={styles.medallion}>
                    <div className={styles.medallionRing} aria-hidden="true" />

                    {collection.illustration ? (
                        <Image
                            src={collection.illustration}
                            alt=""
                            fill
                            priority={variant === "immersive"}
                            sizes={
                                variant === "immersive"
                                    ? "(max-width: 760px) 80vw, 560px"
                                    : variant === "compact"
                                      ? "180px"
                                      : "(max-width: 760px) 70vw, 430px"
                            }
                            className={styles.image}
                        />
                    ) : (
                        <span className={styles.fallback} aria-hidden="true">
                            {collection.emoji ?? "🏰"}
                        </span>
                    )}
                </div>

                <div className={styles.visualCaption} aria-hidden="true">
                    <span>{visual.label}</span>
                    <span>
                        {String(collection.totalEntries).padStart(2, "0")}
                    </span>
                </div>
            </div>
        </section>
    );
}

export default CollectionHero;
