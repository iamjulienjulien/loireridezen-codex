// src/registry/categories-personnages.ts

import type { CategoriePersonnage } from "@/types/personnage";

/**
 * Registre officiel des catégories de personnages du Codex.
 *
 * Source de vérité unique pour :
 * - le classement de l’annexe Personnages ;
 * - les filtres et regroupements éditoriaux ;
 * - les libellés, descriptions et identités visuelles ;
 * - l’interprétation de `categoriePrincipale` dans le catalogue.
 *
 * Les slugs doivent correspondre exactement aux catégories présentes
 * dans `catalogue-personnages.json`.
 */
export const CATEGORIES_PERSONNAGES = [
    {
        slug: "souverain",
        ordre: 1,
        nom: "Souverains et souveraines",
        sousTitre: "la Loire au cœur du pouvoir",
        description:
            "Rois, reines, régentes et chefs de dynastie qui ont fait des châteaux ligériens des lieux de gouvernement, de résidence et de mémoire.",
        presentationMd:
            "Des forteresses médiévales aux résidences de la Renaissance, les souverains font de la Loire un **pays de cour et de pouvoir**.",
        famille: "Pouvoir et dynasties",
        identite: {
            mark: "👑",
            accent: "#C99A2E",
            color: "or",
        },
    },
    {
        slug: "prince",
        ordre: 2,
        nom: "Princes et princesses",
        sousTitre: "les héritiers et les grandes maisons",
        description:
            "Figures princières, ducales ou apanagées dont les alliances, résidences et ambitions ont modelé le Val de Loire.",
        presentationMd:
            "À côté du trône, les princes et princesses tissent les **alliances familiales et territoriales** qui donnent aux châteaux leur histoire.",
        famille: "Pouvoir et dynasties",
        identite: {
            mark: "⚜️",
            accent: "#395AA6",
            color: "bleu royal",
        },
    },
    {
        slug: "noble",
        ordre: 3,
        nom: "Nobles et grandes familles",
        sousTitre: "propriétaires, lignages et demeures",
        description:
            "Seigneurs, dames et familles dont les domaines traversent les siècles, entre fidélité au pouvoir, patrimoine et vie locale.",
        presentationMd:
            "Les grands lignages font des châteaux des lieux de **transmission, d’influence et de mémoire familiale**.",
        famille: "Pouvoir et dynasties",
        identite: {
            mark: "🛡️",
            accent: "#7D4D35",
            color: "terre cuite",
        },
    },
    {
        slug: "homme-etat",
        ordre: 4,
        nom: "Femmes et hommes d’État",
        sousTitre: "conseiller, négocier, gouverner",
        description:
            "Ministres, diplomates, administrateurs et grandes figures politiques associées aux châteaux et aux décisions du royaume.",
        presentationMd:
            "La Loire accueille aussi les lieux où se préparent les **traités, réformes et équilibres du pouvoir**.",
        famille: "Pouvoir et dynasties",
        identite: {
            mark: "📜",
            accent: "#596E78",
            color: "ardoise",
        },
    },
    {
        slug: "militaire",
        ordre: 5,
        nom: "Militaires et stratèges",
        sousTitre: "défendre, conquérir, fortifier",
        description:
            "Capitaines, chefs de guerre et ingénieurs militaires liés aux sièges, aux forteresses et aux grands tournants du royaume.",
        presentationMd:
            "Derrière les remparts et les éperons rocheux, les militaires racontent une Loire de **frontières et de stratégies**.",
        famille: "Pouvoir et dynasties",
        identite: {
            mark: "⚔️",
            accent: "#B8473C",
            color: "rouge",
        },
    },
    {
        slug: "batisseur",
        ordre: 6,
        nom: "Bâtisseurs et bâtisseuses",
        sousTitre: "ceux qui donnent forme aux lieux",
        description:
            "Architectes, maîtres d’œuvre et initiateurs de grands chantiers qui transforment forteresses, logis, jardins et domaines.",
        presentationMd:
            "Pierre, brique, tuffeau et charpente : les bâtisseurs donnent aux paysages ligériens leur **silhouette durable**.",
        famille: "Créateurs et bâtisseurs",
        identite: {
            mark: "🏗️",
            accent: "#B06E3A",
            color: "ocre",
        },
    },
    {
        slug: "mecene",
        ordre: 7,
        nom: "Mécènes",
        sousTitre: "faire vivre les arts et les domaines",
        description:
            "Protecteurs des arts, collectionneurs éclairés et propriétaires qui ont soutenu la création, les jardins ou la restauration des lieux.",
        presentationMd:
            "Le mécénat transforme les châteaux en lieux de **création, de collection et de partage**.",
        famille: "Créateurs et bâtisseurs",
        identite: {
            mark: "🎨",
            accent: "#8968A8",
            color: "violet",
        },
    },
    {
        slug: "artiste",
        ordre: 8,
        nom: "Artistes",
        sousTitre: "imaginer, créer, émerveiller",
        description:
            "Peintres, musiciens, comédiens et créateurs dont les œuvres ou les séjours éclairent l’histoire des châteaux.",
        presentationMd:
            "Les artistes font des domaines ligériens des scènes, des ateliers et des sources d’**invention sensible**.",
        famille: "Arts, lettres et idées",
        identite: {
            mark: "🖌️",
            accent: "#A6537C",
            color: "rose",
        },
    },
    {
        slug: "ecrivain",
        ordre: 9,
        nom: "Écrivains et écrivaines",
        sousTitre: "la Loire racontée",
        description:
            "Poètes, romanciers, dramaturges et conteurs qui ont vécu, écrit ou puisé leur inspiration dans les paysages et les châteaux.",
        presentationMd:
            "Dans les livres, les châteaux deviennent décors, souvenirs et légendes : une Loire **écrite autant que parcourue**.",
        famille: "Arts, lettres et idées",
        identite: {
            mark: "✒️",
            accent: "#4D6654",
            color: "vert encre",
        },
    },
    {
        slug: "scientifique",
        ordre: 10,
        nom: "Savants et savantes",
        sousTitre: "observer, inventer, transmettre",
        description:
            "Scientifiques, ingénieurs et esprits curieux dont les recherches ou inventions prolongent l’imaginaire de la Loire.",
        presentationMd:
            "Les domaines accueillent aussi la **curiosité scientifique**, entre observation, dessin, mécanique et invention.",
        famille: "Arts, lettres et idées",
        identite: {
            mark: "🔭",
            accent: "#3B779D",
            color: "azur",
        },
    },
    {
        slug: "courtisan",
        ordre: 11,
        nom: "Courtisans et courtisanes",
        sousTitre: "la vie de cour au château",
        description:
            "Proches du pouvoir, favorites et figures de cour dont la présence révèle l’intimité des résidences royales.",
        presentationMd:
            "À l’ombre des grands souverains, la cour compose un monde de **présences, d’influences et de confidences**.",
        famille: "Figures singulières",
        identite: {
            mark: "🌹",
            accent: "#B94B61",
            color: "rose profond",
        },
    },
    {
        slug: "religieux",
        ordre: 12,
        nom: "Figures religieuses",
        sousTitre: "foi, refuge et autorité spirituelle",
        description:
            "Évêques, abbés et autres figures spirituelles liées aux résidences épiscopales, aux lieux de mémoire ou aux grands événements religieux.",
        presentationMd:
            "Entre chapelles, collégiales et palais épiscopaux, la foi inscrit les châteaux dans une autre histoire du **pouvoir spirituel**.",
        famille: "Figures singulières",
        identite: {
            mark: "⛪",
            accent: "#735D99",
            color: "pourpre",
        },
    },
    {
        slug: "marchand",
        ordre: 13,
        nom: "Marchands et entrepreneurs",
        sousTitre: "la fortune au service des demeures",
        description:
            "Financiers, négociants et entrepreneurs dont la réussite permet l’acquisition, la construction ou la transformation d’un domaine.",
        presentationMd:
            "Le commerce et la finance font parfois naître les châteaux les plus audacieux, entre **ambition sociale et goût artistique**.",
        famille: "Figures singulières",
        identite: {
            mark: "⚖️",
            accent: "#92723E",
            color: "bronze",
        },
    },
    {
        slug: "collectionneur",
        ordre: 14,
        nom: "Collectionneurs et collectionneuses",
        sousTitre: "conserver et faire dialoguer les œuvres",
        description:
            "Amateurs et fondatrices de collections qui font des châteaux des lieux d’art, de transmission et de regard contemporain.",
        presentationMd:
            "Une collection peut redonner au château une présence contemporaine et en faire un **lieu d’exposition vivant**.",
        famille: "Figures singulières",
        identite: {
            mark: "🖼️",
            accent: "#3D7A77",
            color: "vert profond",
        },
    },
    {
        slug: "soignant",
        ordre: 15,
        nom: "Soignants et soignantes",
        sousTitre: "accueillir et protéger",
        description:
            "Figures associées aux usages de soin, d’hospitalité ou de protection qui ont ponctuellement transformé un château en lieu de secours.",
        presentationMd:
            "Certains châteaux connaissent une histoire discrète de **soin et de solidarité**, notamment lors des conflits.",
        famille: "Figures singulières",
        identite: {
            mark: "✚",
            accent: "#B34B4B",
            color: "rouge soin",
        },
    },
    {
        slug: "muse",
        ordre: 16,
        nom: "Muses et inspiratrices",
        sousTitre: "au cœur des récits et des œuvres",
        description:
            "Figures dont la présence, la mémoire ou la relation à un lieu ont inspiré des œuvres littéraires, artistiques ou légendaires.",
        presentationMd:
            "Parfois, une rencontre suffit pour que le château entre dans l’histoire d’un poème, d’un roman ou d’une **mémoire amoureuse**.",
        famille: "Figures singulières",
        identite: {
            mark: "✨",
            accent: "#C77C9A",
            color: "lilas",
        },
    },
] as const satisfies readonly CategoriePersonnage[];

export type CategoriePersonnageEntry = (typeof CATEGORIES_PERSONNAGES)[number];

export type CategoriePersonnageSlug = CategoriePersonnageEntry["slug"];

export const getCategoriePersonnage = (
    slug: string,
): CategoriePersonnageEntry | undefined =>
    CATEGORIES_PERSONNAGES.find((categorie) => categorie.slug === slug);

export const isCategoriePersonnageSlug = (
    value: string,
): value is CategoriePersonnageSlug =>
    CATEGORIES_PERSONNAGES.some((categorie) => categorie.slug === value);
