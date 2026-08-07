import { describe, expect, it } from "vitest";

import {
    COMMON_ARCHITECTURE_META,
    COMMON_ARCHITECTURE_REGISTRY,
    getCommonArchitectureMeta,
    isCommonArchitecture,
} from "@/registry/Meta/common-architecture";

describe("Common architecture meta registry", () => {
    it("exposes every architecture in editorial order", () => {
        expect(COMMON_ARCHITECTURE_META.map(({ slug }) => slug)).toEqual([
            "gallo-romaine",
            "pre-romane",
            "medievale",
            "romane",
            "gothique",
            "gothique-flamboyant",
            "renaissance",
            "classique",
            "baroque",
            "rocaille",
            "neoclassique",
            "neogothique",
            "historiciste",
            "industrielle",
            "art-nouveau",
            "art-deco",
            "moderniste",
            "brutaliste",
            "contemporaine",
            "vernaculaire",
            "troglodytique",
        ]);
    });

    it("resolves a known architecture", () => {
        expect(getCommonArchitectureMeta("renaissance")).toBe(
            COMMON_ARCHITECTURE_REGISTRY.renaissance,
        );
    });

    it("rejects an unknown architecture", () => {
        expect(isCommonArchitecture("postmoderne")).toBe(false);
        expect(getCommonArchitectureMeta("postmoderne")).toBeUndefined();
    });
});
