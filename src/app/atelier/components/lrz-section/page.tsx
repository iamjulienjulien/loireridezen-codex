import type { Metadata } from "next";
import Link from "next/link";
import LRZSection, {
    type LRZSectionProps,
} from "@/components/LRZSection/LRZSection";
import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZSectionPlayground from "./LRZSectionPlayground";
import styles from "./LRZSectionPlayground.module.css";

export const metadata: Metadata = {
    title: "LRZSection — Atelier du Codex ligérien",
    description:
        "Layouts, largeurs, rythmes et ambiances du composant de section Loire Ride Zen.",
};

type LayoutExample = {
    title: string;
    description: string;
    code: string;
    props: LRZSectionProps;
};

const LAYOUTS: LayoutExample[] = [
    {
        title: "Stack",
        description:
            "La composition verticale standard pour la majorité des chapitres éditoriaux.",
        code: 'layout="stack"',
        props: {
            children: (
                <div className={styles.demoCopy}>
                    <p>
                        Le contenu suit naturellement l’en-tête de la section.
                    </p>
                </div>
            ),
            layout: "stack",
            spacing: "sm",
            eyebrow: "Présentation",
            title: "Une section verticale",
            description: "Le layout le plus simple et le plus polyvalent.",
        },
    },
    {
        title: "Split",
        description:
            "Deux zones équilibrées pour rapprocher un texte et un visuel.",
        code: 'layout="split" aside={...}',
        props: {
            children: (
                <div className={styles.demoCopy}>
                    <p>
                        Une introduction, un manifeste ou un ensemble de
                        données.
                    </p>
                </div>
            ),
            layout: "split",
            spacing: "sm",
            eyebrow: "Composition",
            title: "Deux fragments",
            aside: (
                <div className={styles.demoAside}>
                    Illustration ou contenu secondaire
                </div>
            ),
        },
    },
    {
        title: "Sidebar",
        description:
            "Une colonne étroite pour les filtres, la légende ou la navigation.",
        code: 'layout="sidebar" aside={...}',
        props: {
            children: (
                <div className={styles.demoCards}>
                    <div />
                    <div />
                    <div />
                </div>
            ),
            layout: "sidebar",
            spacing: "sm",
            eyebrow: "Explorer",
            title: "Catalogue et filtres",
            asidePosition: "start",
            aside: <div className={styles.demoAside}>Filtres</div>,
        },
    },
    {
        title: "Grid",
        description:
            "Une grille pilotée directement par la section, sans wrapper local.",
        code: 'layout="grid" columns={3}',
        props: {
            children: (
                <>
                    <div className={styles.demoTile}>Château</div>
                    <div className={styles.demoTile}>Paysage</div>
                    <div className={styles.demoTile}>Terroir</div>
                </>
            ),
            layout: "grid",
            columns: 3,
            minColumnWidth: "150px",
            spacing: "sm",
            eyebrow: "Collections",
            title: "Une grille éditoriale",
        },
    },
    {
        title: "Full",
        description:
            "Un cadre large adapté aux cartes, catalogues et contenus immersifs.",
        code: 'layout="full" width="wide"',
        props: {
            children: <div className={styles.demoMap}>Zone cartographique</div>,
            layout: "full",
            width: "wide",
            spacing: "sm",
            eyebrow: "Carte",
            title: "Le territoire en grand",
        },
    },
    {
        title: "Bleed",
        description:
            "Un fond pleine largeur avec un contenu intérieur toujours cadré.",
        code: 'layout="bleed" tone="tinted"',
        props: {
            children: (
                <div className={styles.demoCopy}>
                    <p>
                        Une ambiance territoriale distincte sans abandonner la
                        grille générale.
                    </p>
                </div>
            ),
            layout: "bleed",
            tone: "tinted",
            color: "ocre",
            spacing: "sm",
            eyebrow: "Chapitre I",
            title: "L’Anjou",
        },
    },
];

const WIDTHS = ["narrow", "reading", "content", "wide", "full"] as const;

const TONES = [
    "plain",
    "surface",
    "soft",
    "tinted",
    "contrast",
    "transparent",
] as const;

const HEADER_LAYOUTS = [
    {
        value: "stack",
        title: "Stack",
        description: "L’en-tête éditorial classique, entièrement vertical.",
    },
    {
        value: "inline",
        title: "Inline",
        description:
            "Titre et description rapprochés pour les petites sections.",
    },
    {
        value: "split",
        title: "Split",
        description:
            "En-tête principal à gauche, actions disponibles à droite.",
    },
] as const;

const PROPS = [
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Contenu principal de la section.",
    },
    {
        name: "as",
        type: "ElementType",
        defaultValue: '"section"',
        description: "Élément HTML ou composant utilisé comme racine.",
    },
    {
        name: "id",
        type: "string",
        defaultValue: "undefined",
        description: "Identifiant HTML et ancre de navigation.",
    },
    {
        name: "layout",
        type: '"stack" | "split" | "sidebar" | "grid" | "full" | "bleed"',
        defaultValue: '"stack"',
        description: "Détermine la composition principale du contenu.",
    },
    {
        name: "width",
        type: '"narrow" | "reading" | "content" | "wide" | "full"',
        defaultValue: '"content"',
        description: "Détermine la largeur maximale du conteneur.",
    },
    {
        name: "spacing",
        type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
        defaultValue: '"lg"',
        description: "Contrôle l’espacement vertical intérieur.",
    },
    {
        name: "tone",
        type: '"plain" | "surface" | "soft" | "tinted" | "contrast" | "transparent"',
        defaultValue: '"plain"',
        description: "Détermine l’ambiance visuelle de la section.",
    },
    {
        name: "color",
        type: "LRZColor",
        defaultValue: '"galet"',
        description:
            "Couleur Naturalist utilisée pour les accents et fonds teintés.",
    },
    {
        name: "align",
        type: '"start" | "center" | "end"',
        defaultValue: '"start"',
        description: "Contrôle l’alignement éditorial.",
    },
    {
        name: "eyebrow",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Sur-titre court placé avant le titre.",
    },
    {
        name: "title",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Titre principal de la section.",
    },
    {
        name: "titleAs",
        type: '"h2" | "h3" | "h4"',
        defaultValue: '"h2"',
        description: "Niveau HTML explicite du titre.",
    },
    {
        name: "description",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Introduction éditoriale de la section.",
    },
    {
        name: "headerLayout",
        type: '"stack" | "inline" | "split"',
        defaultValue: '"stack"',
        description: "Détermine la composition de l’en-tête.",
    },
    {
        name: "headerPosition",
        type: '"top" | "side"',
        defaultValue: '"top"',
        description: "Place l’en-tête au-dessus ou à côté du contenu.",
    },
    {
        name: "actions",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Actions ou contrôles associés à l’en-tête.",
    },
    {
        name: "footer",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Contenu secondaire placé en pied de section.",
    },
    {
        name: "aside",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Contenu complémentaire des layouts en colonnes.",
    },
    {
        name: "asidePosition",
        type: '"start" | "end"',
        defaultValue: '"end"',
        description: "Position de l’aside sur desktop.",
    },
    {
        name: "mobileAsidePosition",
        type: '"before" | "after"',
        defaultValue: '"after"',
        description: "Ordre de l’aside lorsque le layout devient vertical.",
    },
    {
        name: "separatorBefore",
        type: '"none" | "simple" | "spark" | "diamond" | "dot" | "fade"',
        defaultValue: '"none"',
        description: "Séparateur affiché avant la section.",
    },
    {
        name: "separatorAfter",
        type: '"none" | "simple" | "spark" | "diamond" | "dot" | "fade"',
        defaultValue: '"none"',
        description: "Séparateur affiché après la section.",
    },
    {
        name: "separatorColor",
        type: "LRZColor",
        defaultValue: "color",
        description: "Couleur propre aux séparateurs intégrés.",
    },
    {
        name: "bleed",
        type: "boolean",
        defaultValue: "false",
        description: "Étend visuellement la section sur toute la fenêtre.",
    },
    {
        name: "flushOnMobile",
        type: "boolean",
        defaultValue: "false",
        description: "Supprime le padding horizontal sur mobile.",
    },
    {
        name: "visuallyHiddenTitle",
        type: "boolean",
        defaultValue: "false",
        description:
            "Masque le titre visuellement tout en le conservant accessible.",
    },
    {
        name: "columns",
        type: "2 | 3 | 4",
        defaultValue: "3",
        description: "Nombre de colonnes du layout grid.",
    },
    {
        name: "minColumnWidth",
        type: "CSSProperties['minWidth']",
        defaultValue: "undefined",
        description: "Largeur minimale des colonnes automatiques.",
    },
    {
        name: "maxWidth",
        type: "CSSProperties['maxWidth']",
        defaultValue: "undefined",
        description: "Remplace la largeur définie par le preset.",
    },
    {
        name: "paddingBlock",
        type: "CSSProperties['paddingBlock']",
        defaultValue: "undefined",
        description: "Remplace l’espacement vertical du preset.",
    },
    {
        name: "paddingInline",
        type: "CSSProperties['paddingInline']",
        defaultValue: "undefined",
        description: "Remplace le padding horizontal du conteneur.",
    },
    {
        name: "gap",
        type: "CSSProperties['gap']",
        defaultValue: "undefined",
        description: "Contrôle l’espace entre les éléments.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Classe additionnelle appliquée à la racine.",
    },
    {
        name: "containerClassName",
        type: "string",
        defaultValue: "undefined",
        description: "Classe additionnelle du conteneur intérieur.",
    },
    {
        name: "contentClassName",
        type: "string",
        defaultValue: "undefined",
        description: "Classe additionnelle du contenu principal.",
    },
    {
        name: "style",
        type: "CSSProperties",
        defaultValue: "undefined",
        description: "Styles additionnels appliqués à la racine.",
    },
    {
        name: "ariaLabel",
        type: "string",
        defaultValue: "undefined",
        description:
            "Nom accessible lorsque la section ne possède pas de titre.",
    },
] as const;

export default function LRZSectionPage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-section" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>

                    <h1 className={styles.title}>LRZSection</h1>

                    <p className={styles.lede}>
                        Le cadre éditorial commun des pages Loire Ride Zen. Il
                        orchestre la largeur, le rythme vertical, les fonds, les
                        en-têtes et les compositions internes.
                    </p>
                </header>

                <section className={styles.mainExample}>
                    <div className={styles.mainExamplePreview}>
                        <p className={styles.kicker}>Exemple principal</p>

                        <h2>Un chapitre prêt à accueillir le contenu</h2>

                        <p>
                            La section compose son en-tête, son contenu
                            secondaire et sa respiration finale sans CSS propre
                            à la page.
                        </p>

                        <div className={styles.mainExampleCanvas}>
                            <LRZSection
                                width="content"
                                spacing="sm"
                                tone="tinted"
                                color="ocre"
                                eyebrow="Le Codex"
                                title="Les châteaux de Loire"
                                description="Un atlas vivant du patrimoine ligérien."
                                layout="split"
                                aside={
                                    <div className={styles.demoAside}>
                                        Illustration
                                    </div>
                                }
                                separatorAfter="spark"
                                separatorColor="ocre"
                            >
                                <div className={styles.demoCopy}>
                                    <p>
                                        Chaque section devient un chapitre
                                        cohérent du récit.
                                    </p>
                                </div>
                            </LRZSection>
                        </div>
                    </div>

                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZSection
    width="content"
    tone="tinted"
    color="ocre"
    eyebrow="Le Codex"
    title="Les châteaux de Loire"
    layout="split"
    aside={<Illustration />}
    separatorAfter="spark"
>
    <Introduction />
</LRZSection>`}</code>
                    </pre>
                </section>

                <section className={styles.sectionCard}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Layouts</p>

                        <h2>Les structures principales</h2>

                        <p>
                            Six compositions couvrent les besoins courants, du
                            manifeste étroit à la carte immersive.
                        </p>
                    </header>

                    <div className={styles.layoutGrid}>
                        {LAYOUTS.map((example) => (
                            <article
                                className={styles.layoutCard}
                                key={example.title}
                            >
                                <header className={styles.layoutCardHeader}>
                                    <div>
                                        <h3>{example.title}</h3>

                                        <p>{example.description}</p>
                                    </div>

                                    <code>{example.code}</code>
                                </header>

                                <div className={styles.layoutPreview}>
                                    <LRZSection {...example.props} />
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.sectionCard}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Largeurs</p>

                        <h2>Une échelle commune aux pages</h2>

                        <p>
                            Les presets cadrent aussi bien un texte de lecture
                            qu’un catalogue panoramique.
                        </p>
                    </header>

                    <div className={styles.widthExamples}>
                        {WIDTHS.map((width) => (
                            <article
                                className={styles.widthExample}
                                key={width}
                            >
                                <code>{width}</code>

                                <LRZSection
                                    width={width}
                                    spacing="xs"
                                    tone="soft"
                                >
                                    <div className={styles.widthBar} />
                                </LRZSection>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.sectionCard}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Ambiances</p>

                        <h2>Les tonalités de section</h2>

                        <p>
                            Le contenu reste identique, seule l’atmosphère du
                            chapitre évolue.
                        </p>
                    </header>

                    <div className={styles.toneGrid}>
                        {TONES.map((tone) => (
                            <article className={styles.toneCard} key={tone}>
                                <code>{tone}</code>

                                <LRZSection
                                    tone={tone}
                                    color="ocre"
                                    spacing="sm"
                                    eyebrow="Atmosphère"
                                    title="Fragment de Loire"
                                    titleAs="h3"
                                    description="Une même section sous une lumière différente."
                                >
                                    <div className={styles.demoCopy}>
                                        <p>Contenu éditorial.</p>
                                    </div>
                                </LRZSection>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.sectionCard}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>En-têtes</p>

                        <h2>Trois rythmes pour introduire un chapitre</h2>
                    </header>

                    <div className={styles.headerExamples}>
                        {HEADER_LAYOUTS.map((header) => (
                            <article
                                className={styles.headerExample}
                                key={header.value}
                            >
                                <div className={styles.headerExampleMeta}>
                                    <h3>{header.title}</h3>
                                    <p>{header.description}</p>
                                    <code>
                                        headerLayout= &quot;
                                        {header.value}
                                        &quot;
                                    </code>
                                </div>

                                <div className={styles.headerExamplePreview}>
                                    <LRZSection
                                        spacing="sm"
                                        headerLayout={header.value}
                                        eyebrow="Explorer"
                                        title="Parcourir le Codex"
                                        description="Un chemin d’entrée vers les collections ligériennes."
                                        actions={
                                            <button
                                                className={styles.demoButton}
                                                type="button"
                                            >
                                                Explorer
                                            </button>
                                        }
                                    >
                                        <div className={styles.demoLine} />
                                    </LRZSection>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <LRZSectionPlayground />

                <section className={styles.sectionCard}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>API</p>

                        <h2>Propriétés du composant</h2>

                        <p>
                            Les valeurs personnalisées alimentent des variables
                            CSS internes et prennent la priorité sur les
                            presets.
                        </p>
                    </header>

                    <div className={styles.tableScroll}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Prop</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Défaut</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>

                            <tbody>
                                {PROPS.map((prop) => (
                                    <tr key={prop.name}>
                                        <th scope="row">
                                            <code>{prop.name}</code>
                                        </th>

                                        <td>
                                            <code>{prop.type}</code>
                                        </td>

                                        <td>
                                            <code>{prop.defaultValue}</code>
                                        </td>

                                        <td>{prop.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
