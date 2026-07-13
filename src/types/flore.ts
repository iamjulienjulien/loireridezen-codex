// src/types/flore.ts
export type FloreCategorie =
    | "arbre"
    | "arbuste"
    | "herbacée"
    | "graminée" // graminées & hélophytes du bord de l'eau
    | "aquatique"
    | "fougère"
    | "grimpante";

export type FloreRarete = "commun" | "régulier" | "rare" | "trésor";

/** Origine biogéographique — l'axe clé sur la Loire. */
export type FloreIndigenat = "indigène" | "exotique" | "envahissante";
export type FloreProtection = "nationale" | "régionale" | "aucune";

export interface FloreStatut {
    indigenat: FloreIndigenat;
    protection: FloreProtection;
    /** Précision : endémisme ligérien, EEE réglementée, Directive Habitats… */
    note?: string;
}

export interface Flore {
    emoji: string;
    customEmoji?: string;
    slug: string;
    categorie: FloreCategorie;
    nomCommun: string;
    autresNoms: string[];
    nomScientifique: string;
    regne: string; // Plantae
    famille: string; // Salicaceae, Poaceae…
    rangTaxinomique: string;
    statut: FloreStatut;
    rarete: FloreRarete;
    milieu: string; // ripisylve, grève, prairie inondable, roselière…
    floraison: string; // saison de floraison / d'observation
    taille: string; // port & hauteur, ex. « arbre, 20–30 m »
    sousTitre: string;

    // Champs enrichis (optionnels) — fiche botanique détaillée.
    usages?: string;
    anecdote?: string;
}

// — exemple renseigné —
export const FLORE: Flore[] = [
    {
        emoji: "🌳",
        slug: "peuplier-noir",
        categorie: "arbre",
        nomCommun: "Peuplier noir",
        autresNoms: ["Liard", "Peuplier commun"],
        nomScientifique: "Populus nigra",
        regne: "Plantae",
        famille: "Salicaceae",
        rangTaxinomique:
            "Plantae › Tracheophyta › Magnoliopsida › Malpighiales › Salicaceae › Populus › nigra",
        statut: {
            indigenat: "indigène",
            protection: "aucune",
            note: "Arbre emblématique de la ripisylve ligérienne ; le peuplier noir sauvage régresse, menacé par l'hybridation et la perte de grèves.",
        },
        rarete: "commun",
        milieu: "Ripisylve & grève",
        floraison: "Mars–avril (chatons)",
        taille: "Arbre, 20–30 m",
        sousTitre: "les racines dans la grève",
    },
];
