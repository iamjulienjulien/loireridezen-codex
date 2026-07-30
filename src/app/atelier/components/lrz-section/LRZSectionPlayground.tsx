"use client";

import { useState } from "react";
import LRZSection, {
    type LRZSectionAlign,
    type LRZSectionAsidePosition,
    type LRZSectionColumns,
    type LRZSectionHeaderLayout,
    type LRZSectionHeaderPosition,
    type LRZSectionLayout,
    type LRZSectionMobileAsidePosition,
    type LRZSectionSeparatorPreset,
    type LRZSectionSpacing,
    type LRZSectionTone,
    type LRZSectionWidth,
} from "@/components/LRZSection/LRZSection";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZSectionPlayground.module.css";

type PlaygroundState = {
    layout: LRZSectionLayout;
    width: LRZSectionWidth;
    spacing: LRZSectionSpacing;
    tone: LRZSectionTone;
    color: LRZColor;
    align: LRZSectionAlign;
    eyebrow: string;
    title: string;
    description: string;
    headerLayout: LRZSectionHeaderLayout;
    headerPosition: LRZSectionHeaderPosition;
    asidePosition: LRZSectionAsidePosition;
    mobileAsidePosition: LRZSectionMobileAsidePosition;
    separatorBefore: LRZSectionSeparatorPreset;
    separatorAfter: LRZSectionSeparatorPreset;
    separatorColor: LRZColor;
    bleed: boolean;
    flushOnMobile: boolean;
    visuallyHiddenTitle: boolean;
    columns: LRZSectionColumns;
    maxWidth: string;
    paddingBlock: string;
    paddingInline: string;
    minColumnWidth: string;
    gap: string;
    ariaLabel: string;
};

const INITIAL_STATE: PlaygroundState = {
    layout: "stack",
    width: "content",
    spacing: "lg",
    tone: "plain",
    color: "galet",
    align: "start",
    eyebrow: "Le Codex",
    title: "Une section éditoriale",
    description:
        "Une structure commune pour organiser le contenu, les respirations et les différentes ambiances des pages Loire Ride Zen.",
    headerLayout: "stack",
    headerPosition: "top",
    asidePosition: "end",
    mobileAsidePosition: "after",
    separatorBefore: "none",
    separatorAfter: "spark",
    separatorColor: "ocre",
    bleed: false,
    flushOnMobile: false,
    visuallyHiddenTitle: false,
    columns: 3,
    maxWidth: "",
    paddingBlock: "",
    paddingInline: "",
    minColumnWidth: "",
    gap: "",
    ariaLabel: "",
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

const LAYOUT_OPTIONS: Array<{
    value: LRZSectionLayout;
    label: string;
}> = [
    { value: "stack", label: "Pile verticale" },
    { value: "split", label: "Deux colonnes" },
    { value: "sidebar", label: "Sidebar" },
    { value: "grid", label: "Grille" },
    { value: "full", label: "Pleine largeur" },
    { value: "bleed", label: "Fond débordant" },
];

const WIDTH_OPTIONS: Array<{
    value: LRZSectionWidth;
    label: string;
}> = [
    { value: "narrow", label: "Étroit" },
    { value: "reading", label: "Lecture" },
    { value: "content", label: "Contenu" },
    { value: "wide", label: "Large" },
    { value: "full", label: "Complet" },
];

const SPACING_OPTIONS: Array<{
    value: LRZSectionSpacing;
    label: string;
}> = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "XS" },
    { value: "sm", label: "SM" },
    { value: "md", label: "MD" },
    { value: "lg", label: "LG" },
    { value: "xl", label: "XL" },
];

const TONE_OPTIONS: Array<{
    value: LRZSectionTone;
    label: string;
}> = [
    { value: "plain", label: "Simple" },
    { value: "surface", label: "Surface" },
    { value: "soft", label: "Doux" },
    { value: "tinted", label: "Teinté" },
    { value: "contrast", label: "Contraste" },
    { value: "transparent", label: "Transparent" },
];

const ALIGN_OPTIONS: Array<{
    value: LRZSectionAlign;
    label: string;
}> = [
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
];

const HEADER_LAYOUT_OPTIONS: Array<{
    value: LRZSectionHeaderLayout;
    label: string;
}> = [
    { value: "stack", label: "Empilé" },
    { value: "inline", label: "En ligne" },
    { value: "split", label: "Séparé" },
];

const HEADER_POSITION_OPTIONS: Array<{
    value: LRZSectionHeaderPosition;
    label: string;
}> = [
    { value: "top", label: "Au-dessus" },
    { value: "side", label: "Sur le côté" },
];

const ASIDE_POSITION_OPTIONS: Array<{
    value: LRZSectionAsidePosition;
    label: string;
}> = [
    { value: "start", label: "Début" },
    { value: "end", label: "Fin" },
];

const MOBILE_ASIDE_POSITION_OPTIONS: Array<{
    value: LRZSectionMobileAsidePosition;
    label: string;
}> = [
    { value: "before", label: "Avant le contenu" },
    { value: "after", label: "Après le contenu" },
];

const SEPARATOR_OPTIONS: Array<{
    value: LRZSectionSeparatorPreset;
    label: string;
}> = [
    { value: "none", label: "Aucun" },
    { value: "simple", label: "Simple" },
    { value: "spark", label: "Étincelle" },
    { value: "diamond", label: "Losange" },
    { value: "dot", label: "Point" },
    { value: "fade", label: "Fondu" },
];

const COLUMN_OPTIONS: LRZSectionColumns[] = [2, 3, 4];

function escapeAttribute(value: string) {
    return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function playgroundCode(values: PlaygroundState) {
    const props = [
        values.layout !== "stack" ? `layout="${values.layout}"` : undefined,
        values.width !== "content" ? `width="${values.width}"` : undefined,
        values.spacing !== "lg" ? `spacing="${values.spacing}"` : undefined,
        values.tone !== "plain" ? `tone="${values.tone}"` : undefined,
        values.color !== "galet" ? `color="${values.color}"` : undefined,
        values.align !== "start" ? `align="${values.align}"` : undefined,
        values.eyebrow
            ? `eyebrow="${escapeAttribute(values.eyebrow)}"`
            : undefined,
        values.title ? `title="${escapeAttribute(values.title)}"` : undefined,
        values.description
            ? `description="${escapeAttribute(values.description)}"`
            : undefined,
        values.headerLayout !== "stack"
            ? `headerLayout="${values.headerLayout}"`
            : undefined,
        values.headerPosition !== "top"
            ? `headerPosition="${values.headerPosition}"`
            : undefined,
        values.asidePosition !== "end"
            ? `asidePosition="${values.asidePosition}"`
            : undefined,
        values.mobileAsidePosition !== "after"
            ? `mobileAsidePosition="${values.mobileAsidePosition}"`
            : undefined,
        values.separatorBefore !== "none"
            ? `separatorBefore="${values.separatorBefore}"`
            : undefined,
        values.separatorAfter !== "none"
            ? `separatorAfter="${values.separatorAfter}"`
            : undefined,
        values.separatorColor !== values.color
            ? `separatorColor="${values.separatorColor}"`
            : undefined,
        values.bleed ? "bleed" : undefined,
        values.flushOnMobile ? "flushOnMobile" : undefined,
        values.visuallyHiddenTitle ? "visuallyHiddenTitle" : undefined,
        values.layout === "grid" && values.columns !== 3
            ? `columns={${values.columns}}`
            : undefined,
        values.maxWidth
            ? `maxWidth="${escapeAttribute(values.maxWidth)}"`
            : undefined,
        values.paddingBlock
            ? `paddingBlock="${escapeAttribute(values.paddingBlock)}"`
            : undefined,
        values.paddingInline
            ? `paddingInline="${escapeAttribute(values.paddingInline)}"`
            : undefined,
        values.minColumnWidth
            ? `minColumnWidth="${escapeAttribute(values.minColumnWidth)}"`
            : undefined,
        values.gap ? `gap="${escapeAttribute(values.gap)}"` : undefined,
        values.ariaLabel
            ? `ariaLabel="${escapeAttribute(values.ariaLabel)}"`
            : undefined,
        values.layout === "split" || values.layout === "sidebar"
            ? "aside={<PreviewAside />}"
            : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    if (props.length === 0) {
        return `<LRZSection>
    <PreviewContent />
</LRZSection>`;
    }

    return `<LRZSection
    ${props.join("\n    ")}
>
    <PreviewContent />
</LRZSection>`;
}

function PreviewContent({
    layout,
    columns,
}: {
    layout: LRZSectionLayout;
    columns: LRZSectionColumns;
}) {
    if (layout === "grid") {
        return (
            <div className={styles.previewCards}>
                {Array.from({ length: Math.max(columns, 3) }, (_, index) => (
                    <article className={styles.previewCard} key={index}>
                        <span>{String(index + 1).padStart(2, "0")}</span>

                        <strong>Fragment ligérien</strong>

                        <p>
                            Une carte fictive pour révéler la grille de la
                            section.
                        </p>
                    </article>
                ))}
            </div>
        );
    }

    return (
        <div className={styles.previewBody}>
            <p>
                Le contenu principal de la section vit dans cette zone. Il peut
                accueillir un manifeste, un catalogue, une carte ou tout autre
                fragment éditorial.
            </p>

            <p>
                Le composant se charge uniquement du cadre, du rythme et de la
                composition.
            </p>
        </div>
    );
}

function PreviewAside() {
    return (
        <div className={styles.previewAside}>
            <span className={styles.previewAsideKicker}>Aside</span>

            <strong>Contenu complémentaire</strong>

            <p>Illustration, filtres, sommaire, légende ou métadonnées.</p>
        </div>
    );
}

export default function LRZSectionPlayground() {
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

    const showAside = values.layout === "split" || values.layout === "sidebar";

    const code = playgroundCode(values);

    return (
        <section
            className={styles.playground}
            aria-labelledby="section-playground-title"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Playground</p>

                    <h2 id="section-playground-title">Composer une section</h2>

                    <p>
                        Ajustez sa largeur, son rythme, son en-tête et son
                        layout. Le JSX est régénéré à chaque mouvement de
                        brindille.
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

                        <label className={styles.control}>
                            <span>layout</span>

                            <select
                                value={values.layout}
                                onChange={(event) =>
                                    updateValue(
                                        "layout",
                                        event.target.value as LRZSectionLayout,
                                    )
                                }
                            >
                                {LAYOUT_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>width</span>

                            <select
                                value={values.width}
                                onChange={(event) =>
                                    updateValue(
                                        "width",
                                        event.target.value as LRZSectionWidth,
                                    )
                                }
                            >
                                {WIDTH_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>spacing</span>

                            <select
                                value={values.spacing}
                                onChange={(event) =>
                                    updateValue(
                                        "spacing",
                                        event.target.value as LRZSectionSpacing,
                                    )
                                }
                            >
                                {SPACING_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>align</span>

                            <select
                                value={values.align}
                                onChange={(event) =>
                                    updateValue(
                                        "align",
                                        event.target.value as LRZSectionAlign,
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

                        {values.layout === "grid" ? (
                            <label className={styles.control}>
                                <span>columns</span>

                                <select
                                    value={values.columns}
                                    onChange={(event) =>
                                        updateValue(
                                            "columns",
                                            Number(
                                                event.target.value,
                                            ) as LRZSectionColumns,
                                        )
                                    }
                                >
                                    {COLUMN_OPTIONS.map((columns) => (
                                        <option key={columns} value={columns}>
                                            {columns}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        ) : null}
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>Ambiance</p>

                        <label className={styles.control}>
                            <span>tone</span>

                            <select
                                value={values.tone}
                                onChange={(event) =>
                                    updateValue(
                                        "tone",
                                        event.target.value as LRZSectionTone,
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
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>En-tête</p>

                        <label className={styles.control}>
                            <span>eyebrow</span>

                            <input
                                value={values.eyebrow}
                                onChange={(event) =>
                                    updateValue("eyebrow", event.target.value)
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>title</span>

                            <input
                                value={values.title}
                                onChange={(event) =>
                                    updateValue("title", event.target.value)
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>description</span>

                            <textarea
                                rows={4}
                                value={values.description}
                                onChange={(event) =>
                                    updateValue(
                                        "description",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>headerLayout</span>

                            <select
                                value={values.headerLayout}
                                onChange={(event) =>
                                    updateValue(
                                        "headerLayout",
                                        event.target
                                            .value as LRZSectionHeaderLayout,
                                    )
                                }
                            >
                                {HEADER_LAYOUT_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>headerPosition</span>

                            <select
                                value={values.headerPosition}
                                onChange={(event) =>
                                    updateValue(
                                        "headerPosition",
                                        event.target
                                            .value as LRZSectionHeaderPosition,
                                    )
                                }
                            >
                                {HEADER_POSITION_OPTIONS.map((option) => (
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

                    {showAside ? (
                        <div className={styles.controlGroup}>
                            <p className={styles.controlGroupTitle}>Aside</p>

                            <label className={styles.control}>
                                <span>asidePosition</span>

                                <select
                                    value={values.asidePosition}
                                    onChange={(event) =>
                                        updateValue(
                                            "asidePosition",
                                            event.target
                                                .value as LRZSectionAsidePosition,
                                        )
                                    }
                                >
                                    {ASIDE_POSITION_OPTIONS.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className={styles.control}>
                                <span>mobileAsidePosition</span>

                                <select
                                    value={values.mobileAsidePosition}
                                    onChange={(event) =>
                                        updateValue(
                                            "mobileAsidePosition",
                                            event.target
                                                .value as LRZSectionMobileAsidePosition,
                                        )
                                    }
                                >
                                    {MOBILE_ASIDE_POSITION_OPTIONS.map(
                                        (option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </label>
                        </div>
                    ) : null}

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>Séparateurs</p>

                        <label className={styles.control}>
                            <span>separatorBefore</span>

                            <select
                                value={values.separatorBefore}
                                onChange={(event) =>
                                    updateValue(
                                        "separatorBefore",
                                        event.target
                                            .value as LRZSectionSeparatorPreset,
                                    )
                                }
                            >
                                {SEPARATOR_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>separatorAfter</span>

                            <select
                                value={values.separatorAfter}
                                onChange={(event) =>
                                    updateValue(
                                        "separatorAfter",
                                        event.target
                                            .value as LRZSectionSeparatorPreset,
                                    )
                                }
                            >
                                {SEPARATOR_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>separatorColor</span>

                            <select
                                value={values.separatorColor}
                                onChange={(event) =>
                                    updateValue(
                                        "separatorColor",
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
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>
                            Dimensions libres
                        </p>

                        <label className={styles.control}>
                            <span>maxWidth</span>

                            <input
                                value={values.maxWidth}
                                placeholder="Ex. 960px"
                                onChange={(event) =>
                                    updateValue("maxWidth", event.target.value)
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>paddingBlock</span>

                            <input
                                value={values.paddingBlock}
                                placeholder="Ex. 64px"
                                onChange={(event) =>
                                    updateValue(
                                        "paddingBlock",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>paddingInline</span>

                            <input
                                value={values.paddingInline}
                                placeholder="Ex. 24px"
                                onChange={(event) =>
                                    updateValue(
                                        "paddingInline",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>minColumnWidth</span>

                            <input
                                value={values.minColumnWidth}
                                placeholder="Ex. 220px"
                                onChange={(event) =>
                                    updateValue(
                                        "minColumnWidth",
                                        event.target.value,
                                    )
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>gap</span>

                            <input
                                value={values.gap}
                                placeholder="Ex. 32px"
                                onChange={(event) =>
                                    updateValue("gap", event.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className={styles.controlGroup}>
                        <p className={styles.controlGroupTitle}>Comportement</p>

                        <label className={styles.checkboxControl}>
                            <input
                                type="checkbox"
                                checked={values.bleed}
                                onChange={(event) =>
                                    updateValue("bleed", event.target.checked)
                                }
                            />

                            <span>bleed</span>
                        </label>

                        <label className={styles.checkboxControl}>
                            <input
                                type="checkbox"
                                checked={values.flushOnMobile}
                                onChange={(event) =>
                                    updateValue(
                                        "flushOnMobile",
                                        event.target.checked,
                                    )
                                }
                            />

                            <span>flushOnMobile</span>
                        </label>

                        <label className={styles.checkboxControl}>
                            <input
                                type="checkbox"
                                checked={values.visuallyHiddenTitle}
                                onChange={(event) =>
                                    updateValue(
                                        "visuallyHiddenTitle",
                                        event.target.checked,
                                    )
                                }
                            />

                            <span>visuallyHiddenTitle</span>
                        </label>

                        <label className={styles.control}>
                            <span>ariaLabel</span>

                            <input
                                value={values.ariaLabel}
                                placeholder="Nom accessible"
                                onChange={(event) =>
                                    updateValue("ariaLabel", event.target.value)
                                }
                            />
                        </label>
                    </div>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>

                        <div className={styles.canvas}>
                            <LRZSection
                                layout={values.layout}
                                width={values.width}
                                spacing={values.spacing}
                                tone={values.tone}
                                color={values.color}
                                align={values.align}
                                eyebrow={values.eyebrow || undefined}
                                title={values.title || undefined}
                                description={values.description || undefined}
                                headerLayout={values.headerLayout}
                                headerPosition={values.headerPosition}
                                aside={showAside ? <PreviewAside /> : undefined}
                                asidePosition={values.asidePosition}
                                mobileAsidePosition={values.mobileAsidePosition}
                                separatorBefore={values.separatorBefore}
                                separatorAfter={values.separatorAfter}
                                separatorColor={values.separatorColor}
                                bleed={values.bleed}
                                flushOnMobile={values.flushOnMobile}
                                visuallyHiddenTitle={values.visuallyHiddenTitle}
                                columns={values.columns}
                                maxWidth={values.maxWidth || undefined}
                                paddingBlock={values.paddingBlock || undefined}
                                paddingInline={
                                    values.paddingInline || undefined
                                }
                                minColumnWidth={
                                    values.minColumnWidth || undefined
                                }
                                gap={values.gap || undefined}
                                ariaLabel={values.ariaLabel || undefined}
                            >
                                <PreviewContent
                                    layout={values.layout}
                                    columns={values.columns}
                                />
                            </LRZSection>
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
