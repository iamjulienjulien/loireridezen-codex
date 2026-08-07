import IndexPresentation from "@/components/IndexPresentation";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import type { VilleVillageCatalogueEntry } from "@/types/villeVillageCatalogue";

import VilleVillageCard from "./VilleVillageCard";
import styles from "./villes-villages.module.css";

type VillesVillagesIndexProps = {
    villesVillages: readonly VilleVillageCatalogueEntry[];
    indexes: readonly IndexEntry[];
};

export default function VillesVillagesIndex({
    villesVillages,
    indexes,
}: VillesVillagesIndexProps) {
    const entry = getIndex("/villes-villages")!;
    const natureCounts = villesVillages.reduce(
        (counts, villeVillage) => {
            counts[villeVillage.nature] += 1;
            return counts;
        },
        { ville: 0, bourg: 0, village: 0 },
    );
    const territoryCount = new Set(
        villesVillages.map(({ geographie }) => geographie.territoire),
    ).size;

    return (
        <>
            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/villes-villages"
                indexes={indexes}
            >
                {entry.presentation_md}
            </IndexPresentation>

            <dl className={styles.overview} aria-label="Repères du catalogue">
                <div>
                    <dt>Villes</dt>
                    <dd>{natureCounts.ville}</dd>
                </div>
                <div>
                    <dt>Bourgs</dt>
                    <dd>{natureCounts.bourg}</dd>
                </div>
                <div>
                    <dt>Villages</dt>
                    <dd>{natureCounts.village}</dd>
                </div>
                <div>
                    <dt>Territoires</dt>
                    <dd>{territoryCount}</dd>
                </div>
            </dl>

            <section
                className={styles.catalogue}
                aria-labelledby="villes-villages-catalogue-title"
            >
                <header className={styles.catalogueHeader}>
                    <p className={styles.eyebrow}>Répertoire alphabétique</p>
                    <h2
                        id="villes-villages-catalogue-title"
                        className={styles.title}
                    >
                        Les lieux habités du fil ligérien
                    </h2>
                    <p className={styles.description}>
                        Des grandes cités aux villages de coteau, chaque étape
                        révèle sa propre manière de vivre avec la Loire et ses
                        affluents.
                    </p>
                </header>

                <ol className={styles.grid}>
                    {villesVillages.map((villeVillage) => (
                        <li className={styles.item} key={villeVillage.slug}>
                            <VilleVillageCard villeVillage={villeVillage} />
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}
