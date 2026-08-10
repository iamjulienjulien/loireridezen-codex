import { afterEach, describe, expect, it, vi } from "vitest";

import {
    getCollectionForEnv,
    getCollectionsForPublicationEnv,
    getIndexForEnv,
    resolvePublicationEnv,
} from "./publication-guards";

describe("publication guards", () => {
    afterEach(() => vi.unstubAllEnvs());

    it("exposes published indexes in both runtime environments", () => {
        expect(getIndexForEnv("chateaux", "development")?.etat).toBe("publie");
        expect(getIndexForEnv("chateaux", "production")?.etat).toBe("publie");
    });

    it("hides disabled indexes in every runtime environment", () => {
        for (const slug of ["villes-villages", "vocabulaire", "patrimoine"]) {
            expect(getIndexForEnv(slug, "development")).toBeUndefined();
            expect(getIndexForEnv(slug, "production")).toBeUndefined();
        }
    });

    it("hides collections while their feature flag is disabled", () => {
        expect(getCollectionsForPublicationEnv("development")).toEqual([]);
        expect(getCollectionsForPublicationEnv("production")).toEqual([]);
        expect(
            getCollectionForEnv("incontournables-du-val", "production"),
        ).toBeUndefined();
    });

    it("rejects an invalid implicit environment", () => {
        vi.stubEnv("CURRENT_ENV", "staging");
        vi.stubEnv("NEXT_PUBLIC_CURRENT_ENV", "staging");
        expect(() => resolvePublicationEnv(undefined)).toThrow(
            /CURRENT_ENV invalide ou absent/,
        );
    });
});
