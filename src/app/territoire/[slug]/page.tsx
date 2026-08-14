import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    TERRITOIRES,
    getTerritoireBySlug,
    TerritoiresRoute,
} from "@/app/territoires/TerritoiresRoute";
import { VIGNOBLES } from "@/app/vignobles/VignoblesRoute";
import { resolveCardReturnContext } from "@/lib/card-return-context";
import { getCodexOgImageUrl } from "@/lib/og-data";
import { requireIndexForEnv } from "@/lib/publication-guards";
import {
    buildItemPageTitle,
    buildItemSocialTitle,
    getCanonicalUrl,
} from "@/lib/site-metadata";

type TerritoirePageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ retour?: string | string[] }>;
};

export function generateStaticParams() {
    return TERRITOIRES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: TerritoirePageProps): Promise<Metadata> {
    requireIndexForEnv("territoires");
    const { slug } = await params;
    const territoire = getTerritoireBySlug(slug);

    if (!territoire) return {};

    const title = buildItemPageTitle(territoire.nom, "Territoires de la Loire");
    const socialTitle = buildItemSocialTitle(
        "🗺️",
        territoire.nom,
        "Territoires de la Loire",
    );
    const description = territoire.description;
    const canonical = getCanonicalUrl(`/territoire/${territoire.slug}`);
    const image = getCodexOgImageUrl("territoire", territoire.slug);

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

export default async function TerritoirePage({
    params,
    searchParams,
}: TerritoirePageProps) {
    requireIndexForEnv("territoires");
    const { slug } = await params;
    const { retour } = await searchParams;

    if (!getTerritoireBySlug(slug)) notFound();

    return (
        <TerritoiresRoute
            initialOpenSlug={slug}
            returnContext={resolveCardReturnContext(retour, {
                vignobles: VIGNOBLES,
                territoires: TERRITOIRES,
            })}
        />
    );
}
