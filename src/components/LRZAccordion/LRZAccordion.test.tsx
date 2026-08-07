import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import LRZAccordion from "./LRZAccordion";

describe("LRZAccordion", () => {
    it("hides a closed panel without animation", () => {
        const markup = renderToStaticMarkup(
            <LRZAccordion title="Histoire">Contenu</LRZAccordion>,
        );

        expect(markup).toContain('data-state="closed"');
        expect(markup).toMatch(/\shidden=""/);
        expect(markup).not.toContain('data-animated="true"');
    });

    it("keeps an animated closed panel mounted but inaccessible", () => {
        const markup = renderToStaticMarkup(
            <LRZAccordion title="Histoire" animated>
                Contenu
            </LRZAccordion>,
        );

        expect(markup).toContain('data-animated="true"');
        expect(markup).toContain('aria-hidden="true" inert=""');
        expect(markup).not.toMatch(/\shidden=""/);
    });

    it("exposes an animated open panel", () => {
        const markup = renderToStaticMarkup(
            <LRZAccordion title="Histoire" animated open>
                Contenu
            </LRZAccordion>,
        );

        expect(markup).toContain('data-state="open"');
        expect(markup).not.toContain('aria-hidden="true" inert=""');
        expect(markup).not.toMatch(/\sinert=""/);
    });
});
