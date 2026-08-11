// Territoire ligérien — contrat du catalogue géohistorique du Codex.

import type { LRZColor } from "@/types/lrz";

/**
 * Nature du territoire dans le catalogue.
 *
 * Ce type duplique temporairement `TerritoireNature` afin que le registre et
 * le catalogue puissent migrer indépendamment sans créer de dépendance entre
 * leurs contrats.
 */
export type TerritoireCatalogueNature =
    "duché" | "comté" | "province" | "pays historique" | "territoire éditorial";

/** Grande séquence paysagère occupée par le territoire le long du fil. */
export type TerritoireCataloguePaysage =
    "val amont" | "val royal" | "val occidental" | "estuaire";

/** Limites narratives retenues par le Codex, d’amont en aval. */
export interface TerritoireCatalogueLimites {
    amont: string;
    aval: string;
    note?: string;
}

/** Identité visuelle embarquée dans le catalogue pendant la migration. */
export interface TerritoireCatalogueIdentite {
    mark: string;
    accent: string;
    color: LRZColor;
    symboles: string[];
}

/** Fiche géohistorique d’un territoire ligérien. */
export interface TerritoireCatalogueEntry {
    slug: string;
    ordre: number;
    nom: string;
    sousTitre: string;
    description: string;
    presentationMd: string;
    nature: TerritoireCatalogueNature;
    paysage: TerritoireCataloguePaysage;
    reperes: string[];
    coursEau: string[];
    limites: TerritoireCatalogueLimites;
    identite: TerritoireCatalogueIdentite;
}

/** Métadonnées éditoriales de `data/catalogue-territoires.json`. */
export interface TerritoireCatalogueMeta {
    titre: string;
    source: string;
    corridor: string;
    maj: string;
    nombreEntrees: number;
    ordre: string;
    note: string;
}

/** Structure racine de `data/catalogue-territoires.json`. */
export interface TerritoireCatalogue {
    meta: TerritoireCatalogueMeta;
    territoires: TerritoireCatalogueEntry[];
}
