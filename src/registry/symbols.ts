import {
    getCategoriePersonnage,
    type CategoriePersonnageSlug,
} from "@/registry/categories-personnages";
import { getLRZColorValue } from "@/registry/colors";
import { getIndexBySlug } from "@/registry/indexes";
import {
    getCommonArchitectureMeta,
    type CommonArchitecture,
} from "@/registry/Meta/common-architecture";
import {
    getCommonEpoqueMeta,
    type CommonEpoque,
} from "@/registry/Meta/common-epoque";
import {
    getFauneRareteMeta,
    type FauneRarete,
} from "@/registry/Meta/faune-rarete";
import { getFauneTypeMeta, type FauneType } from "@/registry/Meta/faune-type";
import {
    getFloreCategorieMeta,
    type FloreCategorie,
} from "@/registry/Meta/flore-categorie";
import {
    getFloreRareteMeta,
    type FloreRarete,
} from "@/registry/Meta/flore-rarete";
import {
    getGuinguetteAmbienceMeta,
    type GuinguetteAmbience,
} from "@/registry/Meta/guinguette-ambience";
import type { LRZColor } from "@/types/lrz";

export const LRZ_INDEX_SYMBOLS = {
    chateaux: "/symbols/index/chateaux.png",
    faune: "/symbols/index/faune.png",
    flore: "/symbols/index/flore.png",
    guinguettes: "/symbols/index/guinguettes.png",
} as const;

export type LRZIndexSymbolSlug = keyof typeof LRZ_INDEX_SYMBOLS;

export const LRZ_COMMON_EPOQUE_SYMBOLS = {
    prehistoire: "/symbols/common/epoque/prehistoire.png",
    protohistoire: "/symbols/common/epoque/protohistoire.png",
    antiquite: "/symbols/common/epoque/antiquite.png",
    "moyen-age": "/symbols/common/epoque/moyen-age.png",
    renaissance: "/symbols/common/epoque/renaissance.png",
    "ancien-regime": "/symbols/common/epoque/ancien-regime.png",
    "revolution-empire": "/symbols/common/epoque/revolution-empire.png",
    "xixe-siecle": "/symbols/common/epoque/xixe-siecle.png",
    "xxe-siecle": "/symbols/common/epoque/xxe-siecle.png",
    "xxie-siecle": "/symbols/common/epoque/xxie-siecle.png",
} as const satisfies Record<CommonEpoque, string>;

export type LRZCommonEpoqueSymbolSlug = keyof typeof LRZ_COMMON_EPOQUE_SYMBOLS;

export const LRZ_COMMON_ARCHITECTURE_SYMBOLS = {
    "gallo-romaine": "/symbols/common/architecture/gallo-romaine.png",
    "pre-romane": "/symbols/common/architecture/pre-romane.png",
    romane: "/symbols/common/architecture/romane.png",
    gothique: "/symbols/common/architecture/gothique.png",
    "gothique-flamboyant":
        "/symbols/common/architecture/gothique-flamboyant.png",
    renaissance: "/symbols/common/architecture/renaissance.png",
    classique: "/symbols/common/architecture/classique.png",
    baroque: "/symbols/common/architecture/baroque.png",
    rocaille: "/symbols/common/architecture/rocaille.png",
    neoclassique: "/symbols/common/architecture/neoclassique.png",
    neogothique: "/symbols/common/architecture/neogothique.png",
    historiciste: "/symbols/common/architecture/historiciste.png",
    industrielle: "/symbols/common/architecture/industrielle.png",
    "art-nouveau": "/symbols/common/architecture/art-nouveau.png",
    "art-deco": "/symbols/common/architecture/art-deco.png",
    moderniste: "/symbols/common/architecture/moderniste.png",
    brutaliste: "/symbols/common/architecture/brutaliste.png",
    contemporaine: "/symbols/common/architecture/contemporaine.png",
    vernaculaire: "/symbols/common/architecture/vernaculaire.png",
    troglodytique: "/symbols/common/architecture/troglodytique.png",
} as const satisfies Record<CommonArchitecture, string>;

export type LRZCommonArchitectureSymbolSlug =
    keyof typeof LRZ_COMMON_ARCHITECTURE_SYMBOLS;

export const LRZ_FAUNE_TYPE_SYMBOLS = {
    oiseau: "/symbols/faune/type/oiseau.png",
    mammifère: "/symbols/faune/type/mammifere.png",
    poisson: "/symbols/faune/type/poisson.png",
    reptile: "/symbols/faune/type/reptile.png",
    amphibien: "/symbols/faune/type/amphibien.png",
    insecte: "/symbols/faune/type/insecte.png",
} as const satisfies Record<FauneType, string>;

export type LRZFauneTypeSymbolSlug = keyof typeof LRZ_FAUNE_TYPE_SYMBOLS;

export const LRZ_FAUNE_RARETE_SYMBOLS = {
    commun: "/symbols/faune/rarete/commun.png",
    régulier: "/symbols/faune/rarete/regulier.png",
    rare: "/symbols/faune/rarete/rare.png",
    trésor: "/symbols/faune/rarete/tresor.png",
} as const satisfies Record<FauneRarete, string>;

export type LRZFauneRareteSymbolSlug = keyof typeof LRZ_FAUNE_RARETE_SYMBOLS;

export const LRZ_FLORE_CATEGORIE_SYMBOLS = {
    arbre: "/symbols/flore/categorie/arbre.png",
    arbuste: "/symbols/flore/categorie/arbuste.png",
    herbacée: "/symbols/flore/categorie/herbacee.png",
    graminée: "/symbols/flore/categorie/graminee.png",
    aquatique: "/symbols/flore/categorie/aquatique.png",
    fougère: "/symbols/flore/categorie/fougere.png",
    grimpante: "/symbols/flore/categorie/grimpante.png",
} as const satisfies Record<FloreCategorie, string>;

export type LRZFloreCategorieSymbolSlug =
    keyof typeof LRZ_FLORE_CATEGORIE_SYMBOLS;

export const LRZ_FLORE_RARETE_SYMBOLS = {
    commun: "/symbols/flore/rarete/commun.png",
    régulier: "/symbols/flore/rarete/regulier.png",
    rare: "/symbols/flore/rarete/rare.png",
    trésor: "/symbols/flore/rarete/tresor.png",
} as const satisfies Record<FloreRarete, string>;

export type LRZFloreRareteSymbolSlug = keyof typeof LRZ_FLORE_RARETE_SYMBOLS;

export const LRZ_GUINGUETTE_AMBIENCE_SYMBOLS = {
    traditionnelle: "/symbols/guinguette/ambience/traditionnelle.png",
    familiale: "/symbols/guinguette/ambience/familiale.png",
    "bord de rivière": "/symbols/guinguette/ambience/bord-de-riviere.png",
    festive: "/symbols/guinguette/ambience/festive.png",
    musicale: "/symbols/guinguette/ambience/musicale.png",
    conviviale: "/symbols/guinguette/ambience/conviviale.png",
    bucolique: "/symbols/guinguette/ambience/bucolique.png",
    nature: "/symbols/guinguette/ambience/nature.png",
    décontractée: "/symbols/guinguette/ambience/decontractee.png",
    urbaine: "/symbols/guinguette/ambience/urbaine.png",
    paisible: "/symbols/guinguette/ambience/paisible.png",
    gourmande: "/symbols/guinguette/ambience/gourmande.png",
    romantique: "/symbols/guinguette/ambience/romantique.png",
    "bord de Loire": "/symbols/guinguette/ambience/bord-de-loire.png",
    champêtre: "/symbols/guinguette/ambience/champetre.png",
    "coucher de soleil": "/symbols/guinguette/ambience/coucher-de-soleil.png",
    portuaire: "/symbols/guinguette/ambience/portuaire.png",
    populaire: "/symbols/guinguette/ambience/populaire.png",
    insulaire: "/symbols/guinguette/ambience/insulaire.png",
    locale: "/symbols/guinguette/ambience/locale.png",
    itinérante: "/symbols/guinguette/ambience/itinerante.png",
    culturelle: "/symbols/guinguette/ambience/culturelle.png",
    éphémère: "/symbols/guinguette/ambience/ephemere.png",
} as const satisfies Record<GuinguetteAmbience, string>;

export type LRZGuinguetteAmbienceSymbolSlug =
    keyof typeof LRZ_GUINGUETTE_AMBIENCE_SYMBOLS;

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
 * les regrouper par métadonnée, comme `faune.type`, `faune.rarete`,
 * `flore.categorie`, `flore.rarete`, `common.epoque`, `common.architecture`,
 * `guinguette.ambience` et `personnage.categorie`.
 */
export const LRZ_SYMBOLS = {
    index: LRZ_INDEX_SYMBOLS,
    common: {
        epoque: LRZ_COMMON_EPOQUE_SYMBOLS,
        architecture: LRZ_COMMON_ARCHITECTURE_SYMBOLS,
    },
    faune: {
        type: LRZ_FAUNE_TYPE_SYMBOLS,
        rarete: LRZ_FAUNE_RARETE_SYMBOLS,
    },
    flore: {
        categorie: LRZ_FLORE_CATEGORIE_SYMBOLS,
        rarete: LRZ_FLORE_RARETE_SYMBOLS,
    },
    guinguette: {
        ambience: LRZ_GUINGUETTE_AMBIENCE_SYMBOLS,
    },
    personnage: {
        categorie: LRZ_PERSONNAGE_CATEGORIE_SYMBOLS,
    },
} as const;

export type LRZSymbolCollection = keyof typeof LRZ_SYMBOLS;

export type LRZSymbolMeta =
    | keyof typeof LRZ_SYMBOLS.common
    | keyof typeof LRZ_SYMBOLS.faune
    | keyof typeof LRZ_SYMBOLS.flore
    | keyof typeof LRZ_SYMBOLS.guinguette
    | keyof typeof LRZ_SYMBOLS.personnage;

export type LRZSymbolSlug =
    | LRZIndexSymbolSlug
    | LRZCommonEpoqueSymbolSlug
    | LRZCommonArchitectureSymbolSlug
    | LRZFauneTypeSymbolSlug
    | LRZFauneRareteSymbolSlug
    | LRZFloreCategorieSymbolSlug
    | LRZFloreRareteSymbolSlug
    | LRZGuinguetteAmbienceSymbolSlug
    | CategoriePersonnageSlug;

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
          /** Époques communes aux différentes collections du Codex. */
          collection: "common";
          meta: "epoque";
          slug: LRZCommonEpoqueSymbolSlug;
      }
    | {
          /** Courants architecturaux communs aux collections du Codex. */
          collection: "common";
          meta: "architecture";
          slug: LRZCommonArchitectureSymbolSlug;
      }
    | {
          /** Types taxinomiques de la collection Faune. */
          collection: "faune";
          meta: "type";
          slug: LRZFauneTypeSymbolSlug;
      }
    | {
          /** Niveaux de rareté de la collection Faune. */
          collection: "faune";
          meta: "rarete";
          slug: LRZFauneRareteSymbolSlug;
      }
    | {
          /** Catégories botaniques de la collection Flore. */
          collection: "flore";
          meta: "categorie";
          slug: LRZFloreCategorieSymbolSlug;
      }
    | {
          /** Niveaux de rareté de la collection Flore. */
          collection: "flore";
          meta: "rarete";
          slug: LRZFloreRareteSymbolSlug;
      }
    | {
          /** Ambiances éditoriales de la collection Guinguette. */
          collection: "guinguette";
          meta: "ambience";
          slug: LRZGuinguetteAmbienceSymbolSlug;
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
        collection === "common" &&
        meta === "epoque" &&
        Object.hasOwn(LRZ_SYMBOLS.common.epoque, slug)
    ) {
        return LRZ_SYMBOLS.common.epoque[slug as LRZCommonEpoqueSymbolSlug];
    }

    if (
        collection === "common" &&
        meta === "architecture" &&
        Object.hasOwn(LRZ_SYMBOLS.common.architecture, slug)
    ) {
        return LRZ_SYMBOLS.common.architecture[
            slug as LRZCommonArchitectureSymbolSlug
        ];
    }

    if (
        collection === "faune" &&
        meta === "type" &&
        Object.hasOwn(LRZ_SYMBOLS.faune.type, slug)
    ) {
        return LRZ_SYMBOLS.faune.type[slug as LRZFauneTypeSymbolSlug];
    }

    if (
        collection === "faune" &&
        meta === "rarete" &&
        Object.hasOwn(LRZ_SYMBOLS.faune.rarete, slug)
    ) {
        return LRZ_SYMBOLS.faune.rarete[slug as LRZFauneRareteSymbolSlug];
    }

    if (
        collection === "flore" &&
        meta === "categorie" &&
        Object.hasOwn(LRZ_SYMBOLS.flore.categorie, slug)
    ) {
        return LRZ_SYMBOLS.flore.categorie[slug as LRZFloreCategorieSymbolSlug];
    }

    if (
        collection === "flore" &&
        meta === "rarete" &&
        Object.hasOwn(LRZ_SYMBOLS.flore.rarete, slug)
    ) {
        return LRZ_SYMBOLS.flore.rarete[slug as LRZFloreRareteSymbolSlug];
    }

    if (
        collection === "guinguette" &&
        meta === "ambience" &&
        Object.hasOwn(LRZ_SYMBOLS.guinguette.ambience, slug)
    ) {
        return LRZ_SYMBOLS.guinguette.ambience[
            slug as LRZGuinguetteAmbienceSymbolSlug
        ];
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

    if (collection === "common" && meta === "epoque") {
        const period = getCommonEpoqueMeta(slug);

        return period
            ? {
                  source,
                  label: period.label,
                  accent: getLRZColorValue(period.color),
                  color: period.color,
              }
            : undefined;
    }

    if (collection === "common" && meta === "architecture") {
        const architecture = getCommonArchitectureMeta(slug);

        return architecture
            ? {
                  source,
                  label: architecture.label,
                  accent: getLRZColorValue(architecture.color),
                  color: architecture.color,
              }
            : undefined;
    }

    if (collection === "faune" && meta === "type") {
        const type = getFauneTypeMeta(slug);

        return type
            ? {
                  source,
                  label: type.label,
                  accent: getLRZColorValue(type.color),
                  color: type.color,
              }
            : undefined;
    }

    if (collection === "faune" && meta === "rarete") {
        const rarity = getFauneRareteMeta(slug);

        return rarity
            ? {
                  source,
                  label: rarity.label,
                  accent: getLRZColorValue(rarity.color),
                  color: rarity.color,
              }
            : undefined;
    }

    if (collection === "flore" && meta === "categorie") {
        const category = getFloreCategorieMeta(slug);

        return category
            ? {
                  source,
                  label: category.label,
                  accent: getLRZColorValue(category.color),
                  color: category.color,
              }
            : undefined;
    }

    if (collection === "flore" && meta === "rarete") {
        const rarity = getFloreRareteMeta(slug);

        return rarity
            ? {
                  source,
                  label: rarity.label,
                  accent: getLRZColorValue(rarity.color),
                  color: rarity.color,
              }
            : undefined;
    }

    if (collection === "guinguette" && meta === "ambience") {
        const ambience = getGuinguetteAmbienceMeta(slug);

        return ambience
            ? {
                  source,
                  label: ambience.label,
                  accent: getLRZColorValue(ambience.color),
                  color: ambience.color,
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
