import { describe, expect, it } from "vitest";

import {
    getVignobleCepageMeta,
    isVignobleCepage,
    VIGNOBLE_CEPAGE_META,
} from "@/registry/Meta/vignoble-cepage";

describe("vineyard grape variety metadata registry", () => {
    it("exposes the complete ordered grape variety vocabulary", () => {
        expect(VIGNOBLE_CEPAGE_META.map(({ slug }) => slug)).toEqual([
            "chenin",
            "sauvignon-blanc",
            "melon-de-bourgogne",
            "chardonnay",
            "folle-blanche",
            "romorantin",
            "menu-pineau",
            "tressallier",
            "chasselas",
            "cabernet-franc",
            "cabernet-sauvignon",
            "pinot-noir",
            "pinot-gris",
            "pinot-meunier",
            "gamay",
            "grolleau-noir",
            "grolleau-gris",
            "pineau-daunis",
            "cot",
        ]);
    });

    it("resolves a known grape variety", () => {
        expect(getVignobleCepageMeta("chenin")).toMatchObject({
            slug: "chenin",
            label: "Chenin",
            color: "jaune-paille",
        });
    });

    it("rejects an unknown grape variety", () => {
        expect(isVignobleCepage("riesling")).toBe(false);
        expect(getVignobleCepageMeta("riesling")).toBeUndefined();
    });
});
