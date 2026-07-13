export type FauneType =
    "oiseau" | "mammifère" | "poisson" | "reptile" | "amphibien" | "insecte";
export type FauneRarete = "commun" | "régulier" | "rare" | "trésor";
export type FauneStatut = "LC" | "NT" | "VU" | "EN" | "CR" | "NA";

export interface FauneConservation {
    monde: FauneStatut;
    france: FauneStatut;
    note?: string;
}

export interface FauneIdentification {
    longueur?: string;
    hauteur?: string;
    envergure?: string;
    poids?: string;
    silhouette: string;
    couleurs: string[];
    dimorphisme: string;
}

export interface FauneEspece {
    emoji: string;
    customEmoji?: string;
    type: FauneType;
    nomCommun: string;
    autresNoms: string[];
    nomScientifique: string;
    regne: string;
    classe: string;
    famille: string;
    rangTaxinomique: string;
    identification: FauneIdentification;
    conservation: FauneConservation;
    rarete: FauneRarete;
    milieu: string;
    periode: string;
    sousTitre: string;

    // Champs enrichis (optionnels) — fiche naturaliste détaillée.
    taille?: string;
    poids?: string;
    longevite?: string;
    regime?: string;
    anecdote?: string;
    rectEmoji?: boolean;
}

export type FauneCouleur =
    | "argent"
    | "beige"
    | "blanc"
    | "blanc gris"
    | "bleu"
    | "bleu gris"
    | "bleu métallique"
    | "bleu turquoise"
    | "brun"
    | "brun foncé"
    | "brun roux"
    | "crème"
    | "fauve"
    | "gris"
    | "gris ardoise"
    | "gris brun"
    | "jaune"
    | "noir"
    | "ocre"
    | "orange"
    | "orange cuivré"
    | "rouge"
    | "roux"
    | "vert"
    | "vert métallisé"
    | "vert olive"
    | "vert vif";
