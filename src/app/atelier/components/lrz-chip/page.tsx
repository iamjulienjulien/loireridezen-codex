import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import { LRZChip } from "@/components/LRZChip";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZChipPlayground from "./LRZChipPlayground";
import styles from "../filter-playground.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-chip");

export default function LRZChipPage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-chip" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZChip</h1>
                    <p className={styles.lede}>
                        La brique compacte générique du Codex : elle porte une
                        étiquette, un état ou un compteur sans imposer de métier
                        particulier.
                    </p>
                </header>

                <section
                    className={styles.section}
                    aria-labelledby="chip-overview"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="chip-overview">
                            Un même vocabulaire, plusieurs usages
                        </h2>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.row}>
                            <LRZChip>Neutre</LRZChip>
                            <LRZChip active count={8}>
                                Actif
                            </LRZChip>
                            <LRZChip variant="solid">Fort</LRZChip>
                            <LRZChip variant="quiet">Discret</LRZChip>
                            <LRZChip disabled>Indisponible</LRZChip>
                        </div>
                    </div>
                </section>

                <LRZChipPlayground />
            </div>
        </main>
    );
}
