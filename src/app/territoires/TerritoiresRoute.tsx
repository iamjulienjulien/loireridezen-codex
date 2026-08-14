import chateauCatalogue from "@data/catalogue-chateaux.json";
import guinguettesCatalogue from "@data/catalogue-guinguettes.json";
import territoireCatalogue from "@data/catalogue-territoires.json";
import vignobleCatalogue from "@data/catalogue-vignobles.json";

import IndexShell from "@/components/_shells/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import type { CardReturnContext } from "@/lib/card-return-context";
import {
    buildVignoblesParTerritoire,
    type VignoblesParTerritoire,
} from "@/lib/vignobles-territoires";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import TerritoiresIndex from "./TerritoiresIndex";

export const TERRITOIRES_PAGE = getIndexPageDefinition("/territoires");

export const TERRITOIRES = [
    ...(territoireCatalogue.territoires as TerritoireCatalogueEntry[]),
].sort((first, second) => first.ordre - second.ordre);

const CHATEAUX = chateauCatalogue.chateaux as Chateau[];
const GUINGUETTES = guinguettesCatalogue.guinguettes as Guinguette[];
const VIGNOBLES = vignobleCatalogue.vignobles as Vignoble[];

export function getTerritoireBySlug(slug: string) {
    return TERRITOIRES.find((territoire) => territoire.slug === slug);
}

export function TerritoiresRoute({
    initialOpenSlug,
    returnContext,
}: {
    initialOpenSlug?: string;
    returnContext?: CardReturnContext;
} = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const vignoblesByTerritoire: VignoblesParTerritoire | undefined =
        featureIsEnabled("followTheThread")
            ? buildVignoblesParTerritoire(VIGNOBLES, TERRITOIRES)
            : undefined;

    return (
        <IndexShell
            page={TERRITOIRES_PAGE}
            indexes={indexes}
            totalEntries={TERRITOIRES.length}
        >
            <TerritoiresIndex
                territoires={TERRITOIRES}
                chateaux={CHATEAUX}
                guinguettes={GUINGUETTES}
                indexes={indexes}
                initialOpenSlug={initialOpenSlug}
                returnContext={returnContext}
                vignoblesByTerritoire={vignoblesByTerritoire}
            />
        </IndexShell>
    );
}

export const territoiresMetadata = buildPageMetadata(TERRITOIRES_PAGE);
