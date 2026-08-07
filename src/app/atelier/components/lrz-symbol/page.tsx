import type { CSSProperties } from "react";
import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import {
    LRZSymbol,
    LRZ_SYMBOL_SIZE_VALUES,
    type LRZCodexIndexSymbolSlug,
    type LRZCommonArchitectureSymbolSlug,
    type LRZCommonEpoqueSymbolSlug,
    type LRZCommonExperienceSymbolSlug,
    type LRZCommonMilieuSymbolSlug,
    type LRZCommonTerritoireSymbolSlug,
    type LRZFauneRareteSymbolSlug,
    type LRZFauneTypeSymbolSlug,
    type LRZFloreCategorieSymbolSlug,
    type LRZFloreRareteSymbolSlug,
    type LRZGuinguetteAmbienceSymbolSlug,
    type LRZSymbolFrame,
    type LRZSymbolPadding,
    type LRZSymbolShadow,
    type LRZSymbolShape,
    type LRZSymbolSize,
} from "@/components/LRZSymbol";
import { CATEGORIES_PERSONNAGES } from "@/registry/categories-personnages";
import { getLRZColorValue } from "@/registry/colors";
import { CODEX_INDEX_META } from "@/registry/Meta/codex-index";
import { COMMON_ARCHITECTURE_META } from "@/registry/Meta/common-architecture";
import { COMMON_EPOQUE_META } from "@/registry/Meta/common-epoque";
import { COMMON_EXPERIENCE_META } from "@/registry/Meta/common-experience";
import { COMMON_MILIEU_META } from "@/registry/Meta/common-milieu";
import { COMMON_TERRITOIRE_META } from "@/registry/Meta/common-territoire";
import { FAUNE_RARETE_META } from "@/registry/Meta/faune-rarete";
import { FAUNE_TYPE_META } from "@/registry/Meta/faune-type";
import { FLORE_CATEGORIE_META } from "@/registry/Meta/flore-categorie";
import { FLORE_RARETE_META } from "@/registry/Meta/flore-rarete";
import { GUINGUETTE_AMBIENCE_META } from "@/registry/Meta/guinguette-ambience";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import shellStyles from "../filter-playground.module.css";
import LRZSymbolPlayground, {
    type LRZSymbolPlaygroundOption,
} from "./LRZSymbolPlayground";
import styles from "./LRZSymbolShowcase.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-symbol",
);

type AccentStyle = CSSProperties & {
    "--showcase-accent": string;
};

const SIZE_EXAMPLES: Array<{
    size: LRZSymbolSize | number;
    label: string;
    detail: string;
}> = [
    { size: "xs", label: "xs", detail: "16 px" },
    { size: "sm", label: "sm", detail: "24 px" },
    { size: "md", label: "md", detail: "32 px" },
    { size: "lg", label: "lg", detail: "48 px" },
    { size: "xl", label: "xl", detail: "64 px" },
    { size: "2xl", label: "2xl", detail: "96 px" },
    { size: 72, label: "custom", detail: "72 px" },
];

const FRAME_EXAMPLES: Array<{
    frame: LRZSymbolFrame;
    label: string;
}> = [
    { frame: "none", label: "Sans cadre" },
    { frame: "subtle", label: "Subtle" },
    { frame: "outline", label: "Outline" },
    { frame: "solid", label: "Solid" },
];

const SHAPE_EXAMPLES: Array<{
    shape: LRZSymbolShape;
    label: string;
}> = [
    { shape: "square", label: "Carré" },
    { shape: "rounded", label: "Arrondi" },
    { shape: "circle", label: "Cercle" },
];

const PADDING_EXAMPLES: Array<{
    padding: LRZSymbolPadding | number;
    label: string;
}> = [
    { padding: "none", label: "Aucun" },
    { padding: "xs", label: "XS" },
    { padding: "sm", label: "SM" },
    { padding: "md", label: "MD" },
    { padding: 12, label: "12 px" },
];

const SHADOW_EXAMPLES: Array<{
    shadow: LRZSymbolShadow;
    label: string;
}> = [
    { shadow: "none", label: "Aucune" },
    { shadow: "soft", label: "Douce" },
    { shadow: "strong", label: "Forte" },
];

const CODEX_INDEX_OPTIONS = CODEX_INDEX_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZSymbolPlaygroundOption<LRZCodexIndexSymbolSlug>[];

const COMMON_EPOQUE_OPTIONS = COMMON_EPOQUE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZSymbolPlaygroundOption<LRZCommonEpoqueSymbolSlug>[];

const COMMON_ARCHITECTURE_OPTIONS = COMMON_ARCHITECTURE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZSymbolPlaygroundOption<LRZCommonArchitectureSymbolSlug>[];

const COMMON_MILIEU_OPTIONS = COMMON_MILIEU_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZSymbolPlaygroundOption<LRZCommonMilieuSymbolSlug>[];

const COMMON_EXPERIENCE_OPTIONS = COMMON_EXPERIENCE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZSymbolPlaygroundOption<LRZCommonExperienceSymbolSlug>[];

const COMMON_TERRITOIRE_OPTIONS = COMMON_TERRITOIRE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZSymbolPlaygroundOption<LRZCommonTerritoireSymbolSlug>[];

const FAUNE_TYPE_OPTIONS = FAUNE_TYPE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZSymbolPlaygroundOption<LRZFauneTypeSymbolSlug>[];

const FAUNE_RARETE_OPTIONS = FAUNE_RARETE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZSymbolPlaygroundOption<LRZFauneRareteSymbolSlug>[];

const FLORE_CATEGORIE_OPTIONS = FLORE_CATEGORIE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZSymbolPlaygroundOption<LRZFloreCategorieSymbolSlug>[];

const FLORE_RARETE_OPTIONS = FLORE_RARETE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZSymbolPlaygroundOption<LRZFloreRareteSymbolSlug>[];

const GUINGUETTE_AMBIENCE_OPTIONS = GUINGUETTE_AMBIENCE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZSymbolPlaygroundOption<LRZGuinguetteAmbienceSymbolSlug>[];

const PERSONNAGE_SYMBOL_OPTIONS = CATEGORIES_PERSONNAGES.map(
    ({ slug, nom }) => ({ slug, label: nom }),
);

const API_PROPS = [
    [
        "collection",
        '"codex" | "common" | "faune" | "flore" | "guinguette" | "personnage"',
        "—",
        "Collection du symbole.",
    ],
    [
        "meta",
        '"index" | "epoque" | "architecture" | "milieu" | "experience" | "territoire" | "type" | "rarete" | "categorie" | "ambience"',
        "—",
        "Métadonnée de la collection.",
    ],
    [
        "slug",
        "LRZCodexIndexSymbolSlug | LRZCommonEpoqueSymbolSlug | LRZCommonArchitectureSymbolSlug | LRZCommonMilieuSymbolSlug | LRZCommonExperienceSymbolSlug | LRZCommonTerritoireSymbolSlug | LRZFauneTypeSymbolSlug | LRZFauneRareteSymbolSlug | LRZFloreCategorieSymbolSlug | LRZFloreRareteSymbolSlug | LRZGuinguetteAmbienceSymbolSlug | CategoriePersonnageSlug",
        "—",
        "Identifiant qui sélectionne le symbole.",
    ],
    [
        "size",
        '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number',
        '"md"',
        "Taille extérieure, en preset ou en pixels.",
    ],
    [
        "frame",
        '"none" | "subtle" | "outline" | "solid"',
        '"none"',
        "Surface entourant le symbole.",
    ],
    [
        "shape",
        '"square" | "rounded" | "circle"',
        '"rounded"',
        "Forme du cadre.",
    ],
    [
        "padding",
        '"none" | "xs" | "sm" | "md" | number',
        "auto",
        "Espace intérieur, compris dans size.",
    ],
    [
        "shadow",
        '"none" | "soft" | "strong"',
        '"none"',
        "Ombre portée du symbole ou du cadre.",
    ],
    [
        "accent",
        "string",
        "accent du registre",
        "Couleur CSS du cadre et des ombres.",
    ],
    [
        "decorative",
        "boolean",
        "true",
        "Masque le symbole aux technologies d’assistance.",
    ],
    ["label", "string", "—", "Obligatoire lorsque decorative vaut false."],
    [
        "loading",
        '"lazy" | "eager"',
        '"lazy"',
        "Stratégie de chargement de l’image.",
    ],
    [
        "fallback",
        "ReactNode",
        "null",
        "Contenu affiché si le registre ne trouve aucune source.",
    ],
] as const;

export default function LRZSymbolPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-symbol" />

            <div className={shellStyles.wrap}>
                <header className={shellStyles.header}>
                    <Link className={shellStyles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={shellStyles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={shellStyles.title}>LRZSymbol</h1>
                    <p className={shellStyles.lede}>
                        La porte d’entrée unique vers les symboles illustrés du
                        Codex. Le composant résout le bon visuel, sa couleur
                        d’accent et son traitement sans exposer le chemin du
                        fichier à l’écran qui l’utilise.
                    </p>
                </header>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-main-example"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Exemple principal</p>
                        <h2 id="symbol-main-example">
                            Un symbole, une identité métier
                        </h2>
                        <p>
                            La combinaison collection, meta et slug suffit. La
                            couleur du cadre provient automatiquement du
                            registre métier.
                        </p>
                    </div>

                    <div className={styles.heroPreview}>
                        <LRZSymbol
                            collection="personnage"
                            meta="categorie"
                            slug="souverain"
                            size="2xl"
                            frame="subtle"
                            shape="circle"
                            padding="sm"
                            shadow="strong"
                        />
                        <div>
                            <span className={styles.heroLabel}>
                                Catégorie 01
                            </span>
                            <h3>Souverains et souveraines</h3>
                            <p>
                                Un visuel décoratif placé auprès d’un libellé
                                visible : il reste silencieux pour les lecteurs
                                d’écran.
                            </p>
                        </div>
                    </div>

                    <pre className={shellStyles.code}>
                        <code>{`<LRZSymbol
  collection="personnage"
  meta="categorie"
  slug="souverain"
  size="2xl"
  frame="subtle"
  shape="circle"
  padding="sm"
  shadow="strong"
/>`}</code>
                    </pre>
                </section>

                <LRZSymbolPlayground
                    codexIndexOptions={CODEX_INDEX_OPTIONS}
                    commonEpoqueOptions={COMMON_EPOQUE_OPTIONS}
                    commonArchitectureOptions={COMMON_ARCHITECTURE_OPTIONS}
                    commonMilieuOptions={COMMON_MILIEU_OPTIONS}
                    commonExperienceOptions={COMMON_EXPERIENCE_OPTIONS}
                    commonTerritoireOptions={COMMON_TERRITOIRE_OPTIONS}
                    fauneTypeOptions={FAUNE_TYPE_OPTIONS}
                    fauneRareteOptions={FAUNE_RARETE_OPTIONS}
                    floreCategorieOptions={FLORE_CATEGORIE_OPTIONS}
                    floreRareteOptions={FLORE_RARETE_OPTIONS}
                    guinguetteOptions={GUINGUETTE_AMBIENCE_OPTIONS}
                    personnageOptions={PERSONNAGE_SYMBOL_OPTIONS}
                />

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-index-collection"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection Codex</p>
                        <h2 id="symbol-index-collection">
                            Les symboles des index
                        </h2>
                        <p>
                            Le locator <code>codex.index</code> regroupe les
                            symboles des index illustrés du Codex dans
                            <code> /symbols/codex/index/</code>.
                        </p>
                    </div>

                    <div className={styles.indexGrid}>
                        {CODEX_INDEX_OPTIONS.map(({ slug, label }) => (
                            <article className={styles.indexCard} key={slug}>
                                <LRZSymbol
                                    collection="codex"
                                    meta="index"
                                    slug={slug}
                                    size="2xl"
                                    frame="subtle"
                                    padding="sm"
                                    shadow="soft"
                                />
                                <h3>{label}</h3>
                                <code>{`slug="${slug}"`}</code>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-common-territoires"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="symbol-common-territoires">
                            Les huit territoires du Codex
                        </h2>
                        <p>
                            Le locator <code>common.territoire</code> suit la
                            Loire de l’amont à l’Atlantique avec une série de
                            blasons conservant leurs proportions originales.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {COMMON_TERRITOIRE_META.map((territory) => (
                            <article
                                className={styles.catalogCard}
                                key={territory.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            territory.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="common"
                                    meta="territoire"
                                    slug={territory.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{territory.color}</span>
                                    <h3>{territory.label}</h3>
                                    <code>{territory.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-common-experiences"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="symbol-common-experiences">
                            Les vingt-huit expériences du Codex
                        </h2>
                        <p>
                            Le locator <code>common.experience</code> rassemble
                            les activités culturelles, sportives, gourmandes et
                            contemplatives proposées dans le Codex.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {COMMON_EXPERIENCE_META.map((experience) => (
                            <article
                                className={styles.catalogCard}
                                key={experience.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            experience.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="common"
                                    meta="experience"
                                    slug={experience.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{experience.color}</span>
                                    <h3>{experience.label}</h3>
                                    <code>{experience.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-common-architectures"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="symbol-common-architectures">
                            Les vingt architectures du Codex
                        </h2>
                        <p>
                            Le locator <code>common.architecture</code> associe
                            chaque courant à son illustration, son label et sa
                            couleur LRZ.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {COMMON_ARCHITECTURE_META.map((architecture) => (
                            <article
                                className={styles.catalogCard}
                                key={architecture.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            architecture.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="common"
                                    meta="architecture"
                                    slug={architecture.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{architecture.color}</span>
                                    <h3>{architecture.label}</h3>
                                    <code>{architecture.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-common-epoques"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="symbol-common-epoques">
                            Les dix époques du Codex
                        </h2>
                        <p>
                            Le locator <code>common.epoque</code> fournit une
                            chronologie partagée par toutes les collections.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {COMMON_EPOQUE_META.map((period) => (
                            <article
                                className={styles.catalogCard}
                                key={period.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            period.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="common"
                                    meta="epoque"
                                    slug={period.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{period.color}</span>
                                    <h3>{period.label}</h3>
                                    <code>{period.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-common-milieux"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="symbol-common-milieux">
                            Les trente milieux du Codex
                        </h2>
                        <p>
                            Le locator <code>common.milieu</code> décrit les
                            espaces naturels, cultivés et bâtis avec une
                            identité partagée par toutes les collections.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {COMMON_MILIEU_META.map((environment) => (
                            <article
                                className={styles.catalogCard}
                                key={environment.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            environment.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="common"
                                    meta="milieu"
                                    slug={environment.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{environment.color}</span>
                                    <h3>{environment.label}</h3>
                                    <code>{environment.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-flore-raretes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="symbol-flore-raretes">
                            Les quatre raretés de flore
                        </h2>
                        <p>
                            Le locator <code>flore.rarete</code> associe chaque
                            niveau à son symbole botanique et à sa couleur LRZ.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {FLORE_RARETE_META.map((rarity) => (
                            <article
                                className={styles.catalogCard}
                                key={rarity.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            rarity.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="flore"
                                    meta="rarete"
                                    slug={rarity.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{rarity.color}</span>
                                    <h3>{rarity.label}</h3>
                                    <code>{rarity.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-flore-categories"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="symbol-flore-categories">
                            Les sept catégories de flore
                        </h2>
                        <p>
                            Le locator <code>flore.categorie</code> associe
                            chaque forme botanique à son symbole, son label et
                            sa couleur LRZ.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {FLORE_CATEGORIE_META.map((category) => (
                            <article
                                className={styles.catalogCard}
                                key={category.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            category.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="flore"
                                    meta="categorie"
                                    slug={category.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{category.color}</span>
                                    <h3>{category.label}</h3>
                                    <code>{category.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-faune-types"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="symbol-faune-types">Les six types de faune</h2>
                        <p>
                            Le locator <code>faune.type</code> associe chaque
                            slug à son symbole, son label et sa couleur LRZ.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {FAUNE_TYPE_META.map((type) => (
                            <article
                                className={styles.catalogCard}
                                key={type.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            type.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="faune"
                                    meta="type"
                                    slug={type.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{type.color}</span>
                                    <h3>{type.label}</h3>
                                    <code>{type.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-faune-raretes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="symbol-faune-raretes">
                            Les quatre raretés de faune
                        </h2>
                        <p>
                            Le locator <code>faune.rarete</code> traduit la
                            fréquence d’observation par un symbole et une
                            couleur LRZ dédiés.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {FAUNE_RARETE_META.map((rarity) => (
                            <article
                                className={styles.catalogCard}
                                key={rarity.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            rarity.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="faune"
                                    meta="rarete"
                                    slug={rarity.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{rarity.color}</span>
                                    <h3>{rarity.label}</h3>
                                    <code>{rarity.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-guinguette-ambiences"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="symbol-guinguette-ambiences">
                            Les 23 ambiances de guinguettes
                        </h2>
                        <p>
                            Le locator <code>guinguette.ambience</code> relie
                            chaque ambiance à son illustration, son label et sa
                            couleur LRZ.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {GUINGUETTE_AMBIENCE_META.map((ambience) => (
                            <article
                                className={styles.catalogCard}
                                key={ambience.slug}
                                style={
                                    {
                                        "--showcase-accent": getLRZColorValue(
                                            ambience.color,
                                        ),
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="guinguette"
                                    meta="ambience"
                                    slug={ambience.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{ambience.color}</span>
                                    <h3>{ambience.label}</h3>
                                    <code>{ambience.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-catalog"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Registre</p>
                        <h2 id="symbol-catalog">Les 16 catégories</h2>
                        <p>
                            Chaque slug est strictement typé et relié à son
                            fichier dans le registre central des symboles.
                        </p>
                    </div>

                    <div className={styles.catalogGrid}>
                        {CATEGORIES_PERSONNAGES.map((category) => (
                            <article
                                className={styles.catalogCard}
                                key={category.slug}
                                style={
                                    {
                                        "--showcase-accent":
                                            category.identite.accent,
                                    } as AccentStyle
                                }
                            >
                                <LRZSymbol
                                    collection="personnage"
                                    meta="categorie"
                                    slug={category.slug}
                                    size="xl"
                                    frame="subtle"
                                    padding="xs"
                                />
                                <div className={styles.catalogCopy}>
                                    <span>{category.famille}</span>
                                    <h3>{category.nom}</h3>
                                    <code>{category.slug}</code>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-sizes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Dimensions</p>
                        <h2 id="symbol-sizes">Tailles prédéfinies et custom</h2>
                        <p>
                            La taille désigne toujours la boîte extérieure. Les
                            masters actuels font 192 × 192 px.
                        </p>
                    </div>

                    <div className={styles.sizeGrid}>
                        {SIZE_EXAMPLES.map(({ size, label, detail }) => (
                            <div className={styles.sizeExample} key={label}>
                                <div className={styles.sizeCanvas}>
                                    <LRZSymbol
                                        collection="personnage"
                                        meta="categorie"
                                        slug="scientifique"
                                        size={size}
                                        shadow="soft"
                                    />
                                </div>
                                <strong>{label}</strong>
                                <span>{detail}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.sizeReference}>
                        {Object.entries(LRZ_SYMBOL_SIZE_VALUES).map(
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
                    aria-labelledby="symbol-frames"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Cadres</p>
                        <h2 id="symbol-frames">Quatre niveaux de présence</h2>
                        <p>
                            Le symbole reste inchangé ; seul son écrin exploite
                            la couleur d’accent de la catégorie.
                        </p>
                    </div>

                    <div className={styles.variantGrid}>
                        {FRAME_EXAMPLES.map(({ frame, label }) => (
                            <div className={styles.variantExample} key={frame}>
                                <LRZSymbol
                                    collection="personnage"
                                    meta="categorie"
                                    slug="mecene"
                                    size="2xl"
                                    frame={frame}
                                    padding={frame === "none" ? "none" : "sm"}
                                    shadow="soft"
                                />
                                <strong>{label}</strong>
                                <code>frame=&quot;{frame}&quot;</code>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-customization"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Personnalisation</p>
                        <h2 id="symbol-customization">
                            Formes, espacements et ombres
                        </h2>
                        <p>
                            Ces options s’additionnent sans changer les
                            dimensions réservées par le composant.
                        </p>
                    </div>

                    <div className={styles.customizationStack}>
                        <div className={styles.optionGroup}>
                            <h3>Formes</h3>
                            <div className={styles.optionRow}>
                                {SHAPE_EXAMPLES.map(({ shape, label }) => (
                                    <div
                                        className={styles.optionExample}
                                        key={shape}
                                    >
                                        <LRZSymbol
                                            collection="personnage"
                                            meta="categorie"
                                            slug="noble"
                                            size="xl"
                                            frame="outline"
                                            shape={shape}
                                            padding="sm"
                                        />
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.optionGroup}>
                            <h3>Padding</h3>
                            <div className={styles.optionRow}>
                                {PADDING_EXAMPLES.map(({ padding, label }) => (
                                    <div
                                        className={styles.optionExample}
                                        key={label}
                                    >
                                        <LRZSymbol
                                            collection="personnage"
                                            meta="categorie"
                                            slug="batisseur"
                                            size="xl"
                                            frame="subtle"
                                            padding={padding}
                                        />
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.optionGroup}>
                            <h3>Ombres</h3>
                            <div className={styles.optionRow}>
                                {SHADOW_EXAMPLES.map(({ shadow, label }) => (
                                    <div
                                        className={styles.optionExample}
                                        key={shadow}
                                    >
                                        <LRZSymbol
                                            collection="personnage"
                                            meta="categorie"
                                            slug="courtisan"
                                            size="xl"
                                            frame="subtle"
                                            padding="sm"
                                            shadow={shadow}
                                        />
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.optionGroup}>
                            <h3>Accent personnalisé</h3>
                            <div className={styles.optionRow}>
                                <div className={styles.optionExample}>
                                    <LRZSymbol
                                        collection="personnage"
                                        meta="categorie"
                                        slug="artiste"
                                        size="xl"
                                        frame="solid"
                                        padding="sm"
                                        shadow="strong"
                                        accent="#c46a4b"
                                    />
                                    <span>#c46a4b</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-accessibility"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Accessibilité</p>
                        <h2 id="symbol-accessibility">
                            Décoratif par défaut, informatif sur demande
                        </h2>
                        <p>
                            Lorsqu’un nom de catégorie est déjà visible, aucune
                            annonce supplémentaire n’est nécessaire. Dans les
                            autres cas, decorative=false impose un label au
                            niveau du typage.
                        </p>
                    </div>

                    <div className={styles.accessibilityGrid}>
                        <div className={styles.accessibilityExample}>
                            <LRZSymbol
                                collection="personnage"
                                meta="categorie"
                                slug="ecrivain"
                                size="lg"
                            />
                            <div>
                                <strong>Décoratif</strong>
                                <p>Le nom « Écrivains » est déjà affiché.</p>
                            </div>
                        </div>
                        <div className={styles.accessibilityExample}>
                            <LRZSymbol
                                collection="personnage"
                                meta="categorie"
                                slug="soignant"
                                size="lg"
                                decorative={false}
                                label="Catégorie Soignants et soignantes"
                            />
                            <div>
                                <strong>Informatif</strong>
                                <p>Le symbole reçoit un équivalent textuel.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className={shellStyles.section}
                    aria-labelledby="symbol-api"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Référence</p>
                        <h2 id="symbol-api">API du composant</h2>
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
        </>
    );
}
