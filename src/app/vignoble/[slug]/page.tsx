import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    VIGNOBLES,
    VignoblesRoute,
    getVignobleBySlug,
} from "@/app/vignobles/VignoblesRoute";
import { getCodexOgImageUrl } from "@/lib/og-data";
import {
    buildItemPageTitle,
    buildItemSocialTitle,
    getCanonicalUrl,
} from "@/lib/site-metadata";

type VignoblePageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return VIGNOBLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: VignoblePageProps): Promise<Metadata> {
    const { slug } = await params;
    const vignoble = getVignobleBySlug(slug);

    if (!vignoble) return {};

    const title = buildItemPageTitle(vignoble.nom, "Vignobles de la Loire");
    const socialTitle = buildItemSocialTitle(
        "🍷",
        vignoble.nom,
        "Vignobles de la Loire",
    );
    const description =
        vignoble.resume ??
        `${vignoble.nom}, ${vignoble.sousTitre}. Découvrez cette appellation, ses cépages et ses terroirs dans le Codex Ligérien.`;
    const canonical = getCanonicalUrl(`/vignoble/${vignoble.slug}`);
    const image = getCodexOgImageUrl("vignoble", vignoble.slug);

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

export default async function VignoblePage({ params }: VignoblePageProps) {
    const { slug } = await params;

    if (!getVignobleBySlug(slug)) notFound();

    return <VignoblesRoute initialOpenSlug={slug} />;
}
