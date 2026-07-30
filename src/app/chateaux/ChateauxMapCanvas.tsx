"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";

import { useAmbiance } from "@/hooks/useAmbiance";
import type { Ambiance } from "@/registry/ambiances";
import { getTerritoireSlugForChateau } from "@/registry/chateaux-territoires";
import { TERRITOIRES } from "@/registry/territoires";
import type { Chateau } from "@/types/chateau";

import styles from "./ChateauxMapCanvas.module.css";
import {
    CHATEAUX_MAP_SYNC_EVENT,
    dispatchChateauxMapSync,
    getLatestChateauxMapTerritory,
    getLatestChateauxMapViewport,
    type ChateauxMapSyncDetail,
} from "./chateaux-map-sync";

type ChateauxMapCanvasProps = {
    chateaux: readonly Chateau[];
};

const TERRITORY_ACCENTS = new Map(
    TERRITOIRES.map((territory) => [territory.slug, territory.identite.accent]),
);

const DEFAULT_CENTER: [number, number] = [1.7, 47.3];
const MAPLIBRE_WORKER_URL =
    "https://unpkg.com/maplibre-gl@6.0.0/dist/maplibre-gl-worker.mjs";
const BASEMAP_STYLE = {
    version: 8 as const,
    sources: {
        openstreetmap: {
            type: "raster" as const,
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
        },
    },
    layers: [
        {
            id: "openstreetmap",
            type: "raster" as const,
            source: "openstreetmap",
        },
    ],
};

type MapPalette = {
    water: string;
    land: string;
    forest: string;
    road: string;
    roadMinor: string;
    building: string;
    boundary: string;
    label: string;
};

// Adaptation compacte des palettes du prototype cartographique : la carte
// suit l'ambiance courante du Codex sans introduire de contrôle supplémentaire.
const MAP_PALETTES: Record<Ambiance, MapPalette> = {
    aube: {
        water: "#dde6e8",
        land: "#f5ead8",
        forest: "#c8c8b0",
        road: "#e8d8b8",
        roadMinor: "#ede3cc",
        building: "#e6dac5",
        boundary: "rgba(116, 89, 57, 0.38)",
        label: "#5c493a",
    },
    jour: {
        water: "#a8c0c8",
        land: "#faf3e5",
        forest: "#a8b890",
        road: "#d8b860",
        roadMinor: "#eadab0",
        building: "#e8ddc8",
        boundary: "rgba(92, 78, 58, 0.35)",
        label: "#3d3528",
    },
    soir: {
        water: "#a8a0a8",
        land: "#e8c898",
        forest: "#7a6a4a",
        road: "#c89048",
        roadMinor: "#d8b878",
        building: "#d8c0a0",
        boundary: "rgba(96, 62, 42, 0.44)",
        label: "#513c31",
    },
    nuit: {
        water: "#2a3540",
        land: "#1a1812",
        forest: "#2c2820",
        road: "#685830",
        roadMinor: "#3c3525",
        building: "#322d25",
        boundary: "rgba(205, 183, 140, 0.28)",
        label: "#d8c8a8",
    },
};

function applyMapAmbiance(map: MapLibreMap, ambiance: Ambiance) {
    const palette = MAP_PALETTES[ambiance];
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

export default function ChateauxMapCanvas({
    chateaux,
}: ChateauxMapCanvasProps) {
    const [ambiance] = useAmbiance();
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const markersRef = useRef<Marker[]>([]);
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

            const territoryChateaux = chateaux.filter(
                (chateau) =>
                    getTerritoireSlugForChateau(chateau) === territorySlug,
            );
            if (territoryChateaux.length === 0) return;

            if (territoryChateaux.length === 1) {
                const [chateau] = territoryChateaux;
                map.easeTo({
                    center: [chateau.coordonnees.lng, chateau.coordonnees.lat],
                    zoom: 10.5,
                    duration: 550,
                });
                return;
            }

            const bounds = territoryChateaux.reduce(
                (nextBounds, chateau) =>
                    nextBounds.extend([
                        chateau.coordonnees.lng,
                        chateau.coordonnees.lat,
                    ]),
                new maplibregl.LngLatBounds(),
            );
            map.fitBounds(bounds, {
                padding: 52,
                maxZoom: 10,
                duration: 550,
            });
        },
        [chateaux],
    );

    useEffect(() => {
        selectedSlugRef.current = selectedSlug;
        applyMarkerStates();
    }, [applyMarkerStates, selectedSlug]);

    useEffect(() => {
        const applyViewport = (
            detail: Extract<ChateauxMapSyncDetail, { type: "viewport" }>,
        ) => {
            visibleSlugsRef.current = new Set(detail.visibleSlugs);
            primarySlugRef.current = detail.primarySlug;
            applyMarkerStates();
        };
        const onMapSync = (event: Event) => {
            const detail = (event as CustomEvent<ChateauxMapSyncDetail>).detail;

            if (detail.source !== "catalogue") return;
            if (detail.type === "viewport") applyViewport(detail);
            if (detail.type === "territory") {
                focusTerritory(detail.territorySlug);
            }
            if (detail.type === "hover") {
                hoveredSlugRef.current = detail.slug;
                applyMarkerStates();
            }
        };
        const latestViewport = getLatestChateauxMapViewport();
        if (latestViewport) applyViewport(latestViewport);
        const latestTerritory = getLatestChateauxMapTerritory();
        if (latestTerritory) focusTerritory(latestTerritory.territorySlug);

        window.addEventListener(CHATEAUX_MAP_SYNC_EVENT, onMapSync);
        return () => {
            window.removeEventListener(CHATEAUX_MAP_SYNC_EVENT, onMapSync);
            dispatchChateauxMapSync({
                source: "map",
                type: "hover",
            });
        };
    }, [applyMarkerStates, focusTerritory]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const markerElements = markerElementsRef.current;

        // L'import statique conserve l'URL du worker dans le chunk Next. Le
        // composant reste néanmoins chargé à la demande depuis le toggle.
        // Turbopack ne résout pas correctement l'URL implicite du worker :
        // elle retombe sinon sur /chateaux en développement.
        maplibregl.setWorkerUrl(MAPLIBRE_WORKER_URL);
        const map = new maplibregl.Map({
            container,
            center: DEFAULT_CENTER,
            zoom: 6,
            attributionControl: false,
            style: BASEMAP_STYLE,
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
        markerElementsRef.current.clear();
        visibleSlugsRef.current = new Set(
            chateaux.map((chateau) => chateau.slug),
        );
        primarySlugRef.current = undefined;

        if (chateaux.length === 0) {
            map.easeTo({ center: DEFAULT_CENTER, zoom: 6, duration: 350 });
            return;
        }

        const bounds = new maplibregl.LngLatBounds();

        chateaux.forEach((chateau) => {
            const marker = document.createElement("button");
            const territorySlug = getTerritoireSlugForChateau(chateau);
            const accent = territorySlug
                ? TERRITORY_ACCENTS.get(territorySlug)
                : undefined;

            marker.type = "button";
            marker.className = styles.marker;
            if (accent) marker.style.setProperty("--marker-color", accent);
            const markerCore = document.createElement("span");
            markerCore.className = styles.markerCore;
            markerCore.setAttribute("aria-hidden", "true");
            marker.append(markerCore);
            marker.setAttribute(
                "aria-label",
                `${chateau.nom}, ${chateau.commune}`,
            );
            marker.title = chateau.nom;
            marker.addEventListener("click", () =>
                setSelectedSlug(chateau.slug),
            );
            const highlightMarker = () =>
                dispatchChateauxMapSync({
                    source: "map",
                    type: "hover",
                    slug: chateau.slug,
                });
            const resetMarker = () =>
                dispatchChateauxMapSync({ source: "map", type: "hover" });
            marker.addEventListener("mouseenter", highlightMarker);
            marker.addEventListener("mouseleave", resetMarker);
            marker.addEventListener("focus", highlightMarker);
            marker.addEventListener("blur", resetMarker);

            markerElementsRef.current.set(chateau.slug, marker);

            markersRef.current.push(
                new maplibregl.Marker({ element: marker })
                    .setLngLat([
                        chateau.coordonnees.lng,
                        chateau.coordonnees.lat,
                    ])
                    .addTo(map),
            );
            bounds.extend([chateau.coordonnees.lng, chateau.coordonnees.lat]);
        });

        if (chateaux.length === 1) {
            map.flyTo({
                center: [
                    chateaux[0].coordonnees.lng,
                    chateaux[0].coordonnees.lat,
                ],
                zoom: 11,
                duration: 450,
            });
        } else {
            map.fitBounds(bounds, {
                padding: 64,
                maxZoom: 10,
                duration: 450,
            });
        }
        applyMarkerStates();
    }, [applyMarkerStates, chateaux, isReady]);

    useEffect(() => {
        if (!isReady) return;
        focusTerritory(getLatestChateauxMapTerritory()?.territorySlug);
    }, [focusTerritory, isReady]);

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
