import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { CATEGORIES_PERSONNAGES } from "@/registry/categories-personnages";
import { FAUNE_RARETE_META } from "@/registry/Meta/faune-rarete";
import { FAUNE_TYPE_META } from "@/registry/Meta/faune-type";
import { FLORE_CATEGORIE_META } from "@/registry/Meta/flore-categorie";
import { GUINGUETTE_AMBIENCE_META } from "@/registry/Meta/guinguette-ambience";
import {
    getLRZSymbolDefinition,
    getLRZSymbolSource,
    LRZ_FAUNE_RARETE_SYMBOLS,
    LRZ_FAUNE_TYPE_SYMBOLS,
    LRZ_FLORE_CATEGORIE_SYMBOLS,
    LRZ_GUINGUETTE_AMBIENCE_SYMBOLS,
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
    it("contains one symbol for every Faune type", () => {
        expect(Object.keys(LRZ_SYMBOLS.faune.type)).toEqual(
            FAUNE_TYPE_META.map((type) => type.slug),
        );
    });

    it.each(FAUNE_TYPE_META)("resolves faune/type/$slug", ({ slug }) => {
        const source = getLRZSymbolSource("faune", "type", slug);

        expect(source).toBe(LRZ_FAUNE_TYPE_SYMBOLS[slug]);
        expectPublicAsset(source);
    });

    it("contains one symbol for every Faune rarity", () => {
        expect(Object.keys(LRZ_SYMBOLS.faune.rarete)).toEqual(
            FAUNE_RARETE_META.map((rarity) => rarity.slug),
        );
    });

    it.each(FAUNE_RARETE_META)("resolves faune/rarete/$slug", ({ slug }) => {
        const source = getLRZSymbolSource("faune", "rarete", slug);

        expect(source).toBe(LRZ_FAUNE_RARETE_SYMBOLS[slug]);
        expectPublicAsset(source);
    });

    it("contains one symbol for every Flore category", () => {
        expect(Object.keys(LRZ_SYMBOLS.flore.categorie)).toEqual(
            FLORE_CATEGORIE_META.map((category) => category.slug),
        );
    });

    it.each(FLORE_CATEGORIE_META)(
        "resolves flore/categorie/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("flore", "categorie", slug);

            expect(source).toBe(LRZ_FLORE_CATEGORIE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("contains one symbol for every Guinguette ambience", () => {
        expect(Object.keys(LRZ_SYMBOLS.guinguette.ambience)).toEqual(
            GUINGUETTE_AMBIENCE_META.map((ambience) => ambience.slug),
        );
    });

    it.each(GUINGUETTE_AMBIENCE_META)(
        "resolves guinguette/ambience/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("guinguette", "ambience", slug);

            expect(source).toBe(LRZ_GUINGUETTE_AMBIENCE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

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
        expect(
            getLRZSymbolSource("faune", undefined, "oiseau"),
        ).toBeUndefined();
        expect(getLRZSymbolSource("flore", undefined, "arbre")).toBeUndefined();
        expect(
            getLRZSymbolSource("guinguette", undefined, "festive"),
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

    it("resolves the LRZ color of a Faune type symbol", () => {
        expect(getLRZSymbolDefinition("faune", "type", "amphibien")).toEqual({
            source: LRZ_FAUNE_TYPE_SYMBOLS.amphibien,
            label: "Amphibien",
            accent: "#6AA657",
            color: "vert-vif",
        });
    });

    it("resolves the LRZ color of a Faune rarity symbol", () => {
        expect(getLRZSymbolDefinition("faune", "rarete", "trésor")).toEqual({
            source: LRZ_FAUNE_RARETE_SYMBOLS.trésor,
            label: "Trésor",
            accent: "#D8B548",
            color: "soleil",
        });
    });

    it("resolves the LRZ color of a Flore category symbol", () => {
        expect(
            getLRZSymbolDefinition("flore", "categorie", "aquatique"),
        ).toEqual({
            source: LRZ_FLORE_CATEGORIE_SYMBOLS.aquatique,
            label: "Aquatique",
            accent: "#397A91",
            color: "bleu-loire",
        });
    });

    it("resolves the LRZ color of a Guinguette ambience symbol", () => {
        expect(
            getLRZSymbolDefinition("guinguette", "ambience", "bord de Loire"),
        ).toEqual({
            source: LRZ_GUINGUETTE_AMBIENCE_SYMBOLS["bord de Loire"],
            label: "Bord de Loire",
            accent: "#6C8796",
            color: "bleu-gris",
        });
    });
});
