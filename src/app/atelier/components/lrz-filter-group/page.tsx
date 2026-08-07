import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZFilterGroupShowcase from "./LRZFilterGroupShowcase";
import styles from "../filter-playground.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-filter-group");

export default function LRZFilterGroupPage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-filter-group" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZFilterGroup</h1>
                    <p className={styles.lede}>
                        Le cadre sémantique qui rassemble des choix exclusifs et
                        rend visible la sélection active d’un index.
                    </p>
                </header>

                <LRZFilterGroupShowcase />

                <section
                    className={styles.section}
                    aria-labelledby="group-props"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="group-props">Props</h2>
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
                                    <th scope="row">
                                        <code>label</code>
                                    </th>
                                    <td>
                                        <code>ReactNode</code>
                                    </td>
                                    <td>Nom du critère de filtrage.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>options</code>
                                    </th>
                                    <td>
                                        <code>Option[]</code>
                                    </td>
                                    <td>Choix et compteurs disponibles.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>activeId</code>
                                    </th>
                                    <td>
                                        <code>string</code>
                                    </td>
                                    <td>Identifiant du choix actif.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>variant</code>
                                    </th>
                                    <td>
                                        <code>default | card | inline</code>
                                    </td>
                                    <td>Composition visuelle du groupe.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
