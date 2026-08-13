"use client";

import { useMemo, useState } from "react";

import { LRZCompteur } from "@/components/_ui/LRZCompteur";

import styles from "./LRZCompteurPlayground.module.css";

type PlaygroundState = {
    value: string;
    label: string;
    prefix: string;
    suffix: string;
    format: "integer" | "decimal";
    decimals: number;
    size: "xs" | "sm" | "md" | "lg";
    tone: "gold" | "cream" | "accent";
    theme: "brass" | "ivory" | "slate" | "river";
    variant: "machine" | "minimal" | "panel";
    accent: string;
    padding: boolean;
    digits: number;
    leadingZeros: boolean;
    direction: "auto" | "up" | "down";
    animation: "roll" | "fade" | "none";
    animate: boolean;
    duration: number;
};

const INITIAL_STATE: PlaygroundState = {
    value: "52",
    label: "châteaux recensés",
    prefix: "",
    suffix: "",
    format: "integer",
    decimals: 0,
    size: "lg",
    tone: "gold",
    theme: "brass",
    variant: "machine",
    accent: "",
    padding: true,
    digits: 0,
    leadingZeros: false,
    direction: "auto",
    animation: "roll",
    animate: true,
    duration: 650,
};

const escapeAttribute = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

function resolveValue(value: string) {
    const parsed = Number(value.replace(",", "."));

    return Number.isFinite(parsed) ? parsed : 0;
}

function playgroundCode(values: PlaygroundState, value: number) {
    const props = [
        `value={${String(value)}}`,
        values.label ? `label="${escapeAttribute(values.label)}"` : undefined,
        values.prefix
            ? `prefix="${escapeAttribute(values.prefix)}"`
            : undefined,
        values.suffix
            ? `suffix="${escapeAttribute(values.suffix)}"`
            : undefined,
        values.format === "decimal" ? 'format="decimal"' : undefined,
        values.format === "decimal" && values.decimals !== 0
            ? `decimals={${String(values.decimals)}}`
            : undefined,
        values.size !== "md" ? `size="${values.size}"` : undefined,
        values.tone !== "gold" ? `tone="${values.tone}"` : undefined,
        values.theme !== "brass" ? `theme="${values.theme}"` : undefined,
        values.variant !== "machine"
            ? `variant="${values.variant}"`
            : undefined,
        values.accent
            ? `accent="${escapeAttribute(values.accent)}"`
            : undefined,
        !values.padding ? "padding={false}" : undefined,
        values.digits > 0 ? `digits={${String(values.digits)}}` : undefined,
        values.leadingZeros ? "leadingZeros" : undefined,
        values.direction !== "auto"
            ? `direction="${values.direction}"`
            : undefined,
        values.animation !== "roll"
            ? `animation="${values.animation}"`
            : undefined,
        !values.animate ? "animate={false}" : undefined,
        values.duration !== 650
            ? `duration={${String(values.duration)}}`
            : undefined,
    ].filter(Boolean);

    return `<LRZCompteur\n    ${props.join("\n    ")}\n/>`;
}

export default function LRZCompteurPlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);
    const value = useMemo(() => resolveValue(values.value), [values.value]);
    const code = useMemo(() => playgroundCode(values, value), [value, values]);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        nextValue: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: nextValue }));
    };

    const changePreviewValue = (offset: number) => {
        updateValue("value", String(Math.max(0, value + offset)));
    };

    return (
        <section
            className={styles.playground}
            aria-labelledby="compteur-playground-title"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="compteur-playground-title">Régler le mécanisme</h2>
                    <p>
                        Composez la donnée, le boîtier et la cadence ; l’aperçu
                        et le JSX suivent immédiatement.
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
                    <label className={styles.control} htmlFor="compteur-value">
                        <span>
                            value <strong>requis</strong>
                        </span>
                        <input
                            id="compteur-value"
                            inputMode="decimal"
                            value={values.value}
                            onChange={(event) =>
                                updateValue("value", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="compteur-label">
                        <span>label</span>
                        <input
                            id="compteur-label"
                            value={values.label}
                            onChange={(event) =>
                                updateValue("label", event.target.value)
                            }
                        />
                    </label>

                    <div className={styles.inlineControls}>
                        <label
                            className={styles.control}
                            htmlFor="compteur-prefix"
                        >
                            <span>prefix</span>
                            <input
                                id="compteur-prefix"
                                value={values.prefix}
                                onChange={(event) =>
                                    updateValue("prefix", event.target.value)
                                }
                            />
                        </label>
                        <label
                            className={styles.control}
                            htmlFor="compteur-suffix"
                        >
                            <span>suffix</span>
                            <input
                                id="compteur-suffix"
                                value={values.suffix}
                                onChange={(event) =>
                                    updateValue("suffix", event.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className={styles.inlineControls}>
                        <label
                            className={styles.control}
                            htmlFor="compteur-theme"
                        >
                            <span>theme</span>
                            <select
                                id="compteur-theme"
                                value={values.theme}
                                onChange={(event) =>
                                    updateValue(
                                        "theme",
                                        event.target
                                            .value as PlaygroundState["theme"],
                                    )
                                }
                            >
                                <option value="brass">brass</option>
                                <option value="ivory">ivory</option>
                                <option value="slate">slate</option>
                                <option value="river">river</option>
                            </select>
                        </label>
                        <label
                            className={styles.control}
                            htmlFor="compteur-variant"
                        >
                            <span>variant</span>
                            <select
                                id="compteur-variant"
                                value={values.variant}
                                onChange={(event) =>
                                    updateValue(
                                        "variant",
                                        event.target
                                            .value as PlaygroundState["variant"],
                                    )
                                }
                            >
                                <option value="machine">machine</option>
                                <option value="minimal">minimal</option>
                                <option value="panel">panel</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.inlineControls}>
                        <label
                            className={styles.control}
                            htmlFor="compteur-animation"
                        >
                            <span>animation</span>
                            <select
                                id="compteur-animation"
                                value={values.animation}
                                onChange={(event) =>
                                    updateValue(
                                        "animation",
                                        event.target
                                            .value as PlaygroundState["animation"],
                                    )
                                }
                            >
                                <option value="roll">roll</option>
                                <option value="fade">fade</option>
                                <option value="none">none</option>
                            </select>
                        </label>
                        <label
                            className={styles.control}
                            htmlFor="compteur-direction"
                        >
                            <span>direction</span>
                            <select
                                id="compteur-direction"
                                value={values.direction}
                                onChange={(event) =>
                                    updateValue(
                                        "direction",
                                        event.target
                                            .value as PlaygroundState["direction"],
                                    )
                                }
                            >
                                <option value="auto">auto</option>
                                <option value="up">up</option>
                                <option value="down">down</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.inlineControls}>
                        <label
                            className={styles.control}
                            htmlFor="compteur-digits"
                        >
                            <span>digits</span>
                            <input
                                id="compteur-digits"
                                max={12}
                                min={0}
                                type="number"
                                value={values.digits}
                                onChange={(event) =>
                                    updateValue(
                                        "digits",
                                        Number(event.target.value),
                                    )
                                }
                            />
                        </label>
                        <label
                            className={styles.control}
                            htmlFor="compteur-accent"
                        >
                            <span>accent</span>
                            <input
                                id="compteur-accent"
                                placeholder="#8ab7c3"
                                value={values.accent}
                                onChange={(event) =>
                                    updateValue("accent", event.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className={styles.inlineControls}>
                        <label
                            className={styles.control}
                            htmlFor="compteur-format"
                        >
                            <span>format</span>
                            <select
                                id="compteur-format"
                                value={values.format}
                                onChange={(event) =>
                                    updateValue(
                                        "format",
                                        event.target
                                            .value as PlaygroundState["format"],
                                    )
                                }
                            >
                                <option value="integer">integer</option>
                                <option value="decimal">decimal</option>
                            </select>
                        </label>
                        <label
                            className={styles.control}
                            htmlFor="compteur-decimals"
                        >
                            <span>decimals</span>
                            <input
                                disabled={values.format !== "decimal"}
                                id="compteur-decimals"
                                max={6}
                                min={0}
                                type="number"
                                value={values.decimals}
                                onChange={(event) =>
                                    updateValue(
                                        "decimals",
                                        Number(event.target.value),
                                    )
                                }
                            />
                        </label>
                    </div>

                    <div className={styles.inlineControls}>
                        <label
                            className={styles.control}
                            htmlFor="compteur-size"
                        >
                            <span>size</span>
                            <select
                                id="compteur-size"
                                value={values.size}
                                onChange={(event) =>
                                    updateValue(
                                        "size",
                                        event.target
                                            .value as PlaygroundState["size"],
                                    )
                                }
                            >
                                <option value="xs">xs</option>
                                <option value="sm">sm</option>
                                <option value="md">md</option>
                                <option value="lg">lg</option>
                            </select>
                        </label>
                        <label
                            className={styles.control}
                            htmlFor="compteur-tone"
                        >
                            <span>tone</span>
                            <select
                                id="compteur-tone"
                                value={values.tone}
                                onChange={(event) =>
                                    updateValue(
                                        "tone",
                                        event.target
                                            .value as PlaygroundState["tone"],
                                    )
                                }
                            >
                                <option value="gold">gold</option>
                                <option value="cream">cream</option>
                                <option value="accent">accent</option>
                            </select>
                        </label>
                    </div>

                    <label
                        className={styles.rangeControl}
                        htmlFor="compteur-duration"
                    >
                        <span>
                            duration <output>{values.duration} ms</output>
                        </span>
                        <input
                            id="compteur-duration"
                            max={1600}
                            min={0}
                            step={50}
                            type="range"
                            value={values.duration}
                            onChange={(event) =>
                                updateValue(
                                    "duration",
                                    Number(event.target.value),
                                )
                            }
                        />
                    </label>

                    <label
                        className={styles.checkbox}
                        htmlFor="compteur-padding"
                    >
                        <input
                            checked={values.padding}
                            id="compteur-padding"
                            type="checkbox"
                            onChange={(event) =>
                                updateValue("padding", event.target.checked)
                            }
                        />
                        <span>padding</span>
                    </label>

                    <label
                        className={styles.checkbox}
                        htmlFor="compteur-leading-zeros"
                    >
                        <input
                            checked={values.leadingZeros}
                            id="compteur-leading-zeros"
                            type="checkbox"
                            onChange={(event) =>
                                updateValue(
                                    "leadingZeros",
                                    event.target.checked,
                                )
                            }
                        />
                        <span>leadingZeros</span>
                    </label>

                    <label
                        className={styles.checkbox}
                        htmlFor="compteur-animate"
                    >
                        <input
                            checked={values.animate}
                            id="compteur-animate"
                            type="checkbox"
                            onChange={(event) =>
                                updateValue("animate", event.target.checked)
                            }
                        />
                        <span>animate</span>
                    </label>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>
                        <div
                            className={styles.previewControls}
                            aria-label="Rejouer l’animation du compteur"
                            role="group"
                        >
                            <button
                                type="button"
                                onClick={() => changePreviewValue(-1)}
                                disabled={value <= 0}
                            >
                                −1
                            </button>
                            <button
                                type="button"
                                onClick={() => changePreviewValue(1)}
                            >
                                +1
                            </button>
                        </div>
                        <div className={styles.canvas}>
                            <LRZCompteur
                                animate={values.animate}
                                accent={values.accent || undefined}
                                animation={values.animation}
                                decimals={values.decimals}
                                digits={values.digits || undefined}
                                direction={values.direction}
                                format={values.format}
                                label={values.label || undefined}
                                leadingZeros={values.leadingZeros}
                                padding={values.padding}
                                prefix={values.prefix || undefined}
                                size={values.size}
                                suffix={values.suffix || undefined}
                                tone={values.tone}
                                theme={values.theme}
                                duration={values.duration}
                                value={value}
                                variant={values.variant}
                            />
                        </div>
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
