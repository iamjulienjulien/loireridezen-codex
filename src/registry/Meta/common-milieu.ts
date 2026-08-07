import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre de la métadonnée `milieu` commune aux collections.
 */
export const COMMON_MILIEU_REGISTRY = defineCollectionMetaRegistry({
    fleuve: {
        label: "Fleuve",
        color: "eau",
    },
    riviere: {
        label: "Rivière",
        color: "bleu-loire",
    },
    ruisseau: {
        label: "Ruisseau",
        color: "eau-claire",
    },
    source: {
        label: "Source",
        color: "bleu-turquoise",
    },
    canal: {
        label: "Canal",
        color: "bleu-gris",
    },
    estuaire: {
        label: "Estuaire",
        color: "bleu-metallise",
    },
    "bras-mort": {
        label: "Bras mort",
        color: "bleu-ardoise",
    },
    etang: {
        label: "Étang",
        color: "eau",
    },
    mare: {
        label: "Mare",
        color: "bleu-turquoise",
    },
    marais: {
        label: "Marais",
        color: "vert-roseau",
    },
    roseliere: {
        label: "Roselière",
        color: "roseau",
    },
    "prairie-humide": {
        label: "Prairie humide",
        color: "prairie",
    },
    berge: {
        label: "Berge",
        color: "sable",
    },
    greve: {
        label: "Grève",
        color: "galet",
    },
    ile: {
        label: "Île",
        color: "vert-vif",
    },
    "foret-alluviale": {
        label: "Forêt alluviale",
        color: "vert-fonce",
    },
    foret: {
        label: "Forêt",
        color: "foret",
    },
    lisiere: {
        label: "Lisière",
        color: "vert-mousse",
    },
    bocage: {
        label: "Bocage",
        color: "vert-sauge",
    },
    haie: {
        label: "Haie",
        color: "vert",
    },
    prairie: {
        label: "Prairie",
        color: "prairie",
    },
    "coteau-sec": {
        label: "Coteau sec",
        color: "ocre-clair",
    },
    "falaise-rocheuse": {
        label: "Falaise rocheuse",
        color: "pierre",
    },
    "cavite-souterraine": {
        label: "Cavité souterraine",
        color: "gris-brun",
    },
    friche: {
        label: "Friche",
        color: "fauve",
    },
    cultures: {
        label: "Cultures",
        color: "jaune-paille",
    },
    verger: {
        label: "Verger",
        color: "vert-olive",
    },
    vignoble: {
        label: "Vignoble",
        color: "lie-de-vin",
    },
    "parc-jardin": {
        label: "Parc et jardin",
        color: "vert-clair",
    },
    "urbain-bati": {
        label: "Urbain et bâti",
        color: "ardoise",
    },
});

export type CommonMilieu = keyof typeof COMMON_MILIEU_REGISTRY;

export type CommonMilieuMeta = (typeof COMMON_MILIEU_REGISTRY)[CommonMilieu];

/** Liste ordonnée des milieux, utile pour les filtres et démonstrations. */
export const COMMON_MILIEU_META = Object.freeze(
    Object.values(COMMON_MILIEU_REGISTRY),
);

export function isCommonMilieu(value: string): value is CommonMilieu {
    return isCollectionMetaSlug(COMMON_MILIEU_REGISTRY, value);
}

export function getCommonMilieuMeta(
    slug: string,
): CommonMilieuMeta | undefined {
    return getCollectionMeta(COMMON_MILIEU_REGISTRY, slug);
}
