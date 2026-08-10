import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZDocCallout, {
    type LRZDocCalloutVariant,
} from "@/components/LRZDocCallout/LRZDocCallout";
import LRZDocCodeBlock from "@/components/LRZDocCodeBlock/LRZDocCodeBlock";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import DocMarkdownSyntax from "../DocMarkdownSyntax/DocMarkdownSyntax";
import styles from "../lrz-doc-list/lrz-doc-list.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-doc-callout",
);

const variants: {
    variant: LRZDocCalloutVariant;
    title: string;
    text: string;
}[] = [
    {
        variant: "info",
        title: "Information",
        text: "Situe une convention ou un repère utile.",
    },
    {
        variant: "tip",
        title: "Conseil",
        text: "Met en lumière une pratique à privilégier.",
    },
    {
        variant: "warning",
        title: "Attention",
        text: "Signale une limite avant une modification.",
    },
    {
        variant: "danger",
        title: "Important",
        text: "Réserve ce ton aux actions réellement risquées.",
    },
    {
        variant: "success",
        title: "Validé",
        text: "Confirme une étape ou une vérification réussie.",
    },
];

export default function LRZDocCalloutPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-doc-callout" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Documentation UI
                    </p>
                    <h1 className={styles.title}>LRZDocCallout</h1>
                    <p className={styles.lede}>
                        Un encart sémantique pour les repères, conseils et
                        alertes qui doivent rester visibles sans prendre le pas
                        sur le récit.
                    </p>
                </header>
                <section
                    className={styles.mainExample}
                    aria-labelledby="callout-title"
                >
                    <div className={styles.mainExampleText}>
                        <p className={styles.kicker}>Exemple principal</p>
                        <h2 id="callout-title">
                            Un repère qui ne coupe pas le fil
                        </h2>
                        <p>
                            Le ton info est le bon point de départ pour une
                            convention de contribution.
                        </p>
                    </div>
                    <div
                        className={`${styles.listCanvas} ${styles.listCanvasLarge}`}
                    >
                        <LRZDocCallout title="Repère de rédaction">
                            Préférez une information brève et actionnable. Un
                            callout complète le texte : il ne le remplace pas.
                        </LRZDocCallout>
                    </div>
                </section>
                <section
                    className={styles.examplesSection}
                    aria-labelledby="callout-variants"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="callout-variants">Cinq niveaux de signal</h2>
                        <p>
                            La couleur sert l’intention, jamais comme unique
                            porteuse de sens.
                        </p>
                    </header>
                    <div className={styles.examplesGrid}>
                        {variants.map((item) => (
                            <article
                                className={styles.example}
                                key={item.variant}
                            >
                                <header className={styles.exampleHeader}>
                                    <h3>{item.title}</h3>
                                    <code>
                                        variant=&quot;{item.variant}&quot;
                                    </code>
                                </header>
                                <div className={styles.listCanvas}>
                                    <LRZDocCallout variant={item.variant}>
                                        {item.text}
                                    </LRZDocCallout>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                <DocMarkdownSyntax
                    title="Écrire un callout"
                    description="Les callouts ne font pas partie du Markdown standard. Cette directive est une convention MDX qui nécessite remark-directive, ou le composant JSX dans un fichier MDX."
                    code={
                        ':::tip{title="Conseil de terrain"}\nPréparez une phrase courte et directement utile.\n:::'
                    }
                    note={
                        'Sans plugin de directives, utilise : <LRZDocCallout variant="tip">…</LRZDocCallout>.'
                    }
                />
                <section
                    className={styles.integration}
                    aria-labelledby="callout-mdx"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>MDX</p>
                        <h2 id="callout-mdx">Un composant explicite</h2>
                        <p>
                            La forme MDX est la plus directe lorsque le parser
                            de directives n’est pas configuré.
                        </p>
                    </div>
                    <LRZDocCodeBlock language="mdx" filename="guide.mdx">
                        <code className="language-mdx">
                            {
                                '<LRZDocCallout variant="tip" title="Conseil">\n  Préparez une phrase courte et directement utile.\n</LRZDocCallout>'
                            }
                        </code>
                    </LRZDocCodeBlock>
                </section>
            </div>
        </>
    );
}
