/**
 * Cartographie structurelle des pages du Codex.
 *
 * Ce registre réunit les cinq catégories de layouts sans recopier les données
 * des registres Index et Collection. Les routes consommeront progressivement
 * ces définitions au fil de la migration.
 */

import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-metadata";
import {
    COLLECTIONS,
    type CollectionRegistryEntry,
} from "@/registry/collections";
import type { FeatureFlagName } from "@/registry/feature-flags";
import { INDEXES, getIndexBySlug, type IndexEntry } from "@/registry/indexes";
import type { PageDefinitionBase, PageKind, PageVariant } from "@/types/page";

export interface HomePageDefinition extends PageDefinitionBase<"home"> {
    label: string;
    eyebrow: string;
}

export interface ContentPageDefinition extends PageDefinitionBase<"page"> {
    label: string;
    eyebrow: string;
    variant: PageVariant;
    featureFlag?: FeatureFlagName;
}

export interface AtelierPageDefinition extends PageDefinitionBase<"atelier"> {
    label: string;
    eyebrow: string;
    routePrefix: "/atelier";
    featureFlag: "atelier";
}

export type IndexPageDefinition = IndexEntry & { kind: "index" };

export type CollectionPageDefinition = CollectionRegistryEntry & {
    kind: "collection";
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
        seo: {
            title: "À propos — Le Codex ligérien",
            description:
                "Le Codex ligérien : un atlas éditorial pour explorer, observer et raconter les paysages de la Loire.",
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
        featureFlag: "personnages",
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
        seo: {
            title: "Documentation — Le Codex ligérien",
            description:
                "Les guides et références techniques du Codex ligérien.",
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
        seo: {
            title: "Documentation API — Le Codex ligérien",
            description:
                "Guide de démarrage et référence narrative de l’API publique du Codex ligérien.",
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
        seo: {
            title: "SDK TypeScript — Le Codex ligérien",
            description:
                "Guide du SDK TypeScript officiel de l’API publique du Codex ligérien, avec intégration Expo et React Native.",
        },
    },
] as const satisfies readonly ContentPageDefinition[];

export const ATELIER_PAGE = {
    kind: "atelier",
    href: "/atelier",
    routePrefix: "/atelier",
    label: "Atelier",
    eyebrow: "Loire Ride Zen · Codex",
    title: "Atelier",
    description:
        "Le sommaire du système de composants ligérien, de ses variantes et de ses exemples de mise en œuvre.",
    featureFlag: "atelier",
    seo: {
        title: "Atelier — Codex",
        description:
            "La collection des esquisses de composants — variantes, états et données de démonstration, au même endroit.",
    },
} as const satisfies AtelierPageDefinition;

export const INDEX_PAGE_DEFINITIONS: readonly IndexPageDefinition[] =
    INDEXES.map((index) => ({ ...index, kind: "index" as const }));

export const COLLECTION_PAGE_DEFINITIONS: readonly CollectionPageDefinition[] =
    COLLECTIONS.map((collection) => ({
        ...collection,
        kind: "collection" as const,
    }));

export const PAGE_DEFINITIONS: readonly PageDefinition[] = [
    HOME_PAGE,
    ...INDEX_PAGE_DEFINITIONS,
    ...COLLECTION_PAGE_DEFINITIONS,
    ...CONTENT_PAGES,
    ATELIER_PAGE,
];

const normalizePathname = (pathname: string): string => {
    const [withoutQueryOrHash] = pathname.split(/[?#]/u);

    if (!withoutQueryOrHash || withoutQueryOrHash === "/") return "/";

    return withoutQueryOrHash.replace(/\/+$/u, "");
};

const isAtelierPathname = (pathname: string): boolean =>
    pathname === ATELIER_PAGE.routePrefix ||
    pathname.startsWith(`${ATELIER_PAGE.routePrefix}/`);

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

    if (isAtelierPathname(normalizedPathname)) return ATELIER_PAGE;

    return PAGE_DEFINITIONS.find(
        (definition) => definition.href === normalizedPathname,
    );
};
