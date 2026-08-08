import { describe, expect, it } from "vitest";

import {
    getVignobleCouleurMeta,
    isVignobleCouleur,
    VIGNOBLE_COULEUR_META,
    VIGNOBLE_COULEUR_REGISTRY,
} from "@/registry/Meta/vignoble-couleur";

describe("Vignoble couleur meta registry", () => {
    it("exposes every wine color with the common meta structure", () => {
        expect(VIGNOBLE_COULEUR_META).toEqual([
            {
                slug: "blanc sec",
                label: "Blanc sec",
                color: "jaune-paille",
            },
            {
                slug: "blanc moelleux",
                label: "Blanc moelleux",
                color: "miel",
            },
            { slug: "rouge", label: "Rouge", color: "lie-de-vin" },
            { slug: "rosé", label: "Rosé", color: "rose-sauvage" },
            {
                slug: "effervescent",
                label: "Effervescent",
                color: "argent",
            },
        ]);
    });

    it("resolves a known wine color", () => {
        expect(getVignobleCouleurMeta("blanc sec")).toBe(
            VIGNOBLE_COULEUR_REGISTRY["blanc sec"],
        );
    });

    it("rejects an unknown wine color", () => {
        expect(isVignobleCouleur("orange")).toBe(false);
        expect(getVignobleCouleurMeta("orange")).toBeUndefined();
    });
});
