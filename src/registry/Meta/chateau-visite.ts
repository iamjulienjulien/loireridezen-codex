import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `visite` de la collection Châteaux.
 */
export const CHATEAU_VISITE_REGISTRY = defineCollectionMetaRegistry({
    "ouvert au public": {
        label: "Ouvert",
        color: "prairie",
    },
    "extérieurs & parc": {
        label: "Extérieurs & parc",
        color: "vert-metallise",
    },
    "privé, non visitable": {
        label: "Privé",
        color: "brique",
    },
    inconnu: {
        label: "Inconnu",
        color: "galet",
    },
});

export type ChateauVisite = keyof typeof CHATEAU_VISITE_REGISTRY;

export type ChateauVisiteMeta = (typeof CHATEAU_VISITE_REGISTRY)[ChateauVisite];

/** Liste ordonnée des conditions de visite, utile pour les filtres. */
export const CHATEAU_VISITE_META = Object.freeze(
    Object.values(CHATEAU_VISITE_REGISTRY),
);

export function isChateauVisite(value: string): value is ChateauVisite {
    return isCollectionMetaSlug(CHATEAU_VISITE_REGISTRY, value);
}

export function getChateauVisiteMeta(
    slug: string,
): ChateauVisiteMeta | undefined {
    return getCollectionMeta(CHATEAU_VISITE_REGISTRY, slug);
}
