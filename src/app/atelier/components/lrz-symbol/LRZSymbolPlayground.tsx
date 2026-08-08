"use client";

import { useState, type ChangeEvent } from "react";

import {
    LRZSymbol,
    type LRZChateauRenommeeSymbolSlug,
    type LRZChateauVisiteSymbolSlug,
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
    type LRZCodexIndexSymbolSlug,
    type LRZPersonnageCategorieSymbolSlug,
    type LRZVignobleCouleurSymbolSlug,
    type LRZSymbolCollection,
    type LRZSymbolFrame,
    type LRZSymbolLocator,
    type LRZSymbolMeta,
    type LRZSymbolPadding,
    type LRZSymbolShadow,
    type LRZSymbolShape,
    type LRZSymbolSize,
} from "@/components/LRZSymbol";

import styles from "./LRZSymbolPlayground.module.css";

export type LRZSymbolPlaygroundOption<TSlug extends string = string> = {
    slug: TSlug;
    label: string;
};

type LRZSymbolPlaygroundProps = {
    codexIndexOptions: readonly LRZSymbolPlaygroundOption<LRZCodexIndexSymbolSlug>[];
    chateauRenommeeOptions: readonly LRZSymbolPlaygroundOption<LRZChateauRenommeeSymbolSlug>[];
    chateauVisiteOptions: readonly LRZSymbolPlaygroundOption<LRZChateauVisiteSymbolSlug>[];
    commonEpoqueOptions: readonly LRZSymbolPlaygroundOption<LRZCommonEpoqueSymbolSlug>[];
    commonArchitectureOptions: readonly LRZSymbolPlaygroundOption<LRZCommonArchitectureSymbolSlug>[];
    commonMilieuOptions: readonly LRZSymbolPlaygroundOption<LRZCommonMilieuSymbolSlug>[];
    commonExperienceOptions: readonly LRZSymbolPlaygroundOption<LRZCommonExperienceSymbolSlug>[];
    commonTerritoireOptions: readonly LRZSymbolPlaygroundOption<LRZCommonTerritoireSymbolSlug>[];
    fauneTypeOptions: readonly LRZSymbolPlaygroundOption<LRZFauneTypeSymbolSlug>[];
    fauneRareteOptions: readonly LRZSymbolPlaygroundOption<LRZFauneRareteSymbolSlug>[];
    floreCategorieOptions: readonly LRZSymbolPlaygroundOption<LRZFloreCategorieSymbolSlug>[];
    floreRareteOptions: readonly LRZSymbolPlaygroundOption<LRZFloreRareteSymbolSlug>[];
    guinguetteOptions: readonly LRZSymbolPlaygroundOption<LRZGuinguetteAmbienceSymbolSlug>[];
    personnageOptions: readonly LRZSymbolPlaygroundOption<LRZPersonnageCategorieSymbolSlug>[];
    vignobleCouleurOptions: readonly LRZSymbolPlaygroundOption<LRZVignobleCouleurSymbolSlug>[];
};

type SizeChoice = LRZSymbolSize | "custom";
type PaddingChoice = LRZSymbolPadding | "custom";

type PlaygroundState = {
    collection: LRZSymbolCollection;
    meta: LRZSymbolMeta | undefined;
    slug: string;
    size: SizeChoice;
    customSize: number;
    frame: LRZSymbolFrame;
    shape: LRZSymbolShape;
    padding: PaddingChoice;
    customPadding: number;
    shadow: LRZSymbolShadow;
    useCustomAccent: boolean;
    accent: string;
    informative: boolean;
    label: string;
};

const INITIAL_STATE: PlaygroundState = {
    collection: "codex",
    meta: "index",
    slug: "chateaux",
    size: "xl",
    customSize: 72,
    frame: "subtle",
    shape: "rounded",
    padding: "sm",
    customPadding: 8,
    shadow: "soft",
    useCustomAccent: false,
    accent: "#c46a4b",
    informative: false,
    label: "",
};

const SIZE_OPTIONS: readonly SizeChoice[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "custom",
];

const FRAME_OPTIONS: readonly LRZSymbolFrame[] = [
    "none",
    "subtle",
    "outline",
    "solid",
];

const SHAPE_OPTIONS: readonly LRZSymbolShape[] = [
    "square",
    "rounded",
    "circle",
];

const PADDING_OPTIONS: readonly PaddingChoice[] = [
    "none",
    "xs",
    "sm",
    "md",
    "custom",
];

const SHADOW_OPTIONS: readonly LRZSymbolShadow[] = ["none", "soft", "strong"];

const META_OPTIONS: Record<LRZSymbolCollection, readonly LRZSymbolMeta[]> = {
    codex: ["index"],
    chateau: ["renommee", "visite"],
    common: ["epoque", "architecture", "milieu", "experience", "territoire"],
    faune: ["type", "rarete"],
    flore: ["categorie", "rarete"],
    guinguette: ["ambience"],
    personnage: ["categorie"],
    vignoble: ["couleur"],
};

function codeValue(value: string) {
    return JSON.stringify(value);
}

function getDefaultMeta(collection: LRZSymbolCollection) {
    return META_OPTIONS[collection][0];
}

function buildCode(values: PlaygroundState) {
    const size =
        values.size === "custom"
            ? `{${values.customSize}}`
            : codeValue(values.size);
    const padding =
        values.padding === "custom"
            ? `{${values.customPadding}}`
            : codeValue(values.padding);
    const props = [
        `collection=${codeValue(values.collection)}`,
        ...(values.meta ? [`meta=${codeValue(values.meta)}`] : []),
        `slug=${codeValue(values.slug)}`,
        `size=${size}`,
        `frame=${codeValue(values.frame)}`,
        `shape=${codeValue(values.shape)}`,
        `padding=${padding}`,
        `shadow=${codeValue(values.shadow)}`,
        ...(values.useCustomAccent
            ? [`accent=${codeValue(values.accent)}`]
            : []),
        ...(values.informative
            ? [
                  "decorative={false}",
                  `label=${codeValue(values.label || "Symbole du Codex")}`,
              ]
            : []),
    ];

    return `<LRZSymbol\n  ${props.join("\n  ")}\n/>`;
}

export default function LRZSymbolPlayground({
    codexIndexOptions,
    chateauRenommeeOptions,
    chateauVisiteOptions,
    commonEpoqueOptions,
    commonArchitectureOptions,
    commonMilieuOptions,
    commonExperienceOptions,
    commonTerritoireOptions,
    fauneTypeOptions,
    fauneRareteOptions,
    floreCategorieOptions,
    floreRareteOptions,
    guinguetteOptions,
    personnageOptions,
    vignobleCouleurOptions,
}: LRZSymbolPlaygroundProps) {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);
    function getOptions(
        collection: LRZSymbolCollection,
        meta: LRZSymbolMeta | undefined,
    ): readonly LRZSymbolPlaygroundOption[] {
        switch (collection) {
            case "codex":
                return codexIndexOptions;
            case "chateau":
                return meta === "visite"
                    ? chateauVisiteOptions
                    : chateauRenommeeOptions;
            case "common":
                return meta === "territoire"
                    ? commonTerritoireOptions
                    : meta === "experience"
                      ? commonExperienceOptions
                      : meta === "milieu"
                        ? commonMilieuOptions
                        : meta === "architecture"
                          ? commonArchitectureOptions
                          : commonEpoqueOptions;
            case "faune":
                return meta === "rarete"
                    ? fauneRareteOptions
                    : fauneTypeOptions;
            case "flore":
                return meta === "rarete"
                    ? floreRareteOptions
                    : floreCategorieOptions;
            case "guinguette":
                return guinguetteOptions;
            case "personnage":
                return personnageOptions;
            case "vignoble":
                return vignobleCouleurOptions;
        }
    }

    const activeOptions = getOptions(values.collection, values.meta);
    const selectedOption = activeOptions.find(
        (option) => option.slug === values.slug,
    );
    const resolvedSize =
        values.size === "custom" ? values.customSize : values.size;
    const resolvedPadding =
        values.padding === "custom" ? values.customPadding : values.padding;
    const locator: LRZSymbolLocator =
        values.collection === "codex"
            ? {
                  collection: "codex",
                  meta: "index",
                  slug: values.slug as LRZCodexIndexSymbolSlug,
              }
            : values.collection === "chateau" && values.meta === "visite"
              ? {
                    collection: "chateau",
                    meta: "visite",
                    slug: values.slug as LRZChateauVisiteSymbolSlug,
                }
            : values.collection === "chateau"
              ? {
                    collection: "chateau",
                    meta: "renommee",
                    slug: values.slug as LRZChateauRenommeeSymbolSlug,
                }
            : values.collection === "common" && values.meta === "territoire"
              ? {
                    collection: "common",
                    meta: "territoire",
                    slug: values.slug as LRZCommonTerritoireSymbolSlug,
                }
              : values.collection === "common" && values.meta === "experience"
                ? {
                      collection: "common",
                      meta: "experience",
                      slug: values.slug as LRZCommonExperienceSymbolSlug,
                  }
                : values.collection === "common" && values.meta === "milieu"
                  ? {
                        collection: "common",
                        meta: "milieu",
                        slug: values.slug as LRZCommonMilieuSymbolSlug,
                    }
                  : values.collection === "common" &&
                      values.meta === "architecture"
                    ? {
                          collection: "common",
                          meta: "architecture",
                          slug: values.slug as LRZCommonArchitectureSymbolSlug,
                      }
                    : values.collection === "common"
                      ? {
                            collection: "common",
                            meta: "epoque",
                            slug: values.slug as LRZCommonEpoqueSymbolSlug,
                        }
                      : values.collection === "faune" &&
                          values.meta === "rarete"
                        ? {
                              collection: "faune",
                              meta: "rarete",
                              slug: values.slug as LRZFauneRareteSymbolSlug,
                          }
                        : values.collection === "faune"
                          ? {
                                collection: "faune",
                                meta: "type",
                                slug: values.slug as LRZFauneTypeSymbolSlug,
                            }
                          : values.collection === "flore" &&
                              values.meta === "rarete"
                            ? {
                                  collection: "flore",
                                  meta: "rarete",
                                  slug: values.slug as LRZFloreRareteSymbolSlug,
                              }
                            : values.collection === "flore"
                              ? {
                                    collection: "flore",
                                    meta: "categorie",
                                    slug: values.slug as LRZFloreCategorieSymbolSlug,
                                }
                              : values.collection === "guinguette"
                                ? {
                                      collection: "guinguette",
                                      meta: "ambience",
                                      slug: values.slug as LRZGuinguetteAmbienceSymbolSlug,
                                  }
                                : values.collection === "vignoble"
                                  ? {
                                        collection: "vignoble",
                                        meta: "couleur",
                                        slug: values.slug as LRZVignobleCouleurSymbolSlug,
                                    }
                                  : {
                                        collection: "personnage",
                                        meta: "categorie",
                                        slug: values.slug as LRZPersonnageCategorieSymbolSlug,
                                    };
    const accessibilityProps = values.informative
        ? {
              decorative: false as const,
              label:
                  values.label || selectedOption?.label || "Symbole du Codex",
          }
        : { decorative: true as const };

    function selectCollection(collection: LRZSymbolCollection) {
        const meta = getDefaultMeta(collection);
        const options = getOptions(collection, meta);

        setValues((current) => ({
            ...current,
            collection,
            meta,
            slug: options[0]?.slug ?? "",
            label: "",
        }));
    }

    function handleCollectionChange(event: ChangeEvent<HTMLSelectElement>) {
        selectCollection(event.target.value as LRZSymbolCollection);
    }

    function handleMetaChange(event: ChangeEvent<HTMLSelectElement>) {
        const meta = (event.target.value || undefined) as
            LRZSymbolMeta | undefined;
        const options = getOptions(values.collection, meta);

        setValues((current) => ({
            ...current,
            meta,
            slug: options[0]?.slug ?? "",
            label: "",
        }));
    }

    return (
        <section
            className={styles.playground}
            aria-labelledby="symbol-playground"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Bac à sable interactif</p>
                    <h2 id="symbol-playground">Composer un LRZSymbol</h2>
                    <p>
                        Modifiez son emplacement, ses dimensions et son cadre ;
                        le code d’utilisation se met à jour automatiquement.
                    </p>
                </div>
                <button
                    className={styles.reset}
                    type="button"
                    onClick={() => setValues(INITIAL_STATE)}
                >
                    Réinitialiser
                </button>
            </header>

            <div className={styles.workspace}>
                <div className={styles.controls}>
                    <label className={styles.control}>
                        <span>Collection</span>
                        <select
                            value={values.collection}
                            onChange={handleCollectionChange}
                        >
                            <option value="codex">codex</option>
                            <option value="chateau">chateau</option>
                            <option value="common">common</option>
                            <option value="faune">faune</option>
                            <option value="flore">flore</option>
                            <option value="guinguette">guinguette</option>
                            <option value="personnage">personnage</option>
                        </select>
                    </label>

                    <label className={styles.control}>
                        <span>
                            Meta <small>optionnel</small>
                        </span>
                        <select
                            value={values.meta ?? ""}
                            onChange={handleMetaChange}
                        >
                            {META_OPTIONS[values.collection].map((meta) => (
                                <option key={meta} value={meta}>
                                    {meta}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.control}>
                        <span>Slug</span>
                        <select
                            value={values.slug}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    slug: event.target.value,
                                    label: "",
                                }))
                            }
                        >
                            {activeOptions.map((option) => (
                                <option key={option.slug} value={option.slug}>
                                    {option.label} · {option.slug}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.control}>
                        <span>Taille</span>
                        <select
                            value={values.size}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    size: event.target.value as SizeChoice,
                                }))
                            }
                        >
                            {SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </label>

                    {values.size === "custom" ? (
                        <label className={styles.rangeControl}>
                            <span>
                                Taille personnalisée
                                <strong>{values.customSize}px</strong>
                            </span>
                            <input
                                type="range"
                                min="8"
                                max="160"
                                step="1"
                                value={values.customSize}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        customSize: Number(event.target.value),
                                    }))
                                }
                            />
                        </label>
                    ) : null}

                    <div className={styles.controlGrid}>
                        <label className={styles.control}>
                            <span>Cadre</span>
                            <select
                                value={values.frame}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        frame: event.target
                                            .value as LRZSymbolFrame,
                                    }))
                                }
                            >
                                {FRAME_OPTIONS.map((frame) => (
                                    <option key={frame} value={frame}>
                                        {frame}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>Forme</span>
                            <select
                                value={values.shape}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        shape: event.target
                                            .value as LRZSymbolShape,
                                    }))
                                }
                            >
                                {SHAPE_OPTIONS.map((shape) => (
                                    <option key={shape} value={shape}>
                                        {shape}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>Padding</span>
                            <select
                                value={values.padding}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        padding: event.target
                                            .value as PaddingChoice,
                                    }))
                                }
                            >
                                {PADDING_OPTIONS.map((padding) => (
                                    <option key={padding} value={padding}>
                                        {padding}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>Ombre</span>
                            <select
                                value={values.shadow}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        shadow: event.target
                                            .value as LRZSymbolShadow,
                                    }))
                                }
                            >
                                {SHADOW_OPTIONS.map((shadow) => (
                                    <option key={shadow} value={shadow}>
                                        {shadow}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {values.padding === "custom" ? (
                        <label className={styles.rangeControl}>
                            <span>
                                Padding personnalisé
                                <strong>{values.customPadding}px</strong>
                            </span>
                            <input
                                type="range"
                                min="0"
                                max="30"
                                step="1"
                                value={values.customPadding}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        customPadding: Number(
                                            event.target.value,
                                        ),
                                    }))
                                }
                            />
                        </label>
                    ) : null}

                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={values.useCustomAccent}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    useCustomAccent: event.target.checked,
                                }))
                            }
                        />
                        <span>Remplacer la couleur d’accent</span>
                    </label>

                    {values.useCustomAccent ? (
                        <label className={styles.colorControl}>
                            <span>Accent</span>
                            <input
                                type="color"
                                value={values.accent}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        accent: event.target.value,
                                    }))
                                }
                            />
                            <code>{values.accent}</code>
                        </label>
                    ) : null}

                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={values.informative}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    informative: event.target.checked,
                                }))
                            }
                        />
                        <span>Symbole informatif</span>
                    </label>

                    {values.informative ? (
                        <label className={styles.control}>
                            <span>Libellé accessible</span>
                            <input
                                type="text"
                                value={values.label}
                                placeholder={selectedOption?.label}
                                onChange={(event) =>
                                    setValues((current) => ({
                                        ...current,
                                        label: event.target.value,
                                    }))
                                }
                            />
                        </label>
                    ) : null}
                </div>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>
                        <div className={styles.canvas}>
                            <LRZSymbol
                                {...locator}
                                {...accessibilityProps}
                                size={resolvedSize}
                                frame={values.frame}
                                shape={values.shape}
                                padding={resolvedPadding}
                                shadow={values.shadow}
                                accent={
                                    values.useCustomAccent
                                        ? values.accent
                                        : undefined
                                }
                            />
                        </div>
                        <p className={styles.pathHint}>
                            Dossier résolu :
                            <code>
                                /symbols/{values.collection}/
                                {values.meta ? `${values.meta}/` : ""}
                            </code>
                        </p>
                    </div>

                    <div className={styles.codePanel}>
                        <span className={styles.outputLabel}>Code généré</span>
                        <pre>
                            <code>{buildCode(values)}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
