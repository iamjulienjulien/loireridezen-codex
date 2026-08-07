// src/types/personnage.ts

import type { LRZColor } from "@/types/lrz";

export type ImportanceRelation = "majeur" | "notable" | "secondaire";

export type NiveauCertitude = "etabli" | "tradition";

export type TypeRelationPersonnage =
    | "commande"
    | "construction"
    | "propriete"
    | "residence"
    | "sejour"
    | "visite"
    | "captivite"
    | "protection"
    | "restauration"
    | "inspiration"
    | "evocation_litteraire"
    | "architecture"
    | "performance"
    | "inhumation"
    | "evenement"
    | "fondation"
    | "gestion"
    | "contexte";

export type CategoriePersonnage = {
    slug: string;
    ordre: number;
    nom: string;
    sousTitre: string;
    description: string;
    presentationMd: string;
    famille:
        | "Pouvoir et dynasties"
        | "Créateurs et bâtisseurs"
        | "Arts, lettres et idées"
        | "Figures singulières";
    identite: {
        mark: string;
        accent: string;
        color: LRZColor;
    };
};

export type Personnage = {
    id: string;
    nom: string;
    autresNoms: string[];
    categoriePrincipale: string;
    roles: string[];
    tags: string[];
    illustration?: string;
};

export type RelationPersonnageLieu = {
    personnageId: string;
    lieuId: string;
    lieuNom: string;
    types: TypeRelationPersonnage[];
    libelle: string;
    periodeAffichee: string;
    importance: ImportanceRelation;
    description: string;
    niveauCertitude: NiveauCertitude;
};

export type PersonnageAvecRelationLieu = {
    personnage: Personnage;
    relation: RelationPersonnageLieu;
};

export type PersonnagesParLieu = Record<string, PersonnageAvecRelationLieu[]>;

export type CataloguePersonnages = {
    meta: {
        titre: string;
        source: string;
        maj: string;
        schemaVersion: string;
        description: string;
        nombrePersonnages: number;
        nombreRelations: number;
    };
    personnages: Personnage[];
    relations: RelationPersonnageLieu[];
};
