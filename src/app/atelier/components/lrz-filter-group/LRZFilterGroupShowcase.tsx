"use client";

import { useState } from "react";

import { LRZFilterGroup } from "@/components/LRZFilterGroup";

import styles from "../filter-playground.module.css";

const OPTIONS = [
    { id: "all", label: "Tout" },
    { id: "medieval", label: "Médiéval", count: 16 },
    { id: "renaissance", label: "Renaissance", count: 29 },
    { id: "classique", label: "Classique", count: 6 },
];

export default function LRZFilterGroupShowcase() {
    const [active, setActive] = useState("all");

    return (
        <>
            <section
                className={styles.section}
                aria-labelledby="group-overview"
            >
                <div className={styles.sectionHeader}>
                    <p className={styles.kicker}>Anatomie</p>
                    <h2 id="group-overview">Un critère, plusieurs chemins</h2>
                    <p>
                        Le label nomme le critère, la valeur active confirme le
                        choix et les chips rendent les alternatives
                        immédiatement comparables.
                    </p>
                </div>
                <div className={styles.preview}>
                    <LRZFilterGroup
                        label="Époque"
                        options={OPTIONS}
                        activeId="renaissance"
                        onSelect={setActive}
                        variant="card"
                    />
                </div>
            </section>

            <section
                className={styles.section}
                aria-labelledby="group-variants"
            >
                <div className={styles.sectionHeader}>
                    <p className={styles.kicker}>Variantes de composition</p>
                    <h2 id="group-variants">Du panneau au contexte dense</h2>
                    <p>
                        Trois compositions couvrent le panneau de filtres, le
                        groupe libre et la future sidebar.
                    </p>
                </div>
                <div className={styles.stack}>
                    <div className={styles.example}>
                        <h3 className={styles.exampleTitle}>Default</h3>
                        <LRZFilterGroup
                            label="Renommée"
                            options={OPTIONS.slice(0, 3)}
                            activeId="all"
                            onSelect={setActive}
                            variant="default"
                        />
                    </div>
                    <div className={styles.example}>
                        <h3 className={styles.exampleTitle}>Inline</h3>
                        <LRZFilterGroup
                            label="Renommée"
                            options={OPTIONS.slice(0, 3)}
                            activeId="renaissance"
                            onSelect={setActive}
                            variant="inline"
                        />
                    </div>
                    <div className={styles.example}>
                        <h3 className={styles.exampleTitle}>Vertical</h3>
                        <LRZFilterGroup
                            label="Accès"
                            options={OPTIONS.slice(0, 3)}
                            activeId="all"
                            onSelect={setActive}
                            orientation="vertical"
                            variant="card"
                        />
                    </div>
                </div>
            </section>

            <section
                className={styles.section}
                aria-labelledby="group-playground"
            >
                <div className={styles.sectionHeader}>
                    <p className={styles.kicker}>Bac à sable interactif</p>
                    <h2 id="group-playground">
                        Un groupe piloté par son parent
                    </h2>
                    <p>
                        Le groupe expose l’option active et délègue la sélection
                        à la fonction fournie par la page.
                    </p>
                </div>
                <div className={styles.preview}>
                    <p className={styles.previewLabel}>
                        Sélection active : {active}
                    </p>
                    <LRZFilterGroup
                        label="Époque"
                        options={OPTIONS}
                        activeId={active}
                        onSelect={setActive}
                        variant="card"
                        accent="var(--gold)"
                    />
                    <code className={styles.code}>{`<LRZFilterGroup
    label="Époque"
    options={options}
    activeId={activeId}
    onSelect={setActiveId}
    variant="card"
/>`}</code>
                </div>
            </section>
        </>
    );
}
