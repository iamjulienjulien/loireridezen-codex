import type { Metadata } from "next";
import Link from "next/link";

import {
    LRZStamp,
    LRZ_STAMP_SIZE_VALUES,
    type LRZStampFont,
    type LRZStampPosition,
    type LRZStampSize,
    type LRZStampTone,
    type LRZStampVariant,
} from "@/components/LRZStamp";
import { CATEGORIES_PERSONNAGES } from "@/registry/categories-personnages";
import { getIndexBySlug } from "@/registry/indexes";
import { FAUNE_RARETE_META } from "@/registry/Meta/faune-rarete";
import { FAUNE_TYPE_META } from "@/registry/Meta/faune-type";
import { FLORE_CATEGORIE_META } from "@/registry/Meta/flore-categorie";
import { GUINGUETTE_AMBIENCE_META } from "@/registry/Meta/guinguette-ambience";
import {
    LRZ_INDEX_SYMBOLS,
    type LRZFauneRareteSymbolSlug,
    type LRZFauneTypeSymbolSlug,
    type LRZFloreCategorieSymbolSlug,
    type LRZGuinguetteAmbienceSymbolSlug,
    type LRZIndexSymbolSlug,
} from "@/registry/symbols";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import shellStyles from "../filter-playground.module.css";
import LRZStampPlayground, {
    type LRZStampPlaygroundOption,
} from "./LRZStampPlayground";
import styles from "./LRZStampShowcase.module.css";

export const metadata: Metadata = {
    title: "LRZStamp — Atelier du Codex ligérien",
    description:
        "Capsules d’identité associant les symboles illustrés à leurs noms métier.",
};

const INDEX_OPTIONS = (
    Object.keys(LRZ_INDEX_SYMBOLS) as LRZIndexSymbolSlug[]
).map((slug) => ({
    slug,
    label: getIndexBySlug(slug)?.label ?? slug,
})) satisfies readonly LRZStampPlaygroundOption<LRZIndexSymbolSlug>[];

const FAUNE_TYPE_OPTIONS = FAUNE_TYPE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZFauneTypeSymbolSlug>[];

const FAUNE_RARETE_OPTIONS = FAUNE_RARETE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZFauneRareteSymbolSlug>[];

const FLORE_OPTIONS = FLORE_CATEGORIE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZFloreCategorieSymbolSlug>[];

const GUINGUETTE_OPTIONS = GUINGUETTE_AMBIENCE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZGuinguetteAmbienceSymbolSlug>[];

const PERSONNAGE_OPTIONS = CATEGORIES_PERSONNAGES.map(({ slug, nom }) => ({
    slug,
    label: nom,
}));

const VARIANTS: Array<{
    variant: LRZStampVariant;
    slug: LRZIndexSymbolSlug;
    detail: string;
}> = [
    { variant: "pill", slug: "flore", detail: "Capsule organique" },
    { variant: "badge", slug: "faune", detail: "Cartouche compact" },
    { variant: "chip", slug: "guinguettes", detail: "Surface UI" },
    { variant: "plaque", slug: "chateaux", detail: "Plaque patrimoniale" },
    { variant: "seal", slug: "flore", detail: "Insigne éditorial" },
];

const TONES: readonly LRZStampTone[] = ["subtle", "outline", "solid", "ghost"];

const SIZES: Array<{
    size: LRZStampSize | number;
    label: string;
}> = [
    { size: "xs", label: "xs · 22 px" },
    { size: "sm", label: "sm · 28 px" },
    { size: "md", label: "md · 36 px" },
    { size: "lg", label: "lg · 46 px" },
    { size: "xl", label: "xl · 60 px" },
    { size: 52, label: "custom · 52 px" },
];

const POSITIONS: Array<{
    position: LRZStampPosition;
    label: string;
}> = [
    { position: "start", label: "Début" },
    { position: "end", label: "Fin" },
    { position: "top", label: "Haut" },
];

const FONTS: Array<{
    font: LRZStampFont;
    label: string;
}> = [
    { font: "display", label: "Fraunces" },
    { font: "body", label: "Inter" },
    { font: "editorial", label: "Lora" },
    { font: "mono", label: "JetBrains Mono" },
    { font: "signature", label: "Allura" },
    { font: "bodoni", label: "Bodoni Moda" },
    { font: "grotesk", label: "Space Grotesk" },
    { font: "note", label: "Kalam" },
];

const API_PROPS = [
    [
        "collection",
        '"index" | "faune" | "flore" | "guinguette" | "personnage"',
        "—",
        "Collection métier.",
    ],
    [
        "meta",
        '"type" | "rarete" | "categorie" | "ambience"',
        "undefined",
        "Sous-dossier optionnel.",
    ],
    ["slug", "slug typé", "—", "Identité sélectionnée."],
    ["label", "ReactNode", "nom du registre", "Remplace le nom métier."],
    ["detail", "ReactNode | false", "undefined", "Texte secondaire."],
    [
        "variant",
        '"pill" | "badge" | "chip" | "plaque" | "seal"',
        '"pill"',
        "Silhouette générale.",
    ],
    [
        "tone",
        '"subtle" | "outline" | "solid" | "ghost"',
        '"subtle"',
        "Intensité visuelle.",
    ],
    [
        "size",
        '"xs" | "sm" | "md" | "lg" | "xl" | number',
        '"md"',
        "Hauteur minimale.",
    ],
    ["accent", "string", "accent du registre", "Couleur CSS prioritaire."],
    ["font", "LRZStampFont", '"body"', "Famille typographique du label."],
    [
        "labelSize",
        '"xs" | "sm" | "md" | "lg" | "xl" | number',
        "automatique",
        "Taille du label ; les nombres sont en pixels.",
    ],
    ["labelColor", "LRZColor", "color de l’item", "Couleur LRZ du label."],
    [
        "symbolPosition",
        '"start" | "end" | "top"',
        '"start"',
        "Position de l’illustration.",
    ],
    ["symbolFrame", "LRZSymbolFrame", '"none"', "Cadre du symbole."],
    ["symbolShape", "LRZSymbolShape", '"rounded"', "Forme du symbole."],
    [
        "symbolPadding",
        "LRZSymbolPadding | number",
        '"none"',
        "Padding du symbole.",
    ],
    ["symbolShadow", "LRZSymbolShadow", '"none"', "Ombre du symbole."],
    ["symbolScale", "number", "1", "Échelle du symbole, de 0.5 à 1.4."],
    ["shadow", '"none" | "soft" | "strong"', '"none"', "Ombre du stamp."],
    [
        "padding",
        '"xs" | "sm" | "md" | "lg" | number',
        '"md"',
        "Espace intérieur.",
    ],
    [
        "gap",
        '"xs" | "sm" | "md" | "lg" | number',
        '"sm"',
        "Distance symbole–texte.",
    ],
    ["gradient", "boolean", "true", "Active le traitement lumineux."],
    ["dashed", "boolean", "false", "Bordure pointillée."],
    ["fullWidth", "boolean", "false", "Occupe toute la largeur."],
    ["maxWidth", "number | string", "undefined", "Largeur maximale."],
    ["truncate", "boolean", "false", "Troncature visuelle sur une ligne."],
    ["fallback", "ReactNode", "null", "Rendu si le locator est inconnu."],
] as const;

export default function LRZStampPage() {
    return (
        <main className={shellStyles.page}>
            <ComponentsNavigation current="lrz-stamp" />

            <div className={shellStyles.wrap}>
                <header className={shellStyles.header}>
                    <Link className={shellStyles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={shellStyles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={shellStyles.title}>LRZStamp</h1>
                    <p className={shellStyles.lede}>
                        Une identité illustrée prête à poser dans les cartes,
                        les listes et les en-têtes : le registre fournit le
                        symbole, le nom et la couleur d’accent.
                    </p>
                </header>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-main-example"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Exemple principal</p>
                        <h2 id="stamp-main-example">
                            Un symbole qui porte son nom
                        </h2>
                        <p>
                            Le locator est identique à celui de LRZSymbol. Le
                            label et l’accent sont automatiquement récupérés
                            dans le même registre.
                        </p>
                    </div>

                    <div className={styles.heroPreview}>
                        <LRZStamp
                            collection="personnage"
                            meta="categorie"
                            slug="souverain"
                            variant="plaque"
                            tone="solid"
                            size="xl"
                            font="display"
                            labelSize="lg"
                            detail="Catégorie de personnages"
                            symbolFrame="subtle"
                            symbolShape="circle"
                            shadow="strong"
                        />
                    </div>

                    <pre className={shellStyles.code}>
                        <code>{`<LRZStamp
  collection="personnage"
  meta="categorie"
  slug="souverain"
  variant="plaque"
  tone="solid"
  size="xl"
  font="display"
  labelSize="lg"
  detail="Catégorie de personnages"
  symbolFrame="subtle"
  symbolShape="circle"
  shadow="strong"
/>`}</code>
                    </pre>
                </section>

                <LRZStampPlayground
                    indexOptions={INDEX_OPTIONS}
                    fauneTypeOptions={FAUNE_TYPE_OPTIONS}
                    fauneRareteOptions={FAUNE_RARETE_OPTIONS}
                    floreOptions={FLORE_OPTIONS}
                    guinguetteOptions={GUINGUETTE_OPTIONS}
                    personnageOptions={PERSONNAGE_OPTIONS}
                />

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-indexes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collections racines
                        </p>
                        <h2 id="stamp-indexes">Les index du Codex</h2>
                        <p>
                            Sans meta, le label court et la couleur de chaque
                            index accompagnent automatiquement son symbole.
                        </p>
                    </div>
                    <div className={styles.indexGrid}>
                        {INDEX_OPTIONS.map(({ slug }) => (
                            <LRZStamp
                                collection="index"
                                slug={slug}
                                key={slug}
                                size="lg"
                                shadow="soft"
                            />
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-flore-categories"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="stamp-flore-categories">
                            Les catégories de flore
                        </h2>
                        <p>
                            Chaque stamp résout son symbole, son label et sa
                            couleur depuis le registre
                            <code> flore.categorie</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {FLORE_CATEGORIE_META.map((category) => (
                            <LRZStamp
                                collection="flore"
                                meta="categorie"
                                slug={category.slug}
                                key={category.slug}
                                size="md"
                                variant="pill"
                                tone="subtle"
                                font="grotesk"
                                symbolScale={1.1}
                                shadow="soft"
                            />
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-faune-types"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="stamp-faune-types">Les types de faune</h2>
                        <p>
                            Chaque stamp résout son label et sa couleur depuis
                            le registre <code>faune.type</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {FAUNE_TYPE_META.map((type) => (
                            <LRZStamp
                                collection="faune"
                                meta="type"
                                slug={type.slug}
                                key={type.slug}
                                size="md"
                                variant="pill"
                                tone="subtle"
                                font="grotesk"
                                symbolScale={1.1}
                                shadow="soft"
                            />
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-faune-raretes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="stamp-faune-raretes">Les raretés de faune</h2>
                        <p>
                            Chaque stamp résout son symbole, son label et sa
                            couleur depuis le registre
                            <code> faune.rarete</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {FAUNE_RARETE_META.map((rarity) => (
                            <LRZStamp
                                collection="faune"
                                meta="rarete"
                                slug={rarity.slug}
                                key={rarity.slug}
                                size="md"
                                variant="pill"
                                tone="subtle"
                                font="grotesk"
                                symbolScale={1.1}
                                shadow="soft"
                            />
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-guinguette-ambiences"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="stamp-guinguette-ambiences">
                            Les ambiances de guinguettes
                        </h2>
                        <p>
                            Chaque stamp récupère son illustration, son label et
                            sa couleur dans le registre
                            <code> guinguette.ambience</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {GUINGUETTE_AMBIENCE_META.map((ambience) => (
                            <LRZStamp
                                collection="guinguette"
                                meta="ambience"
                                slug={ambience.slug}
                                key={ambience.slug}
                                size="md"
                                variant="pill"
                                tone="subtle"
                                font="grotesk"
                                symbolScale={1.1}
                                shadow="soft"
                            />
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-categories"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="stamp-categories">
                            Les catégories de personnages
                        </h2>
                        <p>
                            Les seize noms métier sont résolus depuis
                            personnage.categorie et restent strictement typés.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {CATEGORIES_PERSONNAGES.map((category) => (
                            <LRZStamp
                                collection="personnage"
                                meta="categorie"
                                slug={category.slug}
                                key={category.slug}
                                size="sm"
                                variant="badge"
                                tone="outline"
                                maxWidth="100%"
                                truncate
                            />
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-variants"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Formes</p>
                        <h2 id="stamp-variants">Cinq silhouettes</h2>
                        <p>
                            Elles expriment des niveaux différents, de la
                            capsule discrète à l’insigne éditorial.
                        </p>
                    </div>
                    <div className={styles.variantGrid}>
                        {VARIANTS.map(({ variant, slug, detail }) => (
                            <article
                                className={styles.exampleCard}
                                key={variant}
                            >
                                <LRZStamp
                                    collection="index"
                                    slug={slug}
                                    variant={variant}
                                    size={variant === "seal" ? "xl" : "lg"}
                                    detail={detail}
                                    shadow="soft"
                                />
                                <code>variant=&quot;{variant}&quot;</code>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-tones"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Traitements</p>
                        <h2 id="stamp-tones">Quatre niveaux de présence</h2>
                    </div>
                    <div className={styles.toneGrid}>
                        {TONES.map((tone) => (
                            <article className={styles.exampleCard} key={tone}>
                                <LRZStamp
                                    collection="personnage"
                                    meta="categorie"
                                    slug="artiste"
                                    size="lg"
                                    tone={tone}
                                    symbolFrame={
                                        tone === "solid" ? "subtle" : "none"
                                    }
                                />
                                <code>tone=&quot;{tone}&quot;</code>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-sizes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Dimensions</p>
                        <h2 id="stamp-sizes">Presets et taille custom</h2>
                        <p>
                            La hauteur pilote proportionnellement le symbole, la
                            typographie et les espacements.
                        </p>
                    </div>
                    <div className={styles.sizeStack}>
                        {SIZES.map(({ size, label }) => (
                            <div className={styles.sizeExample} key={label}>
                                <code>{label}</code>
                                <LRZStamp
                                    collection="index"
                                    slug="guinguettes"
                                    size={size}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.sizeReference}>
                        {Object.entries(LRZ_STAMP_SIZE_VALUES).map(
                            ([name, pixels]) => (
                                <code key={name}>
                                    {name} = {pixels}px
                                </code>
                            ),
                        )}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-fonts"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Typographies</p>
                        <h2 id="stamp-fonts">Les huit polices LRZ</h2>
                        <p>
                            La prop font applique une famille du design system
                            au label principal. Le détail reste en police body
                            pour préserver sa lisibilité.
                        </p>
                    </div>
                    <div className={styles.fontGrid}>
                        {FONTS.map(({ font, label }) => (
                            <article className={styles.exampleCard} key={font}>
                                <LRZStamp
                                    collection="personnage"
                                    meta="categorie"
                                    slug="muse"
                                    font={font}
                                    size="lg"
                                    labelColor="mauve"
                                />
                                <strong>{label}</strong>
                                <code>font=&quot;{font}&quot;</code>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-positions"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Composition</p>
                        <h2 id="stamp-positions">Trois positions du symbole</h2>
                    </div>
                    <div className={styles.positionGrid}>
                        {POSITIONS.map(({ position, label }) => (
                            <article
                                className={styles.exampleCard}
                                key={position}
                            >
                                <LRZStamp
                                    collection="personnage"
                                    meta="categorie"
                                    slug="mecene"
                                    size={position === "top" ? "xl" : "lg"}
                                    variant={
                                        position === "top" ? "seal" : "pill"
                                    }
                                    symbolPosition={position}
                                />
                                <strong>{label}</strong>
                                <code>
                                    symbolPosition=&quot;{position}&quot;
                                </code>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="stamp-api"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Référence</p>
                        <h2 id="stamp-api">API du composant</h2>
                    </div>
                    <div className={shellStyles.tableScroll}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Défaut</th>
                                    <th>Rôle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {API_PROPS.map(
                                    ([
                                        name,
                                        type,
                                        defaultValue,
                                        description,
                                    ]) => (
                                        <tr key={name}>
                                            <td>
                                                <code>{name}</code>
                                            </td>
                                            <td>
                                                <code>{type}</code>
                                            </td>
                                            <td>{defaultValue}</td>
                                            <td>{description}</td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
