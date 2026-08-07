import type {
    AtelierPageDefinition,
    AtelierSectionHref,
} from "@/types/page";

const getAtelierSectionHref = (href: string): AtelierSectionHref => {
    if (href.startsWith("/atelier/components/lrz-doc-")) {
        return "/atelier/doc";
    }

    if (href.startsWith("/atelier/components/")) return "/atelier/ui";

    const sectionHref = href as AtelierSectionHref;

    return [
        "/atelier",
        "/atelier/colors",
        "/atelier/typography",
        "/atelier/ui",
        "/atelier/doc",
        "/atelier/metier",
        "/atelier/collections",
    ].includes(sectionHref)
        ? sectionHref
        : "/atelier";
};

const defineAtelierPage = (
    href: string,
    title: string,
    description: string,
    seoTitle = `${title} — Atelier du Codex ligérien`,
): AtelierPageDefinition => ({
    kind: "atelier",
    href,
    label: title,
    eyebrow: "Atelier · Loire Ride Zen",
    sectionHref: getAtelierSectionHref(href),
    title,
    description,
    accent: "#c8893a",
    color: "ocre",
    mark: "✦",
    featureFlag: "atelier",
    seo: {
        title: seoTitle,
        description,
        indexable: false,
    },
});

export const ATELIER_PAGE = defineAtelierPage(
    "/atelier",
    "Atelier",
    "La collection des esquisses de composants — variantes, états et données de démonstration, au même endroit.",
    "Atelier du Codex ligérien — Loire Ride Zen",
);

export const ATELIER_PAGE_DEFINITIONS = [
    ATELIER_PAGE,
    defineAtelierPage(
        "/atelier/colors",
        "Couleurs",
        "Explorez la palette LRZ, ses familles de couleurs, ses tokens CSS et les conventions visuelles utilisées dans le Codex ligérien.",
    ),
    defineAtelierPage(
        "/atelier/typography",
        "Typographie",
        "Les familles, presets et conventions typographiques de Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/ui",
        "Composants UI",
        "Explorez les composants UI réutilisables du Codex, de la micro-interaction aux grands éléments de composition.",
    ),
    defineAtelierPage(
        "/atelier/doc",
        "Composants Doc",
        "Explorez les composants de lecture et de référence qui structurent durablement les pages de documentation du Codex ligérien.",
    ),
    defineAtelierPage(
        "/atelier/metier",
        "Composants Métier",
        "Découvrez les composants métier qui transforment les données du Codex en cartes éditoriales pour la faune, la flore, les châteaux, les guinguettes et les personnages.",
    ),
    defineAtelierPage(
        "/atelier/collections",
        "Composants Collections",
        "Découvrez les composants éditoriaux dédiés aux collections du Codex : cartes, entrées, podiums, héros, critères et rangs.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-accordion",
        "LRZAccordion",
        "États, tonalités et personnalisation du composant dépliant Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-anecdote",
        "LRZAnecdote",
        "Citation éditoriale partagée par les fiches du Codex ligérien.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-badge",
        "LRZBadge",
        "Variantes du composant de statut partagé par les index du Codex ligérien.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-button",
        "LRZButton",
        "Bouton accessible et coloré du design system Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-button-group",
        "LRZButtonGroup",
        "Groupe de boutons sélectionnables pour les vues et modes d’organisation du Codex.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-callout",
        "LRZCallout",
        "Encarts éditoriaux, conseils et repères contextuels du design system Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-card",
        "LRZCard",
        "Surfaces, compositions et variantes de la carte générique Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-chip",
        "LRZChip",
        "Brique chip générique du système UI Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-compteur",
        "LRZCompteur",
        "Compteur vintage à chiffres roulants du système UI Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-dialog",
        "LRZDialog",
        "Fenêtres modales, compositions éditoriales et comportements accessibles du design system Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-doc-callout",
        "LRZDocCallout",
        "Comparez les variantes de messages documentaires du Codex : information, conseil, attention, erreur et confirmation.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-doc-code-block",
        "LRZDocCodeBlock",
        "Bloc de code colorisé, copiable et destiné à la documentation technique de Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-doc-code-inline",
        "LRZDocCodeInline",
        "Code technique intégré au fil du texte dans la documentation Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-doc-list",
        "LRZDocList",
        "Listes ordonnées, listes à puces et variantes éditoriales destinées à la documentation de Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-doc-quote",
        "LRZDocQuote",
        "Citations éditoriales, notes de terrain et témoignages pour la documentation de Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-doc-table",
        "LRZDocTable",
        "Tables sémantiques, comparaisons et variantes de lecture pour la documentation technique de Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-filter-chip",
        "LRZFilterChip",
        "États, variantes et compteurs du composant de filtre Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-filter-group",
        "LRZFilterGroup",
        "Groupes de filtres et variantes du composant Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-living-text",
        "LRZLivingText",
        "Compositions textuelles vivantes, expressives et cinétiques de Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-meta-list",
        "LRZMetaList",
        "Métadonnées sémantiques, layouts et variantes du design system Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-section",
        "LRZSection",
        "Layouts, largeurs, rythmes et ambiances du composant de section Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-separateur",
        "LRZSeparateur",
        "Variantes, usages et personnalisation du composant de séparation éditoriale Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-stamp",
        "LRZStamp",
        "Capsules d’identité associant les symboles illustrés à leurs noms métier.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-symbol",
        "LRZSymbol",
        "Registre, tailles et variantes des symboles illustrés Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-tabs",
        "LRZTabs",
        "Onglets éditoriaux et navigation de sections du système UI Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-text-clamp",
        "LRZTextClamp",
        "Texte multiligne, hauteur stable et tooltip automatique du système UI Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-timeline",
        "LRZTimeline",
        "Frise chronologique éditoriale du système UI Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-tooltip",
        "LRZTooltip",
        "Infobulle accessible et positionnable du système UI Loire Ride Zen.",
    ),
    defineAtelierPage(
        "/atelier/components/lrz-typography",
        "LRZTypography",
        "Presets, familles et personnalisations typographiques Loire Ride Zen.",
    ),
] as const satisfies readonly AtelierPageDefinition[];

export type AtelierHref = (typeof ATELIER_PAGE_DEFINITIONS)[number]["href"];

export const getAtelierPageDefinition = (
    href: string,
): AtelierPageDefinition => {
    const page = ATELIER_PAGE_DEFINITIONS.find((entry) => entry.href === href);

    if (!page) {
        throw new Error(`Page Atelier non déclarée : ${href}`);
    }

    return page;
};
