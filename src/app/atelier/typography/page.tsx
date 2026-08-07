import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import LRZTypography, {
    type LRZTypographyFont,
    type LRZTypographyPreset,
    type LRZTypographyWeight,
} from "@/components/LRZTypography";

import ComponentsNavigation from "../components/ComponentsNavigation/ComponentsNavigation";
import styles from "./page.module.css";

export const metadata = getAtelierPageMetadata("/atelier/typography");

const FONTS: Array<{
    font: LRZTypographyFont;
    name: string;
    variable: string;
    role: string;
    sample: string;
    character: string;
    idealFor: string;
    avoid: string;
    weights: Array<{ label: string; value: LRZTypographyWeight }>;
}> = [
    {
        font: "display",
        name: "Fraunces",
        variable: "--font-display",
        role: "Titres, identité et grands repères éditoriaux.",
        sample: "Le fil royal",
        character: "Serif organique et sculpturale.",
        idealFor: "Le titre de page, un grand chapitre ou une collection.",
        avoid: "Les paragraphes longs et les micro-libellés d’interface.",
        weights: [
            { label: "Regular", value: "regular" },
            { label: "Medium", value: "medium" },
            { label: "Semibold", value: "semibold" },
            { label: "Bold", value: "bold" },
        ],
    },
    {
        font: "body",
        name: "Inter",
        variable: "--font-body",
        role: "Lecture courante, contenus et interface.",
        sample: "La Loire relie les paysages.",
        character: "Sans-serif neutre, très lisible.",
        idealFor: "Les textes continus, les fiches et les contrôles UI.",
        avoid: "Les titres à forte personnalité ou les signatures.",
        weights: [
            { label: "Regular", value: "regular" },
            { label: "Medium", value: "medium" },
            { label: "Semibold", value: "semibold" },
            { label: "Bold", value: "bold" },
        ],
    },
    {
        font: "editorial",
        name: "Lora",
        variable: "--font-edit",
        role: "Récits, notes sensibles et introductions.",
        sample: "La pierre garde la mémoire du fleuve.",
        character: "Serif littéraire, souple et chaleureuse.",
        idealFor: "Une introduction, une citation ou une note de contexte.",
        avoid: "Les données compactes et les textes fonctionnels.",
        weights: [
            { label: "Regular", value: "regular" },
            { label: "Medium", value: "medium" },
            { label: "Semibold", value: "semibold" },
            { label: "Bold", value: "bold" },
        ],
    },
    {
        font: "mono",
        name: "JetBrains Mono",
        variable: "--font-mono",
        role: "Données, légendes, labels et métadonnées.",
        sample: "CHÂTEAUX · 52 LIEUX",
        character: "Monospace précis et technique.",
        idealFor: "Les compteurs, tokens, dates, labels et légendes.",
        avoid: "Toute lecture longue ou un titre éditorial.",
        weights: [
            { label: "Regular", value: "regular" },
            { label: "Medium", value: "medium" },
            { label: "Semibold", value: "semibold" },
            { label: "Bold", value: "bold" },
        ],
    },
    {
        font: "signature",
        name: "Allura",
        variable: "--font-signature",
        role: "Signature, crédit de création et touche manuscrite.",
        sample: "Julien Julien",
        character: "Script fluide, cérémoniel et personnel.",
        idealFor: "Une signature courte, isolée et généreusement espacée.",
        avoid: "Les annotations, les titres et les textes de contenu.",
        weights: [{ label: "Regular", value: "regular" }],
    },
    {
        font: "bodoni",
        name: "Bodoni Moda",
        variable: "--font-bodoni",
        role: "Éditorial précieux, citations et collections d’exception.",
        sample: "Un art de vivre",
        character: "Didone contrastée, raffinée et graphique.",
        idealFor: "Une citation, une couverture ou une collection premium.",
        avoid: "Les petites tailles et les surfaces textuelles denses.",
        weights: [
            { label: "Regular", value: "regular" },
            { label: "Medium", value: "medium" },
            { label: "Semibold", value: "semibold" },
            { label: "Bold", value: "bold" },
        ],
    },
    {
        font: "grotesk",
        name: "Space Grotesk",
        variable: "--font-grotesk",
        role: "Accent contemporain, données et interface expressive.",
        sample: "52 CHÂTEAUX",
        character: "Grotesk géométrique, nette et actuelle.",
        idealFor: "Les chiffres-clés, accroches et composants exploratoires.",
        avoid: "Le corps de texte quand Inter suffit à mieux respirer.",
        weights: [
            { label: "Regular", value: "regular" },
            { label: "Medium", value: "medium" },
            { label: "Semibold", value: "semibold" },
            { label: "Bold", value: "bold" },
        ],
    },
    {
        font: "note",
        name: "Kalam",
        variable: "--font-note",
        role: "Notes de carnet, annotations et repères personnels.",
        sample: "À suivre le long du fleuve",
        character: "Manuscrite franche, vivante et très lisible.",
        idealFor: "Une annotation, un conseil ou un repère de parcours.",
        avoid: "Les crédits formels, réservés à Allura, et les longs textes.",
        weights: [
            { label: "Regular", value: "regular" },
            { label: "Bold", value: "bold" },
        ],
    },
];

const CHARACTER_ROWS = [
    ["Majuscules", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    ["Minuscules", "abcdefghijklmnopqrstuvwxyz"],
    ["Chiffres", "0123456789"],
    ["Accents & signes", "ÀÉÎÖÙ àéîöù · & / — ! ? % €"],
] as const;

const SIZE_SAMPLES = ["xs", "md", "xl", "2xl"] as const;

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
        <>
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
                        <h2>Les huit voix du Codex</h2>
                        <span>{FONTS.length} familles</span>
                    </header>
                    <p className={styles.familyIntro}>
                        Chaque famille possède un territoire précis. Choisis-la
                        pour son rôle et sa texture, jamais comme un simple
                        changement décoratif.
                    </p>
                    <div className={styles.fontList}>
                        {FONTS.map((font) => (
                            <article className={`${styles.card} ${styles.fontCard}`} key={font.font}>
                                <div className={styles.specimen}>
                                    <LRZTypography font={font.font} as="span">
                                        {font.sample}
                                    </LRZTypography>
                                </div>
                                <div className={styles.meta}>
                                    <strong>{font.name}</strong>
                                    <span>{font.role}</span>
                                    <dl className={styles.fontDetails}>
                                        <div>
                                            <dt>Caractère</dt>
                                            <dd>{font.character}</dd>
                                        </div>
                                        <div>
                                            <dt>À privilégier</dt>
                                            <dd>{font.idealFor}</dd>
                                        </div>
                                        <div>
                                            <dt>À éviter</dt>
                                            <dd>{font.avoid}</dd>
                                        </div>
                                    </dl>
                                    <code>{font.variable}</code>
                                    <code>{`<LRZTypography font="${font.font}">…</LRZTypography>`}</code>
                                </div>
                                <div className={styles.fontReference}>
                                    <div>
                                        <p className={styles.referenceLabel}>
                                            Jeu de caractères
                                        </p>
                                        <div className={styles.tableWrap}>
                                            <table className={styles.characterTable}>
                                                <tbody>
                                                    {CHARACTER_ROWS.map(([label, characters]) => (
                                                        <tr key={label}>
                                                            <th scope="row">{label}</th>
                                                            <td>
                                                                <LRZTypography font={font.font} as="span">
                                                                    {characters}
                                                                </LRZTypography>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className={styles.fontLab}>
                                        <div>
                                            <p className={styles.referenceLabel}>
                                                Tailles · xs à 6xl
                                            </p>
                                            <div className={styles.sizeSamples}>
                                                {SIZE_SAMPLES.map((size) => (
                                                    <div key={size}>
                                                        <span>{size}</span>
                                                        <LRZTypography font={font.font} size={size} as="span">
                                                            La Loire dessine le paysage
                                                        </LRZTypography>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className={styles.referenceLabel}>
                                                Graisses disponibles
                                            </p>
                                                <div className={styles.weightSamples}>
                                                {font.weights.map((weight) => (
                                                    <div key={weight.value}>
                                                        <span>{weight.value}</span>
                                                        <LRZTypography font={font.font} weight={weight.value} as="span">
                                                            {weight.label} · La Loire dessine le paysage
                                                        </LRZTypography>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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
        </>
    );
}
