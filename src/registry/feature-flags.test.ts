import { afterEach, describe, expect, it, vi } from "vitest";

import {
    FEATURE_FLAGS,
    featureIsEnabled,
    isFeatureFlagName,
} from "@/registry/feature-flags";

describe("feature flags registry", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("registers collections for development", () => {
        expect(FEATURE_FLAGS.collections).toEqual(["development"]);
    });

    it("rejects unknown feature flag names", () => {
        expect(isFeatureFlagName("unknown_feature")).toBe(false);
    });

    it("evaluates a feature from its enabled environments", () => {
        expect(featureIsEnabled("collections", "development")).toBe(true);
        expect(featureIsEnabled("collections", "production")).toBe(false);
    });

    it("uses CURRENT_ENV when no environment is provided", () => {
        vi.stubEnv("CURRENT_ENV", "development");

        expect(featureIsEnabled("collections")).toBe(true);
    });

    it("rejects an invalid CURRENT_ENV", () => {
        vi.stubEnv("CURRENT_ENV", "test");

        expect(() => featureIsEnabled("collections")).toThrow(
            "CURRENT_ENV invalide ou absent : test",
        );
    });
});
