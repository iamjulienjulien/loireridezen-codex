// src/components/ui/collection-podium/collection-podium.tsx

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./collection-podium.module.css";
import { CollectionRank } from "../collection-rank";

export type CollectionPodiumRank = 1 | 2 | 3;

export type CollectionPodiumCastle = {
    slug: string;
    nom: string;
    epoque: string;
    lieu?: string;
    illustration?: string;
    emoji?: string;
};

export type CollectionPodiumEntry = {
    rang: CollectionPodiumRank;
    raison: string;
    castle: CollectionPodiumCastle;
};

export type CollectionPodiumProps = {
    entries: CollectionPodiumEntry[];
    title?: string;
    eyebrow?: string;
    className?: string;
};

type RankVisual = {
    label: string;
    metal: string;
    className: string;
};

const RANK_VISUALS: Record<CollectionPodiumRank, RankVisual> = {
    1: {
        label: "Première place",
        metal: "Or",
        className: styles.gold,
    },
    2: {
        label: "Deuxième place",
        metal: "Argent",
        className: styles.silver,
    },
    3: {
        label: "Troisième place",
        metal: "Bronze",
        className: styles.bronze,
    },
};

const EPOQUE_ACCENTS: Record<string, string> = {
    Médiéval: "#8a7256",
    Renaissance: "#c58a3a",
    Classique: "#6a7d8c",
    Éclectique: "#8f6bc2",
};

function getEpoqueAccent(epoque: string): string {
    return EPOQUE_ACCENTS[epoque] ?? "#b88945";
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

function getEntryByRank(
    entries: CollectionPodiumEntry[],
    rank: CollectionPodiumRank,
): CollectionPodiumEntry | undefined {
    return entries.find((entry) => entry.rang === rank);
}

export function CollectionPodium({
    entries,
    title = "Le podium",
    eyebrow = "Les trois premiers",
    className,
}: CollectionPodiumProps) {
    const first = getEntryByRank(entries, 1);
    const second = getEntryByRank(entries, 2);
    const third = getEntryByRank(entries, 3);

    if (!first || !second || !third) {
        throw new Error(
            "CollectionPodium attend exactement une entrée de rang 1, 2 et 3.",
        );
    }

    return (
        <section
            className={joinClassNames(styles.podium, className)}
            aria-labelledby="collection-podium-title"
        >
            <header className={styles.header}>
                <p className={styles.eyebrow}>{eyebrow}</p>

                <h2 id="collection-podium-title" className={styles.title}>
                    {title}
                </h2>

                <div className={styles.ornament} aria-hidden="true">
                    <span />
                    <span>✦</span>
                    <span />
                </div>
            </header>

            <div className={styles.stage}>
                <PodiumPlace entry={second} position="second" />

                <PodiumPlace entry={first} position="first" />

                <PodiumPlace entry={third} position="third" />
            </div>
        </section>
    );
}

type PodiumPlaceProps = {
    entry: CollectionPodiumEntry;
    position: "first" | "second" | "third";
};

function PodiumPlace({ entry, position }: PodiumPlaceProps) {
    const visual = RANK_VISUALS[entry.rang];
    const href = `/codex/chateaux/${entry.castle.slug}`;
    const accent = getEpoqueAccent(entry.castle.epoque);

    return (
        <article
            className={joinClassNames(
                styles.place,
                styles[position],
                visual.className,
            )}
            style={
                {
                    "--castle-accent": accent,
                } as CSSProperties
            }
            data-rank={entry.rang}
        >
            <Link
                href={href}
                className={styles.link}
                aria-label={`${visual.label} : ${entry.castle.nom}`}
            >
                <div className={styles.medalSlot}>
                    <CollectionRank
                        rank={entry.rang}
                        variant="medal"
                        size="md"
                        onlyLabel={true}
                        showLabel
                    />
                </div>

                <div className={styles.portrait}>
                    <div className={styles.halo}>
                        {entry.castle.illustration ? (
                            <Image
                                src={entry.castle.illustration}
                                alt=""
                                fill
                                sizes={
                                    entry.rang === 1
                                        ? "(max-width: 820px) 180px, 250px"
                                        : "(max-width: 820px) 150px, 210px"
                                }
                                className={styles.image}
                            />
                        ) : (
                            <span
                                className={styles.fallback}
                                aria-hidden="true"
                            >
                                {entry.castle.emoji ?? "🏰"}
                            </span>
                        )}
                    </div>
                </div>

                <div className={styles.identity}>
                    <p className={styles.epoque}>{entry.castle.epoque}</p>

                    <h3 className={styles.castleName}>{entry.castle.nom}</h3>

                    {entry.castle.lieu ? (
                        <p className={styles.location}>{entry.castle.lieu}</p>
                    ) : null}
                </div>

                <p className={styles.reason}>
                    <span aria-hidden="true">✦</span>
                    <span>{entry.raison}</span>
                </p>

                <div className={styles.step}>
                    <span className={styles.stepRank}>{entry.rang}</span>

                    <span className={styles.stepLabel}>{visual.label}</span>

                    <span className={styles.stepArrow} aria-hidden="true">
                        Voir&nbsp;→
                    </span>
                </div>
            </Link>
        </article>
    );
}

export default CollectionPodium;
