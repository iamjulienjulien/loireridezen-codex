"use client";

// src/components/ui/collection-card/collection-card.tsx

import { useId, useState, type CSSProperties } from "react";
import Link from "next/link";

import styles from "./collection-card.module.css";

export type CollectionCardItem = {
    rang: number;
    slug: string;
    nom: string;
};

export type CollectionCardData = {
    slug: string;
    titre: string;
    emoji: string;
    sousTitre: string;
    type: string;
    classement: CollectionCardItem[];
};

export type CollectionCardVariant = "default" | "compact" | "featured";

export type CollectionCardProps = {
    collection: CollectionCardData;
    href?: string;
    variant?: CollectionCardVariant;
    className?: string;
    defaultExpanded?: boolean;
};

type CollectionVisual = {
    label: string;
    accent: string;
    countLabels: [string, string];
};

type PodiumMeta = {
    label: string;
    className: string;
};

const COLLECTION_VISUALS: Record<string, CollectionVisual> = {
    general: {
        label: "Collection générale",
        accent: "#b88945",
        countLabels: ["château", "châteaux"],
    },
    architecture: {
        label: "Architecture",
        accent: "#795739",
        countLabels: ["édifice", "édifices"],
    },
    territoire: {
        label: "Territoire ligérien",
        accent: "#4d80a7",
        countLabels: ["lieu", "lieux"],
    },
    histoire: {
        label: "Histoire",
        accent: "#a44842",
        countLabels: ["récit", "récits"],
    },
    culture: {
        label: "Culture & légendes",
        accent: "#8f6bc2",
        countLabels: ["récit", "récits"],
    },
    jardins: {
        label: "Jardins & domaines",
        accent: "#5c8754",
        countLabels: ["domaine", "domaines"],
    },
    decouverte: {
        label: "Découverte",
        accent: "#c8893a",
        countLabels: ["pépite", "pépites"],
    },
    initiation: {
        label: "Première découverte",
        accent: "#3e93a7",
        countLabels: ["château", "châteaux"],
    },
    itineraire: {
        label: "Itinéraire",
        accent: "#707c40",
        countLabels: ["halte", "haltes"],
    },
};

const FALLBACK_VISUAL: CollectionVisual = {
    label: "Collection",
    accent: "#b88945",
    countLabels: ["château", "châteaux"],
};

function getCollectionVisual(type: string): CollectionVisual {
    return COLLECTION_VISUALS[type] ?? FALLBACK_VISUAL;
}

function getCollectionCountLabel(
    visual: CollectionVisual,
    count: number,
): string {
    const label = count > 1 ? visual.countLabels[1] : visual.countLabels[0];

    return `${count} ${label}`;
}

function getPodiumMeta(rank: number): PodiumMeta | null {
    switch (rank) {
        case 1:
            return {
                label: "Médaille d’or",
                className: styles.rankGold,
            };

        case 2:
            return {
                label: "Médaille d’argent",
                className: styles.rankSilver,
            };

        case 3:
            return {
                label: "Médaille de bronze",
                className: styles.rankBronze,
            };

        default:
            return null;
    }
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export function CollectionCard({
    collection,
    href,
    variant = "default",
    className,
    defaultExpanded = false,
}: CollectionCardProps) {
    const detailsId = useId();
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const visual = getCollectionVisual(collection.type);
    const itemCount = collection.classement.length;

    const previewLimit = variant === "featured" ? 5 : 3;

    const previewItems = collection.classement.slice(0, previewLimit);

    const hiddenItems = collection.classement.slice(previewLimit);

    const remainingItems = hiddenItems.length;

    const collectionHref = href ?? `/chateaux/collections/${collection.slug}`;

    return (
        <article
            className={joinClassNames(
                styles.card,
                styles[variant],
                isExpanded && styles.expanded,
                className,
            )}
            style={
                {
                    "--collection-accent": visual.accent,
                } as CSSProperties
            }
            data-type={collection.type}
        >
            <Link
                href={collectionHref}
                className={styles.stretchedLink}
                aria-label={`Explorer la collection « ${collection.titre} »`}
            />

            <header className={styles.hero}>
                <div className={styles.emoji} aria-hidden="true">
                    <span>{collection.emoji}</span>
                </div>

                <div className={styles.heading}>
                    <p className={styles.eyebrow}>{visual.label}</p>

                    <h3 className={styles.title}>{collection.titre}</h3>
                </div>
            </header>

            {variant !== "compact" ? (
                <div className={styles.body}>
                    <p className={styles.subtitle}>{collection.sousTitre}</p>

                    {previewItems.length > 0 ? (
                        <section
                            className={styles.preview}
                            aria-label="Aperçu du classement"
                        >
                            <div className={styles.previewHead}>
                                <span>En tête du classement</span>

                                <span aria-hidden="true">
                                    {String(itemCount).padStart(2, "0")}
                                </span>
                            </div>

                            <ol className={styles.ranking}>
                                {previewItems.map((item) => (
                                    <RankingItem key={item.slug} item={item} />
                                ))}
                            </ol>

                            {remainingItems > 0 ? (
                                <>
                                    <div
                                        id={detailsId}
                                        className={styles.additionalRanking}
                                        data-expanded={isExpanded || undefined}
                                        aria-hidden={!isExpanded}
                                    >
                                        <ol
                                            className={joinClassNames(
                                                styles.ranking,
                                                styles.rankingContinuation,
                                            )}
                                            start={previewLimit + 1}
                                        >
                                            {hiddenItems.map((item) => (
                                                <RankingItem
                                                    key={item.slug}
                                                    item={item}
                                                />
                                            ))}
                                        </ol>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.expandButton}
                                        aria-expanded={isExpanded}
                                        aria-controls={detailsId}
                                        onClick={() =>
                                            setIsExpanded((current) => !current)
                                        }
                                    >
                                        <span>
                                            {isExpanded
                                                ? "Replier le classement"
                                                : `Et ${remainingItems} autre${
                                                      remainingItems > 1
                                                          ? "s"
                                                          : ""
                                                  } à découvrir`}
                                        </span>

                                        <span
                                            className={styles.expandIcon}
                                            aria-hidden="true"
                                        >
                                            ↓
                                        </span>
                                    </button>
                                </>
                            ) : null}
                        </section>
                    ) : null}
                </div>
            ) : null}

            <footer className={styles.footer}>
                <span className={styles.count}>
                    <span className={styles.countDot} aria-hidden="true" />

                    {getCollectionCountLabel(visual, itemCount)}
                </span>

                <span className={styles.cta} aria-hidden="true">
                    <span>
                        {variant === "compact"
                            ? "Découvrir"
                            : "Explorer la collection"}
                    </span>

                    <span className={styles.arrow}>→</span>
                </span>
            </footer>
        </article>
    );
}

function RankingItem({ item }: { item: CollectionCardItem }) {
    const podium = getPodiumMeta(item.rang);

    return (
        <li className={styles.rankingItem}>
            <span
                className={joinClassNames(styles.rank, podium?.className)}
                aria-label={
                    podium
                        ? `Rang ${item.rang}, ${podium.label}`
                        : `Rang ${item.rang}`
                }
                title={podium?.label}
            >
                {String(item.rang).padStart(2, "0")}
            </span>

            <span className={styles.castleName}>{item.nom}</span>

            {item.rang === 1 ? (
                <span className={styles.leaderMark} aria-hidden="true">
                    ✦
                </span>
            ) : null}
        </li>
    );
}

export default CollectionCard;
