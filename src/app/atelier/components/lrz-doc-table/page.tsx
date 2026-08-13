import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZDocCodeBlock from "@/components/_ui/LRZDocCodeBlock/LRZDocCodeBlock";
import LRZDocTable, {
    type LRZDocTableVariant,
} from "@/components/_ui/LRZDocTable/LRZDocTable";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import DocMarkdownSyntax from "@/components/_atelier/DocMarkdownSyntax";
import styles from "../lrz-doc-list/lrz-doc-list.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-doc-table",
);

const variants: LRZDocTableVariant[] = [
    "default",
    "compact",
    "striped",
    "comparison",
];

function Example({ variant }: { variant: LRZDocTableVariant }) {
    return (
        <LRZDocTable
            title="Rythmes de lecture"
            description="Une lecture rapide des variantes de documentation."
            emphasizeFirstColumn
            variant={variant}
        >
            <table>
                <thead>
                    <tr>
                        <th scope="col">Format</th>
                        <th scope="col">Usage</th>
                        <th scope="col">Intensité</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Repère</th>
                        <td>Information locale</td>
                        <td>Douce</td>
                    </tr>
                    <tr>
                        <th scope="row">Inventaire</th>
                        <td>Référence exhaustive</td>
                        <td>Forte</td>
                    </tr>
                </tbody>
            </table>
        </LRZDocTable>
    );
}

export default function LRZDocTablePage() {
    return (
        <>
            <ComponentsNavigation current="lrz-doc-table" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Documentation UI
                    </p>
                    <h1 className={styles.title}>LRZDocTable</h1>
                    <p className={styles.lede}>
                        Un conteneur de table sémantique, défilable et lisible
                        sur petit écran pour les références, inventaires et
                        comparaisons du Codex.
                    </p>
                </header>
                <section
                    className={styles.mainExample}
                    aria-labelledby="table-title"
                >
                    <div className={styles.mainExampleText}>
                        <p className={styles.kicker}>Exemple principal</p>
                        <h2 id="table-title">Une table qui reste praticable</h2>
                        <p>
                            Le conteneur garde la table HTML et ajoute un
                            défilement horizontal accessible.
                        </p>
                    </div>
                    <div className={styles.listCanvas}>
                        <Example variant="default" />
                    </div>
                </section>
                <section
                    className={styles.examplesSection}
                    aria-labelledby="table-variants"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="table-variants">
                            Quatre lectures de la donnée
                        </h2>
                        <p>
                            Le balisage reste le même ; seule la densité
                            visuelle change.
                        </p>
                    </header>
                    <div className={styles.examplesGrid}>
                        {variants.map((variant) => (
                            <article className={styles.example} key={variant}>
                                <header className={styles.exampleHeader}>
                                    <h3>{variant}</h3>
                                    <code>variant=&quot;{variant}&quot;</code>
                                </header>
                                <div className={styles.listCanvas}>
                                    <Example variant={variant} />
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                <DocMarkdownSyntax
                    title="Écrire un tableau"
                    description="Utilise la syntaxe GitHub Flavored Markdown et active remark-gfm dans React Markdown pour produire les nœuds table."
                    code={
                        "| Format | Usage | Intensité |\n| --- | --- | --- |\n| Repère | Information locale | Douce |\n| Inventaire | Référence exhaustive | Forte |"
                    }
                    note="Le mapping enveloppe le nœud table dans LRZDocTable ; les éléments HTML internes restent natifs."
                />
                <section
                    className={styles.integration}
                    aria-labelledby="table-mapping"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>React Markdown</p>
                        <h2 id="table-mapping">Encadrer la table native</h2>
                        <p>
                            La structure reste sémantique et reçoit seulement
                            son cadre de lecture.
                        </p>
                    </div>
                    <LRZDocCodeBlock
                        language="tsx"
                        filename="markdownComponents.tsx"
                    >
                        <code className="language-tsx">
                            {
                                "table: ({ children, ...props }) => (\n  <LRZDocTable {...props}>{children}</LRZDocTable>\n),"
                            }
                        </code>
                    </LRZDocCodeBlock>
                </section>
            </div>
        </>
    );
}
