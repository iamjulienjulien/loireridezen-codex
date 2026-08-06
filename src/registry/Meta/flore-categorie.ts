import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `categorie` de la collection Flore.
 */
export const FLORE_CATEGORIE_REGISTRY = defineCollectionMetaRegistry({
    arbre: {
        label: "Arbre",
        color: "vert-olive",
    },
    arbuste: {
        label: "Arbuste",
        color: "vert-sauge",
    },
    herbacée: {
        label: "Herbacée",
        color: "miel",
    },
    graminée: {
        label: "Graminée",
        color: "ocre",
    },
    aquatique: {
        label: "Aquatique",
        color: "bleu-loire",
    },
    fougère: {
        label: "Fougère",
        color: "vert",
    },
    grimpante: {
        label: "Grimpante",
        color: "vert-roseau",
    },
});

export type FloreCategorie = keyof typeof FLORE_CATEGORIE_REGISTRY;

export type FloreCategorieMeta =
    (typeof FLORE_CATEGORIE_REGISTRY)[FloreCategorie];

/** Liste ordonnée des catégories, utile pour les filtres et démonstrations. */
export const FLORE_CATEGORIE_META = Object.freeze(
    Object.values(FLORE_CATEGORIE_REGISTRY),
);

export function isFloreCategorie(value: string): value is FloreCategorie {
    return isCollectionMetaSlug(FLORE_CATEGORIE_REGISTRY, value);
}

export function getFloreCategorieMeta(
    slug: string,
): FloreCategorieMeta | undefined {
    return getCollectionMeta(FLORE_CATEGORIE_REGISTRY, slug);
}
