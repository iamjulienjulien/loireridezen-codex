import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZAccordion, {
    type LRZAccordionProps,
} from "@/components/LRZAccordion/LRZAccordion";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZAccordionPlayground from "./LRZAccordionPlayground";
import styles from "./LRZAccordionPlayground.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-accordion");

type AccordionExample = {
    title: string;
    description: string;
    code: string;
    props: Omit<LRZAccordionProps, "children" | "title">;
    content: string;
};

const TONE_EXAMPLES: AccordionExample[] = [
    {
        title: "Plain",
        description:
            "Un panneau sans bordure pour les contenus déjà structurés par leur contexte.",
        code: 'tone="plain" color="galet"',
        props: {
            tone: "plain",
            color: "galet",
        },
        content:
            "Le panneau s’inscrit dans le flux sans ajouter de nouvelle surface.",
    },
    {
        title: "Divided",
        description:
            "Une séparation légère entre le déclencheur et le contenu révélé.",
        code: 'tone="divided" color="galet"',
        props: {
            tone: "divided",
            color: "galet",
        },
        content:
            "Le panneau reprend le traitement historique du ton plain avec une bordure en pointillés.",
    },
    {
        title: "Soft",
        description:
            "Le traitement éditorial par défaut, inspiré des compléments des châteaux.",
        code: 'tone="soft" color="ocre"',
        props: {
            tone: "soft",
            color: "ocre",
        },
        content:
            "Une bordure colorée et un fond très légèrement teinté accompagnent le contenu.",
    },
    {
        title: "Surface",
        description:
            "Un bloc autonome pour les pages de documentation ou les contenus longs.",
        code: 'tone="surface" color="eau"',
        props: {
            tone: "surface",
            color: "eau",
        },
        content:
            "Le déclencheur occupe toute la largeur et le panneau forme un ensemble encadré.",
    },
];

const SIZE_EXAMPLES = [
    {
        size: "sm" as const,
        title: "Compact",
        description: "Métadonnées et fiches denses.",
    },
    {
        size: "md" as const,
        title: "Standard",
        description: "Usage général dans le Codex.",
    },
    {
        size: "lg" as const,
        title: "Éditorial",
        description: "Documentation et contenus développés.",
    },
];

const COLOR_EXAMPLES = [
    "ocre",
    "prairie",
    "eau",
    "brique",
    "ardoise",
    "tuffeau",
] as const;

const PROPS = [
    {
        name: "title",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description: "Libellé principal affiché dans le déclencheur.",
    },
    {
        name: "children",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description: "Contenu révélé lorsque le panneau est ouvert.",
    },
    {
        name: "description",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description: "Précision courte affichée sous le titre.",
    },
    {
        name: "icon",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description: "Icône décorative placée avant le titre.",
    },
    {
        name: "indicator",
        type: "ReactNode | null",
        required: "Non",
        defaultValue: "ChevronRight",
        description:
            "Indicateur de déploiement personnalisé. La valeur null le masque.",
    },
    {
        name: "indicatorPosition",
        type: '"start" | "end"',
        required: "Non",
        defaultValue: '"end"',
        description: "Place l’indicateur au début ou à la fin du déclencheur.",
    },
    {
        name: "hoverState",
        type: "boolean",
        required: "Non",
        defaultValue: "true",
        description: "Active le changement de fond du déclencheur au survol.",
    },
    {
        name: "fullWidth",
        type: "boolean",
        required: "Non",
        defaultValue: "false",
        description: "Étend le déclencheur sur toute la largeur disponible.",
    },
    {
        name: "color",
        type: "LRZColor",
        required: "Non",
        defaultValue: '"ocre"',
        description:
            "Couleur LRZ utilisée pour l’indicateur, le focus et les surfaces teintées.",
    },
    {
        name: "tone",
        type: '"plain" | "divided" | "soft" | "surface"',
        required: "Non",
        defaultValue: '"soft"',
        description: "Traitement visuel du panneau.",
    },
    {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: "Non",
        defaultValue: '"md"',
        description: "Densité du déclencheur et du panneau.",
    },
    {
        name: "open",
        type: "boolean",
        required: "Non",
        defaultValue: "undefined",
        description: "État d’ouverture en mode contrôlé.",
    },
    {
        name: "defaultOpen",
        type: "boolean",
        required: "Non",
        defaultValue: "false",
        description: "État initial en mode autonome.",
    },
    {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: "Non",
        defaultValue: "undefined",
        description: "Reçoit le prochain état demandé par l’utilisateur.",
    },
    {
        name: "disabled",
        type: "boolean",
        required: "Non",
        defaultValue: "false",
        description: "Désactive le déclencheur et conserve l’état courant.",
    },
    {
        name: "id",
        type: "string",
        required: "Non",
        defaultValue: "useId()",
        description: "Identifiant de base du déclencheur et du panneau.",
    },
    {
        name: "headingLevel",
        type: "2 | 3 | 4 | 5 | 6",
        required: "Non",
        defaultValue: "undefined",
        description: "Place le bouton dans un titre HTML du niveau choisi.",
    },
    {
        name: "unmountOnClose",
        type: "boolean",
        required: "Non",
        defaultValue: "false",
        description:
            "Retire le contenu du DOM au lieu de le conserver avec hidden.",
    },
    {
        name: "ariaLabel",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Nom accessible explicite pour un titre non textuel.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Classe additionnelle de la racine.",
    },
    {
        name: "triggerClassName",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Classe additionnelle du bouton.",
    },
    {
        name: "panelClassName",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Classe additionnelle du panneau.",
    },
    {
        name: "style",
        type: "CSSProperties",
        required: "Non",
        defaultValue: "undefined",
        description: "Styles additionnels de la racine.",
    },
    {
        name: "triggerProps",
        type: "ButtonHTMLAttributes",
        required: "Non",
        defaultValue: "undefined",
        description: "Attributs HTML avancés transmis au bouton.",
    },
    {
        name: "panelProps",
        type: "HTMLAttributes<HTMLDivElement>",
        required: "Non",
        defaultValue: "undefined",
        description: "Attributs HTML avancés transmis au panneau.",
    },
] as const;

export default function LRZAccordionPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-accordion" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>

                    <h1 className={styles.pageTitle}>LRZAccordion</h1>

                    <p className={styles.lede}>
                        Un panneau dépliant accessible pour révéler les détails
                        utiles au bon moment, sans alourdir la lecture initiale.
                        Il reprend le geste des « Compléments » des fiches
                        château et l’étend à tout le design system.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="accordion-main-example-title"
                >
                    <div className={styles.mainExamplePreview}>
                        <p className={styles.kicker}>Exemple principal</p>
                        <h2 id="accordion-main-example-title">
                            Les détails restent à portée
                        </h2>
                        <p>
                            Le contenu reste monté lorsqu’il est fermé, ce qui
                            préserve naturellement son état interne.
                        </p>

                        <LRZAccordion
                            title="Compléments"
                            description="Autres noms et protection"
                            color="ocre"
                            defaultOpen
                            headingLevel={3}
                        >
                            <dl className={styles.demoDetails}>
                                <div>
                                    <dt>Autres noms</dt>
                                    <dd>Château des Ducs · Palais d’Anjou</dd>
                                </div>
                                <div>
                                    <dt>Protection</dt>
                                    <dd>Classé monument historique</dd>
                                </div>
                            </dl>
                        </LRZAccordion>
                    </div>

                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZAccordion
    title="Compléments"
    description="Autres noms et protection"
    color="ocre"
    defaultOpen
    headingLevel={3}
>
    <ComplementContent />
</LRZAccordion>`}</code>
                    </pre>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="accordion-tones-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="accordion-tones-title">Quatre tonalités</h2>
                        <p>
                            Chaque traitement répond à un niveau d’autonomie
                            différent dans la page.
                        </p>
                    </header>

                    <div className={styles.exampleGrid}>
                        {TONE_EXAMPLES.map((example) => (
                            <article
                                className={styles.example}
                                key={example.title}
                            >
                                <div className={styles.exampleHeader}>
                                    <h3>{example.title}</h3>
                                    <p>{example.description}</p>
                                </div>

                                <LRZAccordion
                                    {...example.props}
                                    title="En savoir plus"
                                    defaultOpen
                                >
                                    <p>{example.content}</p>
                                </LRZAccordion>

                                <code>{example.code}</code>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="accordion-sizes-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Densité</p>
                        <h2 id="accordion-sizes-title">Trois tailles</h2>
                    </header>

                    <div className={styles.sizeStack}>
                        {SIZE_EXAMPLES.map((example) => (
                            <LRZAccordion
                                key={example.size}
                                title={example.title}
                                description={example.description}
                                size={example.size}
                                tone="surface"
                                color="bleu-gris"
                            >
                                <p>
                                    Le rythme interne s’adapte à la densité du
                                    contexte.
                                </p>
                            </LRZAccordion>
                        ))}
                    </div>
                </section>

                <LRZAccordionPlayground />

                <section
                    className={styles.referenceSection}
                    aria-labelledby="accordion-states-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>États</p>
                        <h2 id="accordion-states-title">
                            Autonome, contrôlé et désactivé
                        </h2>
                    </header>

                    <div className={styles.stateGrid}>
                        <LRZAccordion
                            title="Autonome"
                            description="État interne initialement fermé"
                            color="prairie"
                        >
                            <p>
                                Utilisez <code>defaultOpen</code> uniquement
                                pour choisir l’état initial.
                            </p>
                        </LRZAccordion>

                        <LRZAccordion
                            title="Ouvert et désactivé"
                            description="Le contenu reste consultable"
                            color="brique"
                            open
                            disabled
                        >
                            <p>
                                L’état contrôlé est conservé, mais le bouton ne
                                peut plus être actionné.
                            </p>
                        </LRZAccordion>
                    </div>
                </section>

                <section
                    className={styles.propsSection}
                    aria-labelledby="accordion-props-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="accordion-props-title">Props</h2>
                        <p>
                            Le mode contrôlé utilise le couple <code>open</code>{" "}
                            et <code>onOpenChange</code>. Le mode autonome
                            utilise <code>defaultOpen</code>.
                        </p>
                    </header>

                    <div
                        className={styles.tableScroll}
                        role="region"
                        aria-label="Tableau des props de LRZAccordion"
                        tabIndex={0}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Prop</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Requise</th>
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
                                        <td>{prop.required}</td>
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

                <section
                    className={styles.referenceSection}
                    aria-labelledby="accordion-colors-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Palette</p>
                        <h2 id="accordion-colors-title">
                            Accents Loire Ride Zen
                        </h2>
                        <p>
                            Toute valeur de <code>LRZColor</code> est acceptée.
                            Cette sélection couvre les principaux contextes
                            éditoriaux.
                        </p>
                    </header>

                    <div className={styles.colorGrid}>
                        {COLOR_EXAMPLES.map((color) => (
                            <article
                                className={styles.colorExample}
                                key={color}
                            >
                                <LRZAccordion
                                    title={color}
                                    color={color}
                                    size="sm"
                                >
                                    <p>Accent {color}</p>
                                </LRZAccordion>
                                <code>{`color="${color}"`}</code>
                            </article>
                        ))}
                    </div>
                </section>

                <aside className={styles.accessibility}>
                    <p className={styles.kicker}>Accessibilité</p>
                    <h2>Comportement natif et prévisible</h2>
                    <ul>
                        <li>
                            Le déclencheur est un bouton utilisable avec Entrée
                            et Espace.
                        </li>
                        <li>
                            <code>aria-expanded</code> reflète l’état visible et{" "}
                            <code>aria-controls</code> référence le panneau.
                        </li>
                        <li>
                            Le contenu fermé est retiré de la navigation clavier
                            avec <code>hidden</code>.
                        </li>
                        <li>
                            Les animations respectent{" "}
                            <code>prefers-reduced-motion</code>.
                        </li>
                    </ul>
                </aside>
            </div>
        </>
    );
}
