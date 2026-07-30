"use client";

import dynamic from "next/dynamic";
import { Map, MapPinned, X } from "lucide-react";
import { useId, useState } from "react";

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
    const mapId = useId();
    const markerLabel = chateaux.length > 1 ? "marqueurs" : "marqueur";

    return (
        <section className={styles.root} data-open={isOpen || undefined}>
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
                    onClick={() => setIsOpen((current) => !current)}
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
