import chateauCatalogue from "@data/catalogue-chateaux.json";
import guinguettesCatalogue from "@data/catalogue-guinguettes.json";
import territoireCatalogue from "@data/catalogue-territoires.json";

import IndexShell from "@/components/layout/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import TerritoiresIndex from "./TerritoiresIndex";

export const TERRITOIRES_PAGE = getIndexPageDefinition("/territoires");

export const TERRITOIRES = [
    ...(territoireCatalogue.territoires as TerritoireCatalogueEntry[]),
].sort((first, second) => first.ordre - second.ordre);

const CHATEAUX = chateauCatalogue.chateaux as Chateau[];
const GUINGUETTES = guinguettesCatalogue.guinguettes as Guinguette[];

export function getTerritoireBySlug(slug: string) {
    return TERRITOIRES.find((territoire) => territoire.slug === slug);
}

export function TerritoiresRoute({
    initialOpenSlug,
}: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

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
            />
        </IndexShell>
    );
}

export const territoiresMetadata = buildPageMetadata(TERRITOIRES_PAGE);
