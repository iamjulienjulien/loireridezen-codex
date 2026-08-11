// mockCollection.ts

import type { CollectionCardData } from "@/components/ui/collection-card";

export const MOCK_COLLECTIONS: CollectionCardData[] = [
    {
        slug: "incontournables-du-val",
        titre: "Les incontournables du Val",
        emoji: "👑",
        sousTitre: "Dix châteaux pour comprendre l’essentiel du récit ligérien",
        type: "general",
        classement: [
            {
                rang: 1,
                slug: "chateau-de-chambord",
                nom: "Château de Chambord",
            },
            {
                rang: 2,
                slug: "chateau-de-chenonceau",
                nom: "Château de Chenonceau",
            },
            {
                rang: 3,
                slug: "chateau-royal-de-blois",
                nom: "Château royal de Blois",
            },
            {
                rang: 4,
                slug: "chateau-royal-d-amboise",
                nom: "Château royal d’Amboise",
            },
            {
                rang: 5,
                slug: "chateau-de-villandry",
                nom: "Château de Villandry",
            },
            {
                rang: 6,
                slug: "chateau-d-azay-le-rideau",
                nom: "Château d’Azay-le-Rideau",
            },
            {
                rang: 7,
                slug: "forteresse-royale-de-chinon",
                nom: "Forteresse royale de Chinon",
            },
            {
                rang: 8,
                slug: "chateau-de-saumur",
                nom: "Château de Saumur",
            },
            {
                rang: 9,
                slug: "chateau-d-angers",
                nom: "Château d’Angers",
            },
            {
                rang: 10,
                slug: "chateau-des-ducs-de-bretagne",
                nom: "Château des ducs de Bretagne",
            },
        ],
    },
    {
        slug: "chefs-doeuvre-de-la-renaissance",
        titre: "Les chefs-d’œuvre de la Renaissance",
        emoji: "🏛️",
        sousTitre:
            "Une traversée des façades, galeries et escaliers qui ont réinventé l’art de bâtir",
        type: "architecture",
        classement: [
            {
                rang: 1,
                slug: "chateau-de-chambord",
                nom: "Château de Chambord",
            },
            {
                rang: 2,
                slug: "chateau-de-chenonceau",
                nom: "Château de Chenonceau",
            },
            {
                rang: 3,
                slug: "chateau-d-azay-le-rideau",
                nom: "Château d’Azay-le-Rideau",
            },
            {
                rang: 4,
                slug: "chateau-royal-de-blois",
                nom: "Château royal de Blois",
            },
            {
                rang: 5,
                slug: "chateau-de-valencay",
                nom: "Château de Valençay",
            },
            {
                rang: 6,
                slug: "chateau-de-montpoupon",
                nom: "Château de Montpoupon",
            },
            {
                rang: 7,
                slug: "chateau-du-lude",
                nom: "Château du Lude",
            },
            {
                rang: 8,
                slug: "chateau-de-montreuil-bellay",
                nom: "Château de Montreuil-Bellay",
            },
        ],
    },
    {
        slug: "jardins-remarquables",
        titre: "Les plus beaux jardins",
        emoji: "🌿",
        sousTitre:
            "Parterres, terrasses et perspectives où le paysage devient une œuvre à parcourir",
        type: "jardins",
        classement: [
            {
                rang: 1,
                slug: "chateau-de-villandry",
                nom: "Château de Villandry",
            },
            {
                rang: 2,
                slug: "chateau-de-chaumont-sur-loire",
                nom: "Domaine de Chaumont-sur-Loire",
            },
            {
                rang: 3,
                slug: "chateau-du-rivau",
                nom: "Château du Rivau",
            },
            {
                rang: 4,
                slug: "chateau-de-cheverny",
                nom: "Château de Cheverny",
            },
            {
                rang: 5,
                slug: "chateau-de-valencay",
                nom: "Château de Valençay",
            },
            {
                rang: 6,
                slug: "chateau-de-saint-jean-de-beauregard",
                nom: "Château de Saint-Jean-de-Beauregard",
            },
        ],
    },
    {
        slug: "forteresses-au-fil-de-la-loire",
        titre: "Forteresses au fil de la Loire",
        emoji: "🛡️",
        sousTitre:
            "Des remparts d’Anjou aux places fortes de Touraine, une Loire de pierre et de pouvoir",
        type: "itineraire",
        classement: [
            {
                rang: 1,
                slug: "chateau-d-angers",
                nom: "Château d’Angers",
            },
            {
                rang: 2,
                slug: "forteresse-royale-de-chinon",
                nom: "Forteresse royale de Chinon",
            },
            {
                rang: 3,
                slug: "chateau-de-saumur",
                nom: "Château de Saumur",
            },
            {
                rang: 4,
                slug: "forteresse-de-montbazon",
                nom: "Forteresse de Montbazon",
            },
            {
                rang: 5,
                slug: "chateau-de-montreuil-bellay",
                nom: "Château de Montreuil-Bellay",
            },
            {
                rang: 6,
                slug: "chateau-de-chateaudun",
                nom: "Château de Châteaudun",
            },
            {
                rang: 7,
                slug: "chateau-de-vendome",
                nom: "Château de Vendôme",
            },
            {
                rang: 8,
                slug: "chateau-des-ducs-de-bretagne",
                nom: "Château des ducs de Bretagne",
            },
            {
                rang: 9,
                slug: "palais-ducal-de-nevers",
                nom: "Palais ducal de Nevers",
            },
        ],
    },
    {
        slug: "demeures-confidentielles",
        titre: "Les demeures confidentielles",
        emoji: "🗝️",
        sousTitre:
            "Six châteaux plus discrets, à découvrir loin des grands cortèges touristiques",
        type: "decouverte",
        classement: [
            {
                rang: 1,
                slug: "chateau-de-l-islette",
                nom: "Château de l’Islette",
            },
            {
                rang: 2,
                slug: "chateau-de-montpoupon",
                nom: "Château de Montpoupon",
            },
            {
                rang: 3,
                slug: "chateau-de-gizeux",
                nom: "Château de Gizeux",
            },
            {
                rang: 4,
                slug: "chateau-de-sache",
                nom: "Château de Saché",
            },
            {
                rang: 5,
                slug: "chateau-de-serrant",
                nom: "Château de Serrant",
            },
            {
                rang: 6,
                slug: "chateau-de-montgeoffroy",
                nom: "Château de Montgeoffroy",
            },
        ],
    },
    {
        slug: "grandes-heures-de-l-histoire",
        titre: "Les grandes heures de l’Histoire",
        emoji: "⚔️",
        sousTitre:
            "Des forteresses médiévales aux résidences royales, huit lieux où le destin du royaume a basculé",
        type: "histoire",
        classement: [
            {
                rang: 1,
                slug: "forteresse-royale-de-chinon",
                nom: "Forteresse royale de Chinon",
            },
            {
                rang: 2,
                slug: "chateau-royal-de-blois",
                nom: "Château royal de Blois",
            },
            {
                rang: 3,
                slug: "chateau-royal-d-amboise",
                nom: "Château royal d’Amboise",
            },
            {
                rang: 4,
                slug: "chateau-d-angers",
                nom: "Château d’Angers",
            },
            {
                rang: 5,
                slug: "chateau-de-loches",
                nom: "Cité royale de Loches",
            },
            {
                rang: 6,
                slug: "chateau-de-chateaudun",
                nom: "Château de Châteaudun",
            },
            {
                rang: 7,
                slug: "chateau-du-plessis-lez-tours",
                nom: "Château de Plessis-lèz-Tours",
            },
            {
                rang: 8,
                slug: "chateau-des-ducs-de-bretagne",
                nom: "Château des ducs de Bretagne",
            },
        ],
    },
];
