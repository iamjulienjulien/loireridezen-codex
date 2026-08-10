import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCodexOgImageUrl } from "@/lib/og-data";
import { requireIndexForEnv } from "@/lib/publication-guards";
import {
    buildItemPageTitle,
    buildItemSocialTitle,
    getCanonicalUrl,
} from "@/lib/site-metadata";

import {
    CHATEAUX,
    ChateauxRoute,
    getChateauBySlug,
} from "@/app/chateaux/ChateauxRoute";

type ChateauPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return CHATEAUX.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: ChateauPageProps): Promise<Metadata> {
    requireIndexForEnv("chateaux");
    const { slug } = await params;
    const chateau = getChateauBySlug(slug);

    if (!chateau) {
        return {};
    }

    const title = buildItemPageTitle(chateau.nom, "Châteaux de la Loire");
    const socialTitle = buildItemSocialTitle(
        "🏰",
        chateau.nom,
        "Châteaux de la Loire",
    );
    const description =
        chateau.resume ??
        `${chateau.nom}, ${chateau.sousTitre.toLowerCase()}. Découvrez sa place dans le Codex Ligérien.`;
    const canonical = getCanonicalUrl(`/chateau/${chateau.slug}`);
    const image = getCodexOgImageUrl("chateau", chateau.slug);

    return {
        title,
        description,
        alternates: { canonical },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            type: "article",
            locale: "fr_FR",
            siteName: "Loire Ride Zen",
            title: socialTitle,
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
            title: socialTitle,
            description,
            images: [image],
        },
    };
}

export default async function ChateauPage({ params }: ChateauPageProps) {
    requireIndexForEnv("chateaux");
    const { slug } = await params;

    if (!getChateauBySlug(slug)) {
        notFound();
    }

    return <ChateauxRoute initialOpenSlug={slug} />;
}
