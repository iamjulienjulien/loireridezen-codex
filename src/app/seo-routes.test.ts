import { describe, expect, it } from "vitest";

import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/faune.json";
import floreData from "@data/flore.json";
import personnagesData from "@data/catalogue-personnages.json";
import territoiresData from "@data/catalogue-territoires.json";

import robots from "./robots";
import sitemap from "./sitemap";

describe("SEO discovery routes", () => {
    it("publishes the sitemap location in robots.txt", () => {
        expect(robots()).toMatchObject({
            sitemap: "https://codex.loireridezen.bike/sitemap.xml",
        });
    });

    it("lists only canonical public production pages", () => {
        const urls = sitemap().map((entry) => entry.url);

        expect(urls).toContain("https://codex.loireridezen.bike/");
        expect(urls).toContain("https://codex.loireridezen.bike/chateaux");
        for (const chateau of chateauData.chateaux) {
            expect(urls).toContain(
                `https://codex.loireridezen.bike/chateau/${chateau.slug}`,
            );
        }
        for (const espece of fauneData.especes) {
            expect(urls).toContain(
                `https://codex.loireridezen.bike/faune/${espece.slug}`,
            );
        }
        for (const flore of floreData.flore) {
            expect(urls).toContain(
                `https://codex.loireridezen.bike/flore/${flore.slug}`,
            );
        }
        for (const personnage of personnagesData.personnages) {
            expect(urls).toContain(
                `https://codex.loireridezen.bike/personnage/${personnage.id}`,
            );
        }
        for (const territoire of territoiresData.territoires) {
            expect(urls).toContain(
                `https://codex.loireridezen.bike/territoire/${territoire.slug}`,
            );
        }
        expect(urls).toContain("https://codex.loireridezen.bike/faune");
        expect(urls).toContain("https://codex.loireridezen.bike/flore");
        expect(urls.some((url) => url.includes("/chateaux/collections/"))).toBe(
            false,
        );
        expect(urls).toContain("https://codex.loireridezen.bike/personnages");
        expect(urls.every((url) => !url.includes("/atelier"))).toBe(true);
        expect(urls.every((url) => !url.includes("/api/v1"))).toBe(true);
        expect(new Set(urls).size).toBe(urls.length);
    });
});
