import floreData from "@data/catalogue-flore.json";

import IndexShell from "@/components/layout/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Flore } from "@/types/flore";

import FloreIndex from "./FloreIndex";

export const FLORE_PAGE = getIndexPageDefinition("/flore");
export const FLORE_ENTRIES = floreData.flore as Flore[];

export function getFloreBySlug(slug: string) {
    return FLORE_ENTRIES.find((flore) => flore.slug === slug);
}

export function FloreRoute({
    initialOpenSlug,
}: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={FLORE_PAGE}
            indexes={indexes}
            totalEntries={FLORE_ENTRIES.length}
        >
            <FloreIndex
                flore={FLORE_ENTRIES}
                indexes={indexes}
                initialOpenSlug={initialOpenSlug}
            />
        </IndexShell>
    );
}

export const floreMetadata = buildPageMetadata(FLORE_PAGE);
