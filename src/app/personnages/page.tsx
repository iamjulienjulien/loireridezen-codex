import { notFound } from "next/navigation";

import IndexShell from "@/components/layout/IndexShell";
import {
    getCataloguePersonnages,
    getPersonnages,
    getRelationsForPersonnage,
} from "@/lib/personnages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";

import PersonnagesIndex, {
    type PersonnageIndexEntry,
} from "./PersonnagesIndex";

const PERSONNAGES_PAGE = getIndexPageDefinition("/personnages");

export const metadata = buildPageMetadata(PERSONNAGES_PAGE);

export default function PersonnagesPage() {
    if (!featureIsEnabled("personnages")) notFound();

    const catalogue = getCataloguePersonnages();
    const personnages = getPersonnages();
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const entries: PersonnageIndexEntry[] = personnages.map((personnage) => ({
        personnage,
        relations: getRelationsForPersonnage(personnage.id),
    }));

    return (
        <IndexShell
            page={PERSONNAGES_PAGE}
            indexes={indexes}
            totalEntries={personnages.length}
        >
            <PersonnagesIndex
                entries={entries}
                indexes={indexes}
                relationCount={catalogue.meta.nombreRelations}
            />
        </IndexShell>
    );
}
