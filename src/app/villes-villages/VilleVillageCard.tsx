import type { CSSProperties } from "react";
import { MapPin, Waves } from "lucide-react";

import LRZCard from "@/components/LRZCard";
import { getTerritoire } from "@/registry/territoires";
import type {
    VilleVillageCatalogueEntry,
    VilleVillageCatalogueRelationFleuve,
} from "@/types/villeVillageCatalogue";

import styles from "./VilleVillageCard.module.css";

type VilleVillageCardProps = {
    villeVillage: VilleVillageCatalogueEntry;
};

type VilleVillageCardStyle = CSSProperties & {
    "--ville-accent": string;
};

const RELATION_LABELS: Record<VilleVillageCatalogueRelationFleuve, string> = {
    "sur-la-loire": "sur la Loire",
    "sur-un-affluent": "sur un affluent",
    confluence: "à la confluence",
    estuaire: "dans l’estuaire",
};

export default function VilleVillageCard({
    villeVillage,
}: VilleVillageCardProps) {
    const { administration, geographie, identite } = villeVillage;
    const territoire = getTerritoire(geographie.territoire);
    const titleId = `ville-village-${villeVillage.slug}-title`;
    const administrativeLabel = administration.communeDeleguee
        ? `${administration.communeDeleguee}, ${administration.communeActuelle}`
        : administration.departement.nom;

    return (
        <LRZCard
            id={`ville-village-${villeVillage.slug}`}
            className={styles.card}
            color={identite.color}
            customColor={identite.accent}
            accent="start"
            equalHeight
            ariaLabelledby={titleId}
            style={
                {
                    "--ville-accent": identite.accent,
                } as VilleVillageCardStyle
            }
        >
            <div className={styles.content}>
                <div className={styles.sequence}>
                    <span>{villeVillage.nature}</span>
                    <span>{administration.departement.code}</span>
                </div>

                <div className={styles.identity}>
                    <div className={styles.mark} aria-hidden="true">
                        {identite.mark}
                    </div>
                    <div className={styles.heading}>
                        <p className={styles.territory}>
                            {territoire?.nom ?? geographie.territoire}
                        </p>
                        <h3 id={titleId} className={styles.name}>
                            {villeVillage.nom}
                        </h3>
                        <p className={styles.subtitle}>
                            {villeVillage.sousTitre}
                        </p>
                    </div>
                </div>

                <p className={styles.summary}>{villeVillage.description}</p>

                <div className={styles.river}>
                    <Waves aria-hidden="true" />
                    <span>{geographie.coursEauPrincipal}</span>
                    <span className={styles.riverLine} aria-hidden="true" />
                    <strong>
                        {RELATION_LABELS[geographie.relationFleuve]}
                    </strong>
                </div>

                <dl className={styles.details}>
                    <div>
                        <dt>
                            <MapPin aria-hidden="true" />
                            Repères
                        </dt>
                        <dd>{villeVillage.reperes.slice(0, 3).join(" · ")}</dd>
                    </div>
                    <div>
                        <dt>Commune</dt>
                        <dd>{administrativeLabel}</dd>
                    </div>
                </dl>

                {villeVillage.autresNoms.length > 0 ? (
                    <p className={styles.aliases}>
                        <span>Autres noms</span>
                        {villeVillage.autresNoms.join(" · ")}
                    </p>
                ) : null}

                <ul
                    className={styles.symbols}
                    aria-label={`Symboles de ${villeVillage.nom}`}
                >
                    {identite.symboles.slice(0, 3).map((symbole) => (
                        <li key={symbole}>{symbole}</li>
                    ))}
                </ul>
            </div>
        </LRZCard>
    );
}
