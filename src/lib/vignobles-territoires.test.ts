import { describe, expect, it } from "vitest";

import {
    buildVignoblesParTerritoire,
    resolveVignobleTerritoires,
} from "@/lib/vignobles-territoires";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

const buildTerritoire = (slug: string): TerritoireCatalogueEntry =>
    ({ slug, nom: slug }) as TerritoireCatalogueEntry;

const buildVignoble = (
    slug: string,
    territoires: Vignoble["meta"]["territoires"],
    territoirePrincipal?: Vignoble["meta"]["territoirePrincipal"],
): Vignoble =>
    ({
        slug,
        nom: slug,
        meta: { territoires, territoirePrincipal },
    }) as Vignoble;

const territoires = [
    buildTerritoire("orleanais"),
    buildTerritoire("nivernais"),
    buildTerritoire("touraine"),
];

describe("vineyard territory domain", () => {
    it("resolves a simple relation", () => {
        const vignoble = buildVignoble("orleans", ["orleanais"]);

        expect(resolveVignobleTerritoires(vignoble, territoires)).toEqual([
            { territoire: territoires[0], principal: false },
        ]);
    });

    it("moves the primary territory first while preserving the other order", () => {
        const vignoble = buildVignoble(
            "regional",
            ["orleanais", "nivernais", "touraine"],
            "nivernais",
        );

        expect(
            resolveVignobleTerritoires(vignoble, territoires).map(
                ({ territoire, principal }) => ({
                    slug: territoire.slug,
                    principal,
                }),
            ),
        ).toEqual([
            { slug: "nivernais", principal: true },
            { slug: "orleanais", principal: false },
            { slug: "touraine", principal: false },
        ]);
    });

    it("preserves source order without a primary territory", () => {
        const vignoble = buildVignoble("regional", ["touraine", "orleanais"]);

        expect(
            resolveVignobleTerritoires(vignoble, territoires).map(
                ({ territoire }) => territoire.slug,
            ),
        ).toEqual(["touraine", "orleanais"]);
    });

    it("returns no view for an empty relation or a missing target", () => {
        expect(
            resolveVignobleTerritoires(buildVignoble("empty", []), territoires),
        ).toEqual([]);
        expect(
            resolveVignobleTerritoires(
                buildVignoble("missing", ["anjou"]),
                territoires,
            ),
        ).toEqual([]);
    });

    it("builds the inverse index with primary entries before secondary ones", () => {
        const firstSecondary = buildVignoble("first-secondary", ["orleanais"]);
        const firstPrimary = buildVignoble(
            "first-primary",
            ["orleanais"],
            "orleanais",
        );
        const secondPrimary = buildVignoble(
            "second-primary",
            ["orleanais", "nivernais"],
            "orleanais",
        );
        const secondSecondary = buildVignoble("second-secondary", [
            "orleanais",
        ]);

        const result = buildVignoblesParTerritoire(
            [firstSecondary, firstPrimary, secondPrimary, secondSecondary],
            territoires,
        );

        expect(result.orleanais?.map(({ slug }) => slug)).toEqual([
            "first-primary",
            "second-primary",
            "first-secondary",
            "second-secondary",
        ]);
        expect(result.nivernais?.map(({ slug }) => slug)).toEqual([
            "second-primary",
        ]);
    });

    it("omits empty territories and unavailable targets", () => {
        const result = buildVignoblesParTerritoire(
            [buildVignoble("outside", ["anjou"])],
            territoires,
        );

        expect(result).toEqual({});
        expect(result.touraine).toBeUndefined();
    });

    it("does not mutate its source collections", () => {
        const vignoble = buildVignoble(
            "regional",
            ["orleanais", "nivernais"],
            "nivernais",
        );
        const originalSlugs = [...vignoble.meta.territoires];
        const originalTerritoires = [...territoires];

        resolveVignobleTerritoires(vignoble, territoires);
        buildVignoblesParTerritoire([vignoble], territoires);

        expect(vignoble.meta.territoires).toEqual(originalSlugs);
        expect(territoires).toEqual(originalTerritoires);
    });
});
