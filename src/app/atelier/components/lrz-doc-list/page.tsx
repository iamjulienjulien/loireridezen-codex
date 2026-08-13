import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZDocCodeBlock from "@/components/_ui/LRZDocCodeBlock/LRZDocCodeBlock";
import LRZDocList, {
    type LRZDocListVariant,
} from "@/components/_ui/LRZDocList/LRZDocList";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import DocMarkdownSyntax from "@/components/_atelier/DocMarkdownSyntax";

import styles from "./lrz-doc-list.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-doc-list",
);

const VARIANTS: ReadonlyArray<{
    title: string;
    description: string;
    variant: LRZDocListVariant;
    ordered?: boolean;
    items: readonly string[];
}> = [
    {
        title: "Par défaut",
        description:
            "La liste éditoriale standard pour structurer les pages du Design Book et du Codex.",
        variant: "default",
        items: [
            "Une silhouette lisible au premier regard",
            "Un vocabulaire fidèle au territoire ligérien",
            "Une documentation assez précise pour être réutilisée",
        ],
    },
    {
        title: "Compacte",
        description:
            "Une version plus discrète pour les informations secondaires et les petites séries.",
        variant: "compact",
        items: [
            "Faune ligérienne",
            "Flore des berges",
            "Châteaux et patrimoine",
            "Guinguettes du fil",
        ],
    },
    {
        title: "Validation",
        description:
            "Une checklist douce pour les prérequis, contrôles et étapes terminées.",
        variant: "check",
        items: [
            "Schéma TypeScript validé",
            "Contenu relu et documenté",
            "Exemple ajouté à l’Atelier",
        ],
    },
    {
        title: "Chronologie",
        description:
            "Une progression verticale pour raconter une séquence, un parcours ou un processus.",
        variant: "timeline",
        items: [
            "Observer le territoire",
            "Collecter les traces et les récits",
            "Classer les découvertes dans le Codex",
            "Partager une lecture sensible de la Loire",
        ],
    },
] as const;

const PROPS = [
    {
        name: "children",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description:
            "Éléments li produits directement ou transmis par React Markdown.",
    },
    {
        name: "variant",
        type: '"default" | "compact" | "check" | "timeline"',
        required: "Non",
        defaultValue: '"default"',
        description:
            "Détermine la grammaire visuelle et le rythme vertical de la liste.",
    },
    {
        name: "ordered",
        type: "boolean",
        required: "Non",
        defaultValue: "false",
        description:
            "Utilise un élément ol et affiche un compteur numérique automatique.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Classe supplémentaire appliquée à l’élément racine ul ou ol.",
    },
    {
        name: "…props",
        type: 'ComponentPropsWithoutRef<"ul" | "ol">',
        required: "Non",
        defaultValue: "—",
        description:
            "Attributs HTML natifs transmis à la liste, comme id, aria-label ou data-*.",
    },
] as const;

export default function LRZDocListPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-doc-list" />

            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Documentation UI
                    </p>

                    <h1 className={styles.title}>LRZDocList</h1>

                    <p className={styles.lede}>
                        Une famille de listes pensée pour donner du rythme aux
                        pages Markdown sans transformer chaque puce en panneau
                        de signalisation. Elle prend en charge les listes
                        simples, ordonnées, imbriquées et plusieurs usages
                        éditoriaux.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="doc-list-main-title"
                >
                    <div className={styles.mainExampleText}>
                        <p className={styles.kicker}>Exemple principal</p>

                        <h2 id="doc-list-main-title">
                            Une liste qui appartient au territoire
                        </h2>

                        <p>
                            La variante par défaut remplace les puces natives
                            par de petits marqueurs inspirés de la grammaire
                            Naturalist, tout en conservant une structure HTML
                            sémantique.
                        </p>
                    </div>

                    <div
                        className={`${styles.listCanvas} ${styles.listCanvasLarge}`}
                    >
                        <LRZDocList>
                            <li>
                                Décrire clairement le composant et son
                                intention.
                            </li>
                            <li>
                                Montrer un exemple réaliste dans l’écosystème
                                Loire Ride Zen.
                            </li>
                            <li>
                                Documenter ses variantes, ses props et son
                                intégration Markdown.
                            </li>
                        </LRZDocList>
                    </div>
                </section>

                <section
                    className={styles.examplesSection}
                    aria-labelledby="doc-list-variants-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>

                        <h2 id="doc-list-variants-title">
                            Quatre rythmes de lecture
                        </h2>

                        <p>
                            Chaque variante conserve le même balisage. Seule la
                            voix graphique change selon la nature du contenu.
                        </p>
                    </header>

                    <div className={styles.examplesGrid}>
                        {VARIANTS.map((example) => (
                            <article
                                className={styles.example}
                                key={example.variant}
                            >
                                <header className={styles.exampleHeader}>
                                    <h3>{example.title}</h3>
                                    <p>{example.description}</p>
                                    <code>
                                        variant=&quot;{example.variant}&quot;
                                    </code>
                                </header>

                                <div className={styles.listCanvas}>
                                    <LRZDocList
                                        ordered={example.ordered}
                                        variant={example.variant}
                                    >
                                        {example.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </LRZDocList>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.examplesSection}
                    aria-labelledby="doc-list-structures-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Structures</p>

                        <h2 id="doc-list-structures-title">
                            Ordre et imbrication
                        </h2>

                        <p>
                            Le composant sait aussi présenter une séquence
                            numérotée et laisse les sous-listes respirer sans
                            perdre la hiérarchie du contenu.
                        </p>
                    </header>

                    <div className={styles.examplesGrid}>
                        <article className={styles.example}>
                            <header className={styles.exampleHeader}>
                                <h3>Liste ordonnée</h3>
                                <p>
                                    Pour une procédure dont l’ordre doit être
                                    immédiatement visible.
                                </p>
                                <code>ordered</code>
                            </header>

                            <div className={styles.listCanvas}>
                                <LRZDocList ordered>
                                    <li>Importer le composant.</li>
                                    <li>Déclarer les mappings Markdown.</li>
                                    <li>
                                        Rédiger la liste dans le fichier MDX.
                                    </li>
                                </LRZDocList>
                            </div>
                        </article>

                        <article className={styles.example}>
                            <header className={styles.exampleHeader}>
                                <h3>Liste imbriquée</h3>
                                <p>
                                    Pour détailler une catégorie sans casser le
                                    fil de lecture principal.
                                </p>
                            </header>

                            <div className={styles.listCanvas}>
                                <LRZDocList>
                                    <li>
                                        <span className={styles.nestedLabel}>
                                            Naturaliste
                                        </span>
                                        <ul>
                                            <li>Faune</li>
                                            <li>Flore</li>
                                            <li>Milieux ligériens</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={styles.nestedLabel}>
                                            Patrimoine
                                        </span>
                                        <ul>
                                            <li>Châteaux</li>
                                            <li>Villages</li>
                                            <li>Savoir-faire</li>
                                        </ul>
                                    </li>
                                </LRZDocList>
                            </div>
                        </article>
                    </div>
                </section>

                <DocMarkdownSyntax
                    title="Écrire une liste"
                    description="Une ligne par élément, avec un tiret pour une liste à puces ou un chiffre suivi d’un point pour une séquence ordonnée."
                    code={
                        "- Observer le territoire\n- Collecter les récits\n- Partager le Codex\n\n1. Importer le composant\n2. Déclarer le mapping\n3. Rédiger la page"
                    }
                    note="Le mapping remplace automatiquement les nœuds ul et ol générés par React Markdown par LRZDocList."
                />

                <section
                    className={styles.integration}
                    aria-labelledby="doc-list-integration-title"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>React Markdown</p>

                        <h2 id="doc-list-integration-title">
                            Intégration automatique dans les pages
                        </h2>

                        <p>
                            Les balises <code>ul</code> et <code>ol</code>{" "}
                            générées depuis le Markdown sont directement
                            remplacées par le composant.
                        </p>
                    </div>

                    <LRZDocCodeBlock
                        language="tsx"
                        filename="markdownComponents.tsx"
                    >
                        <code className="language-tsx">{`ul: ({ children, ...props }) => (
    <LRZDocList {...props}>
        {children}
    </LRZDocList>
),

ol: ({ children, ...props }) => (
    <LRZDocList ordered {...props}>
        {children}
    </LRZDocList>
),`}</code>
                    </LRZDocCodeBlock>
                </section>

                <section
                    className={styles.props}
                    aria-labelledby="doc-list-props-title"
                >
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>

                        <h2 id="doc-list-props-title">Props</h2>

                        <p>
                            Une API volontairement légère, avec les attributs
                            natifs des listes HTML toujours disponibles.
                        </p>
                    </div>

                    <div className={styles.tableScroll}>
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
            </div>
        </>
    );
}
