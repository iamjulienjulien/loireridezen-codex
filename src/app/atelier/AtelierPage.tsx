"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import FauneCard from "../faune/FauneCard";
import FloreCard from "../flore/FloreCard";
import ChateauxCard from "../chateaux/ChateauxCard";
import ChateauxCardOld from "../chateaux/ChateauxCardOld";
import VignoblesCard from "../vignobles/VignoblesCard";
import VocabulaireCard from "../vocabulaire/VocabulaireCard";
import PatrimoineCard from "../patrimoine/PatrimoineCard";
import { MOCK_FAUNE } from "./mockFaune";
import { MOCK_FLORE } from "./mockFlore";
import { MOCK_CHATEAU } from "./mockChateau";
import { MOCK_VIGNOBLE } from "./mockVignoble";
import { MOCK_MOT } from "./mockMot";
import { MOCK_PATRIMOINE } from "./mockPatrimoine";
import TableOfContents, { type TocItem } from "./TableOfContents";
import styles from "./atelier.module.css";
import type { IndexEntry } from "@/registry/indexes";
import FauneCardOld from "../faune/FauneCardOld";
import FloreCardOld from "../flore/FloreCardOld";
import { CollectionCard } from "@/components/ui/collection-card";
import { MOCK_COLLECTIONS } from "./mockCollection";
import { CollectionEntryCard } from "@/components/ui/collection-entry-card";
import { MOCK_COLLECTION_ENTRIES } from "./mockCollectionEntry";
import { CollectionPodium } from "@/components/ui/collection-podium";
import { MOCK_COLLECTION_PODIUM } from "./mockCollectionEntry";
import { CollectionHero } from "@/components/ui/collection-hero";
import { MOCK_COLLECTION_HEROES } from "./mockCollectionHero";
import { CollectionBadge } from "@/components/ui/collection-badge";
import { MOCK_COLLECTION_BADGES } from "./mockCollectionBadge";
import { CollectionRank } from "@/components/ui/collection-rank";
import { MOCK_COLLECTION_RANKS } from "./mockCollectionRank";
import { CollectionCriteria } from "@/components/ui/collection-criteria";
import { MOCK_COLLECTION_CRITERIA } from "./mockCollectionCriteria";
import { CollectionList } from "@/components/ui/collection-list";

const TOC_ITEMS: TocItem[] = [
    { id: "faune", label: "FauneCard" },
    { id: "flore", label: "FloreCard" },
    { id: "chateaux", label: "ChateauxCard" },
    { id: "collections", label: "CollectionCard" },
    {
        id: "collection-entries",

        label: "CollectionEntryCard",
    },
    {
        id: "collection-podium",
        label: "CollectionPodium",
    },
    {
        id: "collection-heroes",
        label: "CollectionHero",
    },
    {
        id: "collection-badges",
        label: "CollectionBadge",
    },
    { id: "vignobles", label: "VignoblesCard" },
    { id: "vocabulaire", label: "VocabulaireCard" },
    { id: "patrimoine", label: "PatrimoineCard" },
];

type SectionProps<T, V extends number> = {
    id: string;
    title: string;
    desc: string;
    items: T[];
    keyOf: (d: T) => string;
    versions: readonly V[];
    defaultVersion?: V;
    note: (v: V) => string;
    render: (
        d: T,
        v: V,
        key: string,
        isOpen: boolean,
        onToggle: () => void,
    ) => ReactNode;
    open: Record<string, boolean>;
    allOpen: Record<string, boolean>;
    onToggle: (key: string) => void;
    onToggleAll: (groupKey: string, cardKeys: string[]) => void;
};

function AtelierSection<T, V extends number>({
    id,
    title,
    desc,
    items,
    keyOf,
    versions,
    defaultVersion,
    note,
    render,
    open,
    allOpen,
    onToggle,
    onToggleAll,
}: SectionProps<T, V>) {
    const [activeVersion, setActiveVersion] = useState<V>(
        defaultVersion ?? versions[0],
    );
    const tabsId = useId();

    const activeGroupKey = `${id}-${activeVersion}`;
    const activeCardKeys = items.map(
        (item) => `${activeGroupKey}-${keyOf(item)}`,
    );

    const selectAdjacentVersion = (currentVersion: V, direction: 1 | -1) => {
        const currentIndex = versions.indexOf(currentVersion);
        const nextIndex =
            (currentIndex + direction + versions.length) % versions.length;

        setActiveVersion(versions[nextIndex]);
    };

    const handleTabKeyDown = (
        event: KeyboardEvent<HTMLButtonElement>,
        version: V,
    ) => {
        switch (event.key) {
            case "ArrowRight":
                event.preventDefault();
                selectAdjacentVersion(version, 1);
                break;

            case "ArrowLeft":
                event.preventDefault();
                selectAdjacentVersion(version, -1);
                break;

            case "Home":
                event.preventDefault();
                setActiveVersion(versions[0]);
                break;

            case "End":
                event.preventDefault();
                setActiveVersion(versions[versions.length - 1]);
                break;
        }
    };

    return (
        <section id={id} className={styles.section}>
            <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <p className={styles.sectionDesc}>{desc}</p>
            </div>

            <div className={styles.tabs}>
                <div
                    className={styles.tabList}
                    role="tablist"
                    aria-label={`Versions de ${title}`}
                >
                    {versions.map((version) => {
                        const isActive = version === activeVersion;
                        const tabId = `${tabsId}-tab-${version}`;
                        const panelId = `${tabsId}-panel-${version}`;

                        return (
                            <button
                                key={version}
                                id={tabId}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={panelId}
                                tabIndex={isActive ? 0 : -1}
                                className={styles.tab}
                                data-active={isActive || undefined}
                                onClick={() => setActiveVersion(version)}
                                onKeyDown={(event) =>
                                    handleTabKeyDown(event, version)
                                }
                            >
                                <span className={styles.tabIndex}>
                                    {String(version).padStart(2, "0")}
                                </span>

                                <span className={styles.tabContent}>
                                    <span className={styles.tabLabel}>
                                        Version {version}
                                    </span>
                                    <span className={styles.tabNote}>
                                        {note(version)}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div
                    id={`${tabsId}-panel-${activeVersion}`}
                    className={styles.tabPanel}
                    role="tabpanel"
                    aria-labelledby={`${tabsId}-tab-${activeVersion}`}
                    tabIndex={0}
                >
                    <div className={styles.variantHead}>
                        <div className={styles.activeVariant}>
                            <span className={styles.variantLabel}>
                                Version {activeVersion}
                            </span>

                            <span className={styles.variantNote}>
                                {note(activeVersion)}
                            </span>
                        </div>

                        <button
                            type="button"
                            className={styles.switch}
                            role="switch"
                            aria-checked={Boolean(allOpen[activeGroupKey])}
                            onClick={() =>
                                onToggleAll(activeGroupKey, activeCardKeys)
                            }
                        >
                            <span
                                className={styles.switchTrack}
                                aria-hidden="true"
                            >
                                <span className={styles.switchThumb} />
                            </span>

                            {allOpen[activeGroupKey]
                                ? "Tout replier"
                                : "Tout déplier"}
                        </button>
                    </div>

                    <div className={styles.grid}>
                        {items.map((item, index) => {
                            const key = activeCardKeys[index];

                            return render(
                                item,
                                activeVersion,
                                key,
                                Boolean(open[key]),
                                () => onToggle(key),
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function AtelierHomePage({
    indexes,
}: {
    indexes: readonly IndexEntry[];
}) {
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const [allOpen, setAllOpen] = useState<Record<string, boolean>>({});

    const indexesList = indexes.map((index) => index.slug);

    const toggle = (key: string) => {
        setOpen((current) => ({
            ...current,
            [key]: !current[key],
        }));
    };

    const toggleAll = (groupKey: string, cardKeys: string[]) => {
        const next = !allOpen[groupKey];

        setAllOpen((current) => ({
            ...current,
            [groupKey]: next,
        }));

        setOpen((current) => {
            const updated = { ...current };

            for (const key of cardKeys) {
                updated[key] = next;
            }

            return updated;
        });
    };

    return (
        <main className={styles.page}>
            <TableOfContents
                items={TOC_ITEMS.filter(
                    (item) =>
                        item.id === "collections" ||
                        item.id === "collection-heroes" ||
                        item.id === "collection-entries" ||
                        item.id === "collection-podium" ||
                        item.id === "collection-badges" ||
                        indexesList.includes(item.id),
                )}
            />

            <div className={styles.wrap}>
                <header className={styles.head}>
                    <div className={styles.eyebrow}>Loire Ride Zen · Codex</div>

                    <h1 className={styles.title}>Atelier</h1>

                    <p className={styles.lede}>
                        La collection des esquisses de composants — variantes,
                        états et données de démonstration, au même endroit.
                    </p>

                    <nav
                        className={styles.componentNav}
                        aria-label="Composants UI"
                    >
                        <span className={styles.componentNavLabel}>
                            Composants UI
                        </span>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-badge"
                        >
                            <span>LRZBadge</span>
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-anecdote"
                        >
                            <span>LRZAnecdote</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-accordion"
                        >
                            <span>LRZAccordion</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-separateur"
                        >
                            <span>LRZSeparateur</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-section"
                        >
                            <span>LRZSection</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-card"
                        >
                            <span>LRZCard</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-meta-list"
                        >
                            <span>LRZMetaList</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </nav>
                    <nav
                        className={styles.componentNav}
                        aria-label="Composants Doc"
                    >
                        <span className={styles.componentNavLabel}>
                            Composants Doc
                        </span>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-code-block"
                        >
                            <span>LRZDocCodeBlock</span>
                            {/* <small>Bloc de code</small> */}
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-code-inline"
                        >
                            <span>LRZDocCodeInline</span>
                            {/* <small>Extrait de code</small> */}
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-list"
                        >
                            <span>LRZDocList</span>
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-quote"
                        >
                            <span>LRZDocQuote</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </nav>
                </header>

                {indexesList.includes("faune") && (
                    <AtelierSection
                        id="faune"
                        title="FauneCard"
                        desc={`Carte d'espèce de l'index Faune — ${MOCK_FAUNE.length} animaux de démonstration (2 par type, tirés du catalogue).`}
                        items={MOCK_FAUNE}
                        keyOf={(d) => d.nomScientifique}
                        versions={[1, 2, 3] as const}
                        defaultVersion={2}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "identité colorée par type + emoji custom agrandi"
                                  : "fiche naturaliste complète : hero, stats, tags, anecdote"
                        }
                        render={(d, v, key, isOpen, onToggle) =>
                            v === 2 ? (
                                <FauneCard
                                    key={key}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            ) : (
                                <FauneCardOld
                                    key={key}
                                    version={v}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            )
                        }
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("flore") && (
                    <AtelierSection
                        id="flore"
                        title="FloreCard"
                        desc={`Carte d'espèce de l'index Flore — ${MOCK_FLORE.length} plantes de démonstration (2 par catégorie, tirées du catalogue).`}
                        items={MOCK_FLORE}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        defaultVersion={2}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "identité colorée par catégorie"
                                  : "fiche botanique complète : hero, stats, tags, anecdote"
                        }
                        render={(d, v, key, isOpen, onToggle) =>
                            v === 2 ? (
                                <FloreCard
                                    key={key}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            ) : (
                                <FloreCardOld
                                    key={key}
                                    version={v}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            )
                        }
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("chateaux") && (
                    <AtelierSection
                        id="chateaux"
                        title="ChateauxCard"
                        desc={`Carte de château de l'index Châteaux — ${MOCK_CHATEAU.length} châteaux de démonstration (jusqu’à 2 par époque, tirés du catalogue).`}
                        items={MOCK_CHATEAU}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3, 4] as const}
                        defaultVersion={4}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "corniche par époque + vignette encadrée + ✦ phares"
                                  : v === 3
                                    ? "fiche complète : hero paysage, stats, classement, résumé"
                                    : "scène illustrée : château détouré, informations structurées, protections"
                        }
                        render={(d, v, key, isOpen, onToggle) =>
                            v === 4 ? (
                                <ChateauxCard
                                    key={key}

                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            ) : (
                                <ChateauxCardOld
                                    key={key}
                                    version={v}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            )
                        }
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                <section id="collections" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>CollectionCard</h2>

                        <p className={styles.sectionDesc}>
                            Carte éditoriale présentant une collection ou un
                            classement thématique du Codex des Châteaux. Quatre
                            collections permettent de comparer les accents, les
                            longueurs de titres et les volumes de classement.
                        </p>
                    </div>

                    <div className={styles.collectionVariants}>
                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-default-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-default-title"
                                        className={styles.variantLabel}
                                    >
                                        Default
                                    </span>

                                    <span className={styles.variantNote}>
                                        Carte principale pour la grille des
                                        collections
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTIONS.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionGrid}>
                                {MOCK_COLLECTIONS.map((collection) => (
                                    <CollectionCard
                                        key={`default-${collection.slug}`}
                                        collection={collection}
                                        variant="default"
                                    />
                                ))}
                            </div>
                        </section>

                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-compact-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-compact-title"
                                        className={styles.variantLabel}
                                    >
                                        Compact
                                    </span>

                                    <span className={styles.variantNote}>
                                        Navigation secondaire, recherche et
                                        panneaux étroits
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTIONS.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionCompactGrid}>
                                {MOCK_COLLECTIONS.map((collection) => (
                                    <CollectionCard
                                        key={`compact-${collection.slug}`}
                                        collection={collection}
                                        variant="compact"
                                    />
                                ))}
                            </div>
                        </section>

                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-featured-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-featured-title"
                                        className={styles.variantLabel}
                                    >
                                        Featured
                                    </span>

                                    <span className={styles.variantNote}>
                                        Collections mises en avant avec
                                        composition éditoriale élargie
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTIONS.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionFeaturedList}>
                                {MOCK_COLLECTIONS.map((collection) => (
                                    <CollectionCard
                                        key={`featured-${collection.slug}`}
                                        collection={collection}
                                        variant="featured"
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </section>

                <section id="collection-entries" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>
                            CollectionEntryCard
                        </h2>

                        <p className={styles.sectionDesc}>
                            Carte représentant un château à l’intérieur d’un
                            classement éditorial. Le rang, l’illustration et la
                            justification propre à la collection en constituent
                            les principaux repères.
                        </p>
                    </div>

                    <div className={styles.collectionVariants}>
                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-entry-default-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-entry-default-title"
                                        className={styles.variantLabel}
                                    >
                                        Default
                                    </span>

                                    <span className={styles.variantNote}>
                                        Entrée principale des pages de
                                        classement
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTION_ENTRIES.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionEntryList}>
                                {MOCK_COLLECTION_ENTRIES.map(
                                    ({ collectionEntry, castle }) => (
                                        <CollectionEntryCard
                                            key={`default-${collectionEntry.slug}`}
                                            collectionEntry={collectionEntry}
                                            castle={castle}
                                            variant="default"
                                        />
                                    ),
                                )}
                            </div>
                        </section>

                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-entry-compact-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-entry-compact-title"
                                        className={styles.variantLabel}
                                    >
                                        Compact
                                    </span>

                                    <span className={styles.variantNote}>
                                        Listes secondaires, recommandations et
                                        espaces plus étroits
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTION_ENTRIES.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionEntryCompactGrid}>
                                {MOCK_COLLECTION_ENTRIES.map(
                                    ({ collectionEntry, castle }) => (
                                        <CollectionEntryCard
                                            key={`compact-${collectionEntry.slug}`}
                                            collectionEntry={collectionEntry}
                                            castle={castle}
                                            variant="compact"
                                        />
                                    ),
                                )}
                            </div>
                        </section>

                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-entry-podium-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-entry-podium-title"
                                        className={styles.variantLabel}
                                    >
                                        Podium
                                    </span>

                                    <span className={styles.variantNote}>
                                        Mise en scène renforcée des trois
                                        premières places
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    3 exemples
                                </span>
                            </div>

                            <div className={styles.collectionEntryPodiumList}>
                                {MOCK_COLLECTION_ENTRIES.slice(0, 3).map(
                                    ({ collectionEntry, castle }) => (
                                        <CollectionEntryCard
                                            key={`podium-${collectionEntry.slug}`}
                                            collectionEntry={collectionEntry}
                                            castle={castle}
                                            variant="podium"
                                        />
                                    ),
                                )}
                            </div>
                        </section>
                    </div>
                </section>

                <section id="collection-podium" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>
                            CollectionPodium
                        </h2>

                        <p className={styles.sectionDesc}>
                            Mise en scène des trois premières places d’une
                            collection. Le premier château domine la
                            composition, entouré des médaillés d’argent et de
                            bronze.
                        </p>
                    </div>

                    <div className={styles.collectionVariant}>
                        <div className={styles.variantHead}>
                            <div className={styles.activeVariant}>
                                <span className={styles.variantLabel}>
                                    Podium olympique
                                </span>

                                <span className={styles.variantNote}>
                                    Ordre visuel 2 · 1 · 3, marches
                                    hiérarchisées et médailles métalliques
                                </span>
                            </div>

                            <span className={styles.variantCount}>
                                3 finalistes
                            </span>
                        </div>

                        <CollectionPodium
                            eyebrow="Les incontournables du Val"
                            title="Le trio de tête"
                            entries={MOCK_COLLECTION_PODIUM}
                        />
                    </div>
                </section>

                <section id="collection-heroes" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>CollectionHero</h2>

                        <p className={styles.sectionDesc}>
                            En-tête éditorial d’une page de collection. Il
                            installe le thème, la promesse narrative, les
                            métadonnées et l’illustration principale avant le
                            podium et le classement.
                        </p>
                    </div>

                    <div className={styles.collectionVariants}>
                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-hero-default-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-hero-default-title"
                                        className={styles.variantLabel}
                                    >
                                        Default
                                    </span>

                                    <span className={styles.variantNote}>
                                        En-tête principal des pages de
                                        collection
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTION_HEROES.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionHeroList}>
                                {MOCK_COLLECTION_HEROES.map((collection) => (
                                    <CollectionHero
                                        key={`default-${collection.slug}`}
                                        collection={collection}
                                        variant="default"
                                    />
                                ))}
                            </div>
                        </section>

                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-hero-immersive-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-hero-immersive-title"
                                        className={styles.variantLabel}
                                    >
                                        Immersive
                                    </span>

                                    <span className={styles.variantNote}>
                                        Composition monumentale pour les
                                        collections mises à l’honneur
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    3 exemples
                                </span>
                            </div>

                            <div className={styles.collectionHeroList}>
                                {MOCK_COLLECTION_HEROES.slice(0, 3).map(
                                    (collection) => (
                                        <CollectionHero
                                            key={`immersive-${collection.slug}`}
                                            collection={collection}
                                            variant="immersive"
                                        />
                                    ),
                                )}
                            </div>
                        </section>

                        <section
                            className={styles.collectionVariant}
                            aria-labelledby="collection-hero-compact-title"
                        >
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span
                                        id="collection-hero-compact-title"
                                        className={styles.variantLabel}
                                    >
                                        Compact
                                    </span>

                                    <span className={styles.variantNote}>
                                        Introduction condensée pour les pages
                                        secondaires et aperçus éditoriaux
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTION_HEROES.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionHeroCompactGrid}>
                                {MOCK_COLLECTION_HEROES.map((collection) => (
                                    <CollectionHero
                                        key={`compact-${collection.slug}`}
                                        collection={collection}
                                        variant="compact"
                                        href={`/codex/chateaux/collections/${collection.slug}`}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </section>

                <section id="collection-badges" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>CollectionBadge</h2>

                        <p className={styles.sectionDesc}>
                            Badge compact représentant l’appartenance à une
                            collection. Il accompagne les fiches château, les
                            résultats de recherche, les filtres et les marqueurs
                            de la carte.
                        </p>
                    </div>

                    <div className={styles.collectionVariants}>
                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Default
                                    </span>

                                    <span className={styles.variantNote}>
                                        Badge principal avec identité complète
                                    </span>
                                </div>

                                <span className={styles.variantCount}>
                                    {MOCK_COLLECTION_BADGES.length} exemples
                                </span>
                            </div>

                            <div className={styles.collectionBadgeRow}>
                                {MOCK_COLLECTION_BADGES.map((collection) => (
                                    <CollectionBadge
                                        key={`default-${collection.slug}`}
                                        collection={collection}
                                        variant="default"
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Compact
                                    </span>

                                    <span className={styles.variantNote}>
                                        Résultats de recherche et métadonnées
                                    </span>
                                </div>
                            </div>

                            <div className={styles.collectionBadgeRow}>
                                {MOCK_COLLECTION_BADGES.map((collection) => (
                                    <CollectionBadge
                                        key={`compact-${collection.slug}`}
                                        collection={collection}
                                        variant="compact"
                                        size="sm"
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Icon
                                    </span>

                                    <span className={styles.variantNote}>
                                        Carte, marqueurs et espaces très réduits
                                    </span>
                                </div>
                            </div>

                            <div className={styles.collectionBadgeRow}>
                                {MOCK_COLLECTION_BADGES.map((collection) => (
                                    <CollectionBadge
                                        key={`icon-${collection.slug}`}
                                        collection={collection}
                                        variant="icon"
                                        size="lg"
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Interactive
                                    </span>

                                    <span className={styles.variantNote}>
                                        Navigation vers une page de collection
                                    </span>
                                </div>
                            </div>

                            <div className={styles.collectionBadgeRow}>
                                {MOCK_COLLECTION_BADGES.map((collection) => (
                                    <CollectionBadge
                                        key={`interactive-${collection.slug}`}
                                        collection={collection}
                                        href={`/codex/chateaux/collections/${collection.slug}`}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </section>

                <section id="collection-ranks" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>CollectionRank</h2>

                        <p className={styles.sectionDesc}>
                            Indicateur de rang centralisé pour les podiums,
                            classements et cartes de collection. Les trois
                            premières places reçoivent automatiquement leurs
                            métaux.
                        </p>
                    </div>

                    <div className={styles.collectionVariants}>
                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Badge
                                    </span>

                                    <span className={styles.variantNote}>
                                        Rang compact pour les cartes de
                                        classement
                                    </span>
                                </div>
                            </div>

                            <div className={styles.collectionRankRow}>
                                {MOCK_COLLECTION_RANKS.map((rank) => (
                                    <CollectionRank
                                        key={`badge-${rank}`}
                                        rank={rank}
                                        variant="badge"
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Medal
                                    </span>

                                    <span className={styles.variantNote}>
                                        Médailles pour le podium
                                    </span>
                                </div>
                            </div>

                            <div className={styles.collectionRankRow}>
                                {[1, 2, 3].map((rank) => (
                                    <CollectionRank
                                        key={`medal-${rank}`}
                                        rank={rank}
                                        variant="medal"
                                        size="lg"
                                        showLabel
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Plain
                                    </span>

                                    <span className={styles.variantNote}>
                                        Rang minimal pour les listes très denses
                                    </span>
                                </div>
                            </div>

                            <div className={styles.collectionRankRow}>
                                {MOCK_COLLECTION_RANKS.map((rank) => (
                                    <CollectionRank
                                        key={`plain-${rank}`}
                                        rank={rank}
                                        variant="plain"
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </section>

                <section id="collection-criteria" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>
                            CollectionCriteria
                        </h2>

                        <p className={styles.sectionDesc}>
                            Encadré méthodologique présentant les critères
                            utilisés pour construire un classement éditorial.
                        </p>
                    </div>

                    <div className={styles.collectionVariants}>
                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Card
                                    </span>

                                    <span className={styles.variantNote}>
                                        Affichage permanent sur une page de
                                        collection
                                    </span>
                                </div>
                            </div>

                            <CollectionCriteria
                                description={
                                    "Le classement croise plusieurs critères. Il ne cherche pas à produire une vérité absolue, mais une lecture éditoriale cohérente."
                                }
                                criteria={MOCK_COLLECTION_CRITERIA}
                            />
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Accordion
                                    </span>

                                    <span className={styles.variantNote}>
                                        Version repliable pour les pages plus
                                        denses
                                    </span>
                                </div>
                            </div>

                            <CollectionCriteria
                                variant="accordion"
                                criteria={MOCK_COLLECTION_CRITERIA}
                            />
                        </section>
                    </div>
                </section>

                <section id="collection-list" className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>CollectionList</h2>

                        <p className={styles.sectionDesc}>
                            Conteneur de layout pour le classement complet. Il
                            gère uniquement l’espacement et l’empilement des
                            entrées.
                        </p>
                    </div>

                    <div className={styles.collectionVariants}>
                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Default
                                    </span>

                                    <span className={styles.variantNote}>
                                        Espacement standard entre les entrées
                                    </span>
                                </div>
                            </div>

                            <CollectionList
                                as="ol"
                                aria-label="Classement complet des châteaux"
                            >
                                {MOCK_COLLECTION_ENTRIES.map(
                                    ({ collectionEntry, castle }) => (
                                        <li key={collectionEntry.slug}>
                                            <CollectionEntryCard
                                                collectionEntry={
                                                    collectionEntry
                                                }
                                                castle={castle}
                                            />
                                        </li>
                                    ),
                                )}
                            </CollectionList>
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Compact
                                    </span>

                                    <span className={styles.variantNote}>
                                        Version dense pour les classements longs
                                    </span>
                                </div>
                            </div>

                            <CollectionList
                                as="ol"
                                gap="sm"
                                aria-label="Classement compact des châteaux"
                            >
                                {MOCK_COLLECTION_ENTRIES.map(
                                    ({ collectionEntry, castle }) => (
                                        <li key={collectionEntry.slug}>
                                            <CollectionEntryCard
                                                collectionEntry={
                                                    collectionEntry
                                                }
                                                castle={castle}
                                                variant="compact"
                                            />
                                        </li>
                                    ),
                                )}
                            </CollectionList>
                        </section>

                        <section className={styles.collectionVariant}>
                            <div className={styles.variantHead}>
                                <div className={styles.activeVariant}>
                                    <span className={styles.variantLabel}>
                                        Dividers
                                    </span>

                                    <span className={styles.variantNote}>
                                        Liste continue sans espacement
                                    </span>
                                </div>
                            </div>

                            <CollectionList
                                as="ol"
                                dividers
                                aria-label="Classement continu des châteaux"
                            >
                                {MOCK_COLLECTION_ENTRIES.map(
                                    ({ collectionEntry, castle }) => (
                                        <li key={collectionEntry.slug}>
                                            <CollectionEntryCard
                                                collectionEntry={
                                                    collectionEntry
                                                }
                                                castle={castle}
                                                variant="compact"
                                            />
                                        </li>
                                    ),
                                )}
                            </CollectionList>
                        </section>
                    </div>
                </section>

                {indexesList.includes("vignobles") && (
                    <AtelierSection
                        id="vignobles"
                        title="VignoblesCard"
                        desc={`Carte d'appellation de l'index Vignobles — ${MOCK_VIGNOBLE.length} appellations de démonstration (2 par couleur, tirées du catalogue).`}
                        items={MOCK_VIGNOBLE}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "robe au fond du verre + goutte auréolée"
                                  : "fiche vinicole complète : robe en avatar, stats, accord, résumé"
                        }
                        render={(d, v, key, isOpen, onToggle) => (
                            <VignoblesCard
                                key={key}
                                version={v}
                                d={d}
                                open={isOpen}
                                onToggle={onToggle}
                            />
                        )}
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("vocabulaire") && (
                    <AtelierSection
                        id="vocabulaire"
                        title="VocabulaireCard"
                        desc={`Entrée de l'index Vocabulaire — ${MOCK_MOT.length} mots de démonstration (2 par catégorie, tirés du catalogue).`}
                        items={MOCK_MOT}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine (patine mémorielle)"
                                : v === 2
                                  ? "filet par catégorie + initiale enluminée"
                                  : "fiche complète : initiale en avatar, définition, exemple, étymologie"
                        }
                        render={(d, v, key, isOpen, onToggle) => (
                            <VocabulaireCard
                                key={key}
                                version={v}
                                d={d}
                                open={isOpen}
                                onToggle={onToggle}
                            />
                        )}
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("patrimoine") && (
                    <AtelierSection
                        id="patrimoine"
                        title="PatrimoineCard"
                        desc={`Fiche d'inventaire de l'index Patrimoine — ${MOCK_PATRIMOINE.length} ouvrages de démonstration (jusqu'à 2 par type, tirés du catalogue).`}
                        items={MOCK_PATRIMOINE}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine (fiche d'inventaire)"
                                : v === 2
                                  ? "identité colorée par type d'ouvrage"
                                  : "fiche complète : hero, stats, classement, résumé"
                        }
                        render={(d, v, key, isOpen, onToggle) => (
                            <PatrimoineCard
                                key={key}
                                version={v}
                                d={d}
                                numero={MOCK_PATRIMOINE.indexOf(d) + 1}
                                open={isOpen}
                                onToggle={onToggle}
                            />
                        )}
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}
            </div>
        </main>
    );
}
