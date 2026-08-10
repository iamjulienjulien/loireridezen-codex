"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import ReactMarkdown from "react-markdown";
import { LayoutGrid, Map as MapIcon, MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";
import IndexPresentation from "@/components/IndexPresentation";
import { LRZCardDialog } from "@/components/LRZCardDialog";
import { LRZSymbol } from "@/components/LRZSymbol";
import { SITE_URL } from "@/lib/site-metadata";
import { PageControls } from "@/components/PageControls";
import { LRZSection } from "@/components/LRZSection";
import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import { TerritoireSection } from "@/components/TerritoireSection";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getTerritoiresWithGuinguettes } from "@/registry/guinguettes-territoires";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import type { Guinguette } from "@/types/guinguette";
import GuinguetteCard from "./GuinguetteCard";
import GuinguettesInteractiveMap from "./GuinguettesInteractiveMap";
import { GUINGUETTES_MAP_CONFIG } from "./guinguettes-map.config";
import {
    GUINGUETTES_MAP_SYNC_EVENT,
    dispatchGuinguettesMapSync,
    type GuinguettesMapSyncDetail,
} from "./guinguettes-map-sync";
import styles from "./guinguettes.module.css";

const normalize = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function GuinguettesIndex({
    guinguettes,
    indexes,
    initialOpenSlug,
}: {
    guinguettes: Guinguette[];
    indexes: readonly IndexEntry[];
    initialOpenSlug?: string;
}) {
    const entry = getIndex("/guinguettes")!;
    const [territoire, setTerritoire] = useState("all");
    const [query, setQuery] = useState("");
    const [groupByTerritory, setGroupByTerritory] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const catalogueRef = useRef<HTMLDivElement>(null);
    const interactiveMapEnabled = featureIsEnabled("guinguettesInteractiveMap");

    const list = useMemo(() => {
        const normalizedQuery = normalize(query.trim());

        return guinguettes.filter((item) => {
            if (territoire !== "all" && item.territoire !== territoire) {
                return false;
            }
            if (normalizedQuery) {
                const haystack = normalize(
                    [
                        item.nom,
                        item.commune,
                        item.departement,
                        item.territoire,
                        item.coursDEau,
                        item.description,
                        item.sousTitre,
                        item.type,
                        ...item.ambiance,
                        ...item.services,
                        ...(item.tags ?? []),
                    ]
                        .filter(Boolean)
                        .join(" "),
                );

                if (!haystack.includes(normalizedQuery)) return false;
            }

            return true;
        });
    }, [guinguettes, territoire, query]);

    const territorySections = useMemo(
        () => getTerritoiresWithGuinguettes(list),
        [list],
    );
    const openGuinguette = openSlug
        ? guinguettes.find((guinguette) => guinguette.slug === openSlug)
        : undefined;
    const openGuinguetteIndex = openGuinguette
        ? guinguettes.indexOf(openGuinguette)
        : -1;

    useEffect(() => {
        if (!interactiveMapEnabled) return;
        if (window.matchMedia("(max-width: 760px)").matches) return;

        const catalogue = catalogueRef.current;
        if (!catalogue) return;

        const cards = Array.from(
            catalogue.querySelectorAll<HTMLElement>("[data-map-sync-card]"),
        );
        const visibleSlugs = new Set<string>();
        let frame = 0;
        let signature = "";

        const emitViewport = () => {
            frame = 0;
            const centralY = window.innerHeight / 2;
            const visibleCards = cards.filter((card) =>
                visibleSlugs.has(card.dataset.guinguetteMapSlug ?? ""),
            );
            const primarySlug = visibleCards
                .map((card) => {
                    const rect = card.getBoundingClientRect();
                    return {
                        slug: card.dataset.guinguetteMapSlug,
                        distance: Math.abs(
                            rect.top + rect.height / 2 - centralY,
                        ),
                    };
                })
                .sort((a, b) => a.distance - b.distance)[0]?.slug;
            const slugs = [...visibleSlugs].sort();
            const nextSignature = `${slugs.join(",")}|${primarySlug ?? ""}`;

            if (nextSignature === signature) return;
            signature = nextSignature;
            dispatchGuinguettesMapSync({
                source: "catalogue",
                type: "viewport",
                visibleSlugs: slugs,
                primarySlug,
            });
        };
        const scheduleViewport = () => {
            if (!frame) frame = requestAnimationFrame(emitViewport);
        };
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const slug = (entry.target as HTMLElement).dataset
                        .guinguetteMapSlug;
                    if (!slug) return;

                    if (entry.isIntersecting) visibleSlugs.add(slug);
                    else visibleSlugs.delete(slug);
                });
                scheduleViewport();
            },
            { threshold: [0, 0.15, 0.5, 0.85] },
        );

        cards.forEach((card) => observer.observe(card));
        window.addEventListener("scroll", scheduleViewport, { passive: true });
        scheduleViewport();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", scheduleViewport);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [interactiveMapEnabled, list]);

    useEffect(() => {
        if (!interactiveMapEnabled) return;

        const onMapSync = (event: Event) => {
            const detail = (event as CustomEvent<GuinguettesMapSyncDetail>)
                .detail;
            if (detail.source !== "map" || detail.type !== "hover") return;

            catalogueRef.current
                ?.querySelectorAll<HTMLElement>("[data-map-sync-card]")
                .forEach((card) => {
                    card.toggleAttribute(
                        "data-map-highlight",
                        card.dataset.guinguetteMapSlug === detail.slug,
                    );
                });
        };

        window.addEventListener(GUINGUETTES_MAP_SYNC_EVENT, onMapSync);
        return () =>
            window.removeEventListener(GUINGUETTES_MAP_SYNC_EVENT, onMapSync);
    }, [interactiveMapEnabled, list]);

    const syncCatalogueHover = (
        target: EventTarget | null,
        active: boolean,
    ) => {
        const card = (target as HTMLElement | null)?.closest<HTMLElement>(
            "[data-map-sync-card]",
        );
        if (!card) return;

        dispatchGuinguettesMapSync({
            source: "catalogue",
            type: "hover",
            slug: active ? card.dataset.guinguetteMapSlug : undefined,
        });
    };

    const indexControls = (
        <PageControls
            variant="default"
            query={query}
            onQuery={setQuery}
            placeholder="Chercher une guinguette, une commune, un cours d’eau…"
            resultCount={list.length}
            totalCount={guinguettes.length}
            unit={list.length > 1 ? "guinguettes" : "guinguette"}
            accent={entry.accent}
            buttonColor={entry.color}
            mode="filters-toggle"
            reset={{
                active: territoire !== "all" || query !== "",
                onReset: () => {
                    setTerritoire("all");
                    setQuery("");
                },
            }}
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
            viewGroup={{
                value: groupByTerritory ? "territoires" : "catalogue",
                onValueChange: (value) =>
                    setGroupByTerritory(value === "territoires"),
                ariaLabel: "Organisation du catalogue de guinguettes",
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
            groups={[
                {
                    label: "Territoire",
                    active: territoire,
                    onSelect: setTerritoire,
                    preset: {
                        collection: "common",
                        meta: "territoire",
                    },
                    getCount: (id) =>
                        guinguettes.filter(
                            (guinguette) => guinguette.territoire === id,
                        ).length,
                },
            ]}
        />
    );

    return (
        <>
            {openGuinguette ? (
                <LRZCardDialog
                    open={Boolean(openGuinguette)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setOpenSlug(undefined);
                            router.replace("/guinguettes");
                        }
                    }}
                    indexLabel={entry.title}
                    indexIcon={
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="guinguettes"
                            size="md"
                            decorative
                        />
                    }
                    item={{
                        id: openGuinguette.slug,
                        label: openGuinguette.nom,
                    }}
                    navigation={{
                        position: openGuinguetteIndex + 1,
                        total: guinguettes.length,
                        previous:
                            openGuinguetteIndex > 0
                                ? {
                                      id: guinguettes[openGuinguetteIndex - 1]
                                          .slug,
                                      label: guinguettes[
                                          openGuinguetteIndex - 1
                                      ].nom,
                                  }
                                : undefined,
                        next:
                            openGuinguetteIndex < guinguettes.length - 1
                                ? {
                                      id: guinguettes[openGuinguetteIndex + 1]
                                          .slug,
                                      label: guinguettes[
                                          openGuinguetteIndex + 1
                                      ].nom,
                                  }
                                : undefined,
                        onNavigate: ({ id }) => {
                            setOpenSlug(id);
                            router.replace(`/guinguette/${id}`);
                        },
                    }}
                    share={{
                        title: `${openGuinguette.nom} — ${entry.title}`,
                        url: `${SITE_URL}/guinguette/${openGuinguette.slug}`,
                    }}
                    color={entry.color}
                >
                    <GuinguetteCard guinguette={openGuinguette} />
                </LRZCardDialog>
            ) : null}

            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/guinguettes"
                indexes={indexes}
            />

            <LRZSection
                eyebrow="Le grand inventaire"
                title="Toutes les guinguettes du fil ligérien"
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

                {interactiveMapEnabled ? (
                    <GuinguettesInteractiveMap
                        guinguettes={list}
                        open={isMapOpen}
                        onOpenChange={setIsMapOpen}
                        stickyMode={GUINGUETTES_MAP_CONFIG.stickyMode}
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
                            !card.contains(event.relatedTarget as Node | null)
                        ) {
                            syncCatalogueHover(event.target, false);
                        }
                    }}
                    onFocus={(event) => syncCatalogueHover(event.target, true)}
                    onBlur={(event) => syncCatalogueHover(event.target, false)}
                >
                    {list.length === 0 ? (
                        <p className={styles.empty}>
                            Pas de lampions sur cette portion du fil. Élargis la
                            recherche ou change de filtre.
                        </p>
                    ) : groupByTerritory ? (
                        <div className={styles.territories}>
                            {territorySections.map(
                                ({ territory, guinguettes }) => (
                                    <TerritoireSection
                                        key={territory.slug}
                                        territory={territory}
                                        guinguettes={guinguettes}
                                        mapSync={interactiveMapEnabled}
                                    />
                                ),
                            )}
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {list.map((guinguette) => (
                                <div
                                    id={`guinguette-${guinguette.slug}`}
                                    data-guinguette-map-slug={guinguette.slug}
                                    data-map-sync-card=""
                                    key={guinguette.slug}
                                >
                                    <GuinguetteCard guinguette={guinguette} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </LRZSection>
        </>
    );
}
