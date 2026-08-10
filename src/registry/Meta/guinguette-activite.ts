import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/** Registre officiel des activités, services et équipements des guinguettes. */
export const GUINGUETTE_ACTIVITE_META_REGISTRY = defineCollectionMetaRegistry({
    bar: { label: "Bar", color: "lie-de-vin" },
    restauration: { label: "Restauration", color: "orange-cuivre" },
    "petite-restauration": {
        label: "Petite restauration",
        color: "miel",
    },
    "vente-a-emporter": {
        label: "Vente à emporter",
        color: "ocre-clair",
    },
    brunch: { label: "Brunch", color: "fauve" },
    glacier: { label: "Glacier", color: "rose-sauvage" },
    "produits-locaux": {
        label: "Produits locaux",
        color: "vert-sauge",
    },
    "options-vegetariennes": {
        label: "Options végétariennes",
        color: "prairie",
    },
    "menu-enfant": { label: "Menu enfant", color: "soleil" },
    reservation: { label: "Réservation", color: "bleu-gris" },
    groupes: { label: "Groupes", color: "fauve" },
    privatisation: { label: "Privatisation", color: "ambre" },
    "terrasse-couverte": {
        label: "Terrasse couverte",
        color: "ocre-clair",
    },
    "espace-interieur": {
        label: "Espace intérieur",
        color: "bleu-ardoise",
    },
    "accueil-enfants": {
        label: "Accueil des enfants",
        color: "rose-poudre",
    },
    "animaux-acceptes": {
        label: "Animaux acceptés",
        color: "vert-sauge",
    },
    "acces-pmr": { label: "Accès PMR", color: "bleu" },
    toilettes: { label: "Toilettes", color: "bleu-clair" },
    "table-a-langer": { label: "Table à langer", color: "lin" },
    "point-eau": { label: "Point d’eau", color: "eau" },
    wifi: { label: "Wi-Fi", color: "bleu-metallise" },
    "recharge-telephone": {
        label: "Recharge téléphone",
        color: "ambre",
    },
    consigne: { label: "Consigne", color: "gris-ardoise" },
    parking: { label: "Parking", color: "bleu-ardoise" },
    "paiement-carte": {
        label: "Paiement par carte",
        color: "bleu-nuit",
    },
    "stationnement-velo": {
        label: "Stationnement vélo",
        color: "orange-cuivre",
    },
    "station-reparation": {
        label: "Station de réparation",
        color: "gris-ardoise",
    },
    "recharge-vae": { label: "Recharge VAE", color: "orange" },
    "location-velo": { label: "Location de vélo", color: "fauve" },
    "accueil-velo": { label: "Accueil vélo", color: "vert-metallise" },
    "bagages-cyclistes": {
        label: "Bagages cyclistes",
        color: "brun-roux",
    },
    ponton: { label: "Ponton", color: "bleu-loire" },
    "halte-nautique": {
        label: "Halte nautique",
        color: "bleu-metallise",
    },
    amarrage: { label: "Amarrage", color: "bleu-ardoise" },
    "location-nautique": {
        label: "Location nautique",
        color: "ocre",
    },
    "mise-a-eau": { label: "Mise à l’eau", color: "eau" },
    "piste-de-danse": {
        label: "Piste de danse",
        color: "rose-sauvage",
    },
    scene: { label: "Scène", color: "rouge" },
    petanque: { label: "Pétanque", color: "gris" },
    "jeux-de-societe": {
        label: "Jeux de société",
        color: "miel",
    },
    "jeux-en-bois": { label: "Jeux en bois", color: "ocre" },
    "aire-de-jeux": { label: "Aire de jeux", color: "prairie" },
    bibliotheque: { label: "Bibliothèque", color: "lie-de-vin" },
});

export type GuinguetteActivite = keyof typeof GUINGUETTE_ACTIVITE_META_REGISTRY;
export type GuinguetteActiviteMeta =
    (typeof GUINGUETTE_ACTIVITE_META_REGISTRY)[GuinguetteActivite];

export const GUINGUETTE_ACTIVITE_META = Object.freeze(
    Object.values(GUINGUETTE_ACTIVITE_META_REGISTRY),
);

export function isGuinguetteActivite(
    value: string,
): value is GuinguetteActivite {
    return isCollectionMetaSlug(GUINGUETTE_ACTIVITE_META_REGISTRY, value);
}

export function getGuinguetteActiviteMeta(
    slug: string,
): GuinguetteActiviteMeta | undefined {
    return getCollectionMeta(GUINGUETTE_ACTIVITE_META_REGISTRY, slug);
}
