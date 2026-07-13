import vignoble from "@data/vignoble.json";
import type { Vignoble } from "@/types/vignoble";

/**
 * Jeu de démonstration pour l'atelier : 2 appellations de chaque couleur,
 * tirées du catalogue réel (data/vignoble.json). On privilégie les
 * appellations les mieux renseignées (accord + résumé) pour la démo v3.
 */
const COULEURS = [
    "blanc sec",
    "blanc moelleux",
    "rouge",
    "rosé",
    "effervescent",
];

const CATALOG = vignoble.vignobles as Vignoble[];

const richesse = (v: Vignoble) => (v.accord ? 1 : 0) + (v.resume ? 1 : 0);

export const MOCK_VIGNOBLE: Vignoble[] = COULEURS.flatMap((c) =>
    CATALOG.filter((v) => v.couleur === c)
        .sort((a, b) => richesse(b) - richesse(a))
        .slice(0, 2),
);
