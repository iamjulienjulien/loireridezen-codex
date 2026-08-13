import { CollectionBadge } from "@/components/CollectionBadge";
import { CollectionCard } from "@/components/CollectionCard";
import { CollectionCriteria } from "@/components/CollectionCriteria";
import { CollectionEntryCard } from "@/components/CollectionEntryCard";
import { CollectionHero } from "@/components/CollectionHero";
import { CollectionList } from "@/components/CollectionList";
import { CollectionPodium } from "@/components/CollectionPodium";
import { CollectionRank } from "@/components/CollectionRank";
import { getAtelierPageMetadata } from "@/lib/atelier-metadata";

import AtelierCategoryLayout from "@/components/_atelier/AtelierCategoryLayout";
import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import styles from "../atelier.module.css";
import { MOCK_COLLECTIONS } from "@/mocks/mockCollection";
import { MOCK_COLLECTION_BADGES } from "@/mocks/mockCollectionBadge";
import { MOCK_COLLECTION_CRITERIA } from "@/mocks/mockCollectionCriteria";
import {
    MOCK_COLLECTION_ENTRIES,
    MOCK_COLLECTION_PODIUM,
} from "@/mocks/mockCollectionEntry";
import { MOCK_COLLECTION_HEROES } from "@/mocks/mockCollectionHero";
import { MOCK_COLLECTION_RANKS } from "@/mocks/mockCollectionRank";

export const metadata = getAtelierPageMetadata("/atelier/collections");

export default function AtelierCollectionsPage() {
    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Éditorial"
            title="Composants Collections"
            description="Le vocabulaire éditorial des sélections : cartes, entrées, podiums, héros, critères et rangs."
        >
            <div className={styles.showcaseStack}>
                <section
                    id="collection-card"
                    className={styles.showcaseSection}
                >
                    <header className={styles.showcaseHeader}>
                        <p>Collection · 01</p>
                        <h2>CollectionCard</h2>
                        <span>
                            La porte d’entrée d’une sélection thématique.
                        </span>
                    </header>
                    <div className={styles.collectionShowcaseGrid}>
                        {MOCK_COLLECTIONS.slice(0, 2).map((collection) => (
                            <CollectionCard
                                key={collection.slug}
                                collection={collection}
                            />
                        ))}
                    </div>
                </section>

                <section
                    id="collection-entry-card"
                    className={styles.showcaseSection}
                >
                    <header className={styles.showcaseHeader}>
                        <p>Collection · 02</p>
                        <h2>CollectionEntryCard & CollectionList</h2>
                        <span>
                            Les entrées classées et leur justification
                            éditoriale.
                        </span>
                    </header>
                    <CollectionList dividers>
                        {MOCK_COLLECTION_ENTRIES.slice(0, 3).map(
                            ({ collectionEntry, castle }) => (
                                <CollectionEntryCard
                                    key={collectionEntry.slug}
                                    collectionEntry={collectionEntry}
                                    castle={castle}
                                />
                            ),
                        )}
                    </CollectionList>
                </section>

                <section
                    id="collection-hero"
                    className={styles.showcaseSection}
                >
                    <header className={styles.showcaseHeader}>
                        <p>Collection · 03</p>
                        <h2>CollectionHero & CollectionPodium</h2>
                        <span>
                            Le récit de collection avant son trio de tête.
                        </span>
                    </header>
                    <div className={styles.showcaseStack}>
                        <CollectionHero
                            collection={MOCK_COLLECTION_HEROES[0]}
                        />
                        <CollectionPodium entries={MOCK_COLLECTION_PODIUM} />
                    </div>
                </section>

                <section
                    id="collection-meta"
                    className={styles.showcaseSection}
                >
                    <header className={styles.showcaseHeader}>
                        <p>Collection · 04</p>
                        <h2>Badges, rangs et critères</h2>
                        <span>
                            Les petites pièces qui font tenir le système de
                            classement.
                        </span>
                    </header>
                    <div className={styles.collectionMetaGrid}>
                        <div className={styles.metaPreview}>
                            {MOCK_COLLECTION_BADGES.slice(0, 3).map((badge) => (
                                <CollectionBadge
                                    key={badge.slug}
                                    collection={badge}
                                />
                            ))}
                            <div className={styles.rankRow}>
                                {MOCK_COLLECTION_RANKS.map((rank) => (
                                    <CollectionRank
                                        key={rank}
                                        rank={rank}
                                        showLabel
                                    />
                                ))}
                            </div>
                        </div>
                        <CollectionCriteria
                            criteria={MOCK_COLLECTION_CRITERIA}
                        />
                    </div>
                </section>
            </div>
            <ComponentsNavigation />
        </AtelierCategoryLayout>
    );
}
