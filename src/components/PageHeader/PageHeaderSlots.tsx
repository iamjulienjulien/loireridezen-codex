import type { CSSProperties } from "react";
import Link from "next/link";

import LRZSymbol from "@/components/LRZSymbol/LRZSymbol";
import { featureIsEnabled } from "@/registry/feature-flags";
import type { IndexEntry } from "@/registry/indexes";
import { isLRZCodexIndexSymbolSlug } from "@/registry/symbols";

import styles from "./PageHeader.module.css";

export type PageHeaderBreadcrumbItem = {
    href: string;
    label: string;
};

export function PageHeaderBreadcrumbs({
    items,
}: {
    items: readonly PageHeaderBreadcrumbItem[];
}) {
    return (
        <nav className={styles.breadcrumbList} aria-label="Fil d’Ariane">
            {items.map((item, index) => (
                <span className={styles.breadcrumbItem} key={item.href}>
                    {index > 0 ? <span aria-hidden>→</span> : null}
                    <Link href={item.href}>{item.label}</Link>
                </span>
            ))}
        </nav>
    );
}

export function PageHeaderIndexMark({
    index,
}: {
    index: Pick<IndexEntry, "mark" | "slug">;
}) {
    if (
        featureIsEnabled("indexesCustomEmoji") &&
        isLRZCodexIndexSymbolSlug(index.slug)
    ) {
        return (
            <LRZSymbol
                collection="codex"
                meta="index"
                slug={index.slug}
                size={58}
                frame="subtle"
                shape="rounded"
                padding="sm"
                shadow="soft"
                className={styles.indexMarkSymbol}
                loading="eager"
                decorative
            />
        );
    }

    return (
        <span className={styles.indexMarkBadge} aria-hidden>
            <span className={styles.indexCollectionMark}>{index.mark}</span>
        </span>
    );
}

export function PageHeaderIndexNavigation({
    current,
    indexes,
    activeSectionHref,
}: {
    current: string;
    indexes: readonly IndexEntry[];
    activeSectionHref?: string;
}) {
    if (indexes.length <= 1) return null;

    return (
        <nav className={styles.indexNav} aria-label="Index du Codex">
            {indexes.map((index) => {
                const isCurrentPage = index.href === current;
                const isCurrentSection = index.href === activeSectionHref;

                return (
                    <Link
                        key={index.href}
                        href={index.href}
                        className={styles.indexNavButton}
                        style={{ "--accent": index.accent } as CSSProperties}
                        aria-current={isCurrentPage ? "page" : undefined}
                        data-current-section={
                            !isCurrentPage && isCurrentSection ? "" : undefined
                        }
                    >
                        {featureIsEnabled("indexesCustomEmoji") &&
                        isLRZCodexIndexSymbolSlug(index.slug) ? (
                            <LRZSymbol
                                collection="codex"
                                meta="index"
                                slug={index.slug}
                                size={25}
                                decorative
                            />
                        ) : (
                            <span className={styles.indexNavEmoji} aria-hidden>
                                {index.mark}
                            </span>
                        )}
                        <span className={styles.indexNavText}>
                            {index.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
