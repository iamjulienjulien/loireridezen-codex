import guinguettesData from "@data/catalogue-guinguettes.json";
import IndexShell from "@/components/layout/IndexShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Guinguette } from "@/types/guinguette";
import GuinguettesIndex from "./GuinguettesIndex";

const GUINGUETTES_PAGE = getIndexPageDefinition("/guinguettes");

export const metadata = buildPageMetadata(GUINGUETTES_PAGE);

export default function GuinguettesPage() {
    const guinguettes = guinguettesData.guinguettes as Guinguette[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={GUINGUETTES_PAGE}
            indexes={indexes}
            totalEntries={guinguettes.length}
        >
            <GuinguettesIndex guinguettes={guinguettes} indexes={indexes} />
        </IndexShell>
    );
}
