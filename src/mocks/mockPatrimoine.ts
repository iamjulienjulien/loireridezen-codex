import patrimoine from "@data/catalogue-patrimoine.json";
import type { Patrimoine } from "@/types/patrimoine";

/**
 * Jeu de démonstration pour l'atelier : jusqu'à 2 ouvrages de chaque type,
 * tirés du catalogue réel (data/catalogue-patrimoine.json).
 */
const TYPES = [
    "pont",
    "port",
    "artisanal",
    "moulin",
    "mémoriel",
    "eau",
    "phare",
    "défensif",
];

const CATALOG = patrimoine.patrimoine as Patrimoine[];

export const MOCK_PATRIMOINE: Patrimoine[] = TYPES.flatMap((t) =>
    CATALOG.filter((p) => p.type === t).slice(0, 2),
);
