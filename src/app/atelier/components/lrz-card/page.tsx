import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import { Castle, MapPin } from "lucide-react";

import LRZBadge from "@/components/LRZBadge/LRZBadge";
import {
    LRZCard,
    LRZCardContent,
    LRZCardFooter,
    LRZCardHeader,
    LRZCardMedia,
    type LRZCardAccent,
    type LRZCardTone,
} from "@/components/LRZCard";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZCardPlayground from "./LRZCardPlayground";
import styles from "./LRZCardPlayground.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-card");

const TONES: Array<{
    tone: LRZCardTone;
    title: string;
    description: string;
}> = [
    {
        tone: "surface",
        title: "Surface",
        description:
            "La carte standard avec fond, bordure et ombre du design system.",
    },
    {
        tone: "soft",
        title: "Soft",
        description:
            "Une surface légèrement teintée pour les contenus contextuels.",
    },
    {
        tone: "outline",
        title: "Outline",
        description:
            "Un cadre transparent adapté aux sections déjà matérialisées.",
    },
    {
        tone: "transparent",
        title: "Transparent",
        description:
            "La structure éditoriale sans ajouter de nouvelle surface.",
    },
];

const ACCENTS: Array<{
    accent: LRZCardAccent;
    title: string;
    description: string;
}> = [
    {
        accent: "top",
        title: "Corniche",
        description: "Le filet supérieur utilisé par les collections.",
    },
    {
        accent: "start",
        title: "Liseré",
        description: "Le bord logique utilisé par les fiches naturalistes.",
    },
    {
        accent: "none",
        title: "Sans accent",
        description:
            "Une surface neutre laissant le contenu prendre le relais.",
    },
];

const ROOT_PROPS = [
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Contenu libre ou sous-composants LRZCard.",
    },
    {
        name: "as",
        type: "ElementType",
        defaultValue: '"article"',
        description: "Élément HTML ou composant utilisé comme racine.",
    },
    {
        name: "color",
        type: "LRZColor",
        defaultValue: '"ocre"',
        description: "Couleur de l’accent et des surfaces teintées.",
    },
    {
        name: "tone",
        type: '"surface" | "soft" | "outline" | "transparent"',
        defaultValue: '"surface"',
        description: "Traitement visuel de la surface.",
    },
    {
        name: "accent",
        type: '"none" | "top" | "start"',
        defaultValue: '"top"',
        description: "Position du filet décoratif.",
    },
    {
        name: "padding",
        type: '"none" | "sm" | "md" | "lg"',
        defaultValue: '"none"',
        description:
            "Espacement de la racine, notamment pour un contenu entièrement personnalisé.",
    },
    {
        name: "elevation",
        type: '"none" | "card" | "raised"',
        defaultValue: '"card"',
        description: "Niveau d’ombre de la carte.",
    },
    {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        defaultValue: '"vertical"',
        description: "Organisation principale de la carte.",
    },
    {
        name: "equalHeight",
        type: "boolean",
        defaultValue: "false",
        description: "Étire la carte à la hauteur disponible dans une grille.",
    },
    {
        name: "id",
        type: "string",
        defaultValue: "undefined",
        description: "Identifiant HTML de la carte.",
    },
    {
        name: "ariaLabel",
        type: "string",
        defaultValue: "undefined",
        description:
            "Nom accessible lorsque la carte n’a pas de titre visible.",
    },
    {
        name: "ariaLabelledby",
        type: "string",
        defaultValue: "undefined",
        description: "Identifiant du titre visible qui nomme la carte.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Classe additionnelle de la racine.",
    },
    {
        name: "style",
        type: "CSSProperties",
        defaultValue: "undefined",
        description: "Styles additionnels de la racine.",
    },
] as const;

const PARTS = [
    {
        name: "LRZCardMedia",
        props: "ratio, bleed, className",
        role: "Image, illustration, carte ou autre contenu visuel.",
    },
    {
        name: "LRZCardHeader",
        props: "eyebrow, title, titleAs, description, icon, metadata, action",
        role: "En-tête éditorial et hiérarchie du titre.",
    },
    {
        name: "LRZCardContent",
        props: "children, padding, className",
        role: "Corps principal de la carte.",
    },
    {
        name: "LRZCardFooter",
        props: "children, align, divided, className",
        role: "Actions, statut ou métadonnées terminales.",
    },
] as const;

export default function LRZCardPage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-card" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>

                    <h1 className={styles.pageTitle}>LRZCard</h1>

                    <p className={styles.lede}>
                        Une primitive de surface et de composition. Elle donne
                        aux cartes du Codex un cadre commun sans absorber leurs
                        données ni leur personnalité métier.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="card-main-example-title"
                >
                    <div className={styles.mainExamplePreview}>
                        <p className={styles.kicker}>Exemple principal</p>
                        <h2 id="card-main-example-title">
                            Une grammaire, plusieurs récits
                        </h2>
                        <p>
                            Les zones sont facultatives et peuvent accueillir
                            librement les autres composants LRZ.
                        </p>

                        <LRZCard color="ocre">
                            <LRZCardMedia ratio="wide">
                                <div className={styles.demoLandscape}>
                                    <span aria-hidden="true">🏰</span>
                                    <small>Val de Loire</small>
                                </div>
                            </LRZCardMedia>

                            <LRZCardHeader
                                eyebrow="Patrimoine"
                                title="Château de Saumur"
                                description="Une silhouette princière dominant la Loire."
                                icon={<Castle />}
                                metadata={
                                    <LRZBadge label="Médiéval" color="brun" />
                                }
                            />

                            <LRZCardContent>
                                <p>
                                    Forteresse, résidence et château de conte :
                                    la pierre accompagne ici le fleuve depuis
                                    près de dix siècles.
                                </p>
                            </LRZCardContent>

                            <LRZCardFooter divided>
                                <span className={styles.location}>
                                    <MapPin aria-hidden="true" />
                                    Saumur
                                </span>
                                <span className={styles.fakeLink}>
                                    Découvrir <span aria-hidden="true">→</span>
                                </span>
                            </LRZCardFooter>
                        </LRZCard>
                    </div>

                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZCard color="ocre">
    <LRZCardMedia ratio="wide">
        <Image src={image} alt="" fill />
    </LRZCardMedia>

    <LRZCardHeader
        eyebrow="Patrimoine"
        title="Château de Saumur"
        description="Une silhouette princière."
    />

    <LRZCardContent>
        <p>…</p>
    </LRZCardContent>

    <LRZCardFooter divided>
        …
    </LRZCardFooter>
</LRZCard>`}</code>
                    </pre>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="card-tones-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Surfaces</p>
                        <h2 id="card-tones-title">Quatre tonalités</h2>
                        <p>
                            La tonalité définit la présence visuelle de la
                            carte, indépendamment de sa composition.
                        </p>
                    </header>

                    <div className={styles.toneGrid}>
                        {TONES.map((item) => (
                            <LRZCard
                                key={item.tone}
                                tone={item.tone}
                                color="eau"
                                elevation={
                                    item.tone === "transparent"
                                        ? "none"
                                        : "card"
                                }
                            >
                                <LRZCardHeader
                                    eyebrow={item.tone}
                                    title={item.title}
                                    description={item.description}
                                />
                            </LRZCard>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="card-accents-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Identité</p>
                        <h2 id="card-accents-title">Position de l’accent</h2>
                    </header>

                    <div className={styles.accentGrid}>
                        {ACCENTS.map((item) => (
                            <LRZCard
                                key={item.accent}
                                accent={item.accent}
                                color="prairie"
                                elevation="none"
                            >
                                <LRZCardHeader
                                    title={item.title}
                                    description={item.description}
                                />
                            </LRZCard>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.referenceSection}
                    aria-labelledby="card-orientation-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Composition</p>
                        <h2 id="card-orientation-title">
                            Verticale ou horizontale
                        </h2>
                        <p>
                            La composition horizontale revient naturellement à
                            une pile verticale sur les petits écrans.
                        </p>
                    </header>

                    <div className={styles.orientationExamples}>
                        <LRZCard color="brique">
                            <LRZCardHeader
                                eyebrow="Vertical"
                                title="Récit patrimonial"
                                description="La composition standard des cartes éditoriales."
                            />
                            <LRZCardContent>
                                <p>
                                    Le contenu se déploie naturellement du haut
                                    vers le bas.
                                </p>
                            </LRZCardContent>
                        </LRZCard>

                        <LRZCard
                            orientation="horizontal"
                            color="ardoise"
                            elevation="none"
                        >
                            <LRZCardMedia ratio="square">
                                <div className={styles.demoSquare}>
                                    <span aria-hidden="true">🌿</span>
                                </div>
                            </LRZCardMedia>
                            <LRZCardHeader
                                eyebrow="Horizontal"
                                title="Entrée compacte"
                                description="Adaptée aux résultats et aux classements."
                            />
                            <LRZCardContent>
                                <p>Une lecture rapide et structurée.</p>
                            </LRZCardContent>
                        </LRZCard>
                    </div>
                </section>

                <LRZCardPlayground />

                <section
                    className={styles.referenceSection}
                    aria-labelledby="card-parts-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Anatomie</p>
                        <h2 id="card-parts-title">Sous-composants</h2>
                        <p>
                            Chaque zone est facultative, réordonnable et
                            remplaçable par un contenu personnalisé.
                        </p>
                    </header>

                    <div className={styles.partsGrid}>
                        {PARTS.map((part) => (
                            <article className={styles.part} key={part.name}>
                                <h3>{part.name}</h3>
                                <p>{part.role}</p>
                                <code>{part.props}</code>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.propsSection}
                    aria-labelledby="card-props-title"
                >
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2 id="card-props-title">Props de LRZCard</h2>
                    </header>

                    <div
                        className={styles.tableScroll}
                        role="region"
                        aria-label="Tableau des props de LRZCard"
                        tabIndex={0}
                    >
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
                                {ROOT_PROPS.map((prop) => (
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

                <aside className={styles.accessibility}>
                    <p className={styles.kicker}>Garde-fou</p>
                    <h2>Une surface n’est pas une interaction</h2>
                    <p>
                        `LRZCard` ne reçoit volontairement ni{" "}
                        <code>onClick</code> ni rôle interactif. Une destination
                        doit être exprimée par un vrai lien et une action par un
                        vrai bouton. Une carte statique ne se soulève pas au
                        survol.
                    </p>
                </aside>
            </div>
        </main>
    );
}
