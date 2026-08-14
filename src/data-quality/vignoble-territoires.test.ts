import { describe, expect, it } from "vitest";
import vignobleData from "@data/catalogue-vignobles.json";
import { isTerritoireSlug } from "@/registry/territoires";

const SLUGS_SANS_TERRITOIRE = [
    "chateaumeillant",
    "cote-roannaise",
    "coteaux-du-loir",
    "coteaux-du-vendomois",
    "cotes-d-auvergne",
    "cotes-du-forez",
    "fiefs-vendeens",
    "haut-poitou",
    "jasnieres",
    "menetou-salon",
    "quincy",
    "reuilly",
    "saint-pourcain",
    "sancerre",
    "valencay",
] as const;

const REPARTITION_ATTENDUE = {
    anjou: 18,
    blaisois: 6,
    "bretagne-ligerienne": 15,
    chinonais: 6,
    nivernais: 3,
    orleanais: 3,
    saumurois: 10,
    touraine: 9,
} as const;

describe("vignoble territory data quality", () => {
    it("declares a territory list on every appellation", () => {
        expect(vignobleData.vignobles).toHaveLength(70);

        for (const vignoble of vignobleData.vignobles) {
            expect(Array.isArray(vignoble.meta.territoires)).toBe(true);
            expect(vignoble.meta.territoires.every(isTerritoireSlug)).toBe(
                true,
            );
            expect(new Set(vignoble.meta.territoires).size).toBe(
                vignoble.meta.territoires.length,
            );

            if (vignoble.meta.territoirePrincipal !== undefined) {
                expect(vignoble.meta.territoires).toContain(
                    vignoble.meta.territoirePrincipal,
                );
            }
        }
    });

    it("keeps the intentionally unmapped appellations explicit", () => {
        const actual = vignobleData.vignobles
            .filter(({ meta }) => meta.territoires.length === 0)
            .map(({ slug }) => slug)
            .sort();

        expect(actual).toEqual([...SLUGS_SANS_TERRITOIRE].sort());
    });

    it("reports the expected distribution across Codex territories", () => {
        const distribution = vignobleData.vignobles.reduce<
            Record<string, number>
        >((counts, { meta }) => {
            for (const territoire of meta.territoires) {
                counts[territoire] = (counts[territoire] ?? 0) + 1;
            }
            return counts;
        }, {});

        expect(distribution).toEqual(REPARTITION_ATTENDUE);
    });
});
