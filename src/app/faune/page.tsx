import faune from "@data/faune.json";
import IndexShell from "@/components/layout/IndexShell";
import type { FauneEspece } from "@/types/faune";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import FauneIndex from "./FauneIndex";

const FAUNE_PAGE = getIndexPageDefinition("/faune");

export const metadata = buildPageMetadata(FAUNE_PAGE);

export default function FaunePage() {
    const especes = faune.especes as FauneEspece[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return (
        <IndexShell
            page={FAUNE_PAGE}
            indexes={indexes}
            totalEntries={especes.length}
        >
            <FauneIndex especes={especes} indexes={indexes} />
        </IndexShell>
    );
}
