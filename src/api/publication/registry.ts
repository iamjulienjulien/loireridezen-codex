import chateauData from "@data/chateau.json";
import fauneData from "@data/faune.json";
import floreData from "@data/flore.json";
import motData from "@data/mot.json";
import patrimoineData from "@data/patrimoine.json";
import vignobleData from "@data/vignoble.json";
import type { z } from "zod";
import {
    adaptChateau,
    adaptFaune,
    adaptFlore,
    adaptMot,
    adaptPatrimoine,
    adaptVignoble,
    type EntryAdapter,
    type InternalEntry,
} from "@/api/adapters";
import {
    chateauCatalogSchema,
    fauneCatalogSchema,
    floreCatalogSchema,
    motCatalogSchema,
    patrimoineCatalogSchema,
    vignobleCatalogSchema,
} from "@/api/schemas";
import type { CatalogMeta, PublicEntry, PublicIndex } from "@/api/types";
import {
    INDEXES,
    getIndexBySlug,
    type IndexEntry,
    type IndexSlug,
} from "@/registry/indexes";

interface TechnicalSource {
    slug: IndexSlug;
    collectionKey: string;
    raw: unknown;
    schema: z.ZodType;
    adapter: EntryAdapter;
}

interface RegisteredIndex {
    definition: IndexEntry;
    meta: CatalogMeta;
    entries: InternalEntry[];
    adapter: EntryAdapter;
}

const sources: readonly TechnicalSource[] = [
    {
        slug: "faune",
        collectionKey: "especes",
        raw: fauneData,
        schema: fauneCatalogSchema,
        adapter: adaptFaune as EntryAdapter,
    },
    {
        slug: "flore",
        collectionKey: "flore",
        raw: floreData,
        schema: floreCatalogSchema,
        adapter: adaptFlore as EntryAdapter,
    },
    {
        slug: "chateaux",
        collectionKey: "chateaux",
        raw: chateauData,
        schema: chateauCatalogSchema,
        adapter: adaptChateau as EntryAdapter,
    },
    {
        slug: "vignobles",
        collectionKey: "vignobles",
        raw: vignobleData,
        schema: vignobleCatalogSchema,
        adapter: adaptVignoble as EntryAdapter,
    },
    {
        slug: "vocabulaire",
        collectionKey: "mots",
        raw: motData,
        schema: motCatalogSchema,
        adapter: adaptMot as EntryAdapter,
    },
    {
        slug: "patrimoine",
        collectionKey: "patrimoine",
        raw: patrimoineData,
        schema: patrimoineCatalogSchema,
        adapter: adaptPatrimoine as EntryAdapter,
    },
] as const;

const formatIssues = (issues: z.core.$ZodIssue[]) =>
    issues
        .map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`)
        .join("; ");

const buildRegistry = (): ReadonlyMap<IndexSlug, RegisteredIndex> => {
    const expected = new Set(INDEXES.map(({ slug }) => slug));
    const actual = new Set(sources.map(({ slug }) => slug));

    if (
        expected.size !== sources.length ||
        [...expected].some((slug) => !actual.has(slug))
    ) {
        throw new Error(
            "The API publication registry does not match the index registry.",
        );
    }

    return new Map(
        sources.map((source) => {
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

            return [
                source.slug,
                {
                    definition,
                    meta: parsed.meta as CatalogMeta,
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
