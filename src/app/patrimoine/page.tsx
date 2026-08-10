import patrimoine from "@data/patrimoine.json";
import IndexShell from "@/components/layout/IndexShell";
import type { Patrimoine } from "@/types/patrimoine";
import { requireIndexForEnv } from "@/lib/publication-guards";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import PatrimoineIndex from "./PatrimoineIndex";

const PATRIMOINE_PAGE = getIndexPageDefinition("/patrimoine");

export function generateMetadata() {
    requireIndexForEnv("patrimoine");
    return buildPageMetadata(PATRIMOINE_PAGE);
}

export default function PatrimoinePage() {
    requireIndexForEnv("patrimoine");
    const items = patrimoine.patrimoine as Patrimoine[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return (
        <IndexShell
            page={PATRIMOINE_PAGE}
            indexes={indexes}
            totalEntries={items.length}
        >
            <PatrimoineIndex items={items} indexes={indexes} />
        </IndexShell>
    );
}
