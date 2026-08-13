import { afterEach, describe, expect, it, vi } from "vitest";

import {
    FEATURE_FLAGS,
    featureIsEnabled,
    isFeatureFlagName,
} from "@/registry/feature-flags";
import type { Env } from "@/registry/indexes";

const collectionEnvironments: readonly Env[] = FEATURE_FLAGS.collections;

describe("feature flags registry", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("registers known feature flags", () => {
        expect(FEATURE_FLAGS).toHaveProperty("collections");
    });

    it("rejects unknown feature flag names", () => {
        expect(isFeatureFlagName("unknown_feature")).toBe(false);
    });

    it("evaluates a feature from its enabled environments", () => {
        expect(featureIsEnabled("collections", "development")).toBe(
            collectionEnvironments.includes("development"),
        );
        expect(featureIsEnabled("collections", "production")).toBe(
            collectionEnvironments.includes("production"),
        );
        expect(featureIsEnabled("collections", "staging")).toBe(
            collectionEnvironments.includes("staging"),
        );
    });

    it("enables the V1.2 prototype outside production", () => {
        expect(featureIsEnabled("followTheThread", "development")).toBe(true);
        expect(featureIsEnabled("followTheThread", "staging")).toBe(true);
        expect(featureIsEnabled("followTheThread", "production")).toBe(false);
    });

    it("only keeps flags that still represent optional products", () => {
        expect(Object.keys(FEATURE_FLAGS)).toEqual([
            "atelier",
            "collections",
            "commandPalette",
            "followTheThread",
        ]);
    });

    it("uses CURRENT_ENV when no environment is provided", () => {
        vi.stubEnv("CURRENT_ENV", "development");

        expect(featureIsEnabled("collections")).toBe(
            collectionEnvironments.includes("development"),
        );
    });

    it("rejects an invalid CURRENT_ENV", () => {
        vi.stubEnv("CURRENT_ENV", "test");

        expect(() => featureIsEnabled("collections")).toThrow(
            "CURRENT_ENV invalide ou absent : test",
        );
    });
});
