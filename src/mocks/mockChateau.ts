import chateau from "@data/catalogue-chateaux.json";
import type { Chateau } from "@/types/chateau";

/**
 * Jeu de démonstration pour l'atelier : jusqu'à 2 châteaux de chaque époque,
 * tirés du catalogue réel (data/catalogue-chateaux.json). On privilégie les mieux
 * renseignés (résumé + commanditaire) pour les démos v3 et v4.
 */
const EPOQUES = ["Médiéval", "Renaissance", "Classique", "Éclectique"];

const CATALOG = chateau.chateaux as Chateau[];

const richesse = (c: Chateau) => (c.resume ? 1 : 0) + (c.commanditaire ? 1 : 0);

export const MOCK_CHATEAU: Chateau[] = EPOQUES.flatMap((e) =>
    CATALOG.filter((c) => c.epoque === e)
        .sort((a, b) => richesse(b) - richesse(a))
        .slice(0, 2),
);
