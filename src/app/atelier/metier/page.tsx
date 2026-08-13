import chateauCatalogue from "@data/catalogue-chateaux.json";
import guinguettesCatalogue from "@data/catalogue-guinguettes.json";
import territoireCatalogue from "@data/catalogue-territoires.json";
import vignobleCatalogue from "@data/catalogue-vignobles.json";
import villesVillagesCatalogue from "@data/catalogue-villes-villages.json";

import AtelierCategoryLayout from "@/components/_atelier/AtelierCategoryLayout";
import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import {
    getNearbyGuinguettes,
    type NearbyGuinguettesByChateau,
} from "@/lib/nearby-guinguettes";
import { getTerritoireChateaux } from "@/registry/chateaux-territoires";
import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import {
    getPersonnagesByLieu,
    getPersonnageWithRelations,
} from "@/lib/personnages";
import type { TerritoireSlug } from "@/registry/territoires";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";
import type { VilleVillageCatalogueEntry } from "@/types/villeVillageCatalogue";
import MetierShowcase from "./MetierShowcase";

export const metadata = getAtelierPageMetadata("/atelier/metier");

const PERSONNAGE_EXAMPLE_IDS = [
    "agnes-sorel",
    "anne-de-bretagne",
    "jeanne-d-arc",
] as const;

const CHATEAUX = chateauCatalogue.chateaux as Chateau[];
const GUINGUETTES = guinguettesCatalogue.guinguettes as Guinguette[];
const NEARBY_GUINGUETTES_BY_CHATEAU: NearbyGuinguettesByChateau =
    Object.fromEntries(
        CHATEAUX.map((chateau) => [
            chateau.slug,
            getNearbyGuinguettes(chateau, GUINGUETTES),
        ]),
    );
const TERRITOIRE_EXAMPLE_SLUGS = new Set(["touraine", "anjou"]);
const VIGNOBLE_EXAMPLE_SLUGS = new Set([
    "sancerre",
    "vouvray",
    "muscadet-sevre-et-maine",
]);
const VILLE_VILLAGE_EXAMPLE_SLUGS = new Set(["amboise", "angers", "nantes"]);
const TERRITOIRE_EXAMPLES = (
    territoireCatalogue.territoires as TerritoireCatalogueEntry[]
)
    .filter((territoire) => TERRITOIRE_EXAMPLE_SLUGS.has(territoire.slug))
    .map((territoire) => ({
        territoire,
        chateaux: getTerritoireChateaux(
            CHATEAUX,
            territoire.slug as TerritoireSlug,
        ),
        guinguettes: GUINGUETTES.filter(
            (guinguette) => guinguette.territoire === territoire.slug,
        ),
    }));
const VIGNOBLE_EXAMPLES = (vignobleCatalogue.vignobles as Vignoble[]).filter(
    (vignoble) => VIGNOBLE_EXAMPLE_SLUGS.has(vignoble.slug),
);
const VILLE_VILLAGE_EXAMPLES = (
    villesVillagesCatalogue.villesVillages as VilleVillageCatalogueEntry[]
).filter((villeVillage) => VILLE_VILLAGE_EXAMPLE_SLUGS.has(villeVillage.slug));

export default function AtelierMetierPage() {
    const personnageExamples = PERSONNAGE_EXAMPLE_IDS.flatMap((id) => {
        const example = getPersonnageWithRelations(id);
        return example ? [example] : [];
    });
    const personnagesByChateau = getPersonnagesByLieu();

    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Domaine"
            title="Composants Métier"
            description="Les cartes qui traduisent les données du Codex en fiches éditoriales : espèces, flore, patrimoine castral, guinguettes, vignobles, territoires et personnages de la Loire."
        >
            <MetierShowcase
                personnageExamples={personnageExamples}
                personnagesByChateau={personnagesByChateau}
                nearbyGuinguettesByChateau={NEARBY_GUINGUETTES_BY_CHATEAU}
                territoireExamples={TERRITOIRE_EXAMPLES}
                vignobleExamples={VIGNOBLE_EXAMPLES}
                villeVillageExamples={VILLE_VILLAGE_EXAMPLES}
            />
            <ComponentsNavigation />
        </AtelierCategoryLayout>
    );
}
