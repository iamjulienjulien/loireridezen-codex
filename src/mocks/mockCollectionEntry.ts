// mockCollectionEntry.ts

import type {
    CollectionEntry,
    CollectionEntryCastle,
} from "@/components/ui/collection-entry-card";

export type MockCollectionEntry = {
    collectionEntry: CollectionEntry;
    castle: CollectionEntryCastle;
};

export const MOCK_COLLECTION_ENTRIES: MockCollectionEntry[] = [
    {
        collectionEntry: {
            rang: 1,
            slug: "chateau-de-chambord",
            raison: "Le manifeste monumental de la Renaissance française, posé comme une cité idéale au cœur du domaine.",
        },
        castle: {
            slug: "chateau-de-chambord",
            nom: "Château de Chambord",
            epoque: "Renaissance",
            lieu: "Chambord · Loir-et-Cher",
            illustrations: {
                jour: "/illustrations/chateaux/chateau-de-chambord/jourx.png",
            },
            emoji: "🏰",
            renommee: "phare",
        },
    },
    {
        collectionEntry: {
            rang: 2,
            slug: "chateau-de-chenonceau",
            raison: "Une architecture suspendue au-dessus du Cher, façonnée par plusieurs grandes figures féminines.",
        },
        castle: {
            slug: "chateau-de-chenonceau",
            nom: "Château de Chenonceau",
            epoque: "Renaissance",
            lieu: "Chenonceaux · Indre-et-Loire",
            illustrations: {
                jour: "/illustrations/chateaux/chateau-de-chenonceau/jourx.png",
            },
            emoji: "🏛️",
            renommee: "phare",
        },
    },
    {
        collectionEntry: {
            rang: 3,
            slug: "chateau-royal-de-blois",
            raison: "Quatre ailes et quatre époques réunies dans un saisissant livre ouvert de l’architecture française.",
        },
        castle: {
            slug: "chateau-royal-de-blois",
            nom: "Château royal de Blois",
            epoque: "Renaissance",
            lieu: "Blois · Loir-et-Cher",
            illustrations: {
                jour: "/illustrations/chateaux/chateau-royal-de-blois/jourx.png",
            },
            emoji: "🏰",
            renommee: "majeur",
        },
    },
    {
        collectionEntry: {
            rang: 4,
            slug: "forteresse-royale-de-chinon",
            raison: "Une longue citadelle dominant la Vienne, indissociable de Jeanne d’Arc et du destin de Charles VII.",
        },
        castle: {
            slug: "forteresse-royale-de-chinon",
            nom: "Forteresse royale de Chinon",
            epoque: "Médiéval",
            lieu: "Chinon · Indre-et-Loire",
            illustrations: {
                jour: "/illustrations/chateaux/forteresse-royale-de-chinon/jourx.png",
            },
            emoji: "🛡️",
            renommee: "majeur",
        },
    },
    {
        collectionEntry: {
            rang: 5,
            slug: "chateau-de-villandry",
            raison: "Un château habité par ses jardins, où chaque terrasse compose une nouvelle scène végétale.",
        },
        castle: {
            slug: "chateau-de-villandry",
            nom: "Château de Villandry",
            epoque: "Renaissance",
            lieu: "Villandry · Indre-et-Loire",
            illustrations: {
                jour: "/illustrations/chateaux/chateau-de-villandry/jourx.png",
            },
            emoji: "🌿",
            renommee: "majeur",
        },
    },
    {
        collectionEntry: {
            rang: 6,
            slug: "chateau-de-saumur",
            raison: "Une silhouette presque irréelle dominant la Loire, entre forteresse, résidence princière et château de conte.",
        },
        castle: {
            slug: "chateau-de-saumur",
            nom: "Château de Saumur",
            epoque: "Médiéval",
            lieu: "Saumur · Maine-et-Loire",
            illustrations: {
                jour: "/illustrations/chateaux/chateau-de-saumur/jourx.png",
            },
            emoji: "🏯",
            renommee: "majeur",
        },
    },
];

import type { CollectionPodiumEntry } from "@/components/ui/collection-podium";

export const MOCK_COLLECTION_PODIUM: CollectionPodiumEntry[] = [
    {
        rang: 1,
        raison: "Le manifeste monumental de la Renaissance française, posé comme une cité idéale au cœur du domaine.",
        castle: {
            slug: "chateau-de-chambord",
            nom: "Château de Chambord",
            epoque: "Renaissance",
            lieu: "Chambord · Loir-et-Cher",
            illustration:
                "/illustrations/chateaux/chateau-de-chambord/jourx.png",
            emoji: "🏰",
        },
    },
    {
        rang: 2,
        raison: "Une architecture suspendue au-dessus du Cher, façonnée par plusieurs grandes figures féminines.",
        castle: {
            slug: "chateau-de-chenonceau",
            nom: "Château de Chenonceau",
            epoque: "Renaissance",
            lieu: "Chenonceaux · Indre-et-Loire",
            illustration:
                "/illustrations/chateaux/chateau-de-chenonceau/jourx.png",
            emoji: "🏛️",
        },
    },
    {
        rang: 3,
        raison: "Quatre ailes et quatre époques réunies dans un saisissant livre ouvert de l’architecture française.",
        castle: {
            slug: "chateau-royal-de-blois",
            nom: "Château royal de Blois",
            epoque: "Renaissance",
            lieu: "Blois · Loir-et-Cher",
            illustration:
                "/illustrations/chateaux/chateau-royal-de-blois/jourx.png",
            emoji: "🏰",
        },
    },
];
