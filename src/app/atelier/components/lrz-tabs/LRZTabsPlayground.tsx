"use client";

import { useState } from "react";

import {
    LRZTabs,
    type LRZTabsSize,
    type LRZTabsVariant,
} from "@/components/LRZTabs";

import styles from "../filter-playground.module.css";

const TABS = [
    { id: "chateaux", label: "Châteaux", count: 52 },
    { id: "faune", label: "Faune", count: 18 },
    { id: "flore", label: "Flore", count: 27 },
    { id: "archives", label: "Archives", disabled: true },
] as const;

export default function LRZTabsPlayground() {
    const [activeId, setActiveId] = useState("chateaux");
    const [variant, setVariant] = useState<LRZTabsVariant>("line");
    const [size, setSize] = useState<LRZTabsSize>("md");
    const [withPanels, setWithPanels] = useState(true);

    const tabs = TABS.map((tab) => ({
        ...tab,
        panel: withPanels ? (
            <p>
                La section <strong>{tab.label}</strong> rassemble les repères du
                Codex associés à cette entrée.
            </p>
        ) : undefined,
    }));

    return (
        <section className={styles.section} aria-labelledby="tabs-playground">
            <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Bac à sable interactif</p>
                <h2 id="tabs-playground">Une navigation éditoriale</h2>
                <p>
                    Teste les variantes, la taille et le rendu avec ou sans
                    panneau de contenu.
                </p>
            </div>
            <div className={styles.preview}>
                <div className={styles.row}>
                    <label>
                        Variante{" "}
                        <select
                            value={variant}
                            onChange={(event) =>
                                setVariant(event.target.value as LRZTabsVariant)
                            }
                        >
                            <option value="line">line</option>
                            <option value="pill">pill</option>
                            <option value="vintage">vintage</option>
                        </select>
                    </label>
                    <label>
                        Taille{" "}
                        <select
                            value={size}
                            onChange={(event) =>
                                setSize(event.target.value as LRZTabsSize)
                            }
                        >
                            <option value="sm">sm</option>
                            <option value="md">md</option>
                            <option value="lg">lg</option>
                        </select>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={withPanels}
                            onChange={(event) =>
                                setWithPanels(event.target.checked)
                            }
                        />{" "}
                        Panneau
                    </label>
                </div>
                <LRZTabs
                    tabs={tabs}
                    activeId={activeId}
                    onActiveChange={setActiveId}
                    variant={variant}
                    size={size}
                    accent="var(--gold)"
                    ariaLabel="Exemple de navigation"
                />
                <pre className={styles.code}>{`<LRZTabs
    tabs={tabs}
    activeId="${activeId}"
    variant="${variant}"
    size="${size}"
/>`}</pre>
            </div>
        </section>
    );
}
