import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `rarete` de la collection Faune.
 */
export const FAUNE_RARETE_REGISTRY = defineCollectionMetaRegistry({
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

export type FauneRarete = keyof typeof FAUNE_RARETE_REGISTRY;

export type FauneRareteMeta = (typeof FAUNE_RARETE_REGISTRY)[FauneRarete];

/** Liste ordonnée des raretés, utile pour les filtres et démonstrations. */
export const FAUNE_RARETE_META = Object.freeze(
    Object.values(FAUNE_RARETE_REGISTRY),
);

export function isFauneRarete(value: string): value is FauneRarete {
    return isCollectionMetaSlug(FAUNE_RARETE_REGISTRY, value);
}

export function getFauneRareteMeta(slug: string): FauneRareteMeta | undefined {
    return getCollectionMeta(FAUNE_RARETE_REGISTRY, slug);
}
