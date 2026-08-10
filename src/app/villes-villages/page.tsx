import villesVillagesCatalogue from "@data/catalogue-villes-villages.json";

import IndexShell from "@/components/layout/IndexShell";
import { requireIndexForEnv } from "@/lib/publication-guards";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { VilleVillageCatalogueEntry } from "@/types/villeVillageCatalogue";

import VillesVillagesIndex from "./VillesVillagesIndex";

const VILLES_VILLAGES_PAGE = getIndexPageDefinition("/villes-villages");

export function generateMetadata() {
    requireIndexForEnv("villes-villages");
    return buildPageMetadata(VILLES_VILLAGES_PAGE);
}

export default function VillesVillagesPage() {
    requireIndexForEnv("villes-villages");
    const villesVillages = [
        ...(villesVillagesCatalogue.villesVillages as VilleVillageCatalogueEntry[]),
    ].sort((first, second) =>
        first.nom.localeCompare(second.nom, "fr", { sensitivity: "base" }),
    );
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return (
        <IndexShell
            page={VILLES_VILLAGES_PAGE}
            indexes={indexes}
            totalEntries={villesVillages.length}
        >
            <VillesVillagesIndex
                villesVillages={villesVillages}
                indexes={indexes}
            />
        </IndexShell>
    );
}
