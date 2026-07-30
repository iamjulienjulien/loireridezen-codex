import type { Metadata } from "next";
import Link from "next/link";

import LRZTypography, {
    type LRZTypographyEffect,
    type LRZTypographyFont,
    type LRZTypographyMotion,
    type LRZTypographyPreset,
} from "@/components/LRZTypography";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZAnimationCard from "./LRZAnimationCard";
import LRZTypographyPlayground from "./LRZTypographyPlayground";
import styles from "./LRZTypographyPlayground.module.css";

export const metadata: Metadata = {
    title: "LRZTypography — Atelier du Codex ligérien",
    description:
        "Presets, familles et personnalisations typographiques Loire Ride Zen.",
};

const PRESETS: Array<{
    preset: LRZTypographyPreset;
    sample: string;
    usage: string;
}> = [
    {
        preset: "display",
        sample: "Loire Ride Zen",
        usage: "Identité et titres majeurs.",
    },
    {
        preset: "heading-1",
        sample: "Châteaux de la Loire",
        usage: "Titre principal d’une page.",
    },
    {
        preset: "heading-2",
        sample: "Histoire et architecture",
        usage: "Grande section éditoriale.",
    },
    {
        preset: "heading-3",
        sample: "Visite & protections",
        usage: "Sous-section et titre de carte.",
    },
    {
        preset: "lede",
        sample: "Le Codex suit le fleuve de la source à l’Atlantique.",
        usage: "Introduction mise en avant.",
    },
    {
        preset: "body",
        sample: "La Loire relie des paysages, des récits et des patrimoines.",
        usage: "Texte courant.",
    },
    {
        preset: "body-sm",
        sample: "Information secondaire et contenu dense.",
        usage: "Interfaces et métadonnées.",
    },
    {
        preset: "editorial",
        sample: "La pierre garde encore la mémoire du fleuve.",
        usage: "Anecdote, note et citation courte.",
    },
    {
        preset: "signature",
        sample: "Julien Julien",
        usage: "Signature et crédit de création.",
    },
    {
        preset: "eyebrow",
        sample: "Patrimoine ligérien",
        usage: "Surtitre et catégorie.",
    },
    {
        preset: "caption",
        sample: "Vue depuis la rive gauche.",
        usage: "Légende et précision.",
    },
    {
        preset: "code",
        sample: 'color="ocre"',
        usage: "Valeur technique inline.",
    },
];

const FONTS: Array<{
    font: LRZTypographyFont;
    label: string;
    role: string;
}> = [
    { font: "display", label: "Fraunces", role: "Identité éditoriale" },
    { font: "body", label: "Inter", role: "Lecture courante" },
    { font: "mono", label: "JetBrains Mono", role: "Données et labels" },
    { font: "editorial", label: "Lora", role: "Voix sensible" },
    { font: "signature", label: "Allura", role: "Signature manuscrite" },
    { font: "bodoni", label: "Bodoni Moda", role: "Éditorial précieux" },
    { font: "grotesk", label: "Space Grotesk", role: "Accent contemporain" },
    { font: "note", label: "Kalam", role: "Note de carnet" },
];

const EFFECTS: Array<{
    effect: Exclude<LRZTypographyEffect, "none">;
    label: string;
    sample: string;
}> = [
    {
        effect: "ink",
        label: "Encre éditoriale",
        sample: "La mémoire du fleuve",
    },
    {
        effect: "highlight",
        label: "Surlignage",
        sample: "Un détail à retenir",
    },
    {
        effect: "engraved",
        label: "Gravure",
        sample: "La pierre se souvient",
    },
    {
        effect: "outline",
        label: "Contour",
        sample: "Silhouettes du Val",
    },
    {
        effect: "soft-shadow",
        label: "Ombre douce",
        sample: "Au-dessus des jardins",
    },
    {
        effect: "moon-glow",
        label: "Halo lunaire",
        sample: "La Loire à la nuit tombée",
    },
    {
        effect: "foil",
        label: "Feuille métallique",
        sample: "Éclat de métal",
    },
    {
        effect: "ink-reveal",
        label: "Encre révélée",
        sample: "Le récit apparaît",
    },
    {
        effect: "weathered",
        label: "Érodé · expérimental",
        sample: "La pierre du temps",
    },
    {
        effect: "constellation",
        label: "Constellation · expérimental",
        sample: "Une nuit sur la Loire",
    },
];

const ANIMATED_EFFECTS = new Set<LRZTypographyEffect>(["foil", "ink-reveal"]);

const MOTIONS: Array<{
    motion: Exclude<LRZTypographyMotion, "none">;
    label: string;
}> = [
    { motion: "fade-up", label: "Élévation douce" },
    { motion: "reveal", label: "Dévoilement" },
    { motion: "tracking-in", label: "Resserrement" },
    { motion: "typewriter", label: "Machine à écrire CSS" },
];

const GRADIENTS = [
    ["gold-leaf", "Feuille d’or"],
    ["royal", "Royal"],
    ["river", "Loire"],
    ["sunset", "Coucher"],
    ["forest", "Forêt"],
    ["tuffeau", "Tuffeau"],
    ["moonlight", "Clair de lune"],
    ["ember", "Braise"],
] as const;

const PROPS = [
    ["children", "ReactNode", "—", "Contenu textuel ou enrichi."],
    ["preset", "LRZTypographyPreset", '"body"', "Style typographique complet."],
    ["as", "LRZTypographyElement", "preset", "Élément HTML rendu."],
    ["font", "LRZTypographyFont", "preset", "Famille de caractères."],
    ["size", "LRZTypographySize", "preset", "Taille typographique."],
    ["weight", "LRZTypographyWeight", "preset", "Graisse du texte."],
    ["color", "LRZTypographyColor", "preset", "Couleur sémantique ou LRZ."],
    ["align", '"start" | "center" | "end"', '"start"', "Alignement du texte."],
    ["leading", "LRZTypographyLeading", "preset", "Hauteur de ligne."],
    ["tracking", "LRZTypographyTracking", "preset", "Espacement des lettres."],
    [
        "transform",
        "LRZTypographyTransform",
        "preset",
        "Transformation de casse.",
    ],
    ["italic", "boolean", "preset", "Force ou retire l’italique."],
    ["balance", "boolean", "preset", "Équilibre les lignes courtes."],
    ["noWrap", "boolean", "false", "Empêche le retour à la ligne."],
    ["truncate", "boolean", "false", "Tronque sur une ligne."],
    ["lineClamp", "1 | 2 | 3 | 4", "undefined", "Limite le nombre de lignes."],
    ["decoration", "LRZTypographyDecoration", '"none"', "Décoration du texte."],
    ["effect", "LRZTypographyEffect", '"none"', "Effet éditorial décoratif."],
    [
        "gradient",
        "LRZTypographyGradient",
        "undefined",
        "Preset ou deux couleurs LRZ.",
    ],
    ["motion", "LRZTypographyMotion", '"none"', "Animation d’entrée."],
    ["motionDelay", "number", "0", "Délai d’animation en millisecondes."],
    [
        "typewriterSpeed",
        "number",
        "55",
        "Durée par caractère en millisecondes.",
    ],
    ["cursor", "boolean", "true", "Curseur du typewriter CSS."],
    ["dropCap", "boolean", "false", "Ajoute une lettrine au texte."],
    ["className", "string", "undefined", "Classe additionnelle."],
    ["style", "CSSProperties", "undefined", "Styles avancés."],
] as const;

export default function LRZTypographyPage() {
    return (
        <main className={styles.page}>
            <ComponentsNavigation current="lrz-typography" />

            <div className={styles.wrap}>
                <header className={styles.pageHeader}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <LRZTypography preset="eyebrow">
                        Loire Ride Zen · Composants UI
                    </LRZTypography>
                    <LRZTypography
                        preset="display"
                        as="h1"
                        className={styles.pageTitle}
                    >
                        LRZTypography
                    </LRZTypography>
                    <LRZTypography preset="lede" className={styles.lede}>
                        Une couche typographique cohérente pour donner à chaque
                        texte la bonne voix sans mélanger apparence et
                        hiérarchie HTML.
                    </LRZTypography>
                </header>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">Presets</LRZTypography>
                        <LRZTypography preset="heading-2">
                            Une échelle prête à composer
                        </LRZTypography>
                        <LRZTypography preset="body-sm" color="secondary">
                            Chaque preset possède sa famille, son rythme et sa
                            couleur par défaut.
                        </LRZTypography>
                    </header>

                    <div className={styles.presetStack}>
                        {PRESETS.map((item) => (
                            <article
                                className={styles.presetExample}
                                key={item.preset}
                            >
                                <div className={styles.presetMeta}>
                                    <code>{item.preset}</code>
                                    <span>{item.usage}</span>
                                </div>
                                <LRZTypography preset={item.preset} as="p">
                                    {item.sample}
                                </LRZTypography>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">Familles</LRZTypography>
                        <LRZTypography preset="heading-2">
                            Quatre voix ligériennes
                        </LRZTypography>
                    </header>

                    <div className={styles.fontGrid}>
                        {FONTS.map((item) => (
                            <article
                                className={styles.fontExample}
                                key={item.font}
                            >
                                <LRZTypography
                                    as="p"
                                    preset="heading-3"
                                    font={item.font}
                                >
                                    Aa
                                </LRZTypography>
                                <div>
                                    <LRZTypography
                                        preset="body"
                                        weight="semibold"
                                    >
                                        {item.label}
                                    </LRZTypography>
                                    <LRZTypography
                                        preset="caption"
                                        color="tertiary"
                                    >
                                        {item.role}
                                    </LRZTypography>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">Dégradés</LRZTypography>
                        <LRZTypography preset="heading-2">
                            Sept atmosphères et une composition libre
                        </LRZTypography>
                        <LRZTypography preset="body-sm" color="secondary">
                            Des compositions colorées pour signer les titres du
                            Codex sans affecter leur sémantique.
                        </LRZTypography>
                    </header>

                    <div className={styles.gradientGrid}>
                        {GRADIENTS.map(([gradient, label]) => (
                            <article
                                className={styles.gradientExample}
                                key={gradient}
                            >
                                <LRZTypography
                                    preset="heading-3"
                                    gradient={gradient}
                                >
                                    {label}
                                </LRZTypography>
                                <code>{gradient}</code>
                            </article>
                        ))}
                        <article className={styles.gradientExample}>
                            <LRZTypography
                                preset="heading-3"
                                gradient={{
                                    from: "eau",
                                    to: "coucher",
                                    angle: 120,
                                }}
                            >
                                Eau × coucher
                            </LRZTypography>
                            <code>custom · 2 LRZColor</code>
                        </article>
                    </div>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">Effets</LRZTypography>
                        <LRZTypography preset="heading-2">
                            De l’encre à la gravure
                        </LRZTypography>
                        <LRZTypography preset="body-sm" color="secondary">
                            Des traitements courts pour donner au texte une
                            présence éditoriale sans en réduire la lisibilité.
                        </LRZTypography>
                    </header>

                    <div className={styles.effectGrid}>
                        {EFFECTS.map((item) => {
                            const content = (
                                <>
                                    <LRZTypography
                                        preset="caption"
                                        color="tertiary"
                                    >
                                        {item.label}
                                    </LRZTypography>
                                    <LRZTypography
                                        preset="heading-3"
                                        effect={item.effect}
                                    >
                                        {item.sample}
                                    </LRZTypography>
                                    <code>{`effect="${item.effect}"`}</code>
                                </>
                            );

                            return ANIMATED_EFFECTS.has(item.effect) ? (
                                <LRZAnimationCard
                                    className={styles.effectExample}
                                    key={item.effect}
                                    label={item.label}
                                >
                                    {content}
                                </LRZAnimationCard>
                            ) : (
                                <article
                                    className={`${styles.effectExample} ${styles.staticEffectExample}`}
                                    key={item.effect}
                                >
                                    {content}
                                </article>
                            );
                        })}
                    </div>

                    <article className={styles.dropCapExample}>
                        <LRZTypography preset="eyebrow">Lettrine</LRZTypography>
                        <LRZTypography preset="editorial" as="p" dropCap>
                            La Loire traverse les siècles comme elle traverse
                            les paysages. Sa première lettre ouvre le récit sans
                            modifier la structure du texte.
                        </LRZTypography>
                    </article>
                </section>

                <section className={styles.referenceSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">
                            Mouvements
                        </LRZTypography>
                        <LRZTypography preset="heading-2">
                            Quatre entrées mesurées
                        </LRZTypography>
                        <LRZTypography preset="body-sm" color="secondary">
                            Des animations d’entrée sobres qui respectent la
                            préférence système de réduction des mouvements.
                        </LRZTypography>
                    </header>

                    <div className={styles.effectGrid}>
                        {MOTIONS.map((item, index) => (
                            <LRZAnimationCard
                                className={styles.effectExample}
                                key={item.motion}
                                label={item.label}
                            >
                                <LRZTypography
                                    preset="caption"
                                    color="tertiary"
                                >
                                    {item.label}
                                </LRZTypography>
                                <LRZTypography
                                    preset="heading-3"
                                    motion={item.motion}
                                    motionDelay={index * 120}
                                >
                                    Le fleuve se révèle
                                </LRZTypography>
                                <code>{`motion="${item.motion}"`}</code>
                            </LRZAnimationCard>
                        ))}
                    </div>
                </section>

                <LRZTypographyPlayground />

                <section className={styles.propsSection}>
                    <header className={styles.sectionHeader}>
                        <LRZTypography preset="eyebrow">
                            Référence
                        </LRZTypography>
                        <LRZTypography preset="heading-2">Props</LRZTypography>
                        <LRZTypography preset="body-sm" color="secondary">
                            Les overrides sont appliqués après le preset.
                        </LRZTypography>
                    </header>

                    <div
                        className={styles.tableScroll}
                        role="region"
                        aria-label="Tableau des props de LRZTypography"
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
                                {PROPS.map(
                                    ([
                                        name,
                                        type,
                                        defaultValue,
                                        description,
                                    ]) => (
                                        <tr key={name}>
                                            <th scope="row">
                                                <code>{name}</code>
                                            </th>
                                            <td>
                                                <code>{type}</code>
                                            </td>
                                            <td>
                                                <code>{defaultValue}</code>
                                            </td>
                                            <td>{description}</td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <aside className={styles.accessibility}>
                    <LRZTypography preset="eyebrow">
                        Accessibilité
                    </LRZTypography>
                    <LRZTypography preset="heading-2">
                        Le bon style sur le bon élément
                    </LRZTypography>
                    <ul>
                        <li>
                            La prop <code>as</code> doit refléter la hiérarchie
                            réelle du document.
                        </li>
                        <li>
                            Un style de titre ne justifie pas à lui seul
                            l’utilisation d’un élément de titre.
                        </li>
                        <li>
                            La troncature ne doit jamais masquer une information
                            indispensable.
                        </li>
                        <li>Les capitales sont réservées aux labels courts.</li>
                        <li>
                            Les effets décoratifs restent réservés aux textes
                            courts et ne doivent jamais être le seul porteur
                            d’une information.
                        </li>
                        <li>
                            La lettrine est limitée aux paragraphes, divisions
                            et citations, et se désactive avec la troncature.
                        </li>
                        <li>
                            Les animations d’entrée respectent automatiquement
                            la préférence système de réduction des mouvements.
                        </li>
                        <li>
                            Le texte courbe et les compositions cinétiques
                            conservent une annonce linéaire unique pour les
                            technologies d’assistance.
                        </li>
                        <li>
                            Les récits liés au scroll restent entièrement
                            lisibles lorsque les scroll animations ne sont pas
                            disponibles.
                        </li>
                    </ul>
                </aside>
            </div>
        </main>
    );
}
