import chateauData from "@data/catalogue-chateaux.json";

import IndexShell from "@/components/layout/IndexShell";
import { getPersonnagesByLieu } from "@/lib/personnages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { ChateauV2 } from "@/types/chateauV2";

import ChateauxIndex from "./ChateauxIndex";

export const CHATEAUX_PAGE = getIndexPageDefinition("/chateaux");

export const CHATEAUX = chateauData.chateaux as ChateauV2[];

export function getChateauBySlug(slug: string) {
    return CHATEAUX.find((chateau) => chateau.slug === slug);
}

export function ChateauxRoute({ initialOpenSlug }: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const personnagesByChateau = featureIsEnabled("personnages")
        ? getPersonnagesByLieu()
        : {};

    return (
        <IndexShell
            page={CHATEAUX_PAGE}
            indexes={indexes}
            totalEntries={CHATEAUX.length}
        >
            <ChateauxIndex
                chateaux={CHATEAUX}
                indexes={indexes}
                personnagesByChateau={personnagesByChateau}
                initialOpenSlug={initialOpenSlug}
            />
        </IndexShell>
    );
}

export const chateauxMetadata = buildPageMetadata(CHATEAUX_PAGE);
