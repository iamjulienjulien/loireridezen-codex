import territoireData from "@data/catalogue-territoires.json";
import vignobleData from "@data/catalogue-vignobles.json";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { buildVignoblesParTerritoire } from "@/lib/vignobles-territoires";
import type { TerritoireSlug } from "@/registry/territoires";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import TerritoireSection from "./TerritoireSection";

const territoires = territoireData.territoires as TerritoireCatalogueEntry[];
const vignobles = vignobleData.vignobles as Vignoble[];
const vignoblesByTerritoire = buildVignoblesParTerritoire(
    vignobles,
    territoires,
);

const getTerritoire = (slug: TerritoireSlug) => {
    const territoire = territoires.find((entry) => entry.slug === slug);

    if (!territoire)
        throw new Error(`Territoire de test introuvable : ${slug}`);

    return territoire;
};

const getVignobles = (slug: TerritoireSlug) =>
    vignoblesByTerritoire[slug] ?? [];

const renderChateauxHeader = (
    slug: TerritoireSlug,
    linkedVignobles?: readonly Vignoble[],
) =>
    renderToStaticMarkup(
        <TerritoireSection
            territory={getTerritoire(slug)}
            chateaux={[]}
            vignobles={linkedVignobles}
        />,
    );

const renderGuinguettesHeader = (
    slug: TerritoireSlug,
    linkedVignobles?: readonly Vignoble[],
) =>
    renderToStaticMarkup(
        <TerritoireSection
            territory={getTerritoire(slug)}
            guinguettes={[]}
            vignobles={linkedVignobles}
        />,
    );

describe("TerritoireSection · aperçu des vignobles", () => {
    it("ne laisse aucune trace lorsque l'enrichissement est absent ou vide", () => {
        const baseline = renderChateauxHeader("nivernais");

        expect(baseline).not.toContain("Vignobles du territoire");
        expect(renderChateauxHeader("nivernais", [])).toBe(baseline);
    });

    it("affiche les trois vignobles d'un territoire court", () => {
        const linked = getVignobles("nivernais");
        const markup = renderChateauxHeader("nivernais", linked);

        expect(linked).toHaveLength(3);
        expect(markup).toContain("Vignobles du territoire");
        expect(
            linked.every((vignoble) =>
                markup.includes(`/vignoble/${vignoble.slug}`),
            ),
        ).toBe(true);
        expect(markup).not.toContain("Voir tous les vignobles");
    });

    it("plafonne un territoire dense et renvoie vers sa fiche", () => {
        const linked = getVignobles("anjou");
        const markup = renderChateauxHeader("anjou", linked);

        expect(linked.length).toBeGreaterThan(3);
        expect(
            linked
                .slice(0, 3)
                .every((vignoble) =>
                    markup.includes(`/vignoble/${vignoble.slug}`),
                ),
        ).toBe(true);
        expect(
            linked
                .slice(3)
                .every(
                    (vignoble) =>
                        !markup.includes(`/vignoble/${vignoble.slug}`),
                ),
        ).toBe(true);
        expect(markup).toContain('href="/territoire/anjou"');
        expect(markup).toContain("Voir tous les vignobles");
    });

    it("partage le même contrat entre Châteaux et Guinguettes", () => {
        const linked = getVignobles("nivernais");
        const chateauxMarkup = renderChateauxHeader("nivernais", linked);
        const guinguettesMarkup = renderGuinguettesHeader("nivernais", linked);

        for (const vignoble of linked) {
            expect(chateauxMarkup).toContain(`/vignoble/${vignoble.slug}`);
            expect(guinguettesMarkup).toContain(`/vignoble/${vignoble.slug}`);
        }

        expect(chateauxMarkup).toContain("Vignobles du territoire");
        expect(guinguettesMarkup).toContain("Vignobles du territoire");
    });

    it("préserve les repères de synchronisation cartographique", () => {
        const markup = renderToStaticMarkup(
            <TerritoireSection
                territory={getTerritoire("nivernais")}
                chateaux={[]}
                vignobles={getVignobles("nivernais")}
                mapSync
            />,
        );

        expect(markup).toContain('data-map-sync-territory="nivernais"');
    });
});
