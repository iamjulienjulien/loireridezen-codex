import { describe, expect, it } from "vitest";

import { GUINGUETTE_AMBIENCE_REGISTRY } from "@/registry/guinguette-ambiences";
import {
    getGuinguetteAmbienceMeta,
    GUINGUETTE_AMBIENCE_META,
    GUINGUETTE_AMBIENCE_META_REGISTRY,
    isGuinguetteAmbience,
} from "@/registry/Meta/guinguette-ambience";

describe("Guinguette ambience meta registry", () => {
    it("exposes every ambience with the common meta structure", () => {
        expect(GUINGUETTE_AMBIENCE_META).toEqual(
            Object.entries(GUINGUETTE_AMBIENCE_REGISTRY).map(
                ([slug, { label, color }]) => ({ slug, label, color }),
            ),
        );
        expect(GUINGUETTE_AMBIENCE_META).toHaveLength(23);
    });

    it("resolves a known ambience", () => {
        expect(getGuinguetteAmbienceMeta("bord de Loire")).toBe(
            GUINGUETTE_AMBIENCE_META_REGISTRY["bord de Loire"],
        );
    });

    it("rejects an unknown ambience", () => {
        expect(isGuinguetteAmbience("gastronomique")).toBe(false);
        expect(getGuinguetteAmbienceMeta("gastronomique")).toBeUndefined();
    });
});
