import chateau from "@data/catalogue-chateaux.json";
import IndexShell from "@/components/layout/IndexShell";
import type { ChateauV2 } from "@/types/chateauV2";
import { getPersonnagesByLieu } from "@/lib/personnages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import ChateauxIndex from "./ChateauxIndex";

const CHATEAUX_PAGE = getIndexPageDefinition("/chateaux");

export const metadata = buildPageMetadata(CHATEAUX_PAGE);

export default function ChateauxPage() {
    const chateaux = chateau.chateaux as ChateauV2[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const personnagesByChateau = featureIsEnabled("personnages")
        ? getPersonnagesByLieu()
        : {};

    return (
        <IndexShell
            page={CHATEAUX_PAGE}
            indexes={indexes}
            totalEntries={chateaux.length}
        >
            <ChateauxIndex
                chateaux={chateaux}
                indexes={indexes}
                personnagesByChateau={personnagesByChateau}
            />
        </IndexShell>
    );
}
