"use client";

import { useState } from "react";

import { LRZFilterChip } from "@/components/LRZFilterChip";

import styles from "../filter-playground.module.css";

export default function LRZFilterChipPlayground() {
    const [active, setActive] = useState("Renaissance");

    return (
        <section className={styles.section} aria-labelledby="chip-playground">
            <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Bac à sable interactif</p>
                <h2 id="chip-playground">Tester l’état actif</h2>
                <p>
                    Le chip reste un bouton simple. La sélection, elle, est
                    pilotée par le composant parent.
                </p>
            </div>
            <div className={styles.preview}>
                <p className={styles.previewLabel}>
                    Filtre sélectionné : {active}
                </p>
                <div className={styles.row}>
                    {["Tout", "Médiéval", "Renaissance", "Classique"].map(
                        (label) => (
                            <LRZFilterChip
                                key={label}
                                active={active === label}
                                count={label === "Tout" ? 52 : undefined}
                                onClick={() => setActive(label)}
                            >
                                {label}
                            </LRZFilterChip>
                        ),
                    )}
                </div>
                <code className={styles.code}>{`<LRZFilterChip
    active={active === "Renaissance"}
    count={29}
    onClick={() => setActive("Renaissance")}
>
    Renaissance
</LRZFilterChip>`}</code>
            </div>
        </section>
    );
}
