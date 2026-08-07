import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `rarete` de la collection Flore.
 */
export const FLORE_RARETE_REGISTRY = defineCollectionMetaRegistry({
    commun: {
        label: "Commun",
        color: "gris-brun",
    },
    régulier: {
        label: "Régulier",
        color: "bleu-gris",
    },
    rare: {
        label: "Rare",
        color: "ocre",
    },
    trésor: {
        label: "Trésor",
        color: "soleil",
    },
});

export type FloreRarete = keyof typeof FLORE_RARETE_REGISTRY;

export type FloreRareteMeta = (typeof FLORE_RARETE_REGISTRY)[FloreRarete];

/** Liste ordonnée des raretés, utile pour les filtres et démonstrations. */
export const FLORE_RARETE_META = Object.freeze(
    Object.values(FLORE_RARETE_REGISTRY),
);

export function isFloreRarete(value: string): value is FloreRarete {
    return isCollectionMetaSlug(FLORE_RARETE_REGISTRY, value);
}

export function getFloreRareteMeta(slug: string): FloreRareteMeta | undefined {
    return getCollectionMeta(FLORE_RARETE_REGISTRY, slug);
}
