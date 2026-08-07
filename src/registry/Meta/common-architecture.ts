import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre de la métadonnée `architecture` commune aux collections.
 */
export const COMMON_ARCHITECTURE_REGISTRY = defineCollectionMetaRegistry({
    "gallo-romaine": {
        label: "Gallo-romaine",
        color: "terre-cuite",
    },
    "pre-romane": {
        label: "Préromane",
        color: "taupe",
    },
    medievale: {
        label: "Médiévale",
        color: "ocre",
    },
    romane: {
        label: "Romane",
        color: "brun",
    },
    gothique: {
        label: "Gothique",
        color: "bleu-nuit",
    },
    "gothique-flamboyant": {
        label: "Gothique flamboyant",
        color: "lie-de-vin",
    },
    renaissance: {
        label: "Renaissance",
        color: "miel",
    },
    classique: {
        label: "Classique",
        color: "tuffeau",
    },
    baroque: {
        label: "Baroque",
        color: "prune",
    },
    rocaille: {
        label: "Rocaille",
        color: "rose-poudre",
    },
    neoclassique: {
        label: "Néoclassique",
        color: "pierre",
    },
    neogothique: {
        label: "Néogothique",
        color: "grenat",
    },
    historiciste: {
        label: "Historiciste",
        color: "fauve",
    },
    industrielle: {
        label: "Industrielle",
        color: "brique",
    },
    "art-nouveau": {
        label: "Art nouveau",
        color: "vert-sauge",
    },
    "art-deco": {
        label: "Art déco",
        color: "ambre",
    },
    moderniste: {
        label: "Moderniste",
        color: "bleu-gris",
    },
    brutaliste: {
        label: "Brutaliste",
        color: "gris",
    },
    contemporaine: {
        label: "Contemporaine",
        color: "bleu-metallise",
    },
    vernaculaire: {
        label: "Vernaculaire",
        color: "ecorce",
    },
    troglodytique: {
        label: "Troglodytique",
        color: "beige",
    },
});

export type CommonArchitecture = keyof typeof COMMON_ARCHITECTURE_REGISTRY;

export type CommonArchitectureMeta =
    (typeof COMMON_ARCHITECTURE_REGISTRY)[CommonArchitecture];

/** Liste ordonnée des architectures, utile pour les filtres et démonstrations. */
export const COMMON_ARCHITECTURE_META = Object.freeze(
    Object.values(COMMON_ARCHITECTURE_REGISTRY),
);

export function isCommonArchitecture(
    value: string,
): value is CommonArchitecture {
    return isCollectionMetaSlug(COMMON_ARCHITECTURE_REGISTRY, value);
}

export function getCommonArchitectureMeta(
    slug: string,
): CommonArchitectureMeta | undefined {
    return getCollectionMeta(COMMON_ARCHITECTURE_REGISTRY, slug);
}
