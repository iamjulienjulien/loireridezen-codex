"use client";

import Link from "next/link";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import { createRoot, type Root } from "react-dom/client";
import { Castle, Minus, Music, Plus, type LucideIcon } from "lucide-react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";

import {
    LRZMapMarker,
    type LRZMapMarkerVariant,
} from "@/components/_ui/LRZMapMarker";
import {
    LRZButtonGroup,
    LRZButtonGroupItem,
} from "@/components/_ui/LRZButtonGroup";
import { useAmbiance } from "@/hooks/useAmbiance";
import type { LRZColor } from "@/types/lrz";

import { CHATEAUX_MAP_CONFIG } from "@/components/_maps/chateaux/config";
import styles from "./CarteMap.module.css";

export type CarteMarker = {
    id: string;
    kind: "chateau" | "guinguette";
    title: string;
    detail: string;
    href: string;
    longitude: number;
    latitude: number;
};

type MarkerKind = CarteMarker["kind"];

type MarkerVisual = {
    label: string;
    accent: string;
    color: LRZColor;
    variant: LRZMapMarkerVariant;
    icon: LucideIcon;
    symbolScale: number;
};

const MARKER_VISUALS: Record<MarkerKind, MarkerVisual> = {
    chateau: {
        label: "Châteaux",
        accent: "#B88945",
        color: "ocre",
        variant: "star",
        icon: Castle,
        symbolScale: 1.16,
    },
    guinguette: {
        label: "Guinguettes",
        accent: "#A44842",
        color: "brique",
        variant: "square",
        icon: Music,
        symbolScale: 1.12,
    },
};

const MAP_MARKER_KINDS = Object.keys(MARKER_VISUALS) as MarkerKind[];

function MarkerSymbol({ kind }: { kind: MarkerKind }) {
    const Icon = MARKER_VISUALS[kind].icon;

    return <Icon aria-hidden />;
}

export default function CarteMap({
    markers,
}: {
    markers: readonly CarteMarker[];
}) {
    const [ambiance] = useAmbiance();
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const markersRef = useRef<Marker[]>([]);
    const markerRootsRef = useRef<Root[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<CarteMarker>();
    const [visibleKinds, setVisibleKinds] = useState<Set<MarkerKind>>(
        () => new Set(MAP_MARKER_KINDS),
    );

    const visibleMarkers = useMemo(
        () => markers.filter((marker) => visibleKinds.has(marker.kind)),
        [markers, visibleKinds],
    );

    const selectMarker = useCallback((marker: CarteMarker) => {
        setSelectedMarker(marker);
        mapRef.current?.flyTo({
            center: [marker.longitude, marker.latitude],
            zoom: 11,
            duration: 550,
        });
    }, []);

    const toggleKind = (kind: MarkerKind) => {
        setVisibleKinds((current) => {
            const next = new Set(current);

            if (next.has(kind)) {
                if (next.size === 1) return current;
                next.delete(kind);
            } else {
                next.add(kind);
            }

            return next;
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

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
            map.resize();
            requestAnimationFrame(() => map.resize());
            setIsReady(true);
        });

        return () => {
            resizeObserver.disconnect();
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            markerRootsRef.current.forEach((root) => root.unmount());
            markerRootsRef.current = [];
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !isReady) return;

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        markerRootsRef.current.forEach((root) => root.unmount());
        markerRootsRef.current = [];

        const bounds = new maplibregl.LngLatBounds();
        visibleMarkers.forEach((marker) => {
            const markerContainer = document.createElement("div");
            const visual = MARKER_VISUALS[marker.kind];
            const markerRoot = createRoot(markerContainer);

            markerRoot.render(
                <LRZMapMarker
                    className={styles.mapMarker}
                    label={marker.title}
                    description={marker.detail}
                    variant={visual.variant}
                    tone="outline"
                    size={marker.kind === "chateau" ? 34 : 26}
                    color={visual.color}
                    symbol={<MarkerSymbol kind={marker.kind} />}
                    symbolScale={visual.symbolScale}
                    onClick={() => selectMarker(marker)}
                />,
            );
            markerRootsRef.current.push(markerRoot);

            markersRef.current.push(
                new maplibregl.Marker({
                    element: markerContainer,
                    anchor: "bottom",
                })
                    .setLngLat([marker.longitude, marker.latitude])
                    .addTo(map),
            );
            bounds.extend([marker.longitude, marker.latitude]);
        });

        if (!bounds.isEmpty()) {
            map.fitBounds(bounds, {
                padding: 84,
                maxZoom: 9,
                duration: 0,
            });
        }

        setSelectedMarker((current) =>
            current &&
            !visibleMarkers.some((marker) => marker.id === current.id)
                ? undefined
                : current,
        );
    }, [isReady, selectMarker, visibleMarkers]);

    return (
        <section className={styles.root} data-ambiance={ambiance}>
            <div className={styles.canvas} ref={containerRef} />

            <div className={styles.zoomControls}>
                <LRZButtonGroup
                    ariaLabel="Contrôles de zoom"
                    orientation="vertical"
                    selectionMode="none"
                    size="sm"
                    variant="primary"
                    color="ocre"
                    attached
                >
                    <LRZButtonGroupItem
                        value="zoom-in"
                        aria-label="Zoomer"
                        disabled={!isReady}
                        onClick={() =>
                            mapRef.current?.zoomIn({ duration: 250 })
                        }
                    >
                        <Plus aria-hidden />
                    </LRZButtonGroupItem>
                    <LRZButtonGroupItem
                        value="zoom-out"
                        aria-label="Dézoomer"
                        disabled={!isReady}
                        onClick={() =>
                            mapRef.current?.zoomOut({ duration: 250 })
                        }
                    >
                        <Minus aria-hidden />
                    </LRZButtonGroupItem>
                </LRZButtonGroup>
            </div>

            <div className={styles.controls} aria-label="Filtres de la carte">
                <p className={styles.controlsEyebrow}>Explorer la carte</p>
                <div className={styles.legend}>
                    {MAP_MARKER_KINDS.map((kind) => {
                        const visual = MARKER_VISUALS[kind];
                        const count = markers.filter(
                            (marker) => marker.kind === kind,
                        ).length;
                        const active = visibleKinds.has(kind);

                        return (
                            <button
                                key={kind}
                                className={styles.legendButton}
                                data-active={active || undefined}
                                style={
                                    {
                                        "--marker-color": visual.accent,
                                    } as CSSProperties
                                }
                                type="button"
                                aria-pressed={active}
                                onClick={() => toggleKind(kind)}
                            >
                                <LRZMapMarker
                                    className={styles.mapMarker}
                                    label={visual.label}
                                    variant={visual.variant}
                                    tone="outline"
                                    size={38}
                                    color={visual.color}
                                    symbol={<MarkerSymbol kind={kind} />}
                                    symbolScale={visual.symbolScale}
                                    interactive={false}
                                />
                                {visual.label}
                                <span className={styles.legendCount}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {selectedMarker ? (
                <aside className={styles.selection} aria-live="polite">
                    <p className={styles.selectionEyebrow}>
                        {MARKER_VISUALS[selectedMarker.kind].label.slice(0, -1)}
                    </p>
                    <h2>{selectedMarker.title}</h2>
                    <p>{selectedMarker.detail}</p>
                    <Link href={selectedMarker.href}>Ouvrir la fiche →</Link>
                </aside>
            ) : null}

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
        </section>
    );
}
