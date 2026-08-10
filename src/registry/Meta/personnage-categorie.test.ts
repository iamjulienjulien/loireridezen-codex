import { describe, expect, it } from "vitest";

import { CATEGORIES_PERSONNAGES } from "@/registry/categories-personnages";
import {
    getPersonnageCategorieMeta,
    isPersonnageCategorieSlug,
    PERSONNAGE_CATEGORIE_META,
    PERSONNAGE_CATEGORIE_REGISTRY,
} from "@/registry/Meta/personnage-categorie";

describe("Personnage categorie meta registry", () => {
    it("exposes every category with the common meta structure", () => {
        expect(PERSONNAGE_CATEGORIE_META).toEqual(
            CATEGORIES_PERSONNAGES.map(({ slug, nom, identite }) => ({
                slug,
                label: nom,
                color: identite.color,
            })),
        );
    });

    it("resolves a known category", () => {
        expect(getPersonnageCategorieMeta("souverain")).toBe(
            PERSONNAGE_CATEGORIE_REGISTRY.souverain,
        );
        expect(PERSONNAGE_CATEGORIE_REGISTRY.souverain).toEqual({
            slug: "souverain",
            label: "Souverains et souveraines",
            color: "miel",
        });
    });

    it("rejects an unknown category", () => {
        expect(isPersonnageCategorieSlug("explorateur")).toBe(false);
        expect(getPersonnageCategorieMeta("explorateur")).toBeUndefined();
    });
});
