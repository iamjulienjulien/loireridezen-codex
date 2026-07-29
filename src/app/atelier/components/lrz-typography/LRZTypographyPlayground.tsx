"use client";

import { useState } from "react";

import LRZLivingText from "@/components/LRZLivingText";
import LRZTypography, {
    type LRZTypographyAlign,
    type LRZTypographyColor,
    type LRZTypographyDecoration,
    type LRZTypographyElement,
    type LRZTypographyEffect,
    type LRZTypographyFont,
    type LRZTypographyGradient,
    type LRZTypographyGradientPreset,
    type LRZTypographyLeading,
    type LRZTypographyMotion,
    type LRZTypographyPreset,
    type LRZTypographyProps,
    type LRZTypographySize,
    type LRZTypographyTracking,
    type LRZTypographyTransform,
    type LRZTypographyWeight,
} from "@/components/LRZTypography";
import type { Ambiance } from "@/registry/ambiances";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";

import styles from "./LRZTypographyPlayground.module.css";

type Optional<Value extends string> = "" | Value;
type BooleanOverride = "preset" | "on" | "off";
type ClampValue = "" | "1" | "2" | "3" | "4";
type GradientMode = "" | LRZTypographyGradientPreset | "custom";
type PlaygroundComponent = "typography" | "breathing" | "atmospheric";
type LivingIntensity = "subtle" | "medium" | "expressive";
type BreathingRhythm = "calm" | "river" | "sleep" | "pulse";

type PlaygroundState = {
    component: PlaygroundComponent;
    playing: boolean;
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
    effect: LRZTypographyEffect;
    gradient: GradientMode;
    gradientFrom: (typeof LRZ_COLOR_NAMES)[number];
    gradientTo: (typeof LRZ_COLOR_NAMES)[number];
    gradientAngle: number;
    motion: LRZTypographyMotion;
    motionDelay: number;
    typewriterSpeed: number;
    cursor: boolean;
    breathingRhythm: BreathingRhythm;
    breathingDuration: number;
    livingIntensity: LivingIntensity;
    ambiance: Ambiance;
    italic: BooleanOverride;
    balance: BooleanOverride;
    dropCap: boolean;
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
    component: "typography",
    playing: false,
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
    effect: "none",
    gradient: "",
    gradientFrom: "eau",
    gradientTo: "coucher",
    gradientAngle: 105,
    motion: "none",
    motionDelay: 0,
    typewriterSpeed: 55,
    cursor: true,
    breathingRhythm: "calm",
    breathingDuration: 6500,
    livingIntensity: "medium",
    ambiance: "nuit",
    italic: "preset",
    balance: "preset",
    dropCap: false,
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
    { label: "Nature", prefix: "--color-nature-" },
    { label: "Faune", prefix: "--color-" },
    { label: "Patrimoine", prefix: "--color-patrimoine-" },
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
    const componentName =
        values.component === "breathing"
            ? "LRZLivingText.BreathingText"
            : values.component === "atmospheric"
              ? "LRZLivingText.AtmosphericText"
              : "LRZTypography";
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
        values.effect !== "none" ? `effect="${values.effect}"` : undefined,
        values.gradient && values.gradient !== "custom"
            ? `gradient="${values.gradient}"`
            : values.gradient === "custom"
              ? `gradient={{ from: "${values.gradientFrom}", to: "${values.gradientTo}", angle: ${values.gradientAngle} }}`
              : undefined,
        values.motion !== "none" ? `motion="${values.motion}"` : undefined,
        values.motion !== "none" && values.motionDelay > 0
            ? `motionDelay={${values.motionDelay}}`
            : undefined,
        values.motion === "typewriter" && values.typewriterSpeed !== 55
            ? `typewriterSpeed={${values.typewriterSpeed}}`
            : undefined,
        values.motion === "typewriter" && !values.cursor
            ? "cursor={false}"
            : undefined,
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
        values.dropCap ? "dropCap" : undefined,
        values.noWrap ? "noWrap" : undefined,
        values.truncate ? "truncate" : undefined,
        values.lineClamp ? `lineClamp={${values.lineClamp}}` : undefined,
        values.component === "breathing"
            ? `rhythm="${values.breathingRhythm}"`
            : undefined,
        values.component === "breathing"
            ? `intensity="${values.livingIntensity}"`
            : undefined,
        values.component === "breathing" && values.breathingDuration !== 6500
            ? `duration={${values.breathingDuration}}`
            : undefined,
        values.component === "atmospheric"
            ? `ambiance="${values.ambiance}"`
            : undefined,
        values.component === "atmospheric"
            ? `intensity="${values.livingIntensity}"`
            : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    return `<${componentName}
    ${props.join("\n    ")}
>
    ${escapeText(values.content)}
</${componentName}>`;
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
    const gradient: LRZTypographyGradient | undefined =
        values.gradient === "custom"
            ? {
                  from: values.gradientFrom,
                  to: values.gradientTo,
                  angle: values.gradientAngle,
              }
            : values.gradient || undefined;
    const previewProps: Omit<LRZTypographyProps, "children"> = {
        preset: values.preset,
        as: values.element,
        font: values.font || undefined,
        size: values.size || undefined,
        weight: values.weight || undefined,
        color: values.color,
        align: values.align || undefined,
        leading: values.leading || undefined,
        tracking: values.tracking || undefined,
        transform: values.transform || undefined,
        decoration: values.decoration || undefined,
        effect: values.effect,
        gradient,
        motion: values.motion,
        motionDelay: values.motionDelay,
        typewriterSpeed: values.typewriterSpeed,
        cursor: values.cursor,
        italic: booleanOverride(values.italic),
        balance: booleanOverride(values.balance),
        dropCap: values.dropCap,
        noWrap: values.noWrap,
        truncate: values.truncate,
        lineClamp,
    };

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

                <div className={styles.playgroundActions}>
                    <button
                        className={styles.playToggle}
                        type="button"
                        aria-pressed={values.playing}
                        onClick={() => updateValue("playing", !values.playing)}
                    >
                        {values.playing ? "❚❚ Pause" : "▶ Lire"}
                    </button>
                    <button
                        className={styles.reset}
                        type="button"
                        onClick={() => setValues(INITIAL_STATE)}
                    >
                        Réinitialiser
                    </button>
                </div>
            </header>

            <div className={styles.workspace}>
                <form
                    className={styles.controls}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <fieldset className={styles.controlGroup}>
                        <legend>Contenu</legend>

                        <label className={styles.control}>
                            <span>composant</span>
                            <select
                                value={values.component}
                                onChange={(event) =>
                                    updateValue(
                                        "component",
                                        event.target
                                            .value as PlaygroundComponent,
                                    )
                                }
                            >
                                <option value="typography">
                                    LRZTypography
                                </option>
                                <option value="breathing">
                                    LRZLivingText.BreathingText
                                </option>
                                <option value="atmospheric">
                                    LRZLivingText.AtmosphericText
                                </option>
                            </select>
                        </label>

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

                        <label className={styles.control}>
                            <span>effect</span>
                            <select
                                value={values.effect}
                                onChange={(event) =>
                                    updateValue(
                                        "effect",
                                        event.target
                                            .value as LRZTypographyEffect,
                                    )
                                }
                            >
                                {[
                                    "none",
                                    "ink",
                                    "highlight",
                                    "engraved",
                                    "outline",
                                    "soft-shadow",
                                    "moon-glow",
                                    "foil",
                                    "ink-reveal",
                                    "weathered",
                                    "constellation",
                                ].map((effect) => (
                                    <option key={effect} value={effect}>
                                        {effect}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>gradient</span>
                            <select
                                value={values.gradient}
                                onChange={(event) =>
                                    updateValue(
                                        "gradient",
                                        event.target.value as GradientMode,
                                    )
                                }
                            >
                                <option value="">Aucun</option>
                                {[
                                    "gold-leaf",
                                    "royal",
                                    "river",
                                    "sunset",
                                    "forest",
                                    "tuffeau",
                                    "moonlight",
                                    "ember",
                                    "custom",
                                ].map((gradientOption) => (
                                    <option
                                        key={gradientOption}
                                        value={gradientOption}
                                    >
                                        {gradientOption}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {values.gradient === "custom" && (
                            <>
                                {(["gradientFrom", "gradientTo"] as const).map(
                                    (key) => (
                                        <label
                                            className={styles.control}
                                            key={key}
                                        >
                                            <span>{key}</span>
                                            <select
                                                value={values[key]}
                                                onChange={(event) =>
                                                    updateValue(
                                                        key,
                                                        event.target
                                                            .value as PlaygroundState[typeof key],
                                                    )
                                                }
                                            >
                                                {COLOR_OPTION_GROUPS.map(
                                                    (group) => (
                                                        <optgroup
                                                            key={group.label}
                                                            label={group.label}
                                                        >
                                                            {group.colors.map(
                                                                (color) => (
                                                                    <option
                                                                        key={
                                                                            color
                                                                        }
                                                                        value={
                                                                            color
                                                                        }
                                                                    >
                                                                        {color}
                                                                    </option>
                                                                ),
                                                            )}
                                                        </optgroup>
                                                    ),
                                                )}
                                            </select>
                                        </label>
                                    ),
                                )}
                                <label className={styles.control}>
                                    <span>gradientAngle</span>
                                    <input
                                        type="number"
                                        min={0}
                                        max={360}
                                        value={values.gradientAngle}
                                        onChange={(event) =>
                                            updateValue(
                                                "gradientAngle",
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                </label>
                            </>
                        )}
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Mouvement</legend>

                        <label className={styles.control}>
                            <span>motion</span>
                            <select
                                value={values.motion}
                                onChange={(event) =>
                                    updateValue(
                                        "motion",
                                        event.target
                                            .value as LRZTypographyMotion,
                                    )
                                }
                            >
                                {[
                                    "none",
                                    "fade-up",
                                    "reveal",
                                    "tracking-in",
                                    "typewriter",
                                ].map((motion) => (
                                    <option key={motion} value={motion}>
                                        {motion}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>motionDelay (ms)</span>
                            <input
                                type="number"
                                min={0}
                                max={2000}
                                step={50}
                                value={values.motionDelay}
                                onChange={(event) =>
                                    updateValue(
                                        "motionDelay",
                                        Number(event.target.value),
                                    )
                                }
                            />
                        </label>

                        {values.motion === "typewriter" && (
                            <>
                                <label className={styles.control}>
                                    <span>typewriterSpeed (ms)</span>
                                    <input
                                        type="number"
                                        min={10}
                                        max={500}
                                        step={5}
                                        value={values.typewriterSpeed}
                                        onChange={(event) =>
                                            updateValue(
                                                "typewriterSpeed",
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                </label>
                                <label className={styles.checkControl}>
                                    <input
                                        type="checkbox"
                                        checked={values.cursor}
                                        onChange={(event) =>
                                            updateValue(
                                                "cursor",
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    <span>cursor</span>
                                </label>
                            </>
                        )}
                    </fieldset>

                    {values.component !== "typography" && (
                        <fieldset className={styles.controlGroup}>
                            <legend>Effet vivant</legend>

                            {values.component === "breathing" && (
                                <label className={styles.control}>
                                    <span>rhythm</span>
                                    <select
                                        value={values.breathingRhythm}
                                        onChange={(event) =>
                                            updateValue(
                                                "breathingRhythm",
                                                event.target
                                                    .value as BreathingRhythm,
                                            )
                                        }
                                    >
                                        {[
                                            "calm",
                                            "river",
                                            "sleep",
                                            "pulse",
                                        ].map((rhythm) => (
                                            <option key={rhythm} value={rhythm}>
                                                {rhythm}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}

                            {values.component === "breathing" && (
                                <label className={styles.control}>
                                    <span>
                                        duration ({values.breathingDuration} ms)
                                    </span>
                                    <input
                                        type="range"
                                        min={1200}
                                        max={12000}
                                        step={100}
                                        value={values.breathingDuration}
                                        onChange={(event) =>
                                            updateValue(
                                                "breathingDuration",
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                </label>
                            )}

                            {values.component === "atmospheric" && (
                                <label className={styles.control}>
                                    <span>ambiance</span>
                                    <select
                                        value={values.ambiance}
                                        onChange={(event) =>
                                            updateValue(
                                                "ambiance",
                                                event.target.value as Ambiance,
                                            )
                                        }
                                    >
                                        {["aube", "jour", "soir", "nuit"].map(
                                            (ambiance) => (
                                                <option
                                                    key={ambiance}
                                                    value={ambiance}
                                                >
                                                    {ambiance}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </label>
                            )}

                            <label className={styles.control}>
                                <span>intensity</span>
                                <select
                                    value={values.livingIntensity}
                                    onChange={(event) =>
                                        updateValue(
                                            "livingIntensity",
                                            event.target
                                                .value as LivingIntensity,
                                        )
                                    }
                                >
                                    {["subtle", "medium", "expressive"].map(
                                        (intensity) => (
                                            <option
                                                key={intensity}
                                                value={intensity}
                                            >
                                                {intensity}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </label>

                            <LRZTypography preset="caption" color="tertiary">
                                En pause, survolez l’aperçu pour lire
                                l’animation temporairement.
                            </LRZTypography>
                        </fieldset>
                    )}

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

                        {(["dropCap", "noWrap", "truncate"] as const).map(
                            (key) => (
                                <label
                                    className={styles.checkControl}
                                    key={key}
                                >
                                    <input
                                        type="checkbox"
                                        checked={values[key]}
                                        onChange={(event) =>
                                            updateValue(
                                                key,
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    <span>{key}</span>
                                </label>
                            ),
                        )}

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
                        <div
                            className={`${styles.canvas} ${styles.animationStage}`}
                            data-playing={values.playing}
                        >
                            {values.component === "breathing" ? (
                                <LRZLivingText.BreathingText
                                    {...previewProps}
                                    rhythm={values.breathingRhythm}
                                    intensity={values.livingIntensity}
                                    duration={values.breathingDuration}
                                >
                                    {values.content}
                                </LRZLivingText.BreathingText>
                            ) : values.component === "atmospheric" ? (
                                <LRZLivingText.AtmosphericText
                                    {...previewProps}
                                    ambiance={values.ambiance}
                                    intensity={values.livingIntensity}
                                >
                                    {values.content}
                                </LRZLivingText.AtmosphericText>
                            ) : (
                                <LRZTypography {...previewProps}>
                                    {values.content}
                                </LRZTypography>
                            )}
                        </div>

                        <dl className={styles.resolvedValues}>
                            <div>
                                <dt>Composant</dt>
                                <dd>{values.component}</dd>
                            </div>
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
                            <div>
                                <dt>Effet</dt>
                                <dd>{values.effect}</dd>
                            </div>
                            <div>
                                <dt>Dégradé</dt>
                                <dd>{values.gradient || "aucun"}</dd>
                            </div>
                            <div>
                                <dt>Mouvement</dt>
                                <dd>{values.motion}</dd>
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
