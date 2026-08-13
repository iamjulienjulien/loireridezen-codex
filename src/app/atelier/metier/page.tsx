import chateauCatalogue from "@data/catalogue-chateaux.json";
import guinguettesCatalogue from "@data/catalogue-guinguettes.json";
import territoireCatalogue from "@data/catalogue-territoires.json";
import vignobleCatalogue from "@data/catalogue-vignobles.json";
import villesVillagesCatalogue from "@data/catalogue-villes-villages.json";

import AtelierCategoryLayout from "@/components/_atelier/AtelierCategoryLayout";
import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import {
    getNearbyGuinguettes,
    type NearbyGuinguette,
} from "@/lib/nearby-guinguettes";
import { getTerritoireChateaux } from "@/registry/chateaux-territoires";
import { featureIsEnabled } from "@/registry/feature-flags";
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
import MetierShowcase, { type ChateauShowcaseExample } from "./MetierShowcase";

export const metadata = getAtelierPageMetadata("/atelier/metier");

const PERSONNAGE_EXAMPLE_IDS = [
    "agnes-sorel",
    "anne-de-bretagne",
    "jeanne-d-arc",
] as const;

const CHATEAUX = chateauCatalogue.chateaux as Chateau[];
const GUINGUETTES = guinguettesCatalogue.guinguettes as Guinguette[];

const getChateau = (slug: string): Chateau => {
    const chateau = CHATEAUX.find((entry) => entry.slug === slug);
    if (!chateau) throw new Error(`Château Atelier introuvable : ${slug}`);
    return chateau;
};

const getGuinguette = (slug: string): Guinguette => {
    const guinguette = GUINGUETTES.find((entry) => entry.slug === slug);
    if (!guinguette)
        throw new Error(`Guinguette Atelier introuvable : ${slug}`);
    return guinguette;
};

const composeNearbyGuinguettes = (
    entries: readonly [slug: string, distanceKm: number][],
): NearbyGuinguette[] =>
    entries.map(([slug, distanceKm]) => ({
        guinguette: getGuinguette(slug),
        distanceKm,
    }));

const CHATEAU_EXAMPLES: ChateauShowcaseExample[] = [
    {
        label: "1 proximité réelle",
        detail: "Sélection géographique automatique",
        chateau: getChateau("chateau-de-meung-sur-loire"),
        nearbyGuinguettes: getNearbyGuinguettes(
            getChateau("chateau-de-meung-sur-loire"),
            GUINGUETTES,
        ),
    },
    {
        label: "2 guinguettes",
        detail: "Scénario composé avec des adresses du catalogue",
        chateau: getChateau("chateau-de-chambord"),
        nearbyGuinguettes: composeNearbyGuinguettes([
            ["pause-gourmande-muides-sur-loire", 0.8],
            ["guinguette-o-ranch", 1.3],
        ]),
    },
    {
        label: "3 proximités réelles",
        detail: "Plafond et tri par distance",
        chateau: getChateau("chateau-de-saumur"),
        nearbyGuinguettes: getNearbyGuinguettes(
            getChateau("chateau-de-saumur"),
            GUINGUETTES,
        ),
    },
    {
        label: "Aucune proximité",
        detail: "La section Après la visite disparaît",
        chateau: getChateau("chateau-de-chenonceau"),
        nearbyGuinguettes: [],
    },
    {
        label: "À vérifier",
        detail: "Signal éditorial sur une entrée incertaine",
        chateau: getChateau("chateau-royal-de-blois"),
        nearbyGuinguettes: composeNearbyGuinguettes([
            ["guinguette-du-port-de-chaumot", 0.65],
        ]),
    },
    {
        label: "19 expériences",
        detail: "Résistance de la grille de stamps",
        chateau: getChateau("chateau-de-gizeux"),
        nearbyGuinguettes: [],
    },
];
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
    const followTheThreadEnabled = featureIsEnabled("followTheThread");

    return (
        <AtelierCategoryLayout
            eyebrow="Atelier · Domaine"
            title="Composants Métier"
            description="Les cartes qui traduisent les données du Codex en fiches éditoriales : espèces, flore, patrimoine castral, guinguettes, vignobles, territoires et personnages de la Loire."
        >
            <MetierShowcase
                chateauExamples={CHATEAU_EXAMPLES}
                followTheThreadEnabled={followTheThreadEnabled}
                personnageExamples={personnageExamples}
                personnagesByChateau={personnagesByChateau}
                territoireExamples={TERRITOIRE_EXAMPLES}
                vignobleExamples={VIGNOBLE_EXAMPLES}
                villeVillageExamples={VILLE_VILLAGE_EXAMPLES}
            />
            <ComponentsNavigation />
        </AtelierCategoryLayout>
    );
}
