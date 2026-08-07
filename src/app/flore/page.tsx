import flore from "@data/flore.json";
import IndexShell from "@/components/layout/IndexShell";
import type { Flore } from "@/types/flore";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import FloreIndex from "./FloreIndex";

const FLORE_PAGE = getIndexPageDefinition("/flore");

export const metadata = buildPageMetadata(FLORE_PAGE);

export default function FlorePage() {
    const flore_ = flore.flore as Flore[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return (
        <IndexShell
            page={FLORE_PAGE}
            indexes={indexes}
            totalEntries={flore_.length}
        >
            <FloreIndex flore={flore_} indexes={indexes} />
        </IndexShell>
    );
}
