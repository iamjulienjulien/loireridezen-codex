import { beforeAll, describe, expect, it } from "vitest";
import {
    getPublishedEntries,
    getPublishedIndex,
    getPublishedIndexes,
    getRegisteredIndexes,
} from "./registry";

beforeAll(() => {
    process.env.SITE_URL = "https://example.test";
});

describe("publication registry", () => {
    it("registers all nine technical indexes", () => {
        expect(getRegisteredIndexes()).toHaveLength(9);
        for (const { entries } of getRegisteredIndexes()) {
            const slugs = entries.map(({ slug }) => slug);
            expect(slugs.every(Boolean)).toBe(true);
            expect(new Set(slugs).size).toBe(slugs.length);
        }
    });

    it("does not require development-only drafts to expose an API source", () => {
        expect(
            getRegisteredIndexes().some(
                ({ definition }) => definition.slug === "villes-villages",
            ),
        ).toBe(false);
    });

    it("publishes every production index in editorial order", () => {
        expect(getPublishedIndexes().map(({ slug }) => slug)).toEqual([
            "faune",
            "flore",
            "chateaux",
            "guinguettes",
            "territoires",
            "personnages",
            "vignobles",
        ]);
    });

    it.each([
        ["faune", 49],
        ["flore", 51],
        ["chateaux", 52],
        ["guinguettes", 160],
        ["territoires", 8],
        ["personnages", 74],
        ["vignobles", 70],
    ])("publishes %s with %i entries", (slug, count) => {
        expect(getPublishedEntries(slug)).toHaveLength(count);
    });

    it("does not distinguish a disabled index from an unknown index", () => {
        expect(getPublishedIndex("vocabulaire")).toBeUndefined();
        expect(getPublishedIndex("villes-villages")).toBeUndefined();
        expect(getPublishedIndex("inconnu")).toBeUndefined();
    });

    it("exposes the complete editorial warning", () => {
        const faune = getPublishedIndex("faune");
        expect(faune?.editorialWarning).toBeTruthy();
        expect(faune?.editorialWarning).toContain(
            "Statuts de conservation indicatifs",
        );
    });
});
