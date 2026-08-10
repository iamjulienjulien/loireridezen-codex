import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre des notions éditoriales transversales du Codex.
 *
 * Cette collection est volontairement générale et peut être enrichie au fil
 * des besoins sans reproduire les milieux ou les expériences.
 */
export const COMMON_GENERAL_REGISTRY = defineCollectionMetaRegistry({
    atlas: {
        label: "Atlas",
        color: "bleu-loire",
    },
    explorer: {
        label: "Explorer",
        color: "miel",
    },
    observer: {
        label: "Observer",
        color: "bleu-clair",
    },
    raconter: {
        label: "Raconter",
        color: "fauve",
    },
    relier: {
        label: "Relier",
        color: "corail",
    },
    chemin: {
        label: "Chemin",
        color: "ocre",
    },
    repere: {
        label: "Repère",
        color: "bleu-nuit",
    },
    sources: {
        label: "Sources",
        color: "brun",
    },
    mouvement: {
        label: "Mouvement",
        color: "bleu-metallise",
    },
    horizon: {
        label: "Horizon",
        color: "coucher",
    },
    partager: {
        label: "Partager",
        color: "orange-cuivre",
    },
});

export type CommonGeneral = keyof typeof COMMON_GENERAL_REGISTRY;

export type CommonGeneralMeta = (typeof COMMON_GENERAL_REGISTRY)[CommonGeneral];

/** Liste ordonnée des notions éditoriales transversales du Codex. */
export const COMMON_GENERAL_META = Object.freeze(
    Object.values(COMMON_GENERAL_REGISTRY),
);

export function isCommonGeneral(value: string): value is CommonGeneral {
    return isCollectionMetaSlug(COMMON_GENERAL_REGISTRY, value);
}

export function getCommonGeneralMeta(
    slug: string,
): CommonGeneralMeta | undefined {
    return getCollectionMeta(COMMON_GENERAL_REGISTRY, slug);
}
