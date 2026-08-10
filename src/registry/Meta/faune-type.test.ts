import { describe, expect, it } from "vitest";

import {
    FAUNE_TYPE_META,
    FAUNE_TYPE_REGISTRY,
    getFauneTypeMeta,
    isFauneType,
} from "@/registry/Meta/faune-type";

describe("Faune type meta registry", () => {
    it("exposes every type with the common meta structure", () => {
        expect(FAUNE_TYPE_META).toEqual([
            { slug: "oiseau", label: "Oiseau", color: "bleu" },
            {
                slug: "mammifère",
                label: "Mammifère",
                color: "orange-cuivre",
            },
            {
                slug: "poisson",
                label: "Poisson",
                color: "bleu-turquoise",
            },
            {
                slug: "reptile",
                label: "Reptile",
                color: "vert-roseau",
            },
            {
                slug: "amphibien",
                label: "Amphibien",
                color: "vert-vif",
            },
            { slug: "insecte", label: "Insecte", color: "mauve" },
        ]);
    });

    it("resolves a known type", () => {
        expect(getFauneTypeMeta("poisson")).toBe(FAUNE_TYPE_REGISTRY.poisson);
    });

    it("rejects an unknown type", () => {
        expect(isFauneType("crustacé")).toBe(false);
        expect(getFauneTypeMeta("crustacé")).toBeUndefined();
    });
});
