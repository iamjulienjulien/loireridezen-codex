import type { MetadataRoute } from "next";

import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/faune.json";
import floreData from "@data/flore.json";
import guinguettesData from "@data/catalogue-guinguettes.json";
import personnagesData from "@data/catalogue-personnages.json";
import { getCanonicalUrl } from "@/lib/site-metadata";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getCollectionsForEnv } from "@/registry/collections";
import { getIndexesForEnv } from "@/registry/indexes";

const STATIC_PUBLIC_PATHS = [
    "/",
    "/a-propos",
    "/docs",
    "/docs/api",
    "/docs/sdk",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        ...STATIC_PUBLIC_PATHS,
        ...getIndexesForEnv("production").map((index) => index.href),
        ...(featureIsEnabled("collections", "production")
            ? getCollectionsForEnv("production").map(
                  (collection) => collection.href,
              )
            : []),
        ...chateauData.chateaux.map((chateau) => `/chateau/${chateau.slug}`),
        ...guinguettesData.guinguettes.map(
            (guinguette) => `/guinguette/${guinguette.slug}`,
        ),
        ...fauneData.especes.map((espece) => `/faune/${espece.slug}`),
        ...floreData.flore.map((flore) => `/flore/${flore.slug}`),
        ...(featureIsEnabled("personnages", "production")
            ? personnagesData.personnages.map(
                  (personnage) => `/personnage/${personnage.id}`,
              )
            : []),
    ];

    return paths.map((path) => ({
        url: getCanonicalUrl(path).toString(),
    }));
}
