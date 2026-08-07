import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZTabsPlayground from "./LRZTabsPlayground";
import styles from "../filter-playground.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-tabs");

export default function LRZTabsPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-tabs" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>Loire Ride Zen · Composants UI</p>
                    <h1 className={styles.title}>LRZTabs</h1>
                    <p className={styles.lede}>
                        Une navigation d’onglets accessible pour changer de
                        territoire, de collection ou de registre éditorial.
                    </p>
                </header>

                <LRZTabsPlayground />

                <section className={styles.section} aria-labelledby="tabs-props">
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="tabs-props">Props</h2>
                    </div>
                    <div className={styles.tableScroll}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Prop</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Rôle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"><code>tabs</code></th>
                                    <td><code>LRZTab[]</code></td>
                                    <td>Onglets, compteurs, états et panneaux optionnels.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>activeId</code></th>
                                    <td><code>string</code></td>
                                    <td>Identifiant actif en mode contrôlé.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>defaultActiveId</code></th>
                                    <td><code>string</code></td>
                                    <td>Identifiant initial en mode autonome.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>variant</code></th>
                                    <td><code>line | pill | vintage</code></td>
                                    <td>Trait, pastille ou composition éditoriale.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>size</code></th>
                                    <td><code>sm | md | lg</code></td>
                                    <td>Densité de l’interface.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>onActiveChange</code></th>
                                    <td><code>(id: string) =&gt; void</code></td>
                                    <td>Réagit au changement d’onglet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}
