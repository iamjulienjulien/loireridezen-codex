import { describe, expect, it } from "vitest";

import chateauData from "@data/catalogue-chateaux.json";

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
        expect(urls).toContain("https://codex.loireridezen.bike/faune");
        expect(urls).toContain("https://codex.loireridezen.bike/flore");
        expect(urls).not.toContain(
            "https://codex.loireridezen.bike/personnages",
        );
        expect(urls.every((url) => !url.includes("/atelier"))).toBe(true);
        expect(urls.every((url) => !url.includes("/api/v1"))).toBe(true);
        expect(new Set(urls).size).toBe(urls.length);
    });
});
