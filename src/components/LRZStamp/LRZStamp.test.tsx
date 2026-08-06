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

    it("uses the item LRZ color when labelColor is omitted", () => {
        const markup = renderToStaticMarkup(
            <LRZStamp collection="index" slug="flore" />,
        );

        expect(markup).toContain(
            "--lrz-stamp-label-color:var(--color-nature-prairie)",
        );
    });
});
