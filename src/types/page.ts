/**
 * Contrat structurel commun aux pages du Codex.
 *
 * Les définitions restent composées de données pures afin de pouvoir être
 * partagées par les routes, les futurs shells et le constructeur de metadata.
 */

export const PAGE_KINDS = [
    "home",
    "index",
    "collection",
    "page",
    "atelier",
] as const;

export type PageKind = (typeof PAGE_KINDS)[number];

export type PageHeaderStrategy = "page-header" | "none";

export type PageVariant = "editorial" | "documentation";

export interface PageSeoDefinition {
    /** Titre spécifique aux résultats de recherche, si différent du titre UI. */
    title?: string;
    /** Description spécifique aux résultats de recherche. */
    description?: string;
    /** Image sociale, exprimée par un chemin interne. */
    image?: string;
    /** Permettra de piloter la directive robots lors de l'étape metadata. */
    indexable?: boolean;
}

export interface PageDefinitionBase<TKind extends PageKind> {
    kind: TKind;
    href: string;
    title: string;
    description: string;
    seo?: PageSeoDefinition;
}

export interface PageCategoryContract {
    header: PageHeaderStrategy;
    shell: PageKind;
}

/**
 * Règles validées pour la migration des layouts.
 * L'Atelier conserve son shell propre, mais utilisera lui aussi PageHeader.
 */
export const PAGE_CATEGORY_CONTRACT = {
    home: { header: "page-header", shell: "home" },
    index: { header: "none", shell: "index" },
    collection: { header: "page-header", shell: "collection" },
    page: { header: "page-header", shell: "page" },
    atelier: { header: "page-header", shell: "atelier" },
} as const satisfies Record<PageKind, PageCategoryContract>;
