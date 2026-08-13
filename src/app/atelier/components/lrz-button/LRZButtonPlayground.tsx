"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Plus } from "lucide-react";

import { LRZButton } from "@/components/_ui/LRZButton";
import { LRZ_COLOR_GROUPS, LRZ_COLOR_LABELS } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import type {
    LRZButtonPreset,
    LRZButtonSize,
    LRZButtonVariant,
} from "@/components/_ui/LRZButton";

import pageStyles from "../filter-playground.module.css";
import styles from "./LRZButtonPlayground.module.css";

type PlaygroundState = {
    variant: LRZButtonVariant;
    preset: LRZButtonPreset;
    size: LRZButtonSize;
    color: LRZColor;
    loading: boolean;
    fullWidth: boolean;
};

const INITIAL_STATE: PlaygroundState = {
    variant: "primary",
    preset: "default",
    size: "md",
    color: "ocre",
    loading: false,
    fullWidth: false,
};

function playgroundCode(values: PlaygroundState) {
    const props = [
        values.variant !== "primary" ? `variant="${values.variant}"` : null,
        values.preset !== "default" ? `preset="${values.preset}"` : null,
        values.size !== "md" ? `size="${values.size}"` : null,
        values.color !== "ocre" ? `color="${values.color}"` : null,
        values.loading ? "loading" : null,
        values.fullWidth ? "fullWidth" : null,
    ].filter(Boolean);

    return `<LRZButton${props.length ? `\n    ${props.join("\n    ")}` : ""}>
    Découvrir
</LRZButton>`;
}

export default function LRZButtonPlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);
    const code = playgroundCode(values);

    const update = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => setValues((current) => ({ ...current, [key]: value }));

    return (
        <section
            className={pageStyles.section}
            aria-labelledby="button-playground"
        >
            <div className={pageStyles.sectionHeader}>
                <p className={pageStyles.kicker}>Bac à sable interactif</p>
                <h2 id="button-playground">Composer une action</h2>
                <p>
                    Modifiez la variante, la taille, la couleur et les états
                    pour vérifier l’API du composant.
                </p>
            </div>

            <div className={styles.playground}>
                <form className={styles.controls}>
                    <label>
                        Variante
                        <select
                            value={values.variant}
                            onChange={(event) =>
                                update(
                                    "variant",
                                    event.target.value as LRZButtonVariant,
                                )
                            }
                        >
                            {["primary", "secondary", "ghost", "quiet"].map(
                                (variant) => (
                                    <option key={variant} value={variant}>
                                        {variant}
                                    </option>
                                ),
                            )}
                        </select>
                    </label>

                    <label>
                        Preset sémantique
                        <select
                            value={values.preset}
                            onChange={(event) =>
                                update(
                                    "preset",
                                    event.target.value as LRZButtonPreset,
                                )
                            }
                        >
                            {[
                                "default",
                                "danger",
                                "success",
                                "warning",
                                "info",
                            ].map((preset) => (
                                <option key={preset} value={preset}>
                                    {preset}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Taille
                        <select
                            value={values.size}
                            onChange={(event) =>
                                update(
                                    "size",
                                    event.target.value as LRZButtonSize,
                                )
                            }
                        >
                            {["sm", "md", "lg", "icon"].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Couleur
                        <select
                            value={values.color}
                            onChange={(event) =>
                                update("color", event.target.value as LRZColor)
                            }
                        >
                            {LRZ_COLOR_GROUPS.map((group) => (
                                <optgroup key={group.id} label={group.title}>
                                    {group.colors.map((color) => (
                                        <option key={color} value={color}>
                                            {LRZ_COLOR_LABELS[color]}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </label>

                    <label className={styles.check}>
                        <input
                            type="checkbox"
                            checked={values.loading}
                            onChange={(event) =>
                                update("loading", event.target.checked)
                            }
                        />
                        Chargement
                    </label>

                    <label className={styles.check}>
                        <input
                            type="checkbox"
                            checked={values.fullWidth}
                            onChange={(event) =>
                                update("fullWidth", event.target.checked)
                            }
                        />
                        Pleine largeur
                    </label>

                    <button
                        className={styles.reset}
                        type="button"
                        onClick={() => setValues(INITIAL_STATE)}
                    >
                        Réinitialiser
                    </button>
                </form>

                <div className={pageStyles.preview}>
                    <p className={pageStyles.previewLabel}>Aperçu</p>
                    <div className={pageStyles.row}>
                        <LRZButton
                            {...values}
                            aria-label={
                                values.size === "icon"
                                    ? "Ajouter un lieu"
                                    : undefined
                            }
                            leadingIcon={
                                values.size === "icon" ? <Plus /> : undefined
                            }
                        >
                            {values.size === "icon" ? "Ajouter" : "Découvrir"}
                        </LRZButton>
                    </div>

                    <div className={pageStyles.row}>
                        <LRZButton
                            variant="primary"
                            color={values.color}
                            leadingIcon={<MapPin />}
                        >
                            Voir sur la carte
                        </LRZButton>
                        <LRZButton
                            variant="secondary"
                            color={values.color}
                            trailingIcon={<ArrowRight />}
                        >
                            En savoir plus
                        </LRZButton>
                    </div>

                    <pre className={pageStyles.code}>
                        <code>{code}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}
