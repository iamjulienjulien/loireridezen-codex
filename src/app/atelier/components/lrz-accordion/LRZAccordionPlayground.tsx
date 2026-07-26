"use client";

import { useState } from "react";
import { Info } from "lucide-react";

import LRZAccordion, {
    type LRZAccordionHeadingLevel,
    type LRZAccordionIndicatorPosition,
    type LRZAccordionSize,
    type LRZAccordionTone,
} from "@/components/LRZAccordion/LRZAccordion";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZAccordionPlayground.module.css";

type HeadingValue = "" | "2" | "3" | "4" | "5" | "6";

type PlaygroundState = {
    title: string;
    description: string;
    content: string;
    color: LRZColor;
    tone: LRZAccordionTone;
    size: LRZAccordionSize;
    indicatorPosition: LRZAccordionIndicatorPosition;
    headingLevel: HeadingValue;
    open: boolean;
    disabled: boolean;
    hoverState: boolean;
    fullWidth: boolean;
    unmountOnClose: boolean;
    showIcon: boolean;
    showIndicator: boolean;
    ariaLabel: string;
};

const INITIAL_STATE: PlaygroundState = {
    title: "Compléments",
    description: "Détails utiles pour prolonger la découverte",
    content:
        "Cette portion de Loire se découvre lentement, en laissant une place aux détours et aux haltes imprévues.",
    color: "ocre",
    tone: "soft",
    size: "md",
    indicatorPosition: "end",
    headingLevel: "3",
    open: true,
    disabled: false,
    hoverState: true,
    fullWidth: false,
    unmountOnClose: false,
    showIcon: false,
    showIndicator: true,
    ariaLabel: "",
};

const COLOR_OPTION_GROUPS = [
    {
        label: "Nature",
        prefix: "--lrz-nature-",
    },
    {
        label: "Faune",
        prefix: "--lrz-faune-",
    },
    {
        label: "Patrimoine",
        prefix: "--lrz-patrimoine-",
    },
].map(({ label, prefix }) => ({
    label,
    colors: LRZ_COLOR_NAMES.filter((color) =>
        LRZ_COLOR_VARIABLES[color].startsWith(prefix),
    ),
}));

const TONE_OPTIONS: Array<{
    value: LRZAccordionTone;
    label: string;
}> = [
    {
        value: "plain",
        label: "Plain",
    },
    {
        value: "divided",
        label: "Divided",
    },
    {
        value: "soft",
        label: "Soft",
    },
    {
        value: "surface",
        label: "Surface",
    },
];

const SIZE_OPTIONS: Array<{
    value: LRZAccordionSize;
    label: string;
}> = [
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
];

const escapeAttribute = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

function playgroundCode({
    title,
    description,
    content,
    color,
    tone,
    size,
    indicatorPosition,
    headingLevel,
    open,
    disabled,
    hoverState,
    fullWidth,
    unmountOnClose,
    showIcon,
    showIndicator,
    ariaLabel,
}: PlaygroundState) {
    const props = [
        `title="${escapeAttribute(title)}"`,
        description
            ? `description="${escapeAttribute(description)}"`
            : undefined,
        color !== "ocre" ? `color="${color}"` : undefined,
        tone !== "soft" ? `tone="${tone}"` : undefined,
        size !== "md" ? `size="${size}"` : undefined,
        indicatorPosition !== "end"
            ? `indicatorPosition="${indicatorPosition}"`
            : undefined,
        headingLevel ? `headingLevel={${headingLevel}}` : undefined,
        "open={open}",
        "onOpenChange={setOpen}",
        disabled ? "disabled" : undefined,
        !hoverState ? "hoverState={false}" : undefined,
        fullWidth ? "fullWidth" : undefined,
        unmountOnClose ? "unmountOnClose" : undefined,
        showIcon ? "icon={<Info />}" : undefined,
        !showIndicator ? "indicator={null}" : undefined,
        ariaLabel ? `ariaLabel="${escapeAttribute(ariaLabel)}"` : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    return `const [open, setOpen] = useState(${open});

<LRZAccordion
    ${props.join("\n    ")}
>
    <p>${content}</p>
</LRZAccordion>`;
}

export default function LRZAccordionPlayground() {
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

    const headingLevel = values.headingLevel
        ? (Number(values.headingLevel) as LRZAccordionHeadingLevel)
        : undefined;

    return (
        <section
            className={styles.playground}
            aria-labelledby="accordion-playground-title"
        >
            <header className={styles.playgroundHeader}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="accordion-playground-title">
                        Composer un accordéon
                    </h2>
                    <p>
                        Ajustez son contenu, sa hiérarchie et son ambiance. Le
                        JSX correspondant est généré automatiquement.
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

                        <label
                            className={styles.control}
                            htmlFor="accordion-title"
                        >
                            <span>
                                title <strong>requis</strong>
                            </span>
                            <input
                                id="accordion-title"
                                value={values.title}
                                onChange={(event) =>
                                    updateValue("title", event.target.value)
                                }
                            />
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="accordion-description"
                        >
                            <span>description</span>
                            <input
                                id="accordion-description"
                                value={values.description}
                                placeholder="Description facultative"
                                onChange={(event) =>
                                    updateValue(
                                        "description",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="accordion-content"
                        >
                            <span>
                                children <strong>requis</strong>
                            </span>
                            <textarea
                                id="accordion-content"
                                rows={5}
                                value={values.content}
                                onChange={(event) =>
                                    updateValue("content", event.target.value)
                                }
                            />
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Apparence</legend>

                        <label
                            className={styles.control}
                            htmlFor="accordion-color"
                        >
                            <span>color</span>
                            <select
                                id="accordion-color"
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

                        <label
                            className={styles.control}
                            htmlFor="accordion-tone"
                        >
                            <span>tone</span>
                            <select
                                id="accordion-tone"
                                value={values.tone}
                                onChange={(event) =>
                                    updateValue(
                                        "tone",
                                        event.target.value as LRZAccordionTone,
                                    )
                                }
                            >
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
                            htmlFor="accordion-size"
                        >
                            <span>size</span>
                            <select
                                id="accordion-size"
                                value={values.size}
                                onChange={(event) =>
                                    updateValue(
                                        "size",
                                        event.target.value as LRZAccordionSize,
                                    )
                                }
                            >
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
                            htmlFor="accordion-heading"
                        >
                            <span>headingLevel</span>
                            <select
                                id="accordion-heading"
                                value={values.headingLevel}
                                onChange={(event) =>
                                    updateValue(
                                        "headingLevel",
                                        event.target.value as HeadingValue,
                                    )
                                }
                            >
                                <option value="">Aucun heading</option>
                                {[2, 3, 4, 5, 6].map((level) => (
                                    <option key={level} value={level}>
                                        h{level}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="accordion-indicator-position"
                        >
                            <span>indicatorPosition</span>
                            <select
                                id="accordion-indicator-position"
                                value={values.indicatorPosition}
                                onChange={(event) =>
                                    updateValue(
                                        "indicatorPosition",
                                        event.target
                                            .value as LRZAccordionIndicatorPosition,
                                    )
                                }
                            >
                                <option value="start">Start</option>
                                <option value="end">End</option>
                            </select>
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Comportement</legend>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.open}
                                onChange={(event) =>
                                    updateValue("open", event.target.checked)
                                }
                            />
                            <span>open — état contrôlé</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.disabled}
                                onChange={(event) =>
                                    updateValue(
                                        "disabled",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>disabled</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.hoverState}
                                onChange={(event) =>
                                    updateValue(
                                        "hoverState",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>hoverState</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.fullWidth}
                                onChange={(event) =>
                                    updateValue(
                                        "fullWidth",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>fullWidth</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.unmountOnClose}
                                onChange={(event) =>
                                    updateValue(
                                        "unmountOnClose",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>unmountOnClose</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.showIcon}
                                onChange={(event) =>
                                    updateValue(
                                        "showIcon",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>icon</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.showIndicator}
                                onChange={(event) =>
                                    updateValue(
                                        "showIndicator",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>indicator</span>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="accordion-aria-label"
                        >
                            <span>ariaLabel</span>
                            <input
                                id="accordion-aria-label"
                                value={values.ariaLabel}
                                placeholder="Nom accessible facultatif"
                                onChange={(event) =>
                                    updateValue("ariaLabel", event.target.value)
                                }
                            />
                        </label>
                    </fieldset>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>

                        <div className={styles.canvas}>
                            <LRZAccordion
                                title={values.title || "Sans titre"}
                                description={values.description || undefined}
                                color={values.color}
                                tone={values.tone}
                                size={values.size}
                                indicatorPosition={values.indicatorPosition}
                                headingLevel={headingLevel}
                                open={values.open}
                                onOpenChange={(open) =>
                                    updateValue("open", open)
                                }
                                disabled={values.disabled}
                                hoverState={values.hoverState}
                                fullWidth={values.fullWidth}
                                unmountOnClose={values.unmountOnClose}
                                icon={
                                    values.showIcon ? (
                                        <Info aria-hidden="true" />
                                    ) : undefined
                                }
                                indicator={
                                    values.showIndicator ? undefined : null
                                }
                                ariaLabel={values.ariaLabel || undefined}
                            >
                                <p>{values.content}</p>
                            </LRZAccordion>
                        </div>

                        <dl className={styles.resolvedValues}>
                            <div>
                                <dt>État</dt>
                                <dd>{values.open ? "ouvert" : "fermé"}</dd>
                            </div>
                            <div>
                                <dt>Variante</dt>
                                <dd>
                                    {values.tone} · {values.size}
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
