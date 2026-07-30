import type { CSSProperties } from "react";

import { LRZTooltip } from "@/components/LRZTooltip";
import { getCategoriePersonnage } from "@/registry/categories-personnages";
import type { Personnage, RelationPersonnageLieu } from "@/types/personnage";

import styles from "./PersonnageCard.module.css";

export type PersonnageCardProps = {
    personnage: Personnage;
    relations: readonly RelationPersonnageLieu[];
};

export default function PersonnageCard({
    personnage,
    relations,
}: PersonnageCardProps) {
    const lieuCount = new Set(relations.map((relation) => relation.lieuId))
        .size;
    const categorie = getCategoriePersonnage(personnage.categoriePrincipale);
    const alias = personnage.autresNoms.find(
        (name) =>
            name.trim().length > 0 &&
            name.localeCompare(personnage.nom, "fr", {
                sensitivity: "base",
            }) !== 0,
    );

    return (
        <article
            className={styles.card}
            style={
                {
                    "--category-accent": categorie?.identite.accent,
                } as CSSProperties
            }
        >
            <p className={styles.category}>
                <span className={styles.categoryMark} aria-hidden="true">
                    {categorie?.identite.mark}
                </span>
                {categorie?.nom ?? personnage.categoriePrincipale}
            </p>

            <h2 className={styles.name}>{personnage.nom}</h2>

            {alias ? (
                <p className={styles.alias}>
                    <span>Aussi connu·e sous le nom de</span> {alias}
                </p>
            ) : null}

            {personnage.roles.length > 0 ? (
                <ul
                    className={styles.roles}
                    aria-label={`Rôles de ${personnage.nom}`}
                >
                    {personnage.roles.slice(0, 2).map((role) => (
                        <li key={role}>{role}</li>
                    ))}
                </ul>
            ) : null}

            <div className={styles.countWrap}>
                <LRZTooltip
                    content={
                        <RelationTooltip
                            accent={categorie?.identite.accent}
                            relations={relations}
                        />
                    }
                    side="bottom"
                    align="center"
                    portal
                >
                    <span
                        className={styles.count}
                        tabIndex={0}
                        aria-label={`Voir les relations de ${personnage.nom} avec les châteaux`}
                    >
                        {formatLieuCount(lieuCount)}
                    </span>
                </LRZTooltip>
            </div>
        </article>
    );
}

function RelationTooltip({
    accent,
    relations,
}: {
    accent?: string;
    relations: readonly RelationPersonnageLieu[];
}) {
    return (
        <div
            className={styles.relationTooltip}
            style={{ "--category-accent": accent } as CSSProperties}
        >
            <p className={styles.relationTooltipTitle}>
                Relations avec les châteaux
            </p>
            {relations.length > 0 ? (
                <ul className={styles.relationList}>
                    {relations.map((relation) => (
                        <li key={`${relation.personnageId}-${relation.lieuId}`}>
                            <strong>{relation.lieuNom}</strong>
                            <span>
                                {relation.libelle} · {relation.periodeAffichee}
                            </span>
                            <small>{relation.description}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.relationEmpty}>
                    Aucun lien détaillé dans le catalogue.
                </p>
            )}
        </div>
    );
}

function formatLieuCount(count: number): string {
    if (count === 0) return "Aucun château relié";
    if (count === 1) return "Relié à 1 château";
    return `Relié à ${count} châteaux`;
}
