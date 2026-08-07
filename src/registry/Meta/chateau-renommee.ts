import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `renommee` de la collection Châteaux.
 */
export const CHATEAU_RENOMMEE_REGISTRY = defineCollectionMetaRegistry({
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

export type ChateauRenommee = keyof typeof CHATEAU_RENOMMEE_REGISTRY;

export type ChateauRenommeeMeta =
    (typeof CHATEAU_RENOMMEE_REGISTRY)[ChateauRenommee];

/** Liste ordonnée des niveaux de renommée, utile pour les filtres. */
export const CHATEAU_RENOMMEE_META = Object.freeze(
    Object.values(CHATEAU_RENOMMEE_REGISTRY),
);

export function isChateauRenommee(value: string): value is ChateauRenommee {
    return isCollectionMetaSlug(CHATEAU_RENOMMEE_REGISTRY, value);
}

export function getChateauRenommeeMeta(
    slug: string,
): ChateauRenommeeMeta | undefined {
    return getCollectionMeta(CHATEAU_RENOMMEE_REGISTRY, slug);
}
