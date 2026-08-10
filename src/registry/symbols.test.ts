import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { CATEGORIES_PERSONNAGES } from "@/registry/categories-personnages";
import { CHATEAU_RENOMMEE_META } from "@/registry/Meta/chateau-renommee";
import { CHATEAU_VISITE_META } from "@/registry/Meta/chateau-visite";
import { CODEX_INDEX_META } from "@/registry/Meta/codex-index";
import { COMMON_ARCHITECTURE_META } from "@/registry/Meta/common-architecture";
import { COMMON_EPOQUE_META } from "@/registry/Meta/common-epoque";
import { COMMON_EXPERIENCE_META } from "@/registry/Meta/common-experience";
import { COMMON_GENERAL_META } from "@/registry/Meta/common-general";
import { COMMON_MILIEU_META } from "@/registry/Meta/common-milieu";
import { COMMON_TERRITOIRE_META } from "@/registry/Meta/common-territoire";
import { COMMON_WEBSITE_META } from "@/registry/Meta/common-website";
import { FAUNE_RARETE_META } from "@/registry/Meta/faune-rarete";
import { FAUNE_TYPE_META } from "@/registry/Meta/faune-type";
import { FLORE_CATEGORIE_META } from "@/registry/Meta/flore-categorie";
import { FLORE_RARETE_META } from "@/registry/Meta/flore-rarete";
import { GUINGUETTE_AMBIENCE_META } from "@/registry/Meta/guinguette-ambience";
import { GUINGUETTE_ACTIVITE_META } from "@/registry/Meta/guinguette-activite";
import { VIGNOBLE_APPELLATION_META } from "@/registry/Meta/vignoble-appellation";
import { VIGNOBLE_CEPAGE_META } from "@/registry/Meta/vignoble-cepage";
import { VIGNOBLE_COULEUR_META } from "@/registry/Meta/vignoble-couleur";
import { VIGNOBLE_NOTORIETE_META } from "@/registry/Meta/vignoble-notoriete";
import { VIGNOBLE_TERROIR_META } from "@/registry/Meta/vignoble-terroir";
import {
    getLRZSymbolDefinition,
    getLRZSymbolSource,
    LRZ_CHATEAU_RENOMMEE_SYMBOLS,
    LRZ_CHATEAU_VISITE_SYMBOLS,
    LRZ_COMMON_ARCHITECTURE_SYMBOLS,
    LRZ_COMMON_EPOQUE_SYMBOLS,
    LRZ_COMMON_EXPERIENCE_SYMBOLS,
    LRZ_COMMON_GENERAL_SYMBOLS,
    LRZ_COMMON_MILIEU_SYMBOLS,
    LRZ_COMMON_TERRITOIRE_SYMBOLS,
    LRZ_COMMON_WEBSITE_SYMBOLS,
    LRZ_FAUNE_RARETE_SYMBOLS,
    LRZ_FAUNE_TYPE_SYMBOLS,
    LRZ_FLORE_CATEGORIE_SYMBOLS,
    LRZ_FLORE_RARETE_SYMBOLS,
    LRZ_GUINGUETTE_AMBIENCE_SYMBOLS,
    LRZ_GUINGUETTE_ACTIVITE_SYMBOLS,
    LRZ_CODEX_INDEX_SYMBOLS,
    LRZ_SYMBOLS,
    LRZ_VIGNOBLE_APPELLATION_SYMBOLS,
    LRZ_VIGNOBLE_CEPAGE_SYMBOLS,
    LRZ_VIGNOBLE_COULEUR_SYMBOLS,
    LRZ_VIGNOBLE_NOTORIETE_SYMBOLS,
    LRZ_VIGNOBLE_TERROIR_SYMBOLS,
} from "@/registry/symbols";

function expectPublicAsset(source: string | undefined) {
    expect(source).toBeDefined();
    expect(
        existsSync(join(process.cwd(), "public", source?.slice(1) ?? "")),
    ).toBe(true);
}

describe("LRZ symbol registry", () => {
    it("contains one symbol for every vineyard grape variety", () => {
        expect(Object.keys(LRZ_SYMBOLS.vignoble.cepage)).toEqual(
            VIGNOBLE_CEPAGE_META.map((grapeVariety) => grapeVariety.slug),
        );
    });

    it.each(VIGNOBLE_CEPAGE_META)(
        "resolves vignoble/cepage/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("vignoble", "cepage", slug);

            expect(source).toBe(LRZ_VIGNOBLE_CEPAGE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("resolves the LRZ identity of a vineyard grape variety", () => {
        expect(getLRZSymbolDefinition("vignoble", "cepage", "chenin")).toEqual({
            source: LRZ_VIGNOBLE_CEPAGE_SYMBOLS.chenin,
            label: "Chenin",
            accent: "#DFCA7D",
            color: "jaune-paille",
        });
    });

    it("contains one symbol for every common general notion", () => {
        expect(Object.keys(LRZ_SYMBOLS.common.general)).toEqual(
            COMMON_GENERAL_META.map((notion) => notion.slug),
        );
    });

    it.each(COMMON_GENERAL_META)(
        "resolves common/general/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("common", "general", slug);

            expect(source).toBe(LRZ_COMMON_GENERAL_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("resolves the LRZ identity of a common general symbol", () => {
        expect(getLRZSymbolDefinition("common", "general", "atlas")).toEqual({
            source: LRZ_COMMON_GENERAL_SYMBOLS.atlas,
            label: "Atlas",
            accent: "#397A91",
            color: "bleu-loire",
        });
    });

    it("contains one symbol for every common website", () => {
        expect(Object.keys(LRZ_SYMBOLS.common.website)).toEqual(
            COMMON_WEBSITE_META.map((website) => website.slug),
        );
    });

    it.each(COMMON_WEBSITE_META)(
        "resolves common/website/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("common", "website", slug);

            expect(source).toBe(LRZ_COMMON_WEBSITE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("resolves the LRZ identity of a common website symbol", () => {
        expect(getLRZSymbolDefinition("common", "website", "hub")).toEqual({
            source: LRZ_COMMON_WEBSITE_SYMBOLS.hub,
            label: "Le Hub",
            accent: "#B96841",
            color: "orange-cuivre",
        });
    });

    it("contains one symbol for every vineyard appellation", () => {
        expect(Object.keys(LRZ_SYMBOLS.vignoble.appellation)).toEqual(
            VIGNOBLE_APPELLATION_META.map((appellation) => appellation.slug),
        );
    });

    it.each(VIGNOBLE_APPELLATION_META)(
        "resolves vignoble/appellation/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("vignoble", "appellation", slug);

            expect(source).toBe(LRZ_VIGNOBLE_APPELLATION_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("resolves the LRZ identity of a vineyard appellation symbol", () => {
        expect(
            getLRZSymbolDefinition("vignoble", "appellation", "AOC communale"),
        ).toEqual({
            source: LRZ_VIGNOBLE_APPELLATION_SYMBOLS["AOC communale"],
            label: "AOC communale",
            accent: "#663D49",
            color: "lie-de-vin",
        });
    });

    it("contains one symbol for every vineyard notoriety level", () => {
        expect(Object.keys(LRZ_SYMBOLS.vignoble.notoriete)).toEqual(
            VIGNOBLE_NOTORIETE_META.map((notoriety) => notoriety.slug),
        );
    });

    it.each(VIGNOBLE_NOTORIETE_META)(
        "resolves vignoble/notoriete/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("vignoble", "notoriete", slug);

            expect(source).toBe(LRZ_VIGNOBLE_NOTORIETE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("resolves the LRZ identity of a vineyard notoriety symbol", () => {
        expect(
            getLRZSymbolDefinition("vignoble", "notoriete", "phare"),
        ).toEqual({
            source: LRZ_VIGNOBLE_NOTORIETE_SYMBOLS.phare,
            label: "Phare",
            accent: "#D8B548",
            color: "soleil",
        });
    });

    it("contains one symbol for every vineyard terroir", () => {
        expect(Object.keys(LRZ_SYMBOLS.vignoble.terroir)).toEqual(
            VIGNOBLE_TERROIR_META.map((terroir) => terroir.slug),
        );
    });

    it.each(VIGNOBLE_TERROIR_META)(
        "resolves vignoble/terroir/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("vignoble", "terroir", slug);

            expect(source).toBe(LRZ_VIGNOBLE_TERROIR_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("resolves the LRZ identity of a vineyard terroir symbol", () => {
        expect(
            getLRZSymbolDefinition("vignoble", "terroir", "tuffeau"),
        ).toEqual({
            source: LRZ_VIGNOBLE_TERROIR_SYMBOLS.tuffeau,
            label: "Tuffeau",
            accent: "#F2E7CF",
            color: "tuffeau",
        });
    });

    it("contains one symbol for every vineyard wine color", () => {
        expect(Object.keys(LRZ_SYMBOLS.vignoble.couleur)).toEqual(
            VIGNOBLE_COULEUR_META.map((wineColor) => wineColor.slug),
        );
    });

    it.each(VIGNOBLE_COULEUR_META)(
        "resolves vignoble/couleur/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("vignoble", "couleur", slug);

            expect(source).toBe(LRZ_VIGNOBLE_COULEUR_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("contains one symbol for every Chateau renown level", () => {
        expect(Object.keys(LRZ_SYMBOLS.chateau.renommee)).toEqual(
            CHATEAU_RENOMMEE_META.map((renown) => renown.slug),
        );
    });

    it.each(CHATEAU_RENOMMEE_META)(
        "resolves chateau/renommee/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("chateau", "renommee", slug);

            expect(source).toBe(LRZ_CHATEAU_RENOMMEE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("contains one symbol for every Chateau visiting condition", () => {
        expect(Object.keys(LRZ_SYMBOLS.chateau.visite)).toEqual(
            CHATEAU_VISITE_META.map((condition) => condition.slug),
        );
    });

    it.each(CHATEAU_VISITE_META)(
        "resolves chateau/visite/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("chateau", "visite", slug);

            expect(source).toBe(LRZ_CHATEAU_VISITE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("contains one symbol for every common territory", () => {
        expect(Object.keys(LRZ_SYMBOLS.common.territoire)).toEqual(
            COMMON_TERRITOIRE_META.map((territory) => territory.slug),
        );
    });

    it.each(COMMON_TERRITOIRE_META)(
        "resolves common/territoire/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("common", "territoire", slug);

            expect(source).toBe(LRZ_COMMON_TERRITOIRE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("contains one symbol for every common experience", () => {
        expect(Object.keys(LRZ_SYMBOLS.common.experience)).toEqual(
            COMMON_EXPERIENCE_META.map((experience) => experience.slug),
        );
    });

    it.each(COMMON_EXPERIENCE_META)(
        "resolves common/experience/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("common", "experience", slug);

            expect(source).toBe(LRZ_COMMON_EXPERIENCE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("contains one symbol for every common environment", () => {
        expect(Object.keys(LRZ_SYMBOLS.common.milieu)).toEqual(
            COMMON_MILIEU_META.map((environment) => environment.slug),
        );
    });

    it.each(COMMON_MILIEU_META)("resolves common/milieu/$slug", ({ slug }) => {
        const source = getLRZSymbolSource("common", "milieu", slug);

        expect(source).toBe(LRZ_COMMON_MILIEU_SYMBOLS[slug]);
        expectPublicAsset(source);
    });

    it("contains one symbol for every common architecture", () => {
        expect(Object.keys(LRZ_SYMBOLS.common.architecture)).toEqual(
            COMMON_ARCHITECTURE_META.map((architecture) => architecture.slug),
        );
    });

    it.each(COMMON_ARCHITECTURE_META)(
        "resolves common/architecture/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("common", "architecture", slug);

            expect(source).toBe(LRZ_COMMON_ARCHITECTURE_SYMBOLS[slug]);
            expectPublicAsset(source);
        },
    );

    it("contains one symbol for every common period", () => {
        expect(Object.keys(LRZ_SYMBOLS.common.epoque)).toEqual(
            COMMON_EPOQUE_META.map((period) => period.slug),
        );
    });

    it.each(COMMON_EPOQUE_META)("resolves common/epoque/$slug", ({ slug }) => {
        const source = getLRZSymbolSource("common", "epoque", slug);

        expect(source).toBe(LRZ_COMMON_EPOQUE_SYMBOLS[slug]);
        expectPublicAsset(source);
    });

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

    it("contains one symbol for every Flore rarity", () => {
        expect(Object.keys(LRZ_SYMBOLS.flore.rarete)).toEqual(
            FLORE_RARETE_META.map((rarity) => rarity.slug),
        );
    });

    it.each(FLORE_RARETE_META)("resolves flore/rarete/$slug", ({ slug }) => {
        const source = getLRZSymbolSource("flore", "rarete", slug);

        expect(source).toBe(LRZ_FLORE_RARETE_SYMBOLS[slug]);
        expectPublicAsset(source);
    });

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

    it("contains one symbol for every Guinguette activity", () => {
        expect(Object.keys(LRZ_SYMBOLS.guinguette.activite)).toEqual(
            GUINGUETTE_ACTIVITE_META.map((activity) => activity.slug),
        );
    });

    it.each(GUINGUETTE_ACTIVITE_META)(
        "resolves guinguette/activite/$slug",
        ({ slug }) => {
            const source = getLRZSymbolSource("guinguette", "activite", slug);

            expect(source).toBe(LRZ_GUINGUETTE_ACTIVITE_SYMBOLS[slug]);
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

    it("contains one symbol for every illustrated Codex index", () => {
        expect(Object.keys(LRZ_SYMBOLS.codex.index)).toEqual(
            CODEX_INDEX_META.map((index) => index.slug),
        );
    });

    it.each(CODEX_INDEX_META)("resolves codex/index/$slug", ({ slug }) => {
        const source = getLRZSymbolSource("codex", "index", slug);

        expect(source).toBe(LRZ_CODEX_INDEX_SYMBOLS[slug]);
        expectPublicAsset(source);
    });

    it("does not resolve an unknown Codex index symbol", () => {
        expect(
            getLRZSymbolSource("codex", "index", "patrimoine"),
        ).toBeUndefined();
    });

    it("does not resolve a nested symbol without its meta", () => {
        expect(getLRZSymbolSource("codex", undefined, "flore")).toBeUndefined();
        expect(
            getLRZSymbolSource("chateau", undefined, "phare"),
        ).toBeUndefined();
        expect(
            getLRZSymbolSource("personnage", undefined, "souverain"),
        ).toBeUndefined();
        expect(
            getLRZSymbolSource("common", undefined, "renaissance"),
        ).toBeUndefined();
        expect(
            getLRZSymbolSource("faune", undefined, "oiseau"),
        ).toBeUndefined();
        expect(getLRZSymbolSource("flore", undefined, "arbre")).toBeUndefined();
        expect(
            getLRZSymbolSource("guinguette", undefined, "festive"),
        ).toBeUndefined();
    });

    it("resolves the label and accent of a Codex index symbol", () => {
        expect(getLRZSymbolDefinition("codex", "index", "flore")).toEqual({
            source: "/symbols/codex/index/flore.png",
            label: "Flore",
            accent: "#5C8754",
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

    it("resolves the LRZ color of a common period symbol", () => {
        expect(
            getLRZSymbolDefinition("common", "epoque", "renaissance"),
        ).toEqual({
            source: LRZ_COMMON_EPOQUE_SYMBOLS.renaissance,
            label: "Renaissance",
            accent: "#C7953E",
            color: "miel",
        });
    });

    it("resolves the LRZ color of a Chateau renown symbol", () => {
        expect(
            getLRZSymbolDefinition("chateau", "renommee", "confidentiel"),
        ).toEqual({
            source: LRZ_CHATEAU_RENOMMEE_SYMBOLS.confidentiel,
            label: "Confidentiel",
            accent: "#D6D0C6",
            color: "pierre",
        });
    });

    it("resolves the LRZ color of a Chateau visiting condition", () => {
        expect(
            getLRZSymbolDefinition("chateau", "visite", "ouvert au public"),
        ).toEqual({
            source: LRZ_CHATEAU_VISITE_SYMBOLS["ouvert au public"],
            label: "Ouvert",
            accent: "#5C8754",
            color: "prairie",
        });
    });

    it("resolves the LRZ color of a common architecture symbol", () => {
        expect(
            getLRZSymbolDefinition("common", "architecture", "renaissance"),
        ).toEqual({
            source: LRZ_COMMON_ARCHITECTURE_SYMBOLS.renaissance,
            label: "Renaissance",
            accent: "#C7953E",
            color: "miel",
        });
    });

    it("resolves the LRZ color of a common environment symbol", () => {
        expect(getLRZSymbolDefinition("common", "milieu", "fleuve")).toEqual({
            source: LRZ_COMMON_MILIEU_SYMBOLS.fleuve,
            label: "Fleuve",
            accent: "#4D80A7",
            color: "eau",
        });
    });

    it("resolves the LRZ color of a common experience symbol", () => {
        expect(
            getLRZSymbolDefinition("common", "experience", "canoe-kayak"),
        ).toEqual({
            source: LRZ_COMMON_EXPERIENCE_SYMBOLS["canoe-kayak"],
            label: "Canoë-kayak",
            accent: "#3E93A7",
            color: "eau-claire",
        });
    });

    it("resolves the LRZ color of a common territory symbol", () => {
        expect(
            getLRZSymbolDefinition("common", "territoire", "touraine"),
        ).toEqual({
            source: LRZ_COMMON_TERRITOIRE_SYMBOLS.touraine,
            label: "Touraine",
            accent: "#5C8754",
            color: "vert",
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

    it("resolves the LRZ color of a Flore rarity symbol", () => {
        expect(getLRZSymbolDefinition("flore", "rarete", "trésor")).toEqual({
            source: LRZ_FLORE_RARETE_SYMBOLS.trésor,
            label: "Trésor",
            accent: "#D8B548",
            color: "soleil",
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
