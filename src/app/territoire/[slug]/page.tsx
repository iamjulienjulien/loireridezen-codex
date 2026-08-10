import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    TERRITOIRES,
    getTerritoireBySlug,
    TerritoiresRoute,
} from "@/app/territoires/TerritoiresRoute";
import { getCanonicalUrl, SITE_OG_IMAGE } from "@/lib/site-metadata";

type TerritoirePageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return TERRITOIRES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: TerritoirePageProps): Promise<Metadata> {
    const { slug } = await params;
    const territoire = getTerritoireBySlug(slug);

    if (!territoire) return {};

    const title = `${territoire.nom} — Territoires de la Loire`;
    const description = territoire.description;
    const canonical = getCanonicalUrl(`/territoire/${territoire.slug}`);

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
            images: [
                {
                    url: SITE_OG_IMAGE,
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
            images: [SITE_OG_IMAGE],
        },
    };
}

export default async function TerritoirePage({ params }: TerritoirePageProps) {
    const { slug } = await params;

    if (!getTerritoireBySlug(slug)) notFound();

    return <TerritoiresRoute initialOpenSlug={slug} />;
}
