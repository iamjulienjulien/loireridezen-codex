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

import PersonnagesIndex, { type PersonnageIndexEntry } from "./PersonnagesIndex";

export const PERSONNAGES_PAGE = getIndexPageDefinition("/personnages");
export const PERSONNAGES = getPersonnages();

export function getPersonnageBySlug(slug: string) {
    return PERSONNAGES.find((personnage) => personnage.id === slug);
}

export function PersonnagesRoute({ initialOpenSlug }: { initialOpenSlug?: string } = {}) {
    if (!featureIsEnabled("personnages")) notFound();

    const catalogue = getCataloguePersonnages();
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const entries: PersonnageIndexEntry[] = PERSONNAGES.map((personnage) => ({
        personnage,
        relations: getRelationsForPersonnage(personnage.id),
    }));

    return (
        <IndexShell
            page={PERSONNAGES_PAGE}
            indexes={indexes}
            totalEntries={PERSONNAGES.length}
        >
            <PersonnagesIndex
                entries={entries}
                indexes={indexes}
                relationCount={catalogue.meta.nombreRelations}
                initialOpenSlug={initialOpenSlug}
            />
        </IndexShell>
    );
}

export const personnagesMetadata = buildPageMetadata(PERSONNAGES_PAGE);
