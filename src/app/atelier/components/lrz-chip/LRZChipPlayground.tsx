"use client";

import { useState } from "react";

import { LRZChip } from "@/components/_ui/LRZChip";

import styles from "../filter-playground.module.css";

export default function LRZChipPlayground() {
    const [active, setActive] = useState("Patrimoine");

    return (
        <section className={styles.section} aria-labelledby="chip-playground">
            <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Bac à sable interactif</p>
                <h2 id="chip-playground">Un chip sans contexte métier</h2>
                <p>
                    La brique générique peut porter un état, un compteur ou une
                    action, sans connaître la logique de filtrage.
                </p>
            </div>
            <div className={styles.preview}>
                <p className={styles.previewLabel}>Élément actif : {active}</p>
                <div className={styles.row}>
                    {["Patrimoine", "Nature", "Histoire"].map((label) => (
                        <LRZChip
                            key={label}
                            active={active === label}
                            onClick={() => setActive(label)}
                        >
                            {label}
                        </LRZChip>
                    ))}
                </div>
            </div>
        </section>
    );
}
