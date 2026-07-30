"use client";

import { useState } from "react";
import { Grid2X2, Images, List, Table2 } from "lucide-react";

import {
    LRZButtonGroup,
    LRZButtonGroupItem,
} from "@/components/LRZButtonGroup";
import type { LRZButtonVariant } from "@/components/LRZButton";
import { LRZ_COLOR_GROUPS, LRZ_COLOR_LABELS } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import type {
    LRZButtonGroupOrientation,
    LRZButtonGroupProps,
} from "@/components/LRZButtonGroup";

import pageStyles from "../filter-playground.module.css";
import styles from "./LRZButtonGroupPlayground.module.css";

type PlaygroundState = {
    color: LRZColor;
    orientation: LRZButtonGroupOrientation;
    size: NonNullable<LRZButtonGroupProps["size"]>;
    variant: LRZButtonVariant;
    fullWidth: boolean;
};

const INITIAL_STATE: PlaygroundState = {
    color: "ocre",
    orientation: "horizontal",
    size: "md",
    variant: "quiet",
    fullWidth: false,
};

const OPTIONS = [
    ["territories", "Territoires", <Grid2X2 key="territories" />],
    ["catalogue", "Catalogue", <List key="catalogue" />],
    ["table", "Tableau", <Table2 key="table" />],
    ["gallery", "Galerie", <Images key="gallery" />],
] as const;

export default function LRZButtonGroupPlayground() {
    const [values, setValues] = useState(INITIAL_STATE);
    const [selected, setSelected] = useState("catalogue");

    const update = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => setValues((current) => ({ ...current, [key]: value }));

    const code = `<LRZButtonGroup
    color="${values.color}"
    orientation="${values.orientation}"
    size="${values.size}"
    variant="${values.variant}"
${values.fullWidth ? "    fullWidth\n" : ""}    value="${selected}"
    onValueChange={setView}
>`;

    return (
        <section
            className={pageStyles.section}
            aria-labelledby="button-group-playground"
        >
            <div className={pageStyles.sectionHeader}>
                <p className={pageStyles.kicker}>Bac à sable interactif</p>
                <h2 id="button-group-playground">Composer un groupe</h2>
                <p>
                    Testez les dimensions du groupe et observez le changement de
                    sélection.
                </p>
            </div>

            <div className={styles.playground}>
                <form className={styles.controls}>
                    <label>
                        Orientation
                        <select
                            value={values.orientation}
                            onChange={(event) =>
                                update(
                                    "orientation",
                                    event.target
                                        .value as LRZButtonGroupOrientation,
                                )
                            }
                        >
                            <option value="horizontal">horizontal</option>
                            <option value="vertical">vertical</option>
                        </select>
                    </label>

                    <label>
                        Taille
                        <select
                            value={values.size}
                            onChange={(event) =>
                                update(
                                    "size",
                                    event.target
                                        .value as PlaygroundState["size"],
                                )
                            }
                        >
                            <option value="sm">sm</option>
                            <option value="md">md</option>
                            <option value="lg">lg</option>
                        </select>
                    </label>

                    <label>
                        Variante inactive
                        <select
                            value={values.variant}
                            onChange={(event) =>
                                update(
                                    "variant",
                                    event.target.value as LRZButtonVariant,
                                )
                            }
                        >
                            <option value="quiet">quiet</option>
                            <option value="secondary">secondary</option>
                            <option value="ghost">ghost</option>
                            <option value="primary">primary</option>
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
                        onClick={() => {
                            setValues(INITIAL_STATE);
                            setSelected("catalogue");
                        }}
                    >
                        Réinitialiser
                    </button>
                </form>

                <div className={pageStyles.preview}>
                    <p className={pageStyles.previewLabel}>Aperçu</p>
                    <LRZButtonGroup
                        {...values}
                        value={selected}
                        onValueChange={setSelected}
                        ariaLabel="Vue du catalogue"
                    >
                        {OPTIONS.map(([value, label, icon]) => (
                            <LRZButtonGroupItem
                                key={value}
                                value={value}
                                leadingIcon={icon}
                            >
                                {label}
                            </LRZButtonGroupItem>
                        ))}
                    </LRZButtonGroup>
                    <pre className={pageStyles.code}>
                        <code>{code}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}
