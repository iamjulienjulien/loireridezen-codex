import {
    CATEGORIES_PERSONNAGES,
    type CategoriePersonnageSlug,
} from "@/registry/categories-personnages";
import {
    getCollectionMeta,
    isCollectionMetaSlug,
    type CollectionMetaDefinition,
} from "@/registry/Meta/registry";

/**
 * Liste ordonnée de la métadonnée `categorie` de la collection Personnage.
 *
 * Les libellés et couleurs restent dérivés du registre éditorial complet afin
 * de ne pas introduire une seconde source de vérité.
 */
export const PERSONNAGE_CATEGORIE_META = Object.freeze(
    CATEGORIES_PERSONNAGES.map(
        ({ slug, nom, identite }): CollectionMetaDefinition<typeof slug> => ({
            slug,
            label: nom,
            color: identite.color,
        }),
    ),
);

export type PersonnageCategorieSlug = CategoriePersonnageSlug;

export type PersonnageCategorieMeta =
    (typeof PERSONNAGE_CATEGORIE_META)[number];

/** Registre indexé par slug pour les composants et les symboles. */
export const PERSONNAGE_CATEGORIE_REGISTRY = Object.fromEntries(
    PERSONNAGE_CATEGORIE_META.map((definition) => [
        definition.slug,
        definition,
    ]),
) as {
    readonly [
        TSlug in PersonnageCategorieSlug
    ]: CollectionMetaDefinition<TSlug>;
};

export function isPersonnageCategorieSlug(
    value: string,
): value is PersonnageCategorieSlug {
    return isCollectionMetaSlug(PERSONNAGE_CATEGORIE_REGISTRY, value);
}

export function getPersonnageCategorieMeta(
    slug: string,
): PersonnageCategorieMeta | undefined {
    return getCollectionMeta(PERSONNAGE_CATEGORIE_REGISTRY, slug);
}
