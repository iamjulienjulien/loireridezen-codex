import { notFound } from "next/navigation";

import PageShell from "@/components/layout/PageShell";
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

const PERSONNAGES_PAGE = getContentPageDefinition("/personnages");

export const metadata = buildPageMetadata(PERSONNAGES_PAGE);

export default function PersonnagesPage() {
    if (!featureIsEnabled("personnages")) notFound();

    const catalogue = getCataloguePersonnages();
    const personnages = getPersonnages();

    return (
        <PageShell
            page={PERSONNAGES_PAGE}
            description={
                <>
                    <span>{PERSONNAGES_PAGE.description}</span>
                    <span className={styles.context}>
                        {catalogue.meta.nombrePersonnages} personnages ·{" "}
                        {catalogue.meta.nombreRelations} liens avec les châteaux
                    </span>
                </>
            }
        >
            <section className={styles.grid} aria-label="Personnages du Codex">
                {personnages.map((personnage) => (
                    <PersonnageCard
                        key={personnage.id}
                        personnage={personnage}
                        relations={getRelationsForPersonnage(personnage.id)}
                    />
                ))}
            </section>

            <p className={styles.note}>
                Cette annexe relie les personnages aux châteaux du Codex ; elle
                n’a pas vocation à remplacer leurs notices historiques
                détaillées.
            </p>
        </PageShell>
    );
}
