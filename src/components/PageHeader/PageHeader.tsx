import type { CSSProperties } from "react";
import Link from "next/link";

import { LRZSymbol } from "@/components/LRZSymbol";
import { featureIsEnabled } from "@/registry/feature-flags";
import type { IndexEntry, IndexHref } from "@/registry/indexes";
import { isLRZIndexSymbolSlug } from "@/registry/symbols";
import type { LRZColor } from "@/types/lrz";

import type {
    CollectionHref,
    CollectionRegistryEntry,
} from "@/registry/collections";

import styles from "./PageHeader.module.css";
import LRZSeparateur from "../LRZSeparateur/LRZSeparateur";

export type PageHeaderCurrent = IndexHref | CollectionHref;

export type PageHeaderProps = {
    current: PageHeaderCurrent;
    indexes: readonly IndexEntry[];
    collections?: readonly CollectionRegistryEntry[];
};

type ActiveIndexPage = {
    kind: "index";
    slug: string;
    href: string;
    indexHref: string;
    title: string;
    label: string;
    mark: string;
    accent: string;
    color: LRZColor;
};

type ActiveCollectionPage = {
    kind: "collection";
    slug: string;
    href: string;
    indexHref: string;
    title: string;
    label: string;
    mark: string;
    accent: string;
    color: LRZColor;
};

type ActivePage = ActiveIndexPage | ActiveCollectionPage;

export default function PageHeader({
    current,
    indexes,
    collections = [],
}: PageHeaderProps) {
    const active = resolveActivePage({
        current,
        indexes,
        collections,
    });

    const activeIndexHref = active.indexHref;

    return (
        <div>
            <header className={styles.header} style={accentVar(active.accent)}>
                <div className={styles.brand}>
                    <PageMark active={active} />

                    <div className={styles.brandText}>
                        <span className={styles.identity}>
                            <span
                                className={styles.kickerBar}
                                aria-hidden="true"
                            />

                            <span className={styles.brandName}>
                                Loire Ride Zen
                            </span>

                            <span
                                className={styles.identitySeparator}
                                aria-hidden="true"
                            >
                                ·
                            </span>

                            <Link href="/" className={styles.siteName}>
                                Le Codex ligérien
                            </Link>

                            {active.kind === "collection" ? (
                                <>
                                    <span
                                        className={styles.identitySeparator}
                                        aria-hidden="true"
                                    >
                                        ·
                                    </span>

                                    <Link
                                        href={active.indexHref}
                                        className={styles.parentIndex}
                                    >
                                        Collection de l’index
                                    </Link>
                                </>
                            ) : null}
                        </span>

                        <h1 className={styles.title}>{active.title}</h1>
                    </div>
                </div>

                {indexes.length > 1 ? (
                    <nav className={styles.nav} aria-label="Index du Codex">
                        {indexes.map((index) => {
                            const isCurrentPage = index.href === current;

                            const isCurrentSection =
                                index.href === activeIndexHref;

                            return (
                                <Link
                                    key={index.href}
                                    href={index.href}
                                    className={styles.navButton}
                                    style={accentVar(index.accent)}
                                    aria-current={
                                        isCurrentPage ? "page" : undefined
                                    }
                                    data-current-section={
                                        !isCurrentPage && isCurrentSection
                                            ? ""
                                            : undefined
                                    }
                                >
                                    {featureIsEnabled("indexesCustomEmoji") &&
                                    isLRZIndexSymbolSlug(index.slug) ? (
                                        <LRZSymbol
                                            collection="index"
                                            slug={index.slug}
                                            size={25}
                                            decorative
                                        />
                                    ) : (
                                        <span
                                            className={styles.navEmoji}
                                            aria-hidden
                                        >
                                            {index.mark}
                                        </span>
                                    )}

                                    <span className={styles.navText}>
                                        {index.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                ) : null}
            </header>
            <LRZSeparateur
                preset="spark"
                scope="content"
                size="lg"
                weight="thin"
                tone="strong"
                color={active.color}
                marginBlock={"5px"}
                fadeEdges
            />
        </div>
    );
}

function PageMark({ active }: { active: ActivePage }) {
    if (
        active.kind === "index" &&
        featureIsEnabled("indexesCustomEmoji") &&
        isLRZIndexSymbolSlug(active.slug)
    ) {
        return (
            <LRZSymbol
                collection="index"
                slug={active.slug}
                size={58}
                frame="subtle"
                shape="rounded"
                padding="sm"
                shadow="soft"
                className={styles.markSymbol}
                loading="eager"
                decorative
            />
        );
    }

    return (
        <span className={styles.markBadge} aria-hidden="true">
            <span className={styles.collectionMark}>{active.mark}</span>
        </span>
    );
}

function resolveActivePage({
    current,
    indexes,
    collections,
}: {
    current: PageHeaderCurrent;
    indexes: readonly IndexEntry[];
    collections: readonly CollectionRegistryEntry[];
}): ActivePage {
    const collection = collections.find((entry) => entry.href === current);

    if (collection) {
        const currentIndex = "/" + current.split("/")[1];
        const index =
            indexes.find((entry) => entry.href === currentIndex) ?? indexes[0];
        return {
            kind: "collection",
            slug: collection.slug,
            href: collection.href,
            indexHref: collection.indexHref,
            title: collection.title,
            label: collection.label,
            mark: collection.mark,
            accent: collection.accent,
            color: index.color,
        };
    }

    const index = indexes.find((entry) => entry.href === current) ?? indexes[0];

    if (!index) {
        throw new Error(
            `PageHeader ne peut résoudre aucune page pour « ${current} ».`,
        );
    }

    return {
        kind: "index",
        slug: index.slug,
        href: index.href,
        indexHref: index.href,
        title: index.title,
        label: index.label,
        mark: index.mark,
        accent: index.accent,
        color: index.color,
    };
}

function accentVar(color: string): CSSProperties {
    return {
        "--accent": color,
    } as CSSProperties;
}
