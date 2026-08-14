import vignobleData from "@data/catalogue-vignobles.json";
import territoireData from "@data/catalogue-territoires.json";

import IndexShell from "@/components/_shells/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import type { CardReturnContext } from "@/lib/card-return-context";
import {
    resolveVignobleTerritoires,
    type TerritoiresParVignoble,
} from "@/lib/vignobles-territoires";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Vignoble } from "@/types/vignoble";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import VignoblesIndex from "./VignoblesIndex";

export const VIGNOBLES_PAGE = getIndexPageDefinition("/vignobles");
export const VIGNOBLES = vignobleData.vignobles as Vignoble[];
const TERRITOIRES = territoireData.territoires as TerritoireCatalogueEntry[];

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
    const territoiresByVignoble: TerritoiresParVignoble | undefined =
        featureIsEnabled("followTheThread")
            ? Object.fromEntries(
                  VIGNOBLES.map((vignoble) => [
                      vignoble.slug,
                      resolveVignobleTerritoires(vignoble, TERRITOIRES),
                  ]),
              )
            : undefined;

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
                territoiresByVignoble={territoiresByVignoble}
            />
        </IndexShell>
    );
}

export const vignoblesMetadata = buildPageMetadata(VIGNOBLES_PAGE);
