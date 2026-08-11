import personnageData from "@data/catalogue-personnages.json";
import { describe, expect, it } from "vitest";

import { personnageEntrySchema } from "@/api/schemas";

import { adaptPersonnage } from ".";

process.env.SITE_URL = "https://example.test/";

describe("character public entry adapter", () => {
    it("normalizes a character as a repertoire entry", () => {
        const source = personnageEntrySchema.parse(
            personnageData.personnages[0],
        );
        const entry = adaptPersonnage(source);

        expect(entry).toMatchObject({
            id: "personnages:agnes-sorel",
            index: "personnages",
            slug: "agnes-sorel",
            name: "Agnès Sorel",
            subtitle: "favorite de Charles VII",
        });
        expect(entry.media.imageUrl).toContain(
            "/illustrations/personnages/agnes-sorel.png",
        );
        expect(entry.attributes).not.toHaveProperty("slug");
    });
});
