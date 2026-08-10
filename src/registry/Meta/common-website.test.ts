import { describe, expect, it } from "vitest";

import {
    COMMON_WEBSITE_META,
    COMMON_WEBSITE_REGISTRY,
    getCommonWebsiteMeta,
    isCommonWebsite,
} from "@/registry/Meta/common-website";

describe("Common website meta registry", () => {
    it("exposes the complete editorial list", () => {
        expect(COMMON_WEBSITE_META).toEqual([
            { slug: "hub", label: "Le Hub", color: "orange-cuivre" },
            {
                slug: "instagram",
                label: "Instagram",
                color: "rose-sauvage",
            },
            { slug: "passeport", label: "Le Passeport", color: "ocre" },
            { slug: "codex", label: "Le Codex", color: "fauve" },
            {
                slug: "carte",
                label: "La Carte interactive",
                color: "bleu-loire",
            },
            { slug: "camp", label: "Le Camp", color: "miel" },
        ]);
    });

    it("resolves a known website", () => {
        expect(getCommonWebsiteMeta("codex")).toBe(
            COMMON_WEBSITE_REGISTRY.codex,
        );
    });

    it("rejects an unknown website", () => {
        expect(isCommonWebsite("boutique")).toBe(false);
        expect(getCommonWebsiteMeta("boutique")).toBeUndefined();
    });
});
