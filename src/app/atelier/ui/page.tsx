import Link from "next/link";

import AtelierCategoryLayout from "../AtelierCategoryLayout";
import styles from "../atelier.module.css";

const COMPONENTS = [
    ["LRZBadge", "/atelier/components/lrz-badge"],
    ["LRZSymbol", "/atelier/components/lrz-symbol"],
    ["LRZStamp", "/atelier/components/lrz-stamp"],
    ["LRZAnecdote", "/atelier/components/lrz-anecdote"],
    ["LRZAccordion", "/atelier/components/lrz-accordion"],
    ["LRZDialog", "/atelier/components/lrz-dialog"],
    ["LRZButton", "/atelier/components/lrz-button"],
    ["LRZButtonGroup", "/atelier/components/lrz-button-group"],
    ["LRZChip", "/atelier/components/lrz-chip"],
    ["LRZCompteur", "/atelier/components/lrz-compteur"],
    ["LRZTooltip", "/atelier/components/lrz-tooltip"],
    ["LRZTextClamp", "/atelier/components/lrz-text-clamp"],
    ["LRZTabs", "/atelier/components/lrz-tabs"],
    ["LRZTimeline", "/atelier/components/lrz-timeline"],
    ["LRZFilterChip", "/atelier/components/lrz-filter-chip"],
    ["LRZFilterGroup", "/atelier/components/lrz-filter-group"],
    ["LRZSeparateur", "/atelier/components/lrz-separateur"],
    ["LRZSection", "/atelier/components/lrz-section"],
    ["LRZCard", "/atelier/components/lrz-card"],
    ["LRZCallout", "/atelier/components/lrz-callout"],
    ["LRZMetaList", "/atelier/components/lrz-meta-list"],
    ["LRZTypography", "/atelier/components/lrz-typography"],
    ["LRZLivingText", "/atelier/components/lrz-living-text"],
] as const;

export default function AtelierUiPage() {
    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Système UI"
            title="Composants UI"
            description="Les briques visuelles réutilisables du Codex, de la micro-interaction aux grands éléments de composition."
        >
            <nav
                className={styles.catalogList}
                aria-label="Fiches de composants UI"
            >
                {COMPONENTS.map(([label, href], index) => (
                    <Link className={styles.catalogLink} href={href} key={href}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{label}</strong>
                        <span aria-hidden="true">→</span>
                    </Link>
                ))}
            </nav>
        </AtelierCategoryLayout>
    );
}
