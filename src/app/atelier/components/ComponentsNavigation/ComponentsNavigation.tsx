import Link from "next/link";
import styles from "./ComponentsNavigation.module.css";

const SECTIONS = [
    {
        label: "Fondations visuelles",
        href: "/atelier",
        components: [
            ["colors", "Couleurs", "/atelier/colors"],
            ["typography", "Typographie", "/atelier/typography"],
        ],
    },
    {
        label: "Composants UI",
        href: "/atelier/ui",
        components: [
            ["lrz-badge", "LRZBadge", "/atelier/components/lrz-badge"],
            ["lrz-symbol", "LRZSymbol", "/atelier/components/lrz-symbol"],
            ["lrz-stamp", "LRZStamp", "/atelier/components/lrz-stamp"],
            ["lrz-anecdote", "LRZAnecdote", "/atelier/components/lrz-anecdote"],
            [
                "lrz-accordion",
                "LRZAccordion",
                "/atelier/components/lrz-accordion",
            ],
            ["lrz-dialog", "LRZDialog", "/atelier/components/lrz-dialog"],
            ["lrz-button", "LRZButton", "/atelier/components/lrz-button"],
            [
                "lrz-button-group",
                "LRZButtonGroup",
                "/atelier/components/lrz-button-group",
            ],
            ["lrz-chip", "LRZChip", "/atelier/components/lrz-chip"],
            ["lrz-compteur", "LRZCompteur", "/atelier/components/lrz-compteur"],
            ["lrz-tooltip", "LRZTooltip", "/atelier/components/lrz-tooltip"],
            ["lrz-tabs", "LRZTabs", "/atelier/components/lrz-tabs"],
            ["lrz-timeline", "LRZTimeline", "/atelier/components/lrz-timeline"],
            [
                "lrz-filter-chip",
                "LRZFilterChip",
                "/atelier/components/lrz-filter-chip",
            ],
            [
                "lrz-filter-group",
                "LRZFilterGroup",
                "/atelier/components/lrz-filter-group",
            ],
            [
                "lrz-separateur",
                "LRZSeparateur",
                "/atelier/components/lrz-separateur",
            ],
            ["lrz-section", "LRZSection", "/atelier/components/lrz-section"],
            ["lrz-card", "LRZCard", "/atelier/components/lrz-card"],
            ["lrz-callout", "LRZCallout", "/atelier/components/lrz-callout"],
            [
                "lrz-meta-list",
                "LRZMetaList",
                "/atelier/components/lrz-meta-list",
            ],
            [
                "lrz-typography",
                "LRZTypography",
                "/atelier/components/lrz-typography",
            ],
            [
                "lrz-living-text",
                "LRZLivingText",
                "/atelier/components/lrz-living-text",
            ],
        ],
    },
    {
        label: "Composants Doc",
        href: "/atelier/doc",
        components: [
            [
                "lrz-doc-callout",
                "LRZDocCallout",
                "/atelier/components/lrz-doc-callout",
            ],
            [
                "lrz-doc-code-block",
                "LRZDocCodeBlock",
                "/atelier/components/lrz-doc-code-block",
            ],
            [
                "lrz-doc-code-inline",
                "LRZDocCodeInline",
                "/atelier/components/lrz-doc-code-inline",
            ],
            ["lrz-doc-list", "LRZDocList", "/atelier/components/lrz-doc-list"],
            [
                "lrz-doc-quote",
                "LRZDocQuote",
                "/atelier/components/lrz-doc-quote",
            ],
            [
                "lrz-doc-table",
                "LRZDocTable",
                "/atelier/components/lrz-doc-table",
            ],
        ],
    },
    {
        label: "Composants Métier",
        href: "/atelier/metier",
        components: [
            ["faune-card", "FauneCard", "/atelier/metier#faune-card"],
            ["flore-card", "FloreCard", "/atelier/metier#flore-card"],
            ["chateaux-card", "ChateauxCard", "/atelier/metier#chateaux-card"],
            [
                "guinguette-card",
                "GuinguetteCardV3",
                "/atelier/metier#guinguette-card",
            ],
            [
                "personnage-card",
                "PersonnageCard",
                "/atelier/metier#personnage-card",
            ],
        ],
    },
    {
        label: "Composants Collections",
        href: "/atelier/collections",
        components: [
            [
                "collection-card",
                "CollectionCard",
                "/atelier/collections#collection-card",
            ],
            [
                "collection-entry-card",
                "CollectionEntryCard",
                "/atelier/collections#collection-entry-card",
            ],
            [
                "collection-list",
                "CollectionList",
                "/atelier/collections#collection-entry-card",
            ],
            [
                "collection-hero",
                "CollectionHero",
                "/atelier/collections#collection-hero",
            ],
            [
                "collection-podium",
                "CollectionPodium",
                "/atelier/collections#collection-hero",
            ],
            [
                "collection-badge",
                "CollectionBadge",
                "/atelier/collections#collection-meta",
            ],
            [
                "collection-rank",
                "CollectionRank",
                "/atelier/collections#collection-meta",
            ],
            [
                "collection-criteria",
                "CollectionCriteria",
                "/atelier/collections#collection-meta",
            ],
        ],
    },
] as const;

type ComponentId = (typeof SECTIONS)[number]["components"][number][0];

export default function ComponentsNavigation({
    current,
}: {
    current?: ComponentId;
}) {
    return (
        <nav className={styles.navigation} aria-label="Sommaire de l’Atelier">
            <Link className={styles.title} href="/atelier">
                Atelier
            </Link>
            <div className={styles.sections}>
                {SECTIONS.map((section) => (
                    <section className={styles.section} key={section.href}>
                        <Link
                            className={styles.sectionTitle}
                            href={section.href}
                        >
                            {section.label}
                        </Link>
                        <ul className={styles.list}>
                            {section.components.map(([id, label, href]) => {
                                const isCurrent = id === current;

                                return (
                                    <li key={id}>
                                        <Link
                                            className={`${styles.link} ${isCurrent ? styles.active : ""}`}
                                            href={href}
                                            aria-current={
                                                isCurrent ? "page" : undefined
                                            }
                                        >
                                            <span
                                                className={styles.dot}
                                                aria-hidden
                                            />
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}
            </div>
        </nav>
    );
}
