import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZDocCodeInline from "@/components/_ui/LRZDocCodeInline";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import DocMarkdownSyntax from "@/components/_atelier/DocMarkdownSyntax";

import styles from "../lrz-doc-code.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-doc-code-inline",
);

const EXAMPLES = [
    {
        title: "Nom de prop",
        content: "renommee",
        sentence: (
            <>
                Utilisez la propriété{" "}
                <LRZDocCodeInline>renommee</LRZDocCodeInline> pour filtrer les
                châteaux selon leur importance éditoriale.
            </>
        ),
    },
    {
        title: "Valeur",
        content: '"phare"',
        sentence: (
            <>
                La valeur <LRZDocCodeInline>&quot;phare&quot;</LRZDocCodeInline>{" "}
                identifie les monuments majeurs du fil ligérien.
            </>
        ),
    },
    {
        title: "Endpoint",
        content: "/api/v1/faune",
        sentence: (
            <>
                La collection est disponible depuis{" "}
                <LRZDocCodeInline>/api/v1/faune</LRZDocCodeInline>.
            </>
        ),
    },
    {
        title: "Commande",
        content: "pnpm dev",
        sentence: (
            <>
                Lancez le serveur local avec{" "}
                <LRZDocCodeInline>pnpm dev</LRZDocCodeInline>.
            </>
        ),
    },
    {
        title: "Type TypeScript",
        content: "ChateauRenommee",
        sentence: (
            <>
                Le champ repose sur le type{" "}
                <LRZDocCodeInline>ChateauRenommee</LRZDocCodeInline>.
            </>
        ),
    },
    {
        title: "Variable CSS",
        content: "--color-nature-prairie",
        sentence: (
            <>
                La prairie est exposée par la variable{" "}
                <LRZDocCodeInline>--color-nature-prairie</LRZDocCodeInline>.
            </>
        ),
    },
] as const;

const PROPS = [
    {
        name: "children",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Contenu technique affiché au fil du texte dans l’élément code.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Classe externe fusionnée avec le style interne du composant.",
    },
    {
        name: "title",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Infobulle HTML native facultative.",
    },
    {
        name: "aria-label",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Libellé accessible lorsqu’un fragment technique nécessite davantage de contexte.",
    },
] as const;

export default function LRZDocCodeInlinePage() {
    return (
        <>
            <ComponentsNavigation current="lrz-doc-code-inline" />

            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Documentation UI
                    </p>

                    <h1 className={styles.title}>LRZDocCodeInline</h1>

                    <p className={styles.lede}>
                        Un fragment de code compact pour insérer une propriété,
                        une valeur, un endpoint ou une commande directement dans
                        une phrase sans briser le courant de la lecture.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="inline-main-example-title"
                >
                    <div className={styles.mainExampleText}>
                        <p className={styles.kicker}>Exemple principal</p>

                        <h2 id="inline-main-example-title">
                            Une balise technique dans le récit
                        </h2>

                        <p>
                            Le composant conserve la hauteur de ligne du
                            paragraphe, tout en donnant au fragment une présence
                            suffisamment nette.
                        </p>
                    </div>

                    <div
                        className={`${styles.inlineCanvas} ${styles.inlineCanvasLarge}`}
                    >
                        <p>
                            Interrogez{" "}
                            <LRZDocCodeInline>
                                /api/v1/chateaux
                            </LRZDocCodeInline>{" "}
                            avec le paramètre{" "}
                            <LRZDocCodeInline>
                                epoque=Renaissance
                            </LRZDocCodeInline>
                            .
                        </p>
                    </div>
                </section>

                <section
                    className={styles.examplesSection}
                    aria-labelledby="inline-examples-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Dans le texte</p>

                        <h2 id="inline-examples-title">
                            Exemples d’utilisation
                        </h2>

                        <p>
                            Le même composant couvre les fragments les plus
                            courts comme les identifiants plus longs.
                        </p>
                    </header>

                    <div className={styles.inlineExamplesGrid}>
                        {EXAMPLES.map((example) => (
                            <article
                                className={styles.inlineExample}
                                key={example.title}
                            >
                                <header className={styles.exampleHeader}>
                                    <h3>{example.title}</h3>
                                    <code>{example.content}</code>
                                </header>

                                <div className={styles.inlineCanvas}>
                                    <p>{example.sentence}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <DocMarkdownSyntax
                    title="Écrire du code dans une phrase"
                    description="Entoure un fragment technique d’un accent grave : propriété, commande, valeur ou endpoint."
                    code={
                        "Utilisez `renommee=phare` pour limiter les résultats.\n\nL’endpoint est `/api/v1/chateaux`."
                    }
                    note="Les blocs délimités par trois accents graves restent des blocs de code et sont confiés à LRZDocCodeBlock."
                />

                <section
                    className={styles.integration}
                    aria-labelledby="inline-markdown-title"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>React Markdown</p>

                        <h2 id="inline-markdown-title">
                            Détection du code inline
                        </h2>

                        <p>
                            Les blocs possèdent une classe{" "}
                            <LRZDocCodeInline>language-*</LRZDocCodeInline>. Les
                            autres nœuds <code>code</code> peuvent donc être
                            confiés directement au composant inline.
                        </p>
                    </div>

                    <div className={styles.mappingExample}>
                        <pre>
                            <code>{`code: ({ children, className, ...props }) => {
    const isCodeBlock =
        className?.startsWith("language-");

    if (isCodeBlock) {
        return (
            <code className={className} {...props}>
                {children}
            </code>
        );
    }

    return (
        <LRZDocCodeInline
            className={className}
            {...props}
        >
            {children}
        </LRZDocCodeInline>
    );
},`}</code>
                        </pre>
                    </div>
                </section>

                <section
                    className={styles.props}
                    aria-labelledby="inline-props-title"
                >
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>

                        <h2 id="inline-props-title">Props</h2>

                        <p>
                            Le composant hérite des attributs standards d’un
                            élément HTML <code>code</code>.
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
