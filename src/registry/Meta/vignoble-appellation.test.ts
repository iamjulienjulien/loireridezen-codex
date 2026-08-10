import { describe, expect, it } from "vitest";

import {
    getVignobleAOCMeta,
    isVignobleAOC,
    VIGNOBLE_APPELLATION_META,
    VIGNOBLE_APPELLATION_REGISTRY,
} from "@/registry/Meta/vignoble-appellation";

describe("Vignoble appellation meta registry", () => {
    it("exposes every appellation with the common meta structure", () => {
        expect(VIGNOBLE_APPELLATION_META).toEqual([
            {
                slug: "AOC communale",
                label: "AOC communale",
                color: "lie-de-vin",
            },
            {
                slug: "AOC régionale",
                label: "AOC régionale",
                color: "miel",
            },
            { slug: "IGP", label: "IGP", color: "vert-sauge" },
        ]);
    });

    it("resolves a known appellation", () => {
        expect(getVignobleAOCMeta("AOC communale")).toBe(
            VIGNOBLE_APPELLATION_REGISTRY["AOC communale"],
        );
    });

    it("rejects an unknown appellation", () => {
        expect(isVignobleAOC("Vin de France")).toBe(false);
        expect(getVignobleAOCMeta("Vin de France")).toBeUndefined();
    });
});
