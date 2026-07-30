"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";

import { useAmbiance } from "@/hooks/useAmbiance";
import type { Ambiance } from "@/registry/ambiances";
import { getTerritoireSlugForChateau } from "@/registry/chateaux-territoires";
import { TERRITOIRES } from "@/registry/territoires";
import type { Chateau } from "@/types/chateau";

import {
    CHATEAUX_MAP_CONFIG,
    CHATEAUX_MAP_PALETTES,
} from "./chateaux-map.config";
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

function applyMapAmbiance(map: MapLibreMap, ambiance: Ambiance) {
    const palette = CHATEAUX_MAP_PALETTES[ambiance];
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
                    ...CHATEAUX_MAP_CONFIG.singleTerritoryChateau,
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
                ...CHATEAUX_MAP_CONFIG.territoryFit,
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
        maplibregl.setWorkerUrl(CHATEAUX_MAP_CONFIG.workerUrl);
        const map = new maplibregl.Map({
            container,
            center: CHATEAUX_MAP_CONFIG.defaultView.center,
            zoom: CHATEAUX_MAP_CONFIG.defaultView.zoom,
            attributionControl: false,
            style: CHATEAUX_MAP_CONFIG.basemapStyle,
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
            map.easeTo({
                center: CHATEAUX_MAP_CONFIG.defaultView.center,
                zoom: CHATEAUX_MAP_CONFIG.defaultView.zoom,
                duration: CHATEAUX_MAP_CONFIG.defaultView.resetDuration,
            });
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
                ...CHATEAUX_MAP_CONFIG.singleChateau,
            });
        } else {
            map.fitBounds(bounds, {
                ...CHATEAUX_MAP_CONFIG.catalogueFit,
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
