import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import { Route, ScrollText, Sparkles } from "lucide-react";

import {
    LRZCallout,
    LRZCalloutContent,
    LRZCalloutFooter,
    LRZCalloutHeader,
    type LRZCalloutAccent,
    type LRZCalloutTone,
} from "@/components/LRZCallout";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import styles from "./lrz-callout.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-callout",
);

const TONES: Array<{
    tone: LRZCalloutTone;
    title: string;
    description: string;
}> = [
    {
        tone: "soft",
        title: "Soft",
        description:
            "Un fond teinté pour une anecdote ou un conseil important.",
    },
    {
        tone: "surface",
        title: "Surface",
        description: "Une surface élevée pour un contenu plus structuré.",
    },
    {
        tone: "outline",
        title: "Outline",
        description: "Un cadre discret pour un repère secondaire.",
    },
];

const ACCENTS: Array<{
    accent: LRZCalloutAccent;
    title: string;
}> = [
    { accent: "start", title: "Liseré latéral" },
    { accent: "top", title: "Filet supérieur" },
    { accent: "none", title: "Sans accent" },
];

const PARTS = [
    {
        name: "LRZCalloutHeader",
        role: "Icône, sur-titre, titre et métadonnées.",
    },
    {
        name: "LRZCalloutContent",
        role: "Corps éditorial avec rythme typographique normalisé.",
    },
    {
        name: "LRZCalloutFooter",
        role: "Source, date, statut ou action secondaire discrète.",
    },
] as const;

export default function LRZCalloutPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-callout" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.pageTitle}>LRZCallout</h1>
                    <p className={styles.lede}>
                        Un encart éditorial pour faire émerger une anecdote, un
                        conseil ou un repère sans interrompre le récit.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="callout-main-example-title"
                >
                    <div className={styles.mainExamplePreview}>
                        <p className={styles.kicker}>Exemple principal</p>
                        <h2 id="callout-main-example-title">
                            Une information qui mérite un détour
                        </h2>
                        <p>
                            Le liseré et l’icône donnent le ton, tandis que la
                            surface reste liée à l’ambiance active.
                        </p>

                        <LRZCallout
                            color="miel"
                            ariaLabelledby="callout-demo-title"
                        >
                            <LRZCalloutHeader
                                eyebrow="L’anecdote"
                                icon={<ScrollText />}
                                title="Une première royale"
                                titleAs="h3"
                                titleId="callout-demo-title"
                            />
                            <LRZCalloutContent>
                                <p>
                                    En 1670, Molière présente Le Bourgeois
                                    gentilhomme devant Louis XIV à Chambord.
                                </p>
                            </LRZCalloutContent>
                            <LRZCalloutFooter>
                                Épisode documenté · 1670
                            </LRZCalloutFooter>
                        </LRZCallout>
                    </div>

                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZCallout color="miel">
    <LRZCalloutHeader
        eyebrow="L’anecdote"
        icon={<ScrollText />}
        title="Une première royale"
    />
    <LRZCalloutContent>
        <p>En 1670, Molière présente…</p>
    </LRZCalloutContent>
    <LRZCalloutFooter>
        Épisode documenté · 1670
    </LRZCalloutFooter>
</LRZCallout>`}</code>
                    </pre>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="callout-tones-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Surfaces</p>
                        <h2 id="callout-tones-title">
                            Trois niveaux de présence
                        </h2>
                        <p>
                            Le ton exprime la place du contenu dans la lecture,
                            indépendamment de sa couleur d’accent.
                        </p>
                    </header>

                    <div className={styles.toneGrid}>
                        {TONES.map((item) => (
                            <LRZCallout
                                key={item.tone}
                                as="div"
                                color="miel"
                                tone={item.tone}
                                accent="start"
                            >
                                <LRZCalloutHeader
                                    eyebrow={item.tone}
                                    icon={<Sparkles />}
                                    title={item.title}
                                />
                                <LRZCalloutContent>
                                    <p>{item.description}</p>
                                </LRZCalloutContent>
                            </LRZCallout>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="callout-accents-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Accent</p>
                        <h2 id="callout-accents-title">
                            Une ponctuation maîtrisée
                        </h2>
                        <p>
                            Le liseré latéral est le réglage éditorial par
                            défaut. Les autres positions répondent aux besoins
                            de composition.
                        </p>
                    </header>

                    <div className={styles.accentGrid}>
                        {ACCENTS.map((item) => (
                            <LRZCallout
                                key={item.accent}
                                as="div"
                                color="eau"
                                tone="outline"
                                accent={item.accent}
                                padding="sm"
                            >
                                <LRZCalloutHeader
                                    eyebrow={item.accent}
                                    title={item.title}
                                />
                            </LRZCallout>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="callout-parts-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Anatomie</p>
                        <h2 id="callout-parts-title">
                            Trois zones facultatives
                        </h2>
                    </header>

                    <div className={styles.partsGrid}>
                        {PARTS.map((part) => (
                            <article className={styles.part} key={part.name}>
                                <h3>{part.name}</h3>
                                <p>{part.role}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <aside className={styles.accessibility}>
                    <Route aria-hidden="true" />
                    <div>
                        <p className={styles.kicker}>Garde-fou</p>
                        <h2>Un repère éditorial, pas une alerte</h2>
                        <p>
                            La racine est un <code>aside</code> par défaut. Le
                            titre doit être relié avec{" "}
                            <code>ariaLabelledby</code>. Pour une erreur urgente
                            ou une annonce dynamique, utiliser un composant de
                            feedback dédié.
                        </p>
                    </div>
                </aside>
            </div>
        </>
    );
}
