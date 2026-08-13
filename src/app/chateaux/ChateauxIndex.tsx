"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { LayoutGrid, Map as MapIcon, MapPinned } from "lucide-react";

import type { Chateau } from "@/types/chateau";
import type { IndexEntry } from "@/registry/indexes";
import type { PersonnagesParLieu } from "@/types/personnage";

import { getCollectionsByIndexForEnv } from "@/registry/collections";

import IndexPresentation from "@/components/IndexPresentation";
import { PageControls } from "@/components/_layout/PageControls";
import { LRZCardDialog } from "@/components/_ui/LRZCardDialog";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { SITE_URL } from "@/lib/site-metadata";

import { CollectionCard } from "@/components/_collections/CollectionCard";

import { getIndex } from "@/registry/indexes";

import ChateauxCard from "@/components/_cards/ChateauxCard";

import styles from "./chateaux.module.css";
import { LRZSection } from "@/components/_ui/LRZSection";
import { featureIsEnabled } from "@/registry/feature-flags";
import { TerritoireSection } from "@/components/TerritoireSection";
import { getTerritoiresWithChateaux } from "@/registry/chateaux-territoires";
import ChateauxInteractiveMap from "@/components/_maps/chateaux/ChateauxInteractiveMap";
import { CHATEAUX_MAP_CONFIG } from "@/components/_maps/chateaux/config";
import {
    CHATEAUX_MAP_SYNC_EVENT,
    dispatchChateauxMapSync,
    type ChateauxMapSyncDetail,
} from "@/components/_maps/chateaux/sync";
import LRZSeparateur from "@/components/_ui/LRZSeparateur";

const FEATURED_COLLECTION_SLUG = "incontournables-du-val";
const SECONDARY_COLLECTION_SLUGS = [
    "sur-les-traces-des-rois",
    "chefs-doeuvre-renaissance",
    "plus-ligeriens",
] as const;

const EPOQUE_PRESET_VALUES: Record<string, Chateau["epoque"]> = {
    "moyen-age": "Médiéval",
    renaissance: "Renaissance",
    "ancien-regime": "Classique",
    "xixe-siecle": "Éclectique",
};

type CollectionsLayout = "editorial" | "three-columns";

// Option de test conservée : passer à "three-columns" pour comparer les deux
// agencements sans changer les données ni les variantes de CollectionCard.
const COLLECTIONS_LAYOUT: CollectionsLayout = "editorial";

const norm = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

type ChateauxIndexProps = {
    chateaux: Chateau[];
    indexes: readonly IndexEntry[];
    personnagesByChateau: PersonnagesParLieu;
    initialOpenSlug?: string;
};

export default function ChateauxIndex({
    chateaux,
    indexes,
    personnagesByChateau,
    initialOpenSlug,
}: ChateauxIndexProps) {
    const entry = getIndex("/chateaux")!;

    const [epoque, setEpoque] = useState<string>("all");
    const [renommee, setRenommee] = useState<string>("all");
    const [q, setQ] = useState("");
    const [groupByTerritory, setGroupByTerritory] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const catalogueRef = useRef<HTMLDivElement>(null);
    const collections = useMemo(() => {
        const castleBySlug = new Map(
            chateaux.map((castle) => [castle.slug, castle]),
        );

        return getCollectionsByIndexForEnv(
            "chateaux",
            process.env.NEXT_PUBLIC_CURRENT_ENV,
        ).map((collection) => ({
            href: collection.href,

            data: {
                slug: collection.slug,
                titre: collection.title,
                emoji: collection.mark,
                sousTitre: collection.subtitle,
                type: collection.type,
                accent: collection.accent,
                customEmoji: collection.customEmoji,

                classement: collection.ranking.map((rankingEntry) => {
                    const castle = castleBySlug.get(rankingEntry.slug);

                    return {
                        rang: rankingEntry.rang,
                        slug: rankingEntry.slug,
                        nom: castle?.nom ?? rankingEntry.slug,
                    };
                }),
            },
        }));
    }, [chateaux]);

    const featuredCollection = collections.find(
        ({ data }) => data.slug === FEATURED_COLLECTION_SLUG,
    );
    const secondaryCollections = SECONDARY_COLLECTION_SLUGS.flatMap((slug) =>
        collections.filter(({ data }) => data.slug === slug),
    );
    const displayedCollectionSlugs = new Set([
        featuredCollection?.data.slug,
        ...secondaryCollections.map(({ data }) => data.slug),
    ]);
    const additionalCollections = collections.filter(
        ({ data }) => !displayedCollectionSlugs.has(data.slug),
    );

    const list = useMemo(() => {
        const normalizedQuery = norm(q.trim());
        const catalogueEpoque = EPOQUE_PRESET_VALUES[epoque] ?? epoque;

        return chateaux.filter((castle) => {
            if (epoque !== "all" && castle.epoque !== catalogueEpoque) {
                return false;
            }

            if (renommee !== "all" && castle.renommee !== renommee) {
                return false;
            }

            if (normalizedQuery) {
                const searchableContent = norm(
                    [
                        castle.nom,
                        castle.commune,
                        castle.style,
                        castle.commanditaire ?? "",
                        ...castle.autresNoms,
                    ].join(" "),
                );

                if (!searchableContent.includes(normalizedQuery)) {
                    return false;
                }
            }

            return true;
        });
    }, [chateaux, epoque, renommee, q]);

    const territorySections = useMemo(
        () => (groupByTerritory ? getTerritoiresWithChateaux(list) : []),
        [groupByTerritory, list],
    );
    const openChateau = openSlug
        ? chateaux.find((castle) => castle.slug === openSlug)
        : undefined;
    const openChateauIndex = openChateau ? chateaux.indexOf(openChateau) : -1;
    const hasActiveFilters = epoque !== "all" || renommee !== "all" || q !== "";

    useEffect(() => {
        if (window.matchMedia("(max-width: 760px)").matches) return;

        const catalogue = catalogueRef.current;
        if (!catalogue) return;

        const cards = Array.from(
            catalogue.querySelectorAll<HTMLElement>("[data-map-sync-card]"),
        );
        const territories = Array.from(
            catalogue.querySelectorAll<HTMLElement>(
                "[data-map-sync-territory]",
            ),
        );
        const visibleSlugs = new Set<string>();
        const visibleTerritories = new Set<string>();
        let frame = 0;
        let signature = "";
        let territorySignature = "";

        const emitViewport = () => {
            frame = 0;
            const centralY = window.innerHeight / 2;
            const visibleCards = cards.filter((card) =>
                visibleSlugs.has(card.dataset.chateauMapSlug ?? ""),
            );
            const primarySlug = visibleCards
                .map((card) => {
                    const rect = card.getBoundingClientRect();
                    return {
                        slug: card.dataset.chateauMapSlug,
                        distance: Math.abs(
                            rect.top + rect.height / 2 - centralY,
                        ),
                    };
                })
                .sort((a, b) => a.distance - b.distance)[0]?.slug;
            const slugs = [...visibleSlugs].sort();
            const nextSignature = `${slugs.join(",")}|${primarySlug ?? ""}`;

            if (nextSignature !== signature) {
                signature = nextSignature;
                dispatchChateauxMapSync({
                    source: "catalogue",
                    type: "viewport",
                    visibleSlugs: slugs,
                    primarySlug,
                });
            }

            const territorySlug = territories
                .filter((territory) =>
                    visibleTerritories.has(
                        territory.dataset.mapSyncTerritory ?? "",
                    ),
                )
                .map((territory) => {
                    const rect = territory.getBoundingClientRect();
                    return {
                        slug: territory.dataset.mapSyncTerritory,
                        distance: Math.abs(
                            rect.top - window.innerHeight * 0.28,
                        ),
                    };
                })
                .sort((a, b) => a.distance - b.distance)[0]?.slug;

            if (territorySlug === territorySignature) return;
            territorySignature = territorySlug ?? "";
            dispatchChateauxMapSync({
                source: "catalogue",
                type: "territory",
                territorySlug,
            });
        };
        const scheduleViewport = () => {
            if (!frame) frame = requestAnimationFrame(emitViewport);
        };
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;
                    const slug = target.dataset.chateauMapSlug;
                    const territorySlug = target.dataset.mapSyncTerritory;

                    if (slug) {
                        if (entry.isIntersecting) visibleSlugs.add(slug);
                        else visibleSlugs.delete(slug);
                    }
                    if (territorySlug) {
                        if (entry.isIntersecting) {
                            visibleTerritories.add(territorySlug);
                        } else {
                            visibleTerritories.delete(territorySlug);
                        }
                    }
                });
                scheduleViewport();
            },
            { threshold: [0, 0.15, 0.5, 0.85] },
        );

        cards.forEach((card) => observer.observe(card));
        territories.forEach((territory) => observer.observe(territory));
        window.addEventListener("scroll", scheduleViewport, { passive: true });
        scheduleViewport();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", scheduleViewport);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [groupByTerritory, list]);

    useEffect(() => {
        const onMapSync = (event: Event) => {
            const detail = (event as CustomEvent<ChateauxMapSyncDetail>).detail;
            if (detail.source !== "map" || detail.type !== "hover") return;

            catalogueRef.current
                ?.querySelectorAll<HTMLElement>("[data-map-sync-card]")
                .forEach((card) => {
                    card.toggleAttribute(
                        "data-map-highlight",
                        card.dataset.chateauMapSlug === detail.slug,
                    );
                });
        };

        window.addEventListener(CHATEAUX_MAP_SYNC_EVENT, onMapSync);
        return () =>
            window.removeEventListener(CHATEAUX_MAP_SYNC_EVENT, onMapSync);
    }, [groupByTerritory, list]);

    const syncCatalogueHover = (
        target: EventTarget | null,
        active: boolean,
    ) => {
        const card = (target as HTMLElement | null)?.closest<HTMLElement>(
            "[data-map-sync-card]",
        );
        if (!card) return;

        dispatchChateauxMapSync({
            source: "catalogue",
            type: "hover",
            slug: active ? card.dataset.chateauMapSlug : undefined,
        });
    };

    const resetFilters = () => {
        setEpoque("all");
        setRenommee("all");
        setQ("");
    };

    const showChateauOnMap = useCallback((slug: string) => {
        setIsMapOpen(true);
        dispatchChateauxMapSync({
            source: "catalogue",
            type: "focus",
            slug,
        });
    }, []);

    const indexControls = (
        <PageControls
            variant="chateaux"
            query={q}
            onQuery={setQ}
            placeholder="Chercher un château…"
            resultCount={list.length}
            totalCount={chateaux.length}
            unit={list.length > 1 ? "châteaux" : "château"}
            accent={entry.accent}
            buttonColor={entry.color}
            mode="filters-toggle"
            reset={{
                active: hasActiveFilters,
                onReset: resetFilters,
            }}
            groups={[
                {
                    label: "Époque",
                    active: epoque,
                    onSelect: setEpoque,
                    preset: {
                        collection: "common",
                        meta: "epoque",
                    },
                    getCount: (id) =>
                        chateaux.filter(
                            (chateau) =>
                                chateau.epoque === EPOQUE_PRESET_VALUES[id],
                        ).length,
                },
                {
                    label: "Renommée",
                    active: renommee,
                    onSelect: setRenommee,
                    preset: {
                        collection: "chateau" as const,
                        meta: "renommee" as const,
                    },
                    getCount: (id: string) =>
                        chateaux.filter((chateau) => chateau.renommee === id)
                            .length,
                },
            ]}
            viewGroup={{
                value: groupByTerritory ? "territoires" : "catalogue",
                onValueChange: (value) =>
                    setGroupByTerritory(value === "territoires"),
                ariaLabel: "Organisation du catalogue de châteaux",
                options: [
                    {
                        value: "catalogue",
                        label: "Catalogue",
                        icon: <LayoutGrid aria-hidden="true" />,
                    },
                    {
                        value: "territoires",
                        label: "Territoires",
                        icon: <MapPinned aria-hidden="true" />,
                    },
                ],
            }}
            action={{
                label: "Carte",
                activeLabel: "Carte",
                active: isMapOpen,
                icon: <MapIcon aria-hidden="true" />,
                onClick: () => setIsMapOpen((open) => !open),
            }}
        />
    );

    const catalogue =
        list.length === 0 ? (
            <p className={styles.empty}>
                Aucun château à cet endroit du fil. Élargis la recherche ou
                change de filtre.
            </p>
        ) : groupByTerritory ? (
            <div className={styles.territories}>
                {territorySections.map(({ territory, chateaux }) => (
                    <TerritoireSection
                        key={territory.slug}
                        territory={territory}
                        chateaux={chateaux}
                        personnagesByChateau={personnagesByChateau}
                        mapSync
                        onShowOnMap={showChateauOnMap}
                    />
                ))}
            </div>
        ) : (
            <div className={styles.grid}>
                {list.map((castle) => (
                    <div
                        id={`chateau-${castle.slug}`}
                        data-chateau-map-slug={castle.slug}
                        data-map-sync-card=""
                        key={castle.slug}
                    >
                        <ChateauxCard
                            d={castle}
                            personnages={
                                personnagesByChateau[castle.slug] ?? []
                            }
                            onShowOnMap={showChateauOnMap}
                        />
                    </div>
                ))}
            </div>
        );

    return (
        <>
            {openChateau ? (
                <LRZCardDialog
                    open={Boolean(openChateau)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setOpenSlug(undefined);
                            router.replace("/chateaux");
                        }
                    }}
                    indexLabel={entry.title}
                    indexIcon={
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="chateaux"
                            size="md"
                            decorative
                        />
                    }
                    item={{ id: openChateau.slug, label: openChateau.nom }}
                    navigation={{
                        position: openChateauIndex + 1,
                        total: chateaux.length,
                        previous:
                            openChateauIndex > 0
                                ? {
                                      id: chateaux[openChateauIndex - 1].slug,
                                      label: chateaux[openChateauIndex - 1].nom,
                                  }
                                : undefined,
                        next:
                            openChateauIndex < chateaux.length - 1
                                ? {
                                      id: chateaux[openChateauIndex + 1].slug,
                                      label: chateaux[openChateauIndex + 1].nom,
                                  }
                                : undefined,
                        onNavigate: ({ id }) => {
                            setOpenSlug(id);
                            router.replace(`/chateau/${id}`);
                        },
                    }}
                    share={{
                        title: `${openChateau.nom} — ${entry.title}`,
                        url: `${SITE_URL}/chateau/${openChateau.slug}`,
                    }}
                    color={entry.color}
                >
                    <ChateauxCard
                        d={openChateau}
                        personnages={
                            personnagesByChateau[openChateau.slug] ?? []
                        }
                        onShowOnMap={showChateauOnMap}
                    />
                </LRZCardDialog>
            ) : null}

            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/chateaux"
                indexes={indexes}
            />

            {featureIsEnabled("collections") && (
                <LRZSection
                    eyebrow="Collections du Codex"
                    title="Explorer les châteaux autrement"
                    // description="Des forteresses médiévales aux demeures de plaisance, ces collections relient les châteaux par époque, architecture, personnages et façons d’habiter le pouvoir."
                    tone="surface"
                    color={entry.color}
                    spacing="sm"
                    className="mb-10"
                >
                    <div
                        className={styles.collectionsGrid}
                        data-layout={COLLECTIONS_LAYOUT}
                    >
                        {COLLECTIONS_LAYOUT === "three-columns" ? (
                            collections.map(({ data, href }) => (
                                <CollectionCard
                                    key={data.slug}
                                    collection={data}
                                    href={href}
                                    variant="compact"
                                />
                            ))
                        ) : (
                            <>
                                {featuredCollection ? (
                                    <CollectionCard
                                        collection={featuredCollection.data}
                                        href={featuredCollection.href}
                                        variant="featured"
                                        className={styles.collectionFeatured}
                                    />
                                ) : null}

                                {secondaryCollections.length > 0 ? (
                                    <div
                                        className={styles.collectionsSecondary}
                                    >
                                        {secondaryCollections.map(
                                            ({ data, href }) => (
                                                <CollectionCard
                                                    key={data.slug}
                                                    collection={data}
                                                    href={href}
                                                    variant="compact"
                                                    defaultExpanded={false}
                                                    stretchHero
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : null}

                                {additionalCollections.length > 0 ? (
                                    <div
                                        className={styles.collectionsAdditional}
                                    >
                                        {additionalCollections.map(
                                            ({ data, href }) => (
                                                <CollectionCard
                                                    key={data.slug}
                                                    collection={data}
                                                    href={href}
                                                    variant="default"
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </LRZSection>
            )}

            <LRZSection
                eyebrow="Le grand inventaire"
                title="Tous les châteaux du fil royal"
                description={
                    <div
                        className={styles.inventoryDescription}
                        style={
                            {
                                "--inventory-accent": entry.accent,
                            } as CSSProperties
                        }
                    >
                        <ReactMarkdown>{entry.presentation_md}</ReactMarkdown>
                    </div>
                }
                // description="Parcours l’ensemble des forteresses, palais et demeures recensés dans le Codex, des monuments les plus célèbres aux silhouettes plus confidentielles."
                tone="soft"
                color={entry.color}
                spacing="sm"
                headerLayout="stack"
                headerClassName={`${styles.inventoryHeader} mb-0!`}
            >
                <LRZSeparateur
                    scope="content"
                    preset="diamond"
                    size="xl"
                    marginBlock="2rem"
                    color={entry.color}
                />
                <div className="mt-5">{indexControls}</div>

                <ChateauxInteractiveMap
                    chateaux={list}
                    open={isMapOpen}
                    onOpenChange={setIsMapOpen}
                    stickyMode={CHATEAUX_MAP_CONFIG.stickyMode}
                />

                <div
                    ref={catalogueRef}
                    onPointerOver={(event) =>
                        syncCatalogueHover(event.target, true)
                    }
                    onPointerOut={(event) => {
                        const card = (
                            event.target as HTMLElement
                        ).closest<HTMLElement>("[data-map-sync-card]");
                        if (
                            card &&
                            !card.contains(event.relatedTarget as Node | null)
                        ) {
                            syncCatalogueHover(event.target, false);
                        }
                    }}
                    onFocus={(event) => syncCatalogueHover(event.target, true)}
                    onBlur={(event) => syncCatalogueHover(event.target, false)}
                >
                    {catalogue}
                </div>
            </LRZSection>
        </>
    );
}
