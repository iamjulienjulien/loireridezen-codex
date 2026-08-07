import chateau from "@data/catalogue-chateaux.json";
import type { ChateauV2 } from "@/types/chateauV2";

/**
 * Jeu de démonstration pour l'atelier : jusqu'à 2 châteaux de chaque époque,
 * tirés du catalogue réel (data/catalogue-chateaux.json). On privilégie les mieux
 * renseignés (résumé + commanditaire) pour les démos v3 et v4.
 */
const EPOQUES = ["Médiéval", "Renaissance", "Classique", "Éclectique"];

const CATALOG = chateau.chateaux as ChateauV2[];

const richesse = (c: ChateauV2) =>
    (c.resume ? 1 : 0) + (c.commanditaire ? 1 : 0);

export const MOCK_CHATEAU: ChateauV2[] = EPOQUES.flatMap((e) =>
    CATALOG.filter((c) => c.epoque === e)
        .sort((a, b) => richesse(b) - richesse(a))
        .slice(0, 2),
);
