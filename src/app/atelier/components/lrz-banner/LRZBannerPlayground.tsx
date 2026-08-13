"use client";

import { BarChart3, Compass, Info, Waves, type LucideIcon } from "lucide-react";
import { useState } from "react";

import {
    LRZBanner,
    type LRZBannerPosition,
    type LRZBannerTone,
} from "@/components/_ui/LRZBanner";
import { LRZButton } from "@/components/_ui/LRZButton";
import { LRZ_COLOR_NAMES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZBannerPlayground.module.css";

type PlaygroundIcon = "none" | "chart" | "compass" | "info" | "waves";

type PlaygroundState = {
    eyebrow: string;
    title: string;
    content: string;
    tone: LRZBannerTone;
    position: LRZBannerPosition;
    color: LRZColor;
    customColor: string;
    icon: PlaygroundIcon;
    actions: boolean;
};

const INITIAL_STATE: PlaygroundState = {
    eyebrow: "Mesure d’audience",
    title: "Aider le Codex à mieux suivre son cours",
    content:
        "Avec votre accord, une mesure d’audience nous aide à comprendre les pages explorées et à améliorer les chemins du Codex.",
    tone: "contrast",
    position: "inline",
    color: "ambre",
    customColor: "",
    icon: "chart",
    actions: true,
};

const ICONS: Record<Exclude<PlaygroundIcon, "none">, LucideIcon> = {
    chart: BarChart3,
    compass: Compass,
    info: Info,
    waves: Waves,
};

const ICON_LABELS: Record<PlaygroundIcon, string> = {
    none: "Aucune",
    chart: "BarChart3 · mesure",
    compass: "Compass · orientation",
    info: "Info · information",
    waves: "Waves · Loire",
};

function escapeAttribute(value: string) {
    return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function playgroundCode(values: PlaygroundState) {
    const props = [
        `title="${escapeAttribute(values.title)}"`,
        values.eyebrow
            ? `eyebrow="${escapeAttribute(values.eyebrow)}"`
            : undefined,
        values.tone !== "surface" ? `tone="${values.tone}"` : undefined,
        values.position !== "inline"
            ? `position="${values.position}"`
            : undefined,
        values.color !== "ocre" ? `color="${values.color}"` : undefined,
        values.customColor
            ? `customColor="${escapeAttribute(values.customColor)}"`
            : undefined,
        values.icon !== "none"
            ? `icon={<${ICONS[values.icon].name} />}`
            : undefined,
        values.actions ? "actions={actions}" : undefined,
    ].filter(Boolean);

    return `<LRZBanner\n    ${props.join("\n    ")}\n>\n    <p>${escapeAttribute(values.content)}</p>\n</LRZBanner>`;
}

export default function LRZBannerPlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const Icon = values.icon === "none" ? null : ICONS[values.icon];

    return (
        <section
            className={styles.playground}
            aria-labelledby="banner-playground-title"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="banner-playground-title">Composer une bannière</h2>
                    <p>
                        Ajustez son message, sa présence et ses actions pour
                        observer immédiatement le rendu et le JSX.
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
                    <label className={styles.control} htmlFor="banner-title">
                        <span>
                            title <strong>requis</strong>
                        </span>
                        <input
                            id="banner-title"
                            value={values.title}
                            onChange={(event) =>
                                updateValue("title", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="banner-eyebrow">
                        <span>eyebrow</span>
                        <input
                            id="banner-eyebrow"
                            value={values.eyebrow}
                            placeholder="Sur-titre facultatif"
                            onChange={(event) =>
                                updateValue("eyebrow", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="banner-content">
                        <span>
                            children <strong>requis</strong>
                        </span>
                        <textarea
                            id="banner-content"
                            rows={5}
                            value={values.content}
                            onChange={(event) =>
                                updateValue("content", event.target.value)
                            }
                        />
                    </label>

                    <div className={styles.controlGrid}>
                        <label className={styles.control} htmlFor="banner-tone">
                            <span>tone</span>
                            <select
                                id="banner-tone"
                                value={values.tone}
                                onChange={(event) =>
                                    updateValue(
                                        "tone",
                                        event.target.value as LRZBannerTone,
                                    )
                                }
                            >
                                <option value="surface">surface</option>
                                <option value="soft">soft</option>
                                <option value="contrast">contrast</option>
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="banner-position"
                        >
                            <span>position</span>
                            <select
                                id="banner-position"
                                value={values.position}
                                onChange={(event) =>
                                    updateValue(
                                        "position",
                                        event.target.value as LRZBannerPosition,
                                    )
                                }
                            >
                                <option value="inline">inline</option>
                                <option value="fixed-bottom">
                                    fixed-bottom
                                </option>
                            </select>
                        </label>
                    </div>

                    <label className={styles.control} htmlFor="banner-color">
                        <span>color</span>
                        <select
                            id="banner-color"
                            value={values.color}
                            onChange={(event) =>
                                updateValue(
                                    "color",
                                    event.target.value as LRZColor,
                                )
                            }
                        >
                            {LRZ_COLOR_NAMES.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label
                        className={styles.control}
                        htmlFor="banner-custom-color"
                    >
                        <span>customColor</span>
                        <input
                            id="banner-custom-color"
                            value={values.customColor}
                            placeholder="#c8893a ou var(--token)"
                            onChange={(event) =>
                                updateValue("customColor", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="banner-icon">
                        <span>icon</span>
                        <select
                            id="banner-icon"
                            value={values.icon}
                            onChange={(event) =>
                                updateValue(
                                    "icon",
                                    event.target.value as PlaygroundIcon,
                                )
                            }
                        >
                            {(Object.keys(ICON_LABELS) as PlaygroundIcon[]).map(
                                (icon) => (
                                    <option key={icon} value={icon}>
                                        {ICON_LABELS[icon]}
                                    </option>
                                ),
                            )}
                        </select>
                    </label>

                    <label className={styles.check} htmlFor="banner-actions">
                        <input
                            id="banner-actions"
                            type="checkbox"
                            checked={values.actions}
                            onChange={(event) =>
                                updateValue("actions", event.target.checked)
                            }
                        />
                        <span>Afficher les actions</span>
                    </label>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>
                        <div className={styles.canvas}>
                            <LRZBanner
                                title={values.title || "Titre de la bannière"}
                                eyebrow={values.eyebrow || undefined}
                                tone={values.tone}
                                position={values.position}
                                color={values.color}
                                customColor={values.customColor || undefined}
                                icon={Icon ? <Icon /> : undefined}
                                actions={
                                    values.actions ? (
                                        <>
                                            <LRZButton
                                                size="sm"
                                                variant="secondary"
                                                color={values.color}
                                            >
                                                Refuser
                                            </LRZButton>
                                            <LRZButton
                                                size="sm"
                                                color={values.color}
                                            >
                                                Accepter
                                            </LRZButton>
                                        </>
                                    ) : undefined
                                }
                            >
                                <p>{values.content}</p>
                            </LRZBanner>
                        </div>
                        {values.position === "fixed-bottom" ? (
                            <p className={styles.notice}>
                                La bannière est maintenant ancrée au bas du
                                viewport. Repassez sur inline pour la replacer
                                dans l’aperçu.
                            </p>
                        ) : null}
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
