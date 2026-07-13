// src/types/patrimoine.ts
// Petit patrimoine du fil — sibling du codex, version fleuve-travail.
// L'inverse des châteaux : ce que l'homme a bâti pour vivre AVEC le fleuve.

/** Type d'ouvrage — l'axe principal. */
export type PatrimoineType =
    | "moulin" // moulins à eau, bateaux-moulins
    | "pont" // ponts de pierre, suspendus, bacs à traille
    | "phare" // phares, feux et balises de Loire
    | "port" // cales, quais, ports, embarcadères
    | "eau" // lavoirs, fontaines, puits, canaux
    | "artisanal" // fours à chaux, tuileries, forges, séchoirs
    | "mémoriel" // calvaires de mariniers, croix, échelles de crue, bornes
    | "défensif"; // tours de guet, redoutes, corps de garde du fleuve

/** État de conservation — miroir mémoriel (comme l'usage du lexique). */
export type PatrimoineEtat =
    | "en usage" // debout et toujours vivant / fonctionnel
    | "restauré" // sauvé, entretenu, visitable
    | "vestige" // ruine, trace, subsistance partielle
    | "disparu"; // n'existe plus que dans les archives et la mémoire

/** Matériau dominant — première pastille, très ligérienne. */
export type PatrimoineMateriau =
    | "tuffeau" // la pierre blanche du val
    | "ardoise" // les toits bleus de l'Anjou
    | "brique" // la brique rose de l'amont
    | "schiste" // le sombre de l'Anjou noir
    | "silex" // le roussard, la grison
    | "bois" // pans de bois, charpentes, bateaux-moulins
    | "métal" // fonte et acier des ponts du XIXᵉ
    | "mixte"; // plusieurs matériaux mêlés

/** Classement patrimonial — seconde pastille (comme les châteaux). */
export type PatrimoineProtection =
    "classé" | "inscrit" | "labellisé" | "aucune";

/** Coordonnées — aligné sur le champ geopoint de LRZField. */
export interface PatrimoineCoordonnees {
    lat: number;
    lng: number;
}

export interface Patrimoine {
    /** À remplir : l'illustration LRZ (croquis d'élévation à terme). */
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

    type: PatrimoineType;

    // ── Situation ──
    commune: string;
    /** Département avec numéro, ex. « Maine-et-Loire (49) ». */
    departement: string;
    coordonnees: PatrimoineCoordonnees;
    /** Position par rapport à l'eau : « sur la Loire », « sur le Cher », « dans le lit »… */
    situation: string;

    // ── Édifice ──
    /** Époque ou période, ex. « XVᵉ s. », « 1847 », « Moyen Âge ». */
    epoque: string;
    materiau: PatrimoineMateriau;
    /** Fonction d'origine en clair, ex. « moudre le grain », « passer d'une rive à l'autre ». */
    fonction: string;

    // ── Statut ──
    etat: PatrimoineEtat;
    protection: PatrimoineProtection;
    /** Note libre : histoire, anecdote, précision d'état (optionnel). */
    note?: string;
}

// — exemple renseigné —
export const PATRIMOINE: Patrimoine[] = [
    {
        emoji: "🏛",
        slug: "cale-de-montjean-sur-loire",
        nom: "Cale de Montjean-sur-Loire",
        autresNoms: [],
        sousTitre: "l'escalier du port des mariniers",
        resume: "Ancienne cale marinière du bourg perché de Montjean, cœur d'un port qui vivait du chaux, du charbon et du chanvre.",
        type: "port",
        commune: "Mauges-sur-Loire",
        departement: "Maine-et-Loire (49)",
        coordonnees: { lat: 47.3921, lng: -0.862 },
        situation: "Sur la Loire, rive gauche",
        epoque: "XIXᵉ s.",
        materiau: "schiste",
        fonction: "Charger et décharger les chalands du port marinier",
        etat: "restauré",
        protection: "aucune",
        note: "Le site conserve fours à chaux, cale et musée de la marine (Cap Loire).",
    },
];
