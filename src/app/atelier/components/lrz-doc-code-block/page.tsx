import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZDocCodeBlock from "@/components/_ui/LRZDocCodeBlock";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import DocMarkdownSyntax from "@/components/_atelier/DocMarkdownSyntax";

import styles from "../lrz-doc-code.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-doc-code-block",
);

const EXAMPLES = [
    {
        title: "TypeScript",
        description:
            "Présentation d’un type ou d’un exemple d’intégration dans l’application.",
        language: "ts",
        filename: "src/types/chateau.ts",
        code: `export type ChateauRenommee =
    | "phare"
    | "majeur"
    | "notable"
    | "confidentiel";

export interface Chateau {
    slug: string;
    nom: string;
    renommee: ChateauRenommee;
}`,
    },
    {
        title: "JSON",
        description:
            "Réponse structurée provenant d’un endpoint public du Codex.",
        language: "json",
        filename: "GET /api/v1/chateaux/chambord",
        code: `{
    "slug": "chambord",
    "nom": "Château de Chambord",
    "epoque": "Renaissance",
    "renommee": "phare"
}`,
    },
    {
        title: "Commande shell",
        description: "Appel rapide de l’API depuis un terminal ou un script.",
        language: "bash",
        filename: "Terminal",
        code: `curl "https://codex.loireridezen.fr/api/v1/chateaux?epoque=Renaissance"`,
    },
    {
        title: "CSS",
        description:
            "Extrait d’un composant utilisant les variables du Design Book.",
        language: "css",
        filename: "component.module.css",
        code: `.card {
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-lg);
    background: var(--color-ambiance-surface);
}`,
    },
] as const;

const PROPS = [
    {
        name: "children",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description:
            "Élément code contenant le texte brut à coloriser avec Shiki.",
    },
    {
        name: "language",
        type: "string",
        required: "Non",
        defaultValue: "Classe Markdown",
        description:
            "Langage Shiki explicite. Il est sinon extrait d’une classe comme language-ts.",
    },
    {
        name: "filename",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Nom du fichier, de la commande ou de l’endpoint affiché dans le header.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Classe externe appliquée à la racine du composant.",
    },
    {
        name: "id",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description:
            "Identifiant HTML facultatif, notamment pour créer une ancre.",
    },
    {
        name: "title",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Titre HTML natif appliqué à la racine du bloc.",
    },
] as const;

const mainExample = `const response = await fetch(
    "/api/v1/faune?rarete=rare",
);

const species = await response.json();

console.log(species.meta.total);`;

export default function LRZDocCodeBlockPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-doc-code-block" />

            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Documentation UI
                    </p>

                    <h1 className={styles.title}>LRZDocCodeBlock</h1>

                    <p className={styles.lede}>
                        Un bloc de code destiné aux guides techniques et à la
                        documentation de l’API. La coloration est produite côté
                        serveur par Shiki, tandis que le bouton de copie reste
                        une petite île interactive côté client.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="code-block-main-title"
                >
                    <div className={styles.mainExampleText}>
                        <p className={styles.kicker}>Exemple principal</p>

                        <h2 id="code-block-main-title">
                            Un extrait immédiatement exploitable
                        </h2>

                        <p>
                            Le langage et le nom du fichier apparaissent dans le
                            header. Le code brut reste disponible pour le bouton
                            de copie.
                        </p>
                    </div>

                    <div className={styles.codePreview}>
                        <LRZDocCodeBlock
                            language="ts"
                            filename="src/lib/get-faune.ts"
                        >
                            <code className="language-ts">{mainExample}</code>
                        </LRZDocCodeBlock>
                    </div>
                </section>

                <section
                    className={styles.examplesSection}
                    aria-labelledby="code-block-examples-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Langages</p>

                        <h2 id="code-block-examples-title">
                            Exemples d’utilisation
                        </h2>

                        <p>
                            Le composant accepte les principaux langages utiles
                            à la documentation du Codex et retombe sur du texte
                            brut lorsqu’un langage n’est pas reconnu.
                        </p>
                    </header>

                    <div className={styles.examplesGrid}>
                        {EXAMPLES.map((example) => (
                            <article
                                className={styles.example}
                                key={example.title}
                            >
                                <header className={styles.exampleHeader}>
                                    <h3>{example.title}</h3>
                                    <p>{example.description}</p>
                                </header>

                                <LRZDocCodeBlock
                                    language={example.language}
                                    filename={example.filename}
                                >
                                    <code
                                        className={`language-${example.language}`}
                                    >
                                        {example.code}
                                    </code>
                                </LRZDocCodeBlock>
                            </article>
                        ))}
                    </div>
                </section>

                <DocMarkdownSyntax
                    title="Écrire un bloc de code"
                    description="Utilise trois accents graves, puis ajoute le langage après l’ouverture pour activer la coloration."
                    code={
                        "```ts\nconst chateaux = await getChateaux();\n\nconsole.log(chateaux.length);\n```"
                    }
                    note="Le mapping React Markdown transmet la classe language-ts au composant, qui choisit alors la coloration adaptée."
                />

                <section
                    className={styles.integration}
                    aria-labelledby="code-block-integration-title"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>React Markdown</p>

                        <h2 id="code-block-integration-title">
                            Intégration dans la documentation
                        </h2>

                        <p>
                            Le composant reçoit le nœud <code>code</code> créé
                            par React Markdown et détecte automatiquement sa
                            classe de langage.
                        </p>
                    </div>

                    <LRZDocCodeBlock
                        language="tsx"
                        filename="markdownComponents.tsx"
                    >
                        <code className="language-tsx">{`pre: ({ children, ...props }) => (
    <LRZDocCodeBlock {...props}>
        {children}
    </LRZDocCodeBlock>
),`}</code>
                    </LRZDocCodeBlock>
                </section>

                <section
                    className={styles.props}
                    aria-labelledby="code-block-props-title"
                >
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>

                        <h2 id="code-block-props-title">Props</h2>

                        <p>
                            Le composant serveur prépare la coloration puis
                            transmet le HTML et le code brut à sa partie client.
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
