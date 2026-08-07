// src/app/chateaux/collections/[collectionSlug]/page.tsx

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    CollectionEntryCard,
    CollectionEntryCastle,
} from "@/components/ui/collection-entry-card";
import { CollectionHero } from "@/components/ui/collection-hero";
import { CollectionList } from "@/components/ui/collection-list";
import { CollectionPodium } from "@/components/ui/collection-podium";

import { COLLECTIONS, getCollectionBySlug } from "@/registry/collections";

import { resolveCollectionPage } from "./lib";

import styles from "./page.module.css";
import PageHeader, { PageHeaderCurrent } from "@/components/PageHeader";
import { getIndexesForEnv } from "@/registry/indexes";
import { getCanonicalUrl } from "@/lib/site-metadata";

type CollectionPageProps = {
    params: Promise<{
        collectionSlug: string;
    }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return COLLECTIONS.map((collection) => ({
        collectionSlug: collection.slug,
    }));
}

export async function generateMetadata({
    params,
}: CollectionPageProps): Promise<Metadata> {
    const { collectionSlug } = await params;

    const collection = getCollectionBySlug(collectionSlug);

    if (!collection) {
        return {
            title: "Collection introuvable | Le Codex",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return {
        title: `${collection.title} | Châteaux | Le Codex`,
        description: collection.description,
        alternates: {
            canonical: getCanonicalUrl(collection.href),
        },
        openGraph: {
            title: collection.title,
            description: collection.description,
            type: "article",
        },
    };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { collectionSlug } = await params;

    const collection = getCollectionBySlug(collectionSlug);

    if (!collection) {
        notFound();
    }

    const { entries, podium } = resolveCollectionPage(collection);

    const hero = {
        slug: collection.slug,
        titre: collection.title,
        emoji: collection.mark,
        illustration: collection.customEmoji ?? "",
        color: collection.color,
        eyebrow: collection.eyebrow,
        sousTitre: collection.subtitle,
        description: collection.description,
        type: collection.type,
        totalEntries: entries.length,
        meta: [
            `${entries.length} châteaux`,
            "Classement éditorial",
            "Codex ligérien",
        ],
    };

    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <main
            className={styles.page}
            style={
                {
                    "--collection-accent": collection.accent,
                } as CSSProperties
            }
        >
            <div className={styles.wrap}>
                <PageHeader
                    current={collection.href as PageHeaderCurrent}
                    indexes={indexes}
                    collections={COLLECTIONS}
                />

                <CollectionHero
                    collection={hero}
                    variant="compact"
                    className="mt-10 mb-10"
                />

                {/* <div className={styles.badges}>
                    <CollectionBadge
                        collection={{
                            slug: collection.slug,
                            label: collection.label,
                            emoji: collection.mark,
                            type: collection.type,
                        }}
                        size="md"
                    />

                    <CollectionBadge
                        collection={{
                            label: `${entries.length} châteaux`,
                            emoji: "🏰",
                            type: "architecture",
                        }}
                        variant="compact"
                        size="md"
                    />

                    <CollectionBadge
                        collection={{
                            label: "Classement éditorial",
                            emoji: "✦",
                            type: "histoire",
                        }}
                        variant="compact"
                        size="md"
                    />
                </div> */}

                {/* <section
                    className={styles.criteriaSection}
                    aria-label="Méthodologie de la collection"
                >
                    <CollectionCriteria
                        title="Comment ce classement est construit"
                        description={
                            "Cette collection propose une lecture éditoriale du catalogue. Elle croise la renommée, l’histoire, l’architecture et la place de chaque château dans le récit ligérien."
                        }
                        criteria={criteria}
                        variant="card"
                    />
                </section> */}

                <section
                    className={styles.podiumSection}
                    aria-labelledby="collection-podium-title"
                >
                    {/* <header className={styles.sectionHeader}>
                        <div className={styles.sectionHeading}>
                            <p className={styles.sectionEyebrow}>Le sommet</p>

                            <h2
                                id="collection-podium-title"
                                className={styles.sectionTitle}
                            >
                                Les trois grandes figures
                            </h2>
                        </div>

                        <p className={styles.sectionDescription}>
                            Trois châteaux qui condensent l’ambition royale, les
                            mutations architecturales et l’imaginaire du Val de
                            Loire.
                        </p>
                    </header> */}

                    <CollectionPodium
                        eyebrow="Les incontournables du Val"
                        title="Le podium"
                        entries={podium}
                    />
                </section>

                <section
                    className={styles.rankingSection}
                    aria-labelledby="collection-ranking-title"
                >
                    <header className={styles.sectionHeader}>
                        <div className={styles.sectionHeading}>
                            {/* <p className={styles.sectionEyebrow}>
                                Classement complet
                            </p> */}

                            <h2
                                id="collection-ranking-title"
                                className={styles.sectionTitle}
                            >
                                Le classement complet
                            </h2>
                        </div>

                        {/* <p className={styles.sectionDescription}>
                            De Chambord à Nantes, dix monuments pour parcourir
                            les grandes étapes du récit castral ligérien.
                        </p> */}
                    </header>

                    <CollectionList
                        as="ol"
                        gap="md"
                        aria-label={collection.title}
                    >
                        {entries.map(({ collectionEntry, castle }) => (
                            <li
                                key={collectionEntry.slug}
                                className={styles.rankingItem}
                            >
                                <CollectionEntryCard
                                    collectionEntry={collectionEntry}
                                    castle={castle as CollectionEntryCastle}
                                    variant="default"
                                />
                            </li>
                        ))}
                    </CollectionList>
                </section>

                <footer className={styles.footer}>
                    <span className={styles.footerMark} aria-hidden="true">
                        {collection.mark}
                    </span>

                    <div className={styles.footerContent}>
                        <p className={styles.footerTitle}>{collection.title}</p>

                        <p className={styles.footerNote}>
                            {collection.footerNote}
                        </p>
                    </div>

                    <Link
                        href={collection.indexHref}
                        className={styles.footerLink}
                    >
                        Retour à l’index des châteaux
                        <span aria-hidden="true"> →</span>
                    </Link>
                </footer>
            </div>
        </main>
    );
}
