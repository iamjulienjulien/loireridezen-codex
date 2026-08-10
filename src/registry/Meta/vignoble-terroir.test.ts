import { describe, expect, it } from "vitest";

import {
    getVignobleTerroirMeta,
    isVignobleTerroir,
    VIGNOBLE_TERROIR_META,
    VIGNOBLE_TERROIR_REGISTRY,
} from "@/registry/Meta/vignoble-terroir";

describe("Vignoble terroir meta registry", () => {
    it("exposes every vineyard terroir with the common meta structure", () => {
        expect(VIGNOBLE_TERROIR_META).toHaveLength(14);
        expect(VIGNOBLE_TERROIR_META.map(({ slug }) => slug)).toEqual([
            "tuffeau",
            "calcaire",
            "marne-calcaire",
            "argilo-calcaire",
            "argile-a-silex",
            "schiste",
            "micaschiste",
            "gneiss",
            "granite",
            "gabbro",
            "sable",
            "graviers",
            "alluvions",
            "faluns",
        ]);
    });

    it("resolves a known vineyard terroir", () => {
        expect(getVignobleTerroirMeta("tuffeau")).toBe(
            VIGNOBLE_TERROIR_REGISTRY.tuffeau,
        );
    });

    it("rejects an unknown vineyard terroir", () => {
        expect(isVignobleTerroir("volcanique")).toBe(false);
        expect(getVignobleTerroirMeta("volcanique")).toBeUndefined();
    });
});
