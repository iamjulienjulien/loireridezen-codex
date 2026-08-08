import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCanonicalUrl, SITE_OG_IMAGE } from "@/lib/site-metadata";

import {
    FLORE_ENTRIES,
    FloreRoute,
    getFloreBySlug,
} from "@/app/flore/FloreRoute";

type FlorePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return FLORE_ENTRIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: FlorePageProps): Promise<Metadata> {
    const { slug } = await params;
    const flore = getFloreBySlug(slug);

    if (!flore) return {};

    const title = `${flore.nomCommun} — Flore ligérienne`;
    const description = `${flore.nomCommun} (${flore.nomScientifique}), ${flore.sousTitre.toLowerCase()}. Découvrez cette plante de la Loire dans le Codex ligérien.`;
    const canonical = getCanonicalUrl(`/flore/${flore.slug}`);

    return {
        title,
        description,
        alternates: { canonical },
        robots: { index: true, follow: true },
        openGraph: {
            type: "article",
            locale: "fr_FR",
            siteName: "Loire Ride Zen",
            title,
            description,
            url: canonical,
            images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [SITE_OG_IMAGE] },
    };
}

export default async function FlorePage({ params }: FlorePageProps) {
    const { slug } = await params;
    if (!getFloreBySlug(slug)) notFound();
    return <FloreRoute initialOpenSlug={slug} />;
}
