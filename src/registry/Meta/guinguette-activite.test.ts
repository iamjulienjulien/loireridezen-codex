import { describe, expect, it } from "vitest";

import {
    getGuinguetteActiviteMeta,
    GUINGUETTE_ACTIVITE_META,
    GUINGUETTE_ACTIVITE_META_REGISTRY,
    isGuinguetteActivite,
} from "@/registry/Meta/guinguette-activite";

describe("Guinguette activite meta registry", () => {
    it("exposes the 43 activities with the common meta structure", () => {
        expect(GUINGUETTE_ACTIVITE_META).toEqual(
            Object.values(GUINGUETTE_ACTIVITE_META_REGISTRY),
        );
        expect(GUINGUETTE_ACTIVITE_META).toHaveLength(43);
    });

    it("resolves a known activity", () => {
        expect(getGuinguetteActiviteMeta("stationnement-velo")).toBe(
            GUINGUETTE_ACTIVITE_META_REGISTRY["stationnement-velo"],
        );
    });

    it("rejects an unknown activity", () => {
        expect(isGuinguetteActivite("karaoke")).toBe(false);
        expect(getGuinguetteActiviteMeta("karaoke")).toBeUndefined();
    });
});
