import vignoble from "@data/vignoble.json";
import IndexShell from "@/components/layout/IndexShell";
import type { Vignoble } from "@/types/vignoble";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import VignoblesIndex from "./VignoblesIndex";

const VIGNOBLES_PAGE = getIndexPageDefinition("/vignobles");

export const metadata = buildPageMetadata(VIGNOBLES_PAGE);

export default function VignoblesPage() {
    const vignobles = vignoble.vignobles as Vignoble[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return (
        <IndexShell
            page={VIGNOBLES_PAGE}
            indexes={indexes}
            totalEntries={vignobles.length}
        >
            <VignoblesIndex vignobles={vignobles} indexes={indexes} />
        </IndexShell>
    );
}
