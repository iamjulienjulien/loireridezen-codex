"use client";

import { useState, type ChangeEvent } from "react";

import {
    LRZStamp,
    type LRZStampFont,
    type LRZStampGap,
    type LRZStampLabelSize,
    type LRZStampPadding,
    type LRZStampPosition,
    type LRZStampShadow,
    type LRZStampSize,
    type LRZStampTone,
    type LRZStampVariant,
} from "@/components/LRZStamp";
import type {
    LRZSymbolCollection,
    LRZSymbolFrame,
    LRZSymbolLocator,
    LRZSymbolMeta,
    LRZSymbolShadow,
    LRZSymbolShape,
} from "@/components/LRZSymbol";
import type { CategoriePersonnageSlug } from "@/registry/categories-personnages";
import {
    LRZ_COLOR_LABELS,
    LRZ_COLOR_NAMES,
    type LRZColor,
} from "@/registry/colors";
import type {
    LRZCommonArchitectureSymbolSlug,
    LRZCommonEpoqueSymbolSlug,
    LRZCommonExperienceSymbolSlug,
    LRZCommonMilieuSymbolSlug,
    LRZFauneRareteSymbolSlug,
    LRZFauneTypeSymbolSlug,
    LRZFloreCategorieSymbolSlug,
    LRZFloreRareteSymbolSlug,
    LRZGuinguetteAmbienceSymbolSlug,
    LRZIndexSymbolSlug,
} from "@/registry/symbols";

import styles from "./LRZStampPlayground.module.css";

export type LRZStampPlaygroundOption<TSlug extends string = string> = {
    slug: TSlug;
    label: string;
};

type LRZStampPlaygroundProps = {
    indexOptions: readonly LRZStampPlaygroundOption<LRZIndexSymbolSlug>[];
    commonEpoqueOptions: readonly LRZStampPlaygroundOption<LRZCommonEpoqueSymbolSlug>[];
    commonArchitectureOptions: readonly LRZStampPlaygroundOption<LRZCommonArchitectureSymbolSlug>[];
    commonMilieuOptions: readonly LRZStampPlaygroundOption<LRZCommonMilieuSymbolSlug>[];
    commonExperienceOptions: readonly LRZStampPlaygroundOption<LRZCommonExperienceSymbolSlug>[];
    fauneTypeOptions: readonly LRZStampPlaygroundOption<LRZFauneTypeSymbolSlug>[];
    fauneRareteOptions: readonly LRZStampPlaygroundOption<LRZFauneRareteSymbolSlug>[];
    floreCategorieOptions: readonly LRZStampPlaygroundOption<LRZFloreCategorieSymbolSlug>[];
    floreRareteOptions: readonly LRZStampPlaygroundOption<LRZFloreRareteSymbolSlug>[];
    guinguetteOptions: readonly LRZStampPlaygroundOption<LRZGuinguetteAmbienceSymbolSlug>[];
    personnageOptions: readonly LRZStampPlaygroundOption<CategoriePersonnageSlug>[];
};

type SizeChoice = LRZStampSize | "custom";
type PaddingChoice = LRZStampPadding | "custom";
type AxisPaddingChoice = PaddingChoice | "auto";
type GapChoice = LRZStampGap | "custom";
type LabelSizeChoice = LRZStampLabelSize | "auto" | "custom";

type PlaygroundState = {
    collection: LRZSymbolCollection;
    meta: LRZSymbolMeta | undefined;
    slug: string;
    variant: LRZStampVariant;
    tone: LRZStampTone;
    size: SizeChoice;
    customSize: number;
    position: LRZStampPosition;
    shadow: LRZStampShadow;
    padding: PaddingChoice;
    customPadding: number;
    paddingX: AxisPaddingChoice;
    customPaddingX: number;
    paddingY: AxisPaddingChoice;
    customPaddingY: number;
    gap: GapChoice;
    customGap: number;
    symbolFrame: LRZSymbolFrame;
    symbolShape: LRZSymbolShape;
    symbolShadow: LRZSymbolShadow;
    symbolScale: number;
    label: string;
    detail: string;
    font: LRZStampFont;
    labelSize: LabelSizeChoice;
    customLabelSize: number;
    labelColor: LRZColor | "";
    useCustomAccent: boolean;
    accent: string;
    gradient: boolean;
    dashed: boolean;
    fullWidth: boolean;
    truncate: boolean;
    limitWidth: boolean;
    maxWidth: number;
};

const INITIAL_STATE: PlaygroundState = {
    collection: "index",
    meta: undefined,
    slug: "chateaux",
    variant: "pill",
    tone: "subtle",
    size: "md",
    customSize: 42,
    position: "start",
    shadow: "soft",
    padding: "md",
    customPadding: 8,
    paddingX: "auto",
    customPaddingX: 12,
    paddingY: "auto",
    customPaddingY: 6,
    gap: "sm",
    customGap: 8,
    symbolFrame: "none",
    symbolShape: "rounded",
    symbolShadow: "none",
    symbolScale: 1,
    label: "",
    detail: "",
    font: "body",
    labelSize: "auto",
    customLabelSize: 16,
    labelColor: "",
    useCustomAccent: false,
    accent: "#c46a4b",
    gradient: true,
    dashed: false,
    fullWidth: false,
    truncate: false,
    limitWidth: false,
    maxWidth: 260,
};

const VARIANTS: readonly LRZStampVariant[] = [
    "pill",
    "badge",
    "chip",
    "plaque",
    "seal",
];
const TONES: readonly LRZStampTone[] = ["subtle", "outline", "solid", "ghost"];
const SIZES: readonly SizeChoice[] = ["xs", "sm", "md", "lg", "xl", "custom"];
const POSITIONS: readonly LRZStampPosition[] = ["start", "end", "top"];
const SHADOWS: readonly LRZStampShadow[] = ["none", "soft", "strong"];
const PADDINGS: readonly PaddingChoice[] = ["xs", "sm", "md", "lg", "custom"];
const AXIS_PADDINGS: readonly AxisPaddingChoice[] = ["auto", ...PADDINGS];
const GAPS: readonly GapChoice[] = ["xs", "sm", "md", "lg", "custom"];
const SYMBOL_FRAMES: readonly LRZSymbolFrame[] = [
    "none",
    "subtle",
    "outline",
    "solid",
];
const SYMBOL_SHAPES: readonly LRZSymbolShape[] = [
    "square",
    "rounded",
    "circle",
];
const SYMBOL_SHADOWS: readonly LRZSymbolShadow[] = ["none", "soft", "strong"];
const FONTS: readonly LRZStampFont[] = [
    "display",
    "body",
    "editorial",
    "mono",
    "signature",
    "bodoni",
    "grotesk",
    "note",
];
const LABEL_SIZES: readonly LabelSizeChoice[] = [
    "auto",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "custom",
];

const META_OPTIONS: Record<LRZSymbolCollection, readonly LRZSymbolMeta[]> = {
    index: [],
    common: ["epoque", "architecture", "milieu", "experience"],
    faune: ["type", "rarete"],
    flore: ["categorie", "rarete"],
    guinguette: ["ambience"],
    personnage: ["categorie"],
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
    const paddingX =
        values.paddingX === "auto"
            ? undefined
            : values.paddingX === "custom"
              ? `{${values.customPaddingX}}`
              : codeValue(values.paddingX);
    const paddingY =
        values.paddingY === "auto"
            ? undefined
            : values.paddingY === "custom"
              ? `{${values.customPaddingY}}`
              : codeValue(values.paddingY);
    const gap =
        values.gap === "custom"
            ? `{${values.customGap}}`
            : codeValue(values.gap);
    const labelSize =
        values.labelSize === "auto"
            ? undefined
            : values.labelSize === "custom"
              ? `{${values.customLabelSize}}`
              : codeValue(values.labelSize);
    const props = [
        `collection=${codeValue(values.collection)}`,
        ...(values.meta ? [`meta=${codeValue(values.meta)}`] : []),
        `slug=${codeValue(values.slug)}`,
        `variant=${codeValue(values.variant)}`,
        `tone=${codeValue(values.tone)}`,
        `size=${size}`,
        `font=${codeValue(values.font)}`,
        ...(labelSize ? [`labelSize=${labelSize}`] : []),
        ...(values.labelColor
            ? [`labelColor=${codeValue(values.labelColor)}`]
            : []),
        `symbolPosition=${codeValue(values.position)}`,
        `shadow=${codeValue(values.shadow)}`,
        `padding=${padding}`,
        ...(paddingX ? [`paddingX=${paddingX}`] : []),
        ...(paddingY ? [`paddingY=${paddingY}`] : []),
        `gap=${gap}`,
        `symbolFrame=${codeValue(values.symbolFrame)}`,
        `symbolShape=${codeValue(values.symbolShape)}`,
        `symbolShadow=${codeValue(values.symbolShadow)}`,
        `symbolScale={${values.symbolScale.toFixed(2)}}`,
        ...(values.label ? [`label=${codeValue(values.label)}`] : []),
        ...(values.detail ? [`detail=${codeValue(values.detail)}`] : []),
        ...(values.useCustomAccent
            ? [`accent=${codeValue(values.accent)}`]
            : []),
        ...(!values.gradient ? ["gradient={false}"] : []),
        ...(values.dashed ? ["dashed"] : []),
        ...(values.fullWidth ? ["fullWidth"] : []),
        ...(values.truncate ? ["truncate"] : []),
        ...(values.limitWidth ? [`maxWidth={${values.maxWidth}}`] : []),
    ];

    return `<LRZStamp\n  ${props.join("\n  ")}\n/>`;
}

export default function LRZStampPlayground({
    indexOptions,
    commonEpoqueOptions,
    commonArchitectureOptions,
    commonMilieuOptions,
    commonExperienceOptions,
    fauneTypeOptions,
    fauneRareteOptions,
    floreCategorieOptions,
    floreRareteOptions,
    guinguetteOptions,
    personnageOptions,
}: LRZStampPlaygroundProps) {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);
    function getOptions(
        collection: LRZSymbolCollection,
        meta: LRZSymbolMeta | undefined,
    ): readonly LRZStampPlaygroundOption[] {
        switch (collection) {
            case "index":
                return indexOptions;
            case "common":
                return meta === "experience"
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
        }
    }

    const activeOptions = getOptions(values.collection, values.meta);
    const locator: LRZSymbolLocator =
        values.collection === "index"
            ? {
                  collection: "index",
                  slug: values.slug as LRZIndexSymbolSlug,
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
                    : values.collection === "faune" && values.meta === "rarete"
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
                              : {
                                    collection: "personnage",
                                    meta: "categorie",
                                    slug: values.slug as CategoriePersonnageSlug,
                                };
    const resolvedSize =
        values.size === "custom" ? values.customSize : values.size;
    const resolvedPadding =
        values.padding === "custom" ? values.customPadding : values.padding;
    const resolvedPaddingX =
        values.paddingX === "auto"
            ? undefined
            : values.paddingX === "custom"
              ? values.customPaddingX
              : values.paddingX;
    const resolvedPaddingY =
        values.paddingY === "auto"
            ? undefined
            : values.paddingY === "custom"
              ? values.customPaddingY
              : values.paddingY;
    const resolvedGap = values.gap === "custom" ? values.customGap : values.gap;
    const resolvedLabelSize =
        values.labelSize === "auto"
            ? undefined
            : values.labelSize === "custom"
              ? values.customLabelSize
              : values.labelSize;

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
            aria-labelledby="stamp-playground"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Playground interactif</p>
                    <h2 id="stamp-playground">Composer un LRZStamp</h2>
                    <p>
                        Choisissez son identité, sa forme et son niveau de
                        présence. Le code reste synchronisé avec l’aperçu.
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
                    <fieldset className={styles.group}>
                        <legend>Identité</legend>
                        <div className={styles.controlGrid}>
                            <label className={styles.control}>
                                <span>Collection</span>
                                <select
                                    value={values.collection}
                                    onChange={handleCollectionChange}
                                >
                                    <option value="index">index</option>
                                    <option value="common">common</option>
                                    <option value="faune">faune</option>
                                    <option value="flore">flore</option>
                                    <option value="guinguette">
                                        guinguette
                                    </option>
                                    <option value="personnage">
                                        personnage
                                    </option>
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Meta</span>
                                <select
                                    value={values.meta ?? ""}
                                    onChange={handleMetaChange}
                                >
                                    {values.collection === "index" ? (
                                        <option value="">Aucun</option>
                                    ) : (
                                        META_OPTIONS[values.collection].map(
                                            (meta) => (
                                                <option key={meta} value={meta}>
                                                    {meta}
                                                </option>
                                            ),
                                        )
                                    )}
                                </select>
                            </label>
                        </div>
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
                                    <option
                                        key={option.slug}
                                        value={option.slug}
                                    >
                                        {option.label} · {option.slug}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className={styles.controlGrid}>
                            <label className={styles.control}>
                                <span>Label personnalisé</span>
                                <input
                                    type="text"
                                    value={values.label}
                                    placeholder="Nom du registre"
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            label: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                            <label className={styles.control}>
                                <span>Détail</span>
                                <input
                                    type="text"
                                    value={values.detail}
                                    placeholder="Texte secondaire"
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            detail: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <div className={styles.controlGrid}>
                            <label className={styles.control}>
                                <span>Police du label</span>
                                <select
                                    value={values.font}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            font: event.target
                                                .value as LRZStampFont,
                                        }))
                                    }
                                >
                                    {FONTS.map((font) => (
                                        <option key={font} value={font}>
                                            {font}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Couleur du label</span>
                                <select
                                    value={values.labelColor}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            labelColor: event.target.value as
                                                LRZColor | "",
                                        }))
                                    }
                                >
                                    <option value="">
                                        Couleur métier par défaut
                                    </option>
                                    {LRZ_COLOR_NAMES.map((color) => (
                                        <option key={color} value={color}>
                                            {LRZ_COLOR_LABELS[color]} · {color}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Taille du label</span>
                                <select
                                    value={values.labelSize}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            labelSize: event.target
                                                .value as LabelSizeChoice,
                                        }))
                                    }
                                >
                                    {LABEL_SIZES.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        {values.labelSize === "custom" ? (
                            <RangeControl
                                label="Taille du label"
                                value={values.customLabelSize}
                                min={8}
                                max={64}
                                suffix="px"
                                onChange={(customLabelSize) =>
                                    setValues((current) => ({
                                        ...current,
                                        customLabelSize,
                                    }))
                                }
                            />
                        ) : null}
                    </fieldset>

                    <fieldset className={styles.group}>
                        <legend>Conteneur</legend>
                        <div className={styles.controlGrid}>
                            <label className={styles.control}>
                                <span>Forme</span>
                                <select
                                    value={values.variant}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            variant: event.target
                                                .value as LRZStampVariant,
                                        }))
                                    }
                                >
                                    {VARIANTS.map((variant) => (
                                        <option key={variant} value={variant}>
                                            {variant}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Ton</span>
                                <select
                                    value={values.tone}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            tone: event.target
                                                .value as LRZStampTone,
                                        }))
                                    }
                                >
                                    {TONES.map((tone) => (
                                        <option key={tone} value={tone}>
                                            {tone}
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
                                            size: event.target
                                                .value as SizeChoice,
                                        }))
                                    }
                                >
                                    {SIZES.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
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
                                                .value as LRZStampShadow,
                                        }))
                                    }
                                >
                                    {SHADOWS.map((shadow) => (
                                        <option key={shadow} value={shadow}>
                                            {shadow}
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
                                    {PADDINGS.map((padding) => (
                                        <option key={padding} value={padding}>
                                            {padding}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Padding X</span>
                                <select
                                    value={values.paddingX}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            paddingX: event.target
                                                .value as AxisPaddingChoice,
                                        }))
                                    }
                                >
                                    {AXIS_PADDINGS.map((padding) => (
                                        <option key={padding} value={padding}>
                                            {padding}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Padding Y</span>
                                <select
                                    value={values.paddingY}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            paddingY: event.target
                                                .value as AxisPaddingChoice,
                                        }))
                                    }
                                >
                                    {AXIS_PADDINGS.map((padding) => (
                                        <option key={padding} value={padding}>
                                            {padding}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Gap</span>
                                <select
                                    value={values.gap}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            gap: event.target
                                                .value as GapChoice,
                                        }))
                                    }
                                >
                                    {GAPS.map((gap) => (
                                        <option key={gap} value={gap}>
                                            {gap}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {values.size === "custom" ? (
                            <RangeControl
                                label="Hauteur"
                                value={values.customSize}
                                min={18}
                                max={100}
                                suffix="px"
                                onChange={(customSize) =>
                                    setValues((current) => ({
                                        ...current,
                                        customSize,
                                    }))
                                }
                            />
                        ) : null}
                        {values.padding === "custom" ? (
                            <RangeControl
                                label="Padding"
                                value={values.customPadding}
                                min={0}
                                max={30}
                                suffix="px"
                                onChange={(customPadding) =>
                                    setValues((current) => ({
                                        ...current,
                                        customPadding,
                                    }))
                                }
                            />
                        ) : null}
                        {values.paddingX === "custom" ? (
                            <RangeControl
                                label="Padding X"
                                value={values.customPaddingX}
                                min={0}
                                max={30}
                                suffix="px"
                                onChange={(customPaddingX) =>
                                    setValues((current) => ({
                                        ...current,
                                        customPaddingX,
                                    }))
                                }
                            />
                        ) : null}
                        {values.paddingY === "custom" ? (
                            <RangeControl
                                label="Padding Y"
                                value={values.customPaddingY}
                                min={0}
                                max={30}
                                suffix="px"
                                onChange={(customPaddingY) =>
                                    setValues((current) => ({
                                        ...current,
                                        customPaddingY,
                                    }))
                                }
                            />
                        ) : null}
                        {values.gap === "custom" ? (
                            <RangeControl
                                label="Gap"
                                value={values.customGap}
                                min={0}
                                max={30}
                                suffix="px"
                                onChange={(customGap) =>
                                    setValues((current) => ({
                                        ...current,
                                        customGap,
                                    }))
                                }
                            />
                        ) : null}
                    </fieldset>

                    <fieldset className={styles.group}>
                        <legend>Symbole</legend>
                        <div className={styles.controlGrid}>
                            <label className={styles.control}>
                                <span>Position</span>
                                <select
                                    value={values.position}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            position: event.target
                                                .value as LRZStampPosition,
                                        }))
                                    }
                                >
                                    {POSITIONS.map((position) => (
                                        <option key={position} value={position}>
                                            {position}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Cadre</span>
                                <select
                                    value={values.symbolFrame}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            symbolFrame: event.target
                                                .value as LRZSymbolFrame,
                                        }))
                                    }
                                >
                                    {SYMBOL_FRAMES.map((frame) => (
                                        <option key={frame} value={frame}>
                                            {frame}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Forme du cadre</span>
                                <select
                                    value={values.symbolShape}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            symbolShape: event.target
                                                .value as LRZSymbolShape,
                                        }))
                                    }
                                >
                                    {SYMBOL_SHAPES.map((shape) => (
                                        <option key={shape} value={shape}>
                                            {shape}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.control}>
                                <span>Ombre du symbole</span>
                                <select
                                    value={values.symbolShadow}
                                    onChange={(event) =>
                                        setValues((current) => ({
                                            ...current,
                                            symbolShadow: event.target
                                                .value as LRZSymbolShadow,
                                        }))
                                    }
                                >
                                    {SYMBOL_SHADOWS.map((shadow) => (
                                        <option key={shadow} value={shadow}>
                                            {shadow}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <RangeControl
                            label="Échelle du symbole"
                            value={values.symbolScale}
                            min={0.5}
                            max={1.4}
                            step={0.05}
                            suffix="×"
                            onChange={(symbolScale) =>
                                setValues((current) => ({
                                    ...current,
                                    symbolScale,
                                }))
                            }
                        />
                    </fieldset>

                    <fieldset className={styles.group}>
                        <legend>Options</legend>
                        <div className={styles.toggleGrid}>
                            <Toggle
                                label="Dégradé"
                                checked={values.gradient}
                                onChange={(gradient) =>
                                    setValues((current) => ({
                                        ...current,
                                        gradient,
                                    }))
                                }
                            />
                            <Toggle
                                label="Bordure pointillée"
                                checked={values.dashed}
                                onChange={(dashed) =>
                                    setValues((current) => ({
                                        ...current,
                                        dashed,
                                    }))
                                }
                            />
                            <Toggle
                                label="Pleine largeur"
                                checked={values.fullWidth}
                                onChange={(fullWidth) =>
                                    setValues((current) => ({
                                        ...current,
                                        fullWidth,
                                    }))
                                }
                            />
                            <Toggle
                                label="Tronquer le texte"
                                checked={values.truncate}
                                onChange={(truncate) =>
                                    setValues((current) => ({
                                        ...current,
                                        truncate,
                                    }))
                                }
                            />
                            <Toggle
                                label="Limiter la largeur"
                                checked={values.limitWidth}
                                onChange={(limitWidth) =>
                                    setValues((current) => ({
                                        ...current,
                                        limitWidth,
                                    }))
                                }
                            />
                            <Toggle
                                label="Accent personnalisé"
                                checked={values.useCustomAccent}
                                onChange={(useCustomAccent) =>
                                    setValues((current) => ({
                                        ...current,
                                        useCustomAccent,
                                    }))
                                }
                            />
                        </div>
                        {values.limitWidth ? (
                            <RangeControl
                                label="Largeur maximale"
                                value={values.maxWidth}
                                min={120}
                                max={520}
                                suffix="px"
                                onChange={(maxWidth) =>
                                    setValues((current) => ({
                                        ...current,
                                        maxWidth,
                                    }))
                                }
                            />
                        ) : null}
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
                    </fieldset>
                </div>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>
                        <div className={styles.canvas}>
                            <LRZStamp
                                {...locator}
                                label={values.label || undefined}
                                detail={values.detail || undefined}
                                variant={values.variant}
                                tone={values.tone}
                                size={resolvedSize}
                                font={values.font}
                                labelSize={resolvedLabelSize}
                                labelColor={values.labelColor || undefined}
                                symbolPosition={values.position}
                                shadow={values.shadow}
                                padding={resolvedPadding}
                                paddingX={resolvedPaddingX}
                                paddingY={resolvedPaddingY}
                                gap={resolvedGap}
                                symbolFrame={values.symbolFrame}
                                symbolShape={values.symbolShape}
                                symbolShadow={values.symbolShadow}
                                symbolScale={values.symbolScale}
                                accent={
                                    values.useCustomAccent
                                        ? values.accent
                                        : undefined
                                }
                                gradient={values.gradient}
                                dashed={values.dashed}
                                fullWidth={values.fullWidth}
                                truncate={values.truncate}
                                maxWidth={
                                    values.limitWidth
                                        ? values.maxWidth
                                        : undefined
                                }
                            />
                        </div>
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

function RangeControl({
    label,
    value,
    min,
    max,
    step = 1,
    suffix,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    suffix: string;
    onChange: (value: number) => void;
}) {
    return (
        <label className={styles.rangeControl}>
            <span>
                {label}
                <strong>
                    {value}
                    {suffix}
                </strong>
            </span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            />
        </label>
    );
}

function Toggle({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className={styles.toggle}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
            />
            <span>{label}</span>
        </label>
    );
}
