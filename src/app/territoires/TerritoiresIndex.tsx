import IndexPresentation from "@/components/IndexPresentation";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import TerritoireCard from "./TerritoireCard";
import styles from "./territoires.module.css";

type TerritoiresIndexProps = {
    territoires: readonly TerritoireCatalogueEntry[];
    indexes: readonly IndexEntry[];
};

export default function TerritoiresIndex({
    territoires,
    indexes,
}: TerritoiresIndexProps) {
    const entry = getIndex("/territoires")!;

    return (
        <>
            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/territoires"
                indexes={indexes}
            >
                {entry.presentation_md}
            </IndexPresentation>

            <section
                className={styles.catalogue}
                aria-labelledby="territoires-catalogue-title"
            >
                <header className={styles.catalogueHeader}>
                    <p className={styles.eyebrow}>D’amont en aval</p>
                    <h2
                        id="territoires-catalogue-title"
                        className={styles.title}
                    >
                        Huit chapitres pour suivre le fleuve
                    </h2>
                    <p className={styles.description}>
                        Des terres nivernaises à l’estuaire, chaque territoire
                        forme un chapitre géographique, historique et sensible
                        du voyage ligérien.
                    </p>
                </header>

                <ol className={styles.grid}>
                    {territoires.map((territoire) => (
                        <li className={styles.item} key={territoire.slug}>
                            <TerritoireCard territoire={territoire} />
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}
