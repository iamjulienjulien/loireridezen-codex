import chateauData from "@data/catalogue-chateaux.json";
import guinguettesData from "@data/catalogue-guinguettes.json";
import territoiresData from "@data/catalogue-territoires.json";
import vignoblesData from "@data/catalogue-vignobles.json";

import IndexShell from "@/components/_shells/IndexShell";
import {
    getNearbyGuinguettes,
    type NearbyGuinguettesByChateau,
} from "@/lib/nearby-guinguettes";
import { getPersonnagesByLieu } from "@/lib/personnages";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
    buildVignoblesParTerritoire,
    type VignoblesParTerritoire,
} from "@/lib/vignobles-territoires";
import { featureIsEnabled } from "@/registry/feature-flags";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import ChateauxIndex from "./ChateauxIndex";

export const CHATEAUX_PAGE = getIndexPageDefinition("/chateaux");

export const CHATEAUX = chateauData.chateaux as Chateau[];
const GUINGUETTES = guinguettesData.guinguettes as Guinguette[];
const TERRITOIRES = territoiresData.territoires as TerritoireCatalogueEntry[];
const VIGNOBLES = vignoblesData.vignobles as Vignoble[];

export function getChateauBySlug(slug: string) {
    return CHATEAUX.find((chateau) => chateau.slug === slug);
}

export function ChateauxRoute({
    initialOpenSlug,
}: { initialOpenSlug?: string } = {}) {
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    const personnagesByChateau = getPersonnagesByLieu();
    const nearbyGuinguettesByChateau: NearbyGuinguettesByChateau | undefined =
        featureIsEnabled("followTheThread")
            ? Object.fromEntries(
                  CHATEAUX.map((chateau) => [
                      chateau.slug,
                      getNearbyGuinguettes(chateau, GUINGUETTES),
                  ]),
              )
            : undefined;
    const vignoblesByTerritoire: VignoblesParTerritoire | undefined =
        featureIsEnabled("followTheThread")
            ? buildVignoblesParTerritoire(VIGNOBLES, TERRITOIRES)
            : undefined;

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
                nearbyGuinguettesByChateau={nearbyGuinguettesByChateau}
                vignoblesByTerritoire={vignoblesByTerritoire}
                initialOpenSlug={initialOpenSlug}
            />
        </IndexShell>
    );
}

export const chateauxMetadata = buildPageMetadata(CHATEAUX_PAGE);
