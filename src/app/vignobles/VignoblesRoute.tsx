import vignobleData from "@data/catalogue-vignobles.json";

import IndexShell from "@/components/_shells/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import type { CardReturnContext } from "@/lib/card-return-context";
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
    returnContext,
}: {
    initialOpenSlug?: string;
    returnContext?: CardReturnContext;
} = {}) {
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
                returnContext={returnContext}
            />
        </IndexShell>
    );
}

export const vignoblesMetadata = buildPageMetadata(VIGNOBLES_PAGE);
