import { notFound } from "next/navigation";

import PageFooter from "@/components/PageFooter";
import { PersonnageCard } from "@/components/personnages";
import {
    getCataloguePersonnages,
    getPersonnages,
    getRelationsForPersonnage,
} from "@/lib/personnages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getContentPageDefinition } from "@/registry/pages";

import styles from "./page.module.css";

export const metadata = buildPageMetadata(
    getContentPageDefinition("/personnages"),
);

export default function PersonnagesPage() {
    if (!featureIsEnabled("personnages")) notFound();

    const catalogue = getCataloguePersonnages();
    const personnages = getPersonnages();

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <section className={styles.hero} aria-labelledby="page-title">
                    <p className={styles.eyebrow}>Annexe du Codex</p>
                    <h1 id="page-title" className={styles.title}>
                        Personnages de la Loire
                    </h1>
                    <p className={styles.description}>
                        Souverains, bâtisseurs, écrivains, mécènes et figures
                        singulières : celles et ceux dont les vies ont laissé
                        leur empreinte sur les châteaux ligériens.
                    </p>
                    <p className={styles.context}>
                        {catalogue.meta.nombrePersonnages} personnages ·{" "}
                        {catalogue.meta.nombreRelations} liens avec les châteaux
                    </p>
                </section>

                <section
                    className={styles.grid}
                    aria-label="Personnages du Codex"
                >
                    {personnages.map((personnage) => (
                        <PersonnageCard
                            key={personnage.id}
                            personnage={personnage}
                            relations={getRelationsForPersonnage(personnage.id)}
                        />
                    ))}
                </section>

                <p className={styles.note}>
                    Cette annexe relie les personnages aux châteaux du Codex ;
                    elle n’a pas vocation à remplacer leurs notices historiques
                    détaillées.
                </p>

                <PageFooter color="ocre"></PageFooter>
            </div>
        </main>
    );
}
