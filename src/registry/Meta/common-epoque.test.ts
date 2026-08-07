import { describe, expect, it } from "vitest";

import {
    COMMON_EPOQUE_META,
    COMMON_EPOQUE_REGISTRY,
    getCommonEpoqueMeta,
    isCommonEpoque,
} from "@/registry/Meta/common-epoque";

describe("Common epoque meta registry", () => {
    it("exposes every period in chronological order", () => {
        expect(COMMON_EPOQUE_META.map(({ slug }) => slug)).toEqual([
            "prehistoire",
            "protohistoire",
            "antiquite",
            "moyen-age",
            "renaissance",
            "ancien-regime",
            "revolution-empire",
            "xixe-siecle",
            "xxe-siecle",
            "xxie-siecle",
        ]);
    });

    it("resolves a known period", () => {
        expect(getCommonEpoqueMeta("renaissance")).toBe(
            COMMON_EPOQUE_REGISTRY.renaissance,
        );
    });

    it("rejects an unknown period", () => {
        expect(isCommonEpoque("temps-present")).toBe(false);
        expect(getCommonEpoqueMeta("temps-present")).toBeUndefined();
    });
});
