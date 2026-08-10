import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `terroir` de la collection Vignobles.
 */
export const VIGNOBLE_TERROIR_REGISTRY = defineCollectionMetaRegistry({
    tuffeau: {
        label: "Tuffeau",
        color: "tuffeau",
    },
    calcaire: {
        label: "Calcaire",
        color: "pierre",
    },
    "marne-calcaire": {
        label: "Marne calcaire",
        color: "lin",
    },
    "argilo-calcaire": {
        label: "Argilo-calcaire",
        color: "ocre-clair",
    },
    "argile-a-silex": {
        label: "Argile à silex",
        color: "terre-cuite",
    },
    schiste: {
        label: "Schiste",
        color: "ardoise",
    },
    micaschiste: {
        label: "Micaschiste",
        color: "gris-brun",
    },
    gneiss: {
        label: "Gneiss",
        color: "taupe",
    },
    granite: {
        label: "Granite",
        color: "rose-poudre",
    },
    gabbro: {
        label: "Gabbro",
        color: "anthracite",
    },
    sable: {
        label: "Sable",
        color: "sable",
    },
    graviers: {
        label: "Graviers",
        color: "galet",
    },
    alluvions: {
        label: "Alluvions",
        color: "brun",
    },
    faluns: {
        label: "Faluns",
        color: "beige",
    },
});

export type VignobleTerroir = keyof typeof VIGNOBLE_TERROIR_REGISTRY;

export type VignobleTerroirMeta =
    (typeof VIGNOBLE_TERROIR_REGISTRY)[VignobleTerroir];

/** Liste ordonnée des terroirs viticoles, utile pour les filtres. */
export const VIGNOBLE_TERROIR_META = Object.freeze(
    Object.values(VIGNOBLE_TERROIR_REGISTRY),
);

export function isVignobleTerroir(value: string): value is VignobleTerroir {
    return isCollectionMetaSlug(VIGNOBLE_TERROIR_REGISTRY, value);
}

export function getVignobleTerroirMeta(
    slug: string,
): VignobleTerroirMeta | undefined {
    return getCollectionMeta(VIGNOBLE_TERROIR_REGISTRY, slug);
}
