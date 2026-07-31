/**
 * Registre des index du Codex ligérien.
 * Source de vérité unique : navigation (PageHeader), cartes d'accueil
 * (app/page.tsx), présentation et footer de chaque page.
 * Données pures — importable côté serveur comme client.
 */

import { LRZColor } from "@/types/lrz";

export type Env = "development" | "production";
export type IndexEtat = "publie" | "relecture" | "brouillon";

export interface IndexEntry {
    /** Clé stable, sans slash. */
    slug: string;
    /** Chemin de la route. */
    href: string;
    /** Emoji identitaire. */
    mark: string;
    /** Libellé court (navigation). */
    label: string;
    /** Surtitre de la carte d'accueil. */
    eyebrow: string;
    /** Titre de la page / de la carte. */
    title: string;
    /** Description de la carte d'accueil. */
    description: string;
    /** Couleur d'accent de la section. */
    accent: string;
    color: LRZColor;
    /** Texte d'introduction (lede) affiché en tête de page. */
    presentation?: string;
    /** Même texte au format Markdown (paragraphes séparés). */
    presentation_md: string;
    presentationFooter: string;
    /** Fin de la 2ᵉ ligne du footer, après le décompte. */
    footerNote: string;
    /** Fichier de données associé, dans /data. */
    dataFile: string;
    /** État éditorial en vue de la publication par l'API. */
    etat: IndexEtat;
    env: Env[];
}

export const INDEXES = [
    {
        slug: "chateaux",
        href: "/chateaux",
        mark: "🏰",
        label: "Châteaux",
        eyebrow: "Index",
        title: "Châteaux de la Loire",
        description:
            "Des donjons aux jardins, le pouvoir change de visage au fil de la Loire.",
        accent: "#b5883c",
        color: "ocre",
        presentation_md:
            "À l\’amont, la pierre garde le souvenir des sièges, des frontières et des couronnes disputées. **Loches** dresse son donjon roman, **Chinon** veille sur la Vienne et **Angers** aligne ses dix-sept tours de schiste.\n\nPuis les murailles s\’ouvrent. Sous les rois de la Renaissance, le château devient demeure, théâtre et manifeste. **Chambord** invente un rêve de pierre, **Chenonceau** traverse le Cher et **Blois** rassemble plusieurs siècles dans une même cour.\n\nEnfin, le pouvoir apprivoise le paysage. À **Villandry**, les jardins deviennent architecture. Partout ailleurs, terrasses, perspectives et domaines prolongent les châteaux jusque dans le val.",
        presentationFooter:
            "**Cet index rassemble les forteresses, palais et demeures qui jalonnent le fil ligérien, du château confidentiel au monument-phare. Chaque lieu est raconté par son époque, son architecture, son paysage et les personnages qui l’ont façonné.**",
        footerNote: "châteaux composant le patrimoine castral ligérien",
        dataFile: "chateau.json",
        etat: "publie",
        env: ["development", "production"],
    },
    {
        slug: "faune",
        href: "/faune",
        mark: "🪶",
        label: "Faune",
        eyebrow: "Index",
        title: "Faune ligérienne",
        description:
            "Ce qui verdit le fil, du saule des grèves à l’angélique de l’estuaire.",
        accent: "#4f86c6",
        color: "eau",
        presentation:
            "Le fil ne traverse pas un décor : il longe un fleuve vivant. Voici ce qu'on peut croiser en chemin, de la source à l'Atlantique — du plus commun au plus rare, du grand jour à la pleine nuit.",
        presentation_md:
            "Le fil ne traverse pas un décor : il longe le **dernier grand fleuve sauvage d'Europe** 🌊. L'eau y décide de tout — elle creuse les berges, découvre les grèves, et redessine chaque année les bancs de sable où la vie s'installe.\n\nOn y croise l'**ordinaire** comme le **trésor** : le héron figé sur la levée 🪶, la sterne qui plonge sur le sable nu, et — pour qui sait attendre — la loutre à l'aube 🦦 ou la cigogne noire en lisière 🐦‍⬛.\n\nDu plus commun au plus rare, du grand jour à la pleine nuit. 🌒",
        presentationFooter: "",
        footerNote: "espèces composant le bestiaire ligérien",
        dataFile: "faune.json",
        etat: "publie",
        env: ["development", "production"],
    },
    {
        slug: "flore",
        href: "/flore",
        mark: "🌿",
        label: "Flore",
        eyebrow: "Index",
        title: "Flore ligérienne",
        description:
            "Ce qui verdit le fil, du saule des grèves à l’angélique de l’estuaire.",
        accent: "#4fa25c",
        color: "prairie",
        presentation:
            "La Loire fait pousser autant qu'elle emporte. Du peuplier de la grève à l'endémique de l'estuaire, voici ce qui verdit le fil — l'indigène, le rare, et l'intrus qui gagne du terrain.",
        presentation_md:
            "La Loire fait pousser autant qu'elle emporte 🌊. Sur ses grèves mouvantes s'accroche une **forêt d'eau** — saules et peupliers noirs qui plient sans rompre et refont racine à chaque crue.\n\nDu pied de la levée au sel de l'estuaire, le fil mêle l'**indigène**, le **rare** et l'**intrus** : la fritillaire pintade 🌸 dans la prairie inondée, l'**angélique des estuaires** 🌿 qu'on ne trouve nulle part ailleurs au monde, et la renouée qui, elle, gagne du terrain saison après saison.\n\nCe qui verdit le fil ne tient jamais en place : il dérive, colonise, s'efface.",
        presentationFooter: "",
        footerNote: "espèces composant l'herbier ligérien",
        dataFile: "flore.json",
        etat: "publie",
        env: ["development", "production"],
    },
    {
        slug: "guinguettes",
        href: "/guinguettes",
        mark: "🍷",
        label: "Guinguettes",
        eyebrow: "Index",
        title: "Guinguettes de Loire",
        description:
            "Là où la Loire ralentit, les tables s’installent, les verres tintent et les soirées s’étirent.",
        accent: "#c46a4b",
        color: "brique",
        presentation_md:
            "Nées au bord des rivières, les guinguettes ont longtemps été des refuges de liberté. On y venait danser, partager un repas simple ou regarder passer les bateaux, loin du rythme des villes.\n\nLe long de la Loire, chacune raconte une manière différente d’habiter le fleuve. Certaines vivent au pied d’un château, d’autres s’abritent sous les peupliers ou s’ouvrent directement sur les bancs de sable. Toutes cultivent une même idée : prendre le temps.\n\nAujourd’hui encore, elles prolongent cette tradition. Cuisine locale, concerts, couchers de soleil, rencontres et départs à vélo s’y croisent naturellement. Elles sont devenues des haltes autant que des destinations.",
        presentationFooter:
            "**Cet index rassemble les guinguettes qui rythment les rives ligériennes. Chaque adresse est présentée à travers son cadre, son ambiance, sa cuisine, ses animations et son lien avec le fleuve.**",
        footerNote: "guinguettes et haltes conviviales du Val de Loire",
        dataFile: "guinguettes.json",
        etat: "publie",
        env: ["development"],
    },
    {
        slug: "vignobles",
        href: "/vignobles",
        mark: "🍷",
        label: "Vignobles",
        eyebrow: "Index",
        title: "Vignobles ligériens",
        description:
            "Les appellations du fil, du grand cru liquoreux au cru communal.",
        accent: "#9c3f52",
        color: "rouge",
        presentation:
            "Le fil se boit autant qu'il se longe. Des coteaux du Forez au melon de l'embouchure, voici les appellations qui jalonnent la Loire — du grand cru liquoreux au cru communal le plus discret.",
        presentation_md:
            "Le fil se boit autant qu'il se longe 🍷. D'amont en aval, **un même fleuve, cinq accents** : le silex de Sancerre, le chenin caméléon de Vouvray, le cabernet franc sur tuffeau de Chinon 🍇.\n\nPuis l'Anjou joue **l'or** : la Coulée de Serrant et ses sept hectares de monopole, le liquoreux du Layon, les Quarts de Chaume — **seul Grand Cru de la Loire**.\n\nEt tout finit dans le sel : le melon de Bourgogne du Muscadet 🌊, dernière gorgée avant l'Atlantique.",
        presentationFooter: "",
        footerNote:
            "appellations du fil · les émojis attendent leur version LRZ",
        dataFile: "vignoble.json",
        etat: "relecture",
        env: [],
    },
    {
        slug: "vocabulaire",
        href: "/vocabulaire",
        mark: "⚓️",
        label: "Vocabulaire",
        eyebrow: "Lexique",
        title: "Vocabulaire du fleuve",
        description:
            "La mémoire déposée dans les mots, du terme vivant au mot oublié.",
        accent: "#4a7c8c",
        color: "bleu-turquoise",
        presentation:
            "Un fleuve laisse sa mémoire dans les mots avant de la laisser dans les pierres. Voici le lexique de la Loire — du mot encore vivant à celui qui ne survit plus que dans les livres.",
        presentation_md:
            "Un fleuve laisse sa mémoire dans les mots avant de la laisser dans les pierres 📖. La Loire a la sienne : ici, on ne dit pas un bras mort mais une **boire**, pas une berge de sable mais une **grève**.\n\nPuis vient le peuple de la **marine de Loire** ⚓️ — le chaland, la toue cabanée du pêcheur, le fûtreau, plus petit des ligériens — et ses métiers effacés : marinier, sablier, passeur du bac.\n\nCertains mots vivent encore, d'autres ne survivent plus que dans les livres : le **mascaret** qui remonte l'estuaire 🌊, la débâcle des glaces, l'art d'avaler — descendre au fil du courant.",
        presentationFooter: "",
        footerNote: "mots du fil · la mémoire déposée dans les mots",
        dataFile: "mot.json",
        etat: "relecture",
        env: [],
    },
    {
        slug: "patrimoine",
        href: "/patrimoine",
        mark: "🏛",
        label: "Patrimoine",
        eyebrow: "Index",
        title: "Petit patrimoine du fil",
        description:
            "Le fleuve-travail : ponts, cales, fours à chaux et moulins de la Loire.",
        accent: "#8a7256",
        color: "fauve",
        presentation:
            "Face au fil royal des châteaux, voici le fleuve-travail : ce que l'homme a bâti pour vivre AVEC la Loire. Ponts, cales, fours à chaux, moulins — debout, restaurés, en vestige, ou disparus.",
        presentation_md:
            "Face au fil royal des châteaux, voici le **fleuve-travail** 🏛 : non plus ce qui dominait la Loire, mais ce qui vivait AVEC elle. La pierre y a les mains sales — celles des mariniers, des chaufourniers, des sabliers.\n\nOn y lit un fleuve **outil** : le pont médiéval de Beaugency et son arche marinière 🌉, la rivière de fer du pont-canal de Briare, les fours à chaux de Montjean-la-blanche 🏭, les cales pavées où accostaient les chalands ⚓️.\n\nDebout, restauré, en vestige ou **disparu** : du chevalement minier au bateau-moulin qui n'existe plus que dans les livres.",
        presentationFooter: "",
        footerNote:
            "ouvrages du fleuve-travail · les émojis attendent leur version LRZ",
        dataFile: "patrimoine.json",
        etat: "relecture",
        env: [],
    },
] as const satisfies readonly IndexEntry[];

export type IndexSlug = (typeof INDEXES)[number]["slug"];
export type IndexHref = (typeof INDEXES)[number]["href"];

export const getIndex = (href: string): IndexEntry | undefined =>
    INDEXES.find((i) => i.href === href);

export const getIndexBySlug = (slug: string): IndexEntry | undefined =>
    INDEXES.find((i) => i.slug === slug);

export const isEnv = (value: string | undefined): value is Env =>
    value === "development" || value === "production";

export const getIndexesForEnv = (value: string | undefined) => {
    if (!isEnv(value)) {
        throw new Error(`CURRENT_ENV invalide ou absent : ${value}`);
    }

    return INDEXES.filter((index) =>
        index.env.some((environment) => environment === value),
    );
};
