"use client";

import dynamic from "next/dynamic";
import { X } from "lucide-react";
import {
    useEffect,
    useId,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent,
    type PointerEvent,
} from "react";

import type { Guinguette } from "@/types/guinguette";

import {
    GUINGUETTES_MAP_CONFIG,
    type GuinguettesMapFloatingPosition,
    type GuinguettesMapStickyMode,
} from "@/components/_maps/guinguettes/config";
import styles from "@/components/_maps/chateaux/ChateauxInteractiveMap/ChateauxInteractiveMap.module.css";

const GuinguettesMapCanvas = dynamic(() => import("../GuinguettesMapCanvas"), {
    ssr: false,
    loading: () => (
        <div className={styles.loading} role="status">
            Préparation de la carte…
        </div>
    ),
});

type GuinguettesInteractiveMapProps = {
    guinguettes: readonly Guinguette[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Comportement de la carte une fois accrochée en haut du viewport. */
    stickyMode?: GuinguettesMapStickyMode;
    floatingPosition?: GuinguettesMapFloatingPosition;
};

type DragPosition = { x: number; y: number };
type MapSize = { width: number; height: number };
type GuinguettesMapStyle = CSSProperties & {
    "--map-float-width": string;
    "--map-float-height": string;
    "--map-float-gutter": string;
};

export default function GuinguettesInteractiveMap({
    guinguettes,
    open,
    onOpenChange,
    stickyMode = GUINGUETTES_MAP_CONFIG.stickyMode,
    floatingPosition = GUINGUETTES_MAP_CONFIG.floating.position,
}: GuinguettesInteractiveMapProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const isOpen = open ?? uncontrolledOpen;
    const [isCondensed, setIsCondensed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const rootRef = useRef<HTMLElement>(null);
    const mapWrapRef = useRef<HTMLDivElement>(null);
    const dragActiveRef = useRef(false);
    const resizeActiveRef = useRef(false);
    const dragPositionRef = useRef<DragPosition>({ x: 0, y: 0 });
    const dragOriginRef = useRef<DragPosition>({ x: 0, y: 0 });
    const resizeOriginRef = useRef<DragPosition>({ x: 0, y: 0 });
    const mapSizeRef = useRef<MapSize>({ width: 0, height: 0 });
    const mapId = useId();
    const floatingDimensions = GUINGUETTES_MAP_CONFIG.floating.dimensions;
    const floatingStyle: GuinguettesMapStyle = {
        "--map-float-width": `${floatingDimensions.width}px`,
        "--map-float-height": `${floatingDimensions.height}px`,
        "--map-float-gutter": `${floatingDimensions.gutter}px`,
    };

    useEffect(() => {
        if (!isOpen) return;

        let frame = 0;
        const updateDensity = () => {
            frame = 0;
            const root = rootRef.current;
            if (!root) return;

            const headerOffset = Number.parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                    "--header-offset",
                ),
            );
            const stickyOffset = Number.isNaN(headerOffset)
                ? 12
                : headerOffset + 12;

            setIsCondensed(
                root.getBoundingClientRect().top <= stickyOffset + 1,
            );
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(updateDensity);
        };

        updateDensity();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [isOpen]);

    const closeMap = () => {
        setIsCondensed(false);
        if (open === undefined) setUncontrolledOpen(false);
        onOpenChange?.(false);
    };

    const startDrag = (event: PointerEvent<HTMLElement>) => {
        if (stickyMode !== "floating") return;
        if (
            (event.target as HTMLElement).closest(
                "button, a, input, select, textarea",
            )
        ) {
            return;
        }

        const root = rootRef.current;
        if (!root) return;

        dragOriginRef.current = { x: event.clientX, y: event.clientY };
        dragActiveRef.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
    };

    const moveDrag = (event: PointerEvent<HTMLElement>) => {
        if (!dragActiveRef.current) return;

        const root = rootRef.current;
        if (!root) return;

        const current = dragPositionRef.current;
        const rect = root.getBoundingClientRect();
        const layoutLeft = rect.left - current.x;
        const layoutTop = rect.top - current.y;
        const headerOffset = Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--header-offset",
            ),
        );
        const minTop = Number.isNaN(headerOffset) ? 12 : headerOffset + 12;
        const nextX = Math.min(
            Math.max(
                current.x + event.clientX - dragOriginRef.current.x,
                -layoutLeft,
            ),
            window.innerWidth - root.offsetWidth - layoutLeft,
        );
        const nextY = Math.min(
            Math.max(
                current.y + event.clientY - dragOriginRef.current.y,
                minTop - layoutTop,
            ),
            window.innerHeight - root.offsetHeight - layoutTop,
        );

        root.style.setProperty("--map-drag-x", `${nextX}px`);
        root.style.setProperty("--map-drag-y", `${nextY}px`);
        dragPositionRef.current = { x: nextX, y: nextY };
        dragOriginRef.current = { x: event.clientX, y: event.clientY };
    };

    const stopDrag = (event: PointerEvent<HTMLElement>) => {
        if (!dragActiveRef.current) return;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        dragActiveRef.current = false;
        setIsDragging(false);
    };

    const resizeMap = (width: number, height: number) => {
        const root = rootRef.current;
        if (!root) return;

        const headerOffset = Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--header-offset",
            ),
        );
        const safeHeaderOffset = Number.isNaN(headerOffset)
            ? 12
            : headerOffset + 12;
        const nextWidth = Math.min(
            Math.max(width, floatingDimensions.minWidth),
            window.innerWidth - floatingDimensions.gutter * 2,
        );
        const nextHeight = Math.min(
            Math.max(height, floatingDimensions.minHeight),
            window.innerHeight -
                safeHeaderOffset -
                floatingDimensions.gutter * 2,
        );

        root.style.setProperty("--map-float-width", `${nextWidth}px`);
        root.style.setProperty("--map-float-height", `${nextHeight}px`);
        mapSizeRef.current = { width: nextWidth, height: nextHeight };
    };

    const startResize = (event: PointerEvent<HTMLButtonElement>) => {
        if (stickyMode !== "floating") return;

        const root = rootRef.current;
        const mapWrap = mapWrapRef.current;
        if (!root || !mapWrap) return;

        resizeOriginRef.current = { x: event.clientX, y: event.clientY };
        mapSizeRef.current = {
            width: root.offsetWidth,
            height: mapWrap.offsetHeight,
        };
        resizeActiveRef.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const moveResize = (event: PointerEvent<HTMLButtonElement>) => {
        if (!resizeActiveRef.current) return;

        resizeMap(
            mapSizeRef.current.width +
                event.clientX -
                resizeOriginRef.current.x,
            mapSizeRef.current.height +
                event.clientY -
                resizeOriginRef.current.y,
        );
        resizeOriginRef.current = { x: event.clientX, y: event.clientY };
    };

    const stopResize = (event: PointerEvent<HTMLButtonElement>) => {
        if (!resizeActiveRef.current) return;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        resizeActiveRef.current = false;
    };

    const resizeWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
        const root = rootRef.current;
        const mapWrap = mapWrapRef.current;
        if (!root || !mapWrap) return;

        const step = event.shiftKey ? 32 : 16;
        let width = root.offsetWidth;
        let height = mapWrap.offsetHeight;

        if (event.key === "ArrowRight") width += step;
        else if (event.key === "ArrowLeft") width -= step;
        else if (event.key === "ArrowDown") height += step;
        else if (event.key === "ArrowUp") height -= step;
        else return;

        event.preventDefault();
        resizeMap(width, height);
    };

    if (!isOpen) return null;

    return (
        <section
            className={styles.root}
            data-condensed={isCondensed || undefined}
            data-dragging={isDragging || undefined}
            data-floating-position={floatingPosition}
            data-open={isOpen || undefined}
            data-sticky-mode={stickyMode}
            ref={rootRef}
            style={stickyMode === "floating" ? floatingStyle : undefined}
        >
            <header
                className={styles.header}
                onPointerCancel={stopDrag}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={stopDrag}
            >
                <button
                    aria-controls={mapId}
                    aria-label="Fermer la carte"
                    className={styles.closeButton}
                    onClick={closeMap}
                    type="button"
                >
                    <X aria-hidden="true" />
                </button>
            </header>

            <div className={styles.mapWrap} id={mapId} ref={mapWrapRef}>
                <GuinguettesMapCanvas guinguettes={guinguettes} />
            </div>

            <button
                aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight"
                aria-label="Redimensionner la carte"
                className={styles.resizeHandle}
                onKeyDown={resizeWithKeyboard}
                onPointerCancel={stopResize}
                onPointerDown={startResize}
                onPointerMove={moveResize}
                onPointerUp={stopResize}
                type="button"
            />
        </section>
    );
}
