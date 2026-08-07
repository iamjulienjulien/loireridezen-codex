import { describe, expect, it } from "vitest";
import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/faune.json";
import floreData from "@data/flore.json";
import guinguetteData from "@data/catalogue-guinguettes.json";
import motData from "@data/mot.json";
import patrimoineData from "@data/patrimoine.json";
import vignobleData from "@data/vignoble.json";
import {
    chateauCatalogSchema,
    fauneCatalogSchema,
    floreCatalogSchema,
    guinguetteCatalogSchema,
    isoDateSchema,
    motCatalogSchema,
    patrimoineCatalogSchema,
    vignobleCatalogSchema,
} from ".";

describe("catalog schemas", () => {
    it.each([
        ["faune", fauneCatalogSchema, fauneData],
        ["flore", floreCatalogSchema, floreData],
        ["chateaux", chateauCatalogSchema, chateauData],
        ["guinguettes", guinguetteCatalogSchema, guinguetteData],
        ["vignobles", vignobleCatalogSchema, vignobleData],
        ["vocabulaire", motCatalogSchema, motData],
        ["patrimoine", patrimoineCatalogSchema, patrimoineData],
    ])("validates the real %s catalog", (_name, schema, data) => {
        expect(schema.safeParse(data).success).toBe(true);
    });

    it("rejects invalid and duplicate slugs", () => {
        const invalid = structuredClone(fauneData);
        invalid.especes[0].slug = "Héron cendré";
        expect(fauneCatalogSchema.safeParse(invalid).success).toBe(false);

        const slugs = fauneData.especes.map(({ slug }) => slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("rejects impossible dates", () => {
        expect(isoDateSchema.safeParse("2026-02-30").success).toBe(false);
    });

    it("rejects coordinates outside geographic bounds", () => {
        const invalid = structuredClone(chateauData);
        invalid.chateaux[0].coordonnees.lat = 91;
        expect(chateauCatalogSchema.safeParse(invalid).success).toBe(false);
    });

    it("accepts unknown visit status for a chateau", () => {
        const catalog = structuredClone(chateauData);
        catalog.chateaux[0].visite = "inconnu";

        expect(chateauCatalogSchema.safeParse(catalog).success).toBe(true);
    });

    it("rejects invalid chateau illustration ambiances", () => {
        const catalog = structuredClone(chateauData) as unknown as {
            chateaux: Array<{
                illustrations: Record<string, string>;
            }>;
        };
        catalog.chateaux[0].illustrations.pluie =
            "/illustrations/chateaux/chambord/pluie.png";

        expect(chateauCatalogSchema.safeParse(catalog).success).toBe(false);
    });

    it("rejects unknown union values and unexpected fields", () => {
        const invalidUnion = structuredClone(fauneData) as unknown as {
            especes: Array<Record<string, unknown>>;
        };
        invalidUnion.especes[0].type = "dinosaure";
        expect(fauneCatalogSchema.safeParse(invalidUnion).success).toBe(false);

        const invalidField = structuredClone(floreData) as unknown as {
            flore: Array<Record<string, unknown>>;
        };
        invalidField.flore[0].internalOnly = true;
        expect(floreCatalogSchema.safeParse(invalidField).success).toBe(false);
    });

    it("rejects a fauna color outside the documented union", () => {
        const invalid = structuredClone(fauneData) as unknown as {
            especes: Array<{
                identification: { couleurs: string[] };
            }>;
        };
        invalid.especes[0].identification.couleurs = ["violet"];
        expect(fauneCatalogSchema.safeParse(invalid).success).toBe(false);
    });
});
