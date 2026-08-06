import type { GuinguetteAmbience } from "@/registry/Meta/guinguette-ambience";
import type { TerritoireSlug } from "@/registry/territoires";

export type { GuinguetteAmbience } from "@/registry/Meta/guinguette-ambience";

export type GuinguetteType =
    | "guinguette"
    | "restaurant-guinguette"
    | "bar-guinguette"
    | "guinguette-itinerante";

export type GuinguetteStatut = "actif" | "a_verifier" | "historique";

export type GuinguetteVerification =
    | "confirme_par_office_de_tourisme"
    | "nom_ambigu"
    | "etablissement_non_confirme"
    | "concept_confirme_programmation_a_actualiser"
    | string;

export type GuinguetteVue =
    "fleuve" | "rivière" | "île" | "port" | "variable" | string;

export type GuinguettePosition = {
    latitude: number | null;
    longitude: number | null;
};

export type GuinguetteLiens = {
    siteWeb: string | null;
    instagram: string | null;
    facebook: string | null;
    googleMaps: string | null;
};

/**
 * Entrée brute du catalogue des guinguettes.
 *
 * Les booléens et le cours d'eau peuvent être `null` lorsqu'une information
 * n'a pas encore été confirmée. `null` ne doit donc jamais être assimilé à
 * `false` dans l'UI.
 */
export type Guinguette = {
    slug: string;
    nom: string;
    autresNoms: string[];
    sousTitre: string | null;
    commune: string;
    communeDeleguee: string | null;
    departement: string;
    territoire: TerritoireSlug;
    coursDEau: string | null;
    type: GuinguetteType;
    ambiance: GuinguetteAmbience[];
    terrasse: boolean | null;
    musiqueLive: boolean | null;
    accessibleVelo: boolean | null;
    loireAVelo: boolean | null;
    vue: GuinguetteVue;
    periode: string;
    position: GuinguettePosition;
    liens: GuinguetteLiens;
    description: string;
    services: string[];
    tags: string[];
    statut: GuinguetteStatut;
    verification: GuinguetteVerification;
};

export type GuinguettesCatalogMeta = {
    titre: string;
    source: string;
    corridor: string;
    maj: string;
    nombreEntrees: number;
    departements: Array<{
        nom: string;
        code: string;
    }>;
    note: string;
};

export type GuinguettesCatalog = {
    meta: GuinguettesCatalogMeta;
    guinguettes: Guinguette[];
};
