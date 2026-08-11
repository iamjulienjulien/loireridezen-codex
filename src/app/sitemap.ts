import type { MetadataRoute } from "next";

import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/catalogue-faune.json";
import floreData from "@data/catalogue-flore.json";
import guinguettesData from "@data/catalogue-guinguettes.json";
import personnagesData from "@data/catalogue-personnages.json";
import territoiresData from "@data/catalogue-territoires.json";
import vignoblesData from "@data/catalogue-vignobles.json";
import { getCollectionsForPublicationEnv } from "@/lib/publication-guards";
import { getCanonicalUrl } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";

const STATIC_PUBLIC_PATHS = [
    "/",
    "/carte",
    "/a-propos",
    "/mentions-legales",
    "/docs",
    "/docs/api",
    "/docs/sdk",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        ...STATIC_PUBLIC_PATHS,
        ...getIndexesForEnv("production").map((index) => index.href),
        ...getCollectionsForPublicationEnv("production").map(
            (collection) => collection.href,
        ),
        ...chateauData.chateaux.map((chateau) => `/chateau/${chateau.slug}`),
        ...guinguettesData.guinguettes.map(
            (guinguette) => `/guinguette/${guinguette.slug}`,
        ),
        ...territoiresData.territoires.map(
            (territoire) => `/territoire/${territoire.slug}`,
        ),
        ...vignoblesData.vignobles.map(
            (vignoble) => `/vignoble/${vignoble.slug}`,
        ),
        ...fauneData.especes.map((espece) => `/faune/${espece.slug}`),
        ...floreData.flore.map((flore) => `/flore/${flore.slug}`),
        ...personnagesData.personnages.map(
            (personnage) => `/personnage/${personnage.id}`,
        ),
    ];

    return paths.map((path) => ({
        url: getCanonicalUrl(path).toString(),
    }));
}
