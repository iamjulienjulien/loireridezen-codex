import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCodexOgImageUrl } from "@/lib/og-data";
import {
    buildItemPageTitle,
    buildItemSocialTitle,
    getCanonicalUrl,
} from "@/lib/site-metadata";

import {
    FLORE_ENTRIES,
    FloreRoute,
    getFloreBySlug,
} from "@/app/flore/FloreRoute";

type FlorePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return FLORE_ENTRIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: FlorePageProps): Promise<Metadata> {
    const { slug } = await params;
    const flore = getFloreBySlug(slug);

    if (!flore) return {};

    const title = buildItemPageTitle(flore.nomCommun, "Flore ligérienne");
    const socialTitle = buildItemSocialTitle(
        "🌿",
        flore.nomCommun,
        "Flore ligérienne",
    );
    const description = `${flore.nomCommun} (${flore.nomScientifique}), ${flore.sousTitre.toLowerCase()}. Découvrez cette plante de la Loire dans le Codex Ligérien.`;
    const canonical = getCanonicalUrl(`/flore/${flore.slug}`);
    const image = getCodexOgImageUrl("flore", flore.slug);

    return {
        title,
        description,
        alternates: { canonical },
        robots: { index: true, follow: true },
        openGraph: {
            type: "article",
            locale: "fr_FR",
            siteName: "Loire Ride Zen",
            title: socialTitle,
            description,
            url: canonical,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description,
            images: [image],
        },
    };
}

export default async function FlorePage({ params }: FlorePageProps) {
    const { slug } = await params;
    if (!getFloreBySlug(slug)) notFound();
    return <FloreRoute initialOpenSlug={slug} />;
}
