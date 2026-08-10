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
    FAUNE_ESPECES,
    FauneRoute,
    getFauneBySlug,
} from "@/app/faune/FauneRoute";

type FaunePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return FAUNE_ESPECES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: FaunePageProps): Promise<Metadata> {
    requireIndexForEnv("faune");
    const { slug } = await params;
    const espece = getFauneBySlug(slug);

    if (!espece) return {};

    const title = buildItemPageTitle(espece.nomCommun, "Faune ligérienne");
    const socialTitle = buildItemSocialTitle(
        "🪶",
        espece.nomCommun,
        "Faune ligérienne",
    );
    const description = `${espece.nomCommun} (${espece.nomScientifique}), ${espece.sousTitre.toLowerCase()}. Découvrez cette espèce de la Loire dans le Codex Ligérien.`;
    const canonical = getCanonicalUrl(`/faune/${espece.slug}`);
    const image = getCodexOgImageUrl("faune", espece.slug);

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

export default async function FaunePage({ params }: FaunePageProps) {
    requireIndexForEnv("faune");
    const { slug } = await params;
    if (!getFauneBySlug(slug)) notFound();
    return <FauneRoute initialOpenSlug={slug} />;
}
