/**
 * Registre des index du Codex ligérien.
 * Source de vérité unique : navigation (PageHeader), cartes d'accueil
 * (app/page.tsx), présentation et footer de chaque page.
 * Données pures — importable côté serveur comme client.
 */

import { LRZColor } from "@/types/lrz";

export type Env = "development" | "production";
export type IndexEtat = "publie" | "relecture" | "brouillon";
export type IndexUniverse = "habite" | "vivant" | "raconte";
export type IndexFormat =
    "catalogue" | "naturaliste" | "repertoire" | "lexique";

export const INDEX_UNIVERSES = [
    { slug: "habite", title: "Le fleuve habité" },
    { slug: "vivant", title: "Le fleuve vivant" },
    { slug: "raconte", title: "Le fleuve raconté" },
] as const satisfies readonly {
    slug: IndexUniverse;
    title: string;
}[];

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
    /** Univers éditorial utilisé pour regrouper les index sur l'accueil. */
    universe: IndexUniverse;
    /** Format de consultation et de présentation de l'index. */
    format: IndexFormat;
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
        universe: "habite",
        format: "catalogue",
        accent: "#b5883c",
        color: "ocre",
        presentation_md:
            "À l\’amont, la pierre garde le souvenir des sièges, des frontières et des couronnes disputées. **Loches** dresse son donjon roman, **Chinon** veille sur la Vienne et **Angers** aligne ses dix-sept tours de schiste.\n\nPuis les murailles s\’ouvrent. Sous les rois de la Renaissance, le château devient demeure, théâtre et manifeste. **Chambord** invente un rêve de pierre, **Chenonceau** traverse le Cher et **Blois** rassemble plusieurs siècles dans une même cour.\n\nEnfin, le pouvoir apprivoise le paysage. À **Villandry**, les jardins deviennent architecture. Partout ailleurs, terrasses, perspectives et domaines prolongent les châteaux jusque dans le val.",
        presentationFooter:
            "**Cet index rassemble les forteresses, palais et demeures du fil ligérien, du château confidentiel au monument-phare. Chaque fiche raconte son époque, son architecture, son paysage et les personnages qui l’ont façonnée.**",
        footerNote: "châteaux composant le patrimoine castral ligérien",
        dataFile: "catalogue-chateaux.json",
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
        universe: "vivant",
        format: "naturaliste",
        accent: "#4f86c6",
        color: "eau",
        presentation:
            "Le fil ne traverse pas un décor : il longe un fleuve vivant. Voici ce qu'on peut croiser en chemin, de la source à l'Atlantique — du plus commun au plus rare, du grand jour à la pleine nuit.",
        presentation_md:
            "À l’amont, les grèves et les bras morts accueillent une vie discrète, modelée par les crues et les bancs de sable. Le **Héron cendré** attend dans les eaux calmes, le **Martin-pêcheur d’Europe** file au ras des berges et le **Chevalier guignette** suit le mouvement du fleuve sur les vasières.\n\nPuis les rives s’épaississent. Dans les boisements, les prairies et les îles, le **Castor d’Europe** façonne les berges, la **Loutre d’Europe** suit les chenaux et le **Chevreuil** traverse les lisières. À leurs côtés, oiseaux, insectes et petits mammifères composent une faune qui change avec chaque paysage.\n\nEnfin, la Loire devient passage. Le **Saumon atlantique**, la **Grande alose** et la **Lamproie marine** remontent le fil, tandis que le **Cuivré des marais** rappelle la fragilité des prairies humides. Du plus commun au plus rare, chaque espèce raconte une manière d’habiter le fleuve.",
        presentationFooter:
            "**Cet index rassemble les espèces animales qui vivent, passent ou se cachent le long du fil ligérien. Chaque fiche est racontée par son milieu, ses habitudes, sa présence saisonnière et les liens qui l’unissent au fleuve.**",
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
        universe: "vivant",
        format: "naturaliste",
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
            "Des tablées aux concerts, la fête change de rythme au fil de la Loire.",
        universe: "habite",
        format: "catalogue",
        accent: "#c46a4b",
        color: "brique",
        presentation_md:
            "À l’amont, les guinguettes s’installent dans les ports, les parcs et les prairies où le fleuve ralentit. **La Chapelloise** ouvre le bal près d’Orléans, tandis que **Le Ponton** et **La Guinguette du Domino** prolongent les beaux jours entre tables au bord de l’eau et airs de fête.\n\nPuis les rives s’ouvrent. **La Guinguette Ligaya** accompagne les coteaux de Montlouis, **Guinguette du Bord de Vienne** regarde arriver la Vienne et **Guinguette La Gabare** fait de la confluence un décor de retrouvailles. Chaque adresse compose sa propre manière d’habiter le paysage ligérien.\n\nEnfin, la Loire devient scène. De **La Dérive** à **Le Gramophone**, jusqu’à **L’Atypik Guinguette**, les tablées s’animent au fil des concerts, des couchers de soleil et des rencontres. La fête change de rythme, mais garde le même goût du fleuve.",
        presentationFooter:
            "**Cet index rassemble les guinguettes qui animent les rives ligériennes, des haltes discrètes aux rendez-vous les plus festifs. Chaque adresse raconte son cadre, sa cuisine, sa musique et le paysage qui l’entoure.**",
        footerNote: "guinguettes et haltes conviviales du Val de Loire",
        dataFile: "guinguettes.json",
        etat: "relecture",
        env: ["development", "production"],
    },
    {
        slug: "territoires",
        href: "/territoires",
        mark: "🗺️",
        label: "Territoires",
        eyebrow: "Index",
        title: "Territoires ligériens",
        description:
            "Du Nivernais à l’estuaire, la Loire change de paysage et d’accent.",
        universe: "raconte",
        format: "catalogue",
        accent: "#8a7256",
        color: "fauve",
        presentation:
            "La Loire n’a pas un seul visage. Du Nivernais à l’estuaire, elle traverse huit territoires géohistoriques façonnés par leurs paysages, leurs villes, leurs héritages et leurs cours d’eau.",
        presentation_md:
            "La Loire n’a pas un seul visage. Du **Nivernais** à l’**estuaire**, elle traverse huit territoires géohistoriques façonnés par leurs paysages, leurs villes, leurs héritages et leurs cours d’eau.\n\nD’amont en aval, la pierre, les usages et les accents se transforment : Loire sauvage et ducale, val royal, douceur angevine, puis ouverture atlantique. Les frontières retenues ici ne reproduisent pas un découpage administratif uniforme ; elles composent les chapitres cohérents d’un même voyage.\n\nChaque territoire devient un point de rencontre entre les lieux, les personnages et les récits du Codex.",
        presentationFooter:
            "**Cet index rassemble les huit territoires géohistoriques qui structurent le Codex ligérien. Chacun est raconté par ses limites, ses paysages, ses cours d’eau, ses repères et son identité.**",
        footerNote: "territoires composant le fil géohistorique ligérien",
        dataFile: "catalogue-territoires.json",
        etat: "relecture",
        env: ["development"],
    },
    {
        slug: "villes-villages",
        href: "/villes-villages",
        mark: "🏘️",
        label: "Villes et villages",
        eyebrow: "Répertoire",
        title: "Villes et villages de la Loire",
        description:
            "Des cités royales aux villages de tuffeau, les rives changent de visage au fil de la Loire.",
        universe: "raconte",
        format: "repertoire",
        accent: "#b37a43",
        color: "fauve",
        presentation:
            "Grandes villes, cités de passage, bourgs et villages : chaque lieu raconte une manière différente de vivre avec la Loire et ses affluents.",
        presentation_md:
            "Les territoires prennent corps dans leurs **villes et leurs villages**. De Nevers à Saint-Nazaire, les grandes cités organisent les passages, les échanges et les pouvoirs le long du fleuve.\n\nEntre elles se succèdent des bourgs de pont, des villages de tuffeau, des places fortes et des ports anciens. Certains regardent directement la Loire ; d’autres suivent la Vienne, le Cher, l’Indre, le Thouet ou la Sèvre Nantaise.\n\nCe répertoire rassemble ces lieux habités et rend visibles leurs liens avec les territoires, les châteaux, les personnages et les récits du Codex.",
        presentationFooter:
            "**Ce répertoire rassemble les villes, bourgs et villages qui structurent le voyage ligérien. Chaque fiche présente leur territoire, leur relation au fleuve, leurs repères et leurs liens avec les autres index du Codex.**",
        footerNote: "villes, bourgs et villages du corridor ligérien",
        dataFile: "catalogue-villes-villages.json",
        etat: "brouillon",
        env: [],
    },
    {
        slug: "personnages",
        href: "/personnages",
        mark: "♜",
        label: "Personnages",
        eyebrow: "Répertoire",
        title: "Personnages de la Loire",
        description:
            "Des souverains aux artistes, les destins se croisent au fil de la Loire.",
        universe: "raconte",
        format: "repertoire",
        accent: "#b5883c",
        color: "ocre",
        presentation:
            "Souverains, bâtisseurs, écrivains, mécènes et figures singulières : leurs vies relient les lieux, les œuvres et les récits du Codex ligérien.",
        presentation_md:
            "Les monuments ne racontent jamais seuls l’histoire de la Loire. Derrière leurs pierres apparaissent des **souverains**, des **bâtisseurs**, des **artistes**, des **écrivains** et des figures plus discrètes dont les destins ont marqué le fleuve.\n\nLeurs parcours se croisent d’un château à l’autre : commandes, résidences, séjours, restaurations ou inspirations composent un réseau vivant entre les lieux et les époques.\n\nCe répertoire rassemble ces présences et rend visibles les liens humains qui parcourent le Codex ligérien.",
        presentationFooter:
            "**Ce répertoire rassemble les personnages reliés aux lieux du Codex. Chaque fiche présente leurs rôles, leurs autres noms et les relations documentées avec les châteaux de la Loire.**",
        footerNote: "personnages reliés aux lieux et aux récits du Codex",
        dataFile: "catalogue-personnages.json",
        etat: "relecture",
        env: ["development", "production"],
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
        universe: "vivant",
        format: "catalogue",
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
        env: ["development"],
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
        universe: "raconte",
        format: "lexique",
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
        universe: "habite",
        format: "catalogue",
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
