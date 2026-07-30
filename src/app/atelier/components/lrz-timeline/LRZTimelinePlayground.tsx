"use client";

import { useState } from "react";

import {
    LRZTimeline,
    type LRZTimelineOrientation,
    type LRZTimelineSize,
    type LRZTimelineVariant,
} from "@/components/LRZTimeline";

import styles from "../filter-playground.module.css";

const ITEMS = [
    {
        id: "medieval",
        date: "XIe siècle",
        eyebrow: "Forteresse",
        title: "Le temps des donjons",
        description: "Les premières silhouettes fortifiées s’installent sur les éperons et les rives stratégiques.",
        meta: "Loches · Chinon · Angers",
    },
    {
        id: "renaissance",
        date: "1519",
        eyebrow: "Architecture",
        title: "Le rêve de Chambord",
        description: "La demeure royale devient manifeste, théâtre et laboratoire de formes nouvelles.",
        meta: "François Ier",
        featured: true,
    },
    {
        id: "jardins",
        date: "XVIe — XXe siècle",
        eyebrow: "Paysage",
        title: "Le château s’ouvre sur ses jardins",
        description: "Terrasses, perspectives et domaines prolongent l’architecture jusque dans le paysage.",
        meta: "Villandry · Chaumont-sur-Loire",
    },
] as const;

export default function LRZTimelinePlayground() {
    const [variant, setVariant] = useState<LRZTimelineVariant>("line");
    const [orientation, setOrientation] =
        useState<LRZTimelineOrientation>("vertical");
    const [size, setSize] = useState<LRZTimelineSize>("md");

    return (
        <section className={styles.section} aria-labelledby="timeline-playground">
            <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Bac à sable interactif</p>
                <h2 id="timeline-playground">Une histoire qui se déroule</h2>
                <p>
                    La frise organise des événements, des périodes et des
                    étapes de récit dans le temps.
                </p>
            </div>
            <div className={styles.preview}>
                <div className={styles.row}>
                    <label>
                        Variante{" "}
                        <select
                            value={variant}
                            onChange={(event) =>
                                setVariant(event.target.value as LRZTimelineVariant)
                            }
                        >
                            <option value="line">line</option>
                            <option value="cards">cards</option>
                            <option value="compact">compact</option>
                        </select>
                    </label>
                    <label>
                        Orientation{" "}
                        <select
                            value={orientation}
                            onChange={(event) =>
                                setOrientation(
                                    event.target.value as LRZTimelineOrientation,
                                )
                            }
                        >
                            <option value="vertical">vertical</option>
                            <option value="horizontal">horizontal</option>
                        </select>
                    </label>
                    <label>
                        Taille{" "}
                        <select
                            value={size}
                            onChange={(event) =>
                                setSize(event.target.value as LRZTimelineSize)
                            }
                        >
                            <option value="sm">sm</option>
                            <option value="md">md</option>
                            <option value="lg">lg</option>
                        </select>
                    </label>
                </div>
                <LRZTimeline
                    items={ITEMS}
                    variant={variant}
                    orientation={orientation}
                    size={size}
                    accent="var(--gold)"
                    ariaLabel="Évolution des châteaux ligériens"
                />
                <pre className={styles.code}>{`<LRZTimeline
    items={items}
    variant="${variant}"
    orientation="${orientation}"
    size="${size}"
/>`}</pre>
            </div>
        </section>
    );
}
