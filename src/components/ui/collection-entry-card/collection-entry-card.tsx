import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./collection-entry-card.module.css";
import { CollectionRank } from "../collection-rank";

export type CollectionEntryCardVariant = "default" | "compact" | "podium";

export type CollectionEntry = {
    rang: number;
    slug: string;
    raison: string;
};

export type CollectionEntryCastle = {
    customEmoji: string;
    slug: string;
    nom: string;
    epoque: string;
    lieu?: string;
    illustration?: string;
    emoji?: string;
    renommee?: string;
};

export type CollectionEntryCardProps = {
    collectionEntry: CollectionEntry;
    castle: CollectionEntryCastle;
    variant?: CollectionEntryCardVariant;
    href?: string;
    className?: string;
};

type EpoqueVisual = {
    accent: string;
    label: string;
};

const EPOQUE_VISUALS: Record<string, EpoqueVisual> = {
    Médiéval: {
        accent: "#8a7256",
        label: "Médiéval",
    },
    Renaissance: {
        accent: "#c58a3a",
        label: "Renaissance",
    },
    Classique: {
        accent: "#6a7d8c",
        label: "Classique",
    },
    Éclectique: {
        accent: "#8f6bc2",
        label: "Éclectique",
    },
};

const FALLBACK_VISUAL: EpoqueVisual = {
    accent: "#b88945",
    label: "Château ligérien",
};

function getEpoqueVisual(epoque: string): EpoqueVisual {
    return (
        EPOQUE_VISUALS[epoque] ?? {
            ...FALLBACK_VISUAL,
            label: epoque,
        }
    );
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export function CollectionEntryCard({
    collectionEntry,
    castle,
    variant = "default",
    href,
    className,
}: CollectionEntryCardProps) {
    const visual = getEpoqueVisual(castle.epoque);

    console.log("c", collectionEntry, castle);

    const castleHref = href ?? `/chateaux/${castle.slug}`;

    const isPodium = variant === "podium" || collectionEntry.rang <= 3;

    return (
        <article
            className={joinClassNames(
                styles.card,
                styles[variant],
                isPodium && styles.isPodium,
                className,
            )}
            style={
                {
                    "--entry-accent": visual.accent,
                } as CSSProperties
            }
            data-rank={collectionEntry.rang}
        >
            <Link
                href={castleHref}
                className={styles.link}
                aria-label={`Voir la fiche du ${castle.nom}`}
            >
                <div className={styles.rankColumn}>
                    <div className={styles.rankSlot}>
                        <CollectionRank
                            rank={collectionEntry.rang}
                            variant={variant === "podium" ? "medal" : "badge"}
                            size={
                                variant === "compact"
                                    ? "sm"
                                    : variant === "podium"
                                      ? "lg"
                                      : "md"
                            }
                        />
                    </div>

                    <span className={styles.podiumLine} aria-hidden="true" />
                </div>

                <div className={styles.visual}>
                    {castle.customEmoji ? (
                        <Image
                            src={castle.customEmoji}
                            alt=""
                            fill
                            sizes={
                                variant === "compact"
                                    ? "96px"
                                    : "(max-width: 700px) 100vw, 280px"
                            }
                            className={styles.image}
                        />
                    ) : (
                        <span className={styles.fallback} aria-hidden="true">
                            {castle.emoji ?? "🏰"}
                        </span>
                    )}
                </div>

                <div className={styles.content}>
                    <div className={styles.eyebrow}>
                        <span
                            className={styles.epoque}
                            data-epoque={castle.epoque}
                        >
                            {visual.label}
                        </span>

                        {castle.renommee ? (
                            <span className={styles.renommee}>
                                {castle.renommee}
                            </span>
                        ) : null}
                    </div>

                    <h3 className={styles.title}>{castle.nom}</h3>

                    {castle.lieu ? (
                        <p className={styles.location}>{castle.lieu}</p>
                    ) : null}

                    <p className={styles.reason}>
                        <span aria-hidden="true">✦</span>
                        <span>{collectionEntry.raison}</span>
                    </p>

                    {/* <div className={styles.footer}>
                        <span className={styles.cta}>
                            Voir le château
                            <span className={styles.arrow} aria-hidden="true">
                                →
                            </span>
                        </span>
                    </div> */}
                </div>
            </Link>
        </article>
    );
}

export default CollectionEntryCard;
