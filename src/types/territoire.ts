// src/types/territoire.ts
// Territoire ligérien — chapitre géohistorique du Codex.

import type { LRZColor } from "@/types/lrz";

/**
 * Nature du territoire.
 *
 * Le registre LRZ ne cherche pas à reproduire un découpage administratif
 * uniforme : il mêle provinces, duchés, comtés et pays historiques lorsque
 * ceux-ci forment un chapitre cohérent du voyage ligérien.
 */
export type TerritoireNature =
    "duché" | "comté" | "province" | "pays historique" | "territoire éditorial";

/**
 * Position générale le long du fil.
 *
 * Sert notamment à distinguer les territoires intérieurs du dernier chapitre,
 * où la Loire devient estuarienne puis maritime.
 */
export type TerritoirePaysage =
    "val amont" | "val royal" | "val occidental" | "estuaire";

/**
 * Repères géographiques éditoriaux.
 *
 * Les limites ne constituent pas un bornage administratif strict.
 * Elles servent à organiser le récit, la carte et le catalogue.
 */
export interface TerritoireLimites {
    /** Porte d’entrée du territoire en suivant la Loire vers l’aval. */
    amont: string;

    /** Dernier repère avant le territoire suivant. */
    aval: string;

    /**
     * Explication facultative pour les frontières symboliques,
     * historiques ou volontairement éditoriales.
     */
    note?: string;
}

/**
 * Identité visuelle du territoire.
 *
 */
export interface TerritoireIdentite {
    /** Emoji temporaire ou signe utilisé dans les interfaces. */
    mark: string;

    /** Couleur d’accent principale. */
    accent: string;

    /** Token LRZ associé au territoire pour les composants du design system. */
    color: LRZColor;

    /** Éléments symboliques retenus ou envisagés pour sa composition. */
    symboles: string[];
}

/**
 * Territoire géohistorique du Codex Ligérien.
 *
 * Un territoire n’est pas nécessairement une ancienne division politique
 * homogène. Il constitue avant tout un chapitre narratif cohérent le long
 * de la Loire.
 */
export interface Territoire {
    /** Identifiant stable, kebab-case sans accents. */
    slug: string;

    /** Position d’amont en aval. */
    ordre: number;

    /** Nom officiel dans le registre LRZ. */
    nom: string;

    /** Libellé évocateur destiné aux en-têtes et cartes. */
    sousTitre: string;

    /** Résumé court pour la navigation ou les cartes de présentation. */
    description: string;

    /** Introduction éditoriale développée, au format Markdown. */
    presentationMd: string;

    /** Nature historique ou éditoriale du territoire. */
    nature: TerritoireNature;

    /** Grande séquence paysagère à laquelle il appartient. */
    paysage: TerritoirePaysage;

    /** Principales villes, places fortes ou repères du chapitre. */
    reperes: string[];

    /** Fleuves et rivières structurant le territoire. */
    coursEau: string[];

    /** Limites narratives retenues par le Codex. */
    limites: TerritoireLimites;

    /** Identité graphique du chapitre. */
    identite: TerritoireIdentite;
}
