import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `appellation` de la collection Vignobles.
 */
export const VIGNOBLE_APPELLATION_REGISTRY = defineCollectionMetaRegistry({
    "AOC communale": {
        label: "AOC communale",
        color: "lie-de-vin",
    },
    "AOC régionale": {
        label: "AOC régionale",
        color: "miel",
    },
    IGP: {
        label: "IGP",
        color: "vert-sauge",
    },
});

export type VignobleAOC = keyof typeof VIGNOBLE_APPELLATION_REGISTRY;

export type VignobleAOCMeta =
    (typeof VIGNOBLE_APPELLATION_REGISTRY)[VignobleAOC];

/** Liste ordonnée des appellations, utile pour les filtres. */
export const VIGNOBLE_APPELLATION_META = Object.freeze(
    Object.values(VIGNOBLE_APPELLATION_REGISTRY),
);

export function isVignobleAOC(value: string): value is VignobleAOC {
    return isCollectionMetaSlug(VIGNOBLE_APPELLATION_REGISTRY, value);
}

export function getVignobleAOCMeta(slug: string): VignobleAOCMeta | undefined {
    return getCollectionMeta(VIGNOBLE_APPELLATION_REGISTRY, slug);
}
