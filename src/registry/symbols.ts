import {
    getCategoriePersonnage,
    type CategoriePersonnageSlug,
} from "@/registry/categories-personnages";
import { getIndexBySlug } from "@/registry/indexes";
import type { LRZColor } from "@/types/lrz";

export const LRZ_INDEX_SYMBOLS = {
    chateaux: "/symbols/index/chateaux.png",
    faune: "/symbols/index/faune.png",
    flore: "/symbols/index/flore.png",
    guinguettes: "/symbols/index/guinguettes.png",
} as const;

export type LRZIndexSymbolSlug = keyof typeof LRZ_INDEX_SYMBOLS;

export const LRZ_PERSONNAGE_CATEGORIE_SYMBOLS = {
    souverain: "/symbols/personnage/categorie/souverain.png",
    prince: "/symbols/personnage/categorie/prince.png",
    noble: "/symbols/personnage/categorie/noble.png",
    "homme-etat": "/symbols/personnage/categorie/homme-etat.png",
    militaire: "/symbols/personnage/categorie/militaire.png",
    batisseur: "/symbols/personnage/categorie/batisseur.png",
    mecene: "/symbols/personnage/categorie/mecene.png",
    artiste: "/symbols/personnage/categorie/artiste.png",
    ecrivain: "/symbols/personnage/categorie/ecrivain.png",
    scientifique: "/symbols/personnage/categorie/scientifique.png",
    courtisan: "/symbols/personnage/categorie/courtisan.png",
    religieux: "/symbols/personnage/categorie/religieux.png",
    marchand: "/symbols/personnage/categorie/marchand.png",
    collectionneur: "/symbols/personnage/categorie/collectionneur.png",
    soignant: "/symbols/personnage/categorie/soignant.png",
    muse: "/symbols/personnage/categorie/muse.png",
} as const satisfies Record<CategoriePersonnageSlug, string>;

/**
 * Registre des symboles illustrés du Codex.
 *
 * Une collection peut contenir directement ses symboles, comme `index`, ou
 * les regrouper par métadonnée, comme `personnage.categorie`.
 */
export const LRZ_SYMBOLS = {
    index: LRZ_INDEX_SYMBOLS,
    personnage: {
        categorie: LRZ_PERSONNAGE_CATEGORIE_SYMBOLS,
    },
} as const;

export type LRZSymbolCollection = keyof typeof LRZ_SYMBOLS;

export type LRZSymbolMeta = keyof typeof LRZ_SYMBOLS.personnage;

export type LRZSymbolSlug = LRZIndexSymbolSlug | CategoriePersonnageSlug;

export type LRZSymbolDefinition = {
    source: string;
    label: string;
    accent: string;
    color: LRZColor;
};

export type LRZSymbolLocator =
    | {
          /** Collection dont les symboles sont rangés directement à la racine. */
          collection: "index";
          meta?: never;
          slug: LRZIndexSymbolSlug;
      }
    | {
          /** Collection de symboles classés par métadonnée. */
          collection: "personnage";
          meta: "categorie";
          slug: CategoriePersonnageSlug;
      };

export function isLRZIndexSymbolSlug(
    value: string,
): value is LRZIndexSymbolSlug {
    return Object.hasOwn(LRZ_INDEX_SYMBOLS, value);
}

export function getLRZSymbolSource(
    collection: LRZSymbolCollection,
    meta: LRZSymbolMeta | undefined,
    slug: string,
): string | undefined {
    if (collection === "index" && meta === undefined) {
        return isLRZIndexSymbolSlug(slug) ? LRZ_SYMBOLS.index[slug] : undefined;
    }

    if (
        collection === "personnage" &&
        meta === "categorie" &&
        Object.hasOwn(LRZ_SYMBOLS.personnage.categorie, slug)
    ) {
        return LRZ_SYMBOLS.personnage.categorie[
            slug as CategoriePersonnageSlug
        ];
    }

    return undefined;
}

export function getLRZSymbolDefinition(
    collection: LRZSymbolCollection,
    meta: LRZSymbolMeta | undefined,
    slug: string,
): LRZSymbolDefinition | undefined {
    const source = getLRZSymbolSource(collection, meta, slug);

    if (!source) {
        return undefined;
    }

    if (collection === "index") {
        const index = getIndexBySlug(slug);

        return index
            ? {
                  source,
                  label: index.label,
                  accent: index.accent,
                  color: index.color,
              }
            : undefined;
    }

    if (collection === "personnage" && meta === "categorie") {
        const category = getCategoriePersonnage(slug);

        return category
            ? {
                  source,
                  label: category.nom,
                  accent: category.identite.accent,
                  color: category.identite.color,
              }
            : undefined;
    }

    return undefined;
}
