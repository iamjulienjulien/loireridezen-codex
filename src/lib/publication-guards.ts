import { notFound } from "next/navigation";

import {
    COLLECTIONS,
    getCollectionBySlug,
    type CollectionRegistryEntry,
} from "@/registry/collections";
import { featureIsEnabled } from "@/registry/feature-flags";
import {
    getIndexBySlug,
    isEnv,
    type Env,
    type IndexEntry,
} from "@/registry/indexes";

export const resolvePublicationEnv = (explicitEnv?: Env): Env => {
    const value =
        explicitEnv ??
        process.env.CURRENT_ENV ??
        process.env.NEXT_PUBLIC_CURRENT_ENV;

    if (!isEnv(value)) {
        throw new Error(`CURRENT_ENV invalide ou absent : ${value}`);
    }

    return value;
};

export const getIndexForEnv = (
    slug: string,
    explicitEnv?: Env,
): IndexEntry | undefined => {
    const env = resolvePublicationEnv(explicitEnv);
    const index = getIndexBySlug(slug);

    return index?.etat === "publie" && index.env.includes(env)
        ? index
        : undefined;
};

export const requireIndexForEnv = (
    slug: string,
    explicitEnv?: Env,
): IndexEntry => {
    const index = getIndexForEnv(slug, explicitEnv);
    if (!index) notFound();
    return index;
};

export const getCollectionsForPublicationEnv = (
    explicitEnv?: Env,
): CollectionRegistryEntry[] => {
    const env = resolvePublicationEnv(explicitEnv);
    if (!featureIsEnabled("collections", env)) return [];

    return COLLECTIONS.filter(
        (collection) =>
            collection.etat === "publie" &&
            collection.env.some((environment) => environment === env) &&
            Boolean(getIndexForEnv(collection.indexSlug, env)),
    );
};

export const getCollectionForEnv = (
    slug: string,
    explicitEnv?: Env,
): CollectionRegistryEntry | undefined => {
    const collection = getCollectionBySlug(slug);
    if (!collection) return undefined;

    return getCollectionsForPublicationEnv(explicitEnv).find(
        ({ slug: candidate }) => candidate === collection.slug,
    );
};

export const requireCollectionForEnv = (
    slug: string,
    explicitEnv?: Env,
): CollectionRegistryEntry => {
    const collection = getCollectionForEnv(slug, explicitEnv);
    if (!collection) notFound();
    return collection;
};
