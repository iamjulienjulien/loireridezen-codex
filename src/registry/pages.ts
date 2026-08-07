/**
 * Cartographie structurelle des pages du Codex.
 *
 * Ce registre réunit les cinq catégories de layouts sans recopier les données
 * des registres Index et Collection. Les routes consommeront progressivement
 * ces définitions au fil de la migration.
 */

import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-metadata";
import {
    ATELIER_PAGE,
    ATELIER_PAGE_DEFINITIONS,
} from "@/registry/atelier-pages";
import {
    COLLECTIONS,
    type CollectionRegistryEntry,
    type CollectionSlug,
} from "@/registry/collections";
import type { FeatureFlagName } from "@/registry/feature-flags";
import {
    INDEXES,
    getIndexBySlug,
    type IndexEntry,
    type IndexHref,
    type IndexSlug,
} from "@/registry/indexes";
import type {
    AtelierPageDefinition,
    PageDefinitionBase,
    PageKind,
    PageSeoDefinition,
    PageVariant,
    PageVisualDefinition,
} from "@/types/page";

export { ATELIER_PAGE } from "@/registry/atelier-pages";

export interface HomePageDefinition
    extends PageDefinitionBase<"home">,
        PageVisualDefinition {
    label: string;
    eyebrow: string;
}

export interface ContentPageDefinition
    extends PageDefinitionBase<"page">,
        PageVisualDefinition {
    label: string;
    eyebrow: string;
    variant: PageVariant;
    featureFlag?: FeatureFlagName;
}

export type IndexPageDefinition = IndexEntry & {
    kind: "index";
    seo: PageSeoDefinition;
};

export type CollectionPageDefinition = CollectionRegistryEntry & {
    kind: "collection";
    seo: PageSeoDefinition;
};

export type PageDefinition =
    | HomePageDefinition
    | IndexPageDefinition
    | CollectionPageDefinition
    | ContentPageDefinition
    | AtelierPageDefinition;

export const HOME_PAGE = {
    kind: "home",
    href: "/",
    label: "Accueil",
    eyebrow: "Loire Ride Zen",
    title: "Le Codex ligérien",
    description: "Explorer, observer, raconter la Loire.",
    accent: "#c8893a",
    color: "ocre",
    mark: "🌊",
    seo: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
} as const satisfies HomePageDefinition;

export const CONTENT_PAGES = [
    {
        kind: "page",
        href: "/a-propos",
        label: "À propos",
        eyebrow: "À propos",
        variant: "editorial",
        title: "Un atlas vivant pour suivre le fil de la Loire.",
        description:
            "Le Codex ligérien est la mémoire éditoriale de Loire Ride Zen : un lieu pour explorer lentement les paysages, les patrimoines et le vivant qui accompagnent le fleuve.",
        accent: "#4f86c6",
        color: "eau",
        mark: "↘",
        seo: {
            title: "À propos du projet Loire Ride Zen — Le Codex ligérien",
            description:
                "Découvrez le projet éditorial du Codex ligérien, un atlas vivant conçu pour explorer les paysages, les patrimoines, les espèces et les récits de la Loire.",
        },
    },
    {
        kind: "page",
        href: "/personnages",
        label: "Personnages",
        eyebrow: "Annexe du Codex",
        variant: "editorial",
        title: "Personnages de la Loire",
        description:
            "Souverains, bâtisseurs, écrivains, mécènes et figures singulières : celles et ceux dont les vies ont laissé leur empreinte sur les châteaux ligériens.",
        accent: "#b5883c",
        color: "ocre",
        mark: "♜",
        featureFlag: "personnages",
        seo: {
            title: "Personnages et figures de la Loire — Le Codex ligérien",
            description:
                "Rencontrez les souverains, bâtisseurs, écrivains, mécènes et figures dont les vies ont façonné les châteaux, les paysages et les récits de la Loire.",
            indexable: false,
        },
    },
    {
        kind: "page",
        href: "/docs",
        label: "Documentation",
        eyebrow: "Documentation",
        variant: "documentation",
        title: "Guides et références du Codex.",
        description:
            "Les ressources pour explorer, intégrer et comprendre les données du Codex ligérien.",
        accent: "#b5883c",
        color: "ocre",
        mark: "⌘",
        seo: {
            title: "Documentation technique, API et SDK — Le Codex ligérien",
            description:
                "Consultez les guides et références techniques du Codex ligérien pour explorer ses données, utiliser son API publique et intégrer son SDK TypeScript.",
        },
    },
    {
        kind: "page",
        href: "/docs/api",
        label: "API du Codex",
        eyebrow: "Documentation · API publique",
        variant: "documentation",
        title: "API du Codex",
        description:
            "Guide de démarrage, ressources disponibles et référence narrative de l’API publique.",
        accent: "#4a7c8c",
        color: "bleu-turquoise",
        mark: "{ }",
        seo: {
            title: "API publique des données de Loire — Le Codex ligérien",
            description:
                "Découvrez l’API publique du Codex ligérien : démarrage rapide, ressources, filtres, réponses, erreurs et exemples pour interroger les données de la Loire.",
        },
    },
    {
        kind: "page",
        href: "/docs/sdk",
        label: "SDK TypeScript",
        eyebrow: "Documentation · SDK",
        variant: "documentation",
        title: "SDK TypeScript du Codex",
        description:
            "Installation, client typé, gestion des erreurs et intégration React Native ou Expo.",
        accent: "#4f86c6",
        color: "eau",
        mark: "TS",
        seo: {
            title: "SDK TypeScript et guide d’intégration — Le Codex ligérien",
            description:
                "Intégrez les données du Codex ligérien avec son SDK TypeScript : installation, client typé, gestion des erreurs et exemples pour Expo et React Native.",
        },
    },
] as const satisfies readonly ContentPageDefinition[];

const INDEX_PAGE_SEO = {
    chateaux: {
        title: "Châteaux de la Loire, donjons et palais — Le Codex ligérien",
        description:
            "Explorez les châteaux de la Loire, des forteresses médiévales aux palais de la Renaissance, à travers leur histoire, leur architecture et leurs jardins.",
    },
    faune: {
        title: "Faune de la Loire, espèces du fleuve — Le Codex ligérien",
        description:
            "Découvrez les oiseaux, mammifères, poissons et autres espèces qui peuplent la Loire, ses grèves, ses îles et ses berges, du quotidien au plus rare.",
    },
    flore: {
        title: "Flore de la Loire, plantes du fleuve — Le Codex ligérien",
        description:
            "Explorez les arbres, fleurs et plantes qui bordent la Loire, des grèves mouvantes à l’estuaire, entre espèces indigènes, trésors rares et plantes invasives.",
    },
    guinguettes: {
        title: "Guinguettes et haltes au fil de la Loire — Le Codex ligérien",
        description:
            "Découvrez les guinguettes de Loire et de ses affluents : tables au bord de l’eau, concerts, cuisine locale, couchers de soleil et haltes à vélo.",
    },
    patrimoine: {
        title: "Patrimoine de la Loire, ponts et moulins — Le Codex ligérien",
        description:
            "Explorez le patrimoine du fleuve : ponts, cales, ports, fours à chaux et moulins qui racontent le travail, les usages et la mémoire de la Loire.",
    },
    vignobles: {
        title: "Vignobles de la Loire, terroirs et AOC — Le Codex ligérien",
        description:
            "Parcourez les vignobles de Loire, du Forez à l’Atlantique, et découvrez leurs appellations, cépages, terroirs et grandes expressions ligériennes.",
    },
    vocabulaire: {
        title: "Vocabulaire de la Loire, mots du fleuve — Le Codex ligérien",
        description:
            "Découvrez le vocabulaire de la Loire : mots de la marine, paysages, métiers et phénomènes du fleuve, du terme encore vivant au mot presque oublié.",
    },
} as const satisfies Record<IndexSlug, PageSeoDefinition>;

const COLLECTION_PAGE_SEO = {
    "incontournables-du-val": {
        title: "10 châteaux phares du Val de Loire — Le Codex ligérien",
        description:
            "Découvrez dix châteaux incontournables du Val de Loire, choisis pour leur importance historique, leur architecture et leur place dans l’imaginaire ligérien.",
    },
    "jardins-et-domaines": {
        title: "Châteaux-jardins et domaines de Loire — Le Codex ligérien",
        description:
            "Explorez une sélection de châteaux de la Loire où jardins, terrasses et domaines prolongent l’architecture et composent des paysages remarquables.",
    },
    "chefs-doeuvre-renaissance": {
        title: "Châteaux Renaissance du Val de Loire — Le Codex ligérien",
        description:
            "Découvrez les châteaux qui racontent le passage de la forteresse médiévale à la demeure Renaissance, de Chambord à Chenonceau et Azay-le-Rideau.",
    },
    "plus-ligeriens": {
        title: "Les châteaux les plus ligériens — Le Codex ligérien",
        description:
            "Parcourez les châteaux dont l’histoire, le paysage et l’architecture entretiennent le lien le plus fort avec la Loire et son grand corridor fluvial.",
    },
    "pepites-confidentielles": {
        title: "Châteaux secrets du Val de Loire — Le Codex ligérien",
        description:
            "Découvrez quatre châteaux confidentiels du Val de Loire, choisis pour leur caractère, leur singularité architecturale et le plaisir du détour.",
    },
    "sur-les-traces-des-rois": {
        title: "Châteaux royaux du Val de Loire — Le Codex ligérien",
        description:
            "Suivez les rois de France à travers huit châteaux de la Loire liés aux Valois, à la vie de cour et aux grandes décisions de l’histoire du royaume.",
    },
} as const satisfies Record<CollectionSlug, PageSeoDefinition>;

export const INDEX_PAGE_DEFINITIONS: readonly IndexPageDefinition[] =
    INDEXES.map((index) => ({
        ...index,
        kind: "index" as const,
        seo: {
            ...INDEX_PAGE_SEO[index.slug],
            indexable: index.env.some(
                (environment) => environment === "production",
            ),
        },
    }));

export const COLLECTION_PAGE_DEFINITIONS: readonly CollectionPageDefinition[] =
    COLLECTIONS.map((collection) => ({
        ...collection,
        kind: "collection" as const,
        seo: {
            ...COLLECTION_PAGE_SEO[collection.slug],
            indexable: collection.env.some(
                (environment) => environment === "production",
            ),
        },
    }));

export const PAGE_DEFINITIONS: readonly PageDefinition[] = [
    HOME_PAGE,
    ...INDEX_PAGE_DEFINITIONS,
    ...COLLECTION_PAGE_DEFINITIONS,
    ...CONTENT_PAGES,
    ...ATELIER_PAGE_DEFINITIONS,
];

const normalizePathname = (pathname: string): string => {
    const [withoutQueryOrHash] = pathname.split(/[?#]/u);

    if (!withoutQueryOrHash || withoutQueryOrHash === "/") return "/";

    return withoutQueryOrHash.replace(/\/+$/u, "");
};

const isAtelierPathname = (pathname: string): boolean =>
    pathname === ATELIER_PAGE.href ||
    pathname.startsWith(`${ATELIER_PAGE.href}/`);

const isCollectionPathname = (pathname: string): boolean => {
    const match = pathname.match(/^\/([^/]+)\/collections\/[^/]+$/u);

    return match ? getIndexBySlug(match[1]) !== undefined : false;
};

export const getPageKind = (pathname: string): PageKind | undefined => {
    const normalizedPathname = normalizePathname(pathname);

    if (normalizedPathname === HOME_PAGE.href) return "home";
    if (isAtelierPathname(normalizedPathname)) return "atelier";
    if (INDEXES.some((index) => index.href === normalizedPathname)) {
        return "index";
    }
    if (isCollectionPathname(normalizedPathname)) return "collection";
    if (CONTENT_PAGES.some((page) => page.href === normalizedPathname)) {
        return "page";
    }

    return undefined;
};

export const getPageDefinition = (
    pathname: string,
): PageDefinition | undefined => {
    const normalizedPathname = normalizePathname(pathname);

    const definition = PAGE_DEFINITIONS.find(
        (definition) => definition.href === normalizedPathname,
    );

    if (definition) return definition;
    if (isAtelierPathname(normalizedPathname)) return ATELIER_PAGE;

    return undefined;
};

export const getContentPageDefinition = (
    href: string,
): ContentPageDefinition => {
    const page = CONTENT_PAGES.find((entry) => entry.href === href);

    if (!page) throw new Error(`Page annexe non déclarée : ${href}`);

    return page;
};

export const getIndexPageDefinition = (
    href: IndexHref,
): IndexPageDefinition => {
    const page = INDEX_PAGE_DEFINITIONS.find((entry) => entry.href === href);

    if (!page) throw new Error(`Page Index non déclarée : ${href}`);

    return page;
};

export const findCollectionPageDefinition = (
    slug: string,
): CollectionPageDefinition | undefined =>
    COLLECTION_PAGE_DEFINITIONS.find((entry) => entry.slug === slug);

export const getCollectionPageDefinition = (
    slug: CollectionSlug,
): CollectionPageDefinition => {
    const page = findCollectionPageDefinition(slug);

    if (!page) throw new Error(`Page Collection non déclarée : ${slug}`);

    return page;
};
