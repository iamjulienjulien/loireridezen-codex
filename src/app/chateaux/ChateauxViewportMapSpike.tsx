"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import type { Chateau } from "@/types/chateau";

import styles from "./ChateauxViewportMapSpike.module.css";

export type ChateauxViewportMapVariant = "top" | "side" | "compact";

type ChateauxViewportMapSpikeProps = {
    chateaux: readonly Chateau[];
    children: ReactNode;
    /** Variante conservée pour les futures comparaisons UX. */
    variant?: ChateauxViewportMapVariant;
};

type MapPoint = Chateau & {
    x: number;
    y: number;
};

function getMapPoints(chateaux: readonly Chateau[]): MapPoint[] {
    const longitudes = chateaux.map((chateau) => chateau.coordonnees.lng);
    const latitudes = chateaux.map((chateau) => chateau.coordonnees.lat);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    const longitudeRange = Math.max(maxLongitude - minLongitude, 0.01);
    const latitudeRange = Math.max(maxLatitude - minLatitude, 0.01);

    return chateaux.map((chateau) => ({
        ...chateau,
        x:
            42 +
            ((chateau.coordonnees.lng - minLongitude) / longitudeRange) * 916,
        y:
            48 +
            (1 - (chateau.coordonnees.lat - minLatitude) / latitudeRange) * 164,
    }));
}

export default function ChateauxViewportMapSpike({
    chateaux,
    children,
    variant = "top",
}: ChateauxViewportMapSpikeProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [activeSlug, setActiveSlug] = useState(chateaux[0]?.slug);
    const [isCondensed, setIsCondensed] = useState(false);
    const points = useMemo(() => getMapPoints(chateaux), [chateaux]);
    const resolvedActiveSlug = chateaux.some(
        (chateau) => chateau.slug === activeSlug,
    )
        ? activeSlug
        : chateaux[0]?.slug;

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const cards = [
            ...root.querySelectorAll<HTMLElement>("[data-chateau-map-slug]"),
        ];
        if (cards.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleCard = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio - first.intersectionRatio,
                    )[0];

                const slug = visibleCard?.target.getAttribute(
                    "data-chateau-map-slug",
                );

                if (slug) setActiveSlug(slug);
            },
            {
                rootMargin: "-24% 0px -52% 0px",
                threshold: [0.1, 0.4, 0.7],
            },
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, [children, variant]);

    useEffect(() => {
        if (variant !== "compact") {
            return;
        }

        const root = rootRef.current;
        if (!root) return;

        let frame = 0;
        const updateCondensedState = () => {
            frame = 0;
            setIsCondensed(root.getBoundingClientRect().top < -96);
        };
        const scheduleUpdate = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(updateCondensedState);
        };

        scheduleUpdate();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleUpdate);
        };
    }, [variant]);

    const focusChateau = (slug: string) => {
        setActiveSlug(slug);
        const element = rootRef.current?.querySelector<HTMLElement>(
            `[data-chateau-map-slug="${slug}"]`,
        );
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        element?.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "center",
        });
    };

    return (
        <section
            ref={rootRef}
            className={styles.spike}
            data-variant={variant}
            data-condensed={isCondensed || undefined}
            aria-label="Prototype de carte synchronisée au catalogue"
        >
            <div className={styles.layout}>
                <aside className={styles.mapColumn}>
                    <div className={styles.mapSticky}>
                        <div className={styles.mapCard}>
                            <div className={styles.mapHeading}>
                                <span>Le fil royal</span>
                                <span>{chateaux.length} lieux</span>
                            </div>

                            <svg
                                className={styles.map}
                                viewBox="0 0 1000 260"
                                role="img"
                                aria-label="Carte schématique des châteaux affichés"
                            >
                                <path
                                    className={styles.river}
                                    d="M20 136 C 118 74, 210 204, 305 130 S 485 62, 596 142 S 792 198, 980 105"
                                />
                                {points.map((point) => (
                                    <circle
                                        className={styles.mapPoint}
                                        cx={point.x}
                                        cy={point.y}
                                        data-active={
                                            point.slug === resolvedActiveSlug ||
                                            undefined
                                        }
                                        key={point.slug}
                                        r={
                                            point.slug === resolvedActiveSlug
                                                ? 8
                                                : 5
                                        }
                                    />
                                ))}
                            </svg>

                            <div className={styles.mapLegend}>
                                <span className={styles.legendDot} />
                                <span>Fiche suivie dans le viewport</span>
                            </div>

                            <div className={styles.pointList}>
                                {points.map((point) => (
                                    <button
                                        className={styles.pointButton}
                                        data-active={
                                            point.slug === resolvedActiveSlug ||
                                            undefined
                                        }
                                        key={point.slug}
                                        onClick={() => focusChateau(point.slug)}
                                        type="button"
                                    >
                                        <span>{point.nom}</span>
                                        <span>{point.commune}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                <div className={styles.catalogue}>{children}</div>
            </div>
        </section>
    );
}
