"use client";

import { useState } from "react";
import LRZSeparateur, {
    type LRZSeparateurAlign,
    type LRZSeparateurOrientation,
    type LRZSeparateurPreset,
    type LRZSeparateurScope,
    type LRZSeparateurSize,
    type LRZSeparateurTone,
    type LRZSeparateurWeight,
} from "@/components/LRZSeparateur/LRZSeparateur";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZSeparateurPlayground.module.css";

type PlaygroundState = {
    scope: LRZSeparateurScope;
    preset: LRZSeparateurPreset;
    orientation: LRZSeparateurOrientation;
    size: LRZSeparateurSize | "";
    weight: LRZSeparateurWeight;
    tone: LRZSeparateurTone | "";
    color: LRZColor | "";
    align: LRZSeparateurAlign;
    label: string;
    maxWidth: string;
    minLineLength: string;
    gap: string;
    marginBlock: string;
    fadeEdges: boolean;
    hideOnMobile: boolean;
    compactOnMobile: boolean;
    ariaLabel: string;
    className: string;
};

const INITIAL_STATE: PlaygroundState = {
    scope: "section",
    preset: "spark",
    orientation: "horizontal",
    size: "lg",
    weight: "hairline",
    tone: "muted",
    color: "ocre",
    align: "center",
    label: "",
    maxWidth: "",
    minLineLength: "",
    gap: "",
    marginBlock: "",
    fadeEdges: false,
    hideOnMobile: false,
    compactOnMobile: true,
    ariaLabel: "",
    className: "",
};

const COLOR_OPTION_GROUPS = [
    {
        label: "Nature",
        prefix: "--color-nature-",
    },
    {
        label: "Faune",
        prefix: "--color-",
    },
    {
        label: "Patrimoine",
        prefix: "--color-patrimoine-",
    },
].map(({ label, prefix }) => ({
    label,
    colors: LRZ_COLOR_NAMES.filter((color) =>
        LRZ_COLOR_VARIABLES[color].startsWith(prefix),
    ),
}));

const PRESET_OPTIONS: Array<{
    value: LRZSeparateurPreset;
    label: string;
}> = [
    {
        value: "simple",
        label: "Simple",
    },
    {
        value: "spark",
        label: "Étincelle",
    },
    {
        value: "diamond",
        label: "Losange",
    },
    {
        value: "dot",
        label: "Point",
    },
    {
        value: "ornament",
        label: "Ornement",
    },
    {
        value: "fade",
        label: "Fondu",
    },
    {
        value: "none",
        label: "Espacement seul",
    },
];

const SCOPE_OPTIONS: Array<{
    value: LRZSeparateurScope;
    label: string;
}> = [
    {
        value: "section",
        label: "Section",
    },
    {
        value: "content",
        label: "Contenu",
    },
];

const ORIENTATION_OPTIONS: Array<{
    value: LRZSeparateurOrientation;
    label: string;
}> = [
    {
        value: "horizontal",
        label: "Horizontale",
    },
    {
        value: "vertical",
        label: "Verticale",
    },
];

const SIZE_OPTIONS: Array<{
    value: LRZSeparateurSize;
    label: string;
}> = [
    {
        value: "xs",
        label: "XS",
    },
    {
        value: "sm",
        label: "SM",
    },
    {
        value: "md",
        label: "MD",
    },
    {
        value: "lg",
        label: "LG",
    },
    {
        value: "xl",
        label: "XL",
    },
];

const WEIGHT_OPTIONS: Array<{
    value: LRZSeparateurWeight;
    label: string;
}> = [
    {
        value: "hairline",
        label: "Hairline",
    },
    {
        value: "thin",
        label: "Fin",
    },
    {
        value: "regular",
        label: "Normal",
    },
];

const TONE_OPTIONS: Array<{
    value: LRZSeparateurTone;
    label: string;
}> = [
    {
        value: "subtle",
        label: "Subtil",
    },
    {
        value: "muted",
        label: "Atténué",
    },
    {
        value: "normal",
        label: "Normal",
    },
    {
        value: "strong",
        label: "Fort",
    },
];

const ALIGN_OPTIONS: Array<{
    value: LRZSeparateurAlign;
    label: string;
}> = [
    {
        value: "start",
        label: "Début",
    },
    {
        value: "center",
        label: "Centre",
    },
    {
        value: "end",
        label: "Fin",
    },
];

const escapeAttribute = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

const playgroundCode = ({
    scope,
    preset,
    orientation,
    size,
    weight,
    tone,
    color,
    align,
    label,
    maxWidth,
    minLineLength,
    gap,
    marginBlock,
    fadeEdges,
    hideOnMobile,
    compactOnMobile,
    ariaLabel,
    className,
}: PlaygroundState) => {
    const props = [
        scope !== "content" ? `scope="${scope}"` : undefined,
        preset !== "simple" ? `preset="${preset}"` : undefined,
        orientation !== "horizontal"
            ? `orientation="${orientation}"`
            : undefined,
        size ? `size="${size}"` : undefined,
        weight !== "hairline" ? `weight="${weight}"` : undefined,
        tone ? `tone="${tone}"` : undefined,
        color ? `color="${color}"` : undefined,
        align !== "center" ? `align="${align}"` : undefined,
        label ? `label="${escapeAttribute(label)}"` : undefined,
        maxWidth ? `maxWidth="${escapeAttribute(maxWidth)}"` : undefined,
        minLineLength
            ? `minLineLength="${escapeAttribute(minLineLength)}"`
            : undefined,
        gap ? `gap="${escapeAttribute(gap)}"` : undefined,
        marginBlock
            ? `marginBlock="${escapeAttribute(marginBlock)}"`
            : undefined,
        fadeEdges ? "fadeEdges" : undefined,
        hideOnMobile ? "hideOnMobile" : undefined,
        !compactOnMobile ? "compactOnMobile={false}" : undefined,
        ariaLabel ? `ariaLabel="${escapeAttribute(ariaLabel)}"` : undefined,
        className ? `className="${escapeAttribute(className)}"` : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    if (props.length === 0) {
        return "<LRZSeparateur />";
    }

    return `<LRZSeparateur
    ${props.join("\n    ")}
/>`;
};

export default function LRZSeparateurPlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const code = playgroundCode(values);

    const resolvedSize =
        values.size || (values.scope === "section" ? "lg" : "sm");

    const resolvedTone =
        values.tone || (values.scope === "section" ? "muted" : "subtle");

    const isVertical = values.orientation === "vertical";

    return (
        <section
            className={styles.playground}
            aria-labelledby="separator-playground-title"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Playground</p>

                    <h2 id="separator-playground-title">
                        Composer un séparateur
                    </h2>

                    <p>
                        Ajustez son rythme, son motif et son intensité. Le JSX
                        correspondant est généré automatiquement.
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
                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>Structure</p>

                        <label
                            className={styles.control}
                            htmlFor="separator-scope"
                        >
                            <span>scope</span>

                            <select
                                id="separator-scope"
                                value={values.scope}
                                onChange={(event) =>
                                    updateValue(
                                        "scope",
                                        event.target
                                            .value as LRZSeparateurScope,
                                    )
                                }
                            >
                                {SCOPE_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-preset"
                        >
                            <span>preset</span>

                            <select
                                id="separator-preset"
                                value={values.preset}
                                onChange={(event) =>
                                    updateValue(
                                        "preset",
                                        event.target
                                            .value as LRZSeparateurPreset,
                                    )
                                }
                            >
                                {PRESET_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-orientation"
                        >
                            <span>orientation</span>

                            <select
                                id="separator-orientation"
                                value={values.orientation}
                                onChange={(event) =>
                                    updateValue(
                                        "orientation",
                                        event.target
                                            .value as LRZSeparateurOrientation,
                                    )
                                }
                            >
                                {ORIENTATION_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-align"
                        >
                            <span>align</span>

                            <select
                                id="separator-align"
                                value={values.align}
                                onChange={(event) =>
                                    updateValue(
                                        "align",
                                        event.target
                                            .value as LRZSeparateurAlign,
                                    )
                                }
                            >
                                {ALIGN_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>Apparence</p>

                        <label
                            className={styles.control}
                            htmlFor="separator-size"
                        >
                            <span>
                                size
                                <strong>défaut selon scope</strong>
                            </span>

                            <select
                                id="separator-size"
                                value={values.size}
                                onChange={(event) =>
                                    updateValue(
                                        "size",
                                        event.target.value as
                                            LRZSeparateurSize | "",
                                    )
                                }
                            >
                                <option value="">Automatique</option>

                                {SIZE_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-weight"
                        >
                            <span>weight</span>

                            <select
                                id="separator-weight"
                                value={values.weight}
                                onChange={(event) =>
                                    updateValue(
                                        "weight",
                                        event.target
                                            .value as LRZSeparateurWeight,
                                    )
                                }
                            >
                                {WEIGHT_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-tone"
                        >
                            <span>
                                tone
                                <strong>défaut selon scope</strong>
                            </span>

                            <select
                                id="separator-tone"
                                value={values.tone}
                                onChange={(event) =>
                                    updateValue(
                                        "tone",
                                        event.target.value as
                                            LRZSeparateurTone | "",
                                    )
                                }
                            >
                                <option value="">Automatique</option>

                                {TONE_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-color"
                        >
                            <span>color</span>

                            <select
                                id="separator-color"
                                value={values.color}
                                onChange={(event) =>
                                    updateValue(
                                        "color",
                                        event.target.value as LRZColor | "",
                                    )
                                }
                            >
                                <option value="">Défaut, galet</option>

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

                        <label
                            className={styles.control}
                            htmlFor="separator-label"
                        >
                            <span>label</span>

                            <input
                                id="separator-label"
                                value={values.label}
                                placeholder="Ex. Explorer"
                                onChange={(event) =>
                                    updateValue("label", event.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>
                            Dimensions libres
                        </p>

                        <label
                            className={styles.control}
                            htmlFor="separator-max-width"
                        >
                            <span>maxWidth</span>

                            <input
                                id="separator-max-width"
                                value={values.maxWidth}
                                placeholder="Ex. 520px ou 70%"
                                onChange={(event) =>
                                    updateValue("maxWidth", event.target.value)
                                }
                            />
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-min-line-length"
                        >
                            <span>minLineLength</span>

                            <input
                                id="separator-min-line-length"
                                value={values.minLineLength}
                                placeholder="Ex. 24px"
                                onChange={(event) =>
                                    updateValue(
                                        "minLineLength",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-gap"
                        >
                            <span>gap</span>

                            <input
                                id="separator-gap"
                                value={values.gap}
                                placeholder="Ex. 16px"
                                onChange={(event) =>
                                    updateValue("gap", event.target.value)
                                }
                            />
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-margin-block"
                        >
                            <span>marginBlock</span>

                            <input
                                id="separator-margin-block"
                                value={values.marginBlock}
                                placeholder="Ex. 48px"
                                onChange={(event) =>
                                    updateValue(
                                        "marginBlock",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>Comportement</p>

                        <label
                            className={styles.checkboxControl}
                            htmlFor="separator-fade-edges"
                        >
                            <input
                                id="separator-fade-edges"
                                type="checkbox"
                                checked={values.fadeEdges}
                                onChange={(event) =>
                                    updateValue(
                                        "fadeEdges",
                                        event.target.checked,
                                    )
                                }
                            />

                            <span>
                                fadeEdges
                                <strong>Fondu aux extrémités</strong>
                            </span>
                        </label>

                        <label
                            className={styles.checkboxControl}
                            htmlFor="separator-hide-mobile"
                        >
                            <input
                                id="separator-hide-mobile"
                                type="checkbox"
                                checked={values.hideOnMobile}
                                onChange={(event) =>
                                    updateValue(
                                        "hideOnMobile",
                                        event.target.checked,
                                    )
                                }
                            />

                            <span>
                                hideOnMobile
                                <strong>Masqué sous 640 px</strong>
                            </span>
                        </label>

                        <label
                            className={styles.checkboxControl}
                            htmlFor="separator-compact-mobile"
                        >
                            <input
                                id="separator-compact-mobile"
                                type="checkbox"
                                checked={values.compactOnMobile}
                                onChange={(event) =>
                                    updateValue(
                                        "compactOnMobile",
                                        event.target.checked,
                                    )
                                }
                            />

                            <span>
                                compactOnMobile
                                <strong>Dimensions réduites</strong>
                            </span>
                        </label>
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>Intégration</p>

                        <label
                            className={styles.control}
                            htmlFor="separator-aria-label"
                        >
                            <span>ariaLabel</span>

                            <input
                                id="separator-aria-label"
                                value={values.ariaLabel}
                                placeholder="Nom accessible facultatif"
                                onChange={(event) =>
                                    updateValue("ariaLabel", event.target.value)
                                }
                            />
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="separator-class-name"
                        >
                            <span>className</span>

                            <input
                                id="separator-class-name"
                                value={values.className}
                                placeholder="Classe externe facultative"
                                onChange={(event) =>
                                    updateValue("className", event.target.value)
                                }
                            />
                        </label>
                    </div>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>

                        <div
                            className={[
                                styles.canvas,
                                isVertical ? styles.verticalCanvas : undefined,
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <LRZSeparateur
                                scope={values.scope}
                                preset={values.preset}
                                orientation={values.orientation}
                                size={values.size || undefined}
                                weight={values.weight}
                                tone={values.tone || undefined}
                                color={values.color || undefined}
                                align={values.align}
                                label={values.label || undefined}
                                maxWidth={values.maxWidth || undefined}
                                minLineLength={
                                    values.minLineLength || undefined
                                }
                                gap={values.gap || undefined}
                                marginBlock={values.marginBlock || undefined}
                                fadeEdges={values.fadeEdges}
                                hideOnMobile={values.hideOnMobile}
                                compactOnMobile={values.compactOnMobile}
                                ariaLabel={values.ariaLabel || undefined}
                                className={values.className || undefined}
                            />
                        </div>

                        <dl className={styles.resolvedValues}>
                            <div>
                                <dt>Taille résolue</dt>
                                <dd>
                                    <code>{resolvedSize}</code>
                                </dd>
                            </div>

                            <div>
                                <dt>Tonalité résolue</dt>
                                <dd>
                                    <code>{resolvedTone}</code>
                                </dd>
                            </div>

                            <div>
                                <dt>Couleur résolue</dt>
                                <dd>
                                    <code>{values.color || "galet"}</code>
                                </dd>
                            </div>
                        </dl>

                        <p className={styles.overrideNotice}>
                            Les valeurs automatiques dépendent du{" "}
                            <code>scope</code>. Les champs renseignés
                            explicitement prennent toujours la priorité.
                        </p>
                    </div>

                    <div className={styles.codePanel}>
                        <span className={styles.outputLabel}>JSX généré</span>

                        <pre>
                            <code>{code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
