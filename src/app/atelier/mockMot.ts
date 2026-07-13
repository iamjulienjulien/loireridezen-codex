import mot from "@data/mot.json";
import type { Mot } from "@/types/mot";

/**
 * Jeu de démonstration pour l'atelier : 2 mots de chaque catégorie,
 * tirés du catalogue réel (data/mot.json). On privilégie les mieux
 * renseignés (étymologie + exemple) pour la démo v3.
 */
const CATEGORIES = ["relief", "bateau", "ouvrage", "métier", "eau"];

const CATALOG = mot.mots as Mot[];

const richesse = (m: Mot) => (m.etymologie ? 1 : 0) + (m.exemple ? 1 : 0);

export const MOCK_MOT: Mot[] = CATEGORIES.flatMap((c) =>
    CATALOG.filter((m) => m.categorie === c)
        .sort((a, b) => richesse(b) - richesse(a))
        .slice(0, 2),
);
