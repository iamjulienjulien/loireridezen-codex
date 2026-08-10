"use client";

import { useState } from "react";
import {
    Bike,
    Bird,
    Castle,
    Landmark,
    Leaf,
    Map,
    Music,
    Sparkles,
    Trees,
    UtensilsCrossed,
    Waves,
    Wine,
    type LucideIcon,
} from "lucide-react";

import {
    LRZMapMarker,
    type LRZMapMarkerSize,
    type LRZMapMarkerTone,
    type LRZMapMarkerVariant,
} from "@/components/LRZMapMarker";
import { LRZ_COLOR_LABELS, LRZ_COLOR_NAMES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZMapMarkerPlayground.module.css";

const SYMBOL_PRESETS = [
    { value: "none", label: "Aucun — point central" },
    { value: "castle", label: "Château", icon: Castle, code: "Castle" },
    {
        value: "guinguette",
        label: "Guinguette · restauration",
        icon: UtensilsCrossed,
        code: "UtensilsCrossed",
    },
    { value: "faune", label: "Faune", icon: Bird, code: "Bird" },
    { value: "flore", label: "Flore", icon: Leaf, code: "Leaf" },
    { value: "vignoble", label: "Vignoble", icon: Wine, code: "Wine" },
    {
        value: "patrimoine",
        label: "Patrimoine",
        icon: Landmark,
        code: "Landmark",
    },
    { value: "territoire", label: "Territoire", icon: Map, code: "Map" },
    { value: "fleuve", label: "Fleuve", icon: Waves, code: "Waves" },
    { value: "velo", label: "Vélo · itinéraire", icon: Bike, code: "Bike" },
    {
        value: "evenement",
        label: "Musique · événement",
        icon: Music,
        code: "Music",
    },
    { value: "nature", label: "Nature · forêt", icon: Trees, code: "Trees" },
    {
        value: "remarquable",
        label: "Point remarquable",
        icon: Sparkles,
        code: "Sparkles",
    },
    { value: "custom", label: "Personnalisé" },
] as const satisfies ReadonlyArray<{
    value: string;
    label: string;
    icon?: LucideIcon;
    code?: string;
}>;

type MarkerSymbolPreset = (typeof SYMBOL_PRESETS)[number]["value"];

type PlaygroundState = {
    label: string;
    description: string;
    variant: LRZMapMarkerVariant;
    tone: LRZMapMarkerTone;
    size: LRZMapMarkerSize;
    color: LRZColor;
    symbolPreset: MarkerSymbolPreset;
    symbol: string;
    symbolScale: number;
    mediaUrl: string;
    badge: string;
    showLabel: boolean;
    active: boolean;
    selected: boolean;
    pulse: boolean;
};

const INITIAL_STATE: PlaygroundState = {
    label: "Château de Chambord",
    description: "Loir-et-Cher · Renaissance",
    variant: "pin",
    tone: "solid",
    size: "lg",
    color: "bleu",
    symbolPreset: "none",
    symbol: "✦",
    symbolScale: 1,
    mediaUrl: "/illustrations/chateaux/chateau-de-chambord/jour@2x.png",
    badge: "",
    showLabel: false,
    active: false,
    selected: false,
    pulse: false,
};

const VARIANTS: readonly LRZMapMarkerVariant[] = [
    "pin",
    "dot",
    "badge",
    "square",
    "diamond",
    "hexagon",
    "shield",
    "star",
    "image",
];
const TONES: readonly LRZMapMarkerTone[] = ["solid", "soft", "outline"];
const SIZES: readonly LRZMapMarkerSize[] = ["xs", "sm", "md", "lg", "xl"];

const code = (values: PlaygroundState) => {
    const symbolPreset = SYMBOL_PRESETS.find(
        (preset) => preset.value === values.symbolPreset,
    );
    const symbolCode =
        symbolPreset && "code" in symbolPreset ? symbolPreset.code : undefined;
    const props = [
        `label="${values.label}"`,
        values.description && `description="${values.description}"`,
        `variant="${values.variant}"`,
        `tone="${values.tone}"`,
        `size="${values.size}"`,
        `color="${values.color}"`,
        symbolCode && `symbol={<${symbolCode} aria-hidden />}`,
        values.symbolPreset === "custom" &&
            values.symbol &&
            `symbol="${values.symbol}"`,
        `symbolScale={${values.symbolScale.toFixed(2)}}`,
        values.mediaUrl &&
            values.variant === "image" &&
            `media={<img src="${values.mediaUrl}" alt="" />}`,
        values.badge && `badge="${values.badge}"`,
        values.showLabel && "showLabel",
        values.active && "active",
        values.selected && "selected",
        values.pulse && "pulse",
    ]
        .filter(Boolean)
        .join(" ");

    return `<LRZMapMarker ${props} />`;
};

export default function LRZMapMarkerPlayground() {
    const [values, setValues] = useState(INITIAL_STATE);
    const update = <K extends keyof PlaygroundState>(
        key: K,
        value: PlaygroundState[K],
    ) => setValues((current) => ({ ...current, [key]: value }));
    const symbolPreset = SYMBOL_PRESETS.find(
        (preset) => preset.value === values.symbolPreset,
    );
    const SymbolIcon =
        symbolPreset && "icon" in symbolPreset ? symbolPreset.icon : undefined;
    const markerSymbol = SymbolIcon ? (
        <SymbolIcon aria-hidden />
    ) : values.symbolPreset === "custom" ? (
        values.symbol || undefined
    ) : undefined;

    return (
        <section
            className={styles.playground}
            aria-labelledby="marker-playground"
        >
            <header className={styles.header}>
                <div>
                    <p className={styles.kicker}>Bac à sable interactif</p>
                    <h2 id="marker-playground">Composer un repère de carte</h2>
                    <p>
                        Testez silhouette, surface, couleur, contenu et états
                        d’interaction avant de l’utiliser dans une carte.
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
                <div className={styles.controls}>
                    <label className={styles.control}>
                        <span>Label accessible</span>
                        <input
                            value={values.label}
                            onChange={(event) =>
                                update("label", event.target.value)
                            }
                        />
                    </label>
                    <label className={styles.control}>
                        <span>Description</span>
                        <input
                            value={values.description}
                            onChange={(event) =>
                                update("description", event.target.value)
                            }
                        />
                    </label>
                    <label className={styles.control}>
                        <span>Variante</span>
                        <select
                            value={values.variant}
                            onChange={(event) =>
                                update(
                                    "variant",
                                    event.target.value as LRZMapMarkerVariant,
                                )
                            }
                        >
                            {VARIANTS.map((variant) => (
                                <option key={variant}>{variant}</option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.control}>
                        <span>Surface</span>
                        <select
                            value={values.tone}
                            onChange={(event) =>
                                update(
                                    "tone",
                                    event.target.value as LRZMapMarkerTone,
                                )
                            }
                        >
                            {TONES.map((tone) => (
                                <option key={tone}>{tone}</option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.control}>
                        <span>Taille</span>
                        <select
                            value={values.size}
                            onChange={(event) =>
                                update(
                                    "size",
                                    event.target.value as LRZMapMarkerSize,
                                )
                            }
                        >
                            {SIZES.map((size) => (
                                <option key={size}>{size}</option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.control}>
                        <span>Couleur LRZ</span>
                        <select
                            value={values.color}
                            onChange={(event) =>
                                update("color", event.target.value as LRZColor)
                            }
                        >
                            {LRZ_COLOR_NAMES.map((color) => (
                                <option key={color} value={color}>
                                    {LRZ_COLOR_LABELS[color]}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.control}>
                        <span>Symbole</span>
                        <div className={styles.symbolSelector}>
                            <span
                                className={styles.symbolPreview}
                                aria-hidden="true"
                            >
                                {SymbolIcon ? (
                                    <SymbolIcon />
                                ) : values.symbolPreset === "custom" ? (
                                    values.symbol || "…"
                                ) : (
                                    "●"
                                )}
                            </span>
                            <select
                                value={values.symbolPreset}
                                onChange={(event) =>
                                    update(
                                        "symbolPreset",
                                        event.target
                                            .value as MarkerSymbolPreset,
                                    )
                                }
                            >
                                {SYMBOL_PRESETS.map((preset) => (
                                    <option
                                        key={preset.value}
                                        value={preset.value}
                                    >
                                        {preset.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>
                    {values.symbolPreset === "custom" ? (
                        <label className={styles.control}>
                            <span>Symbole personnalisé</span>
                            <input
                                placeholder="Texte, emoji…"
                                value={values.symbol}
                                onChange={(event) =>
                                    update("symbol", event.target.value)
                                }
                            />
                        </label>
                    ) : null}
                    <label className={styles.control}>
                        <span>
                            Échelle du symbole · {values.symbolScale.toFixed(2)}
                        </span>
                        <input
                            type="range"
                            min="0.5"
                            max="1.4"
                            step="0.05"
                            value={values.symbolScale}
                            onChange={(event) =>
                                update(
                                    "symbolScale",
                                    Number(event.target.value),
                                )
                            }
                        />
                    </label>
                    <label className={styles.control}>
                        <span>Média (URL)</span>
                        <input
                            value={values.mediaUrl}
                            onChange={(event) =>
                                update("mediaUrl", event.target.value)
                            }
                        />
                    </label>
                    <label className={styles.control}>
                        <span>Badge</span>
                        <input
                            placeholder="ex. 12"
                            value={values.badge}
                            onChange={(event) =>
                                update("badge", event.target.value)
                            }
                        />
                    </label>
                    {[
                        ["showLabel", "Afficher le label"],
                        ["active", "État actif"],
                        ["selected", "État sélectionné"],
                        ["pulse", "Halo animé"],
                    ].map(([key, label]) => (
                        <label className={styles.toggle} key={key}>
                            <input
                                type="checkbox"
                                checked={
                                    values[
                                        key as keyof PlaygroundState
                                    ] as boolean
                                }
                                onChange={(event) =>
                                    update(
                                        key as keyof PlaygroundState,
                                        event.target.checked as never,
                                    )
                                }
                            />
                            {label}
                        </label>
                    ))}
                </div>

                <div className={styles.output}>
                    <div className={styles.canvas}>
                        <LRZMapMarker
                            label={values.label}
                            description={values.description}
                            variant={values.variant}
                            tone={values.tone}
                            size={values.size}
                            color={values.color}
                            symbol={markerSymbol}
                            symbolScale={values.symbolScale}
                            badge={values.badge || undefined}
                            showLabel={values.showLabel}
                            active={values.active}
                            selected={values.selected}
                            pulse={values.pulse}
                            media={
                                values.variant === "image" &&
                                values.mediaUrl ? (
                                    <img src={values.mediaUrl} alt="" />
                                ) : undefined
                            }
                        />
                    </div>
                    <pre className={styles.code}>
                        <code>{code(values)}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}
