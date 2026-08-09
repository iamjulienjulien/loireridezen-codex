"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import ReactMarkdown from "react-markdown";
import IndexControls from "@/components/IndexControls";
import IndexPresentation from "@/components/IndexPresentation";
import { LRZSection } from "@/components/LRZSection";
import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import { TERRITOIRES } from "@/registry/territoires";
import type { Guinguette } from "@/types/guinguette";
import GuinguetteCard from "./GuinguetteCardV4";
import GuinguettesInteractiveMap from "./GuinguettesInteractiveMap";
import { GUINGUETTES_MAP_CONFIG } from "./guinguettes-map.config";
import {
    GUINGUETTES_MAP_SYNC_EVENT,
    dispatchGuinguettesMapSync,
    type GuinguettesMapSyncDetail,
} from "./guinguettes-map-sync";
import styles from "./guinguettes.module.css";

const STATUTS = [
    { id: "all", label: "Tous" },
    { id: "actif", label: "Actifs" },
    { id: "a_verifier", label: "À vérifier" },
    { id: "historique", label: "Historiques" },
] as const;

const normalize = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function GuinguettesIndex({
    guinguettes,
    indexes,
}: {
    guinguettes: Guinguette[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/guinguettes")!;
    const [territoire, setTerritoire] = useState("all");
    const [statut, setStatut] = useState("all");
    const [query, setQuery] = useState("");
    const [expandAll, setExpandAll] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
        {},
    );
    const catalogueRef = useRef<HTMLDivElement>(null);
    const interactiveMapEnabled = featureIsEnabled("guinguettesInteractiveMap");

    const toggleAll = () => {
        setExpandAll((current) => !current);
        setOpenOverrides({});
    };

    const toggleOne = (id: string) => {
        setOpenOverrides((current) => ({
            ...current,
            [id]: !(current[id] ?? expandAll),
        }));
    };

    const countFor = (field: "territoire" | "statut", value: string) =>
        guinguettes.filter((item) => item[field] === value).length;

    const territoireOptions = useMemo(
        () => [
            { id: "all", label: "Tout" },
            ...TERRITOIRES.filter(({ slug }) =>
                guinguettes.some((item) => item.territoire === slug),
            ).map(({ slug, nom }) => ({ id: slug, label: nom })),
        ],
        [guinguettes],
    );

    const list = useMemo(() => {
        const normalizedQuery = normalize(query.trim());

        return guinguettes.filter((item) => {
            if (territoire !== "all" && item.territoire !== territoire) {
                return false;
            }
            if (statut !== "all" && item.statut !== statut) return false;

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
    }, [guinguettes, territoire, statut, query]);

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
        <IndexControls
            query={query}
            onQuery={setQuery}
            placeholder="Chercher une guinguette, une commune, un cours d’eau…"
            resultCount={list.length}
            totalCount={guinguettes.length}
            unit="guinguettes"
            accent={entry.accent}
            expand={{ all: expandAll, onToggle: toggleAll }}
            switcher={
                interactiveMapEnabled
                    ? {
                          label: "Carte",
                          checked: isMapOpen,
                          offLabel: "Masquée",
                          onLabel: "Affichée",
                          onToggle: () => setIsMapOpen((open) => !open),
                      }
                    : undefined
            }
            groups={[
                {
                    label: "Territoire",
                    active: territoire,
                    onSelect: setTerritoire,
                    options: territoireOptions.map((option) => ({
                        ...option,
                        count:
                            option.id === "all"
                                ? undefined
                                : countFor("territoire", option.id),
                    })),
                },
                {
                    label: "Statut",
                    active: statut,
                    onSelect: setStatut,
                    options: STATUTS.map((option) => ({
                        ...option,
                        count:
                            option.id === "all"
                                ? undefined
                                : countFor("statut", option.id),
                    })),
                },
            ]}
        />
    );

    return (
        <>
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
                color="brique"
                spacing="sm"
                headerLayout="stack"
                headerClassName={`${styles.inventoryHeader} mb-0!`}
            >
                <LRZSeparateur
                    scope="content"
                    preset="diamond"
                    size="xl"
                    marginBlock="2rem"
                    color="brique"
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
                    ) : (
                        <div className={styles.grid}>
                            {list.map((guinguette) => (
                                <div
                                    id={`guinguette-${guinguette.slug}`}
                                    data-guinguette-map-slug={guinguette.slug}
                                    data-map-sync-card=""
                                    key={guinguette.slug}
                                >
                                    <GuinguetteCard
                                        guinguette={guinguette}
                                        // open={openOverrides[guinguette.slug] ?? expandAll}
                                        // onToggle={() => toggleOne(guinguette.slug)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </LRZSection>
        </>
    );
}
