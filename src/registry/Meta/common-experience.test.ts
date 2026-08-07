import { describe, expect, it } from "vitest";

import {
    COMMON_EXPERIENCE_META,
    COMMON_EXPERIENCE_REGISTRY,
    getCommonExperienceMeta,
    isCommonExperience,
} from "@/registry/Meta/common-experience";

describe("Common experience meta registry", () => {
    it("exposes the complete editorial list", () => {
        expect(COMMON_EXPERIENCE_META).toHaveLength(28);
        expect(COMMON_EXPERIENCE_META[0]?.slug).toBe("visite-libre");
        expect(COMMON_EXPERIENCE_META.at(-1)?.slug).toBe("montgolfiere");
    });

    it("resolves a known experience", () => {
        expect(getCommonExperienceMeta("canoe-kayak")).toBe(
            COMMON_EXPERIENCE_REGISTRY["canoe-kayak"],
        );
    });

    it("rejects an unknown experience", () => {
        expect(isCommonExperience("escalade")).toBe(false);
        expect(getCommonExperienceMeta("escalade")).toBeUndefined();
    });
});
