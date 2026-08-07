// Villes et villages de la Loire — contrat du catalogue du Codex.

import type { TerritoireSlug } from "@/registry/territoires";
import type { LRZColor } from "@/types/lrz";

/** Nature éditoriale de la localité, indépendamment de son statut administratif. */
export type VilleVillageCatalogueNature = "ville" | "bourg" | "village";

/** Manière dont la localité entretient son lien géographique avec le fleuve. */
export type VilleVillageCatalogueRelationFleuve =
    "sur-la-loire" | "sur-un-affluent" | "confluence" | "estuaire";

/**
 * Rive observée dans le sens de l’écoulement, de l’amont vers l’aval.
 * `deux-rives` couvre les localités dont le tissu urbain franchit le cours d’eau.
 */
export type VilleVillageCatalogueRive = "gauche" | "droite" | "deux-rives";

/** Coordonnées du point éditorial retenu pour la carte et les tris de proximité. */
export interface VilleVillageCataloguePosition {
    latitude: number;
    longitude: number;
}

/** Département de rattachement actuel de la localité. */
export interface VilleVillageCatalogueDepartement {
    nom: string;
    code: string;
}

/**
 * Repères administratifs actuels.
 *
 * Ils restent séparés de l’identité éditoriale afin qu’un village historique
 * puisse conserver sa propre fiche même lorsqu’il appartient aujourd’hui à
 * une commune nouvelle.
 */
export interface VilleVillageCatalogueAdministration {
    communeActuelle: string;
    communeDeleguee?: string;
    codeInsee: string;
    departement: VilleVillageCatalogueDepartement;
    region: string;
}

/** Situation de la localité dans le corridor ligérien. */
export interface VilleVillageCatalogueGeographie {
    territoire: TerritoireSlug;
    relationFleuve: VilleVillageCatalogueRelationFleuve;
    coursEauPrincipal: string;
    coursEau: string[];
    rive: VilleVillageCatalogueRive | null;
    position: VilleVillageCataloguePosition;
}

/** Identité visuelle utilisée par les cartes et les futures pages de détail. */
export interface VilleVillageCatalogueIdentite {
    mark: string;
    accent: string;
    color: LRZColor;
    illustration?: string;
    illustrationAlt?: string;
    symboles: string[];
}

/** Donnée démographique toujours accompagnée de son millésime et de sa source. */
export interface VilleVillageCataloguePopulation {
    valeur: number;
    annee: number;
    source: string;
}

/** Index du Codex auxquels une ville ou un village peut être relié. */
export type VilleVillageCatalogueIndexLie =
    | "chateaux"
    | "guinguettes"
    | "patrimoine"
    | "personnages"
    | "oeuvres"
    | "legendes"
    | "saveurs"
    | "evenements";

/** Référence stable vers une autre entrée du Codex. */
export interface VilleVillageCatalogueReferenceCodex {
    index: VilleVillageCatalogueIndexLie;
    slug: string;
    /** Précision éditoriale facultative sur la nature du lien. */
    relation?: string;
}

/** Liens externes utiles sans les confondre avec les relations internes au Codex. */
export interface VilleVillageCatalogueLiens {
    siteOfficiel?: string;
    officeTourisme?: string;
    wikipedia?: string;
    carte?: string;
}

/** Source documentaire mobilisée pour établir ou vérifier la fiche. */
export interface VilleVillageCatalogueSource {
    label: string;
    url?: string;
    consulteLe?: string;
}

/** Fiche éditoriale d’une ville, d’un bourg ou d’un village ligérien. */
export interface VilleVillageCatalogueEntry {
    /** Identifiant stable, kebab-case sans accents. */
    slug: string;

    nom: string;
    autresNoms: string[];
    gentilé?: string;
    nature: VilleVillageCatalogueNature;

    /** Accroche courte destinée aux cartes de l’index. */
    sousTitre: string;

    /** Résumé factuel et évocateur en une ou deux phrases. */
    description: string;

    /** Introduction développée de la future page de détail, au format Markdown. */
    presentationMd: string;

    administration: VilleVillageCatalogueAdministration;
    geographie: VilleVillageCatalogueGeographie;
    identite: VilleVillageCatalogueIdentite;

    /** Population facultative : l’index reste exploitable sans donnée volatile. */
    population?: VilleVillageCataloguePopulation;

    /** Lieux, quartiers, paysages ou monuments qui caractérisent la localité. */
    reperes: string[];

    /** Repères historiques formulés librement, sans créer encore un index d’événements. */
    faitsMarquants: string[];

    /** Labels patrimoniaux, touristiques ou paysagers effectivement documentés. */
    labels: string[];

    referencesCodex: VilleVillageCatalogueReferenceCodex[];
    liens: VilleVillageCatalogueLiens;
    sources: VilleVillageCatalogueSource[];
    tags: string[];
}

/** Métadonnées éditoriales de `data/catalogue-villes-villages.json`. */
export interface VilleVillageCatalogueMeta {
    titre: string;
    source: string;
    corridor: string;
    maj: string;
    schemaVersion: string;
    nombreEntrees: number;
    departements: VilleVillageCatalogueDepartement[];
    note: string;
}

/** Structure racine de `data/catalogue-villes-villages.json`. */
export interface VilleVillageCatalogue {
    meta: VilleVillageCatalogueMeta;
    villesVillages: VilleVillageCatalogueEntry[];
}
