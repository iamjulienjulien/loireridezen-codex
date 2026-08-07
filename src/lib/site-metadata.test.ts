import { describe, expect, it } from "vitest";

import {
    buildPageMetadata,
    getCanonicalUrl,
    SITE_DESCRIPTION,
    SITE_TITLE,
    SITE_URL,
} from "./site-metadata";

describe("site metadata", () => {
    it("keeps the title within the recommended SEO length", () => {
        expect(SITE_TITLE.length).toBeGreaterThanOrEqual(50);
        expect(SITE_TITLE.length).toBeLessThanOrEqual(60);
    });

    it("keeps the description within the recommended SEO length", () => {
        expect(SITE_DESCRIPTION.length).toBeGreaterThanOrEqual(120);
        expect(SITE_DESCRIPTION.length).toBeLessThanOrEqual(160);
    });

    it("builds canonical URLs on the production origin", () => {
        expect(SITE_URL).toBe("https://codex.loireridezen.bike");
        expect(getCanonicalUrl("/").toString()).toBe(`${SITE_URL}/`);
        expect(getCanonicalUrl("/faune").toString()).toBe(`${SITE_URL}/faune`);
    });

    it("builds complete and synchronized page metadata", () => {
        const metadata = buildPageMetadata({
            kind: "page",
            href: "/exemple",
            title: "Titre affiché",
            description: "Description affichée",
            seo: {
                title: "Titre SEO complet",
                description: "Description SEO complète",
            },
        });

        expect(metadata).toMatchObject({
            title: "Titre SEO complet",
            description: "Description SEO complète",
            alternates: {
                canonical: new URL(`${SITE_URL}/exemple`),
            },
            robots: {
                index: true,
                follow: true,
            },
            openGraph: {
                title: "Titre SEO complet",
                description: "Description SEO complète",
                url: new URL(`${SITE_URL}/exemple`),
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Titre SEO complet",
                description: "Description SEO complète",
            },
        });
    });

    it("applies noindex and article Open Graph options", () => {
        const metadata = buildPageMetadata(
            {
                kind: "collection",
                href: "/chateaux/collections/exemple",
                title: "Collection exemple",
                description: "Description de la collection exemple",
                seo: {
                    indexable: false,
                },
            },
            { openGraphType: "article" },
        );

        expect(metadata).toMatchObject({
            robots: {
                index: false,
                follow: false,
            },
            openGraph: {
                type: "article",
            },
        });
    });
});
