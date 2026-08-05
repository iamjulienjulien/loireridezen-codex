"use client";

import { useState } from "react";

import ChateauxCard from "@/app/chateaux/ChateauxCard";
import FauneCard from "@/app/faune/FauneCard";
import FloreCard from "@/app/flore/FloreCard";
import PersonnageCard from "@/components/personnages/PersonnageCard";
import type { Personnage, RelationPersonnageLieu } from "@/types/personnage";

import { MOCK_CHATEAU } from "../mockChateau";
import { MOCK_FAUNE } from "../mockFaune";
import { MOCK_FLORE } from "../mockFlore";
import styles from "../atelier.module.css";

type PersonnageExample = {
    personnage: Personnage;
    relations: RelationPersonnageLieu[];
};

export default function MetierShowcase({
    personnageExamples,
}: {
    personnageExamples: readonly PersonnageExample[];
}) {
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const toggle = (slug: string) =>
        setOpen((current) => ({ ...current, [slug]: !current[slug] }));

    return (
        <div className={styles.showcaseStack}>
            <section id="faune-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 01</p>
                    <h2>FauneCard</h2>
                    <span>Les espèces, leurs statuts et leurs traces.</span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_FAUNE.slice(0, 2).map((item) => (
                        <FauneCard
                            key={item.slug}
                            d={item}
                            open={Boolean(open[item.slug])}
                            onToggle={() => toggle(item.slug)}
                        />
                    ))}
                </div>
            </section>

            <section id="flore-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 02</p>
                    <h2>FloreCard</h2>
                    <span>Les plantes, leurs milieux et leurs protections.</span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_FLORE.slice(0, 2).map((item) => (
                        <FloreCard
                            key={item.slug}
                            d={item}
                            open={Boolean(open[item.slug])}
                            onToggle={() => toggle(item.slug)}
                        />
                    ))}
                </div>
            </section>

            <section id="chateaux-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 03</p>
                    <h2>ChateauxCard</h2>
                    <span>Les demeures, les protections et leurs histoires.</span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_CHATEAU.slice(0, 2).map((item) => (
                        <ChateauxCard key={item.slug} d={item} open={false} />
                    ))}
                </div>
            </section>

            <section id="personnage-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 04</p>
                    <h2>PersonnageCard</h2>
                    <span>
                        Les figures historiques, leurs rôles et leurs liens avec
                        les châteaux.
                    </span>
                </header>
                <div className={styles.personnageShowcaseGrid}>
                    {personnageExamples.map(({ personnage, relations }) => (
                        <PersonnageCard
                            key={personnage.id}
                            personnage={personnage}
                            relations={relations}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
