import type { IndexEtat, IndexSlug } from "@/registry/indexes";

export interface PublicMedia {
    emoji: string;
    imageUrl: string | null;
}

export interface PublicEntry {
    id: string;
    index: IndexSlug;
    slug: string;
    name: string;
    subtitle: string;
    summary: string | null;
    media: PublicMedia;
    attributes: Record<string, unknown>;
}

export interface PublicIndex {
    slug: IndexSlug;
    label: string;
    title: string;
    description: string;
    mark: string;
    accent: string;
    presentation: string;
    presentationMarkdown: string;
    state: IndexEtat;
    entryCount: number;
    updatedAt: string;
    source: string;
    corridor: string;
    editorialWarning: string | null;
    links: {
        self: string;
        entries: string;
    };
}

export interface CatalogMeta {
    titre: string;
    source: string;
    corridor: string;
    maj: string;
    note?: string;
}
