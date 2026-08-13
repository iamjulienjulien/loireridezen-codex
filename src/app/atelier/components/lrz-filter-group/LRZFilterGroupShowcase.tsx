"use client";

import { useState } from "react";

import {
    LRZFilterGroup,
    type LRZFilterGroupPreset,
} from "@/components/_ui/LRZFilterGroup";

import styles from "../filter-playground.module.css";

const OPTIONS = [
    { id: "all", label: "Tout" },
    { id: "medieval", label: "Médiéval", count: 16 },
    { id: "renaissance", label: "Renaissance", count: 29 },
    { id: "classique", label: "Classique", count: 6 },
];

export default function LRZFilterGroupShowcase() {
    const [active, setActive] = useState("all");
    const [presetGroup, setPresetGroup] = useState(0);

    const presetGroups: readonly {
        label: string;
        preset: LRZFilterGroupPreset;
        options: readonly { id: string; count: number }[];
    }[] = [
        {
            label: "Type de faune",
            preset: { collection: "faune", meta: "type" },
            options: [
                { id: "oiseau", count: 18 },
                { id: "mammifère", count: 12 },
                { id: "poisson", count: 7 },
            ],
        },
        {
            label: "Catégorie de flore",
            preset: { collection: "flore", meta: "categorie" },
            options: [
                { id: "arbre", count: 16 },
                { id: "aquatique", count: 8 },
                { id: "fougère", count: 4 },
            ],
        },
        {
            label: "Renommée des châteaux",
            preset: { collection: "chateau", meta: "renommee" },
            options: [
                { id: "phare", count: 8 },
                { id: "majeur", count: 15 },
                { id: "notable", count: 24 },
            ],
        },
    ];
    const selectedPresetGroup = presetGroups[presetGroup];
    const [presetActive, setPresetActive] = useState(
        selectedPresetGroup.options[0].id,
    );

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

            <section className={styles.section} aria-labelledby="group-presets">
                <div className={styles.sectionHeader}>
                    <p className={styles.kicker}>Presets de métadonnées</p>
                    <h2 id="group-presets">
                        Valeurs, couleurs et LRZSymbol depuis les registres
                    </h2>
                    <p>
                        Un preset décrit la métadonnée ; chaque identifiant
                        d’option résout automatiquement son libellé, sa couleur
                        et son LRZSymbol.
                    </p>
                </div>
                <div className={styles.preview}>
                    <div className={styles.controls}>
                        <label>
                            Registre
                            <select
                                value={presetGroup}
                                onChange={(event) => {
                                    const next = Number(event.target.value);
                                    setPresetGroup(next);
                                    setPresetActive(
                                        presetGroups[next].options[0].id,
                                    );
                                }}
                            >
                                {presetGroups.map((group, index) => (
                                    <option key={group.label} value={index}>
                                        {group.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <LRZFilterGroup
                        label={selectedPresetGroup.label}
                        preset={selectedPresetGroup.preset}
                        options={selectedPresetGroup.options}
                        activeId={presetActive}
                        onSelect={setPresetActive}
                        variant="card"
                    />
                    <code className={styles.code}>{`<LRZFilterGroup
    label="${selectedPresetGroup.label}"
    preset={{ collection: "${selectedPresetGroup.preset.collection}", meta: "${selectedPresetGroup.preset.meta}" }}
    options={[{ id: "${selectedPresetGroup.options[0].id}" }]}
    activeId={activeId}
    onSelect={setActiveId}
/>`}</code>
                </div>
            </section>
        </>
    );
}
