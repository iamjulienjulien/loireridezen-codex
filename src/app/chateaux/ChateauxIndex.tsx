"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGrid, Map as MapIcon, MapPinned } from "lucide-react";

import type { Chateau } from "@/types/chateau";
import type { IndexEntry } from "@/registry/indexes";

import PageHeader from "@/components/PageHeader";
import {
    COLLECTIONS,
    getCollectionsByIndexForEnv,
} from "@/registry/collections";

import PageFooter from "@/components/PageFooter";
import IndexPresentation from "@/components/IndexPresentation";
import { PageControls } from "@/components/PageControls";

import { CollectionCard } from "@/components/ui/collection-card";

import { getIndex } from "@/registry/indexes";

import ChateauxCard from "./ChateauxCard";

import styles from "./chateaux.module.css";
import { LRZSection } from "@/components/LRZSection";
import { featureIsEnabled } from "@/registry/feature-flags";
import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import { TerritoireSection } from "@/components/TerritoireSection";
import { getTerritoiresWithChateaux } from "@/registry/chateaux-territoires";
import ChateauxViewportMapSpike from "./ChateauxViewportMapSpike";
import ChateauxInteractiveMap from "./ChateauxInteractiveMap";
import { CHATEAUX_MAP_CONFIG } from "./chateaux-map.config";
import {
    CHATEAUX_MAP_SYNC_EVENT,
    dispatchChateauxMapSync,
    type ChateauxMapSyncDetail,
} from "./chateaux-map-sync";

const EPOQUES = [
    { id: "all", label: "Tout" },
    { id: "Médiéval", label: "Médiéval" },
    { id: "Renaissance", label: "Renaissance" },
    { id: "Classique", label: "Classique" },
    { id: "Éclectique", label: "Éclectique" },
] as const;

const RENOMMEES = [
    { id: "all", label: "Tout" },
    { id: "phare", label: "Phare" },
    { id: "majeur", label: "Majeur" },
    { id: "notable", label: "Notable" },
    { id: "confidentiel", label: "Confidentiel" },
] as const;

const FEATURED_COLLECTION_SLUG = "incontournables-du-val";
const SECONDARY_COLLECTION_SLUGS = [
    "sur-les-traces-des-rois",
    "chefs-doeuvre-renaissance",
    "plus-ligeriens",
] as const;

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
};

export default function ChateauxIndex({
    chateaux,
    indexes,
}: ChateauxIndexProps) {
    const entry = getIndex("/chateaux")!;

    const [epoque, setEpoque] = useState<string>("all");
    const [renommee, setRenommee] = useState<string>("all");
    const [q, setQ] = useState("");
    const [groupByTerritory, setGroupByTerritory] = useState(true);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const catalogueRef = useRef<HTMLDivElement>(null);
    const territoiresEnabled = featureIsEnabled("territoires");
    const renommeeEnabled = featureIsEnabled("chateauxRenommee");

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

    const countFor = (field: "epoque" | "renommee", id: string) =>
        chateaux.filter((castle) => castle[field] === id).length;

    const list = useMemo(() => {
        const normalizedQuery = norm(q.trim());

        return chateaux.filter((castle) => {
            if (epoque !== "all" && castle.epoque !== epoque) {
                return false;
            }

            if (
                renommeeEnabled &&
                renommee !== "all" &&
                castle.renommee !== renommee
            ) {
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
    }, [chateaux, epoque, renommee, renommeeEnabled, q]);

    const territorySections = useMemo(
        () =>
            territoiresEnabled && groupByTerritory
                ? getTerritoiresWithChateaux(list)
                : [],
        [groupByTerritory, list, territoiresEnabled],
    );

    const controlsInOwnSection = featureIsEnabled("indexControlsSection");
    const viewportMapSpikeEnabled = featureIsEnabled(
        "chateauxViewportMapSpike",
    );
    const interactiveMapEnabled = featureIsEnabled("chateauxInteractiveMap");
    const hasActiveFilters =
        epoque !== "all" || (renommeeEnabled && renommee !== "all") || q !== "";

    useEffect(() => {
        if (!interactiveMapEnabled) return;
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
    }, [groupByTerritory, interactiveMapEnabled, list]);

    useEffect(() => {
        if (!interactiveMapEnabled) return;

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
    }, [groupByTerritory, interactiveMapEnabled, list]);

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
                    options: EPOQUES.map((item) => ({
                        id: item.id,
                        label: item.label,
                        count:
                            item.id === "all"
                                ? undefined
                                : countFor("epoque", item.id),
                    })),
                },
                ...(renommeeEnabled
                    ? [
                          {
                              label: "Renommée",
                              active: renommee,
                              onSelect: setRenommee,
                              options: RENOMMEES.map((item) => ({
                                  id: item.id,
                                  label: item.label,
                                  count:
                                      item.id === "all"
                                          ? undefined
                                          : countFor("renommee", item.id),
                              })),
                          },
                      ]
                    : []),
            ]}
            viewGroup={
                territoiresEnabled
                    ? {
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
                      }
                    : undefined
            }
            action={
                interactiveMapEnabled
                    ? {
                          label: "Carte",
                          activeLabel: "Carte",
                          active: isMapOpen,
                          icon: <MapIcon aria-hidden="true" />,
                          onClick: () => setIsMapOpen((open) => !open),
                      }
                    : undefined
            }
        />
    );

    const catalogue =
        list.length === 0 ? (
            <p className={styles.empty}>
                Aucun château à cet endroit du fil. Élargis la recherche ou
                change de filtre.
            </p>
        ) : territoiresEnabled && groupByTerritory ? (
            <div className={styles.territories}>
                {territorySections.map(({ territory, chateaux }) => (
                    <TerritoireSection
                        key={territory.slug}
                        territory={territory}
                        chateaux={chateaux}
                        mapSync={
                            viewportMapSpikeEnabled || interactiveMapEnabled
                        }
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
                        <ChateauxCard d={castle} open={false} />
                    </div>
                ))}
            </div>
        );

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <PageHeader
                    current="/chateaux"
                    indexes={indexes}
                    collections={COLLECTIONS}
                />

                <IndexPresentation
                    description={entry.description}
                    descriptionFooter={entry.presentationFooter}
                    current="/chateaux"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                {featureIsEnabled("collections") && (
                    <LRZSection
                        eyebrow="Collections du Codex"
                        title="Explorer les châteaux autrement"
                        // description="Des forteresses médiévales aux demeures de plaisance, ces collections relient les châteaux par époque, architecture, personnages et façons d’habiter le pouvoir."
                        tone="surface"
                        color="ocre"
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
                                            className={
                                                styles.collectionFeatured
                                            }
                                        />
                                    ) : null}

                                    {secondaryCollections.length > 0 ? (
                                        <div
                                            className={
                                                styles.collectionsSecondary
                                            }
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
                                            className={
                                                styles.collectionsAdditional
                                            }
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

                {controlsInOwnSection && (
                    <LRZSection
                        eyebrow="Filtres & repères"
                        title="Choisir son chemin parmi les châteaux"
                        // description="Remonte les siècles, compare les architectures et compose ton propre itinéraire à travers les grandes demeures du val de Loire."
                        tone="surface"
                        color="ocre"
                        spacing="sm"
                    >
                        {indexControls}
                    </LRZSection>
                )}

                <LRZSection
                    eyebrow="Le grand inventaire"
                    title="Tous les châteaux du fil royal"
                    // description="Parcours l’ensemble des forteresses, palais et demeures recensés dans le Codex, des monuments les plus célèbres aux silhouettes plus confidentielles."
                    tone="soft"
                    color="ocre"
                    spacing="sm"
                    headerClassName="mb-0!"
                >
                    {!controlsInOwnSection && (
                        <div className="mt-5">{indexControls}</div>
                    )}

                    {interactiveMapEnabled ? (
                        <ChateauxInteractiveMap
                            chateaux={list}
                            open={isMapOpen}
                            onOpenChange={setIsMapOpen}
                            stickyMode={CHATEAUX_MAP_CONFIG.stickyMode}
                        />
                    ) : null}

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
                                !card.contains(
                                    event.relatedTarget as Node | null,
                                )
                            ) {
                                syncCatalogueHover(event.target, false);
                            }
                        }}
                        onFocus={(event) =>
                            syncCatalogueHover(event.target, true)
                        }
                        onBlur={(event) =>
                            syncCatalogueHover(event.target, false)
                        }
                    >
                        {viewportMapSpikeEnabled && list.length > 0 ? (
                            <ChateauxViewportMapSpike
                                chateaux={list}
                                variant="top"
                            >
                                {catalogue}
                            </ChateauxViewportMapSpike>
                        ) : (
                            catalogue
                        )}
                    </div>
                </LRZSection>

                <PageFooter color={entry.color}>
                    <span
                        style={{
                            display: "block",
                            marginBottom: "5px",
                            color: "var(--color-ambiance-texte-secondaire)",
                            fontSize: "12px",
                        }}
                    >
                        {list.length} {entry.footerNote}
                    </span>
                    Le Codex Ligérien ·{" "}
                    <a href="https://loireridezen.bike">Loire Ride Zen</a>
                </PageFooter>
            </div>
        </main>
    );
}
