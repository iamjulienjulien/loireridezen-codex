import { describe, expect, it } from "vitest";

import {
    COMMON_TERRITOIRE_META,
    COMMON_TERRITOIRE_REGISTRY,
    getCommonTerritoireMeta,
    isCommonTerritoire,
} from "@/registry/Meta/common-territoire";

describe("Common territoire meta registry", () => {
    it("exposes the complete Loire editorial sequence", () => {
        expect(COMMON_TERRITOIRE_META).toHaveLength(8);
        expect(COMMON_TERRITOIRE_META[0]?.slug).toBe("nivernais");
        expect(COMMON_TERRITOIRE_META.at(-1)?.slug).toBe("bretagne-ligerienne");
    });

    it("resolves a known territory", () => {
        expect(getCommonTerritoireMeta("touraine")).toBe(
            COMMON_TERRITOIRE_REGISTRY.touraine,
        );
    });

    it("rejects an unknown territory", () => {
        expect(isCommonTerritoire("giennois")).toBe(false);
        expect(getCommonTerritoireMeta("giennois")).toBeUndefined();
    });
});
