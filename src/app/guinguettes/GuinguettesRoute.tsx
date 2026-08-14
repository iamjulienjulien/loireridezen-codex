import guinguettesData from "@data/catalogue-guinguettes.json";
import territoiresData from "@data/catalogue-territoires.json";
import vignoblesData from "@data/catalogue-vignobles.json";

import IndexShell from "@/components/_shells/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
    buildVignoblesParTerritoire,
    type VignoblesParTerritoire,
} from "@/lib/vignobles-territoires";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import GuinguettesIndex from "./GuinguettesIndex";

export const GUINGUETTES_PAGE = getIndexPageDefinition("/guinguettes");
export const GUINGUETTES = guinguettesData.guinguettes as Guinguette[];
const TERRITOIRES = territoiresData.territoires as TerritoireCatalogueEntry[];
const VIGNOBLES = vignoblesData.vignobles as Vignoble[];

export function getGuinguetteBySlug(slug: string) {
    return GUINGUETTES.find((guinguette) => guinguette.slug === slug);
}

export function GuinguettesRoute({
    initialOpenSlug,
}: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const vignoblesByTerritoire: VignoblesParTerritoire | undefined =
        featureIsEnabled("followTheThread")
            ? buildVignoblesParTerritoire(VIGNOBLES, TERRITOIRES)
            : undefined;

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
                vignoblesByTerritoire={vignoblesByTerritoire}
            />
        </IndexShell>
    );
}

export const guinguettesMetadata = buildPageMetadata(GUINGUETTES_PAGE);
