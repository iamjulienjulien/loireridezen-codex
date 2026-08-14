import { describe, expect, it } from "vitest";
import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/catalogue-faune.json";
import floreData from "@data/catalogue-flore.json";
import guinguetteData from "@data/catalogue-guinguettes.json";
import motData from "@data/catalogue-mots.json";
import patrimoineData from "@data/catalogue-patrimoine.json";
import vignobleData from "@data/catalogue-vignobles.json";
import {
    adaptChateau,
    adaptFaune,
    adaptFlore,
    adaptGuinguette,
    adaptMot,
    adaptPatrimoine,
    adaptVignoble,
} from ".";
import {
    chateauEntrySchema,
    fauneEntrySchema,
    floreEntrySchema,
    guinguetteEntrySchema,
    motEntrySchema,
    patrimoineEntrySchema,
    vignobleEntrySchema,
} from "@/api/schemas";

process.env.SITE_URL = "https://example.test/";

describe("public entry adapters", () => {
    it.each([
        [
            "faune",
            adaptFaune(fauneEntrySchema.parse(fauneData.especes[0])),
            "Héron cendré",
            null,
        ],
        [
            "flore",
            adaptFlore(floreEntrySchema.parse(floreData.flore[0])),
            "Peuplier noir",
            null,
        ],
        [
            "chateaux",
            adaptChateau(chateauEntrySchema.parse(chateauData.chateaux[0])),
            "Palais ducal de Nevers",
            chateauData.chateaux[0].resume,
        ],
        [
            "guinguettes",
            adaptGuinguette(
                guinguetteEntrySchema.parse(guinguetteData.guinguettes[0]),
            ),
            guinguetteData.guinguettes[0].nom,
            guinguetteData.guinguettes[0].description,
        ],
        [
            "vignobles",
            adaptVignoble(vignobleEntrySchema.parse(vignobleData.vignobles[0])),
            "Côtes du Forez",
            null,
        ],
        [
            "vocabulaire",
            adaptMot(motEntrySchema.parse(motData.mots[0])),
            "boire",
            motData.mots[0].definition,
        ],
        [
            "patrimoine",
            adaptPatrimoine(
                patrimoineEntrySchema.parse(patrimoineData.patrimoine[0]),
            ),
            "Pont de Beaugency",
            patrimoineData.patrimoine[0].resume,
        ],
    ])(
        "normalizes a %s entry without duplicating common fields",
        (index, entry, name, summary) => {
            expect(entry.index).toBe(index);
            expect(entry.id).toBe(`${index}:${entry.slug}`);
            expect(entry.name).toBe(name);
            expect(entry.summary).toBe(summary);
            expect(entry.subtitle).toBeTruthy();
            if (entry.media.imageUrl) {
                expect(entry.media.imageUrl).toContain(
                    "https://example.test/illustrations/",
                );
            } else {
                expect(entry.media.imageUrl).toBeNull();
            }
            expect(entry.attributes).not.toHaveProperty("emoji");
            expect(entry.attributes).not.toHaveProperty("customEmoji");
            expect(entry.attributes).not.toHaveProperty("slug");
            expect(entry.attributes).not.toHaveProperty("sousTitre");
            expect(entry.attributes).not.toHaveProperty("resume");
            expect(Object.keys(entry.attributes).length).toBeGreaterThan(0);
        },
    );

    it("publishes the canonical vineyard territory relation", () => {
        const source = vignobleEntrySchema.parse(vignobleData.vignobles[0]);
        const entry = adaptVignoble(source);
        const meta = entry.attributes.meta as typeof source.meta;

        expect(meta.territoires).toEqual(source.meta.territoires);
        expect(meta.territoirePrincipal).toBe(source.meta.territoirePrincipal);
    });
});
