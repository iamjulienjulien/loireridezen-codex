import type { MetadataRoute } from "next";

import { getCanonicalUrl } from "@/lib/site-metadata";
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
        ...getCollectionsForEnv("production").map(
            (collection) => collection.href,
        ),
    ];

    return paths.map((path) => ({
        url: getCanonicalUrl(path).toString(),
    }));
}
