/**
 * Registre des index du Codex Ligérien.
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
        accent: "#B88945",
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
            "Des oiseaux des grèves aux loutres, explorez la faune de la Loire.",
        universe: "vivant",
        format: "naturaliste",
        accent: "#4D80A7",
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
            "Des saules aux fleurs de l’estuaire, explorez la flore de la Loire.",
        universe: "vivant",
        format: "naturaliste",
        accent: "#5C8754",
        color: "prairie",
        presentation:
            "La Loire fait pousser autant qu'elle emporte. Du peuplier de la grève à l'endémique de l'estuaire, voici ce qui verdit le fil — l'indigène, le rare, et l'intrus qui gagne du terrain.",
        presentation_md:
            "À l’amont, les grèves et les bras morts portent une végétation façonnée par les crues. Le **Peuplier noir** enfonce ses racines dans les îles, le **Saule blanc** plie avec le courant et l’**Aulne glutineux** garde les berges dans une ombre fraîche.\n\nPuis les prairies s’ouvrent. La **Fritillaire pintade** ponctue les prés inondables, la **Reine-des-prés** accompagne les fossés et l’**Iris des marais** retient dans ses fleurs la lumière des eaux lentes. Entre roselières, haies et levées, chaque milieu compose sa propre palette.\n\nEnfin, la Loire devient estuaire. L’**Angélique des estuaires** s’accroche aux prairies salées, le **Nénuphar blanc** flotte dans les eaux calmes, tandis que la **Jussie à grandes fleurs** rappelle les fragiles équilibres du fleuve. Du plus commun au plus rare, chaque plante raconte une manière de verdir le fil.",
        presentationFooter:
            "**Cet index rassemble les plantes qui enracinent, fleurissent et colonisent les rives ligériennes. Chaque fiche est racontée par son milieu, sa saison, ses usages et sa place dans les équilibres du fleuve.**",
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
        accent: "#A44842",
        color: "brique",
        presentation_md:
            "À l’amont, les guinguettes s’installent dans les ports, les parcs et les prairies où le fleuve ralentit. **La Chapelloise** ouvre le bal près d’Orléans, tandis que **Le Ponton** et **La Guinguette du Domino** prolongent les beaux jours entre tables au bord de l’eau et airs de fête.\n\nPuis les rives s’ouvrent. **La Guinguette Ligaya** accompagne les coteaux de Montlouis, **Guinguette du Bord de Vienne** regarde arriver la Vienne et **Guinguette La Gabare** fait de la confluence un décor de retrouvailles. Chaque adresse compose sa propre manière d’habiter le paysage ligérien.\n\nEnfin, la Loire devient scène. De **La Dérive** à **Le Gramophone**, jusqu’à **L’Atypik Guinguette**, les tablées s’animent au fil des concerts, des couchers de soleil et des rencontres. La fête change de rythme, mais garde le même goût du fleuve.",
        presentationFooter:
            "**Cet index rassemble les guinguettes qui animent les rives ligériennes, des haltes discrètes aux rendez-vous les plus festifs. Chaque adresse raconte son cadre, sa cuisine, sa musique et le paysage qui l’entoure.**",
        footerNote: "guinguettes et haltes conviviales du Val de Loire",
        dataFile: "catalogue-guinguettes.json",
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
        accent: "#B37A43",
        color: "fauve",
        presentation:
            "La Loire n’a pas un seul visage. Du Nivernais à l’estuaire, elle traverse huit territoires géohistoriques façonnés par leurs paysages, leurs villes, leurs héritages et leurs cours d’eau.",
        presentation_md:
            "À l’amont, le **Nivernais** garde les seuils de la Loire sauvage, tandis que l’**Orléanais** accompagne le fleuve lorsqu’il rejoint les premières grandes cités. Entre forêts, ponts et levées, la Loire y prend la mesure de son val.\n\nPuis le cours s’élargit et compose le paysage royal. Le **Blaisois** rassemble les coteaux et les demeures du Loir-et-Cher, la **Touraine** fait dialoguer jardins, caves et confluences, tandis que le **Chinonais** veille sur le fleuve et la Vienne.\n\nEnfin, l’aval ouvre d’autres horizons. Le **Saumurois** creuse ses coteaux de tuffeau, l’**Anjou** mêle schiste et douceur ligérienne, puis la **Bretagne ligérienne** accompagne la Loire jusqu’aux marais, aux ports et à l’estuaire.",
        presentationFooter:
            "**Cet index rassemble les huit territoires géohistoriques qui structurent le Codex Ligérien. Chacun est raconté par ses limites, ses paysages, ses cours d’eau, ses repères et son identité.**",
        footerNote: "territoires composant le fil géohistorique ligérien",
        dataFile: "catalogue-territoires.json",
        etat: "relecture",
        env: ["development", "production"],
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
        accent: "#B37A43",
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
        env: ["development"],
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
        accent: "#663D49",
        color: "lie-de-vin",
        presentation:
            "Souverains, bâtisseurs, écrivains, mécènes et figures singulières : leurs vies relient les lieux, les œuvres et les récits du Codex Ligérien.",
        presentation_md:
            "À l’amont, les forteresses gardent la mémoire des conquêtes, des lignées et des serments. **Foulques Nerra** impose son empreinte sur l’Anjou, **Jeanne d’Arc** traverse l’histoire d’Orléans et **Charles VII** fait de la Loire un théâtre de pouvoir.\n\nPuis la Renaissance transforme les châteaux en scènes de cour et d’invention. **François Ier** commande des rêves de pierre, **Diane de Poitiers** façonne Chenonceau et **Catherine de Médicis** en prolonge le destin. Dans leur sillage, **Léonard de Vinci** et les bâtisseurs dessinent un nouvel art d’habiter le fleuve.\n\nEnfin, les rives deviennent matière à récits. **Louise Dupin** reçoit à Chenonceau, **Pierre de Ronsard** chante les paysages de Touraine et **Alexandre Dumas** réinvente les intrigues de la Loire. Souverains, créateurs et témoins composent ainsi le réseau humain du Codex.",
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
        accent: "#A44842",
        color: "rouge",
        presentation:
            "Le fil se boit autant qu'il se longe. Des coteaux du Forez au melon de l'embouchure, voici les appellations qui jalonnent la Loire — du grand cru liquoreux au cru communal le plus discret.",
        presentation_md:
            "À l’amont, la vigne s’accroche aux pentes du Massif central et aux premières terrasses du fleuve. Les **Côtes d’Auvergne** gardent la mémoire des sols volcaniques, les **Côtes du Forez** font parler le gamay et **Saint-Pourçain** prolonge le vignoble jusque dans le Bourbonnais.\n\nPuis le Centre-Loire et la Touraine composent un long chapelet de coteaux. Le **Sancerre** trouve sa tension dans le silex, le **Pouilly-Fumé** sa pierre à fusil, tandis que le **Vouvray** et le **Chinon** révèlent les visages changeants du chenin et du cabernet franc.\n\nEnfin, l’Anjou et le pays nantais ouvrent le vin sur l’aval. Le **Savennières** garde ses pentes de schiste, les **Coteaux du Layon** font mûrir l’or des liquoreux et le **Muscadet** accompagne le fleuve jusqu’aux marais et à l’Atlantique.",
        presentationFooter:
            "**Cet index rassemble les appellations et vignobles qui jalonnent la Loire, des coteaux du Forez aux rives de l’Atlantique. Chaque fiche raconte sa robe, ses cépages, son terroir et l’accord qui prolonge le vin à table.**",
        footerNote:
            "appellations du fil · les émojis attendent leur version LRZ",
        dataFile: "vignoble.json",
        etat: "publie",
        env: ["development", "production"],
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
        accent: "#3E93A7",
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
        accent: "#B37A43",
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
