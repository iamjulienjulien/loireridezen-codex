import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { IndexCardTrackingProvider } from "./IndexCardTrackingProvider";
import TrackedCardLink, {
    resolveCardTrackingPosition,
} from "./TrackedCardLink";

describe("resolveCardTrackingPosition", () => {
    const canonicalOrder = ["amboise", "blois", "chambord"];

    it("returns the one-based position from the canonical index order", () => {
        expect(resolveCardTrackingPosition(canonicalOrder, "blois")).toEqual({
            position: 2,
            totalItems: 3,
        });
    });

    it("does not resolve an entry outside the canonical index", () => {
        expect(resolveCardTrackingPosition(canonicalOrder, "inconnu")).toBe(
            null,
        );
    });
});

describe("TrackedCardLink", () => {
    it("exposes card tracking metadata inside an index inventory", () => {
        const markup = renderToStaticMarkup(
            <IndexCardTrackingProvider
                indexSlug="chateaux"
                entrySlugs={["amboise", "blois", "chambord"]}
            >
                <TrackedCardLink entrySlug="blois" href="/chateau/blois">
                    Blois
                </TrackedCardLink>
            </IndexCardTrackingProvider>,
        );

        expect(markup).toContain('data-analytics-event="card_open"');
        expect(markup).toContain('data-analytics-index-slug="chateaux"');
        expect(markup).toContain('data-analytics-entry-slug="blois"');
        expect(markup).toContain('data-analytics-position="2"');
        expect(markup).toContain('data-analytics-total-items="3"');
    });

    it("falls back to a regular link outside an index inventory", () => {
        const markup = renderToStaticMarkup(
            <TrackedCardLink entrySlug="blois" href="/chateau/blois">
                Blois
            </TrackedCardLink>,
        );

        expect(markup).toContain('href="/chateau/blois"');
        expect(markup).not.toContain("data-analytics-event");
    });
});
