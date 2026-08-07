"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
    type CSSProperties,
    type ReactElement,
} from "react";
import { createRoot, type Root } from "react-dom/client";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";

import { LRZTooltip } from "@/components/LRZTooltip";
import { useAmbiance } from "@/hooks/useAmbiance";
import type { Ambiance } from "@/registry/ambiances";
import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import { TERRITOIRES } from "@/registry/territoires";
import type { Guinguette } from "@/types/guinguette";

import {
    GUINGUETTES_MAP_CONFIG,
    GUINGUETTES_MAP_PALETTES,
} from "./guinguettes-map.config";
import styles from "../chateaux/ChateauxMapCanvas.module.css";
import {
    GUINGUETTES_MAP_SYNC_EVENT,
    dispatchGuinguettesMapSync,
    getLatestGuinguettesMapFocus,
    getLatestGuinguettesMapTerritory,
    getLatestGuinguettesMapCatalogueHover,
    getLatestGuinguettesMapViewport,
    type GuinguettesMapSyncDetail,
} from "./guinguettes-map-sync";

type GuinguettesMapCanvasProps = {
    guinguettes: readonly Guinguette[];
};

type MappableGuinguette = Guinguette & {
    position: {
        latitude: number;
        longitude: number;
    };
};

const hasCoordinates = (
    guinguette: Guinguette,
): guinguette is MappableGuinguette =>
    typeof guinguette.position.latitude === "number" &&
    Number.isFinite(guinguette.position.latitude) &&
    typeof guinguette.position.longitude === "number" &&
    Number.isFinite(guinguette.position.longitude);

const TERRITORY_COLORS = new Map(
    TERRITOIRES.map((territory) => [territory.slug, territory.identite.color]),
);

let catalogueHoverSlug: string | undefined;
const catalogueHoverListeners = new Set<() => void>();

function subscribeToCatalogueHover(listener: () => void) {
    catalogueHoverListeners.add(listener);
    return () => catalogueHoverListeners.delete(listener);
}

function getCatalogueHoverSnapshot() {
    return catalogueHoverSlug;
}

function setCatalogueHover(slug?: string) {
    if (catalogueHoverSlug === slug) return;
    catalogueHoverSlug = slug;
    catalogueHoverListeners.forEach((listener) => listener());
}

function MarkerTooltip({
    children,
    label,
    slug,
}: {
    children: ReactElement;
    label: string;
    slug: string;
}) {
    const activeSlug = useSyncExternalStore(
        subscribeToCatalogueHover,
        getCatalogueHoverSnapshot,
        () => undefined,
    );

    return (
        <LRZTooltip
            content={label}
            side="top"
            portal
            trigger={activeSlug === slug ? "open" : "hover"}
        >
            {children}
        </LRZTooltip>
    );
}

function applyMapAmbiance(map: MapLibreMap, ambiance: Ambiance) {
    const palette = GUINGUETTES_MAP_PALETTES[ambiance];
    const layers = map.getStyle().layers ?? [];

    layers.forEach((layer) => {
        const name = layer.id.toLowerCase();
        const setPaint = (property: string, value: string) => {
            try {
                map.setPaintProperty(
                    layer.id,
                    property as never,
                    value as never,
                );
            } catch {
                // Les calques d'OpenFreeMap évoluent indépendamment du Codex.
            }
        };

        if (layer.type === "background")
            setPaint("background-color", palette.land);
        if (layer.type === "fill") {
            if (name.includes("water")) setPaint("fill-color", palette.water);
            else if (name.includes("forest") || name.includes("wood")) {
                setPaint("fill-color", palette.forest);
            } else if (name.includes("building")) {
                setPaint("fill-color", palette.building);
            } else if (name.includes("landcover") || name.includes("landuse")) {
                setPaint("fill-color", palette.land);
            }
        }
        if (layer.type === "line") {
            if (name.includes("boundary") || name.includes("admin")) {
                setPaint("line-color", palette.boundary);
            } else if (name.includes("motorway") || name.includes("primary")) {
                setPaint("line-color", palette.road);
            } else if (name.includes("road") || name.includes("street")) {
                setPaint("line-color", palette.roadMinor);
            }
        }
        if (layer.type === "symbol" && name.includes("label")) {
            setPaint("text-color", palette.label);
        }
    });
}

export default function GuinguettesMapCanvas({
    guinguettes,
}: GuinguettesMapCanvasProps) {
    const mappableGuinguettes = useMemo(
        () => guinguettes.filter(hasCoordinates),
        [guinguettes],
    );
    const [ambiance] = useAmbiance();
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const markersRef = useRef<Marker[]>([]);
    const markerRootsRef = useRef(new Map<string, Root>());
    const markerElementsRef = useRef(new Map<string, HTMLButtonElement>());
    const ambianceRef = useRef(ambiance);
    const selectedSlugRef = useRef<string | undefined>(undefined);
    const visibleSlugsRef = useRef(new Set<string>());
    const primarySlugRef = useRef<string | undefined>(undefined);
    const hoveredSlugRef = useRef<string | undefined>(undefined);
    const [isReady, setIsReady] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState<string>();

    const applyMarkerStates = useCallback(() => {
        markerElementsRef.current.forEach((marker, slug) => {
            marker.classList.toggle(
                styles.markerVisible,
                visibleSlugsRef.current.has(slug),
            );
            marker.classList.toggle(
                styles.markerPrimary,
                primarySlugRef.current === slug,
            );
            marker.classList.toggle(
                styles.markerHovered,
                hoveredSlugRef.current === slug,
            );
            marker.classList.toggle(
                styles.markerSelected,
                selectedSlugRef.current === slug,
            );
        });
    }, []);

    const focusTerritory = useCallback(
        (territorySlug?: string) => {
            const map = mapRef.current;
            if (!map || !territorySlug) return;

            const territoryGuinguettes = mappableGuinguettes.filter(
                (guinguette) => guinguette.territoire === territorySlug,
            );
            if (territoryGuinguettes.length === 0) return;

            if (territoryGuinguettes.length === 1) {
                const [guinguette] = territoryGuinguettes;
                map.easeTo({
                    center: [
                        guinguette.position.longitude,
                        guinguette.position.latitude,
                    ],
                    ...GUINGUETTES_MAP_CONFIG.singleTerritoryGuinguette,
                });
                return;
            }

            const bounds = territoryGuinguettes.reduce(
                (nextBounds, guinguette) =>
                    nextBounds.extend([
                        guinguette.position.longitude,
                        guinguette.position.latitude,
                    ]),
                new maplibregl.LngLatBounds(),
            );
            map.fitBounds(bounds, {
                ...GUINGUETTES_MAP_CONFIG.territoryFit,
            });
        },
        [mappableGuinguettes],
    );

    const focusGuinguette = useCallback(
        (slug: string) => {
            const map = mapRef.current;
            const guinguette = mappableGuinguettes.find(
                (item) => item.slug === slug,
            );
            if (!map || !guinguette) return;

            setSelectedSlug(slug);
            map.flyTo({
                center: [
                    guinguette.position.longitude,
                    guinguette.position.latitude,
                ],
                ...GUINGUETTES_MAP_CONFIG.singleGuinguette,
            });
        },
        [mappableGuinguettes],
    );

    useEffect(() => {
        selectedSlugRef.current = selectedSlug;
        applyMarkerStates();
    }, [applyMarkerStates, selectedSlug]);

    useEffect(() => {
        const applyViewport = (
            detail: Extract<GuinguettesMapSyncDetail, { type: "viewport" }>,
        ) => {
            visibleSlugsRef.current = new Set(detail.visibleSlugs);
            primarySlugRef.current = detail.primarySlug;
            applyMarkerStates();
        };
        const onMapSync = (event: Event) => {
            const detail = (event as CustomEvent<GuinguettesMapSyncDetail>)
                .detail;

            if (detail.source !== "catalogue") return;
            if (detail.type === "viewport") applyViewport(detail);
            if (detail.type === "territory") {
                focusTerritory(detail.territorySlug);
            }
            if (detail.type === "hover") {
                hoveredSlugRef.current = detail.slug;
                if (detail.source === "catalogue") {
                    setCatalogueHover(detail.slug);
                }
                applyMarkerStates();
            }
            if (detail.type === "focus") focusGuinguette(detail.slug);
        };
        const latestViewport = getLatestGuinguettesMapViewport();
        if (latestViewport) applyViewport(latestViewport);
        const latestTerritory = getLatestGuinguettesMapTerritory();
        if (latestTerritory) focusTerritory(latestTerritory.territorySlug);
        const latestCatalogueHover = getLatestGuinguettesMapCatalogueHover();
        if (latestCatalogueHover) {
            setCatalogueHover(latestCatalogueHover.slug);
        }

        window.addEventListener(GUINGUETTES_MAP_SYNC_EVENT, onMapSync);
        return () => {
            window.removeEventListener(GUINGUETTES_MAP_SYNC_EVENT, onMapSync);
            dispatchGuinguettesMapSync({
                source: "map",
                type: "hover",
            });
        };
    }, [applyMarkerStates, focusGuinguette, focusTerritory]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const markerElements = markerElementsRef.current;
        const markerRoots = markerRootsRef.current;

        // L'import statique conserve l'URL du worker dans le chunk Next. Le
        // composant reste néanmoins chargé à la demande depuis le toggle.
        // Turbopack ne résout pas correctement l'URL implicite du worker :
        // elle retombe sinon sur /guinguettes en développement.
        maplibregl.setWorkerUrl(GUINGUETTES_MAP_CONFIG.workerUrl);
        const map = new maplibregl.Map({
            container,
            center: GUINGUETTES_MAP_CONFIG.defaultView.center,
            zoom: GUINGUETTES_MAP_CONFIG.defaultView.zoom,
            attributionControl: false,
            style: GUINGUETTES_MAP_CONFIG.basemapStyle,
        });
        const resizeObserver = new ResizeObserver(() => map.resize());

        mapRef.current = map;
        resizeObserver.observe(container);
        map.once("load", () => {
            applyMapAmbiance(map, ambianceRef.current);
            map.resize();
            setIsReady(true);
        });

        return () => {
            resizeObserver.disconnect();
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            markerRoots.forEach((root) => root.unmount());
            markerRoots.clear();
            markerElements.clear();
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        ambianceRef.current = ambiance;

        const map = mapRef.current;
        if (map?.isStyleLoaded()) applyMapAmbiance(map, ambiance);
    }, [ambiance]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !isReady) return;

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        markerRootsRef.current.forEach((root) => root.unmount());
        markerRootsRef.current.clear();
        markerElementsRef.current.clear();
        visibleSlugsRef.current = new Set(
            mappableGuinguettes.map((guinguette) => guinguette.slug),
        );
        primarySlugRef.current = undefined;

        if (mappableGuinguettes.length === 0) {
            map.easeTo({
                center: GUINGUETTES_MAP_CONFIG.defaultView.center,
                zoom: GUINGUETTES_MAP_CONFIG.defaultView.zoom,
                duration: GUINGUETTES_MAP_CONFIG.defaultView.resetDuration,
            });
            return;
        }

        const bounds = new maplibregl.LngLatBounds();

        mappableGuinguettes.forEach((guinguette) => {
            const markerContainer = document.createElement("div");
            const territorySlug = guinguette.territoire;
            const color = territorySlug
                ? TERRITORY_COLORS.get(territorySlug)
                : undefined;
            const highlightMarker = () =>
                dispatchGuinguettesMapSync({
                    source: "map",
                    type: "hover",
                    slug: guinguette.slug,
                });
            const resetMarker = () =>
                dispatchGuinguettesMapSync({ source: "map", type: "hover" });

            const markerRoot = createRoot(markerContainer);
            markerRootsRef.current.set(guinguette.slug, markerRoot);
            markerRoot.render(
                <MarkerTooltip label={guinguette.nom} slug={guinguette.slug}>
                    <button
                        ref={(element) => {
                            if (element) {
                                markerElementsRef.current.set(
                                    guinguette.slug,
                                    element,
                                );
                                applyMarkerStates();
                            }
                        }}
                        className={styles.marker}
                        style={
                            color
                                ? ({
                                      "--marker-color": `var(${LRZ_COLOR_VARIABLES[color]})`,
                                  } as CSSProperties)
                                : undefined
                        }
                        type="button"
                        aria-label={`${guinguette.nom}, ${guinguette.commune}`}
                        onClick={() => setSelectedSlug(guinguette.slug)}
                        onMouseEnter={highlightMarker}
                        onMouseLeave={resetMarker}
                        onFocus={highlightMarker}
                        onBlur={resetMarker}
                    >
                        <span
                            className={styles.markerCore}
                            aria-hidden="true"
                        />
                    </button>
                </MarkerTooltip>,
            );

            markersRef.current.push(
                new maplibregl.Marker({ element: markerContainer })
                    .setLngLat([
                        guinguette.position.longitude,
                        guinguette.position.latitude,
                    ])
                    .addTo(map),
            );
            bounds.extend([
                guinguette.position.longitude,
                guinguette.position.latitude,
            ]);
        });

        if (mappableGuinguettes.length === 1) {
            map.flyTo({
                center: [
                    mappableGuinguettes[0].position.longitude,
                    mappableGuinguettes[0].position.latitude,
                ],
                ...GUINGUETTES_MAP_CONFIG.singleGuinguette,
            });
        } else {
            map.fitBounds(bounds, {
                ...GUINGUETTES_MAP_CONFIG.catalogueFit,
            });
        }
        applyMarkerStates();
    }, [applyMarkerStates, isReady, mappableGuinguettes]);

    useEffect(() => {
        if (!isReady) return;
        focusTerritory(getLatestGuinguettesMapTerritory()?.territorySlug);
    }, [focusTerritory, isReady]);

    useEffect(() => {
        if (!isReady) return;

        const focus = getLatestGuinguettesMapFocus();
        if (focus) focusGuinguette(focus.slug);
    }, [focusGuinguette, isReady]);

    return (
        <div className={styles.root} data-ambiance={ambiance}>
            <div className={styles.canvas} ref={containerRef} />

            <p className={styles.attribution}>
                ©{" "}
                <a
                    href="https://www.openstreetmap.org/copyright"
                    target="_blank"
                    rel="noreferrer"
                >
                    OpenStreetMap
                </a>
            </p>
        </div>
    );
}
