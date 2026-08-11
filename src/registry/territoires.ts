// src/registry/territoires.ts

import type { Territoire } from "@/types/territoire";

/**
 * Registre officiel des territoires ligériens.
 *
 * Source de vérité unique pour :
 * - les chapitres de l’index Châteaux ;
 * - la navigation territoriale ;
 * - la carte interactive ;
 * - l’association des châteaux à leur territoire.
 *
 * Les territoires suivent la Loire d’amont en aval.
 */
export const TERRITOIRES = [
    {
        slug: "nivernais",
        ordre: 1,
        nom: "Nivernais",
        sousTitre: "la Loire sauvage et ducale",
        description:
            "Des terres de Nevers aux portes du Giennois, une Loire encore minérale, boisée et souveraine.",
        presentationMd:
            "Le voyage commence dans une Loire encore **sauvage et minérale**. Autour de Nevers et de La Charité-sur-Loire, le fleuve traverse les anciennes terres ducales du Nivernais, entre villes de pierre, coteaux boisés et vastes horizons.",
        nature: "duché",
        paysage: "val amont",
        reperes: ["Nevers", "La Charité-sur-Loire", "Cosne-Cours-sur-Loire"],
        coursEau: ["Loire", "Nièvre", "Allier"],
        limites: {
            amont: "Nevers",
            aval: "Cosne-Cours-sur-Loire",
            note: "Le territoire ouvre le registre ligérien avant le passage progressif vers le Giennois.",
        },
        identite: {
            mark: "⚓️",
            accent: "#CB2D2A",
            color: "rose-sauvage",
            symboles: [
                "ancre fluviale",
                "tour ducale",
                "ondes de Loire",
                "faïence de Nevers",
            ],
        },
    },
    {
        slug: "orleanais",
        ordre: 2,
        nom: "Orléanais",
        sousTitre: "la Loire royale et fortifiée",
        description:
            "Du Giennois à Beaugency, la Loire des forteresses, des ponts et des grandes portes du royaume.",
        presentationMd:
            "À Gien et Sully-sur-Loire, la pierre garde encore le fleuve. Puis viennent Orléans, Meung et Beaugency : une Loire **royale et fortifiée**, traversée de ponts, de batailles et de passages décisifs.",
        nature: "province",
        paysage: "val royal",
        reperes: [
            "Gien",
            "Sully-sur-Loire",
            "Châteauneuf-sur-Loire",
            "Orléans",
            "Meung-sur-Loire",
            "Beaugency",
        ],
        coursEau: ["Loire", "Loiret"],
        limites: {
            amont: "Gien",
            aval: "Beaugency",
        },
        identite: {
            mark: "👑",
            accent: "#4C83CF",
            color: "bleu",
            symboles: ["fleur de lys", "forteresse", "pont", "onde royale"],
        },
    },
    {
        slug: "blaisois",
        ordre: 3,
        nom: "Blaisois",
        sousTitre: "le domaine des rois et des forêts",
        description:
            "Autour de Blois et de Chambord, les grandes résidences royales s’élèvent au bord des forêts de Sologne.",
        presentationMd:
            "Le Blésois est le territoire des **grands rêves royaux**. Blois domine le fleuve, Chambord surgit des forêts, Cheverny ordonne ses façades et Chaumont veille sur la vallée depuis son éperon.",
        nature: "comté",
        paysage: "val royal",
        reperes: ["Blois", "Chambord", "Cheverny", "Chaumont-sur-Loire"],
        coursEau: ["Loire", "Cosson", "Beuvron"],
        limites: {
            amont: "Muides-sur-Loire",
            aval: "Chaumont-sur-Loire",
        },
        identite: {
            mark: "🏰",
            accent: "#e9c12e",
            color: "miel",
            symboles: ["salamandre", "couronne", "forêt", "tour Renaissance"],
        },
    },
    {
        slug: "touraine",
        ordre: 4,
        nom: "Touraine",
        sousTitre: "le jardin de la Loire",
        description:
            "Le grand pays de la Renaissance, des jardins et des demeures élevées autour de Tours, Amboise et de leurs rivières.",
        presentationMd:
            "En Touraine, les forteresses s’ouvrent, les façades s’ordonnent et les jardins deviennent architecture. Amboise, Chenonceau, Tours, Villandry et Azay-le-Rideau composent le grand **jardin de la Loire**.",
        nature: "province",
        paysage: "val royal",
        reperes: [
            "Amboise",
            "Tours",
            "Chenonceaux",
            "Villandry",
            "Azay-le-Rideau",
            "Langeais",
        ],
        coursEau: ["Loire", "Cher", "Indre"],
        limites: {
            amont: "Amboise",
            aval: "Langeais",
        },
        identite: {
            mark: "🌿",
            accent: "#e2dfd4",
            color: "vert",
            symboles: [
                "jardin géométrique",
                "tour blanche",
                "pont de pierre",
                "fleur Renaissance",
            ],
        },
    },
    {
        slug: "chinonais",
        ordre: 5,
        nom: "Chinonais",
        sousTitre: "la Loire des forteresses et des confins",
        description:
            "Autour de Chinon et de la Vienne, un territoire plus médiéval, minéral et frontalier.",
        presentationMd:
            "À l’ouest de la Touraine, le paysage se resserre autour des coteaux et des forteresses. Chinon domine la Vienne, Ussé ouvre la lisière et Candes-Saint-Martin annonce déjà les terres angevines.",
        nature: "pays historique",
        paysage: "val occidental",
        reperes: ["Chinon", "Rigny-Ussé", "Le Rivau", "Candes-Saint-Martin"],
        coursEau: ["Vienne", "Loire", "Indre"],
        limites: {
            amont: "Langeais",
            aval: "Candes-Saint-Martin",
            note: "Le Chinonais forme un chapitre distinct de la Touraine centrale par son caractère médiéval et frontalier.",
        },
        identite: {
            mark: "⚔️",
            accent: "#df3a20",
            color: "corail",
            symboles: [
                "forteresse sur éperon",
                "épée",
                "mur crénelé",
                "confluence",
            ],
        },
    },
    {
        slug: "saumurois",
        ordre: 6,
        nom: "Saumurois",
        sousTitre: "le pays du tuffeau et des caves",
        description:
            "De Montsoreau à Saumur et Montreuil-Bellay, les châteaux blancs, les vignes et les caves creusent le coteau.",
        presentationMd:
            "Le Saumurois naît dans la lumière du **tuffeau**. Montsoreau touche presque le fleuve, Saumur le domine, Brézé s’enfonce sous terre et les vignes prolongent les châteaux jusque dans les caves.",
        nature: "pays historique",
        paysage: "val occidental",
        reperes: ["Montsoreau", "Saumur", "Brézé", "Montreuil-Bellay"],
        coursEau: ["Loire", "Thouet"],
        limites: {
            amont: "Montsoreau",
            aval: "Gennes-Val-de-Loire",
        },
        identite: {
            mark: "🍇",
            accent: "#d0ab67",
            color: "miel",
            symboles: [
                "cheval",
                "grappe",
                "front de tuffeau",
                "cave troglodytique",
            ],
        },
    },
    {
        slug: "anjou",
        ordre: 7,
        nom: "Anjou",
        sousTitre: "la douceur entre ardoise et confluences",
        description:
            "Des coteaux saumurois à Ancenis, le pays des forteresses d’ardoise, des confluences et de la douceur angevine.",
        presentationMd:
            "L’Anjou mêle la lumière du tuffeau à la profondeur de l’ardoise. Angers rassemble les eaux, les forteresses deviennent demeures et, jusqu’à Liré et Ancenis, demeure cette fameuse **douceur angevine**.",
        nature: "duché",
        paysage: "val occidental",
        reperes: [
            "Angers",
            "Brissac",
            "Béhuard",
            "Serrant",
            "Champtoceaux",
            "Liré",
            "Ancenis",
        ],
        coursEau: ["Loire", "Maine", "Mayenne", "Sarthe", "Loir"],
        limites: {
            amont: "Gennes-Val-de-Loire",
            aval: "Ancenis",
            note: "Le pont d’Ancenis matérialise la frontière historique entre l’Anjou, au sud, et la Bretagne, au nord.",
        },
        identite: {
            mark: "⚜️",
            accent: "#2835CA",
            color: "bleu-loire",
            symboles: [
                "forteresse d’ardoise",
                "clef",
                "confluence",
                "fleur angevine",
            ],
        },
    },
    {
        slug: "bretagne-ligerienne",
        ordre: 8,
        nom: "Bretagne ligérienne",
        sousTitre: "là où la Loire devient bretonne",
        description:
            "D’Ancenis à l’Atlantique, Nantes, les châteaux du vignoble et les paysages de l’estuaire composent le dernier chapitre du fil.",
        presentationMd:
            "Au-delà du pont d’Ancenis, la Loire entre en Bretagne. Le fleuve traverse Nantes, longe les terres du vignoble et s’élargit peu à peu jusqu’à devenir estuaire. Ici, la Loire devient **bretonne avant de devenir océan**.",
        nature: "territoire éditorial",
        paysage: "estuaire",
        reperes: [
            "Ancenis",
            "Oudon",
            "Clisson",
            "Goulaine",
            "Nantes",
            "Saint-Nazaire",
        ],
        coursEau: ["Loire", "Erdre", "Sèvre Nantaise"],
        limites: {
            amont: "Ancenis",
            aval: "Saint-Nazaire",
            note: "Le nom affirme l’appartenance historique et culturelle de Nantes à la Bretagne tout en rattachant ce chapitre au récit ligérien.",
        },
        identite: {
            mark: "🐚",
            accent: "#e5dfd0",
            color: "gris",
            symboles: ["hermine", "nef", "tour nantaise", "vague atlantique"],
        },
    },
] as const satisfies readonly Territoire[];

export type TerritoireEntry = (typeof TERRITOIRES)[number];

export type TerritoireSlug = TerritoireEntry["slug"];

export const getTerritoire = (slug: string): TerritoireEntry | undefined =>
    TERRITOIRES.find((territoire) => territoire.slug === slug);

export const isTerritoireSlug = (value: string): value is TerritoireSlug =>
    TERRITOIRES.some((territoire) => territoire.slug === value);
