"use client";

import { useState } from "react";
import { Castle, MapPin } from "lucide-react";

import {
    LRZDialog,
    LRZDialogBody,
    LRZDialogContent,
    LRZDialogClose,
    LRZDialogFooter,
    LRZDialogHeader,
    LRZDialogTrigger,
    type LRZDialogFooterAlign,
    type LRZDialogPadding,
    type LRZDialogPlacement,
    type LRZDialogScrollMode,
    type LRZDialogSize,
    type LRZDialogVariant,
} from "@/components/_ui/LRZDialog";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZDialogPlayground.module.css";

type PlaygroundState = {
    eyebrow: string;
    title: string;
    description: string;
    content: string;
    color: LRZColor;
    size: LRZDialogSize;
    placement: LRZDialogPlacement;
    scrollMode: LRZDialogScrollMode;
    variant: LRZDialogVariant;
    padding: LRZDialogPadding;
    footerAlign: LRZDialogFooterAlign;
    showIcon: boolean;
    showFooter: boolean;
    showCloseButton: boolean;
    preventOutsideClose: boolean;
    preventEscapeClose: boolean;
    stickyHeader: boolean;
    stickyFooter: boolean;
};

const INITIAL_STATE: PlaygroundState = {
    eyebrow: "Patrimoine · Blaisois",
    title: "Château de Chambord",
    description: "Le rêve de pierre de François Ier.",
    content:
        "Chambord n’est pas seulement le plus vaste des châteaux de la Loire. Il marque le moment où la forteresse médiévale devient un manifeste royal.",
    color: "ocre",
    size: "lg",
    placement: "center",
    scrollMode: "content",
    variant: "editorial",
    padding: "none",
    footerAlign: "end",
    showIcon: true,
    showFooter: true,
    showCloseButton: true,
    preventOutsideClose: false,
    preventEscapeClose: false,
    stickyHeader: true,
    stickyFooter: true,
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

function playgroundCode(values: PlaygroundState) {
    const contentProps = [
        values.size !== "md" ? `size="${values.size}"` : undefined,
        values.placement !== "center"
            ? `placement="${values.placement}"`
            : undefined,
        values.scrollMode !== "content"
            ? `scrollMode="${values.scrollMode}"`
            : undefined,
        values.variant !== "default"
            ? `variant="${values.variant}"`
            : undefined,
        values.padding !== "none" ? `padding="${values.padding}"` : undefined,
        values.color !== "ocre" ? `color="${values.color}"` : undefined,
        !values.showCloseButton ? "showCloseButton={false}" : undefined,
        values.preventOutsideClose ? "preventOutsideClose" : undefined,
        values.preventEscapeClose ? "preventEscapeClose" : undefined,
        values.stickyHeader ? "stickyHeader" : undefined,
        values.stickyFooter ? "stickyFooter" : undefined,
    ].filter((prop): prop is string => Boolean(prop));

    const opening = contentProps.length
        ? `<LRZDialogContent\n    ${contentProps.join("\n    ")}\n>`
        : "<LRZDialogContent>";

    return `<LRZDialog>
    <LRZDialogTrigger asChild>
        <button type="button">Ouvrir</button>
    </LRZDialogTrigger>

    ${opening}
        <LRZDialogHeader
            eyebrow="${escapeAttribute(values.eyebrow)}"
            title="${escapeAttribute(values.title)}"
            description="${escapeAttribute(values.description)}"${
                values.showIcon ? "\n            icon={<Castle />}" : ""
            }
        />

        <LRZDialogBody>
            <p>${values.content}</p>
        </LRZDialogBody>${
            values.showFooter
                ? `

        <LRZDialogFooter
            align="${values.footerAlign}"
            divided
        >
            <LRZDialogClose>Fermer</LRZDialogClose>
            <button type="button">Voir sur la carte</button>
        </LRZDialogFooter>`
                : ""
        }
    </LRZDialogContent>
</LRZDialog>`;
}

export default function LRZDialogPlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const code = playgroundCode(values);

    return (
        <section className={styles.playground}>
            <header className={styles.playgroundHeader}>
                <div>
                    <p className={styles.kicker}>Playground</p>
                    <h2>Composer un dialogue</h2>
                    <p>
                        Ajustez les dimensions, le comportement et la structure
                        pour vérifier l’API du composant en conditions réelles.
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
                <form className={styles.controls}>
                    <fieldset className={styles.controlGroup}>
                        <legend>Contenu</legend>

                        <label className={styles.control}>
                            <span>Eyebrow</span>
                            <input
                                value={values.eyebrow}
                                onChange={(event) =>
                                    updateValue("eyebrow", event.target.value)
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>Titre</span>
                            <input
                                value={values.title}
                                onChange={(event) =>
                                    updateValue("title", event.target.value)
                                }
                            />
                        </label>

                        <label className={styles.control}>
                            <span>Description</span>
                            <input
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
                            <span>Corps</span>
                            <textarea
                                rows={5}
                                value={values.content}
                                onChange={(event) =>
                                    updateValue("content", event.target.value)
                                }
                            />
                        </label>
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Présentation</legend>

                        <label className={styles.control}>
                            <span>Couleur</span>
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
                            <span>Taille</span>
                            <select
                                value={values.size}
                                onChange={(event) =>
                                    updateValue(
                                        "size",
                                        event.target.value as LRZDialogSize,
                                    )
                                }
                            >
                                {["sm", "md", "lg", "xl", "fullscreen"].map(
                                    (size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ),
                                )}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>Variante</span>
                            <select
                                value={values.variant}
                                onChange={(event) =>
                                    updateValue(
                                        "variant",
                                        event.target.value as LRZDialogVariant,
                                    )
                                }
                            >
                                {["default", "editorial", "immersive"].map(
                                    (variant) => (
                                        <option key={variant} value={variant}>
                                            {variant}
                                        </option>
                                    ),
                                )}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>Padding racine</span>
                            <select
                                value={values.padding}
                                onChange={(event) =>
                                    updateValue(
                                        "padding",
                                        event.target.value as LRZDialogPadding,
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
                    </fieldset>

                    <fieldset className={styles.controlGroup}>
                        <legend>Comportement</legend>

                        <label className={styles.control}>
                            <span>Placement</span>
                            <select
                                value={values.placement}
                                onChange={(event) =>
                                    updateValue(
                                        "placement",
                                        event.target
                                            .value as LRZDialogPlacement,
                                    )
                                }
                            >
                                {["center", "top", "bottom"].map(
                                    (placement) => (
                                        <option
                                            key={placement}
                                            value={placement}
                                        >
                                            {placement}
                                        </option>
                                    ),
                                )}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>Scroll</span>
                            <select
                                value={values.scrollMode}
                                onChange={(event) =>
                                    updateValue(
                                        "scrollMode",
                                        event.target
                                            .value as LRZDialogScrollMode,
                                    )
                                }
                            >
                                {["content", "viewport", "none"].map((mode) => (
                                    <option key={mode} value={mode}>
                                        {mode}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.control}>
                            <span>Alignement footer</span>
                            <select
                                value={values.footerAlign}
                                onChange={(event) =>
                                    updateValue(
                                        "footerAlign",
                                        event.target
                                            .value as LRZDialogFooterAlign,
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

                        {[
                            ["showIcon", "Afficher l’icône"],
                            ["showFooter", "Afficher le footer"],
                            [
                                "showCloseButton",
                                "Afficher le bouton de fermeture",
                            ],
                            ["stickyHeader", "Header sticky"],
                            ["stickyFooter", "Footer sticky"],
                            [
                                "preventOutsideClose",
                                "Bloquer le clic extérieur",
                            ],
                            ["preventEscapeClose", "Bloquer la touche Échap"],
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
                                            key as keyof PlaygroundState,
                                            event.target.checked as never,
                                        )
                                    }
                                />
                                {label}
                            </label>
                        ))}
                    </fieldset>
                </form>

                <div className={styles.output}>
                    <div className={styles.preview}>
                        <span className={styles.outputLabel}>Aperçu</span>

                        <div className={styles.canvas}>
                            <LRZDialog>
                                <LRZDialogTrigger asChild>
                                    <button
                                        className={styles.openButton}
                                        type="button"
                                    >
                                        Ouvrir le dialogue
                                    </button>
                                </LRZDialogTrigger>

                                <LRZDialogContent
                                    color={values.color}
                                    size={values.size}
                                    placement={values.placement}
                                    scrollMode={values.scrollMode}
                                    variant={values.variant}
                                    padding={values.padding}
                                    showCloseButton={values.showCloseButton}
                                    preventOutsideClose={
                                        values.preventOutsideClose
                                    }
                                    preventEscapeClose={
                                        values.preventEscapeClose
                                    }
                                    stickyHeader={values.stickyHeader}
                                    stickyFooter={values.stickyFooter}
                                >
                                    <LRZDialogHeader
                                        eyebrow={values.eyebrow}
                                        title={values.title}
                                        description={values.description}
                                        icon={
                                            values.showIcon ? (
                                                <Castle />
                                            ) : undefined
                                        }
                                        metadata={
                                            <span className={styles.location}>
                                                <MapPin aria-hidden="true" />
                                                Chambord
                                            </span>
                                        }
                                    />

                                    <LRZDialogBody>
                                        <p>{values.content}</p>

                                        <div className={styles.demoContent}>
                                            {Array.from({ length: 4 }).map(
                                                (_, index) => (
                                                    <article key={index}>
                                                        <strong>
                                                            Étape {index + 1}
                                                        </strong>
                                                        <p>
                                                            Un bloc de contenu
                                                            permet de vérifier
                                                            le comportement du
                                                            scroll et des zones
                                                            fixes.
                                                        </p>
                                                    </article>
                                                ),
                                            )}
                                        </div>
                                    </LRZDialogBody>

                                    {values.showFooter ? (
                                        <LRZDialogFooter
                                            align={values.footerAlign}
                                            divided
                                            sticky={values.stickyFooter}
                                        >
                                            <LRZDialogClose>
                                                Fermer
                                            </LRZDialogClose>
                                            <button type="button">
                                                Voir sur la carte
                                            </button>
                                        </LRZDialogFooter>
                                    ) : null}
                                </LRZDialogContent>
                            </LRZDialog>
                        </div>
                    </div>

                    <div className={styles.codePanel}>
                        <span className={styles.outputLabel}>Code généré</span>
                        <pre>
                            <code>{code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
