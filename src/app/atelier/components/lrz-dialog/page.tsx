import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import { Castle, MapPin } from "lucide-react";

import {
    LRZDialog,
    LRZDialogBody,
    LRZDialogClose,
    LRZDialogContent,
    LRZDialogFooter,
    LRZDialogHeader,
    LRZDialogTrigger,
    type LRZDialogPlacement,
    type LRZDialogSize,
    type LRZDialogVariant,
} from "@/components/LRZDialog";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZDialogPlayground from "./LRZDialogPlayground";
import styles from "./LRZDialogPlayground.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-dialog");

const SIZES: Array<{
    size: LRZDialogSize;
    title: string;
    description: string;
}> = [
    {
        size: "sm",
        title: "Petit",
        description: "Confirmation, information courte ou formulaire réduit.",
    },
    {
        size: "md",
        title: "Moyen",
        description: "Contenu standard et composition éditoriale légère.",
    },
    {
        size: "lg",
        title: "Large",
        description: "Détail enrichi d’une entrée du Codex.",
    },
    {
        size: "xl",
        title: "Très large",
        description: "Fiche dense, galerie ou composition en colonnes.",
    },
    {
        size: "fullscreen",
        title: "Plein écran",
        description: "Expérience immersive ou contenu très long.",
    },
];

const VARIANTS: Array<{
    variant: LRZDialogVariant;
    title: string;
    description: string;
}> = [
    {
        variant: "default",
        title: "Standard",
        description: "Surface modale neutre du design system.",
    },
    {
        variant: "editorial",
        title: "Éditorial",
        description: "Espaces et accents adaptés aux fiches du Codex.",
    },
    {
        variant: "immersive",
        title: "Immersif",
        description: "Priorité au média, à la carte ou à la galerie.",
    },
];

const PLACEMENTS: Array<{
    placement: LRZDialogPlacement;
    title: string;
}> = [
    { placement: "center", title: "Centré" },
    { placement: "top", title: "Haut" },
    { placement: "bottom", title: "Bas" },
];

const ROOT_PROPS = [
    {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl" | "fullscreen"',
        defaultValue: '"md"',
        description: "Largeur et encombrement général du dialogue.",
    },
    {
        name: "placement",
        type: '"center" | "top" | "bottom"',
        defaultValue: '"center"',
        description: "Position principale dans le viewport.",
    },
    {
        name: "scrollMode",
        type: '"content" | "viewport" | "none"',
        defaultValue: '"content"',
        description: "Stratégie de défilement du dialogue.",
    },
    {
        name: "variant",
        type: '"default" | "editorial" | "immersive"',
        defaultValue: '"default"',
        description: "Traitement visuel de la fenêtre.",
    },
    {
        name: "padding",
        type: '"none" | "sm" | "md" | "lg"',
        defaultValue: '"none"',
        description: "Espacement intérieur de la racine.",
    },
    {
        name: "color",
        type: "LRZColor",
        defaultValue: '"ocre"',
        description: "Couleur d’accent du dialogue.",
    },
    {
        name: "showCloseButton",
        type: "boolean",
        defaultValue: "true",
        description: "Affiche le bouton de fermeture par défaut.",
    },
    {
        name: "preventOutsideClose",
        type: "boolean",
        defaultValue: "false",
        description: "Empêche la fermeture par interaction extérieure.",
    },
    {
        name: "preventEscapeClose",
        type: "boolean",
        defaultValue: "false",
        description: "Empêche la fermeture avec la touche Échap.",
    },
    {
        name: "stickyHeader",
        type: "boolean",
        defaultValue: "false",
        description: "Rend l’en-tête fixe dans les modes compatibles.",
    },
    {
        name: "stickyFooter",
        type: "boolean",
        defaultValue: "false",
        description: "Rend le pied fixe dans les modes compatibles.",
    },
] as const;

const PARTS = [
    {
        name: "LRZDialogTrigger",
        props: "asChild, children",
        role: "Élément interactif ouvrant le dialogue.",
    },
    {
        name: "LRZDialogContent",
        props: "size, placement, scrollMode, variant, color…",
        role: "Conteneur accessible, portail, overlay et comportement modal.",
    },
    {
        name: "LRZDialogHeader",
        props: "eyebrow, title, description, icon, metadata, action",
        role: "Hiérarchie éditoriale et titre accessible.",
    },
    {
        name: "LRZDialogBody",
        props: "children, padding, grow",
        role: "Zone principale et éventuellement scrollable.",
    },
    {
        name: "LRZDialogFooter",
        props: "children, align, divided, sticky",
        role: "Actions terminales du dialogue.",
    },
] as const;

export default function LRZDialogPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-dialog" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>

                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>

                    <h1 className={styles.pageTitle}>LRZDialog</h1>

                    <p className={styles.lede}>
                        La primitive modale du design system. Elle accueille
                        aussi bien une confirmation concise qu’une grande fiche
                        éditoriale du Codex, sans absorber la logique métier.
                    </p>
                </header>

                <section
                    className={styles.mainExample}
                    aria-labelledby="dialog-main-example-title"
                >
                    <div className={styles.mainExamplePreview}>
                        <p className={styles.kicker}>Exemple principal</p>
                        <h2 id="dialog-main-example-title">
                            Une fenêtre, tout un château
                        </h2>
                        <p>
                            Le conteneur gère le focus, l’overlay, le scroll et
                            la fermeture. Le contenu choisit ensuite son récit.
                        </p>

                        <LRZDialog>
                            <LRZDialogTrigger asChild>
                                <button
                                    className={styles.primaryButton}
                                    type="button"
                                >
                                    Découvrir Chambord
                                </button>
                            </LRZDialogTrigger>

                            <LRZDialogContent
                                size="lg"
                                variant="editorial"
                                color="ocre"
                                stickyHeader
                                stickyFooter
                            >
                                <LRZDialogHeader
                                    eyebrow="Patrimoine · Blaisois"
                                    title="Château de Chambord"
                                    description="Le rêve de pierre de François Ier."
                                    icon={<Castle />}
                                    metadata={
                                        <span className={styles.location}>
                                            <MapPin aria-hidden="true" />
                                            Chambord
                                        </span>
                                    }
                                />

                                <LRZDialogBody>
                                    <p>
                                        Chambord transforme la résidence royale
                                        en manifeste d’architecture, entre
                                        tradition française et idées nouvelles
                                        venues d’Italie.
                                    </p>

                                    <div className={styles.featureList}>
                                        <article>
                                            <strong>
                                                L’escalier à double révolution
                                            </strong>
                                            <p>
                                                Deux volées s’enroulent sans
                                                jamais se croiser.
                                            </p>
                                        </article>
                                        <article>
                                            <strong>
                                                La forêt de cheminées
                                            </strong>
                                            <p>
                                                Les terrasses deviennent une
                                                ville miniature de pierre.
                                            </p>
                                        </article>
                                    </div>
                                </LRZDialogBody>

                                <LRZDialogFooter divided sticky>
                                    <LRZDialogClose>Fermer</LRZDialogClose>
                                    <button type="button">
                                        Voir sur la carte
                                    </button>
                                </LRZDialogFooter>
                            </LRZDialogContent>
                        </LRZDialog>
                    </div>

                    <pre className={styles.mainExampleCode}>
                        <code>{`<LRZDialog>
    <LRZDialogTrigger asChild>
        <button type="button">Découvrir</button>
    </LRZDialogTrigger>

    <LRZDialogContent
        size="lg"
        variant="editorial"
        color="ocre"
    >
        <LRZDialogHeader
            eyebrow="Patrimoine"
            title="Château de Chambord"
            description="Le rêve de pierre."
        />

        <LRZDialogBody>
            …
        </LRZDialogBody>

        <LRZDialogFooter divided>
            …
        </LRZDialogFooter>
    </LRZDialogContent>
</LRZDialog>`}</code>
                    </pre>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Dimensions</p>
                        <h2>Cinq tailles</h2>
                        <p>
                            Chaque taille correspond à une densité de contenu,
                            pas seulement à une largeur arbitraire.
                        </p>
                    </header>

                    <div className={styles.sizeGrid}>
                        {SIZES.map((item) => (
                            <article
                                className={styles.referenceCard}
                                key={item.size}
                            >
                                <span>{item.size}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <LRZDialog>
                                    <LRZDialogTrigger asChild>
                                        <button type="button">Tester</button>
                                    </LRZDialogTrigger>
                                    <LRZDialogContent size={item.size}>
                                        <LRZDialogHeader
                                            title={`Taille ${item.size}`}
                                            description={item.description}
                                        />
                                        <LRZDialogBody>
                                            <p>
                                                Zone de démonstration du
                                                dialogue.
                                            </p>
                                        </LRZDialogBody>
                                    </LRZDialogContent>
                                </LRZDialog>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Traitements</p>
                        <h2>Trois variantes</h2>
                    </header>

                    <div className={styles.variantGrid}>
                        {VARIANTS.map((item) => (
                            <article
                                className={styles.referenceCard}
                                key={item.variant}
                            >
                                <span>{item.variant}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <LRZDialog>
                                    <LRZDialogTrigger asChild>
                                        <button type="button">Tester</button>
                                    </LRZDialogTrigger>
                                    <LRZDialogContent variant={item.variant}>
                                        <LRZDialogHeader
                                            eyebrow="Traitement visuel"
                                            title={`Variante ${item.variant}`}
                                            description={item.description}
                                        />
                                        <LRZDialogBody>
                                            <p>
                                                Cette prévisualisation permet de
                                                comparer la hiérarchie, la
                                                surface et l’ambiance du
                                                traitement sélectionné.
                                            </p>
                                        </LRZDialogBody>
                                    </LRZDialogContent>
                                </LRZDialog>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Position</p>
                        <h2>Trois placements</h2>
                    </header>

                    <div className={styles.placementGrid}>
                        {PLACEMENTS.map((item) => (
                            <article
                                className={styles.referenceCard}
                                key={item.placement}
                            >
                                <span>{item.placement}</span>
                                <h3>{item.title}</h3>
                                <LRZDialog>
                                    <LRZDialogTrigger asChild>
                                        <button type="button">Tester</button>
                                    </LRZDialogTrigger>
                                    <LRZDialogContent
                                        placement={item.placement}
                                    >
                                        <LRZDialogHeader
                                            eyebrow="Comportement"
                                            title={`Placement ${item.title.toLowerCase()}`}
                                            description="La position du dialogue s’adapte au contexte sans changer sa structure."
                                        />
                                        <LRZDialogBody>
                                            <p>
                                                Le placement est appliqué au
                                                viewport du composant. Essayez
                                                les trois options pour sentir la
                                                différence de rythme.
                                            </p>
                                        </LRZDialogBody>
                                    </LRZDialogContent>
                                </LRZDialog>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Composition</p>
                        <h2>Sous-composants</h2>
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

                <section className={styles.propsSection}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.kicker}>Référence</p>
                        <h2>Props de `LRZDialogContent`</h2>
                    </header>

                    <div
                        className={styles.tableScroll}
                        tabIndex={0}
                        aria-label="Tableau des propriétés de LRZDialogContent"
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Défaut</th>
                                    <th>Description</th>
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

                <section className={styles.accessibility}>
                    <p className={styles.kicker}>Accessibilité</p>
                    <h2>Le comportement modal reste dans la primitive</h2>
                    <p>
                        Radix gère le focus trap, le retour du focus, la touche
                        Échap, le portail et les attributs ARIA. Chaque dialogue
                        doit néanmoins posséder un titre accessible via
                        <code> LRZDialogTitle </code> ou
                        <code> LRZDialogHeader</code>.
                    </p>
                </section>

                <LRZDialogPlayground />
            </div>
        </>
    );
}
