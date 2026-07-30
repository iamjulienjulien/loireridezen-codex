"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";

import { useAmbiance } from "@/hooks/useAmbiance";
import type { Ambiance } from "@/registry/ambiances";
import type { Chateau, ChateauEpoque } from "@/types/chateau";

import styles from "./ChateauxMapCanvas.module.css";

type ChateauxMapCanvasProps = {
    chateaux: readonly Chateau[];
};

const MARKER_TONES: Record<ChateauEpoque, string> = {
    Médiéval: styles.medieval,
    Renaissance: styles.renaissance,
    Classique: styles.classique,
    Éclectique: styles.eclectique,
};

const DEFAULT_CENTER: [number, number] = [1.7, 47.3];
const BASEMAP_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

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
    const maplibreRef = useRef<typeof import("maplibre-gl") | null>(null);
    const markersRef = useRef<Marker[]>([]);
    const ambianceRef = useRef(ambiance);
    const [isReady, setIsReady] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState<string>();
    const selectedChateau = chateaux.find(
        (chateau) => chateau.slug === selectedSlug,
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let cancelled = false;
        let map: MapLibreMap | null = null;

        void import("maplibre-gl").then((maplibregl) => {
            if (cancelled) return;

            maplibreRef.current = maplibregl;
            map = new maplibregl.Map({
                container,
                center: DEFAULT_CENTER,
                zoom: 6,
                attributionControl: false,
                style: BASEMAP_STYLE_URL,
            });

            mapRef.current = map;
            map.once("load", () => {
                applyMapAmbiance(map!, ambianceRef.current);
                setIsReady(true);
            });
        });

        return () => {
            cancelled = true;
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            map?.remove();
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
        const maplibregl = maplibreRef.current;
        if (!map || !maplibregl || !isReady) return;

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        if (chateaux.length === 0) {
            map.easeTo({ center: DEFAULT_CENTER, zoom: 6, duration: 350 });
            return;
        }

        const bounds = new maplibregl.LngLatBounds();

        chateaux.forEach((chateau) => {
            const marker = document.createElement("button");
            marker.type = "button";
            marker.className = [
                styles.marker,
                MARKER_TONES[chateau.epoque],
                chateau.slug === selectedSlug ? styles.markerSelected : "",
            ]
                .filter(Boolean)
                .join(" ");
            marker.setAttribute(
                "aria-label",
                `${chateau.nom}, ${chateau.commune}`,
            );
            marker.title = chateau.nom;
            marker.addEventListener("click", () =>
                setSelectedSlug(chateau.slug),
            );

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
    }, [chateaux, isReady, selectedSlug]);

    const scrollToChateau = () => {
        if (!selectedChateau) return;

        document
            .getElementById(`chateau-${selectedChateau.slug}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <div className={styles.root}>
            <div className={styles.canvas} ref={containerRef} />

            <aside
                className={styles.preview}
                data-visible={Boolean(selectedChateau)}
            >
                {selectedChateau ? (
                    <>
                        <p>{selectedChateau.epoque}</p>
                        <strong>{selectedChateau.nom}</strong>
                        <span>{selectedChateau.commune}</span>
                        <button onClick={scrollToChateau} type="button">
                            Voir la fiche <span aria-hidden="true">↓</span>
                        </button>
                    </>
                ) : (
                    <span>Sélectionne un marqueur pour ouvrir son aperçu.</span>
                )}
            </aside>

            <p className={styles.attribution}>
                ©{" "}
                <a
                    href="https://www.openstreetmap.org/copyright"
                    target="_blank"
                    rel="noreferrer"
                >
                    OpenStreetMap
                </a>{" "}
                ·{" "}
                <a
                    href="https://openfreemap.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    OpenFreeMap
                </a>
            </p>
        </div>
    );
}
