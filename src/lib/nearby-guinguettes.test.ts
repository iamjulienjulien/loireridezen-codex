import { describe, expect, it } from "vitest";

import {
    formatDistanceKm,
    getGeographicDistanceKm,
    getNearbyGuinguettes,
} from "@/lib/nearby-guinguettes";
import type { Chateau } from "@/types/chateau";
import type { Guinguette, GuinguetteStatut } from "@/types/guinguette";

const buildChateau = (lat = 47, lng = 1): Chateau =>
    ({
        slug: "chateau-test",
        nom: "Château test",
        coordonnees: { lat, lng },
    }) as Chateau;

const buildGuinguette = ({
    slug,
    nom = slug,
    latitude = 47,
    longitude = 1,
    statut = "actif",
}: {
    slug: string;
    nom?: string;
    latitude?: number | null;
    longitude?: number | null;
    statut?: GuinguetteStatut;
}): Guinguette =>
    ({
        slug,
        nom,
        position: { latitude, longitude },
        statut,
    }) as Guinguette;

describe("nearby guinguettes domain", () => {
    it("calculates zero and known geographic distances", () => {
        expect(
            getGeographicDistanceKm(
                { latitude: 47, longitude: 1 },
                { latitude: 47, longitude: 1 },
            ),
        ).toBe(0);
        expect(
            getGeographicDistanceKm(
                { latitude: 0, longitude: 0 },
                { latitude: 0, longitude: 1 },
            ),
        ).toBeCloseTo(111.195, 3);
    });

    it("excludes invalid coordinates and historical entries", () => {
        const results = getNearbyGuinguettes(buildChateau(), [
            buildGuinguette({ slug: "valid" }),
            buildGuinguette({ slug: "missing", latitude: null }),
            buildGuinguette({ slug: "invalid", latitude: 91 }),
            buildGuinguette({ slug: "past", statut: "historique" }),
        ]);

        expect(results.map(({ guinguette }) => guinguette.slug)).toEqual([
            "valid",
        ]);
    });

    it("keeps entries to verify while preserving their status", () => {
        const [result] = getNearbyGuinguettes(buildChateau(), [
            buildGuinguette({ slug: "review", statut: "a_verifier" }),
        ]);

        expect(result.guinguette.statut).toBe("a_verifier");
    });

    it("includes the exact radius and excludes farther entries", () => {
        const chateau = buildChateau(0, 0);
        const boundary = buildGuinguette({
            slug: "boundary",
            latitude: 0,
            longitude: 0.01,
        });
        const outside = buildGuinguette({
            slug: "outside",
            latitude: 0,
            longitude: 0.02,
        });
        const radiusKm = getGeographicDistanceKm(
            { latitude: 0, longitude: 0 },
            { latitude: 0, longitude: 0.01 },
        );

        expect(
            getNearbyGuinguettes(chateau, [outside, boundary], { radiusKm }),
        ).toHaveLength(1);
    });

    it("sorts by distance then name and limits the result", () => {
        const source = [
            buildGuinguette({ slug: "far", longitude: 1.01 }),
            buildGuinguette({ slug: "zulu", nom: "Zulu" }),
            buildGuinguette({ slug: "alpha", nom: "Alpha" }),
            buildGuinguette({ slug: "middle", longitude: 1.005 }),
        ];
        const snapshot = [...source];

        const results = getNearbyGuinguettes(buildChateau(), source, {
            limit: 3,
        });

        expect(results.map(({ guinguette }) => guinguette.slug)).toEqual([
            "alpha",
            "zulu",
            "middle",
        ]);
        expect(source).toEqual(snapshot);
    });

    it("returns no result for invalid options or an invalid origin", () => {
        const guinguettes = [buildGuinguette({ slug: "valid" })];

        expect(
            getNearbyGuinguettes(buildChateau(), guinguettes, { limit: 0 }),
        ).toEqual([]);
        expect(
            getNearbyGuinguettes(buildChateau(), guinguettes, {
                radiusKm: -1,
            }),
        ).toEqual([]);
        expect(
            getNearbyGuinguettes(buildChateau(Number.NaN), guinguettes),
        ).toEqual([]);
    });

    it("formats distances in useful metres and decimal kilometres", () => {
        expect(formatDistanceKm(0)).toBe("0 m");
        expect(formatDistanceKm(0.646)).toBe("650 m");
        expect(formatDistanceKm(1.24)).toBe("1,2 km");
        expect(() => formatDistanceKm(Number.NaN)).toThrow(RangeError);
        expect(() => formatDistanceKm(-1)).toThrow(RangeError);
    });
});
