// src/types/vignoble.ts
// Vignoble & AOC ligérien — sibling de Chateau/Flore (même grammaire de codex).

/** Type de vin dominant de l'appellation — l'axe principal. */
export type VignobleCouleur =
    | "blanc sec"
    | "blanc moelleux" // demi-sec à liquoreux
    | "rouge"
    | "rosé"
    | "effervescent"; // fines bulles / méthode traditionnelle

/** Notoriété sur le fil — miroir de la rareté / renommée. */
export type VignobleNotoriete = "phare" | "majeur" | "notable" | "confidentiel";

/** Niveau de l'appellation — miroir du Monument historique (classé/inscrit). */
export type VignobleAOC = "AOC communale" | "AOC régionale" | "IGP";

/** Grande région viticole de la Loire, d'amont en aval — miroir du UNESCO (in/out). */
export type VignobleRive =
    | "Centre-Loire" // Sancerre, Pouilly… (amont)
    | "Touraine" // Vouvray, Chinon, Bourgueil…
    | "Anjou-Saumur" // Savennières, Saumur, Coteaux du Layon…
    | "Pays nantais"; // Muscadet (aval)

export interface VignobleAppellation {
    niveau: VignobleAOC;
    /** Année de reconnaissance en AOC, si connue. */
    depuis?: string;
    /** Précision : cru, mention, particularité réglementaire. */
    note?: string;
}

/** Coordonnées du cœur du vignoble — aligné sur le champ geopoint de LRZField. */
export interface VignobleCoordonnees {
    lat: number;
    lng: number;
}

export interface Vignoble {
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
    couleur: VignobleCouleur;
    rive: VignobleRive;
    /** Département(s) principal(aux), ex. « Cher (18) », « Indre-et-Loire (37) ». */
    departement: string;
    coordonnees: VignobleCoordonnees;

    // ── Vin ──
    /** Cépage(s) dominant(s), ex. « Chenin », « Cabernet franc ». */
    cepages: string[];
    /** Style / profil en clair, ex. « sec, minéral, silex ». */
    style: string;
    /** Accord ligérien type (optionnel). */
    accord?: string;

    // ── Statut ──
    appellation: VignobleAppellation;
    notoriete: VignobleNotoriete;
}

// — exemple renseigné —
export const VIGNOBLES: Vignoble[] = [
    {
        emoji: "🍷",
        slug: "sancerre",
        nom: "Sancerre",
        autresNoms: [],
        sousTitre: "le silex des collines de l'amont",
        resume: "Blanc de sauvignon minéral et tendu, sur les coteaux calcaires et siliceux du Cher.",
        couleur: "blanc sec",
        rive: "Centre-Loire",
        departement: "Cher (18)",
        coordonnees: { lat: 47.3306, lng: 2.8386 },
        cepages: ["Sauvignon blanc", "Pinot noir (rouge & rosé)"],
        style: "Sec, vif, minéral (silex)",
        accord: "Crottin de Chavignol",
        appellation: {
            niveau: "AOC communale",
            depuis: "1936",
            note: "AOC pour le blanc en 1936, étendue aux rouge et rosé (pinot noir) en 1959.",
        },
        notoriete: "phare",
    },
];
