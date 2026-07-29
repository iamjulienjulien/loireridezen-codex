"use client";

import { useState } from "react";
import { CalendarDays, Landmark, MapPin } from "lucide-react";

import LRZMetaList, {
    type LRZMetaListColumns,
    type LRZMetaListLayout,
    type LRZMetaListSize,
    type LRZMetaListTone,
    type LRZMetaListValueAlign,
} from "@/components/LRZMetaList";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZMetaListPlayground.module.css";

type PlaygroundState = {
    color: LRZColor;
    tone: LRZMetaListTone;
    size: LRZMetaListSize;
    layout: LRZMetaListLayout;
    columns: LRZMetaListColumns;
    valueAlign: LRZMetaListValueAlign;
    hideEmpty: boolean;
    showIcons: boolean;
    showHints: boolean;
    emphasizeFirst: boolean;
    includeEmpty: boolean;
    labelWidth: string;
};

const INITIAL_STATE: PlaygroundState = {
    color: "ocre",
    tone: "divided",
    size: "md",
    layout: "responsive",
    columns: 1,
    valueAlign: "start",
    hideEmpty: false,
    showIcons: true,
    showHints: true,
    emphasizeFirst: false,
    includeEmpty: true,
    labelWidth: "",
};

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

function playgroundCode(values: PlaygroundState) {
    const props = [
        values.color !== "ocre" ? `color="${values.color}"` : undefined,
        values.tone !== "divided" ? `tone="${values.tone}"` : undefined,
        values.size !== "md" ? `size="${values.size}"` : undefined,
        values.layout !== "responsive"
            ? `layout="${values.layout}"`
            : undefined,
        values.columns !== 1
            ? `columns={${JSON.stringify(values.columns)}}`
            : undefined,
        values.valueAlign !== "start"
            ? `valueAlign="${values.valueAlign}"`
            : undefined,
        values.hideEmpty ? "hideEmpty" : undefined,
        values.labelWidth ? `labelWidth="${values.labelWidth}"` : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    return `<LRZMetaList${props.length ? `\n    ${props.join("\n    ")}` : ""}
    items={[
        {
            id: "epoque",
            label: "Époque",
            value: "Renaissance",
        },
        {
            id: "commune",
            label: "Commune",
            value: "Chambord",
        },
        {
            id: "protection",
            label: "Protection",
            value: undefined,
        },
    ]}
/>`;
}

export default function LRZMetaListPlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const items = [
        {
            id: "epoque",
            label: "Époque",
            value: "Renaissance",
            icon: values.showIcons ? (
                <CalendarDays aria-hidden="true" />
            ) : undefined,
            hint: values.showHints ? "XVIe siècle" : undefined,
            emphasized: values.emphasizeFirst,
        },
        {
            id: "architecture",
            label: "Architecture",
            value: "Renaissance française",
            icon: values.showIcons ? (
                <Landmark aria-hidden="true" />
            ) : undefined,
        },
        {
            id: "commune",
            label: "Commune",
            value: "Chambord",
            icon: values.showIcons ? <MapPin aria-hidden="true" /> : undefined,
            hint: values.showHints ? "Loir-et-Cher" : undefined,
        },
        ...(values.includeEmpty
            ? [
                  {
                      id: "commanditaire",
                      label: "Commanditaire",
                      value: undefined,
                  },
              ]
            : []),
    ];

    return (
        <section
            className={styles.playground}
            aria-labelledby="meta-list-playground-title"
        >
            <header className={styles.playgroundHeader}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="meta-list-playground-title">
                        Composer une liste de métadonnées
                    </h2>
                    <p>
                        Ajustez la densité, la structure et le traitement des
                        valeurs. Le JSX est généré automatiquement.
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
                        <legend>Apparence</legend>

                        <label className={styles.control}>
                            <span>color</span>
                            <select
                                value={values.color}
                                onChange={(event) =>
                                    updateValue(
                                        "color",
                                        event.target.value as LRZColor,
                                    )
                                }
                            >
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
                            <span>tone</span>
                            <select
                                value={values.tone}
                                onChange={(event) =>
                                    updateValue(
                                        "tone",
                                        event.target.value as LRZMetaListTone,
                                    )
                                }
                            >
                                <option value="plain">Plain</option>
                                <option value="divided">Divided</option>
                                <option value="soft">Soft</option>
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>size</span>
                            <select
                                value={values.size}
                                onChange={(event) =>
                                    updateValue(
                                        "size",
                                        event.target.value as LRZMetaListSize,
                                    )
                                }
                            >
                                <option value="sm">SM</option>
                                <option value="md">MD</option>
                                <option value="lg">LG</option>
                            </select>
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Structure</legend>

                        <label className={styles.control}>
                            <span>layout</span>
                            <select
                                value={values.layout}
                                onChange={(event) =>
                                    updateValue(
                                        "layout",
                                        event.target.value as LRZMetaListLayout,
                                    )
                                }
                            >
                                <option value="responsive">Responsive</option>
                                <option value="inline">Inline</option>
                                <option value="stacked">Stacked</option>
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>columns</span>
                            <select
                                value={String(values.columns)}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    updateValue(
                                        "columns",
                                        value === "auto"
                                            ? "auto"
                                            : (Number(
                                                  value,
                                              ) as LRZMetaListColumns),
                                    );
                                }}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="auto">Auto</option>
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>valueAlign</span>
                            <select
                                value={values.valueAlign}
                                onChange={(event) =>
                                    updateValue(
                                        "valueAlign",
                                        event.target
                                            .value as LRZMetaListValueAlign,
                                    )
                                }
                            >
                                <option value="start">Start</option>
                                <option value="end">End</option>
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>labelWidth</span>
                            <input
                                value={values.labelWidth}
                                placeholder="Ex. 120px"
                                onChange={(event) =>
                                    updateValue(
                                        "labelWidth",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Contenu</legend>

                        {[
                            ["showIcons", "Afficher les icônes"],
                            ["showHints", "Afficher les précisions"],
                            [
                                "emphasizeFirst",
                                "Mettre la première valeur en avant",
                            ],
                            ["includeEmpty", "Inclure une valeur absente"],
                            ["hideEmpty", "Masquer les valeurs absentes"],
                        ].map(([key, label]) => (
                            <label className={styles.checkControl} key={key}>
                                <input
                                    type="checkbox"
                                    checked={
                                        values[
                                            key as keyof PlaygroundState
                                        ] as boolean
                                    }
                                    onChange={(event) =>
                                        updateValue(
                                            key as
                                                | "showIcons"
                                                | "showHints"
                                                | "emphasizeFirst"
                                                | "includeEmpty"
                                                | "hideEmpty",
                                            event.target.checked,
                                        )
                                    }
                                />
                                <span>{label}</span>
                            </label>
                        ))}
                    </fieldset>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>
                        <div className={styles.canvas}>
                            <LRZMetaList
                                items={items}
                                color={values.color}
                                tone={values.tone}
                                size={values.size}
                                layout={values.layout}
                                columns={values.columns}
                                valueAlign={values.valueAlign}
                                hideEmpty={values.hideEmpty}
                                labelWidth={values.labelWidth || undefined}
                            />
                        </div>

                        <dl className={styles.resolvedValues}>
                            <div>
                                <dt>Variante</dt>
                                <dd>
                                    {values.tone} · {values.size}
                                </dd>
                            </div>
                            <div>
                                <dt>Structure</dt>
                                <dd>
                                    {values.layout} · {values.columns} col.
                                </dd>
                            </div>
                            <div>
                                <dt>Accent</dt>
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
