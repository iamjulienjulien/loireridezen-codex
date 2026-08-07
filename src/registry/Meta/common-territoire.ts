import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre de la métadonnée `territoire` commune aux collections.
 *
 * L’ordre suit le cours de la Loire, de l’amont vers l’Atlantique.
 */
export const COMMON_TERRITOIRE_REGISTRY = defineCollectionMetaRegistry({
    nivernais: {
        label: "Nivernais",
        color: "rose-sauvage",
    },
    orleanais: {
        label: "Orléanais",
        color: "bleu",
    },
    blaisois: {
        label: "Blaisois",
        color: "miel",
    },
    touraine: {
        label: "Touraine",
        color: "vert",
    },
    chinonais: {
        label: "Chinonais",
        color: "corail",
    },
    saumurois: {
        label: "Saumurois",
        color: "miel",
    },
    anjou: {
        label: "Anjou",
        color: "bleu-loire",
    },
    "bretagne-ligerienne": {
        label: "Bretagne ligérienne",
        color: "gris",
    },
});

export type CommonTerritoire = keyof typeof COMMON_TERRITOIRE_REGISTRY;

export type CommonTerritoireMeta =
    (typeof COMMON_TERRITOIRE_REGISTRY)[CommonTerritoire];

/** Liste ordonnée des territoires, utile pour les filtres et démonstrations. */
export const COMMON_TERRITOIRE_META = Object.freeze(
    Object.values(COMMON_TERRITOIRE_REGISTRY),
);

export function isCommonTerritoire(value: string): value is CommonTerritoire {
    return isCollectionMetaSlug(COMMON_TERRITOIRE_REGISTRY, value);
}

export function getCommonTerritoireMeta(
    slug: string,
): CommonTerritoireMeta | undefined {
    return getCollectionMeta(COMMON_TERRITOIRE_REGISTRY, slug);
}
