import chateau from "@data/chateau.json";
import IndexShell from "@/components/layout/IndexShell";
import type { Chateau } from "@/types/chateau";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import ChateauxIndex from "./ChateauxIndex";

const CHATEAUX_PAGE = getIndexPageDefinition("/chateaux");

export const metadata = buildPageMetadata(CHATEAUX_PAGE);

export default function ChateauxPage() {
    const chateaux = chateau.chateaux as Chateau[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={CHATEAUX_PAGE}
            indexes={indexes}
            totalEntries={chateaux.length}
        >
            <ChateauxIndex chateaux={chateaux} indexes={indexes} />
        </IndexShell>
    );
}
