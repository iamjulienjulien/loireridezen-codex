"use client";

import { useState } from "react";
import { Castle, MapPin } from "lucide-react";

import LRZBadge from "@/components/LRZBadge/LRZBadge";
import {
    LRZCard,
    LRZCardContent,
    LRZCardFooter,
    LRZCardHeader,
    LRZCardMedia,
    type LRZCardLayout,
    type LRZCardAccent,
    type LRZCardElevation,
    type LRZCardFooterAlign,
    type LRZCardMediaRatio,
    type LRZCardPadding,
    type LRZCardTone,
} from "@/components/LRZCard";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colorsV2";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZCardPlayground.module.css";

type PlaygroundState = {
    eyebrow: string;
    title: string;
    description: string;
    content: string;
    color: LRZColor;
    tone: LRZCardTone;
    accent: LRZCardAccent;
    padding: LRZCardPadding;
    elevation: LRZCardElevation;
    layout: LRZCardLayout;
    interactive: boolean;
    selected: boolean;
    active: boolean;
    loading: boolean;
    disabled: boolean;
    mediaRatio: LRZCardMediaRatio;
    footerAlign: LRZCardFooterAlign;
    equalHeight: boolean;
    showMedia: boolean;
    mediaBleed: boolean;
    showIcon: boolean;
    showMetadata: boolean;
    showFooter: boolean;
    dividedFooter: boolean;
};

const INITIAL_STATE: PlaygroundState = {
    eyebrow: "Patrimoine",
    title: "Château de Saumur",
    description: "Une silhouette princière dominant la Loire.",
    content:
        "Forteresse médiévale puis résidence raffinée, le château accompagne le fleuve depuis près de dix siècles.",
    color: "ocre",
    tone: "surface",
    accent: "top",
    padding: "none",
    elevation: "card",
    layout: "media-top",
    interactive: false,
    selected: false,
    active: false,
    loading: false,
    disabled: false,
    mediaRatio: "wide",
    footerAlign: "between",
    equalHeight: false,
    showMedia: true,
    mediaBleed: false,
    showIcon: true,
    showMetadata: true,
    showFooter: true,
    dividedFooter: true,
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

const escapeAttribute = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

function playgroundCode(values: PlaygroundState) {
    const rootProps = [
        values.color !== "ocre" ? `color="${values.color}"` : undefined,
        values.tone !== "surface" ? `tone="${values.tone}"` : undefined,
        values.accent !== "top" ? `accent="${values.accent}"` : undefined,
        values.padding !== "none" ? `padding="${values.padding}"` : undefined,
        values.elevation !== "card"
            ? `elevation="${values.elevation}"`
            : undefined,
        values.layout !== "media-top" ? `layout="${values.layout}"` : undefined,
        values.interactive ? "interactive" : undefined,
        values.selected ? "selected" : undefined,
        values.active ? "active" : undefined,
        values.loading ? "loading" : undefined,
        values.disabled ? "disabled" : undefined,
        values.equalHeight ? "equalHeight" : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    const opening = rootProps.length
        ? `<LRZCard\n    ${rootProps.join("\n    ")}\n>`
        : "<LRZCard>";

    const media = values.showMedia
        ? `    <LRZCardMedia
        ratio="${values.mediaRatio}"${values.mediaBleed ? "\n        bleed" : ""}
    >
        <Image src={image} alt="" fill />
    </LRZCardMedia>

`
        : "";

    const headerProps = [
        values.eyebrow
            ? `eyebrow="${escapeAttribute(values.eyebrow)}"`
            : undefined,
        `title="${escapeAttribute(values.title)}"`,
        values.description
            ? `description="${escapeAttribute(values.description)}"`
            : undefined,
        values.showIcon ? "icon={<Castle />}" : undefined,
        values.showMetadata
            ? 'metadata={<LRZBadge label="Médiéval" color="brun" />}'
            : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    const footer = values.showFooter
        ? `

    <LRZCardFooter
        align="${values.footerAlign}"${values.dividedFooter ? "\n        divided" : ""}
    >
        <span>Saumur</span>
        <span>Découvrir →</span>
    </LRZCardFooter>`
        : "";

    return `${opening}
${media}    <LRZCardHeader
        ${headerProps.join("\n        ")}
    />

    <LRZCardContent>
        <p>${values.content}</p>
    </LRZCardContent>${footer}
</LRZCard>`;
}

export default function LRZCardPlayground() {
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

    return (
        <section
            className={styles.playground}
            aria-labelledby="card-playground-title"
        >
            <header className={styles.playgroundHeader}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2 id="card-playground-title">Composer une carte</h2>
                    <p>
                        Ajustez la surface, les zones et le rythme. Le JSX
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
                    <fieldset className={styles.controlGroup}>
                        <legend>Contenu</legend>

                        <label
                            className={styles.control}
                            htmlFor="card-eyebrow"
                        >
                            <span>eyebrow</span>
                            <input
                                id="card-eyebrow"
                                value={values.eyebrow}
                                onChange={(event) =>
                                    updateValue("eyebrow", event.target.value)
                                }
                            />
                        </label>

                        <label className={styles.control} htmlFor="card-title">
                            <span>title</span>
                            <input
                                id="card-title"
                                value={values.title}
                                onChange={(event) =>
                                    updateValue("title", event.target.value)
                                }
                            />
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="card-description"
                        >
                            <span>description</span>
                            <input
                                id="card-description"
                                value={values.description}
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
                            htmlFor="card-content"
                        >
                            <span>children</span>
                            <textarea
                                id="card-content"
                                rows={5}
                                value={values.content}
                                onChange={(event) =>
                                    updateValue("content", event.target.value)
                                }
                            />
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Surface</legend>

                        <label className={styles.control} htmlFor="card-color">
                            <span>color</span>
                            <select
                                id="card-color"
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

                        <label className={styles.control} htmlFor="card-tone">
                            <span>tone</span>
                            <select
                                id="card-tone"
                                value={values.tone}
                                onChange={(event) =>
                                    updateValue(
                                        "tone",
                                        event.target.value as LRZCardTone,
                                    )
                                }
                            >
                                {[
                                    "surface",
                                    "soft",
                                    "outline",
                                    "transparent",
                                ].map((tone) => (
                                    <option key={tone} value={tone}>
                                        {tone}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control} htmlFor="card-accent">
                            <span>accent</span>
                            <select
                                id="card-accent"
                                value={values.accent}
                                onChange={(event) =>
                                    updateValue(
                                        "accent",
                                        event.target.value as LRZCardAccent,
                                    )
                                }
                            >
                                {["top", "start", "none"].map((accent) => (
                                    <option key={accent} value={accent}>
                                        {accent}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="card-elevation"
                        >
                            <span>elevation</span>
                            <select
                                id="card-elevation"
                                value={values.elevation}
                                onChange={(event) =>
                                    updateValue(
                                        "elevation",
                                        event.target.value as LRZCardElevation,
                                    )
                                }
                            >
                                {["none", "card", "raised"].map((elevation) => (
                                    <option key={elevation} value={elevation}>
                                        {elevation}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="card-padding"
                        >
                            <span>padding</span>
                            <select
                                id="card-padding"
                                value={values.padding}
                                onChange={(event) =>
                                    updateValue(
                                        "padding",
                                        event.target.value as LRZCardPadding,
                                    )
                                }
                            >
                                {["none", "sm", "md", "lg"].map((padding) => (
                                    <option key={padding} value={padding}>
                                        {padding}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control} htmlFor="card-layout">
                            <span>layout</span>
                            <select
                                id="card-layout"
                                value={values.layout}
                                onChange={(event) =>
                                    updateValue(
                                        "layout",
                                        event.target.value as LRZCardLayout,
                                    )
                                }
                            >
                                {[
                                    "media-top",
                                    "media-bottom",
                                    "media-start",
                                    "media-end",
                                ].map((layout) => (
                                    <option key={layout} value={layout}>
                                        {layout}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Zones</legend>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.showMedia}
                                onChange={(event) =>
                                    updateValue(
                                        "showMedia",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>LRZCardMedia</span>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="card-media-ratio"
                        >
                            <span>media ratio</span>
                            <select
                                id="card-media-ratio"
                                value={values.mediaRatio}
                                disabled={!values.showMedia}
                                onChange={(event) =>
                                    updateValue(
                                        "mediaRatio",
                                        event.target.value as LRZCardMediaRatio,
                                    )
                                }
                            >
                                {[
                                    "auto",
                                    "square",
                                    "portrait",
                                    "landscape",
                                    "wide",
                                ].map((ratio) => (
                                    <option key={ratio} value={ratio}>
                                        {ratio}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.mediaBleed}
                                disabled={!values.showMedia}
                                onChange={(event) =>
                                    updateValue(
                                        "mediaBleed",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>media bleed</span>
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
                            <span>header icon</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.showMetadata}
                                onChange={(event) =>
                                    updateValue(
                                        "showMetadata",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>header metadata</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.showFooter}
                                onChange={(event) =>
                                    updateValue(
                                        "showFooter",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>LRZCardFooter</span>
                        </label>

                        <label
                            className={styles.control}
                            htmlFor="card-footer-align"
                        >
                            <span>footer align</span>
                            <select
                                id="card-footer-align"
                                value={values.footerAlign}
                                disabled={!values.showFooter}
                                onChange={(event) =>
                                    updateValue(
                                        "footerAlign",
                                        event.target
                                            .value as LRZCardFooterAlign,
                                    )
                                }
                            >
                                {["start", "center", "end", "between"].map(
                                    (align) => (
                                        <option key={align} value={align}>
                                            {align}
                                        </option>
                                    ),
                                )}
                            </select>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.dividedFooter}
                                disabled={!values.showFooter}
                                onChange={(event) =>
                                    updateValue(
                                        "dividedFooter",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>footer divided</span>
                        </label>

                        <label className={styles.checkControl}>
                            <input
                                type="checkbox"
                                checked={values.equalHeight}
                                onChange={(event) =>
                                    updateValue(
                                        "equalHeight",
                                        event.target.checked,
                                    )
                                }
                            />
                            <span>equalHeight</span>
                        </label>

                        {(
                            [
                                "interactive",
                                "selected",
                                "active",
                                "loading",
                                "disabled",
                            ] as const
                        ).map((state) => (
                            <label className={styles.checkControl} key={state}>
                                <input
                                    type="checkbox"
                                    checked={values[state]}
                                    onChange={(event) =>
                                        updateValue(state, event.target.checked)
                                    }
                                />
                                <span>{state}</span>
                            </label>
                        ))}
                    </fieldset>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>

                        <div className={styles.canvas}>
                            <LRZCard
                                color={values.color}
                                tone={values.tone}
                                accent={values.accent}
                                padding={values.padding}
                                elevation={values.elevation}
                                layout={values.layout}
                                interactive={values.interactive}
                                selected={values.selected}
                                active={values.active}
                                loading={values.loading}
                                disabled={values.disabled}
                                equalHeight={values.equalHeight}
                            >
                                {values.showMedia ? (
                                    <LRZCardMedia
                                        ratio={values.mediaRatio}
                                        bleed={values.mediaBleed}
                                    >
                                        <div className={styles.demoMedia}>
                                            <span aria-hidden="true">🏰</span>
                                            <small>Val de Loire</small>
                                        </div>
                                    </LRZCardMedia>
                                ) : null}

                                <LRZCardHeader
                                    eyebrow={values.eyebrow || undefined}
                                    title={values.title || "Sans titre"}
                                    description={
                                        values.description || undefined
                                    }
                                    icon={
                                        values.showIcon ? (
                                            <Castle aria-hidden="true" />
                                        ) : undefined
                                    }
                                    metadata={
                                        values.showMetadata ? (
                                            <LRZBadge
                                                label="Médiéval"
                                                color="brun"
                                            />
                                        ) : undefined
                                    }
                                />

                                <LRZCardContent>
                                    <p>{values.content}</p>
                                </LRZCardContent>

                                {values.showFooter ? (
                                    <LRZCardFooter
                                        align={values.footerAlign}
                                        divided={values.dividedFooter}
                                    >
                                        <span className={styles.location}>
                                            <MapPin aria-hidden="true" />
                                            Saumur
                                        </span>
                                        <span className={styles.fakeLink}>
                                            Découvrir{" "}
                                            <span aria-hidden="true">→</span>
                                        </span>
                                    </LRZCardFooter>
                                ) : null}
                            </LRZCard>
                        </div>
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
