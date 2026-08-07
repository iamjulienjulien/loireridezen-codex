"use client";

import { useState } from "react";

import ChateauxCard from "@/app/chateaux/ChateauxCard";
import FauneCard from "@/app/faune/FauneCard";
import FloreCard from "@/app/flore/FloreCard";
import GuinguetteCardV3 from "@/app/guinguettes/GuinguetteCardV3";
import GuinguetteCardV4 from "@/app/guinguettes/GuinguetteCardV4";
import PersonnageCard from "@/app/personnages/PersonnageCard";
import type {
    Personnage,
    PersonnagesParLieu,
    RelationPersonnageLieu,
} from "@/types/personnage";

import { MOCK_CHATEAU } from "../mockChateau";
import { MOCK_FAUNE } from "../mockFaune";
import { MOCK_FLORE } from "../mockFlore";
import { MOCK_GUINGUETTE } from "../mockGuinguette";
import styles from "../atelier.module.css";

type PersonnageExample = {
    personnage: Personnage;
    relations: RelationPersonnageLieu[];
};

export default function MetierShowcase({
    personnageExamples,
    personnagesByChateau,
}: {
    personnageExamples: readonly PersonnageExample[];
    personnagesByChateau: PersonnagesParLieu;
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
                    {MOCK_FAUNE.slice(0, 3).map((item) => (
                        <FauneCard key={item.slug} d={item} />
                    ))}
                </div>
            </section>

            <section id="flore-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 02</p>
                    <h2>FloreCard</h2>
                    <span>
                        Les plantes, leurs milieux et leurs protections.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_FLORE.slice(0, 3).map((item) => (
                        <FloreCard key={item.slug} d={item} />
                    ))}
                </div>
            </section>

            <section id="chateaux-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 03</p>
                    <h2>ChateauxCard</h2>
                    <span>
                        Les demeures, les protections et leurs histoires.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_CHATEAU.slice(0, 3).map((item) => (
                        <ChateauxCard
                            key={item.slug}
                            d={item}
                            open={false}
                            personnages={personnagesByChateau[item.slug] ?? []}
                        />
                    ))}
                </div>
            </section>

            <section id="guinguette-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 04</p>
                    <h2>GuinguetteCardV3</h2>
                    <span>
                        Les escales, leurs ambiances et leurs informations
                        pratiques.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_GUINGUETTE.map((item) => (
                        <GuinguetteCardV3
                            key={item.slug}
                            guinguette={item}
                            open={Boolean(open[item.slug])}
                            onToggle={() => toggle(item.slug)}
                        />
                    ))}
                </div>
            </section>

            <section id="guinguette-card-v4" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 05</p>
                    <h2>GuinguetteCardV4</h2>
                    <span>
                        Une lecture éditoriale alignée sur Faune et Flore, avec
                        les ambiances illustrées par LRZStamp.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_GUINGUETTE.map((item) => (
                        <GuinguetteCardV4 key={item.slug} guinguette={item} />
                    ))}
                </div>
            </section>

            <section id="personnage-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 06</p>
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
