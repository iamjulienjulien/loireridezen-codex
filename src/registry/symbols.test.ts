import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { CATEGORIES_PERSONNAGES } from "@/registry/categories-personnages";
import {
    getLRZSymbolDefinition,
    getLRZSymbolSource,
    LRZ_INDEX_SYMBOLS,
    LRZ_SYMBOLS,
} from "@/registry/symbols";

function expectPublicAsset(source: string | undefined) {
    expect(source).toBeDefined();
    expect(
        existsSync(join(process.cwd(), "public", source?.slice(1) ?? "")),
    ).toBe(true);
}

describe("LRZ symbol registry", () => {
    it("contains one symbol for every personnage category", () => {
        const categorySlugs = CATEGORIES_PERSONNAGES.map(
            (category) => category.slug,
        );

        expect(Object.keys(LRZ_SYMBOLS.personnage.categorie)).toEqual(
            categorySlugs,
        );
    });

    it.each(CATEGORIES_PERSONNAGES)(
        "resolves personnage/categorie/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("personnage", "categorie", slug);

            expect(source).toBe(`/symbols/personnage/categorie/${slug}.png`);
            expectPublicAsset(source);
        },
    );

    it.each(Object.keys(LRZ_INDEX_SYMBOLS))(
        "resolves index/%s without meta",
        (slug) => {
            const source = getLRZSymbolSource("index", undefined, slug);

            expect(source).toBe(`/symbols/index/${slug}.png`);
            expectPublicAsset(source);
        },
    );

    it("does not resolve an unknown root symbol", () => {
        expect(
            getLRZSymbolSource("index", undefined, "vignobles"),
        ).toBeUndefined();
    });

    it("does not resolve a nested symbol without its meta", () => {
        expect(
            getLRZSymbolSource("personnage", undefined, "souverain"),
        ).toBeUndefined();
    });

    it("resolves the label and accent of a root symbol", () => {
        expect(getLRZSymbolDefinition("index", undefined, "flore")).toEqual({
            source: "/symbols/index/flore.png",
            label: "Flore",
            accent: "#4fa25c",
            color: "prairie",
        });
    });

    it("resolves the label and accent of a nested symbol", () => {
        expect(
            getLRZSymbolDefinition("personnage", "categorie", "souverain"),
        ).toEqual({
            source: "/symbols/personnage/categorie/souverain.png",
            label: "Souverains et souveraines",
            accent: "#C99A2E",
            color: "miel",
        });
    });
});
