"use client";

import { useState } from "react";

import LRZTypography, {
    type LRZTypographyAlign,
    type LRZTypographyColor,
    type LRZTypographyDecoration,
    type LRZTypographyElement,
    type LRZTypographyFont,
    type LRZTypographyLeading,
    type LRZTypographyPreset,
    type LRZTypographySize,
    type LRZTypographyTracking,
    type LRZTypographyTransform,
    type LRZTypographyWeight,
} from "@/components/LRZTypography";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";

import styles from "./LRZTypographyPlayground.module.css";

type Optional<Value extends string> = "" | Value;
type BooleanOverride = "preset" | "on" | "off";
type ClampValue = "" | "1" | "2" | "3" | "4";

type PlaygroundState = {
    content: string;
    preset: LRZTypographyPreset;
    element: LRZTypographyElement;
    font: Optional<LRZTypographyFont>;
    size: Optional<LRZTypographySize>;
    weight: Optional<LRZTypographyWeight>;
    color: LRZTypographyColor;
    align: Optional<LRZTypographyAlign>;
    leading: Optional<LRZTypographyLeading>;
    tracking: Optional<LRZTypographyTracking>;
    transform: Optional<LRZTypographyTransform>;
    decoration: Optional<LRZTypographyDecoration>;
    italic: BooleanOverride;
    balance: BooleanOverride;
    noWrap: boolean;
    truncate: boolean;
    lineClamp: ClampValue;
};

const PRESET_ELEMENTS: Record<LRZTypographyPreset, LRZTypographyElement> = {
    display: "h1",
    "heading-1": "h1",
    "heading-2": "h2",
    "heading-3": "h3",
    lede: "p",
    body: "p",
    "body-sm": "p",
    editorial: "p",
    eyebrow: "span",
    caption: "small",
    code: "code",
};

const INITIAL_STATE: PlaygroundState = {
    content: "Des donjons aux jardins, la Loire raconte ses paysages.",
    preset: "heading-2",
    element: "h2",
    font: "",
    size: "",
    weight: "",
    color: "primary",
    align: "",
    leading: "",
    tracking: "",
    transform: "",
    decoration: "",
    italic: "preset",
    balance: "preset",
    noWrap: false,
    truncate: false,
    lineClamp: "",
};

const SEMANTIC_COLORS = [
    "primary",
    "secondary",
    "tertiary",
    "accent",
    "inherit",
] as const;

const COLOR_OPTION_GROUPS = [
    { label: "Nature", prefix: "--lrz-nature-" },
    { label: "Faune", prefix: "--lrz-faune-" },
    { label: "Patrimoine", prefix: "--lrz-patrimoine-" },
].map(({ label, prefix }) => ({
    label,
    colors: LRZ_COLOR_NAMES.filter((color) =>
        LRZ_COLOR_VARIABLES[color].startsWith(prefix),
    ),
}));

const ELEMENTS: LRZTypographyElement[] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "div",
    "small",
    "strong",
    "em",
    "code",
    "blockquote",
    "figcaption",
    "label",
];

function booleanOverride(value: BooleanOverride) {
    return value === "preset" ? undefined : value === "on";
}

function escapeText(value: string) {
    return value.replaceAll("{", "&#123;").replaceAll("}", "&#125;");
}

function playgroundCode(values: PlaygroundState) {
    const props = [
        `preset="${values.preset}"`,
        values.element !== PRESET_ELEMENTS[values.preset]
            ? `as="${values.element}"`
            : undefined,
        values.font ? `font="${values.font}"` : undefined,
        values.size ? `size="${values.size}"` : undefined,
        values.weight ? `weight="${values.weight}"` : undefined,
        values.color !== "primary" ? `color="${values.color}"` : undefined,
        values.align ? `align="${values.align}"` : undefined,
        values.leading ? `leading="${values.leading}"` : undefined,
        values.tracking ? `tracking="${values.tracking}"` : undefined,
        values.transform ? `transform="${values.transform}"` : undefined,
        values.decoration ? `decoration="${values.decoration}"` : undefined,
        values.italic === "on"
            ? "italic"
            : values.italic === "off"
              ? "italic={false}"
              : undefined,
        values.balance === "on"
            ? "balance"
            : values.balance === "off"
              ? "balance={false}"
              : undefined,
        values.noWrap ? "noWrap" : undefined,
        values.truncate ? "truncate" : undefined,
        values.lineClamp ? `lineClamp={${values.lineClamp}}` : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    return `<LRZTypography
    ${props.join("\n    ")}
>
    ${escapeText(values.content)}
</LRZTypography>`;
}

export default function LRZTypographyPlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const lineClamp = values.lineClamp
        ? (Number(values.lineClamp) as 1 | 2 | 3 | 4)
        : undefined;

    return (
        <section
            className={styles.playground}
            aria-labelledby="typography-playground-title"
        >
            <header className={styles.playgroundHeader}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="typography-playground-title">
                        Composer un style typographique
                    </h2>
                    <p>
                        Partez d’un preset, puis remplacez uniquement les
                        propriétés nécessaires.
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
                <form
                    className={styles.controls}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <fieldset className={styles.controlGroup}>
                        <legend>Contenu</legend>

                        <label className={styles.control}>
                            <span>children</span>
                            <textarea
                                rows={4}
                                value={values.content}
                                onChange={(event) =>
                                    updateValue("content", event.target.value)
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>preset</span>
                            <select
                                value={values.preset}
                                onChange={(event) => {
                                    const preset = event.target
                                        .value as LRZTypographyPreset;
                                    setValues((current) => ({
                                        ...current,
                                        preset,
                                        element: PRESET_ELEMENTS[preset],
                                    }));
                                }}
                            >
                                {Object.keys(PRESET_ELEMENTS).map((preset) => (
                                    <option key={preset} value={preset}>
                                        {preset}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>as</span>
                            <select
                                value={values.element}
                                onChange={(event) =>
                                    updateValue(
                                        "element",
                                        event.target
                                            .value as LRZTypographyElement,
                                    )
                                }
                            >
                                {ELEMENTS.map((element) => (
                                    <option key={element} value={element}>
                                        {element}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Style</legend>

                        <label className={styles.control}>
                            <span>font</span>
                            <select
                                value={values.font}
                                onChange={(event) =>
                                    updateValue(
                                        "font",
                                        event.target
                                            .value as PlaygroundState["font"],
                                    )
                                }
                            >
                                <option value="">Preset</option>
                                {[
                                    "display",
                                    "body",
                                    "mono",
                                    "editorial",
                                    "inherit",
                                ].map((font) => (
                                    <option key={font} value={font}>
                                        {font}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>size</span>
                            <select
                                value={values.size}
                                onChange={(event) =>
                                    updateValue(
                                        "size",
                                        event.target
                                            .value as PlaygroundState["size"],
                                    )
                                }
                            >
                                <option value="">Preset</option>
                                {[
                                    "xs",
                                    "sm",
                                    "md",
                                    "lg",
                                    "xl",
                                    "2xl",
                                    "3xl",
                                    "4xl",
                                ].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>weight</span>
                            <select
                                value={values.weight}
                                onChange={(event) =>
                                    updateValue(
                                        "weight",
                                        event.target
                                            .value as PlaygroundState["weight"],
                                    )
                                }
                            >
                                <option value="">Preset</option>
                                {["regular", "medium", "semibold", "bold"].map(
                                    (weight) => (
                                        <option key={weight} value={weight}>
                                            {weight}
                                        </option>
                                    ),
                                )}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>color</span>
                            <select
                                value={values.color}
                                onChange={(event) =>
                                    updateValue(
                                        "color",
                                        event.target
                                            .value as LRZTypographyColor,
                                    )
                                }
                            >
                                <optgroup label="Sémantique">
                                    {SEMANTIC_COLORS.map((color) => (
                                        <option key={color} value={color}>
                                            {color}
                                        </option>
                                    ))}
                                </optgroup>
                                {COLOR_OPTION_GROUPS.map((group) => (
                                    <optgroup
                                        key={group.label}
                                        label={group.label}
                                    >
                                        {group.colors.map((color) => (
                                            <option key={color} value={color}>
                                                {color}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Rythme</legend>

                        {[
                            {
                                key: "align",
                                options: ["start", "center", "end"],
                            },
                            {
                                key: "leading",
                                options: [
                                    "tight",
                                    "snug",
                                    "normal",
                                    "relaxed",
                                    "loose",
                                ],
                            },
                            {
                                key: "tracking",
                                options: ["tight", "normal", "wide", "wider"],
                            },
                            {
                                key: "transform",
                                options: [
                                    "none",
                                    "uppercase",
                                    "lowercase",
                                    "capitalize",
                                ],
                            },
                            {
                                key: "decoration",
                                options: ["none", "underline", "line-through"],
                            },
                        ].map(({ key, options }) => (
                            <label className={styles.control} key={key}>
                                <span>{key}</span>
                                <select
                                    value={
                                        values[
                                            key as keyof PlaygroundState
                                        ] as string
                                    }
                                    onChange={(event) =>
                                        updateValue(
                                            key as
                                                | "align"
                                                | "leading"
                                                | "tracking"
                                                | "transform"
                                                | "decoration",
                                            event.target.value as never,
                                        )
                                    }
                                >
                                    <option value="">Preset</option>
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        ))}
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Composition</legend>

                        {(["italic", "balance"] as const).map((key) => (
                            <label className={styles.control} key={key}>
                                <span>{key}</span>
                                <select
                                    value={values[key]}
                                    onChange={(event) =>
                                        updateValue(
                                            key,
                                            event.target
                                                .value as BooleanOverride,
                                        )
                                    }
                                >
                                    <option value="preset">Preset</option>
                                    <option value="on">Activé</option>
                                    <option value="off">Désactivé</option>
                                </select>
                            </label>
                        ))}

                        {(["noWrap", "truncate"] as const).map((key) => (
                            <label className={styles.checkControl} key={key}>
                                <input
                                    type="checkbox"
                                    checked={values[key]}
                                    onChange={(event) =>
                                        updateValue(key, event.target.checked)
                                    }
                                />
                                <span>{key}</span>
                            </label>
                        ))}

                        <label className={styles.control}>
                            <span>lineClamp</span>
                            <select
                                value={values.lineClamp}
                                onChange={(event) =>
                                    updateValue(
                                        "lineClamp",
                                        event.target.value as ClampValue,
                                    )
                                }
                            >
                                <option value="">Aucun</option>
                                {[1, 2, 3, 4].map((lines) => (
                                    <option key={lines} value={lines}>
                                        {lines} ligne{lines > 1 ? "s" : ""}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </fieldset>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>
                        <div className={styles.canvas}>
                            <LRZTypography
                                preset={values.preset}
                                as={values.element}
                                font={values.font || undefined}
                                size={values.size || undefined}
                                weight={values.weight || undefined}
                                color={values.color}
                                align={values.align || undefined}
                                leading={values.leading || undefined}
                                tracking={values.tracking || undefined}
                                transform={values.transform || undefined}
                                decoration={values.decoration || undefined}
                                italic={booleanOverride(values.italic)}
                                balance={booleanOverride(values.balance)}
                                noWrap={values.noWrap}
                                truncate={values.truncate}
                                lineClamp={lineClamp}
                            >
                                {values.content}
                            </LRZTypography>
                        </div>

                        <dl className={styles.resolvedValues}>
                            <div>
                                <dt>Preset</dt>
                                <dd>{values.preset}</dd>
                            </div>
                            <div>
                                <dt>Élément</dt>
                                <dd>&lt;{values.element}&gt;</dd>
                            </div>
                            <div>
                                <dt>Couleur</dt>
                                <dd>{values.color}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className={styles.codePanel}>
                        <span className={styles.outputLabel}>JSX généré</span>
                        <pre>
                            <code>{playgroundCode(values)}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
