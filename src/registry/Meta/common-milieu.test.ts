import { describe, expect, it } from "vitest";

import {
    COMMON_MILIEU_META,
    COMMON_MILIEU_REGISTRY,
    getCommonMilieuMeta,
    isCommonMilieu,
} from "@/registry/Meta/common-milieu";

describe("Common milieu meta registry", () => {
    it("exposes the complete editorial list", () => {
        expect(COMMON_MILIEU_META).toHaveLength(30);
        expect(COMMON_MILIEU_META[0]?.slug).toBe("fleuve");
        expect(COMMON_MILIEU_META.at(-1)?.slug).toBe("urbain-bati");
    });

    it("resolves a known environment", () => {
        expect(getCommonMilieuMeta("foret-alluviale")).toBe(
            COMMON_MILIEU_REGISTRY["foret-alluviale"],
        );
    });

    it("rejects an unknown environment", () => {
        expect(isCommonMilieu("montagne")).toBe(false);
        expect(getCommonMilieuMeta("montagne")).toBeUndefined();
    });
});
