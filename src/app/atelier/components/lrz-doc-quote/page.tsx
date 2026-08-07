import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZDocCodeBlock from "@/components/LRZDocCodeBlock/LRZDocCodeBlock";
import LRZDocQuote, {
    type LRZDocQuoteVariant,
} from "@/components/LRZDocQuote/LRZDocQuote";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import DocMarkdownSyntax from "../DocMarkdownSyntax/DocMarkdownSyntax";

import styles from "./lrz-doc-quote.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-doc-quote");

const VARIANTS: ReadonlyArray<{
    title: string;
    description: string;
    variant: LRZDocQuoteVariant;
    label?: string;
    author?: string;
    source?: string;
    content: string;
}> = [
    {
        title: "Par défaut",
        description:
            "Une citation éditoriale sobre, intégrée naturellement au fil de la documentation.",
        variant: "default",
        author: "Loire Ride Zen",
        source: "Design Book",
        content:
            "Les couleurs de Loire Ride Zen ne cherchent pas à créer une identité visuelle. Elles cherchent à raconter un territoire.",
    },
    {
        title: "Mise en avant",
        description:
            "Une phrase manifeste ou une idée centrale qui mérite davantage d’espace.",
        variant: "highlight",
        label: "Manifeste",
        author: "Loire Ride Zen",
        source: "Palette Naturalist",
        content:
            "Le but n’est jamais de créer une palette tendance. Le but est de construire un vocabulaire chromatique fidèle au territoire.",
    },
    {
        title: "Note de terrain",
        description:
            "Une observation plus discrète, attachée à un lieu, une date ou une situation.",
        variant: "fieldNote",
        label: "Note de terrain",
        source: "Béhuard · Mai 2026",
        content:
            "Le niveau de la Loire révèle ici une bande de sable clair entre les saules et le courant principal.",
    },
    {
        title: "Témoignage",
        description:
            "Une parole humaine mise au centre, utile pour les retours, récits et impressions de voyage.",
        variant: "testimonial",
        author: "Un voyageur du fil",
        content:
            "On vient pour suivre la Loire. On repart avec l’impression qu’elle nous a observés passer.",
    },
] as const;

const PROPS = [
    {
        name: "children",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description:
            "Contenu principal de la citation, généralement un ou plusieurs paragraphes.",
    },
    {
        name: "variant",
        type: '"default" | "highlight" | "fieldNote" | "testimonial"',
        required: "Non",
        defaultValue: '"default"',
        description:
            "Détermine la tonalité visuelle et le niveau d’emphase de la citation.",
    },
    {
        name: "author",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description: "Auteur, personne ou entité à l’origine de la citation.",
    },
    {
        name: "source",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Ouvrage, page, lieu, date ou contexte affiché dans le figcaption.",
    },
    {
        name: "cite",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "URL sémantique transmise à l’attribut HTML cite du blockquote.",
    },
    {
        name: "label",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description: "Petit libellé éditorial affiché au-dessus du contenu.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Classe supplémentaire appliquée à la racine figure.",
    },
    {
        name: "…props",
        type: 'ComponentPropsWithoutRef<"blockquote">',
        required: "Non",
        defaultValue: "—",
        description: "Attributs HTML natifs transmis à l’élément blockquote.",
    },
] as const;

export default function LRZDocQuotePage() {
    return (
        <>
            <ComponentsNavigation current="lrz-doc-quote" />

            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Documentation UI
                    </p>

                    <h1 className={styles.title}>LRZDocQuote</h1>

                    <p className={styles.lede}>
                        Une citation dans la documentation ne doit pas seulement
                        interrompre la lecture. Elle doit ouvrir une fenêtre,
                        déposer une voix ou fixer une observation. Ce composant
                        couvre ces usages sans sacrifier la sémantique HTML.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="doc-quote-main-title"
                >
                    <div className={styles.mainExampleText}>
                        <p className={styles.kicker}>Exemple principal</p>

                        <h2 id="doc-quote-main-title">
                            Une citation qui donne de l’air au récit
                        </h2>

                        <p>
                            La variante par défaut s’intègre dans le fil d’une
                            page tout en conservant auteur, source et contexte.
                        </p>
                    </div>

                    <div
                        className={`${styles.quoteCanvas} ${styles.quoteCanvasLarge}`}
                    >
                        <LRZDocQuote
                            author="Loire Ride Zen"
                            source="Design Book"
                        >
                            <p>
                                Les couleurs de Loire Ride Zen ne cherchent pas
                                à créer une identité visuelle. Elles cherchent à
                                raconter un territoire.
                            </p>
                        </LRZDocQuote>
                    </div>
                </section>

                <section
                    className={styles.examplesSection}
                    aria-labelledby="doc-quote-variants-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>

                        <h2 id="doc-quote-variants-title">
                            Quatre voix éditoriales
                        </h2>

                        <p>
                            Chaque variante adapte le niveau d’emphase, la
                            typographie et la couleur d’accent au rôle du texte.
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

                                <div className={styles.quoteCanvas}>
                                    <LRZDocQuote
                                        author={example.author}
                                        label={example.label}
                                        source={example.source}
                                        variant={example.variant}
                                    >
                                        <p>{example.content}</p>
                                    </LRZDocQuote>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.examplesSection}
                    aria-labelledby="doc-quote-content-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Contenu riche</p>

                        <h2 id="doc-quote-content-title">
                            Paragraphes, emphase et liens
                        </h2>

                        <p>
                            Le contenu accepte du Markdown riche. Le composant
                            garde un rythme cohérent même lorsque la citation
                            dépasse une simple phrase.
                        </p>
                    </header>

                    <div className={styles.examplesGrid}>
                        <article className={styles.example}>
                            <header className={styles.exampleHeader}>
                                <h3>Plusieurs paragraphes</h3>
                                <p>
                                    Pour une réflexion plus longue ou un extrait
                                    de carnet.
                                </p>
                            </header>

                            <div className={styles.quoteCanvas}>
                                <LRZDocQuote
                                    label="Carnet de conception"
                                    author="Julien Julien"
                                >
                                    <p>
                                        Une application ne se traverse jamais
                                        une seule fois.
                                    </p>
                                    <p>
                                        On y revient, on s’y installe, on la
                                        quitte, puis on la retrouve.
                                    </p>
                                </LRZDocQuote>
                            </div>
                        </article>

                        <article className={styles.example}>
                            <header className={styles.exampleHeader}>
                                <h3>Source sémantique</h3>
                                <p>
                                    L’attribut <code>cite</code> reste
                                    disponible pour associer une URL à la
                                    citation.
                                </p>
                            </header>

                            <div className={styles.quoteCanvas}>
                                <LRZDocQuote
                                    variant="fieldNote"
                                    label="Archive"
                                    author="Loire Ride Zen"
                                    source="Journal du projet"
                                    cite="https://loireridezen.link"
                                >
                                    <p>
                                        Le Codex est une encyclopédie vivante de
                                        la Loire, nourrie par les rencontres du
                                        terrain.
                                    </p>
                                </LRZDocQuote>

                                <div className={styles.quoteMeta}>
                                    <span>
                                        Attribut HTML :{" "}
                                        <code>
                                            cite=&quot;https://loireridezen.link&quot;
                                        </code>
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <DocMarkdownSyntax
                    title="Écrire une citation"
                    description="Place un chevron au début de chaque ligne citée. La source et l’auteur sont ensuite enrichis dans le contenu ou par la couche MDX."
                    code={"> La Loire ne se traverse pas seulement : elle donne le rythme.\n>\n> — Carnet de route, Béhuard"}
                    note="React Markdown produit un blockquote que le mapping enveloppe dans LRZDocQuote."
                />

                <section
                    className={styles.integration}
                    aria-labelledby="doc-quote-integration-title"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>React Markdown</p>

                        <h2 id="doc-quote-integration-title">
                            Remplacer les citations Markdown natives
                        </h2>

                        <p>
                            Les balises <code>blockquote</code> générées par
                            React Markdown peuvent être automatiquement
                            enveloppées dans le composant.
                        </p>
                    </div>

                    <LRZDocCodeBlock
                        language="tsx"
                        filename="markdownComponents.tsx"
                    >
                        <code className="language-tsx">{`blockquote: ({ children, ...props }) => (
    <LRZDocQuote {...props}>
        {children}
    </LRZDocQuote>
),`}</code>
                    </LRZDocCodeBlock>
                </section>

                <section
                    className={styles.props}
                    aria-labelledby="doc-quote-props-title"
                >
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>

                        <h2 id="doc-quote-props-title">Props</h2>

                        <p>
                            Une API éditoriale légère, appuyée sur les éléments
                            sémantiques <code>figure</code>,{" "}
                            <code>blockquote</code>, <code>figcaption</code> et{" "}
                            <code>cite</code>.
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
