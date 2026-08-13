import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import { LRZFilterChip } from "@/components/_ui/LRZFilterChip";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import LRZFilterChipPlayground from "./LRZFilterChipPlayground";
import styles from "../filter-playground.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-filter-chip",
);

const VARIANTS = [
    { name: "Default", variant: "default" as const },
    { name: "Solid", variant: "solid" as const },
    { name: "Quiet", variant: "quiet" as const },
];

export default function LRZFilterChipPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-filter-chip" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZFilterChip</h1>
                    <p className={styles.lede}>
                        L’unité de sélection des index : un bouton compact,
                        lisible et capable d’afficher le nombre de résultats
                        associés.
                    </p>
                </header>

                <section
                    className={styles.section}
                    aria-labelledby="chip-overview"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Anatomie</p>
                        <h2 id="chip-overview">Le filtre en un coup d’œil</h2>
                        <p>
                            Le texte reste prioritaire, tandis que le compteur
                            apporte une information secondaire sans devenir une
                            seconde action.
                        </p>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.row}>
                            <LRZFilterChip>Tout</LRZFilterChip>
                            <LRZFilterChip active count={29}>
                                Renaissance
                            </LRZFilterChip>
                            <LRZFilterChip disabled>Indisponible</LRZFilterChip>
                        </div>
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="chip-variants"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="chip-variants">
                            Une même grammaire, trois intensités
                        </h2>
                        <p>
                            La variante par défaut est recommandée pour les
                            index. Les deux autres servent à hiérarchiser des
                            usages particuliers.
                        </p>
                    </div>
                    <div className={styles.grid}>
                        {VARIANTS.map(({ name, variant }) => (
                            <article className={styles.example} key={variant}>
                                <h3 className={styles.exampleTitle}>{name}</h3>
                                <p className={styles.exampleDescription}>
                                    {variant === "default"
                                        ? "Le choix standard pour les filtres principaux."
                                        : variant === "solid"
                                          ? "Une sélection plus affirmée."
                                          : "Une présence discrète dans un contexte dense."}
                                </p>
                                <div className={styles.row}>
                                    <LRZFilterChip variant={variant} count={16}>
                                        Majeur
                                    </LRZFilterChip>
                                    <LRZFilterChip
                                        variant={variant}
                                        active
                                        count={8}
                                    >
                                        Phare
                                    </LRZFilterChip>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <LRZFilterChipPlayground />

                <section
                    className={styles.section}
                    aria-labelledby="chip-props"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="chip-props">Props</h2>
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
                                        <code>active</code>
                                    </th>
                                    <td>
                                        <code>boolean</code>
                                    </td>
                                    <td>État sélectionné du filtre.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>count</code>
                                    </th>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>Nombre de résultats associés.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>preset</code>
                                    </th>
                                    <td>
                                        <code>LRZFilterPreset</code>
                                    </td>
                                    <td>
                                        Résout automatiquement le libellé, la
                                        couleur et le LRZSymbol de la valeur.
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>variant</code>
                                    </th>
                                    <td>
                                        <code>default | solid | quiet</code>
                                    </td>
                                    <td>Intensité visuelle du chip.</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <code>onClick</code>
                                    </th>
                                    <td>
                                        <code>() =&gt; void</code>
                                    </td>
                                    <td>
                                        Action de sélection fournie par le
                                        parent.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}
