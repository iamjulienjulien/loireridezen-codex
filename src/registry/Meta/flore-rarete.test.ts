import { describe, expect, it } from "vitest";

import {
    FLORE_RARETE_META,
    FLORE_RARETE_REGISTRY,
    getFloreRareteMeta,
    isFloreRarete,
} from "@/registry/Meta/flore-rarete";

describe("Flore rarete meta registry", () => {
    it("exposes every rarity with the common meta structure", () => {
        expect(FLORE_RARETE_META).toEqual([
            { slug: "commun", label: "Commun", color: "gris-brun" },
            {
                slug: "régulier",
                label: "Régulier",
                color: "bleu-gris",
            },
            { slug: "rare", label: "Rare", color: "ocre" },
            { slug: "trésor", label: "Trésor", color: "soleil" },
        ]);
    });

    it("resolves a known rarity", () => {
        expect(getFloreRareteMeta("rare")).toBe(FLORE_RARETE_REGISTRY.rare);
    });

    it("rejects an unknown rarity", () => {
        expect(isFloreRarete("exceptionnelle")).toBe(false);
        expect(getFloreRareteMeta("exceptionnelle")).toBeUndefined();
    });
});
