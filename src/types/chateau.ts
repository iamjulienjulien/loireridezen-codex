// src/types/chateau.ts
// Château ligérien — sibling de FauneEspece (même grammaire de codex).

import type { Ambiance } from "@/registry/ambiances";
import type {
    CommonArchitecture,
    CommonEpoque,
    CommonExperience,
} from "@/registry/Meta";
import type { ChateauRenommee } from "@/registry/Meta/chateau-renommee";
import type { ChateauVisite } from "@/registry/Meta/chateau-visite";

export type { ChateauRenommee } from "@/registry/Meta/chateau-renommee";
export type { ChateauVisite } from "@/registry/Meta/chateau-visite";

/** Époque dominante. Un château en cumule souvent ; `construction` porte le détail. */
export type ChateauEpoque =
    "Médiéval" | "Renaissance" | "Classique" | "Éclectique";

/** Protection patrimoniale — miroir de la conservation (UNESCO ≈ monde, MH ≈ national). */
export interface ChateauProtection {
    /** Classement au titre des Monuments historiques. */
    monumentHistorique: "classé" | "inscrit" | "aucune";
    /** Dans le périmètre « Val de Loire » inscrit au patrimoine mondial de l'UNESCO. */
    unesco: boolean;
    note?: string;
}

/** Coordonnées géographiques — aligné sur le champ geopoint de LRZField. */
export interface ChateauCoordonnees {
    lat: number;
    lng: number;
}

/** Illustrations du château déclinées selon l'ambiance active. */
export type ChateauIllustrations = Record<Ambiance, string>;

/** Métadonnées normalisées à partir des registres communs. */
export interface ChateauMeta {
    architecture: CommonArchitecture[];
    epoque: CommonEpoque[];
    experience: CommonExperience[];
}

export interface Chateau {
    /** Identifiant d'URL, kebab-case sans accents. */
    slug: string;
    nom: string;
    autresNoms: string[];
    /** Libellé évocateur pour la carte, registre LRZ. */
    sousTitre: string;
    /** Résumé factuel en une phrase (optionnel). */
    resume?: string;

    // ── Situation ──
    commune: string;
    /** Département avec numéro, ex. « Loir-et-Cher (41) ». */
    departement: string;
    coordonnees: ChateauCoordonnees;
    /** Cours d'eau au bord duquel il se dresse (Loire, Cher, Indre, Vienne…). */
    riviere: string;

    // ── Histoire & style ──
    epoque: ChateauEpoque;
    /** Style architectural, ex. « Première Renaissance française », « Gothique flamboyant ». */
    style: string;
    /** Période de construction, ex. « 1519–1547 » ou « XIIᵉ–XVᵉ s. ». */
    construction: string;
    /** Commanditaire ou bâtisseur emblématique (optionnel). */
    commanditaire?: string;

    // ── Statut ──
    protection: ChateauProtection;
    renommee: ChateauRenommee;
    visite: ChateauVisite;

    // ── Représentation normalisée ──
    illustrations: ChateauIllustrations;
    meta: ChateauMeta;
}

/** Métadonnées éditoriales du catalogue des châteaux. */
export interface CatalogueChateauxMeta {
    titre: string;
    source: string;
    corridor: string;
    maj: string;
    note: string;
    ordre: string;
}

/** Structure racine de `data/catalogue-chateaux.json`. */
export interface CatalogueChateaux {
    meta: CatalogueChateauxMeta;
    chateaux: Chateau[];
}
