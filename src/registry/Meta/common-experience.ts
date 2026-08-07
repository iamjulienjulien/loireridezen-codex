import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/**
 * Registre de la métadonnée `experience` commune aux collections.
 */
export const COMMON_EXPERIENCE_REGISTRY = defineCollectionMetaRegistry({
    "visite-libre": {
        label: "Visite libre",
        color: "ocre",
    },
    "visite-guidee": {
        label: "Visite guidée",
        color: "bleu",
    },
    exposition: {
        label: "Exposition",
        color: "mauve",
    },
    reconstitution: {
        label: "Reconstitution",
        color: "grenat",
    },
    demonstration: {
        label: "Démonstration",
        color: "orange-cuivre",
    },
    atelier: {
        label: "Atelier",
        color: "fauve",
    },
    "jeu-piste": {
        label: "Jeu de piste",
        color: "vert-mousse",
    },
    promenade: {
        label: "Promenade",
        color: "vert-sauge",
    },
    randonnee: {
        label: "Randonnée",
        color: "vert",
    },
    velo: {
        label: "Vélo",
        color: "bleu-turquoise",
    },
    equitation: {
        label: "Équitation",
        color: "brun",
    },
    bateau: {
        label: "Bateau",
        color: "bleu-loire",
    },
    "canoe-kayak": {
        label: "Canoë-kayak",
        color: "eau-claire",
    },
    baignade: {
        label: "Baignade",
        color: "eau",
    },
    peche: {
        label: "Pêche",
        color: "bleu-ardoise",
    },
    "observation-nature": {
        label: "Observation de la nature",
        color: "prairie",
    },
    photographie: {
        label: "Photographie",
        color: "anthracite",
    },
    contemplation: {
        label: "Contemplation",
        color: "bleu-clair",
    },
    detente: {
        label: "Détente",
        color: "rose-poudre",
    },
    "pique-nique": {
        label: "Pique-nique",
        color: "vert-olive",
    },
    repas: {
        label: "Repas",
        color: "terre-cuite",
    },
    degustation: {
        label: "Dégustation",
        color: "lie-de-vin",
    },
    "marche-local": {
        label: "Marché local",
        color: "miel",
    },
    concert: {
        label: "Concert",
        color: "prune",
    },
    spectacle: {
        label: "Spectacle",
        color: "rouge",
    },
    danse: {
        label: "Danse",
        color: "corail",
    },
    "fete-populaire": {
        label: "Fête populaire",
        color: "coucher",
    },
    montgolfiere: {
        label: "Montgolfière",
        color: "soleil",
    },
});

export type CommonExperience = keyof typeof COMMON_EXPERIENCE_REGISTRY;

export type CommonExperienceMeta =
    (typeof COMMON_EXPERIENCE_REGISTRY)[CommonExperience];

/** Liste ordonnée des expériences, utile pour les filtres et démonstrations. */
export const COMMON_EXPERIENCE_META = Object.freeze(
    Object.values(COMMON_EXPERIENCE_REGISTRY),
);

export function isCommonExperience(value: string): value is CommonExperience {
    return isCollectionMetaSlug(COMMON_EXPERIENCE_REGISTRY, value);
}

export function getCommonExperienceMeta(
    slug: string,
): CommonExperienceMeta | undefined {
    return getCollectionMeta(COMMON_EXPERIENCE_REGISTRY, slug);
}
