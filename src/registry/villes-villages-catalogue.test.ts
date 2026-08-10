import villesVillagesCatalogueData from "@data/catalogue-villes-villages.json";
import territoiresCatalogueData from "@data/catalogue-territoires.json";
import { describe, expect, it } from "vitest";

import { getIndexBySlug } from "@/registry/indexes";
import type { TerritoireSlug } from "@/registry/territoires";
import type { VilleVillageCatalogue } from "@/types/villeVillageCatalogue";

const catalogue = villesVillagesCatalogueData as VilleVillageCatalogue;

const expectedTerritoires = [
    "nivernais",
    "orleanais",
    "blaisois",
    "touraine",
    "chinonais",
    "saumurois",
    "anjou",
    "bretagne-ligerienne",
] satisfies TerritoireSlug[];

const collator = new Intl.Collator("fr", { sensitivity: "base" });

describe("villes et villages catalogue", () => {
    it("is declared as a staged geographical directory", () => {
        expect(getIndexBySlug("villes-villages")).toMatchObject({
            href: "/villes-villages",
            universe: "raconte",
            format: "repertoire",
            dataFile: "catalogue-villes-villages.json",
            etat: "desactive",
            env: [],
        });
    });

    it("keeps the catalogue metadata aligned with its entries", () => {
        expect(catalogue.meta.nombreEntrees).toBe(
            catalogue.villesVillages.length,
        );
    });

    it("contains every territorial landmark in alphabetical order", () => {
        const names = catalogue.villesVillages.map(({ nom }) => nom);
        const catalogNames = new Set(
            catalogue.villesVillages.flatMap(({ nom, autresNoms }) => [
                nom,
                ...autresNoms,
            ]),
        );
        const territorialLandmarks = territoiresCatalogueData.territoires
            .flatMap(({ reperes }) => reperes)
            .filter((name, index, values) => values.indexOf(name) === index);

        expect(catalogue.villesVillages).toHaveLength(39);
        expect(names).toEqual([...names].sort(collator.compare));
        expect(
            territorialLandmarks.filter((name) => !catalogNames.has(name)),
        ).toEqual([]);
    });

    it("links every city to its geohistorical territory", () => {
        expect(
            new Set(
                catalogue.villesVillages.map(
                    ({ geographie }) => geographie.territoire,
                ),
            ),
        ).toEqual(new Set(expectedTerritoires));
    });

    it("uses stable slugs, valid administrative identifiers and sourced coordinates", () => {
        const slugs = catalogue.villesVillages.map(({ slug }) => slug);
        const inseeCodes = catalogue.villesVillages.map(
            ({ administration }) => administration.codeInsee,
        );

        expect(new Set(slugs).size).toBe(slugs.length);
        expect(
            slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)),
        ).toBe(true);
        expect(inseeCodes.every((code) => /^\d{5}$/.test(code))).toBe(true);
        expect(
            catalogue.villesVillages.every(
                ({ geographie, sources }) =>
                    Number.isFinite(geographie.position.latitude) &&
                    Number.isFinite(geographie.position.longitude) &&
                    sources.length >= 2,
            ),
        ).toBe(true);
    });
});
