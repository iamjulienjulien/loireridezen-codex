// src/components/codex/atelier/mockCollectionHero.ts

import type { CollectionHeroData } from "@/components/ui/collection-hero";

export const MOCK_COLLECTION_HEROES: CollectionHeroData[] = [
    {
        slug: "incontournables-du-val",
        titre: "Les incontournables du Val",
        emoji: "👑",
        eyebrow: "Collection essentielle",
        sousTitre: "Dix châteaux pour comprendre l’essentiel du récit ligérien",
        description:
            "Une traversée des grandes architectures, des résidences royales et des paysages qui ont donné au Val de Loire son visage monumental.",
        type: "general",
        totalEntries: 10,
        illustration: "/emoji/chateau/chambord.png",
        meta: ["10 châteaux", "Val de Loire", "Architecture & histoire"],
    },
    {
        slug: "chefs-doeuvre-de-la-renaissance",
        titre: "Les chefs-d’œuvre de la Renaissance",
        emoji: "🏛️",
        eyebrow: "Architecture",
        sousTitre:
            "Une traversée des façades, galeries et escaliers qui ont réinventé l’art de bâtir",
        description:
            "Des premières influences italiennes aux grandes compositions royales, une lecture architecturale du siècle de François Ier.",
        type: "architecture",
        totalEntries: 8,
        illustration: "/emoji/chateau/blois.png",
        meta: ["8 châteaux", "Renaissance", "Architecture"],
    },
    {
        slug: "jardins-remarquables",
        titre: "Les plus beaux jardins",
        emoji: "🌿",
        eyebrow: "Paysages composés",
        sousTitre:
            "Parterres, terrasses et perspectives où le paysage devient une œuvre à parcourir",
        description:
            "Du jardin régulier aux créations contemporaines, ces domaines racontent une autre histoire du château, écrite dans le végétal.",
        type: "jardins",
        totalEntries: 6,
        illustration: "/emoji/chateau/villandry.png",
        meta: ["6 domaines", "Jardins", "Paysage & botanique"],
    },
    {
        slug: "forteresses-au-fil-de-la-loire",
        titre: "Forteresses au fil de la Loire",
        emoji: "🛡️",
        eyebrow: "Itinéraire fortifié",
        sousTitre:
            "Des remparts d’Anjou aux places fortes de Touraine, une Loire de pierre et de pouvoir",
        description:
            "Un parcours à travers les citadelles, enceintes et résidences défensives qui surveillaient autrefois le fleuve et ses vallées.",
        type: "itineraire",
        totalEntries: 9,
        illustration: "/emoji/chateau/chinon.png",
        meta: ["9 forteresses", "Anjou & Touraine", "Histoire militaire"],
    },
    {
        slug: "demeures-confidentielles",
        titre: "Les demeures confidentielles",
        emoji: "🗝️",
        eyebrow: "Chemins de traverse",
        sousTitre:
            "Six châteaux plus discrets, loin des grands cortèges touristiques",
        description:
            "Des maisons habitées, des jardins secrets et des silhouettes que l’on découvre au détour d’une route secondaire.",
        type: "decouverte",
        totalEntries: 6,
        illustration: "/emoji/chateau/montpoupon.png",
        meta: ["6 demeures", "Hors des foules", "Découverte"],
    },
    {
        slug: "grandes-heures-de-l-histoire",
        titre: "Les grandes heures de l’Histoire",
        emoji: "⚔️",
        eyebrow: "Chroniques du royaume",
        sousTitre:
            "Huit lieux où le destin politique du royaume a changé de direction",
        description:
            "Rencontres diplomatiques, drames dynastiques et décisions royales composent une traversée du grand récit français.",
        type: "histoire",
        totalEntries: 8,
        illustration: "/emoji/chateau/chenonceau.png",
        meta: ["8 lieux", "Moyen Âge & Renaissance", "Personnages historiques"],
    },
];
