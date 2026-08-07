import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import LRZStamp from "./LRZStamp";

describe("LRZStamp", () => {
    it("renders the registry label and locator", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="index" slug="flore" />,
        );

        expect(markup).toContain("Flore");
        expect(markup).toContain('data-collection="index"');
        expect(markup).toContain('data-slug="flore"');
        expect(markup).toContain("/symbols/index/flore.png");
    });

    it("renders nested labels, details and visual options", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp
                collection="personnage"
                meta="categorie"
                slug="souverain"
                detail="Catégorie de personnages"
                variant="plaque"
                tone="solid"
                symbolPosition="end"
                dashed
            />,
        );

        expect(markup).toContain("Souverains et souveraines");
        expect(markup).toContain("Catégorie de personnages");
        expect(markup).toContain('data-meta="categorie"');
        expect(markup).toContain('data-variant="plaque"');
        expect(markup).toContain('data-tone="solid"');
        expect(markup).toContain('data-position="end"');
        expect(markup).toContain('data-dashed="true"');
    });

    it("renders a Faune type with its registry color", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="faune" meta="type" slug="poisson" />,
        );

        expect(markup).toContain("Poisson");
        expect(markup).toContain('data-collection="faune"');
        expect(markup).toContain('data-meta="type"');
        expect(markup).toContain("/symbols/faune/type/poisson.png");
        expect(markup).toContain(
            "--lrz-stamp-label-color:var(--color-bleu-turquoise)",
        );
    });

    it("renders a common period with its registry color", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="common" meta="epoque" slug="renaissance" />,
        );

        expect(markup).toContain("Renaissance");
        expect(markup).toContain('data-collection="common"');
        expect(markup).toContain('data-meta="epoque"');
        expect(markup).toContain("/symbols/common/epoque/renaissance.png");
        expect(markup).toContain("--lrz-stamp-label-color:var(--color-miel)");
    });

    it("renders a Faune rarity with its registry color", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="faune" meta="rarete" slug="trésor" />,
        );

        expect(markup).toContain("Trésor");
        expect(markup).toContain('data-collection="faune"');
        expect(markup).toContain('data-meta="rarete"');
        expect(markup).toContain("/symbols/faune/rarete/tresor.png");
        expect(markup).toContain(
            "--lrz-stamp-label-color:var(--color-nature-soleil)",
        );
    });

    it("renders a Flore category with its registry color", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="flore" meta="categorie" slug="fougère" />,
        );

        expect(markup).toContain("Fougère");
        expect(markup).toContain('data-collection="flore"');
        expect(markup).toContain('data-meta="categorie"');
        expect(markup).toContain("/symbols/flore/categorie/fougere.png");
        expect(markup).toContain("--lrz-stamp-label-color:var(--color-vert)");
    });

    it("renders a Flore rarity with its registry color", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="flore" meta="rarete" slug="trésor" />,
        );

        expect(markup).toContain("Trésor");
        expect(markup).toContain('data-collection="flore"');
        expect(markup).toContain('data-meta="rarete"');
        expect(markup).toContain("/symbols/flore/rarete/tresor.png");
        expect(markup).toContain(
            "--lrz-stamp-label-color:var(--color-nature-soleil)",
        );
    });

    it("renders a Guinguette ambience with its registry color", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp
                collection="guinguette"
                meta="ambience"
                slug="coucher de soleil"
            />,
        );

        expect(markup).toContain("Coucher de soleil");
        expect(markup).toContain('data-collection="guinguette"');
        expect(markup).toContain('data-meta="ambience"');
        expect(markup).toContain(
            "/symbols/guinguette/ambience/coucher-de-soleil.png",
        );
        expect(markup).toContain("--lrz-stamp-label-color:var(--color-orange)");
    });

    it("allows the registry label to be overridden", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp
                collection="personnage"
                meta="categorie"
                slug="scientifique"
                label="Scientifiques"
            />,
        );

        expect(markup).toContain("Scientifiques");
        expect(markup).not.toContain("Scientifiques et inventeurs");
    });

    it("uses a selectable font and an LRZ label color", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp
                collection="index"
                slug="flore"
                font="signature"
                labelColor="rouge"
            />,
        );

        expect(markup).toContain('data-font="signature"');
        expect(markup).toContain("--lrz-stamp-label-color:var(--color-rouge)");
    });

    it("supports preset and custom label sizes", () => {
        const presetMarkup = renderToStaticMarkup(
            <LRZStamp collection="index" slug="flore" labelSize="lg" />,
        );
        const customMarkup = renderToStaticMarkup(
            <LRZStamp collection="index" slug="flore" labelSize={18} />,
        );

        expect(presetMarkup).toContain('data-label-size="lg"');
        expect(presetMarkup).toContain("--lrz-stamp-label-size:16px");
        expect(customMarkup).toContain('data-label-size="custom"');
        expect(customMarkup).toContain("--lrz-stamp-label-size:18px");
    });

    it("supports independent horizontal and vertical padding", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp
                collection="index"
                slug="faune"
                padding="sm"
                paddingX="lg"
                paddingY={6}
            />,
        );

        expect(markup).toContain('data-padding="sm"');
        expect(markup).toContain('data-padding-x="lg"');
        expect(markup).toContain('data-padding-y="custom"');
        expect(markup).toContain("--lrz-stamp-padding-y:6px");
    });

    it("uses the item LRZ color when labelColor is omitted", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="index" slug="flore" />,
        );

        expect(markup).toContain(
            "--lrz-stamp-label-color:var(--color-nature-prairie)",
        );
    });
});
