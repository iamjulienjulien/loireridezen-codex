import { describe, expect, it } from "vitest";

import {
    FAUNE_RARETE_META,
    FAUNE_RARETE_REGISTRY,
    getFauneRareteMeta,
    isFauneRarete,
} from "@/registry/Meta/faune-rarete";

describe("Faune rarete meta registry", () => {
    it("exposes every rarity with the common meta structure", () => {
        expect(FAUNE_RARETE_META).toEqual([
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
        expect(getFauneRareteMeta("rare")).toBe(FAUNE_RARETE_REGISTRY.rare);
    });

    it("rejects an unknown rarity", () => {
        expect(isFauneRarete("exceptionnel")).toBe(false);
        expect(getFauneRareteMeta("exceptionnel")).toBeUndefined();
    });
});
