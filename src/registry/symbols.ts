import {
    getCategoriePersonnage,
    type CategoriePersonnageSlug,
} from "@/registry/categories-personnages";
import { getLRZColorValue } from "@/registry/colors";
import {
    getChateauRenommeeMeta,
    type ChateauRenommee,
} from "@/registry/Meta/chateau-renommee";
import {
    getChateauVisiteMeta,
    type ChateauVisite,
} from "@/registry/Meta/chateau-visite";
import {
    getCodexIndexMeta,
    type CodexIndex,
} from "@/registry/Meta/codex-index";
import {
    getCommonArchitectureMeta,
    type CommonArchitecture,
} from "@/registry/Meta/common-architecture";
import {
    getCommonEpoqueMeta,
    type CommonEpoque,
} from "@/registry/Meta/common-epoque";
import {
    getCommonExperienceMeta,
    type CommonExperience,
} from "@/registry/Meta/common-experience";
import {
    getCommonMilieuMeta,
    type CommonMilieu,
} from "@/registry/Meta/common-milieu";
import {
    getCommonTerritoireMeta,
    type CommonTerritoire,
} from "@/registry/Meta/common-territoire";
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
import {
    getVignobleCouleurMeta,
    type VignobleCouleur,
} from "@/registry/Meta/vignoble-couleur";
import type { LRZColor } from "@/types/lrz";

export const LRZ_CODEX_INDEX_SYMBOLS = {
    chateaux: "/symbols/codex/index/chateaux.png",
    faune: "/symbols/codex/index/faune.png",
    flore: "/symbols/codex/index/flore.png",
    guinguettes: "/symbols/codex/index/guinguettes.png",
    personnages: "/symbols/codex/index/personnages.png",
    territoires: "/symbols/codex/index/territoires.png",
    "villes-villages": "/symbols/codex/index/villes-villages.png",
} as const satisfies Record<CodexIndex, string>;

export const LRZ_CHATEAU_RENOMMEE_SYMBOLS = {
    phare: "/symbols/chateau/renommee/phare.png",
    majeur: "/symbols/chateau/renommee/majeur.png",
    notable: "/symbols/chateau/renommee/notable.png",
    confidentiel: "/symbols/chateau/renommee/confidentiel.png",
} as const satisfies Record<ChateauRenommee, string>;

export type LRZChateauRenommeeSymbolSlug =
    keyof typeof LRZ_CHATEAU_RENOMMEE_SYMBOLS;

export const LRZ_CHATEAU_VISITE_SYMBOLS = {
    "ouvert au public": "/symbols/chateau/visite/ouvert-au-public.png",
    "extérieurs & parc": "/symbols/chateau/visite/exterieurs-parc.png",
    "privé, non visitable":
        "/symbols/chateau/visite/prive-non-visitable.png",
    inconnu: "/symbols/chateau/visite/inconnu.png",
} as const satisfies Record<ChateauVisite, string>;

export type LRZChateauVisiteSymbolSlug =
    keyof typeof LRZ_CHATEAU_VISITE_SYMBOLS;

export type LRZCodexIndexSymbolSlug = keyof typeof LRZ_CODEX_INDEX_SYMBOLS;

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
    medievale: "/symbols/common/architecture/medievale.png",
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

export const LRZ_COMMON_MILIEU_SYMBOLS = {
    fleuve: "/symbols/common/milieu/fleuve.png",
    riviere: "/symbols/common/milieu/riviere.png",
    ruisseau: "/symbols/common/milieu/ruisseau.png",
    source: "/symbols/common/milieu/source.png",
    canal: "/symbols/common/milieu/canal.png",
    estuaire: "/symbols/common/milieu/estuaire.png",
    "bras-mort": "/symbols/common/milieu/bras-mort.png",
    etang: "/symbols/common/milieu/etang.png",
    mare: "/symbols/common/milieu/mare.png",
    marais: "/symbols/common/milieu/marais.png",
    roseliere: "/symbols/common/milieu/roseliere.png",
    "prairie-humide": "/symbols/common/milieu/prairie-humide.png",
    berge: "/symbols/common/milieu/berge.png",
    greve: "/symbols/common/milieu/greve.png",
    ile: "/symbols/common/milieu/ile.png",
    "foret-alluviale": "/symbols/common/milieu/foret-alluviale.png",
    foret: "/symbols/common/milieu/foret.png",
    lisiere: "/symbols/common/milieu/lisiere.png",
    bocage: "/symbols/common/milieu/bocage.png",
    haie: "/symbols/common/milieu/haie.png",
    prairie: "/symbols/common/milieu/prairie.png",
    "coteau-sec": "/symbols/common/milieu/coteau-sec.png",
    "falaise-rocheuse": "/symbols/common/milieu/falaise-rocheuse.png",
    "cavite-souterraine": "/symbols/common/milieu/cavite-souterraine.png",
    friche: "/symbols/common/milieu/friche.png",
    cultures: "/symbols/common/milieu/cultures.png",
    verger: "/symbols/common/milieu/verger.png",
    vignoble: "/symbols/common/milieu/vignoble.png",
    "parc-jardin": "/symbols/common/milieu/parc-jardin.png",
    "urbain-bati": "/symbols/common/milieu/urbain-bati.png",
} as const satisfies Record<CommonMilieu, string>;

export type LRZCommonMilieuSymbolSlug = keyof typeof LRZ_COMMON_MILIEU_SYMBOLS;

export const LRZ_COMMON_EXPERIENCE_SYMBOLS = {
    "visite-libre": "/symbols/common/experience/visite-libre.png",
    "visite-guidee": "/symbols/common/experience/visite-guidee.png",
    exposition: "/symbols/common/experience/exposition.png",
    reconstitution: "/symbols/common/experience/reconstitution.png",
    demonstration: "/symbols/common/experience/demonstration.png",
    atelier: "/symbols/common/experience/atelier.png",
    "jeu-piste": "/symbols/common/experience/jeu-piste.png",
    promenade: "/symbols/common/experience/promenade.png",
    randonnee: "/symbols/common/experience/randonnee.png",
    velo: "/symbols/common/experience/velo.png",
    equitation: "/symbols/common/experience/equitation.png",
    bateau: "/symbols/common/experience/bateau.png",
    "canoe-kayak": "/symbols/common/experience/canoe-kayak.png",
    baignade: "/symbols/common/experience/baignade.png",
    peche: "/symbols/common/experience/peche.png",
    "observation-nature": "/symbols/common/experience/observation-nature.png",
    photographie: "/symbols/common/experience/photographie.png",
    contemplation: "/symbols/common/experience/contemplation.png",
    detente: "/symbols/common/experience/detente.png",
    "pique-nique": "/symbols/common/experience/pique-nique.png",
    repas: "/symbols/common/experience/repas.png",
    degustation: "/symbols/common/experience/degustation.png",
    "marche-local": "/symbols/common/experience/marche-local.png",
    concert: "/symbols/common/experience/concert.png",
    spectacle: "/symbols/common/experience/spectacle.png",
    danse: "/symbols/common/experience/danse.png",
    "fete-populaire": "/symbols/common/experience/fete-populaire.png",
    montgolfiere: "/symbols/common/experience/montgolfiere.png",
} as const satisfies Record<CommonExperience, string>;

export type LRZCommonExperienceSymbolSlug =
    keyof typeof LRZ_COMMON_EXPERIENCE_SYMBOLS;

export const LRZ_COMMON_TERRITOIRE_SYMBOLS = {
    nivernais: "/symbols/common/territoire/nivernais.png",
    orleanais: "/symbols/common/territoire/orleanais.png",
    blaisois: "/symbols/common/territoire/blaisois.png",
    touraine: "/symbols/common/territoire/touraine.png",
    chinonais: "/symbols/common/territoire/chinonais.png",
    saumurois: "/symbols/common/territoire/saumurois.png",
    anjou: "/symbols/common/territoire/anjou.png",
    "bretagne-ligerienne": "/symbols/common/territoire/bretagne-ligerienne.png",
} as const satisfies Record<CommonTerritoire, string>;

/** Dimensions réelles des blasons optimisés, utilisées pour préserver leur ratio. */
export const LRZ_COMMON_TERRITOIRE_SYMBOL_DIMENSIONS = {
    nivernais: { width: 258, height: 298 },
    orleanais: { width: 259, height: 298 },
    blaisois: { width: 246, height: 298 },
    touraine: { width: 245, height: 298 },
    chinonais: { width: 250, height: 298 },
    saumurois: { width: 238, height: 298 },
    anjou: { width: 242, height: 298 },
    "bretagne-ligerienne": { width: 242, height: 298 },
} as const satisfies Record<
    CommonTerritoire,
    { readonly width: number; readonly height: number }
>;

export type LRZCommonTerritoireSymbolSlug =
    keyof typeof LRZ_COMMON_TERRITOIRE_SYMBOLS;

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

export type LRZPersonnageCategorieSymbolSlug =
    keyof typeof LRZ_PERSONNAGE_CATEGORIE_SYMBOLS;

export const LRZ_VIGNOBLE_COULEUR_SYMBOLS = {
    "blanc sec": "/symbols/vignoble/couleur/blanc-sec.png",
    "blanc moelleux": "/symbols/vignoble/couleur/blanc-moelleux.png",
    rouge: "/symbols/vignoble/couleur/rouge.png",
    rosé: "/symbols/vignoble/couleur/rose.png",
    effervescent: "/symbols/vignoble/couleur/effervescent.png",
} as const satisfies Record<VignobleCouleur, string>;

export type LRZVignobleCouleurSymbolSlug =
    keyof typeof LRZ_VIGNOBLE_COULEUR_SYMBOLS;

/**
 * Registre des symboles illustrés du Codex.
 *
 * Les symboles sont regroupés par collection et métadonnée, comme
 * `codex.index`, `chateau.renommee`, `chateau.visite`, `faune.type`,
 * `faune.rarete`,
 * `flore.categorie`, `flore.rarete`, `common.epoque`, `common.architecture`,
 * `common.milieu`, `common.experience`, `common.territoire`,
 * `guinguette.ambience`, `personnage.categorie` et `vignoble.couleur`.
 */
export const LRZ_SYMBOLS = {
    codex: {
        index: LRZ_CODEX_INDEX_SYMBOLS,
    },
    chateau: {
        renommee: LRZ_CHATEAU_RENOMMEE_SYMBOLS,
        visite: LRZ_CHATEAU_VISITE_SYMBOLS,
    },
    common: {
        epoque: LRZ_COMMON_EPOQUE_SYMBOLS,
        architecture: LRZ_COMMON_ARCHITECTURE_SYMBOLS,
        milieu: LRZ_COMMON_MILIEU_SYMBOLS,
        experience: LRZ_COMMON_EXPERIENCE_SYMBOLS,
        territoire: LRZ_COMMON_TERRITOIRE_SYMBOLS,
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
    vignoble: {
        couleur: LRZ_VIGNOBLE_COULEUR_SYMBOLS,
    },
} as const;

export type LRZSymbolCollection = keyof typeof LRZ_SYMBOLS;

export type LRZSymbolMeta =
    | keyof typeof LRZ_SYMBOLS.codex
    | keyof typeof LRZ_SYMBOLS.chateau
    | keyof typeof LRZ_SYMBOLS.common
    | keyof typeof LRZ_SYMBOLS.faune
    | keyof typeof LRZ_SYMBOLS.flore
    | keyof typeof LRZ_SYMBOLS.guinguette
    | keyof typeof LRZ_SYMBOLS.personnage
    | keyof typeof LRZ_SYMBOLS.vignoble;

/** Retourne les valeurs illustrées disponibles pour une métadonnée. */
export function getLRZSymbolSlugs(
    collection: LRZSymbolCollection,
    meta: LRZSymbolMeta,
): string[] {
    const metas = LRZ_SYMBOLS[collection] as Record<
        string,
        Record<string, string>
    >;

    return Object.keys(metas[meta] ?? {});
}

export type LRZSymbolSlug =
    | LRZCodexIndexSymbolSlug
    | LRZChateauRenommeeSymbolSlug
    | LRZChateauVisiteSymbolSlug
    | LRZCommonEpoqueSymbolSlug
    | LRZCommonArchitectureSymbolSlug
    | LRZCommonMilieuSymbolSlug
    | LRZCommonExperienceSymbolSlug
    | LRZCommonTerritoireSymbolSlug
    | LRZFauneTypeSymbolSlug
    | LRZFauneRareteSymbolSlug
    | LRZFloreCategorieSymbolSlug
    | LRZFloreRareteSymbolSlug
    | LRZGuinguetteAmbienceSymbolSlug
    | LRZPersonnageCategorieSymbolSlug
    | LRZVignobleCouleurSymbolSlug;

export type LRZSymbolDefinition = {
    source: string;
    label: string;
    accent: string;
    color: LRZColor;
};

export type LRZSymbolLocator =
    | {
          /** Index illustrés du Codex. */
          collection: "codex";
          meta: "index";
          slug: LRZCodexIndexSymbolSlug;
      }
    | {
          /** Époques communes aux différentes collections du Codex. */
          collection: "common";
          meta: "epoque";
          slug: LRZCommonEpoqueSymbolSlug;
      }
    | {
          /** Niveaux de renommée de la collection Châteaux. */
          collection: "chateau";
          meta: "renommee";
          slug: LRZChateauRenommeeSymbolSlug;
      }
    | {
          /** Conditions de visite de la collection Châteaux. */
          collection: "chateau";
          meta: "visite";
          slug: LRZChateauVisiteSymbolSlug;
      }
    | {
          /** Courants architecturaux communs aux collections du Codex. */
          collection: "common";
          meta: "architecture";
          slug: LRZCommonArchitectureSymbolSlug;
      }
    | {
          /** Milieux naturels et anthropisés communs aux collections. */
          collection: "common";
          meta: "milieu";
          slug: LRZCommonMilieuSymbolSlug;
      }
    | {
          /** Expériences proposées à travers les collections du Codex. */
          collection: "common";
          meta: "experience";
          slug: LRZCommonExperienceSymbolSlug;
      }
    | {
          /** Territoires ligériens communs aux collections du Codex. */
          collection: "common";
          meta: "territoire";
          slug: LRZCommonTerritoireSymbolSlug;
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
          slug: LRZPersonnageCategorieSymbolSlug;
      }
    | {
          /** Couleurs de vin de la collection Vignobles. */
          collection: "vignoble";
          meta: "couleur";
          slug: LRZVignobleCouleurSymbolSlug;
      };

export function isLRZCodexIndexSymbolSlug(
    value: string,
): value is LRZCodexIndexSymbolSlug {
    return Object.hasOwn(LRZ_CODEX_INDEX_SYMBOLS, value);
}

export function getLRZSymbolSource(
    collection: LRZSymbolCollection,
    meta: LRZSymbolMeta | undefined,
    slug: string,
): string | undefined {
    if (
        collection === "codex" &&
        meta === "index" &&
        isLRZCodexIndexSymbolSlug(slug)
    ) {
        return LRZ_SYMBOLS.codex.index[slug];
    }

    if (
        collection === "chateau" &&
        meta === "renommee" &&
        Object.hasOwn(LRZ_SYMBOLS.chateau.renommee, slug)
    ) {
        return LRZ_SYMBOLS.chateau.renommee[
            slug as LRZChateauRenommeeSymbolSlug
        ];
    }

    if (
        collection === "chateau" &&
        meta === "visite" &&
        Object.hasOwn(LRZ_SYMBOLS.chateau.visite, slug)
    ) {
        return LRZ_SYMBOLS.chateau.visite[slug as LRZChateauVisiteSymbolSlug];
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
        collection === "common" &&
        meta === "milieu" &&
        Object.hasOwn(LRZ_SYMBOLS.common.milieu, slug)
    ) {
        return LRZ_SYMBOLS.common.milieu[slug as LRZCommonMilieuSymbolSlug];
    }

    if (
        collection === "common" &&
        meta === "experience" &&
        Object.hasOwn(LRZ_SYMBOLS.common.experience, slug)
    ) {
        return LRZ_SYMBOLS.common.experience[
            slug as LRZCommonExperienceSymbolSlug
        ];
    }

    if (
        collection === "common" &&
        meta === "territoire" &&
        Object.hasOwn(LRZ_SYMBOLS.common.territoire, slug)
    ) {
        return LRZ_SYMBOLS.common.territoire[
            slug as LRZCommonTerritoireSymbolSlug
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
            slug as LRZPersonnageCategorieSymbolSlug
        ];
    }

    if (
        collection === "vignoble" &&
        meta === "couleur" &&
        Object.hasOwn(LRZ_SYMBOLS.vignoble.couleur, slug)
    ) {
        return LRZ_SYMBOLS.vignoble.couleur[
            slug as LRZVignobleCouleurSymbolSlug
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

    if (collection === "codex" && meta === "index") {
        const index = getCodexIndexMeta(slug);

        return index
            ? {
                  source,
                  label: index.label,
                  accent: getLRZColorValue(index.color),
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

    if (collection === "chateau" && meta === "visite") {
        const visitingCondition = getChateauVisiteMeta(slug);

        return visitingCondition
            ? {
                  source,
                  label: visitingCondition.label,
                  accent: getLRZColorValue(visitingCondition.color),
                  color: visitingCondition.color,
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

    if (collection === "common" && meta === "milieu") {
        const environment = getCommonMilieuMeta(slug);

        return environment
            ? {
                  source,
                  label: environment.label,
                  accent: getLRZColorValue(environment.color),
                  color: environment.color,
              }
            : undefined;
    }

    if (collection === "common" && meta === "experience") {
        const experience = getCommonExperienceMeta(slug);

        return experience
            ? {
                  source,
                  label: experience.label,
                  accent: getLRZColorValue(experience.color),
                  color: experience.color,
              }
            : undefined;
    }

    if (collection === "common" && meta === "territoire") {
        const territory = getCommonTerritoireMeta(slug);

        return territory
            ? {
                  source,
                  label: territory.label,
                  accent: getLRZColorValue(territory.color),
                  color: territory.color,
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

    if (collection === "vignoble" && meta === "couleur") {
        const wineColor = getVignobleCouleurMeta(slug);

        return wineColor
            ? {
                  source,
                  label: wineColor.label,
                  accent: getLRZColorValue(wineColor.color),
                  color: wineColor.color,
              }
            : undefined;
    }

    if (collection === "chateau" && meta === "renommee") {
        const renown = getChateauRenommeeMeta(slug);

        return renown
            ? {
                  source,
                  label: renown.label,
                  accent: getLRZColorValue(renown.color),
                  color: renown.color,
              }
            : undefined;
    }

    return undefined;
}
