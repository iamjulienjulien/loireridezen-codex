// mockCollectionBadge.ts

import type { CollectionBadgeData } from "@/components/ui/collection-badge";

export const MOCK_COLLECTION_BADGES: CollectionBadgeData[] = [
    {
        slug: "incontournables-du-val",
        label: "Incontournables",
        emoji: "👑",
        type: "general",
    },
    {
        slug: "chefs-doeuvre-de-la-renaissance",
        label: "Renaissance",
        emoji: "🏛️",
        type: "architecture",
    },
    {
        slug: "jardins-remarquables",
        label: "Jardins remarquables",
        emoji: "🌿",
        type: "jardins",
    },
    {
        slug: "forteresses-au-fil-de-la-loire",
        label: "Forteresses",
        emoji: "🛡️",
        type: "itineraire",
    },
    {
        slug: "demeures-confidentielles",
        label: "Confidentiels",
        emoji: "🗝️",
        type: "decouverte",
    },
    {
        slug: "grandes-heures-de-l-histoire",
        label: "Grandes heures",
        emoji: "⚔️",
        type: "histoire",
    },
];
