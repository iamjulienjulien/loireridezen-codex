import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCodexOgImageUrl } from "@/lib/og-data";
import {
    buildItemPageTitle,
    buildItemSocialTitle,
    getCanonicalUrl,
} from "@/lib/site-metadata";

import {
    GUINGUETTES,
    getGuinguetteBySlug,
    GuinguettesRoute,
} from "@/app/guinguettes/GuinguettesRoute";

type GuinguettePageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return GUINGUETTES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: GuinguettePageProps): Promise<Metadata> {
    const { slug } = await params;
    const guinguette = getGuinguetteBySlug(slug);

    if (!guinguette) return {};

    const title = buildItemPageTitle(guinguette.nom, "Guinguettes de Loire");
    const socialTitle = buildItemSocialTitle(
        "🍷",
        guinguette.nom,
        "Guinguettes de Loire",
    );
    const description =
        guinguette.description ||
        `${guinguette.nom}, une adresse du fil ligérien à ${guinguette.commune}.`;
    const canonical = getCanonicalUrl(`/guinguette/${guinguette.slug}`);
    const image = getCodexOgImageUrl("guinguette", guinguette.slug);

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

export default async function GuinguettePage({ params }: GuinguettePageProps) {
    const { slug } = await params;

    if (!getGuinguetteBySlug(slug)) notFound();

    return <GuinguettesRoute initialOpenSlug={slug} />;
}
