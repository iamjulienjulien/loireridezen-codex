"use client";

import { useState } from "react";
import LRZBadge from "@/components/LRZBadge/LRZBadge";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZBadgePlayground.module.css";

type PlaygroundState = {
    label: string;
    detail: string;
    color: LRZColor | "";
    title: string;
    className: string;
};

const INITIAL_STATE: PlaygroundState = {
    label: "LC",
    detail: "Préoccupation mineure",
    color: "vert-metallise",
    title: "Statut UICN",
    className: "",
};

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

const escapeAttribute = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

const playgroundCode = ({
    label,
    detail,
    color,
    title,
    className,
}: PlaygroundState) => {
    const props = [
        `label="${escapeAttribute(label)}"`,
        detail ? `detail="${escapeAttribute(detail)}"` : undefined,
        color ? `color="${color}"` : undefined,
        title ? `title="${escapeAttribute(title)}"` : undefined,
        className ? `className="${escapeAttribute(className)}"` : undefined,
    ].filter(Boolean);

    return `<LRZBadge\n    ${props.join("\n    ")}\n/>`;
};

export default function LRZBadgePlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const code = playgroundCode(values);

    return (
        <section
            className={styles.playground}
            aria-labelledby="playground-title"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="playground-title">Composer un badge</h2>
                    <p>
                        Modifiez chaque prop et observez immédiatement le rendu
                        et le JSX correspondant.
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
                    <label className={styles.control} htmlFor="badge-label">
                        <span>
                            label <strong>requis</strong>
                        </span>
                        <input
                            id="badge-label"
                            value={values.label}
                            onChange={(event) =>
                                updateValue("label", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="badge-detail">
                        <span>detail</span>
                        <input
                            id="badge-detail"
                            value={values.detail}
                            placeholder="Aucun détail"
                            onChange={(event) =>
                                updateValue("detail", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="badge-color">
                        <span>color</span>
                        <select
                            id="badge-color"
                            value={values.color}
                            onChange={(event) =>
                                updateValue(
                                    "color",
                                    event.target.value as LRZColor | "",
                                )
                            }
                        >
                            <option value="">Défaut — galet</option>
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

                    <label className={styles.control} htmlFor="badge-title">
                        <span>title</span>
                        <input
                            id="badge-title"
                            value={values.title}
                            placeholder="Aucune infobulle"
                            onChange={(event) =>
                                updateValue("title", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="badge-classname">
                        <span>className</span>
                        <input
                            id="badge-classname"
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
                            <LRZBadge
                                label={values.label}
                                detail={values.detail || undefined}
                                color={values.color || undefined}
                                title={values.title || undefined}
                                className={values.className || undefined}
                            />
                        </div>
                        <p className={styles.overrideNotice}>
                            Le rendu utilise{" "}
                            <code>
                                color=&quot;{values.color || "galet"}&quot;
                            </code>
                            {values.color ? null : " par défaut"}.
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
