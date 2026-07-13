// src/types/mot.ts
export type MotCategorie = "relief" | "bateau" | "ouvrage" | "métier" | "eau";
export type MotUsage = "vivant" | "rare" | "oublié";
export type MotRegistre = "courant" | "technique" | "toponymique";
export type MotGenre = "masculin" | "féminin" | "—";

export interface Mot {
    emoji: string;
    customEmoji?: string;
    slug: string;
    terme: string;
    autresFormes: string[];
    genre: MotGenre;
    sousTitre: string;
    categorie: MotCategorie;
    definition: string;
    etymologie?: string;
    exemple?: string;
    usage: MotUsage;
    registre: MotRegistre;
}
