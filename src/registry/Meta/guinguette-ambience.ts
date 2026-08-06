import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre officiel de la métadonnée `ambience` de la collection Guinguette.
 */
export const GUINGUETTE_AMBIENCE_META_REGISTRY = defineCollectionMetaRegistry({
    traditionnelle: {
        label: "Traditionnelle",
        color: "ocre",
    },
    familiale: {
        label: "Familiale",
        color: "prairie",
    },
    "bord de rivière": {
        label: "Bord de rivière",
        color: "bleu-gris",
    },
    festive: {
        label: "Festive",
        color: "orange",
    },
    musicale: {
        label: "Musicale",
        color: "orange-cuivre",
    },
    conviviale: {
        label: "Conviviale",
        color: "fauve",
    },
    bucolique: {
        label: "Bucolique",
        color: "roseau",
    },
    nature: {
        label: "Nature",
        color: "prairie",
    },
    décontractée: {
        label: "Décontractée",
        color: "galet",
    },
    urbaine: {
        label: "Urbaine",
        color: "gris-ardoise",
    },
    paisible: {
        label: "Paisible",
        color: "roseau",
    },
    gourmande: {
        label: "Gourmande",
        color: "orange-cuivre",
    },
    romantique: {
        label: "Romantique",
        color: "rouge",
    },
    "bord de Loire": {
        label: "Bord de Loire",
        color: "bleu-gris",
    },
    champêtre: {
        label: "Champêtre",
        color: "ocre",
    },
    "coucher de soleil": {
        label: "Coucher de soleil",
        color: "orange",
    },
    portuaire: {
        label: "Portuaire",
        color: "gris-ardoise",
    },
    populaire: {
        label: "Populaire",
        color: "fauve",
    },
    insulaire: {
        label: "Insulaire",
        color: "bleu-gris",
    },
    locale: {
        label: "Locale",
        color: "vert-metallise",
    },
    itinérante: {
        label: "Itinérante",
        color: "ocre",
    },
    culturelle: {
        label: "Culturelle",
        color: "bleu-gris",
    },
    éphémère: {
        label: "Éphémère",
        color: "galet",
    },
});

export type GuinguetteAmbience = keyof typeof GUINGUETTE_AMBIENCE_META_REGISTRY;

export type GuinguetteAmbienceMeta =
    (typeof GUINGUETTE_AMBIENCE_META_REGISTRY)[GuinguetteAmbience];

/** Liste ordonnée des ambiances, utile pour les filtres et démonstrations. */
export const GUINGUETTE_AMBIENCE_META = Object.freeze(
    Object.values(GUINGUETTE_AMBIENCE_META_REGISTRY),
);

export function isGuinguetteAmbience(
    value: string,
): value is GuinguetteAmbience {
    return isCollectionMetaSlug(GUINGUETTE_AMBIENCE_META_REGISTRY, value);
}

export function getGuinguetteAmbienceMeta(
    slug: string,
): GuinguetteAmbienceMeta | undefined {
    return getCollectionMeta(GUINGUETTE_AMBIENCE_META_REGISTRY, slug);
}
