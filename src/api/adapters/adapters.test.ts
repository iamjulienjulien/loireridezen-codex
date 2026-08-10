import { describe, expect, it } from "vitest";
import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/faune.json";
import floreData from "@data/flore.json";
import guinguetteData from "@data/catalogue-guinguettes.json";
import motData from "@data/mot.json";
import patrimoineData from "@data/patrimoine.json";
import vignobleData from "@data/vignoble.json";
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
                const mediaDirectory =
                    index === "chateaux" ? "illustrations" : "emoji";

                expect(entry.media.imageUrl).toContain(
                    `https://example.test/${mediaDirectory}/`,
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
});
