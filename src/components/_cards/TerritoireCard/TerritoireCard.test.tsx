import territoireData from "@data/catalogue-territoires.json";
import vignobleData from "@data/catalogue-vignobles.json";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { buildVignoblesParTerritoire } from "@/lib/vignobles-territoires";
import type { TerritoireSlug } from "@/registry/territoires";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import TerritoireCard, { getVineyardAccordionTitle } from "./TerritoireCard";

const territoires = territoireData.territoires as TerritoireCatalogueEntry[];
const vignobles = vignobleData.vignobles as Vignoble[];
const vignoblesByTerritoire = buildVignoblesParTerritoire(
    vignobles,
    territoires,
);

const getTerritoire = (slug: string) => {
    const territoire = territoires.find((entry) => entry.slug === slug);

    if (!territoire)
        throw new Error(`Territoire de test introuvable : ${slug}`);

    return territoire;
};

const renderCard = (
    territoire: TerritoireCatalogueEntry,
    linkedVignobles?: readonly Vignoble[],
) =>
    renderToStaticMarkup(
        <TerritoireCard
            territoire={territoire}
            chateaux={[]}
            guinguettes={[]}
            vignobles={linkedVignobles}
        />,
    );

const getLinkedVignobles = (territoire: TerritoireCatalogueEntry) =>
    vignoblesByTerritoire[territoire.slug as TerritoireSlug] ?? [];

describe("TerritoireCard · vignobles du territoire", () => {
    it("conserve strictement le rendu existant sans enrichissement", () => {
        const territoire = getTerritoire("nivernais");

        expect(renderCard(territoire)).not.toContain("Vignobles du territoire");
        expect(renderCard(territoire, [])).toBe(renderCard(territoire));
    });

    it("affiche directement un unique vignoble navigable", () => {
        const territoire = getTerritoire("nivernais");
        const linked = getLinkedVignobles(territoire).slice(0, 1);
        const markup = renderCard(territoire, linked);

        expect(markup).toContain("Vignobles du territoire");
        expect(markup).toContain(linked[0].nom);
        expect(markup).toContain(
            `/vignoble/${linked[0].slug}?retour=%2Fterritoire%2F${territoire.slug}`,
        );
        expect(markup).not.toContain("autres vignobles");
        expect(markup).toContain('data-analytics-event="relation_open"');
        expect(markup).toContain('data-analytics-surface="territoire_card"');
        expect(markup).not.toContain('data-analytics-event="card_open"');
    });

    it("affiche trois vignobles sans accordéon pour le Nivernais", () => {
        const territoire = getTerritoire("nivernais");
        const linked = getLinkedVignobles(territoire);
        const markup = renderCard(territoire, linked);

        expect(linked).toHaveLength(3);
        expect(
            linked.every((vignoble) =>
                markup.includes(`/vignoble/${vignoble.slug}`),
            ),
        ).toBe(true);
        expect(markup).not.toContain("autres vignobles");
    });

    it("place le complément dans un accordéon pour un territoire dense", () => {
        const territoire = getTerritoire("anjou");
        const linked = getLinkedVignobles(territoire);
        const markup = renderCard(territoire, linked);
        const remaining = linked.length - 3;

        expect(linked.length).toBeGreaterThan(3);
        expect(markup).toContain(`Voir ${remaining} autres vignobles`);
        expect(markup).toContain('aria-expanded="false"');
        expect(markup).toContain(
            `data-analytics-visible-items="3" data-analytics-total-items="${linked.length}"`,
        );
        expect(markup).toContain('hidden=""');
        expect(
            linked.every((vignoble) =>
                markup.includes(`/vignoble/${vignoble.slug}`),
            ),
        ).toBe(true);
        expect(getVineyardAccordionTitle(true, remaining)).toBe(
            "Masquer les autres vignobles",
        );
    });
});
