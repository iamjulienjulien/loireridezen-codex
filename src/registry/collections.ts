// src/registry/collections.ts

/**
 * Registre des collections éditoriales du Codex ligérien.
 *
 * Source de vérité unique pour :
 * - les routes de collection ;
 * - les cartes de présentation ;
 * - les en-têtes éditoriaux ;
 * - les critères de classement ;
 * - le podium ;
 * - le classement complet.
 *
 * Données pures, importables côté serveur comme côté client.
 */

import type { Env } from "@/registry/indexes";

export type CollectionEtat = "publie" | "relecture" | "brouillon";

export type CollectionType =
    | "general"
    | "architecture"
    | "jardins"
    | "itineraire"
    | "decouverte"
    | "histoire"
    | "territoire"
    | "culture"
    | "initiation"
    | string;

export type CollectionRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface CollectionRankingEntry {
    /** Position dans le classement. */
    rang: CollectionRank;

    /** Slug de l’entrée correspondante dans l’index parent. */
    slug: string;

    /** Justification éditoriale de sa position. */
    raison: string;
}

export interface CollectionRegistryEntry {
    /** Clé stable de la collection, sans slash. */
    slug: string;

    /** Route complète de la collection. */
    href: string;

    /** Slug de l’index auquel appartient la collection. */
    indexSlug: string;

    /** Route de l’index parent. */
    indexHref: string;

    /** Emoji identitaire. */
    mark: string;

    /** Libellé court pour la navigation et les badges. */
    label: string;

    /** Surtitre éditorial du hero. */
    eyebrow: string;

    /** Titre principal de la collection. */
    title: string;

    /** Sous-titre éditorial. */
    subtitle: string;

    /** Description longue de la collection. */
    description: string;

    /** Famille éditoriale de la collection. */
    type: CollectionType;

    /** Couleur d’accent de la collection. */
    accent: string;

    /** Critères utilisés pour construire le classement. */
    criteria: readonly string[];

    /** Classement complet. */
    ranking: readonly CollectionRankingEntry[];

    /** Note éditoriale affichable dans le footer ou la méthodologie. */
    footerNote: string;

    /** État éditorial en vue de la publication. */
    etat: CollectionEtat;

    /** Environnements dans lesquels la collection est visible. */
    env: readonly Env[];
}

export const COLLECTIONS = [
    {
        slug: "incontournables-du-val",
        href: "/chateaux/collections/incontournables-du-val",

        indexSlug: "chateaux",
        indexHref: "/chateaux",

        mark: "👑",
        label: "Incontournables du Val",
        eyebrow: "Collection",

        title: "Les incontournables du Val",
        subtitle: "Dix châteaux pour comprendre l’essentiel du récit ligérien",

        description:
            "Une porte d’entrée générale dans le Codex, mêlant importance historique, force architecturale, renommée et capacité à incarner l’imaginaire des châteaux de la Loire.",

        type: "general",
        accent: "#b88945",

        criteria: [
            "renommée dans le catalogue",
            "importance historique",
            "singularité architecturale",
            "place dans le récit du Val de Loire",
        ],

        ranking: [
            {
                rang: 1,
                slug: "chateau-de-chambord",
                raison: "Le manifeste monumental de la première Renaissance française et le château le plus vaste du catalogue.",
            },
            {
                rang: 2,
                slug: "chateau-de-chenonceau",
                raison: "Une silhouette unique sur le Cher et un récit profondément marqué par les femmes qui l’ont façonné.",
            },
            {
                rang: 3,
                slug: "chateau-royal-de-blois",
                raison: "Quatre siècles d’architecture réunis autour d’une seule cour royale.",
            },
            {
                rang: 4,
                slug: "chateau-royal-d-amboise",
                raison: "Un balcon royal sur la Loire, lié à Charles VIII, François Ier et Léonard de Vinci.",
            },
            {
                rang: 5,
                slug: "chateau-de-villandry",
                raison: "Le grand château-jardin du catalogue, célèbre pour ses terrasses en broderie.",
            },
            {
                rang: 6,
                slug: "chateau-d-azay-le-rideau",
                raison: "Un chef-d’œuvre de la première Renaissance posé dans le miroir de l’Indre.",
            },
            {
                rang: 7,
                slug: "forteresse-royale-de-chinon",
                raison: "Une forteresse Plantagenêt majeure, associée à Jeanne d’Arc et au dauphin Charles.",
            },
            {
                rang: 8,
                slug: "chateau-de-saumur",
                raison: "Une silhouette princière dominant la Loire, passée dans l’iconographie des Très Riches Heures.",
            },
            {
                rang: 9,
                slug: "chateau-d-angers",
                raison: "Une forteresse exceptionnelle par ses dix-sept tours et la tenture de l’Apocalypse.",
            },
            {
                rang: 10,
                slug: "chateau-des-ducs-de-bretagne",
                raison: "La grande porte occidentale du fil royal, entre forteresse bretonne et château royal.",
            },
        ],

        footerNote: "10 châteaux pour comprendre l’essentiel du récit ligérien",

        etat: "publie",
        env: ["development", "production"],
    },
    {
        slug: "jardins-et-domaines",
        href: "/chateaux/collections/jardins-et-domaines",

        indexSlug: "chateaux",
        indexHref: "/chateaux",

        mark: "🌿",
        label: "Jardins & domaines",
        eyebrow: "Collection",

        title: "Les châteaux-jardins",
        subtitle: "Quand le domaine prolonge l’architecture",

        description:
            "Une sélection volontairement resserrée des châteaux dont les jardins ou le domaine sont explicitement centraux dans le catalogue.",

        type: "jardins",
        accent: "#5c8754",

        criteria: [
            "importance explicite des jardins dans le résumé",
            "identité du domaine",
            "singularité paysagère",
        ],

        ranking: [
            {
                rang: 1,
                slug: "chateau-de-villandry",
                raison: "Les jardins en terrasses et en broderie sont au cœur même de son identité.",
            },
            {
                rang: 2,
                slug: "domaine-de-chaumont-sur-loire",
                raison: "Le domaine accueille le Festival international des jardins.",
            },
            {
                rang: 3,
                slug: "chateau-du-rivau",
                raison: "La forteresse est entourée de jardins contemporains d’inspiration médiévale et féerique.",
            },
        ],

        footerNote: "3 domaines où le paysage prolonge l’architecture",

        etat: "publie",
        env: ["development", "production"],
    },
    {
        slug: "chefs-doeuvre-renaissance",
        href: "/chateaux/collections/chefs-doeuvre-renaissance",

        indexSlug: "chateaux",
        indexHref: "/chateaux",

        mark: "🏛️",
        label: "Chefs-d’œuvre Renaissance",
        eyebrow: "Collection",

        title: "Les chefs-d’œuvre de la Renaissance",
        subtitle: "Quand le Val change de visage",

        description:
            "Une sélection des châteaux qui illustrent le mieux le passage de la forteresse médiévale à la demeure de prestige Renaissance.",

        type: "architecture",
        accent: "#795739",

        criteria: [
            "importance Renaissance dans le style",
            "innovation architecturale",
            "qualité de la composition",
            "rôle historique dans l’évolution du Val",
        ],

        ranking: [
            {
                rang: 1,
                slug: "chateau-de-chambord",
                raison: "Le grand manifeste de la première Renaissance française, porté par François Ier.",
            },
            {
                rang: 2,
                slug: "chateau-de-chenonceau",
                raison: "Une composition Renaissance rendue unique par sa galerie construite au-dessus du Cher.",
            },
            {
                rang: 3,
                slug: "chateau-d-azay-le-rideau",
                raison: "Une synthèse raffinée de la première Renaissance française et du château d’agrément.",
            },
            {
                rang: 4,
                slug: "chateau-royal-d-amboise",
                raison: "Un ensemble charnière entre gothique flamboyant et Renaissance royale.",
            },
            {
                rang: 5,
                slug: "chateau-de-villandry",
                raison: "Le dernier grand château Renaissance du Val selon le catalogue.",
            },
            {
                rang: 6,
                slug: "chateau-royal-de-blois",
                raison: "Son aile François Ier donne à voir l’une des expressions majeures de la Renaissance royale.",
            },
            {
                rang: 7,
                slug: "domaine-de-chaumont-sur-loire",
                raison: "Une transition élégante du gothique vers la Renaissance, dominant directement la Loire.",
            },
            {
                rang: 8,
                slug: "chateau-de-montsoreau",
                raison: "Une demeure gothique-Renaissance singulière, bâtie directement dans le lit du fleuve.",
            },
        ],

        footerNote: "8 châteaux pour lire la métamorphose Renaissance du Val",

        etat: "publie",
        env: ["development", "production"],
    },
] as const satisfies readonly CollectionRegistryEntry[];

export type CollectionSlug = (typeof COLLECTIONS)[number]["slug"];

export type CollectionHref = (typeof COLLECTIONS)[number]["href"];

export const getCollection = (
    href: string,
): CollectionRegistryEntry | undefined =>
    COLLECTIONS.find((collection) => collection.href === href);

export const getCollectionBySlug = (
    slug: string,
): CollectionRegistryEntry | undefined =>
    COLLECTIONS.find((collection) => collection.slug === slug);

export const getCollectionsByIndex = (
    indexSlug: string,
): CollectionRegistryEntry[] =>
    COLLECTIONS.filter((collection) => collection.indexSlug === indexSlug);

export const getCollectionsForEnv = (
    value: string | undefined,
): CollectionRegistryEntry[] => {
    if (value !== "development" && value !== "production") {
        throw new Error(`CURRENT_ENV invalide ou absent : ${value}`);
    }

    return COLLECTIONS.filter((collection) =>
        collection.env.some((environment) => environment === value),
    );
};

export const getCollectionsByIndexForEnv = (
    indexSlug: string,
    value: string | undefined,
): CollectionRegistryEntry[] =>
    getCollectionsForEnv(value).filter(
        (collection) => collection.indexSlug === indexSlug,
    );
