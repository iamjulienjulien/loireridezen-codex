"use client";

import { useState } from "react";
import {
    Bike,
    Castle,
    Leaf,
    MapPin,
    Sparkles,
    Waves,
    type LucideIcon,
} from "lucide-react";
import LRZBadge, {
    type LRZBadgeDetail,
    type LRZBadgeIcon,
    type LRZBadgePreset,
    type LRZBadgeVariant,
    type LRZChateauRenommeeValue,
    type LRZChateauVisiteValue,
    type LRZExtinctionValue,
    type LRZFloreProtectionValue,
    type LRZIndigenatValue,
    type LRZMonumentHistoriqueValue,
    type LRZRareteValue,
} from "@/components/_ui/LRZBadge/LRZBadge";
import { LRZ_COLOR_NAMES, LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZBadgePlayground.module.css";

type PlaygroundPreset = LRZBadgePreset | "generic";
type BooleanOverride = "" | "true" | "false";
type PlaygroundIcon =
    | ""
    | "none"
    | "bike"
    | "castle"
    | "leaf"
    | "map-pin"
    | "sparkles"
    | "waves"
    | "emoji";

type PlaygroundState = {
    preset: PlaygroundPreset;
    value: string;
    label: string;
    detail: string;
    hideDetail: boolean;
    color: LRZColor | "";
    icon: PlaygroundIcon;
    variant: LRZBadgeVariant | "";
    dashed: BooleanOverride;
    gradient: BooleanOverride;
    title: string;
    className: string;
};

const ICON_OPTIONS: {
    value: Exclude<PlaygroundIcon, "" | "none" | "emoji">;
    label: string;
    componentName: string;
    Icon: LucideIcon;
}[] = [
    { value: "bike", label: "Bike · vélo", componentName: "Bike", Icon: Bike },
    {
        value: "castle",
        label: "Castle · château",
        componentName: "Castle",
        Icon: Castle,
    },
    {
        value: "leaf",
        label: "Leaf · feuille",
        componentName: "Leaf",
        Icon: Leaf,
    },
    {
        value: "map-pin",
        label: "MapPin · position",
        componentName: "MapPin",
        Icon: MapPin,
    },
    {
        value: "sparkles",
        label: "Sparkles · éclat",
        componentName: "Sparkles",
        Icon: Sparkles,
    },
    {
        value: "waves",
        label: "Waves · Loire",
        componentName: "Waves",
        Icon: Waves,
    },
];

const VARIANT_OPTIONS: { value: LRZBadgeVariant; label: string }[] = [
    { value: "default", label: "Default · essentiel" },
    { value: "pill", label: "Pill · capsule" },
    { value: "leaf", label: "Leaf · végétal" },
    { value: "shield", label: "Shield · sceau" },
    { value: "plaque", label: "Plaque · patrimoine" },
    { value: "medallion", label: "Medallion · médaillon" },
    { value: "trail", label: "Trail · piste" },
    { value: "herbarium", label: "Herbarium · herbier" },
    { value: "crest", label: "Crest · blason" },
    { value: "ticket", label: "Ticket · billet" },
];

type PresetOption = {
    value: PlaygroundPreset;
    label: string;
    values: { value: string; label: string }[];
};

const PRESET_OPTIONS: PresetOption[] = [
    {
        value: "generic",
        label: "Générique",
        values: [],
    },
    {
        value: "extinction-faune",
        label: "Statut d’extinction · Faune",
        values: [
            { value: "LC", label: "LC · Préoccupation mineure" },
            { value: "NT", label: "NT · Quasi menacé" },
            { value: "VU", label: "VU · Vulnérable" },
            { value: "EN", label: "EN · En danger" },
            { value: "CR", label: "CR · En danger critique" },
            { value: "NA", label: "NA · Non applicable" },
        ],
    },
    {
        value: "indigenat-flore",
        label: "Indigénat · Flore",
        values: [
            { value: "indigène", label: "Indigène" },
            { value: "exotique", label: "Exotique" },
            { value: "envahissante", label: "Envahissante" },
        ],
    },
    {
        value: "protection-flore",
        label: "Protection · Flore",
        values: [
            { value: "nationale", label: "Nationale" },
            { value: "régionale", label: "Régionale" },
            { value: "aucune", label: "Aucune" },
        ],
    },
    {
        value: "monument-historique-chateau",
        label: "Monument historique · Châteaux",
        values: [
            { value: "classé", label: "Classé" },
            { value: "inscrit", label: "Inscrit" },
            { value: "aucune", label: "Aucune protection" },
        ],
    },
    {
        value: "unesco-chateau",
        label: "UNESCO · Châteaux",
        values: [
            { value: "oui", label: "Dans le périmètre" },
            { value: "non", label: "Hors périmètre" },
        ],
    },
    {
        value: "rarete-faune",
        label: "Rareté · Faune",
        values: [
            { value: "commun", label: "Commun" },
            { value: "régulier", label: "Régulier" },
            { value: "rare", label: "Rare" },
            { value: "trésor", label: "Trésor" },
        ],
    },
    {
        value: "rarete-flore",
        label: "Rareté · Flore",
        values: [
            { value: "commun", label: "Commune" },
            { value: "régulier", label: "Régulière" },
            { value: "rare", label: "Rare" },
            { value: "trésor", label: "Trésor" },
        ],
    },
    {
        value: "renommee-chateau",
        label: "Renommée · Châteaux",
        values: [
            { value: "phare", label: "Phare" },
            { value: "majeur", label: "Majeur" },
            { value: "notable", label: "Notable" },
            { value: "confidentiel", label: "Confidentiel" },
        ],
    },
    {
        value: "visite-chateau",
        label: "Visite · Châteaux",
        values: [
            { value: "ouvert au public", label: "Ouvert au public" },
            { value: "extérieurs & parc", label: "Extérieurs & parc" },
            {
                value: "privé, non visitable",
                label: "Privé, non visitable",
            },
            { value: "inconnu", label: "Inconnu" },
        ],
    },
];

const INITIAL_STATE: PlaygroundState = {
    preset: "extinction-faune",
    value: "LC",
    label: "",
    detail: "",
    hideDetail: false,
    color: "",
    icon: "",
    variant: "",
    dashed: "",
    gradient: "",
    title: "",
    className: "",
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

const escapeAttribute = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

function getPresetOption(preset: PlaygroundPreset) {
    return (
        PRESET_OPTIONS.find((option) => option.value === preset) ??
        PRESET_OPTIONS[0]
    );
}

function getIconOption(icon: PlaygroundIcon) {
    return ICON_OPTIONS.find((option) => option.value === icon);
}

function playgroundCode(values: PlaygroundState) {
    const props =
        values.preset === "generic"
            ? [`label="${escapeAttribute(values.label || "Mon badge")}"`]
            : [
                  `preset="${values.preset}"`,
                  values.preset === "unesco-chateau"
                      ? `value={${values.value === "oui"}}`
                      : `value="${escapeAttribute(values.value)}"`,
              ];

    props.push(
        ...(values.preset !== "generic" && values.label
            ? [`label="${escapeAttribute(values.label)}"`]
            : []),
        ...(values.hideDetail
            ? ["detail={false}"]
            : values.detail
              ? [`detail="${escapeAttribute(values.detail)}"`]
              : []),
        ...(values.color ? [`color="${values.color}"`] : []),
        ...(values.icon === "none"
            ? ["icon={false}"]
            : values.icon === "emoji"
              ? ['icon="🌊"']
              : values.icon
                ? [
                      `icon={<${getIconOption(values.icon)?.componentName ?? "Bike"} />}`,
                  ]
                : []),
        ...(values.variant ? [`variant="${values.variant}"`] : []),
        ...(values.dashed ? [`dashed={${values.dashed}}`] : []),
        ...(values.gradient ? [`gradient={${values.gradient}}`] : []),
        ...(values.title ? [`title="${escapeAttribute(values.title)}"`] : []),
        ...(values.className
            ? [`className="${escapeAttribute(values.className)}"`]
            : []),
    );

    return `<LRZBadge\n    ${props.join("\n    ")}\n/>`;
}

function BadgePreview({ values }: { values: PlaygroundState }) {
    const detail: LRZBadgeDetail | undefined = values.hideDetail
        ? false
        : values.detail || undefined;
    const iconOption = getIconOption(values.icon);
    const CustomIcon = iconOption?.Icon;
    const icon: LRZBadgeIcon | undefined =
        values.icon === "none" ? (
            false
        ) : values.icon === "emoji" ? (
            "🌊"
        ) : CustomIcon ? (
            <CustomIcon />
        ) : undefined;
    const shared = {
        label: values.label || undefined,
        detail,
        color: values.color || undefined,
        icon,
        variant: values.variant || undefined,
        dashed: values.dashed ? values.dashed === "true" : undefined,
        gradient: values.gradient ? values.gradient === "true" : undefined,
        title: values.title || undefined,
        className: values.className || undefined,
    };

    switch (values.preset) {
        case "extinction-faune":
            return (
                <LRZBadge
                    {...shared}
                    preset="extinction-faune"
                    value={values.value as LRZExtinctionValue}
                />
            );
        case "indigenat-flore":
            return (
                <LRZBadge
                    {...shared}
                    preset="indigenat-flore"
                    value={values.value as LRZIndigenatValue}
                />
            );
        case "protection-flore":
            return (
                <LRZBadge
                    {...shared}
                    preset="protection-flore"
                    value={values.value as LRZFloreProtectionValue}
                />
            );
        case "monument-historique-chateau":
            return (
                <LRZBadge
                    {...shared}
                    preset="monument-historique-chateau"
                    value={values.value as LRZMonumentHistoriqueValue}
                />
            );
        case "unesco-chateau":
            return (
                <LRZBadge
                    {...shared}
                    preset="unesco-chateau"
                    value={values.value === "oui"}
                />
            );
        case "rarete-faune":
            return (
                <LRZBadge
                    {...shared}
                    preset="rarete-faune"
                    value={values.value as LRZRareteValue}
                />
            );
        case "rarete-flore":
            return (
                <LRZBadge
                    {...shared}
                    preset="rarete-flore"
                    value={values.value as LRZRareteValue}
                />
            );
        case "renommee-chateau":
            return (
                <LRZBadge
                    {...shared}
                    preset="renommee-chateau"
                    value={values.value as LRZChateauRenommeeValue}
                />
            );
        case "visite-chateau":
            return (
                <LRZBadge
                    {...shared}
                    preset="visite-chateau"
                    value={values.value as LRZChateauVisiteValue}
                />
            );
        default:
            return <LRZBadge {...shared} label={values.label || "Mon badge"} />;
    }
}

export default function LRZBadgePlayground() {
    const [values, setValues] = useState<PlaygroundState>(INITIAL_STATE);
    const activePreset = getPresetOption(values.preset);

    const updateValue = <Key extends keyof PlaygroundState>(
        key: Key,
        value: PlaygroundState[Key],
    ) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const selectPreset = (preset: PlaygroundPreset) => {
        const option = getPresetOption(preset);
        setValues((current) => ({
            ...current,
            preset,
            value: option.values[0]?.value ?? "",
            label: preset === "generic" ? "Mon badge" : "",
            detail: "",
            hideDetail: false,
            color: "",
            icon: "",
            variant: "",
            dashed: "",
            gradient: "",
            title: "",
        }));
    };

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
                        Explorez les identités métier, puis surchargez leurs
                        textes ou leur couleur pour tester les cas limites.
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
                    <label className={styles.control} htmlFor="badge-preset">
                        <span>preset</span>
                        <select
                            id="badge-preset"
                            value={values.preset}
                            onChange={(event) =>
                                selectPreset(
                                    event.target.value as PlaygroundPreset,
                                )
                            }
                        >
                            {PRESET_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    {activePreset.values.length > 0 ? (
                        <label className={styles.control} htmlFor="badge-value">
                            <span>value</span>
                            <select
                                id="badge-value"
                                value={values.value}
                                onChange={(event) =>
                                    updateValue("value", event.target.value)
                                }
                            >
                                {activePreset.values.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ) : null}

                    <label className={styles.control} htmlFor="badge-variant">
                        <span>
                            variant <strong>surcharge facultative</strong>
                        </span>
                        <select
                            id="badge-variant"
                            value={values.variant}
                            onChange={(event) =>
                                updateValue(
                                    "variant",
                                    event.target.value as LRZBadgeVariant | "",
                                )
                            }
                        >
                            <option value="">
                                {values.preset === "generic"
                                    ? "Défaut — default"
                                    : "Variante du preset"}
                            </option>
                            {VARIANT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.control} htmlFor="badge-icon">
                        <span>
                            icon <strong>surcharge facultative</strong>
                        </span>
                        <select
                            id="badge-icon"
                            value={values.icon}
                            onChange={(event) =>
                                updateValue(
                                    "icon",
                                    event.target.value as PlaygroundIcon,
                                )
                            }
                        >
                            <option value="">
                                {values.preset === "generic"
                                    ? "Automatique — point"
                                    : "Icône du preset"}
                            </option>
                            <option value="none">false · aucune icône</option>
                            {ICON_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                            <option value="emoji">Emoji · 🌊</option>
                        </select>
                    </label>

                    <label className={styles.control} htmlFor="badge-dashed">
                        <span>
                            dashed <strong>surcharge facultative</strong>
                        </span>
                        <select
                            id="badge-dashed"
                            value={values.dashed}
                            onChange={(event) =>
                                updateValue(
                                    "dashed",
                                    event.target.value as BooleanOverride,
                                )
                            }
                        >
                            <option value="">Automatique</option>
                            <option value="true">true · pointillés</option>
                            <option value="false">false · trait plein</option>
                        </select>
                    </label>

                    <label className={styles.control} htmlFor="badge-gradient">
                        <span>
                            gradient <strong>surcharge facultative</strong>
                        </span>
                        <select
                            id="badge-gradient"
                            value={values.gradient}
                            onChange={(event) =>
                                updateValue(
                                    "gradient",
                                    event.target.value as BooleanOverride,
                                )
                            }
                        >
                            <option value="">
                                {values.preset === "generic"
                                    ? "Automatique — sans"
                                    : "Automatique — actif"}
                            </option>
                            <option value="true">true · avec dégradé</option>
                            <option value="false">false · fond uni</option>
                        </select>
                    </label>

                    <label className={styles.control} htmlFor="badge-label">
                        <span>
                            label{" "}
                            <strong>
                                {values.preset === "generic"
                                    ? "requis"
                                    : "surcharge facultative"}
                            </strong>
                        </span>
                        <input
                            id="badge-label"
                            value={values.label}
                            placeholder={
                                values.preset === "generic"
                                    ? "Mon badge"
                                    : "Libellé fourni par le preset"
                            }
                            onChange={(event) =>
                                updateValue("label", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.control} htmlFor="badge-detail">
                        <span>
                            detail <strong>surcharge facultative</strong>
                        </span>
                        <input
                            id="badge-detail"
                            value={values.detail}
                            placeholder="Détail fourni par le preset"
                            onChange={(event) =>
                                updateValue("detail", event.target.value)
                            }
                        />
                    </label>

                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={values.hideDetail}
                            onChange={(event) =>
                                updateValue("hideDetail", event.target.checked)
                            }
                        />
                        <span>
                            Masquer le détail du preset
                            <small>
                                Génère <code>detail={"{false}"}</code>
                            </small>
                        </span>
                    </label>

                    <label className={styles.control} htmlFor="badge-color">
                        <span>
                            color <strong>surcharge facultative</strong>
                        </span>
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
                            <option value="">
                                {values.preset === "generic"
                                    ? "Défaut — galet"
                                    : "Couleur du preset"}
                            </option>
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
                            placeholder="Infobulle fournie par le preset"
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
                            <BadgePreview values={values} />
                        </div>
                        <p className={styles.overrideNotice}>
                            {values.preset === "generic" ? (
                                "Mode générique, sans identité métier."
                            ) : (
                                <>
                                    Identité{" "}
                                    <code>
                                        {activePreset.label.toLocaleLowerCase(
                                            "fr-FR",
                                        )}
                                    </code>
                                    {values.color
                                        ? ` avec la couleur ${values.color} en surcharge.`
                                        : " dans sa palette recommandée."}
                                </>
                            )}
                        </p>
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
