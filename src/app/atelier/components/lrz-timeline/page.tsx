import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZTimelinePlayground from "./LRZTimelinePlayground";
import styles from "../filter-playground.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-timeline");

export default function LRZTimelinePage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-timeline" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>Loire Ride Zen · Composants UI</p>
                    <h1 className={styles.title}>LRZTimeline</h1>
                    <p className={styles.lede}>
                        Une frise pour raconter les siècles, les lieux et les
                        transformations du paysage ligérien.
                    </p>
                </header>

                <LRZTimelinePlayground />

                <section className={styles.section} aria-labelledby="timeline-props">
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="timeline-props">Props</h2>
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
                                    <th scope="row"><code>items</code></th>
                                    <td><code>LRZTimelineItem[]</code></td>
                                    <td>Événements, dates, titres et contenus de la frise.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>variant</code></th>
                                    <td><code>line | cards | compact</code></td>
                                    <td>Trait éditorial, cartes ou lecture dense.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>orientation</code></th>
                                    <td><code>vertical | horizontal</code></td>
                                    <td>Déroulé principal de la frise.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>size</code></th>
                                    <td><code>sm | md | lg</code></td>
                                    <td>Densité typographique et espacements.</td>
                                </tr>
                                <tr>
                                    <th scope="row"><code>accent</code></th>
                                    <td><code>string</code></td>
                                    <td>Couleur CSS de la ligne et des repères.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
