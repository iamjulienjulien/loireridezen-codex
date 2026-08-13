import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";

import {
    LRZStamp,
    LRZ_STAMP_SIZE_VALUES,
    type LRZStampFont,
    type LRZStampPosition,
    type LRZStampSize,
    type LRZStampTone,
    type LRZStampVariant,
} from "@/components/_ui/LRZStamp";
import { CATEGORIES_PERSONNAGES } from "@/registry/categories-personnages";
import { CHATEAU_RENOMMEE_META } from "@/registry/Meta/chateau-renommee";
import { CHATEAU_VISITE_META } from "@/registry/Meta/chateau-visite";
import { CODEX_INDEX_META } from "@/registry/Meta/codex-index";
import { COMMON_ARCHITECTURE_META } from "@/registry/Meta/common-architecture";
import { COMMON_EPOQUE_META } from "@/registry/Meta/common-epoque";
import { COMMON_EXPERIENCE_META } from "@/registry/Meta/common-experience";
import { COMMON_GENERAL_META } from "@/registry/Meta/common-general";
import { COMMON_MILIEU_META } from "@/registry/Meta/common-milieu";
import { COMMON_TERRITOIRE_META } from "@/registry/Meta/common-territoire";
import { COMMON_WEBSITE_META } from "@/registry/Meta/common-website";
import { FAUNE_RARETE_META } from "@/registry/Meta/faune-rarete";
import { FAUNE_TYPE_META } from "@/registry/Meta/faune-type";
import { FLORE_CATEGORIE_META } from "@/registry/Meta/flore-categorie";
import { FLORE_RARETE_META } from "@/registry/Meta/flore-rarete";
import { GUINGUETTE_AMBIENCE_META } from "@/registry/Meta/guinguette-ambience";
import { GUINGUETTE_ACTIVITE_META } from "@/registry/Meta/guinguette-activite";
import { VIGNOBLE_APPELLATION_META } from "@/registry/Meta/vignoble-appellation";
import { VIGNOBLE_CEPAGE_META } from "@/registry/Meta/vignoble-cepage";
import { VIGNOBLE_COULEUR_META } from "@/registry/Meta/vignoble-couleur";
import { VIGNOBLE_NOTORIETE_META } from "@/registry/Meta/vignoble-notoriete";
import { VIGNOBLE_TERROIR_META } from "@/registry/Meta/vignoble-terroir";
import {
    type LRZChateauRenommeeSymbolSlug,
    type LRZChateauVisiteSymbolSlug,
    type LRZCodexIndexSymbolSlug,
    type LRZCommonArchitectureSymbolSlug,
    type LRZCommonEpoqueSymbolSlug,
    type LRZCommonExperienceSymbolSlug,
    type LRZCommonGeneralSymbolSlug,
    type LRZCommonMilieuSymbolSlug,
    type LRZCommonTerritoireSymbolSlug,
    type LRZCommonWebsiteSymbolSlug,
    type LRZFauneRareteSymbolSlug,
    type LRZFauneTypeSymbolSlug,
    type LRZFloreCategorieSymbolSlug,
    type LRZFloreRareteSymbolSlug,
    type LRZGuinguetteAmbienceSymbolSlug,
    type LRZGuinguetteActiviteSymbolSlug,
    type LRZVignobleAppellationSymbolSlug,
    type LRZVignobleCepageSymbolSlug,
    type LRZVignobleCouleurSymbolSlug,
    type LRZVignobleNotorieteSymbolSlug,
    type LRZVignobleTerroirSymbolSlug,
} from "@/registry/symbols";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import shellStyles from "../filter-playground.module.css";
import LRZStampPlayground, {
    type LRZStampPlaygroundOption,
} from "./LRZStampPlayground";
import styles from "./LRZStampShowcase.module.css";

export const metadata = getAtelierPageMetadata("/atelier/components/lrz-stamp");

const CODEX_INDEX_OPTIONS = CODEX_INDEX_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZCodexIndexSymbolSlug>[];

const CHATEAU_RENOMMEE_OPTIONS = CHATEAU_RENOMMEE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZChateauRenommeeSymbolSlug>[];

const CHATEAU_VISITE_OPTIONS = CHATEAU_VISITE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZChateauVisiteSymbolSlug>[];

const COMMON_EPOQUE_OPTIONS = COMMON_EPOQUE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZCommonEpoqueSymbolSlug>[];

const COMMON_ARCHITECTURE_OPTIONS = COMMON_ARCHITECTURE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZCommonArchitectureSymbolSlug>[];

const COMMON_MILIEU_OPTIONS = COMMON_MILIEU_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZCommonMilieuSymbolSlug>[];

const COMMON_EXPERIENCE_OPTIONS = COMMON_EXPERIENCE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZCommonExperienceSymbolSlug>[];

const COMMON_GENERAL_OPTIONS = COMMON_GENERAL_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZCommonGeneralSymbolSlug>[];

const COMMON_TERRITOIRE_OPTIONS = COMMON_TERRITOIRE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZCommonTerritoireSymbolSlug>[];

const COMMON_WEBSITE_OPTIONS = COMMON_WEBSITE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZCommonWebsiteSymbolSlug>[];

const FAUNE_TYPE_OPTIONS = FAUNE_TYPE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZFauneTypeSymbolSlug>[];

const FAUNE_RARETE_OPTIONS = FAUNE_RARETE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZFauneRareteSymbolSlug>[];

const FLORE_CATEGORIE_OPTIONS = FLORE_CATEGORIE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZFloreCategorieSymbolSlug>[];

const FLORE_RARETE_OPTIONS = FLORE_RARETE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZFloreRareteSymbolSlug>[];

const GUINGUETTE_OPTIONS = GUINGUETTE_AMBIENCE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZGuinguetteAmbienceSymbolSlug>[];

const GUINGUETTE_ACTIVITE_OPTIONS = GUINGUETTE_ACTIVITE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZGuinguetteActiviteSymbolSlug>[];

const PERSONNAGE_OPTIONS = CATEGORIES_PERSONNAGES.map(({ slug, nom }) => ({
    slug,
    label: nom,
}));

const VIGNOBLE_APPELLATION_OPTIONS = VIGNOBLE_APPELLATION_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZVignobleAppellationSymbolSlug>[];

const VIGNOBLE_CEPAGE_OPTIONS = VIGNOBLE_CEPAGE_META.map(({ slug, label }) => ({
    slug,
    label,
})) satisfies readonly LRZStampPlaygroundOption<LRZVignobleCepageSymbolSlug>[];

const VIGNOBLE_COULEUR_OPTIONS = VIGNOBLE_COULEUR_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZVignobleCouleurSymbolSlug>[];

const VIGNOBLE_NOTORIETE_OPTIONS = VIGNOBLE_NOTORIETE_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZVignobleNotorieteSymbolSlug>[];

const VIGNOBLE_TERROIR_OPTIONS = VIGNOBLE_TERROIR_META.map(
    ({ slug, label }) => ({ slug, label }),
) satisfies readonly LRZStampPlaygroundOption<LRZVignobleTerroirSymbolSlug>[];

const VARIANTS: Array<{
    variant: LRZStampVariant;
    slug: LRZCodexIndexSymbolSlug;
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
        '"codex" | "chateau" | "common" | "faune" | "flore" | "guinguette" | "personnage" | "vignoble"',
        "—",
        "Collection métier.",
    ],
    [
        "meta",
        '"index" | "renommee" | "visite" | "epoque" | "architecture" | "milieu" | "experience" | "general" | "territoire" | "website" | "type" | "rarete" | "categorie" | "ambience" | "activite" | "appellation" | "cepage" | "couleur" | "notoriete" | "terroir"',
        "—",
        "Métadonnée de la collection.",
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
        "paddingX",
        '"xs" | "sm" | "md" | "lg" | number',
        "undefined",
        "Espace horizontal, prioritaire sur padding.",
    ],
    [
        "paddingY",
        '"xs" | "sm" | "md" | "lg" | number',
        "undefined",
        "Espace vertical, prioritaire sur padding.",
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
        <>
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
                    codexIndexOptions={CODEX_INDEX_OPTIONS}
                    chateauRenommeeOptions={CHATEAU_RENOMMEE_OPTIONS}
                    chateauVisiteOptions={CHATEAU_VISITE_OPTIONS}
                    commonEpoqueOptions={COMMON_EPOQUE_OPTIONS}
                    commonArchitectureOptions={COMMON_ARCHITECTURE_OPTIONS}
                    commonMilieuOptions={COMMON_MILIEU_OPTIONS}
                    commonExperienceOptions={COMMON_EXPERIENCE_OPTIONS}
                    commonGeneralOptions={COMMON_GENERAL_OPTIONS}
                    commonTerritoireOptions={COMMON_TERRITOIRE_OPTIONS}
                    commonWebsiteOptions={COMMON_WEBSITE_OPTIONS}
                    fauneTypeOptions={FAUNE_TYPE_OPTIONS}
                    fauneRareteOptions={FAUNE_RARETE_OPTIONS}
                    floreCategorieOptions={FLORE_CATEGORIE_OPTIONS}
                    floreRareteOptions={FLORE_RARETE_OPTIONS}
                    guinguetteOptions={GUINGUETTE_OPTIONS}
                    guinguetteActiviteOptions={GUINGUETTE_ACTIVITE_OPTIONS}
                    personnageOptions={PERSONNAGE_OPTIONS}
                    vignobleAppellationOptions={VIGNOBLE_APPELLATION_OPTIONS}
                    vignobleCepageOptions={VIGNOBLE_CEPAGE_OPTIONS}
                    vignobleCouleurOptions={VIGNOBLE_COULEUR_OPTIONS}
                    vignobleNotorieteOptions={VIGNOBLE_NOTORIETE_OPTIONS}
                    vignobleTerroirOptions={VIGNOBLE_TERROIR_OPTIONS}
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
                            Le locator <code>codex.index</code> associe le label
                            court et la couleur de chaque index à son symbole.
                        </p>
                    </div>
                    <div className={styles.indexGrid}>
                        {CODEX_INDEX_OPTIONS.map(({ slug }) => (
                            <LRZStamp
                                collection="codex"
                                meta="index"
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
                    aria-labelledby="stamp-vignoble-appellations"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection Vignobles
                        </p>
                        <h2 id="stamp-vignoble-appellations">
                            Les appellations viticoles
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> vignoble.appellation</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {VIGNOBLE_APPELLATION_META.map((appellation) => (
                            <LRZStamp
                                collection="vignoble"
                                meta="appellation"
                                slug={appellation.slug}
                                key={appellation.slug}
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
                    aria-labelledby="stamp-vignoble-cepages"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection Vignobles
                        </p>
                        <h2 id="stamp-vignoble-cepages">
                            Les cépages ligériens
                        </h2>
                        <p>
                            Chaque stamp récupère sa grappe, son label et sa
                            couleur depuis le registre
                            <code> vignoble.cepage</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {VIGNOBLE_CEPAGE_META.map((grapeVariety) => (
                            <LRZStamp
                                collection="vignoble"
                                meta="cepage"
                                slug={grapeVariety.slug}
                                key={grapeVariety.slug}
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
                    aria-labelledby="stamp-vignoble-terroirs"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection Vignobles
                        </p>
                        <h2 id="stamp-vignoble-terroirs">
                            Les terroirs viticoles
                        </h2>
                        <p>
                            Chaque stamp récupère son échantillon géologique,
                            son label et sa couleur depuis le registre
                            <code> vignoble.terroir</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {VIGNOBLE_TERROIR_META.map((terroir) => (
                            <LRZStamp
                                collection="vignoble"
                                meta="terroir"
                                slug={terroir.slug}
                                key={terroir.slug}
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
                    aria-labelledby="stamp-vignoble-notorietes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection Vignobles
                        </p>
                        <h2 id="stamp-vignoble-notorietes">
                            Les niveaux de notoriété
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> vignoble.notoriete</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {VIGNOBLE_NOTORIETE_META.map((notoriety) => (
                            <LRZStamp
                                collection="vignoble"
                                meta="notoriete"
                                slug={notoriety.slug}
                                key={notoriety.slug}
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
                    aria-labelledby="stamp-chateau-renommees"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection Châteaux
                        </p>
                        <h2 id="stamp-chateau-renommees">
                            Les niveaux de renommée
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis <code>chateau.renommee</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {CHATEAU_RENOMMEE_META.map((renown) => (
                            <LRZStamp
                                collection="chateau"
                                meta="renommee"
                                slug={renown.slug}
                                key={renown.slug}
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
                    aria-labelledby="stamp-chateau-visites"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection Châteaux
                        </p>
                        <h2 id="stamp-chateau-visites">
                            Les conditions de visite
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis <code>chateau.visite</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {CHATEAU_VISITE_META.map((visit) => (
                            <LRZStamp
                                collection="chateau"
                                meta="visite"
                                slug={visit.slug}
                                key={visit.slug}
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
                    aria-labelledby="stamp-vignoble-couleurs"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection Vignobles
                        </p>
                        <h2 id="stamp-vignoble-couleurs">
                            Les couleurs de vin
                        </h2>
                        <p>
                            Chaque stamp récupère son verre, son label et sa
                            couleur depuis le registre
                            <code> vignoble.couleur</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {VIGNOBLE_COULEUR_META.map((wineColor) => (
                            <LRZStamp
                                collection="vignoble"
                                meta="couleur"
                                slug={wineColor.slug}
                                key={wineColor.slug}
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
                    aria-labelledby="stamp-common-territoires"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="stamp-common-territoires">
                            Les territoires du Codex
                        </h2>
                        <p>
                            Chaque stamp récupère son blason, son label et sa
                            couleur depuis le registre
                            <code> common.territoire</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {COMMON_TERRITOIRE_META.map((territory) => (
                            <LRZStamp
                                collection="common"
                                meta="territoire"
                                slug={territory.slug}
                                key={territory.slug}
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
                    aria-labelledby="stamp-common-general"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="stamp-common-general">
                            Le vocabulaire éditorial transversal
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> common.general</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {COMMON_GENERAL_META.map((notion) => (
                            <LRZStamp
                                collection="common"
                                meta="general"
                                slug={notion.slug}
                                key={notion.slug}
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
                    aria-labelledby="stamp-common-websites"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="stamp-common-websites">
                            Les sites et projets Loire Ride Zen
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> common.website</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {COMMON_WEBSITE_META.map((website) => (
                            <LRZStamp
                                collection="common"
                                meta="website"
                                slug={website.slug}
                                key={website.slug}
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
                    aria-labelledby="stamp-common-experiences"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="stamp-common-experiences">
                            Les expériences du Codex
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> common.experience</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {COMMON_EXPERIENCE_META.map((experience) => (
                            <LRZStamp
                                collection="common"
                                meta="experience"
                                slug={experience.slug}
                                key={experience.slug}
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
                    aria-labelledby="stamp-common-architectures"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="stamp-common-architectures">
                            Les architectures du Codex
                        </h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> common.architecture</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {COMMON_ARCHITECTURE_META.map((architecture) => (
                            <LRZStamp
                                collection="common"
                                meta="architecture"
                                slug={architecture.slug}
                                key={architecture.slug}
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
                    aria-labelledby="stamp-common-epoques"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="stamp-common-epoques">Les époques du Codex</h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> common.epoque</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {COMMON_EPOQUE_META.map((period) => (
                            <LRZStamp
                                collection="common"
                                meta="epoque"
                                slug={period.slug}
                                key={period.slug}
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
                    aria-labelledby="stamp-common-milieux"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>Collection commune</p>
                        <h2 id="stamp-common-milieux">Les milieux du Codex</h2>
                        <p>
                            Chaque stamp récupère son symbole, son label et sa
                            couleur depuis le registre
                            <code> common.milieu</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {COMMON_MILIEU_META.map((environment) => (
                            <LRZStamp
                                collection="common"
                                meta="milieu"
                                slug={environment.slug}
                                key={environment.slug}
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
                    aria-labelledby="stamp-flore-raretes"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="stamp-flore-raretes">Les raretés de flore</h2>
                        <p>
                            Chaque stamp résout son symbole, son label et sa
                            couleur depuis le registre
                            <code> flore.rarete</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {FLORE_RARETE_META.map((rarity) => (
                            <LRZStamp
                                collection="flore"
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
                    aria-labelledby="stamp-guinguette-activites"
                >
                    <div className={shellStyles.sectionHeader}>
                        <p className={shellStyles.kicker}>
                            Collection imbriquée
                        </p>
                        <h2 id="stamp-guinguette-activites">
                            Les activités et services des guinguettes
                        </h2>
                        <p>
                            Chaque stamp résout son symbole, son label et sa
                            couleur depuis <code>guinguette.activite</code>.
                        </p>
                    </div>
                    <div className={styles.catalogGrid}>
                        {GUINGUETTE_ACTIVITE_META.map((activity) => (
                            <LRZStamp
                                collection="guinguette"
                                meta="activite"
                                slug={activity.slug}
                                key={activity.slug}
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
                                    collection="codex"
                                    meta="index"
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
                                    collection="codex"
                                    meta="index"
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
        </>
    );
}
