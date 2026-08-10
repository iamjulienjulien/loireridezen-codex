import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre de la métadonnée `website` commune à l’écosystème Loire Ride Zen.
 */
export const COMMON_WEBSITE_REGISTRY = defineCollectionMetaRegistry({
    hub: {
        label: "Le Hub",
        color: "orange-cuivre",
    },
    instagram: {
        label: "Instagram",
        color: "rose-sauvage",
    },
    passeport: {
        label: "Le Passeport",
        color: "ocre",
    },
    codex: {
        label: "Le Codex",
        color: "fauve",
    },
    carte: {
        label: "La Carte interactive",
        color: "bleu-loire",
    },
    camp: {
        label: "Le Camp",
        color: "miel",
    },
});

export type CommonWebsite = keyof typeof COMMON_WEBSITE_REGISTRY;

export type CommonWebsiteMeta = (typeof COMMON_WEBSITE_REGISTRY)[CommonWebsite];

/** Liste ordonnée des sites et projets de l’écosystème Loire Ride Zen. */
export const COMMON_WEBSITE_META = Object.freeze(
    Object.values(COMMON_WEBSITE_REGISTRY),
);

export function isCommonWebsite(value: string): value is CommonWebsite {
    return isCollectionMetaSlug(COMMON_WEBSITE_REGISTRY, value);
}

export function getCommonWebsiteMeta(
    slug: string,
): CommonWebsiteMeta | undefined {
    return getCollectionMeta(COMMON_WEBSITE_REGISTRY, slug);
}
