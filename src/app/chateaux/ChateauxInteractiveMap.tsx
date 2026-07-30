"use client";

import dynamic from "next/dynamic";
import { Map, MapPinned, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { Chateau } from "@/types/chateau";

import styles from "./ChateauxInteractiveMap.module.css";

const ChateauxMapCanvas = dynamic(() => import("./ChateauxMapCanvas"), {
    ssr: false,
    loading: () => (
        <div className={styles.loading} role="status">
            Préparation de la carte…
        </div>
    ),
});

type ChateauxInteractiveMapProps = {
    chateaux: readonly Chateau[];
};

export default function ChateauxInteractiveMap({
    chateaux,
}: ChateauxInteractiveMapProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCondensed, setIsCondensed] = useState(false);
    const rootRef = useRef<HTMLElement>(null);
    const mapId = useId();
    const markerLabel = chateaux.length > 1 ? "marqueurs" : "marqueur";

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

    const toggleMap = () => {
        if (isOpen) setIsCondensed(false);
        setIsOpen((current) => !current);
    };

    return (
        <section
            className={styles.root}
            data-condensed={isCondensed || undefined}
            data-open={isOpen || undefined}
            ref={rootRef}
        >
            <header className={styles.header}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>Carte des châteaux</p>
                    <p className={styles.count} aria-live="polite">
                        <MapPinned aria-hidden="true" />
                        {chateaux.length} {markerLabel} visible
                    </p>
                </div>

                <button
                    aria-controls={mapId}
                    aria-expanded={isOpen}
                    className={styles.toggle}
                    onClick={toggleMap}
                    type="button"
                >
                    {isOpen ? (
                        <X aria-hidden="true" />
                    ) : (
                        <Map aria-hidden="true" />
                    )}
                    {isOpen ? "Masquer la carte" : "Afficher la carte"}
                </button>
            </header>

            {isOpen ? (
                <div className={styles.mapWrap} id={mapId}>
                    <ChateauxMapCanvas chateaux={chateaux} />
                </div>
            ) : null}
        </section>
    );
}
