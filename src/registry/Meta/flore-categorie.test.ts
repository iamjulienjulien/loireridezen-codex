import { describe, expect, it } from "vitest";

import {
    FLORE_CATEGORIE_META,
    FLORE_CATEGORIE_REGISTRY,
    getFloreCategorieMeta,
    isFloreCategorie,
} from "@/registry/Meta/flore-categorie";

describe("Flore categorie meta registry", () => {
    it("exposes every category with the common meta structure", () => {
        expect(FLORE_CATEGORIE_META).toEqual([
            { slug: "arbre", label: "Arbre", color: "vert-olive" },
            { slug: "arbuste", label: "Arbuste", color: "vert-sauge" },
            { slug: "herbacée", label: "Herbacée", color: "miel" },
            { slug: "graminée", label: "Graminée", color: "ocre" },
            {
                slug: "aquatique",
                label: "Aquatique",
                color: "bleu-loire",
            },
            { slug: "fougère", label: "Fougère", color: "vert" },
            {
                slug: "grimpante",
                label: "Grimpante",
                color: "vert-roseau",
            },
        ]);
    });

    it("resolves a known category", () => {
        expect(getFloreCategorieMeta("aquatique")).toBe(
            FLORE_CATEGORIE_REGISTRY.aquatique,
        );
    });

    it("rejects an unknown category", () => {
        expect(isFloreCategorie("mousse")).toBe(false);
        expect(getFloreCategorieMeta("mousse")).toBeUndefined();
    });
});
