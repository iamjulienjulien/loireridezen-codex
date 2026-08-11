import fauneData from "@data/catalogue-faune.json";

import IndexShell from "@/components/layout/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { FauneEspece } from "@/types/faune";

import FauneIndex from "./FauneIndex";

export const FAUNE_PAGE = getIndexPageDefinition("/faune");
export const FAUNE_ESPECES = fauneData.especes as FauneEspece[];

export function getFauneBySlug(slug: string) {
    return FAUNE_ESPECES.find((espece) => espece.slug === slug);
}

export function FauneRoute({
    initialOpenSlug,
}: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={FAUNE_PAGE}
            indexes={indexes}
            totalEntries={FAUNE_ESPECES.length}
        >
            <FauneIndex
                especes={FAUNE_ESPECES}
                indexes={indexes}
                initialOpenSlug={initialOpenSlug}
            />
        </IndexShell>
    );
}

export const fauneMetadata = buildPageMetadata(FAUNE_PAGE);
