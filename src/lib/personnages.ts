import catalogueSource from "@data/catalogue-personnages.json";

import type {
    CataloguePersonnages,
    ImportanceRelation,
    Personnage,
    RelationPersonnageLieu,
} from "@/types/personnage";

const catalogue = catalogueSource as CataloguePersonnages;

const collator = new Intl.Collator("fr", { sensitivity: "base" });

const importanceOrder: Record<ImportanceRelation, number> = {
    majeur: 0,
    notable: 1,
    secondaire: 2,
};

export function getPersonnages(): Personnage[] {
    return [...catalogue.personnages].sort((a, b) =>
        collator.compare(a.nom, b.nom),
    );
}

export function getPersonnageById(id: string): Personnage | undefined {
    return catalogue.personnages.find((personnage) => personnage.id === id);
}

export function getRelationsForPersonnage(
    personnageId: string,
): RelationPersonnageLieu[] {
    return catalogue.relations
        .filter((relation) => relation.personnageId === personnageId)
        .sort(
            (a, b) =>
                importanceOrder[a.importance] - importanceOrder[b.importance] ||
                collator.compare(a.lieuNom, b.lieuNom),
        );
}

export function getPersonnageWithRelations(id: string):
    | { personnage: Personnage; relations: RelationPersonnageLieu[] }
    | undefined {
    const personnage = getPersonnageById(id);

    return personnage
        ? { personnage, relations: getRelationsForPersonnage(personnage.id) }
        : undefined;
}

export function getPersonnageCountForLieu(lieuId: string): number {
    return new Set(
        catalogue.relations
            .filter((relation) => relation.lieuId === lieuId)
            .map((relation) => relation.personnageId),
    ).size;
}

export function getPersonnageCategories(): string[] {
    return [...new Set(catalogue.personnages.map((p) => p.categoriePrincipale))]
        .sort(collator.compare);
}

export function getCataloguePersonnages(): CataloguePersonnages {
    return catalogue;
}
