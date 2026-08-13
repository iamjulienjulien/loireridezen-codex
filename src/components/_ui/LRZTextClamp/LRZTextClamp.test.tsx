import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import LRZTextClamp from "./LRZTextClamp";

describe("LRZTextClamp", () => {
    it("renders a semantic element with a normalized line count", () => {
        const markup = renderToStaticMarkup(
            <LRZTextClamp as="h3" lines={2} fixedHeight>
                Martin-pêcheur d’Europe
            </LRZTextClamp>,
        );

        expect(markup).toContain("<h3");
        expect(markup).toContain('data-lines="2"');
        expect(markup).toContain('data-fixed-height="true"');
        expect(markup).toContain("--lrz-text-clamp-lines:2");
    });

    it("falls back to one line for an invalid value", () => {
        const markup = renderToStaticMarkup(
            <LRZTextClamp lines={0}>Sterne pierregarin</LRZTextClamp>,
        );

        expect(markup).toContain('data-lines="1"');
        expect(markup).toContain("--lrz-text-clamp-lines:1");
    });

    it("supports LRZ typography options", () => {
        const markup = renderToStaticMarkup(
            <LRZTextClamp
                font="display"
                size="xl"
                weight="semibold"
                color="orange-cuivre"
                align="center"
            >
                Grand rhinolophe
            </LRZTextClamp>,
        );

        expect(markup).toContain('data-font="display"');
        expect(markup).toContain('data-size="xl"');
        expect(markup).toContain('data-weight="semibold"');
        expect(markup).toContain('data-align="center"');
        expect(markup).toContain(
            "--lrz-text-clamp-color:var(--color-orange-cuivre)",
        );
    });
});
