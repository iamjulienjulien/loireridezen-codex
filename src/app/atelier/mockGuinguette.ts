import guinguettes from "@data/guinguettes.json";

import type { Guinguette } from "@/types/guinguette";

/**
 * Trois escales complémentaires pour présenter les principaux états de la
 * GuinguetteCardV3 : ligérienne, itinérante à vérifier et adresse intimiste.
 */
const EXAMPLE_SLUGS = [
    "guinguette-les-tourbillons",
    "la-marbelle",
    "la-cabane-du-bosquet",
] as const;

const CATALOG = guinguettes.guinguettes as Guinguette[];

export const MOCK_GUINGUETTE = EXAMPLE_SLUGS.flatMap((slug) => {
    const guinguette = CATALOG.find((item) => item.slug === slug);

    return guinguette ? [guinguette] : [];
});
