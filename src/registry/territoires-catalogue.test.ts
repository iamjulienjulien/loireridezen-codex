import territoireCatalogueData from "@data/catalogue-territoires.json";
import { describe, expect, it } from "vitest";

import type { TerritoireCatalogue } from "@/types/territoireCatalogue";

import { TERRITOIRES } from "./territoires";

const catalogue = territoireCatalogueData as TerritoireCatalogue;

describe("territoires catalogue migration", () => {
    it("keeps the catalogue metadata aligned with its entries", () => {
        expect(catalogue.meta.nombreEntrees).toBe(catalogue.territoires.length);
    });

    it("duplicates the current registry entries during the migration", () => {
        expect(catalogue.territoires).toEqual(TERRITOIRES);
    });
});
