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

import type { Env, IndexHref, IndexSlug } from "@/registry/indexes";
import { LRZColor } from "@/types/lrz";

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
    indexSlug: IndexSlug;

    /** Route de l’index parent. */
    indexHref: IndexHref;

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

    color: LRZColor;

    customEmoji?: string;

    order: number;

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
        order: 1,

        title: "Les incontournables du Val",
        subtitle: "Dix châteaux pour comprendre l’essentiel du récit ligérien",

        description:
            "Une porte d’entrée générale dans le Codex, mêlant importance historique, force architecturale, renommée et capacité à incarner l’imaginaire des châteaux de la Loire.",

        type: "general",
        accent: "#b88945",
        color: "fauve",

        customEmoji: "/emoji/collection/incontournables-du-val.png",

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
        order: 6,

        title: "Les châteaux-jardins",
        subtitle: "Quand le domaine prolonge l’architecture",

        description:
            "Une sélection volontairement resserrée des châteaux dont les jardins ou le domaine sont explicitement centraux dans le catalogue.",

        type: "jardins",
        accent: "#5c8754",
        color: "vert",

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

        etat: "brouillon",
        env: [],
    },
    {
        slug: "chefs-doeuvre-renaissance",
        href: "/chateaux/collections/chefs-doeuvre-renaissance",

        indexSlug: "chateaux",
        indexHref: "/chateaux",

        mark: "🏛️",
        label: "Chefs-d’œuvre Renaissance",
        eyebrow: "Collection",
        order: 3,

        title: "Les chefs-d’œuvre de la Renaissance",
        subtitle: "Quand le Val change de visage",

        description:
            "Une sélection des châteaux qui illustrent le mieux le passage de la forteresse médiévale à la demeure de prestige Renaissance.",

        type: "architecture",
        accent: "#795739",
        color: "brun",

        customEmoji: "/emoji/collection/chefs-doeuvre-renaissance.png",

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
    {
        slug: "plus-ligeriens",
        href: "/chateaux/collections/plus-ligeriens",

        indexSlug: "chateaux",
        indexHref: "/chateaux",

        mark: "🌊",
        label: "Plus ligériens",
        eyebrow: "Collection",
        order: 4,

        title: "Les plus ligériens",
        subtitle: "Ceux dont le destin épouse le fleuve",

        description:
            "Un classement centré sur la relation physique, visuelle ou symbolique entre le château et la Loire.",

        type: "territoire",
        accent: "#4D80A7",
        color: "eau",

        criteria: [
            "proximité immédiate de la Loire",
            "relation paysagère avec le fleuve",
            "position dans le corridor ligérien",
            "force du récit fluvial",
        ],

        ranking: [
            {
                rang: 1,
                slug: "chateau-de-montsoreau",
                raison: "Le seul château du catalogue présenté comme construit directement dans le lit de la Loire.",
            },
            {
                rang: 2,
                slug: "domaine-de-chaumont-sur-loire",
                raison: "Un véritable belvédère dominant le fleuve.",
            },
            {
                rang: 3,
                slug: "chateau-de-saumur",
                raison: "Sa silhouette blanche domine durablement la Loire et la ville.",
            },
            {
                rang: 4,
                slug: "chateau-royal-d-amboise",
                raison: "Un balcon royal installé au-dessus du fleuve.",
            },
            {
                rang: 5,
                slug: "chateau-de-sully-sur-loire",
                raison: "Une forteresse au bord de la Loire et la borne orientale du Val inscrit.",
            },
            {
                rang: 6,
                slug: "chateau-de-langeais",
                raison: "Un château directement associé à la Loire et à l’histoire politique du royaume.",
            },
            {
                rang: 7,
                slug: "chateau-royal-de-blois",
                raison: "Une résidence royale majeure implantée au cœur d’une ville ligérienne.",
            },
            {
                rang: 8,
                slug: "chateau-des-ducs-de-bretagne",
                raison: "La dernière grande forteresse du fil ligérien avant l’Atlantique.",
            },
        ],

        footerNote: "8 châteaux dont le destin épouse le fleuve",

        etat: "publie",
        env: ["development", "production"],
    },
    {
        slug: "pepites-confidentielles",
        href: "/chateaux/collections/pepites-confidentielles",

        indexSlug: "chateaux",
        indexHref: "/chateaux",

        mark: "💎",
        label: "Pépites confidentielles",
        eyebrow: "Collection",
        order: 5,

        title: "Les pépites confidentielles",
        subtitle: "Les détours qui récompensent la curiosité",

        description:
            "Un top réservé aux châteaux classés comme confidentiels dans le catalogue, avec un intérêt marqué pour leur personnalité propre.",

        type: "decouverte",
        accent: "#D8B548",
        color: "soleil",

        criteria: [
            "renommée confidentielle",
            "singularité du récit",
            "cohérence architecturale",
            "potentiel de découverte",
        ],

        ranking: [
            {
                rang: 1,
                slug: "chateau-de-fougeres-sur-bievre",
                raison: "Une petite forteresse presque intacte, idéale pour lire l’architecture de la fin du Moyen Âge.",
            },
            {
                rang: 2,
                slug: "chateau-du-rivau",
                raison: "Une alliance originale entre château fort et jardins contemporains enchantés.",
            },
            {
                rang: 3,
                slug: "chateau-de-talcy",
                raison: "Une demeure Renaissance encore médiévale dans son allure, portée par un récit poétique rare.",
            },
            {
                rang: 4,
                slug: "chateau-de-villesavin",
                raison: "La demeure de l’intendant du chantier de Chambord, surnommée sa cabane de chantier.",
            },
        ],

        footerNote: "4 détours qui récompensent la curiosité",

        etat: "publie",
        env: [],
    },
    {
        slug: "sur-les-traces-des-rois",
        href: "/chateaux/collections/sur-les-traces-des-rois",

        indexSlug: "chateaux",
        indexHref: "/chateaux",

        mark: "⚜️",
        label: "Sur les traces des rois",
        eyebrow: "Collection",
        order: 2,

        title: "Sur les traces des rois",
        subtitle: "Le pouvoir royal de forteresse en résidence",

        description:
            "Un parcours à travers les châteaux explicitement liés aux rois de France, aux Valois, aux grandes décisions dynastiques ou à la vie de cour.",

        type: "histoire",
        accent: "#B37A43",
        color: "fauve",

        customEmoji: "/emoji/collection/sur-les-traces-des-rois.png",

        criteria: [
            "présence royale dans le commanditaire ou le résumé",
            "fonction de résidence royale",
            "importance politique ou dynastique",
        ],

        ranking: [
            {
                rang: 1,
                slug: "chateau-royal-de-blois",
                raison: "Une résidence royale majeure, façonnée notamment par Louis XII et François Ier.",
            },
            {
                rang: 2,
                slug: "chateau-royal-d-amboise",
                raison: "Une résidence des rois de France au tournant de la Renaissance.",
            },
            {
                rang: 3,
                slug: "chateau-de-chambord",
                raison: "Le grand rêve architectural commandité par François Ier.",
            },
            {
                rang: 4,
                slug: "forteresse-royale-de-chinon",
                raison: "Un lieu politique majeur du récit royal, lié au dauphin Charles.",
            },
            {
                rang: 5,
                slug: "chateau-de-langeais",
                raison: "Le mariage royal qui relie Anne de Bretagne à Charles VIII donne au lieu une portée dynastique exceptionnelle.",
            },
            {
                rang: 6,
                slug: "cite-royale-de-loches",
                raison: "Un ensemble associant donjon comtal et logis royal des Valois.",
            },
            {
                rang: 7,
                slug: "chateau-d-angers",
                raison: "Une forteresse royale puis ducale, commandée sous Louis IX et Blanche de Castille.",
            },
            {
                rang: 8,
                slug: "chateau-des-ducs-de-bretagne",
                raison: "Une résidence ducale devenue château royal à la porte de l’Atlantique.",
            },
        ],

        footerNote: "8 châteaux sur les traces du pouvoir royal",

        etat: "publie",
        env: ["development", "production"],
    },
] as const satisfies readonly CollectionRegistryEntry[];

export type CollectionSlug = (typeof COLLECTIONS)[number]["slug"];

export type CollectionHref = (typeof COLLECTIONS)[number]["href"];

const sortCollectionsByOrder = (
    collections: readonly CollectionRegistryEntry[],
): CollectionRegistryEntry[] =>
    collections
        .map((collection, index) => ({ collection, index }))
        .sort(
            (a, b) =>
                a.collection.order - b.collection.order || a.index - b.index,
        )
        .map(({ collection }) => collection);

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
    sortCollectionsByOrder(
        COLLECTIONS.filter((collection) => collection.indexSlug === indexSlug),
    );

export const getCollectionsForEnv = (
    value: string | undefined,
): CollectionRegistryEntry[] => {
    if (value !== "development" && value !== "production") {
        throw new Error(`CURRENT_ENV invalide ou absent : ${value}`);
    }

    return sortCollectionsByOrder(
        COLLECTIONS.filter((collection) =>
            collection.env.some((environment) => environment === value),
        ),
    );
};

export const getCollectionsByIndexForEnv = (
    indexSlug: string,
    value: string | undefined,
): CollectionRegistryEntry[] =>
    sortCollectionsByOrder(
        getCollectionsForEnv(value).filter(
            (collection) => collection.indexSlug === indexSlug,
        ),
    );
