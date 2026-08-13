import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import PageControls from "./PageControls";

describe("PageControls", () => {
    it("exposes the active-filter count and reset action", () => {
        const markup = renderToStaticMarkup(
            <PageControls
                query="Loire"
                onQuery={vi.fn()}
                mode="filters-toggle"
                reset={{ active: true, onReset: vi.fn() }}
                groups={[
                    {
                        label: "Type",
                        active: "chateau",
                        options: [],
                        onSelect: vi.fn(),
                    },
                    {
                        label: "Époque",
                        active: "renaissance",
                        options: [],
                        onSelect: vi.fn(),
                    },
                ]}
            />,
        );

        expect(markup).toContain('aria-label="2 filtres actifs"');
        expect(markup).toContain(">2</span>");
        expect(markup).toContain("Réinitialiser");
    });

    it("omits filter indicators when every group is neutral", () => {
        const markup = renderToStaticMarkup(
            <PageControls
                query=""
                onQuery={vi.fn()}
                mode="filters-toggle"
                reset={{ active: false, onReset: vi.fn() }}
                groups={[
                    {
                        label: "Type",
                        active: "all",
                        options: [],
                        onSelect: vi.fn(),
                    },
                ]}
            />,
        );

        expect(markup).not.toContain("filtre actif");
        expect(markup).not.toContain("Réinitialiser");
    });
});
