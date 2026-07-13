import faune from "@data/faune.json";
import type { FauneEspece, FauneType } from "@/types/faune";

/**
 * Jeu de démonstration pour l'atelier : 2 espèces de chaque type,
 * tirées du catalogue réel (data/faune.json), enrichies de quelques
 * champs détaillés (taille, poids, longévité, régime, anecdote) pour
 * la démo de la carte v3.
 */
const TYPES: FauneType[] = [
    "oiseau",
    "mammifère",
    "poisson",
    "reptile",
    "amphibien",
    "insecte",
];

/** Données enrichies, indexées par nom scientifique. */
const EXTRAS: Record<string, Partial<FauneEspece>> = {
    "Ardea cinerea": {
        taille: "90–98 cm",
        poids: "1,5–2 kg",
        longevite: "jusqu'à 25 ans",
        regime: "Poissons, amphibiens, petits mammifères",
        anecdote: "Chasse à l'affût, immobile des heures au bord de l'eau.",
    },
    "Ardea alba": {
        taille: "85–100 cm",
        poids: "1–1,5 kg",
        longevite: "~15 ans",
        regime: "Poissons, insectes, amphibiens",
        anecdote:
            "En plumage nuptial, de longues plumes ornementales — les « aigrettes ».",
    },
    "Myocastor coypus": {
        taille: "40–60 cm (+ queue)",
        poids: "5–9 kg",
        longevite: "~6 ans",
        regime: "Herbivore (végétation aquatique)",
        anecdote:
            "Introduit d'Amérique du Sud pour sa fourrure ; incisives orange vif.",
    },
    "Capreolus capreolus": {
        taille: "95–135 cm",
        poids: "20–30 kg",
        longevite: "~10 ans",
        regime: "Herbivore (feuilles, bourgeons, ronces)",
        anecdote: "Le brocard (mâle) refait ses bois chaque année.",
    },
    "Esox lucius": {
        taille: "40–100 cm",
        poids: "1–10 kg",
        longevite: "~15 ans",
        regime: "Carnassier (poissons)",
        anecdote: "Prédateur embusqué dans les herbiers ; fraie dès février.",
    },
    "Silurus glanis": {
        taille: "1–2,5 m",
        poids: "jusqu'à 100 kg",
        longevite: "~30 ans",
        regime: "Carnassier opportuniste",
        anecdote: "Plus grand poisson d'eau douce de Loire ; introduit.",
    },
    "Podarcis muralis": {
        taille: "17–20 cm",
        poids: "~5 g",
        longevite: "~5 ans",
        regime: "Insectivore",
        anecdote:
            "Peut abandonner sa queue (autotomie) pour fuir un prédateur.",
    },
    "Natrix helvetica": {
        taille: "70–120 cm",
        longevite: "~15 ans",
        regime: "Amphibiens, poissons",
        anecdote:
            "Non venimeuse ; simule la mort et libère une sécrétion malodorante.",
    },
    "Pelophylax ridibundus": {
        taille: "6–12 cm",
        longevite: "~10 ans",
        regime: "Insectes, invertébrés, petites proies",
        anecdote: "Son coassement sonore « rit » aux beaux soirs d'été.",
    },
    "Hyla arborea": {
        taille: "3–5 cm",
        longevite: "~10 ans",
        regime: "Insectes",
        anecdote:
            "Grimpe grâce à ses ventouses ; change de teinte selon le support.",
        customEmoji: "/emoji/faune/rainette-verte2.png",
        rectEmoji: true,
    },
    "Calopteryx splendens": {
        taille: "4,5–5 cm",
        longevite: "quelques semaines (adulte)",
        regime: "Petits insectes",
        anecdote:
            "Le mâle, bleu métallique, parade en vol au-dessus de l'eau courante.",
    },
    "Anax imperator": {
        taille: "6,5–8 cm (env. ~10 cm)",
        longevite: "quelques semaines (adulte)",
        regime: "Insectes capturés en vol",
        anecdote:
            "L'une des plus grandes libellules d'Europe ; chasse en patrouille.",
    },
};

const CATALOG = faune.especes as FauneEspece[];

export const MOCK_FAUNE: FauneEspece[] = TYPES.flatMap((t) =>
    CATALOG.filter((e) => e.type === t)
        .slice(0, 2)
        .map((e) => ({ ...e, ...EXTRAS[e.nomScientifique] })),
);
