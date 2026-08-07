import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import { LRZTextClamp } from "@/components/LRZTextClamp";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import styles from "../filter-playground.module.css";
import localStyles from "./lrz-text-clamp.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-text-clamp");

const EXAMPLE_CODE = `<LRZTextClamp
    as="h3"
    lines={2}
    fixedHeight
>
    {animal.nomCommun}
</LRZTextClamp>`;

export default function LRZTextClampPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-text-clamp" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZTextClamp</h1>
                    <p className={styles.lede}>
                        Un texte limité à un nombre précis de lignes, avec une
                        hauteur stable et une infobulle affichée uniquement
                        lorsqu’une partie du contenu est masquée.
                    </p>
                </header>

                <section
                    className={styles.section}
                    aria-labelledby="text-clamp-preview"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Aperçu</p>
                        <h2 id="text-clamp-preview">
                            Des cartes alignées, même avec des noms très longs
                        </h2>
                        <p>
                            Survolez ou placez le focus sur un titre tronqué :
                            son texte complet apparaît automatiquement.
                        </p>
                    </div>
                    <div className={localStyles.previewGrid}>
                        <article className={localStyles.sample}>
                            <span className={localStyles.label}>Une ligne</span>
                            <LRZTextClamp
                                as="h3"
                                lines={1}
                                fixedHeight
                                font="display"
                                size="xl"
                                color="primary"
                            >
                                Martin-pêcheur d’Europe
                            </LRZTextClamp>
                        </article>
                        <article className={localStyles.sample}>
                            <span className={localStyles.label}>
                                Deux lignes fixes
                            </span>
                            <LRZTextClamp
                                as="h3"
                                lines={2}
                                fixedHeight
                                font="display"
                                size="xl"
                                color="primary"
                            >
                                Grand rhinolophe des vallées ligériennes
                            </LRZTextClamp>
                        </article>
                        <article className={localStyles.sample}>
                            <span className={localStyles.label}>
                                Sans débordement
                            </span>
                            <LRZTextClamp
                                as="h3"
                                lines={2}
                                fixedHeight
                                font="display"
                                size="xl"
                                color="primary"
                            >
                                Héron cendré
                            </LRZTextClamp>
                        </article>
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="text-clamp-api"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>API</p>
                        <h2 id="text-clamp-api">
                            Limitation, stabilité et personnalisation
                        </h2>
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
                                    <th scope="row">
                                        <code>lines</code>
                                    </th>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>1</code>
                                    </td>
                                    <td>Nombre maximal de lignes visibles.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>fixedHeight</code>
                                    </th>
                                    <td>
                                        <code>boolean</code>
                                    </td>
                                    <td>
                                        <code>false</code>
                                    </td>
                                    <td>
                                        Réserve la hauteur exacte des lignes,
                                        même pour un texte court.
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>tooltip</code>
                                    </th>
                                    <td>
                                        <code>boolean</code>
                                    </td>
                                    <td>
                                        <code>true</code>
                                    </td>
                                    <td>
                                        Affiche le texte complet en cas de
                                        troncature uniquement.
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>as</code>
                                    </th>
                                    <td>
                                        <code>h1…h6 | p | span | div…</code>
                                    </td>
                                    <td>
                                        <code>span</code>
                                    </td>
                                    <td>Conserve la sémantique du contenu.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>font / size / weight</code>
                                    </th>
                                    <td>Valeurs typographiques LRZ</td>
                                    <td>Héritées</td>
                                    <td>Personnalise directement le texte.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>tooltipSide</code>
                                    </th>
                                    <td>
                                        <code>top | right | bottom | left</code>
                                    </td>
                                    <td>
                                        <code>top</code>
                                    </td>
                                    <td>Positionne le texte complet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="text-clamp-code"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Syntaxe</p>
                        <h2 id="text-clamp-code">
                            Deux lignes constantes dans une carte
                        </h2>
                    </div>
                    <pre className={styles.code}>{EXAMPLE_CODE}</pre>
                </section>
            </div>
        </>
    );
}
