import territoireCatalogue from "@data/catalogue-territoires.json";

import IndexShell from "@/components/layout/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import TerritoiresIndex from "./TerritoiresIndex";

const TERRITOIRES_PAGE = getIndexPageDefinition("/territoires");

export const metadata = buildPageMetadata(TERRITOIRES_PAGE);

export default function TerritoiresPage() {
    const territoires = [
        ...(territoireCatalogue.territoires as TerritoireCatalogueEntry[]),
    ].sort((first, second) => first.ordre - second.ordre);
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={TERRITOIRES_PAGE}
            indexes={indexes}
            totalEntries={territoires.length}
        >
            <TerritoiresIndex territoires={territoires} indexes={indexes} />
        </IndexShell>
    );
}
