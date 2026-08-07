import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre chronologique de la métadonnée `epoque` commune aux collections.
 */
export const COMMON_EPOQUE_REGISTRY = defineCollectionMetaRegistry({
    prehistoire: {
        label: "Préhistoire",
        color: "ocre",
    },
    protohistoire: {
        label: "Protohistoire",
        color: "mauve",
    },
    antiquite: {
        label: "Antiquité",
        color: "ocre-clair",
    },
    "moyen-age": {
        label: "Moyen Âge",
        color: "bleu-ardoise",
    },
    renaissance: {
        label: "Renaissance",
        color: "miel",
    },
    "ancien-regime": {
        label: "Ancien Régime",
        color: "ambre",
    },
    "revolution-empire": {
        label: "Révolution & Empire",
        color: "rouge",
    },
    "xixe-siecle": {
        label: "XIXe siècle",
        color: "anthracite",
    },
    "xxe-siecle": {
        label: "XXe siècle",
        color: "brun",
    },
    "xxie-siecle": {
        label: "XXIe siècle",
        color: "bleu-turquoise",
    },
});

export type CommonEpoque = keyof typeof COMMON_EPOQUE_REGISTRY;

export type CommonEpoqueMeta = (typeof COMMON_EPOQUE_REGISTRY)[CommonEpoque];

/** Liste ordonnée des époques, utile pour les filtres et démonstrations. */
export const COMMON_EPOQUE_META = Object.freeze(
    Object.values(COMMON_EPOQUE_REGISTRY),
);

export function isCommonEpoque(value: string): value is CommonEpoque {
    return isCollectionMetaSlug(COMMON_EPOQUE_REGISTRY, value);
}

export function getCommonEpoqueMeta(
    slug: string,
): CommonEpoqueMeta | undefined {
    return getCollectionMeta(COMMON_EPOQUE_REGISTRY, slug);
}
