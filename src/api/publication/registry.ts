import type { z } from "zod";
import type { EntryAdapter, InternalEntry } from "@/api/adapters";
import type { CatalogMeta, PublicEntry, PublicIndex } from "@/api/types";
import {
    INDEXES,
    getIndexBySlug,
    type IndexEntry,
    type IndexSlug,
} from "@/registry/indexes";
import { TECHNICAL_INDEX_SOURCES } from "./sources";

export { TECHNICAL_INDEX_SOURCES, type TechnicalIndexSource } from "./sources";

interface RegisteredIndex {
    definition: IndexEntry;
    meta: CatalogMeta;
    entries: InternalEntry[];
    adapter: EntryAdapter;
}

const formatIssues = (issues: z.core.$ZodIssue[]) =>
    issues
        .map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`)
        .join("; ");

const buildRegistry = (): ReadonlyMap<IndexSlug, RegisteredIndex> => {
    const actual = new Set(TECHNICAL_INDEX_SOURCES.map(({ slug }) => slug));
    const required = new Set(
        INDEXES.filter((index) => index.etat === "publie").map(
            ({ slug }) => slug,
        ),
    );

    if (
        [...required].some((slug) => !actual.has(slug)) ||
        [...actual].some((slug) => !getIndexBySlug(slug))
    ) {
        throw new Error(
            "The API publication registry does not match the index registry.",
        );
    }

    return new Map(
        TECHNICAL_INDEX_SOURCES.map((source) => {
            const result = source.schema.safeParse(source.raw);
            if (!result.success) {
                const details = formatIssues(result.error.issues);
                console.error(`Invalid ${source.slug} catalog: ${details}`);
                throw new Error(`Invalid ${source.slug} catalog: ${details}`);
            }

            const parsed = result.data as Record<string, unknown>;
            const entries = parsed[source.collectionKey];
            if (!Array.isArray(entries)) {
                throw new Error(
                    `Invalid ${source.slug} catalog collection key.`,
                );
            }

            const slugs = entries.map((entry) =>
                String((entry as { slug?: unknown }).slug ?? ""),
            );
            if (
                slugs.some((slug) => slug.length === 0) ||
                new Set(slugs).size !== slugs.length
            ) {
                throw new Error(
                    `Catalog ${source.slug} contains empty or duplicate slugs.`,
                );
            }

            const definition = getIndexBySlug(source.slug);
            if (!definition) {
                throw new Error(
                    `Missing editorial registry entry for ${source.slug}.`,
                );
            }

            const expectedCatalogState =
                definition.etat === "publie" ? "publie" : "brouillon";
            const meta = parsed.meta as CatalogMeta;
            if (meta.etat !== expectedCatalogState) {
                throw new Error(
                    `Catalog ${source.slug} must be ${expectedCatalogState} when its index is ${definition.etat}.`,
                );
            }

            return [
                source.slug,
                {
                    definition,
                    meta,
                    entries: entries as InternalEntry[],
                    adapter: source.adapter,
                },
            ];
        }),
    );
};

const registry = buildRegistry();

const toPublicIndex = (item: RegisteredIndex): PublicIndex => {
    const { definition, meta, entries } = item;
    return {
        slug: definition.slug as IndexSlug,
        label: definition.label,
        title: definition.title,
        description: definition.description,
        mark: definition.mark,
        accent: definition.accent,
        presentation: definition.presentation,
        presentationMarkdown: definition.presentation_md,
        state: definition.etat,
        entryCount: entries.length,
        updatedAt: meta.maj,
        source: meta.source,
        corridor: meta.corridor,
        editorialWarning: meta.note ?? null,
        links: {
            self: `/api/v1/indexes/${definition.slug}`,
            entries: `/api/v1/indexes/${definition.slug}/entries`,
        },
    };
};

export const getRegisteredIndexes = () => [...registry.values()];

export const getPublishedIndexes = (): PublicIndex[] =>
    [...registry.values()]
        .filter(({ definition }) => definition.etat === "publie")
        .map(toPublicIndex);

const getPublishedRegisteredIndex = (slug: string) => {
    const item = registry.get(slug as IndexSlug);
    return item?.definition.etat === "publie" ? item : undefined;
};

export const getPublishedIndex = (slug: string): PublicIndex | undefined => {
    const item = getPublishedRegisteredIndex(slug);
    return item ? toPublicIndex(item) : undefined;
};

export const getPublishedEntries = (
    slug: string,
): PublicEntry[] | undefined => {
    const item = getPublishedRegisteredIndex(slug);
    return item?.entries.map((entry) => item.adapter(entry));
};

export const getPublishedEntry = (
    indexSlug: string,
    entrySlug: string,
): PublicEntry | undefined => {
    const item = getPublishedRegisteredIndex(indexSlug);
    if (!item) return undefined;
    const entry = item.entries.find(({ slug }) => slug === entrySlug);
    return entry ? item.adapter(entry) : undefined;
};
