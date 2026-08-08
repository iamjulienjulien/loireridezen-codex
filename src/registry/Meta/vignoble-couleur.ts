import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `couleur` de la collection Vignobles.
 */
export const VIGNOBLE_COULEUR_REGISTRY = defineCollectionMetaRegistry({
    "blanc sec": {
        label: "Blanc sec",
        color: "jaune-paille",
    },
    "blanc moelleux": {
        label: "Blanc moelleux",
        color: "miel",
    },
    rouge: {
        label: "Rouge",
        color: "lie-de-vin",
    },
    rosé: {
        label: "Rosé",
        color: "rose-sauvage",
    },
    effervescent: {
        label: "Effervescent",
        color: "argent",
    },
});

export type VignobleCouleur = keyof typeof VIGNOBLE_COULEUR_REGISTRY;

export type VignobleCouleurMeta =
    (typeof VIGNOBLE_COULEUR_REGISTRY)[VignobleCouleur];

/** Liste ordonnée des couleurs de vin, utile pour les filtres. */
export const VIGNOBLE_COULEUR_META = Object.freeze(
    Object.values(VIGNOBLE_COULEUR_REGISTRY),
);

export function isVignobleCouleur(value: string): value is VignobleCouleur {
    return isCollectionMetaSlug(VIGNOBLE_COULEUR_REGISTRY, value);
}

export function getVignobleCouleurMeta(
    slug: string,
): VignobleCouleurMeta | undefined {
    return getCollectionMeta(VIGNOBLE_COULEUR_REGISTRY, slug);
}
