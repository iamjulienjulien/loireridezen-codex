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
    getCommonGeneralMeta,
    type CommonGeneral,
} from "@/registry/Meta/common-general";
import {
    getCommonMilieuMeta,
    type CommonMilieu,
} from "@/registry/Meta/common-milieu";
import {
    getCommonTerritoireMeta,
    type CommonTerritoire,
} from "@/registry/Meta/common-territoire";
import {
    getCommonWebsiteMeta,
    type CommonWebsite,
} from "@/registry/Meta/common-website";
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
    getGuinguetteActiviteMeta,
    type GuinguetteActivite,
} from "@/registry/Meta/guinguette-activite";
import {
    getVignobleAOCMeta,
    type VignobleAOC,
} from "@/registry/Meta/vignoble-appellation";
import {
    getVignobleCepageMeta,
    type VignobleCepage,
} from "@/registry/Meta/vignoble-cepage";
import {
    getVignobleCouleurMeta,
    type VignobleCouleur,
} from "@/registry/Meta/vignoble-couleur";
import {
    getVignobleNotorieteMeta,
    type VignobleNotoriete,
} from "@/registry/Meta/vignoble-notoriete";
import {
    getVignobleTerroirMeta,
    type VignobleTerroir,
} from "@/registry/Meta/vignoble-terroir";
import type { LRZColor } from "@/types/lrz";

export const LRZ_CODEX_INDEX_SYMBOLS = {
    chateaux: "/symbols/codex/index/chateaux.png",
    faune: "/symbols/codex/index/faune.png",
    flore: "/symbols/codex/index/flore.png",
    guinguettes: "/symbols/codex/index/guinguettes.png",
    personnages: "/symbols/codex/index/personnages.png",
    territoires: "/symbols/codex/index/territoires.png",
    "villes-villages": "/symbols/codex/index/villes-villages.png",
    vignobles: "/symbols/codex/index/vignobles.png",
    vocabulaire: "/symbols/codex/index/vocabulaire.png",
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
    "privé, non visitable": "/symbols/chateau/visite/prive-non-visitable.png",
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

export const LRZ_COMMON_GENERAL_SYMBOLS = {
    atlas: "/symbols/common/general/atlas.png",
    explorer: "/symbols/common/general/explorer.png",
    observer: "/symbols/common/general/observer.png",
    raconter: "/symbols/common/general/raconter.png",
    relier: "/symbols/common/general/relier.png",
    chemin: "/symbols/common/general/chemin.png",
    repere: "/symbols/common/general/repere.png",
    sources: "/symbols/common/general/sources.png",
    mouvement: "/symbols/common/general/mouvement.png",
    horizon: "/symbols/common/general/horizon.png",
    partager: "/symbols/common/general/partager.png",
} as const satisfies Record<CommonGeneral, string>;

export type LRZCommonGeneralSymbolSlug =
    keyof typeof LRZ_COMMON_GENERAL_SYMBOLS;

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

export const LRZ_COMMON_WEBSITE_SYMBOLS = {
    hub: "/symbols/common/website/hub.png",
    instagram: "/symbols/common/website/instagram.png",
    passeport: "/symbols/common/website/passeport.png",
    codex: "/symbols/common/website/codex.png",
    carte: "/symbols/common/website/carte.png",
    camp: "/symbols/common/website/camp.png",
} as const satisfies Record<CommonWebsite, string>;

export type LRZCommonWebsiteSymbolSlug =
    keyof typeof LRZ_COMMON_WEBSITE_SYMBOLS;

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

export const LRZ_GUINGUETTE_ACTIVITE_SYMBOLS = {
    bar: "/symbols/guinguette/activite/bar.png",
    restauration: "/symbols/guinguette/activite/restauration.png",
    "petite-restauration":
        "/symbols/guinguette/activite/petite-restauration.png",
    "vente-a-emporter": "/symbols/guinguette/activite/vente-a-emporter.png",
    brunch: "/symbols/guinguette/activite/brunch.png",
    glacier: "/symbols/guinguette/activite/glacier.png",
    "produits-locaux": "/symbols/guinguette/activite/produits-locaux.png",
    "options-vegetariennes":
        "/symbols/guinguette/activite/options-vegetariennes.png",
    "menu-enfant": "/symbols/guinguette/activite/menu-enfant.png",
    reservation: "/symbols/guinguette/activite/reservation.png",
    groupes: "/symbols/guinguette/activite/groupes.png",
    privatisation: "/symbols/guinguette/activite/privatisation.png",
    "terrasse-couverte": "/symbols/guinguette/activite/terrasse-couverte.png",
    "espace-interieur": "/symbols/guinguette/activite/espace-interieur.png",
    "accueil-enfants": "/symbols/guinguette/activite/accueil-enfants.png",
    "animaux-acceptes": "/symbols/guinguette/activite/animaux-acceptes.png",
    "acces-pmr": "/symbols/guinguette/activite/acces-pmr.png",
    toilettes: "/symbols/guinguette/activite/toilettes.png",
    "table-a-langer": "/symbols/guinguette/activite/table-a-langer.png",
    "point-eau": "/symbols/guinguette/activite/point-eau.png",
    wifi: "/symbols/guinguette/activite/wifi.png",
    "recharge-telephone": "/symbols/guinguette/activite/recharge-telephone.png",
    consigne: "/symbols/guinguette/activite/consigne.png",
    parking: "/symbols/guinguette/activite/parking.png",
    "paiement-carte": "/symbols/guinguette/activite/paiement-carte.png",
    "stationnement-velo": "/symbols/guinguette/activite/stationnement-velo.png",
    "station-reparation": "/symbols/guinguette/activite/station-reparation.png",
    "recharge-vae": "/symbols/guinguette/activite/recharge-vae.png",
    "location-velo": "/symbols/guinguette/activite/location-velo.png",
    "accueil-velo": "/symbols/guinguette/activite/accueil-velo.png",
    "bagages-cyclistes": "/symbols/guinguette/activite/bagages-cyclistes.png",
    ponton: "/symbols/guinguette/activite/ponton.png",
    "halte-nautique": "/symbols/guinguette/activite/halte-nautique.png",
    amarrage: "/symbols/guinguette/activite/amarrage.png",
    "location-nautique": "/symbols/guinguette/activite/location-nautique.png",
    "mise-a-eau": "/symbols/guinguette/activite/mise-a-eau.png",
    "piste-de-danse": "/symbols/guinguette/activite/piste-de-danse.png",
    scene: "/symbols/guinguette/activite/scene.png",
    petanque: "/symbols/guinguette/activite/petanque.png",
    "jeux-de-societe": "/symbols/guinguette/activite/jeux-de-societe.png",
    "jeux-en-bois": "/symbols/guinguette/activite/jeux-en-bois.png",
    "aire-de-jeux": "/symbols/guinguette/activite/aire-de-jeux.png",
    bibliotheque: "/symbols/guinguette/activite/bibliotheque.png",
} as const satisfies Record<GuinguetteActivite, string>;

export type LRZGuinguetteActiviteSymbolSlug =
    keyof typeof LRZ_GUINGUETTE_ACTIVITE_SYMBOLS;

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

export const LRZ_VIGNOBLE_APPELLATION_SYMBOLS = {
    "AOC communale": "/symbols/vignoble/appellation/aoc-communale.png",
    "AOC régionale": "/symbols/vignoble/appellation/aoc-regionale.png",
    IGP: "/symbols/vignoble/appellation/igp.png",
} as const satisfies Record<VignobleAOC, string>;

export type LRZVignobleAppellationSymbolSlug =
    keyof typeof LRZ_VIGNOBLE_APPELLATION_SYMBOLS;

export const LRZ_VIGNOBLE_CEPAGE_SYMBOLS = {
    chenin: "/symbols/vignoble/cepage/chenin.png",
    "sauvignon-blanc": "/symbols/vignoble/cepage/sauvignon-blanc.png",
    "melon-de-bourgogne": "/symbols/vignoble/cepage/melon-de-bourgogne.png",
    chardonnay: "/symbols/vignoble/cepage/chardonnay.png",
    "folle-blanche": "/symbols/vignoble/cepage/folle-blanche.png",
    romorantin: "/symbols/vignoble/cepage/romorantin.png",
    "menu-pineau": "/symbols/vignoble/cepage/menu-pineau.png",
    tressallier: "/symbols/vignoble/cepage/tressallier.png",
    chasselas: "/symbols/vignoble/cepage/chasselas.png",
    "cabernet-franc": "/symbols/vignoble/cepage/cabernet-franc.png",
    "cabernet-sauvignon": "/symbols/vignoble/cepage/cabernet-sauvignon.png",
    "pinot-noir": "/symbols/vignoble/cepage/pinot-noir.png",
    "pinot-gris": "/symbols/vignoble/cepage/pinot-gris.png",
    "pinot-meunier": "/symbols/vignoble/cepage/pinot-meunier.png",
    gamay: "/symbols/vignoble/cepage/gamay.png",
    "grolleau-noir": "/symbols/vignoble/cepage/grolleau-noir.png",
    "grolleau-gris": "/symbols/vignoble/cepage/grolleau-gris.png",
    "pineau-daunis": "/symbols/vignoble/cepage/pineau-daunis.png",
    cot: "/symbols/vignoble/cepage/cot.png",
} as const satisfies Record<VignobleCepage, string>;

export type LRZVignobleCepageSymbolSlug =
    keyof typeof LRZ_VIGNOBLE_CEPAGE_SYMBOLS;

export const LRZ_VIGNOBLE_NOTORIETE_SYMBOLS = {
    phare: "/symbols/vignoble/notoriete/phare.png",
    majeur: "/symbols/vignoble/notoriete/majeur.png",
    notable: "/symbols/vignoble/notoriete/notable.png",
    confidentiel: "/symbols/vignoble/notoriete/confidentiel.png",
} as const satisfies Record<VignobleNotoriete, string>;

export type LRZVignobleNotorieteSymbolSlug =
    keyof typeof LRZ_VIGNOBLE_NOTORIETE_SYMBOLS;

export const LRZ_VIGNOBLE_TERROIR_SYMBOLS = {
    tuffeau: "/symbols/vignoble/terroir/tuffeau.png",
    calcaire: "/symbols/vignoble/terroir/calcaire.png",
    "marne-calcaire": "/symbols/vignoble/terroir/marne-calcaire.png",
    "argilo-calcaire": "/symbols/vignoble/terroir/argilo-calcaire.png",
    "argile-a-silex": "/symbols/vignoble/terroir/argile-a-silex.png",
    schiste: "/symbols/vignoble/terroir/schiste.png",
    micaschiste: "/symbols/vignoble/terroir/micaschiste.png",
    gneiss: "/symbols/vignoble/terroir/gneiss.png",
    granite: "/symbols/vignoble/terroir/granite.png",
    gabbro: "/symbols/vignoble/terroir/gabbro.png",
    sable: "/symbols/vignoble/terroir/sable.png",
    graviers: "/symbols/vignoble/terroir/graviers.png",
    alluvions: "/symbols/vignoble/terroir/alluvions.png",
    faluns: "/symbols/vignoble/terroir/faluns.png",
} as const satisfies Record<VignobleTerroir, string>;

export type LRZVignobleTerroirSymbolSlug =
    keyof typeof LRZ_VIGNOBLE_TERROIR_SYMBOLS;

/**
 * Registre des symboles illustrés du Codex.
 *
 * Les symboles sont regroupés par collection et métadonnée, comme
 * `codex.index`, `chateau.renommee`, `chateau.visite`, `faune.type`,
 * `faune.rarete`,
 * `flore.categorie`, `flore.rarete`, `common.epoque`, `common.architecture`,
 * `common.milieu`, `common.experience`, `common.general`, `common.territoire`,
 * `common.website`,
 * `guinguette.ambience`, `guinguette.activite`, `personnage.categorie`,
 * `vignoble.appellation`,
 * `vignoble.cepage`, `vignoble.couleur`, `vignoble.notoriete` et
 * `vignoble.terroir`.
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
        general: LRZ_COMMON_GENERAL_SYMBOLS,
        territoire: LRZ_COMMON_TERRITOIRE_SYMBOLS,
        website: LRZ_COMMON_WEBSITE_SYMBOLS,
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
        activite: LRZ_GUINGUETTE_ACTIVITE_SYMBOLS,
    },
    personnage: {
        categorie: LRZ_PERSONNAGE_CATEGORIE_SYMBOLS,
    },
    vignoble: {
        appellation: LRZ_VIGNOBLE_APPELLATION_SYMBOLS,
        cepage: LRZ_VIGNOBLE_CEPAGE_SYMBOLS,
        couleur: LRZ_VIGNOBLE_COULEUR_SYMBOLS,
        notoriete: LRZ_VIGNOBLE_NOTORIETE_SYMBOLS,
        terroir: LRZ_VIGNOBLE_TERROIR_SYMBOLS,
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
    | LRZCommonGeneralSymbolSlug
    | LRZCommonTerritoireSymbolSlug
    | LRZCommonWebsiteSymbolSlug
    | LRZFauneTypeSymbolSlug
    | LRZFauneRareteSymbolSlug
    | LRZFloreCategorieSymbolSlug
    | LRZFloreRareteSymbolSlug
    | LRZGuinguetteAmbienceSymbolSlug
    | LRZGuinguetteActiviteSymbolSlug
    | LRZPersonnageCategorieSymbolSlug
    | LRZVignobleAppellationSymbolSlug
    | LRZVignobleCepageSymbolSlug
    | LRZVignobleCouleurSymbolSlug
    | LRZVignobleNotorieteSymbolSlug
    | LRZVignobleTerroirSymbolSlug;

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
          /** Notions éditoriales transversales du Codex. */
          collection: "common";
          meta: "general";
          slug: LRZCommonGeneralSymbolSlug;
      }
    | {
          /** Territoires ligériens communs aux collections du Codex. */
          collection: "common";
          meta: "territoire";
          slug: LRZCommonTerritoireSymbolSlug;
      }
    | {
          /** Sites et projets de l’écosystème Loire Ride Zen. */
          collection: "common";
          meta: "website";
          slug: LRZCommonWebsiteSymbolSlug;
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
          /** Activités, services et équipements des guinguettes. */
          collection: "guinguette";
          meta: "activite";
          slug: LRZGuinguetteActiviteSymbolSlug;
      }
    | {
          /** Collection de symboles classés par métadonnée. */
          collection: "personnage";
          meta: "categorie";
          slug: LRZPersonnageCategorieSymbolSlug;
      }
    | {
          /** Appellations officielles de la collection Vignobles. */
          collection: "vignoble";
          meta: "appellation";
          slug: LRZVignobleAppellationSymbolSlug;
      }
    | {
          /** Cépages illustrés de la collection Vignobles. */
          collection: "vignoble";
          meta: "cepage";
          slug: LRZVignobleCepageSymbolSlug;
      }
    | {
          /** Couleurs de vin de la collection Vignobles. */
          collection: "vignoble";
          meta: "couleur";
          slug: LRZVignobleCouleurSymbolSlug;
      }
    | {
          /** Nature des sols de la collection Vignobles. */
          collection: "vignoble";
          meta: "terroir";
          slug: LRZVignobleTerroirSymbolSlug;
      }
    | {
          /** Niveaux de notoriété de la collection Vignobles. */
          collection: "vignoble";
          meta: "notoriete";
          slug: LRZVignobleNotorieteSymbolSlug;
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
        meta === "general" &&
        Object.hasOwn(LRZ_SYMBOLS.common.general, slug)
    ) {
        return LRZ_SYMBOLS.common.general[slug as LRZCommonGeneralSymbolSlug];
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
        collection === "common" &&
        meta === "website" &&
        Object.hasOwn(LRZ_SYMBOLS.common.website, slug)
    ) {
        return LRZ_SYMBOLS.common.website[slug as LRZCommonWebsiteSymbolSlug];
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
        collection === "guinguette" &&
        meta === "activite" &&
        Object.hasOwn(LRZ_SYMBOLS.guinguette.activite, slug)
    ) {
        return LRZ_SYMBOLS.guinguette.activite[
            slug as LRZGuinguetteActiviteSymbolSlug
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
        meta === "appellation" &&
        Object.hasOwn(LRZ_SYMBOLS.vignoble.appellation, slug)
    ) {
        return LRZ_SYMBOLS.vignoble.appellation[
            slug as LRZVignobleAppellationSymbolSlug
        ];
    }

    if (
        collection === "vignoble" &&
        meta === "cepage" &&
        Object.hasOwn(LRZ_SYMBOLS.vignoble.cepage, slug)
    ) {
        return LRZ_SYMBOLS.vignoble.cepage[slug as LRZVignobleCepageSymbolSlug];
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

    if (
        collection === "vignoble" &&
        meta === "terroir" &&
        Object.hasOwn(LRZ_SYMBOLS.vignoble.terroir, slug)
    ) {
        return LRZ_SYMBOLS.vignoble.terroir[
            slug as LRZVignobleTerroirSymbolSlug
        ];
    }

    if (
        collection === "vignoble" &&
        meta === "notoriete" &&
        Object.hasOwn(LRZ_SYMBOLS.vignoble.notoriete, slug)
    ) {
        return LRZ_SYMBOLS.vignoble.notoriete[
            slug as LRZVignobleNotorieteSymbolSlug
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

    if (collection === "common" && meta === "general") {
        const general = getCommonGeneralMeta(slug);

        return general
            ? {
                  source,
                  label: general.label,
                  accent: getLRZColorValue(general.color),
                  color: general.color,
              }
            : undefined;
    }

    if (collection === "common" && meta === "website") {
        const website = getCommonWebsiteMeta(slug);

        return website
            ? {
                  source,
                  label: website.label,
                  accent: getLRZColorValue(website.color),
                  color: website.color,
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

    if (collection === "guinguette" && meta === "activite") {
        const activity = getGuinguetteActiviteMeta(slug);

        return activity
            ? {
                  source,
                  label: activity.label,
                  accent: getLRZColorValue(activity.color),
                  color: activity.color,
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

    if (collection === "vignoble" && meta === "cepage") {
        const grapeVariety = getVignobleCepageMeta(slug);

        return grapeVariety
            ? {
                  source,
                  label: grapeVariety.label,
                  accent: getLRZColorValue(grapeVariety.color),
                  color: grapeVariety.color,
              }
            : undefined;
    }

    if (collection === "vignoble" && meta === "appellation") {
        const appellation = getVignobleAOCMeta(slug);

        return appellation
            ? {
                  source,
                  label: appellation.label,
                  accent: getLRZColorValue(appellation.color),
                  color: appellation.color,
              }
            : undefined;
    }

    if (collection === "vignoble" && meta === "terroir") {
        const terroir = getVignobleTerroirMeta(slug);

        return terroir
            ? {
                  source,
                  label: terroir.label,
                  accent: getLRZColorValue(terroir.color),
                  color: terroir.color,
              }
            : undefined;
    }

    if (collection === "vignoble" && meta === "notoriete") {
        const notoriety = getVignobleNotorieteMeta(slug);

        return notoriety
            ? {
                  source,
                  label: notoriety.label,
                  accent: getLRZColorValue(notoriety.color),
                  color: notoriety.color,
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
