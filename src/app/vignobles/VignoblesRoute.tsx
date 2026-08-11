import vignobleData from "@data/catalogue-vignobles.json";

import IndexShell from "@/components/layout/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Vignoble } from "@/types/vignoble";

import VignoblesIndex from "./VignoblesIndex";

export const VIGNOBLES_PAGE = getIndexPageDefinition("/vignobles");
export const VIGNOBLES = vignobleData.vignobles as Vignoble[];

export function getVignobleBySlug(slug: string) {
    return VIGNOBLES.find((vignoble) => vignoble.slug === slug);
}

export function VignoblesRoute({
    initialOpenSlug,
}: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={VIGNOBLES_PAGE}
            indexes={indexes}
            totalEntries={VIGNOBLES.length}
        >
            <VignoblesIndex
                vignobles={VIGNOBLES}
                indexes={indexes}
                initialOpenSlug={initialOpenSlug}
            />
        </IndexShell>
    );
}

export const vignoblesMetadata = buildPageMetadata(VIGNOBLES_PAGE);
