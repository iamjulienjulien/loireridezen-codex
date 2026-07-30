import type { Metadata } from "next";
import Link from "next/link";

import { LRZTooltip } from "@/components/LRZTooltip";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import styles from "../filter-playground.module.css";
import localStyles from "./lrz-tooltip.module.css";

export const metadata: Metadata = {
    title: "LRZTooltip — Atelier du Codex ligérien",
    description:
        "Infobulle accessible et positionnable du système UI Loire Ride Zen.",
};

const EXAMPLE_CODE = `<LRZTooltip content="Ouvrir la fiche du château">
    <button type="button">Chambord</button>
</LRZTooltip>`;

export default function LRZTooltipPage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-tooltip" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZTooltip</h1>
                    <p className={styles.lede}>
                        Une infobulle discrète pour préciser une action, un
                        repère ou une information courte sans alourdir
                        l’interface.
                    </p>
                </header>

                <section className={styles.section} aria-labelledby="tooltip-preview">
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Aperçu</p>
                        <h2 id="tooltip-preview">Quatre directions pour un même geste</h2>
                        <p>
                            Le tooltip apparaît au survol et au focus clavier. Les
                            boutons restent de vrais éléments interactifs.
                        </p>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.row}>
                            <LRZTooltip
                                content="Le château posé sur le Cher"
                                side="top"
                            >
                                <button className={localStyles.trigger} type="button">
                                    Haut
                                </button>
                            </LRZTooltip>
                            <LRZTooltip
                                content="La forteresse des rois"
                                side="right"
                            >
                                <button className={localStyles.trigger} type="button">
                                    Droite
                                </button>
                            </LRZTooltip>
                            <LRZTooltip
                                content="Un jardin devenu architecture"
                                side="bottom"
                            >
                                <button className={localStyles.trigger} type="button">
                                    Bas
                                </button>
                            </LRZTooltip>
                            <LRZTooltip
                                content="Le fil royal et ses demeures"
                                side="left"
                            >
                                <button className={localStyles.trigger} type="button">
                                    Gauche
                                </button>
                            </LRZTooltip>
                            <LRZTooltip
                                content="Le tooltip reste ouvert jusqu’au clic extérieur"
                                trigger="click"
                            >
                                <button className={localStyles.trigger} type="button">
                                    Clic
                                </button>
                            </LRZTooltip>
                        </div>
                    </div>
                </section>

                <section className={styles.section} aria-labelledby="tooltip-api">
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>API</p>
                        <h2 id="tooltip-api">Une API courte, pensée pour les repères</h2>
                    </div>
                    <div className={styles.tableScroll}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Défaut</th>
                                    <th>Usage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"><code>content</code></th>
                                    <td><code>ReactNode</code></td>
                                    <td>—</td>
                                    <td>Contenu de l’infobulle.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>side</code></th>
                                    <td><code>top | right | bottom | left</code></td>
                                    <td><code>top</code></td>
                                    <td>Position autour du déclencheur.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>align</code></th>
                                    <td><code>start | center | end</code></td>
                                    <td><code>center</code></td>
                                    <td>Alignement sur l’axe secondaire.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>trigger</code></th>
                                    <td><code>hover | click | open</code></td>
                                    <td><code>hover</code></td>
                                    <td>Interaction qui ouvre l’infobulle.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>delay</code></th>
                                    <td><code>number</code></td>
                                    <td><code>120</code></td>
                                    <td>Délai d’apparition en millisecondes.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>disabled</code></th>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Conserve le déclencheur sans afficher l’infobulle.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={styles.section} aria-labelledby="tooltip-code">
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Syntaxe</p>
                        <h2 id="tooltip-code">Un déclencheur accessible</h2>
                    </div>
                    <pre className={styles.code}>{EXAMPLE_CODE}</pre>
                </section>
            </div>
        </main>
    );
}
