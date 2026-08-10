import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `notoriete` de la collection Vignobles.
 */
export const VIGNOBLE_NOTORIETE_REGISTRY = defineCollectionMetaRegistry({
    phare: {
        label: "Phare",
        color: "soleil",
    },
    majeur: {
        label: "Majeur",
        color: "brique",
    },
    notable: {
        label: "Notable",
        color: "ocre",
    },
    confidentiel: {
        label: "Confidentiel",
        color: "pierre",
    },
});

export type VignobleNotoriete = keyof typeof VIGNOBLE_NOTORIETE_REGISTRY;

export type VignobleNotorieteMeta =
    (typeof VIGNOBLE_NOTORIETE_REGISTRY)[VignobleNotoriete];

/** Liste ordonnée des niveaux de notoriété, utile pour les filtres. */
export const VIGNOBLE_NOTORIETE_META = Object.freeze(
    Object.values(VIGNOBLE_NOTORIETE_REGISTRY),
);

export function isVignobleNotoriete(value: string): value is VignobleNotoriete {
    return isCollectionMetaSlug(VIGNOBLE_NOTORIETE_REGISTRY, value);
}

export function getVignobleNotorieteMeta(
    slug: string,
): VignobleNotorieteMeta | undefined {
    return getCollectionMeta(VIGNOBLE_NOTORIETE_REGISTRY, slug);
}
