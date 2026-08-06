import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `type` de la collection Faune.
 */
export const FAUNE_TYPE_REGISTRY = defineCollectionMetaRegistry({
    oiseau: {
        label: "Oiseau",
        color: "bleu",
    },
    mammifère: {
        label: "Mammifère",
        color: "orange-cuivre",
    },
    poisson: {
        label: "Poisson",
        color: "bleu-turquoise",
    },
    reptile: {
        label: "Reptile",
        color: "vert-roseau",
    },
    amphibien: {
        label: "Amphibien",
        color: "vert-vif",
    },
    insecte: {
        label: "Insecte",
        color: "mauve",
    },
});

export type FauneType = keyof typeof FAUNE_TYPE_REGISTRY;

export type FauneTypeMeta =
    (typeof FAUNE_TYPE_REGISTRY)[FauneType];

/** Liste ordonnée des types, utile pour les filtres et les démonstrations. */
export const FAUNE_TYPE_META = Object.freeze(
    Object.values(FAUNE_TYPE_REGISTRY),
);

export function isFauneType(value: string): value is FauneType {
    return isCollectionMetaSlug(FAUNE_TYPE_REGISTRY, value);
}

export function getFauneTypeMeta(
    slug: string,
): FauneTypeMeta | undefined {
    return getCollectionMeta(FAUNE_TYPE_REGISTRY, slug);
}
