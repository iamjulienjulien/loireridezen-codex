import type { Metadata } from "next";
import Link from "next/link";

import LRZTypography, {
    type LRZTypographyFont,
    type LRZTypographyPreset,
} from "@/components/LRZTypography";

import ComponentsNavigation from "../components/ComponentsNavigation/ComponentsNavigation";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Typographie — Atelier du Codex ligérien",
    description:
        "Les familles, presets et conventions typographiques de Loire Ride Zen.",
};

const FONTS: Array<{
    font: LRZTypographyFont;
    name: string;
    variable: string;
    role: string;
    sample: string;
}> = [
    {
        font: "display",
        name: "Fraunces",
        variable: "--font-display",
        role: "Titres, identité et grands repères éditoriaux.",
        sample: "Le fil royal",
    },
    {
        font: "body",
        name: "Inter",
        variable: "--font-body",
        role: "Lecture courante, contenus et interface.",
        sample: "La Loire relie les paysages.",
    },
    {
        font: "editorial",
        name: "Lora",
        variable: "--font-edit",
        role: "Récits, notes sensibles et introductions.",
        sample: "La pierre garde la mémoire du fleuve.",
    },
    {
        font: "mono",
        name: "JetBrains Mono",
        variable: "--font-mono",
        role: "Données, légendes, labels et métadonnées.",
        sample: "CHÂTEAUX · 52 LIEUX",
    },
    {
        font: "signature",
        name: "Allura",
        variable: "--font-signature",
        role: "Signature, crédit de création et touche manuscrite.",
        sample: "Julien Julien",
    },
];

const PRESETS: Array<{
    preset: LRZTypographyPreset;
    usage: string;
    sample: string;
}> = [
    { preset: "display", usage: "Identité et titre majeur", sample: "Châteaux de la Loire" },
    { preset: "heading-1", usage: "Titre de page", sample: "Le grand inventaire" },
    { preset: "heading-2", usage: "Section éditoriale", sample: "Histoires de pierre" },
    { preset: "heading-3", usage: "Sous-section et carte", sample: "Visite & patrimoine" },
    { preset: "lede", usage: "Introduction mise en avant", sample: "La Loire compose un paysage à parcourir lentement." },
    { preset: "body", usage: "Texte courant", sample: "Chaque lieu s’inscrit dans une histoire, une géographie et une manière d’habiter le fleuve." },
    { preset: "editorial", usage: "Note ou récit sensible", sample: "Au détour d’une rive, le paysage change de voix." },
    { preset: "eyebrow", usage: "Surtitre et catégorie", sample: "PATRIMOINE LIGÉRIEN" },
    { preset: "caption", usage: "Légende et précision", sample: "Vue depuis la rive gauche." },
    { preset: "code", usage: "Valeur technique", sample: 'preset="heading-2"' },
    { preset: "signature", usage: "Signature de création", sample: "Julien Julien" },
];

const RULES = [
    ["Hiérarchie", "Un display par vue, puis une progression nette entre les trois niveaux de titre."],
    ["Lecture", "Inter pour le flux principal ; Lora intervient comme une respiration, jamais comme un second texte courant."],
    ["Système", "Préférer les presets LRZTypography aux tailles et polices écrites localement."],
    ["Signature", "Allura est réservée aux crédits et signatures brèves : elle reste un geste, pas une police de contenu."],
] as const;

export default function AtelierTypographyPage() {
    return (
        <main className="atelier-foundation-page">
            <ComponentsNavigation current="typography" />
            <div className="atelier-foundation-wrap">
                <header className="atelier-doc-header">
                    <div className="atelier-doc-links">
                        <Link href="/atelier">← Retour à l’Atelier</Link>
                        <Link href="/">Retour à Loire Ride Zen</Link>
                    </div>
                    <p className="atelier-kicker">Atelier · Fondations visuelles</p>
                    <h1>Typographie</h1>
                    <p className="atelier-doc-lede">
                        La typographie donne son rythme au Codex : une voix
                        éditoriale, une lecture claire et quelques gestes plus
                        singuliers, tous disponibles via LRZTypography.
                    </p>
                </header>

                <section className="atelier-section-card atelier-intro-card">
                    <div>
                        <p className="atelier-kicker">Convention</p>
                        <h2>Des presets avant les exceptions</h2>
                    </div>
                    <p>
                        Le preset porte le rôle typographique complet. La
                        famille, la taille ou la couleur peuvent ensuite être
                        ajustées ponctuellement avec les props du composant.
                    </p>
                    <pre><code>{'<LRZTypography preset="heading-2">\n    Les châteaux du fil royal\n</LRZTypography>'}</code></pre>
                </section>

                <section className="atelier-section-card">
                    <header className="atelier-section-header">
                        <p className="atelier-kicker">Familles</p>
                        <h2>Les cinq voix du Codex</h2>
                        <span>{FONTS.length} familles</span>
                    </header>
                    <div className="atelier-card-grid">
                        {FONTS.map((font) => (
                            <article className={styles.card} key={font.font}>
                                <div className={styles.specimen}>
                                    <LRZTypography font={font.font} as="span">
                                        {font.sample}
                                    </LRZTypography>
                                </div>
                                <div className={styles.meta}>
                                    <strong>{font.name}</strong>
                                    <span>{font.role}</span>
                                    <code>{font.variable}</code>
                                    <code>{`font="${font.font}"`}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="atelier-section-card">
                    <header className="atelier-section-header">
                        <p className="atelier-kicker">Échelle</p>
                        <h2>Presets LRZTypography</h2>
                        <span>{PRESETS.length} rôles</span>
                    </header>
                    <div className={styles.presetList}>
                        {PRESETS.map((item) => (
                            <article className={styles.preset} key={item.preset}>
                                <div>
                                    <LRZTypography preset="eyebrow">
                                        {item.preset}
                                    </LRZTypography>
                                    <LRZTypography preset={item.preset}>
                                        {item.sample}
                                    </LRZTypography>
                                </div>
                                <p>{item.usage}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="atelier-section-card">
                    <header className="atelier-section-header">
                        <p className="atelier-kicker">Règles d’usage</p>
                        <h2>Une composition lisible</h2>
                        <span>{RULES.length} repères</span>
                    </header>
                    <div className="atelier-card-grid">
                        {RULES.map(([title, detail]) => (
                            <article className={styles.card} key={title}>
                                <div className={styles.rule}>
                                    <LRZTypography preset="heading-3">
                                        {title}
                                    </LRZTypography>
                                    <LRZTypography preset="body-sm">
                                        {detail}
                                    </LRZTypography>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
