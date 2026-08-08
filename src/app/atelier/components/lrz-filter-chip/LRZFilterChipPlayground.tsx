"use client";

import { useState } from "react";

import {
    LRZFilterChip,
    type LRZFilterPreset,
} from "@/components/LRZFilterChip";

import styles from "../filter-playground.module.css";

export default function LRZFilterChipPlayground() {
    const [active, setActive] = useState("Renaissance");
    const [presetIndex, setPresetIndex] = useState(0);
    const [variant, setVariant] = useState<"default" | "solid" | "quiet">(
        "default",
    );
    const [size, setSize] = useState<"sm" | "md">("md");
    const [isActive, setIsActive] = useState(true);

    const presets: readonly LRZFilterPreset[] = [
        { collection: "faune", meta: "type", slug: "oiseau" },
        { collection: "faune", meta: "rarete", slug: "trésor" },
        { collection: "flore", meta: "categorie", slug: "aquatique" },
        { collection: "chateau", meta: "renommee", slug: "phare" },
    ];
    const preset = presets[presetIndex];

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
                <div className={styles.controls}>
                    <label>
                        Preset
                        <select
                            value={presetIndex}
                            onChange={(event) =>
                                setPresetIndex(Number(event.target.value))
                            }
                        >
                            <option value={0}>Faune · Type · Oiseau</option>
                            <option value={1}>Faune · Rareté · Trésor</option>
                            <option value={2}>Flore · Catégorie · Aquatique</option>
                            <option value={3}>Château · Renommée · Phare</option>
                        </select>
                    </label>
                    <label>
                        Variante
                        <select
                            value={variant}
                            onChange={(event) =>
                                setVariant(
                                    event.target.value as typeof variant,
                                )
                            }
                        >
                            <option value="default">Default</option>
                            <option value="solid">Solid</option>
                            <option value="quiet">Quiet</option>
                        </select>
                    </label>
                    <label>
                        Taille
                        <select
                            value={size}
                            onChange={(event) =>
                                setSize(event.target.value as typeof size)
                            }
                        >
                            <option value="sm">SM</option>
                            <option value="md">MD</option>
                        </select>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(event) => setIsActive(event.target.checked)}
                        />
                        Actif
                    </label>
                </div>
                <div className={styles.row}>
                    <LRZFilterChip
                        preset={preset}
                        active={isActive}
                        variant={variant}
                        size={size}
                        count={24}
                    />
                </div>
                <code className={styles.code}>{`<LRZFilterChip
    preset={{ collection: "faune", meta: "type", slug: "oiseau" }}
    active
    count={24}
/>`}</code>
            </div>
        </section>
    );
}
