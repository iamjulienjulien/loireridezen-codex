import type { Ambiance } from "@/registry/ambiances";
import type {
    CommonArchitecture,
    CommonEpoque,
    CommonExperience,
} from "@/registry/Meta";
import type { Chateau } from "@/types/chateau";

/** Illustrations du château déclinées selon l'ambiance active. */
export type ChateauV2Illustrations = Record<Ambiance, string>;

/** Métadonnées normalisées à partir des registres communs. */
export interface ChateauV2Meta {
    architecture: CommonArchitecture[];
    epoque: CommonEpoque[];
    experience: CommonExperience[];
}

/**
 * Nouvelle structure d'un château, sans emoji et avec ses illustrations et
 * métadonnées normalisées.
 */
export interface ChateauV2 extends Omit<
    Chateau,
    "emoji" | "customEmoji" | "illustrationVariant"
> {
    illustrations: ChateauV2Illustrations;
    meta: ChateauV2Meta;
}

/** Métadonnées éditoriales du catalogue des châteaux. */
export interface CatalogueChateauxV2Meta {
    titre: string;
    source: string;
    corridor: string;
    maj: string;
    note: string;
    ordre: string;
}

/** Structure racine de `data/catalogue-chateaux.json`. */
export interface CatalogueChateauxV2 {
    meta: CatalogueChateauxV2Meta;
    chateaux: ChateauV2[];
}
