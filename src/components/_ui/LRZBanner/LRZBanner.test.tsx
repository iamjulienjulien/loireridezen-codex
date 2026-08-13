import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import LRZBanner from "./LRZBanner";

describe("LRZBanner", () => {
    it("renders a labelled non-modal section", () => {
        const markup = renderToStaticMarkup(
            <LRZBanner title="Suivre le fil" titleId="banner-title">
                <p>Une information utile au voyage.</p>
            </LRZBanner>,
        );

        expect(markup).toContain("<section");
        expect(markup).toContain('aria-labelledby="banner-title"');
        expect(markup).toContain('<h2 id="banner-title"');
        expect(markup).not.toContain('role="dialog"');
    });

    it("exposes its visual variants and LRZ color", () => {
        const markup = renderToStaticMarkup(
            <LRZBanner
                title="Une halte"
                tone="contrast"
                position="fixed-bottom"
                color="eau"
            >
                Le fleuve continue.
            </LRZBanner>,
        );

        expect(markup).toContain('data-tone="contrast"');
        expect(markup).toContain('data-position="fixed-bottom"');
        expect(markup).toContain('data-color="eau"');
        expect(markup).toContain("--banner-color:var(--color-nature-eau)");
    });

    it("renders optional context, icon and actions", () => {
        const markup = renderToStaticMarkup(
            <LRZBanner
                title="Préférences"
                titleAs="h3"
                eyebrow="Le Codex"
                icon={<span>✦</span>}
                actions={<button type="button">Choisir</button>}
            >
                Une bannière composable.
            </LRZBanner>,
        );

        expect(markup).toContain("<h3");
        expect(markup).toContain("Le Codex");
        expect(markup).toContain("Choisir");
        expect(markup).toContain('aria-hidden="true"');
    });
});
