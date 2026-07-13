import flore from "@data/flore.json";
import type { Flore } from "@/types/flore";

/**
 * Jeu de démonstration pour l'atelier : 2 espèces de chaque catégorie,
 * tirées du catalogue réel (data/flore.json), enrichies de quelques
 * champs détaillés (usages, anecdote) pour la démo de la carte v3.
 */
const CATEGORIES = [
    "arbre",
    "arbuste",
    "herbacée",
    "graminée",
    "aquatique",
    "fougère",
    "grimpante",
];

/** Données enrichies, indexées par nom scientifique. */
const EXTRAS: Record<string, Partial<Flore>> = {
    "Populus nigra": {
        usages: "Bois, digues vivantes",
        anecdote:
            "Emblème des grèves ; le peuplier noir sauvage régresse, dilué par ses hybrides de culture.",
    },
    "Salix alba": {
        usages: "Vannerie, tenue des berges",
        anecdote: "Son écorce, riche en salicine, est l'ancêtre de l'aspirine.",
    },
    "Salix viminalis": {
        usages: "Vannerie",
        anecdote:
            "Ses longues tiges souples sont la matière première des paniers.",
    },
    "Cornus sanguinea": {
        usages: "Haies, nourriture de la faune",
        anecdote: "Ses rameaux rougissent l'hiver ; baies prisées des oiseaux.",
    },
    "Lythrum salicaria": {
        usages: "Mellifère",
        anecdote: "Ses épis pourpres enflamment les berges en plein été.",
    },
    "Filipendula ulmaria": {
        usages: "Médicinale, mellifère",
        anecdote:
            "Parfum d'amande ; elle renferme, elle aussi, un précurseur de l'aspirine.",
    },
    "Phragmites australis": {
        usages: "Chaume, épuration de l'eau",
        anecdote:
            "Bâtit les vastes roselières refuges d'oiseaux ; toiture traditionnelle.",
    },
    "Phalaris arundinacea": {
        usages: "Fixation des berges",
        anecdote:
            "Graminée des rives ; sa forme panachée orne les jardins (« ruban de bergère »).",
    },
    "Nuphar lutea": {
        usages: "Ornemental",
        anecdote:
            "Feuilles flottantes et fleurs jaunes tapissent les boires calmes.",
    },
    "Nymphaea alba": {
        usages: "Ornemental",
        anecdote: "La fleur s'ouvre le jour et se referme le soir sur l'eau.",
    },
    "Pteridium aquilinum": {
        usages: "—",
        anecdote:
            "L'une des plantes les plus répandues au monde ; toxique pour le bétail.",
    },
    "Asplenium scolopendrium": {
        usages: "Ornemental",
        anecdote:
            "Fougère à frondes entières et luisantes des lieux frais et ombragés.",
    },
    "Hedera helix": {
        usages: "Faune, mellifère tardif",
        anecdote:
            "Fleurit à l'automne ; nourrit abeilles et oiseaux hors saison.",
    },
    "Humulus lupulus": {
        usages: "Brasserie",
        anecdote:
            "Liane vigoureuse ; ses cônes aromatisent et conservent la bière.",
    },
};

const CATALOG = flore.flore as Flore[];

export const MOCK_FLORE: Flore[] = CATEGORIES.flatMap((c) =>
    CATALOG.filter((e) => e.categorie === c)
        .slice(0, 2)
        .map((e) => ({ ...e, ...EXTRAS[e.nomScientifique] })),
);
