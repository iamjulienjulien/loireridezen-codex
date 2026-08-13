import { describe, expect, it } from "vitest";

import {
    parseFeatureFlags,
    updateFeatureFlagSource,
} from "./feature-flags-cli.mjs";

const SOURCE = `
export const FEATURE_FLAGS = defineFeatureFlags({
    atelier: ["development"],
    collections: [],
    territoires: ["development", "staging", "production"],
});
`;

describe("feature flags CLI", () => {
    it("lists every configured flag and its environments", () => {
        expect(parseFeatureFlags(SOURCE)).toEqual([
            { name: "atelier", environments: ["development"] },
            { name: "collections", environments: [] },
            {
                name: "territoires",
                environments: ["development", "staging", "production"],
            },
        ]);
    });

    it("adds an active environment without changing the others", () => {
        const updated = updateFeatureFlagSource(
            SOURCE,
            "collections",
            "production",
            true,
        );

        expect(parseFeatureFlags(updated)).toContainEqual({
            name: "collections",
            environments: ["production"],
        });
        expect(updated).toContain('atelier: ["development"]');
    });

    it("removes one environment while preserving the other", () => {
        const updated = updateFeatureFlagSource(
            SOURCE,
            "territoires",
            "development",
            false,
        );

        expect(parseFeatureFlags(updated)).toContainEqual({
            name: "territoires",
            environments: ["staging", "production"],
        });
    });

    it("rejects unknown flags and environments", () => {
        expect(() =>
            updateFeatureFlagSource(SOURCE, "unknown", "development", true),
        ).toThrow("Feature flag inconnu");
        expect(() =>
            updateFeatureFlagSource(SOURCE, "atelier", "test", true),
        ).toThrow("Environnement invalide");
    });
});
