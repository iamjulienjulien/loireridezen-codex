import territoireData from "@data/catalogue-territoires.json";
import vignobleData from "@data/catalogue-vignobles.json";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
    resolveVignobleTerritoires,
    type VignobleTerritoireView,
} from "@/lib/vignobles-territoires";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import VignoblesCard from "./VignoblesCard";

const vignobles = vignobleData.vignobles as Vignoble[];
const territoires = territoireData.territoires as TerritoireCatalogueEntry[];

const getVignoble = (slug: string) => {
    const vignoble = vignobles.find((entry) => entry.slug === slug);

    if (!vignoble) throw new Error(`Vignoble de test introuvable : ${slug}`);

    return vignoble;
};

const renderCard = (
    vignoble: Vignoble,
    relations?: readonly VignobleTerritoireView[],
) =>
    renderToStaticMarkup(
        <VignoblesCard
            d={vignoble}
            open={false}
            onToggle={() => undefined}
            territoires={relations}
        />,
    );

describe("VignoblesCard · territoires du vin", () => {
    it("conserve strictement le rendu existant sans enrichissement", () => {
        const vignoble = getVignoble("pouilly-fume");

        expect(renderCard(vignoble)).not.toContain("Territoires du vin");
        expect(renderCard(vignoble, [])).toBe(renderCard(vignoble));
    });

    it("affiche un territoire navigable avec son contexte de retour", () => {
        const vignoble = getVignoble("pouilly-fume");
        const relations = resolveVignobleTerritoires(vignoble, territoires);
        const markup = renderCard(vignoble, relations);

        expect(relations).toHaveLength(1);
        expect(markup).toContain("Territoires du vin");
        expect(markup).toContain("Nivernais");
        expect(markup).toContain(
            "/territoire/nivernais?retour=%2Fvignoble%2Fpouilly-fume",
        );
        expect(markup).toContain('data-primary-territory="true"');
    });

    it("place le territoire principal avant les secondaires", () => {
        const vignoble = getVignoble("touraine");
        const relations = resolveVignobleTerritoires(vignoble, territoires);
        const markup = renderCard(vignoble, relations);
        const labels = relations.map(({ territoire }) => territoire.nom);

        expect(relations.length).toBeGreaterThan(1);
        expect(relations[0].principal).toBe(true);
        expect(labels.every((label) => markup.includes(label))).toBe(true);
        expect(
            labels.every(
                (label, index) =>
                    index === 0 ||
                    markup.indexOf(labels[index - 1]) < markup.indexOf(label),
            ),
        ).toBe(true);
    });

    it("n'affiche aucun bloc lorsqu'une appellation n'a pas de territoire", () => {
        const vignoble = vignobles.find(
            (entry) => entry.meta.territoires.length === 0,
        );

        expect(vignoble).toBeDefined();
        expect(renderCard(vignoble!, [])).not.toContain("Territoires du vin");
    });
});
