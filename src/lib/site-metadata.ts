import type { Metadata } from "next";

import type { PageDefinitionBase, PageKind } from "@/types/page";

export const SITE_URL = "https://codex.loireridezen.bike";

export const SITE_TITLE =
    "Loire Ride Zen — Le Codex vivant des trésors du Val de Loire";

export const SITE_DESCRIPTION =
    "Parcourez le Val de Loire dans un codex vivant consacré à ses châteaux, sa faune, sa flore, ses vignobles et aux récits du fleuve.";

export const SITE_OG_IMAGE = "/api/og";

export const getCanonicalUrl = (pathname: string): URL =>
    new URL(pathname, SITE_URL);

export interface BuildPageMetadataOptions {
    openGraphType?: "website" | "article";
}

export const buildPageMetadata = (
    page: PageDefinitionBase<PageKind>,
    { openGraphType = "website" }: BuildPageMetadataOptions = {},
): Metadata => {
    const title = page.seo?.title ?? page.title;
    const description = page.seo?.description ?? page.description;
    const image = page.seo?.image ?? SITE_OG_IMAGE;
    const indexable = page.seo?.indexable ?? true;
    const canonical = getCanonicalUrl(page.href);

    return {
        title,
        description,
        alternates: {
            canonical,
        },
        robots: {
            index: indexable,
            follow: indexable,
        },
        openGraph: {
            type: openGraphType,
            locale: "fr_FR",
            siteName: "Loire Ride Zen",
            title,
            description,
            url: canonical,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [
                {
                    url: image,
                    alt: title,
                },
            ],
        },
    };
};
