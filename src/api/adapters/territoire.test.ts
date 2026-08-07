import territoireData from "@data/catalogue-territoires.json";
import { describe, expect, it } from "vitest";

import { territoireEntrySchema } from "@/api/schemas";

import { adaptTerritoire } from ".";

process.env.SITE_URL = "https://example.test/";

describe("territory public entry adapter", () => {
    it("normalizes a territory without exposing it as a published index", () => {
        const source = territoireEntrySchema.parse(
            territoireData.territoires[0],
        );
        const entry = adaptTerritoire(source);

        expect(entry).toMatchObject({
            id: "territoires:nivernais",
            index: "territoires",
            slug: "nivernais",
            name: "Nivernais",
            subtitle: "la Loire sauvage et ducale",
            summary: source.description,
        });
        expect(entry.media.imageUrl).toContain("/emoji/blasons/nivernais.png");
        expect(entry.attributes).not.toHaveProperty("slug");
        expect(entry.attributes).not.toHaveProperty("description");
    });
});
