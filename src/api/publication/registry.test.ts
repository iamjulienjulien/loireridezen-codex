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

    it("publishes exactly the three approved indexes in editorial order", () => {
        expect(getPublishedIndexes().map(({ slug }) => slug)).toEqual([
            "faune",
            "flore",
            "chateaux",
        ]);
    });

    it.each([
        ["faune", 49],
        ["flore", 51],
        ["chateaux", 52],
    ])("publishes %s with %i entries", (slug, count) => {
        expect(getPublishedEntries(slug)).toHaveLength(count);
    });

    it("does not distinguish a review index from an unknown index", () => {
        expect(getPublishedIndex("vignobles")).toBeUndefined();
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
