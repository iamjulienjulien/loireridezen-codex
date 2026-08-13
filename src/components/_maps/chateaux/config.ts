import type { Ambiance } from "@/registry/ambiances";

export type ChateauxMapStickyMode = "floating" | "compact";
export type ChateauxMapFloatingPosition =
    "inline" | "top-right" | "top-left" | "bottom-right" | "bottom-left";

export const CHATEAUX_MAP_FLOATING_POSITIONS = [
    {
        id: "inline",
        label: "Dans le contenu",
        description:
            "Une fenêtre sticky, proche du catalogue et de sa lecture.",
    },
    {
        id: "top-right",
        label: "En haut à droite",
        description:
            "Une fenêtre fixe dans le coin supérieur droit du viewport.",
    },
    {
        id: "top-left",
        label: "En haut à gauche",
        description:
            "Une fenêtre fixe dans le coin supérieur gauche du viewport.",
    },
    {
        id: "bottom-right",
        label: "En bas à droite",
        description: "Une fenêtre fixe au-dessus du catalogue.",
    },
    {
        id: "bottom-left",
        label: "En bas à gauche",
        description: "Une alternative fixe, plus discrète visuellement.",
    },
] as const satisfies ReadonlyArray<{
    id: ChateauxMapFloatingPosition;
    label: string;
    description: string;
}>;

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

export const CHATEAUX_MAP_CONFIG = {
    stickyMode: "floating" as ChateauxMapStickyMode,
    floating: {
        position: "top-right" as ChateauxMapFloatingPosition,
        dimensions: {
            width: 400,
            height: 288,
            minWidth: 288,
            minHeight: 180,
            gutter: 18,
        },
    },
    workerUrl:
        "https://unpkg.com/maplibre-gl@6.0.0/dist/maplibre-gl-worker.mjs",
    defaultView: {
        center: [1.7, 47.3] as [number, number],
        zoom: 6,
        resetDuration: 350,
    },
    catalogueFit: {
        padding: 64,
        maxZoom: 10,
        duration: 450,
    },
    territoryFit: {
        padding: 52,
        maxZoom: 10,
        duration: 550,
    },
    singleChateau: {
        zoom: 11,
        duration: 450,
    },
    singleTerritoryChateau: {
        zoom: 10.5,
        duration: 550,
    },
    basemapStyle: {
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
    },
};

// Adaptation compacte des palettes du prototype cartographique : la carte
// suit l'ambiance courante du Codex sans introduire de contrôle supplémentaire.
export const CHATEAUX_MAP_PALETTES: Record<Ambiance, MapPalette> = {
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
