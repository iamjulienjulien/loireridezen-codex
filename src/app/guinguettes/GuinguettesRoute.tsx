import guinguettesData from "@data/catalogue-guinguettes.json";

import IndexShell from "@/components/_shells/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Guinguette } from "@/types/guinguette";

import GuinguettesIndex from "./GuinguettesIndex";

export const GUINGUETTES_PAGE = getIndexPageDefinition("/guinguettes");
export const GUINGUETTES = guinguettesData.guinguettes as Guinguette[];

export function getGuinguetteBySlug(slug: string) {
    return GUINGUETTES.find((guinguette) => guinguette.slug === slug);
}

export function GuinguettesRoute({
    initialOpenSlug,
}: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={GUINGUETTES_PAGE}
            indexes={indexes}
            totalEntries={GUINGUETTES.length}
        >
            <GuinguettesIndex
                guinguettes={GUINGUETTES}
                indexes={indexes}
                initialOpenSlug={initialOpenSlug}
            />
        </IndexShell>
    );
}

export const guinguettesMetadata = buildPageMetadata(GUINGUETTES_PAGE);
