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
    PERSONNAGES,
    PersonnagesRoute,
    getPersonnageBySlug,
} from "@/app/personnages/PersonnagesRoute";

type PersonnagePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return PERSONNAGES.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({
    params,
}: PersonnagePageProps): Promise<Metadata> {
    requireIndexForEnv("personnages");
    const { slug } = await params;
    const personnage = getPersonnageBySlug(slug);

    if (!personnage) return {};

    const title = buildItemPageTitle(personnage.nom, "Personnages de la Loire");
    const socialTitle = buildItemSocialTitle(
        "♜",
        personnage.nom,
        "Personnages de la Loire",
    );
    const description = `${personnage.nom}, ${personnage.roles.join(" et ") || "figure liée aux récits ligériens"}. Découvrez ses liens avec les châteaux dans le Codex Ligérien.`;
    const canonical = getCanonicalUrl(`/personnage/${personnage.id}`);
    const image = getCodexOgImageUrl("personnage", personnage.id);

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

export default async function PersonnagePage({ params }: PersonnagePageProps) {
    requireIndexForEnv("personnages");
    const { slug } = await params;
    if (!getPersonnageBySlug(slug)) notFound();
    return <PersonnagesRoute initialOpenSlug={slug} />;
}
