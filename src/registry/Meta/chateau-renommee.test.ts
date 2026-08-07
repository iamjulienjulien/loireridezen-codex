import { describe, expect, it } from "vitest";

import {
    CHATEAU_RENOMMEE_META,
    CHATEAU_RENOMMEE_REGISTRY,
    getChateauRenommeeMeta,
    isChateauRenommee,
} from "@/registry/Meta/chateau-renommee";

describe("Chateau renommee meta registry", () => {
    it("exposes every renown level with the common meta structure", () => {
        expect(CHATEAU_RENOMMEE_META).toEqual([
            { slug: "phare", label: "Phare", color: "soleil" },
            { slug: "majeur", label: "Majeur", color: "brique" },
            { slug: "notable", label: "Notable", color: "ocre" },
            {
                slug: "confidentiel",
                label: "Confidentiel",
                color: "pierre",
            },
        ]);
    });

    it("resolves a known renown level", () => {
        expect(getChateauRenommeeMeta("phare")).toBe(
            CHATEAU_RENOMMEE_REGISTRY.phare,
        );
    });

    it("rejects an unknown renown level", () => {
        expect(isChateauRenommee("incontournable")).toBe(false);
        expect(getChateauRenommeeMeta("incontournable")).toBeUndefined();
    });
});
