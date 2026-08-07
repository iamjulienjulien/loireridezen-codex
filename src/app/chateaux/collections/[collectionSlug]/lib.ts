// src/app/chateaux/collections/[collectionSlug]/lib.ts

import chateauCatalog from "@data/catalogue-chateaux.json";

import type {
    CollectionPodiumEntry,
    CollectionPodiumRank,
} from "@/components/ui/collection-podium";

import type {
    CollectionRankingEntry,
    CollectionRegistryEntry,
} from "@/registry/collections";

import type { ChateauV2 } from "@/types/chateauV2";

export type ResolvedCollectionEntry = {
    collectionEntry: CollectionRankingEntry;
    castle: ChateauV2;
};

export type ResolvedCollectionPage = {
    collection: CollectionRegistryEntry;
    entries: ResolvedCollectionEntry[];
    podium: CollectionPodiumEntry[];
};

type ChateauCatalogShape = {
    chateaux?: ChateauV2[];
    items?: ChateauV2[];
    entries?: ChateauV2[];
    catalogue?: ChateauV2[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getChateauCatalog(): readonly ChateauV2[] {
    const data: unknown = chateauCatalog;

    if (Array.isArray(data)) {
        return data as ChateauV2[];
    }

    if (!isRecord(data)) {
        throw new Error(
            "Le fichier catalogue-chateaux.json ne contient pas un catalogue valide.",
        );
    }

    const catalog = data as ChateauCatalogShape;

    if (Array.isArray(catalog.chateaux)) {
        return catalog.chateaux;
    }

    if (Array.isArray(catalog.items)) {
        return catalog.items;
    }

    if (Array.isArray(catalog.entries)) {
        return catalog.entries;
    }

    if (Array.isArray(catalog.catalogue)) {
        return catalog.catalogue;
    }

    throw new Error(
        [
            "Impossible de trouver la liste des châteaux dans catalogue-chateaux.json.",
            "Formats attendus : tableau direct, chateaux[], items[], entries[] ou catalogue[].",
        ].join(" "),
    );
}

export function getChateauBySlug(slug: string): ChateauV2 | undefined {
    return getChateauCatalog().find((castle) => castle.slug === slug);
}

function isPodiumEntry(
    entry: ResolvedCollectionEntry,
): entry is ResolvedCollectionEntry & {
    collectionEntry: CollectionRankingEntry & {
        rang: CollectionPodiumRank;
    };
} {
    return (
        entry.collectionEntry.rang === 1 ||
        entry.collectionEntry.rang === 2 ||
        entry.collectionEntry.rang === 3
    );
}

function buildCastleLocation(castle: ChateauV2): string {
    return `${castle.commune} · ${castle.departement}`;
}

export function resolveCollectionPage(
    collection: CollectionRegistryEntry,
): ResolvedCollectionPage {
    const entries = collection.ranking.map((collectionEntry) => {
        const castle = getChateauBySlug(collectionEntry.slug);

        if (!castle) {
            throw new Error(
                [
                    `Le château "${collectionEntry.slug}"`,
                    `référencé dans la collection "${collection.slug}"`,
                    "est absent du catalogue catalogue-chateaux.json.",
                ].join(" "),
            );
        }

        return {
            collectionEntry,
            castle,
        };
    });

    const podium: CollectionPodiumEntry[] = entries
        .filter(isPodiumEntry)
        .map(({ collectionEntry, castle }) => ({
            rang: collectionEntry.rang,
            raison: collectionEntry.raison,
            castle: {
                slug: castle.slug,
                nom: castle.nom,
                epoque: castle.epoque,
                lieu: buildCastleLocation(castle),
                illustration: castle.illustrations.jour,
            },
        }));

    return {
        collection,
        entries,
        podium,
    };
}
