import { describe, expect, it } from "vitest";

import {
    getVignobleNotorieteMeta,
    isVignobleNotoriete,
    VIGNOBLE_NOTORIETE_META,
    VIGNOBLE_NOTORIETE_REGISTRY,
} from "@/registry/Meta/vignoble-notoriete";

describe("Vignoble notoriete meta registry", () => {
    it("exposes every notoriety level with the common meta structure", () => {
        expect(VIGNOBLE_NOTORIETE_META).toEqual([
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

    it("resolves a known notoriety level", () => {
        expect(getVignobleNotorieteMeta("phare")).toBe(
            VIGNOBLE_NOTORIETE_REGISTRY.phare,
        );
    });

    it("rejects an unknown notoriety level", () => {
        expect(isVignobleNotoriete("incontournable")).toBe(false);
        expect(getVignobleNotorieteMeta("incontournable")).toBeUndefined();
    });
});
