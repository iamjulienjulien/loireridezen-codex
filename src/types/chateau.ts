// src/types/chateau.ts
// Château ligérien — sibling de FauneEspece (même grammaire de codex).

/** Époque dominante. Un château en cumule souvent ; `construction` porte le détail. */
export type ChateauEpoque =
    "Médiéval" | "Renaissance" | "Classique" | "Éclectique";

/** Renommée sur le fil — miroir de la rareté de la faune. */
export type ChateauRenommee = "phare" | "majeur" | "notable" | "confidentiel";

/** Ouverture au visiteur. */
export type ChateauVisite =
    "ouvert au public" | "extérieurs & parc" | "privé, non visitable";

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

export interface Chateau {
    /** À remplir : l'emoji custom LRZ. */
    emoji: string;
    customEmoji?: string;
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
}

export const CHATEAUX: Chateau[] = [
    // — exemple renseigné —
    {
        emoji: "🏰",
        slug: "chateau-de-chambord",
        nom: "Château de Chambord",
        autresNoms: [],
        sousTitre: "le rêve de pierre de François Iᵉʳ",
        resume: "Le plus vaste des châteaux de la Loire, manifeste de la première Renaissance française.",
        commune: "Chambord",
        departement: "Loir-et-Cher (41)",
        coordonnees: { lat: 47.6161, lng: 1.517 },
        riviere: "Cosson",
        epoque: "Renaissance",
        style: "Première Renaissance française",
        construction: "1519–1547",
        commanditaire: "François Iᵉʳ",
        protection: {
            monumentHistorique: "classé",
            unesco: true,
            note: "Inscrit au patrimoine mondial de l'UNESCO en 1981 ; compris dans le Val de Loire (2000).",
        },
        renommee: "phare",
        visite: "ouvert au public",
    },
];
