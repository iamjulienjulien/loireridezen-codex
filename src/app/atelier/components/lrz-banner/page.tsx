import { BarChart3, Compass, Info } from "lucide-react";
import Link from "next/link";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import { LRZBanner } from "@/components/_ui/LRZBanner";
import { LRZButton } from "@/components/_ui/LRZButton";
import { getAtelierPageMetadata } from "@/lib/atelier-metadata";

import LRZBannerPlayground from "./LRZBannerPlayground";
import styles from "./lrz-banner.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-banner",
);

const TONES = [
    {
        tone: "surface" as const,
        color: "eau" as const,
        icon: <Info />,
        eyebrow: "Information",
        title: "Le niveau de la Loire évolue",
        description:
            "Une surface nette pour un message utile qui accompagne la consultation.",
    },
    {
        tone: "soft" as const,
        color: "prairie" as const,
        icon: <Compass />,
        eyebrow: "Suggestion",
        title: "Poursuivre l’exploration",
        description:
            "Un fond légèrement teinté pour proposer un détour sans interrompre le récit.",
    },
    {
        tone: "contrast" as const,
        color: "ambre" as const,
        icon: <BarChart3 />,
        eyebrow: "Préférences",
        title: "Aider le Codex à mieux suivre son cours",
        description:
            "Un contraste plus affirmé pour une décision persistante et clairement identifiable.",
    },
] as const;

const PROPS = [
    {
        name: "title",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description: "Titre visible qui nomme la bannière.",
    },
    {
        name: "children",
        type: "ReactNode",
        required: "Oui",
        defaultValue: "—",
        description: "Contenu principal, généralement un texte court.",
    },
    {
        name: "actions",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description: "Zone libre pour les actions, souvent des LRZButton.",
    },
    {
        name: "eyebrow",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description: "Sur-titre court qui contextualise le message.",
    },
    {
        name: "icon",
        type: "ReactNode",
        required: "Non",
        defaultValue: "undefined",
        description: "Icône décorative masquée aux lecteurs d’écran.",
    },
    {
        name: "tone",
        type: '"surface" | "soft" | "contrast"',
        required: "Non",
        defaultValue: '"surface"',
        description: "Niveau de présence et de contraste de la surface.",
    },
    {
        name: "position",
        type: '"inline" | "fixed-bottom"',
        required: "Non",
        defaultValue: '"inline"',
        description: "Place la bannière dans le flux ou au bas du viewport.",
    },
    {
        name: "color",
        type: "LRZColor",
        required: "Non",
        defaultValue: '"ocre"',
        description: "Couleur d’accent issue du registre Loire Ride Zen.",
    },
    {
        name: "customColor",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Couleur CSS libre, prioritaire sur color.",
    },
    {
        name: "titleAs",
        type: '"h2" | "h3" | "h4" | "h5" | "h6"',
        required: "Non",
        defaultValue: '"h2"',
        description: "Niveau HTML du titre visible.",
    },
    {
        name: "titleId",
        type: "string",
        required: "Non",
        defaultValue: "useId()",
        description: "Identifiant du titre ; généré automatiquement si absent.",
    },
    {
        name: "ariaLabelledby",
        type: "string",
        required: "Non",
        defaultValue: "titleId",
        description: "Identifiant alternatif qui fournit le nom accessible.",
    },
    {
        name: "className",
        type: "string",
        required: "Non",
        defaultValue: "undefined",
        description: "Classe externe pour adapter l’intégration.",
    },
    {
        name: "style",
        type: "CSSProperties",
        required: "Non",
        defaultValue: "undefined",
        description: "Styles inline additionnels appliqués à la section.",
    },
    {
        name: "…sectionProps",
        type: 'ComponentPropsWithoutRef<"section">',
        required: "Non",
        defaultValue: "—",
        description: "Attributs HTML natifs compatibles avec une section.",
    },
] as const;

export default function LRZBannerPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-banner" />

            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZBanner</h1>
                    <p className={styles.lede}>
                        Une bannière non modale pour présenter un message et ses
                        actions sans barrer le chemin du visiteur.
                    </p>
                </header>

                <section
                    className={styles.section}
                    aria-labelledby="banner-tones-title"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Tonalités</p>
                        <h2 id="banner-tones-title">
                            Trois niveaux de présence
                        </h2>
                        <p>
                            La couleur porte l’accent ; le ton règle la place
                            prise par le message dans la lecture.
                        </p>
                    </div>

                    <div className={styles.examples}>
                        {TONES.map((example) => (
                            <LRZBanner
                                key={example.tone}
                                title={example.title}
                                titleAs="h3"
                                eyebrow={example.eyebrow}
                                icon={example.icon}
                                tone={example.tone}
                                color={example.color}
                                actions={
                                    <LRZButton
                                        size="sm"
                                        variant={
                                            example.tone === "contrast"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        color={example.color}
                                    >
                                        En savoir plus
                                    </LRZButton>
                                }
                            >
                                <p>{example.description}</p>
                            </LRZBanner>
                        ))}
                    </div>
                </section>

                <LRZBannerPlayground />

                <section className={styles.props} aria-labelledby="props-title">
                    <div className={styles.propsHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="props-title">Props</h2>
                        <p>
                            La bannière fournit seulement une structure visuelle
                            et sémantique ; son contenu et ses actions restent
                            entièrement composables.
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

                <section
                    className={styles.section}
                    aria-labelledby="banner-consent-title"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Composition</p>
                        <h2 id="banner-consent-title">
                            Une future bannière de consentement
                        </h2>
                        <p>
                            Cet exemple illustre seulement l’interface : aucun
                            choix n’est mémorisé et aucun outil Analytics n’est
                            chargé dans cette page.
                        </p>
                    </div>

                    <div className={styles.stage}>
                        <LRZBanner
                            title="Aider le Codex à mieux suivre son cours"
                            titleAs="h3"
                            eyebrow="Mesure d’audience"
                            icon={<BarChart3 />}
                            tone="contrast"
                            color="ambre"
                            actions={
                                <>
                                    <LRZButton
                                        size="sm"
                                        variant="secondary"
                                        color="ambre"
                                    >
                                        Refuser
                                    </LRZButton>
                                    <LRZButton size="sm" color="ambre">
                                        Accepter
                                    </LRZButton>
                                </>
                            }
                        >
                            <p>
                                Avec votre accord, une mesure d’audience nous
                                aide à comprendre les pages explorées et à
                                améliorer les chemins du Codex.
                            </p>
                        </LRZBanner>
                    </div>

                    <pre className={styles.code}>
                        <code>{`<LRZBanner
    title="Aider le Codex à mieux suivre son cours"
    eyebrow="Mesure d’audience"
    icon={<BarChart3 />}
    tone="contrast"
    position="fixed-bottom"
    color="ambre"
    actions={actions}
>
    <p>Avec votre accord, une mesure d’audience…</p>
</LRZBanner>`}</code>
                    </pre>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="banner-guidance-title"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Usage</p>
                        <h2 id="banner-guidance-title">
                            Une présentation, jamais une décision métier
                        </h2>
                    </div>
                    <div className={styles.guidance}>
                        <p>
                            <strong>À faire :</strong> fournir un titre court,
                            des actions explicites et une couleur issue du
                            contexte.
                        </p>
                        <p>
                            <strong>À éviter :</strong> lire un cookie, charger
                            un script tiers ou enfermer le focus dans LRZBanner.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
