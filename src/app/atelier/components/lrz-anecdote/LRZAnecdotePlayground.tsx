"use client";

import { useState } from "react";
import LRZAnecdote from "@/components/LRZAnecdote/LRZAnecdote";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZAnecdotePlayground.module.css";

type PlaygroundState = {
    content: string;
    color: LRZColor | "";
    mark: string;
    className: string;
};

const INITIAL_STATE: PlaygroundState = {
    content:
        "Le brocard refait ses bois chaque année, au rythme des saisons ligériennes.",
    color: "vert-metallise",
    mark: "❝",
    className: "",
};

const MARK_PRESETS = [
    { value: "❝", label: "Citation" },
    { value: "❧", label: "Éditorial" },
    { value: "✦", label: "Remarquable" },
    { value: "✺", label: "Découverte" },
    { value: "→", label: "À retenir" },
    { value: "", label: "Aucun" },
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

const escapeAttribute = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

const playgroundCode = ({
    content,
    color,
    mark,
    className,
}: PlaygroundState) => {
    const props = [
        color ? `color="${color}"` : undefined,
        mark !== INITIAL_STATE.mark
            ? `mark="${escapeAttribute(mark)}"`
            : undefined,
        className ? `className="${escapeAttribute(className)}"` : undefined,
    ].filter(Boolean);

    const opening = props.length
        ? `<LRZAnecdote\n    ${props.join("\n    ")}\n>`
        : "<LRZAnecdote>";

    return `${opening}\n    {${JSON.stringify(content)}}\n</LRZAnecdote>`;
};

export default function LRZAnecdotePlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    return (
        <section
            className={styles.playground}
            aria-labelledby="anecdote-playground-title"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="anecdote-playground-title">
                        Composer une anecdote
                    </h2>
                    <p>
                        Modifiez le contenu et son accent pour observer
                        immédiatement le rendu et le JSX correspondant.
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
                    <label
                        className={styles.control}
                        htmlFor="anecdote-content"
                    >
                        <span>
                            children <strong>requis</strong>
                        </span>
                        <textarea
                            id="anecdote-content"
                            rows={5}
                            value={values.content}
                            onChange={(event) =>
                                updateValue("content", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="anecdote-color">
                        <span>color</span>
                        <select
                            id="anecdote-color"
                            value={values.color}
                            onChange={(event) =>
                                updateValue(
                                    "color",
                                    event.target.value as LRZColor | "",
                                )
                            }
                        >
                            <option value="">Défaut — ocre</option>
                            {COLOR_OPTION_GROUPS.map((group) => (
                                <optgroup key={group.label} label={group.label}>
                                    {group.colors.map((color) => (
                                        <option key={color} value={color}>
                                            {color}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </label>

                    <div className={styles.control}>
                        <label htmlFor="anecdote-mark">mark</label>
                        <span className={styles.presets}>
                            {MARK_PRESETS.map((preset) => (
                                <button
                                    className={styles.preset}
                                    type="button"
                                    key={preset.label}
                                    aria-pressed={values.mark === preset.value}
                                    onClick={() =>
                                        updateValue("mark", preset.value)
                                    }
                                >
                                    <span aria-hidden>
                                        {preset.value || "∅"}
                                    </span>
                                    <small>{preset.label}</small>
                                </button>
                            ))}
                        </span>
                        <input
                            id="anecdote-mark"
                            aria-describedby="anecdote-mark-help"
                            value={values.mark}
                            placeholder="Aucun marqueur"
                            onChange={(event) =>
                                updateValue("mark", event.target.value)
                            }
                        />
                        <small
                            className={styles.controlHelp}
                            id="anecdote-mark-help"
                        >
                            Choisissez un preset ou saisissez librement un autre
                            signe.
                        </small>
                    </div>

                    <label
                        className={styles.control}
                        htmlFor="anecdote-classname"
                    >
                        <span>className</span>
                        <input
                            id="anecdote-classname"
                            value={values.className}
                            placeholder="Classe externe facultative"
                            onChange={(event) =>
                                updateValue("className", event.target.value)
                            }
                        />
                    </label>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>
                        <div className={styles.canvas}>
                            <LRZAnecdote
                                color={values.color || undefined}
                                mark={values.mark}
                                className={values.className || undefined}
                            >
                                {values.content}
                            </LRZAnecdote>
                        </div>
                        <p className={styles.colorNotice}>
                            Le rendu utilise{" "}
                            <code>
                                color=&quot;{values.color || "ocre"}&quot;
                            </code>
                            {values.color ? null : " par défaut"}.
                        </p>
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
