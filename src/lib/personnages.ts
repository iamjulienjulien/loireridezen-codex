import catalogueSource from "@data/catalogue-personnages.json";

import type {
    CataloguePersonnages,
    ImportanceRelation,
    Personnage,
    PersonnageAvecRelationLieu,
    PersonnagesParLieu,
    RelationPersonnageLieu,
} from "@/types/personnage";

const catalogue = catalogueSource as CataloguePersonnages;

const collator = new Intl.Collator("fr", { sensitivity: "base" });

const importanceOrder: Record<ImportanceRelation, number> = {
    majeur: 0,
    notable: 1,
    secondaire: 2,
};

const personnagesById = new Map(
    catalogue.personnages.map((personnage) => [personnage.id, personnage]),
);

function sortPersonnagesForLieu(
    entries: PersonnageAvecRelationLieu[],
): PersonnageAvecRelationLieu[] {
    return entries.sort(
        (a, b) =>
            importanceOrder[a.relation.importance] -
                importanceOrder[b.relation.importance] ||
            collator.compare(a.personnage.nom, b.personnage.nom),
    );
}

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

export function getPersonnageWithRelations(
    id: string,
): { personnage: Personnage; relations: RelationPersonnageLieu[] } | undefined {
    const personnage = getPersonnageById(id);

    return personnage
        ? { personnage, relations: getRelationsForPersonnage(personnage.id) }
        : undefined;
}

export function getPersonnagesForLieu(
    lieuId: string,
): PersonnageAvecRelationLieu[] {
    return sortPersonnagesForLieu(
        catalogue.relations.flatMap((relation) => {
            if (relation.lieuId !== lieuId) return [];

            const personnage = personnagesById.get(relation.personnageId);
            return personnage ? [{ personnage, relation }] : [];
        }),
    );
}

export function getPersonnagesByLieu(): PersonnagesParLieu {
    const entries: PersonnagesParLieu = {};

    for (const relation of catalogue.relations) {
        const personnage = personnagesById.get(relation.personnageId);
        if (!personnage) continue;

        (entries[relation.lieuId] ??= []).push({ personnage, relation });
    }

    for (const personnages of Object.values(entries)) {
        sortPersonnagesForLieu(personnages);
    }

    return entries;
}

export function getPersonnageCountForLieu(lieuId: string): number {
    return new Set(
        catalogue.relations
            .filter((relation) => relation.lieuId === lieuId)
            .map((relation) => relation.personnageId),
    ).size;
}

export function getPersonnageCategories(): string[] {
    return [
        ...new Set(catalogue.personnages.map((p) => p.categoriePrincipale)),
    ].sort(collator.compare);
}

export function getCataloguePersonnages(): CataloguePersonnages {
    return catalogue;
}
