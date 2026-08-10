import { describe, expect, it } from "vitest";

import {
    COMMON_GENERAL_META,
    getCommonGeneralMeta,
    isCommonGeneral,
} from "@/registry/Meta/common-general";

describe("common general metadata registry", () => {
    it("exposes the complete ordered editorial vocabulary", () => {
        expect(COMMON_GENERAL_META.map(({ slug }) => slug)).toEqual([
            "atlas",
            "explorer",
            "observer",
            "raconter",
            "relier",
            "chemin",
            "repere",
            "sources",
            "mouvement",
            "horizon",
            "partager",
        ]);
    });

    it("resolves a known general notion", () => {
        expect(getCommonGeneralMeta("relier")).toMatchObject({
            slug: "relier",
            label: "Relier",
            color: "corail",
        });
    });

    it("rejects an unknown general notion", () => {
        expect(isCommonGeneral("fleuve")).toBe(false);
        expect(getCommonGeneralMeta("fleuve")).toBeUndefined();
    });
});
