import type { CSSProperties, ReactNode } from "react";
import {
    Biohazard,
    Binoculars,
    Castle,
    CircleAlert,
    CircleCheck,
    CircleMinus,
    CircleHelp,
    Crown,
    Feather,
    Flower2,
    Footprints,
    Gem,
    Globe2,
    KeyRound,
    Landmark,
    Leaf,
    LockKeyhole,
    PawPrint,
    Plane,
    ScrollText,
    Shield,
    ShieldCheck,
    ShieldOff,
    Siren,
    Skull,
    Sparkles,
    Sprout,
    TicketCheck,
    Trees,
    TriangleAlert,
    type LucideIcon,
} from "lucide-react";
import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";
import styles from "./LRZBadge.module.css";

export type LRZBadgePreset =
    | "extinction-faune"
    | "indigenat-flore"
    | "protection-flore"
    | "monument-historique-chateau"
    | "unesco-chateau"
    | "rarete-faune"
    | "rarete-flore"
    | "renommee-chateau"
    | "visite-chateau";

export type LRZBadgeVariant =
    | "default"
    | "pill"
    | "leaf"
    | "shield"
    | "plaque"
    | "medallion"
    | "trail"
    | "herbarium"
    | "crest"
    | "ticket";

export type LRZExtinctionValue = "LC" | "NT" | "VU" | "EN" | "CR" | "NA";
export type LRZIndigenatValue = "indigène" | "exotique" | "envahissante";
export type LRZFloreProtectionValue = "nationale" | "régionale" | "aucune";
export type LRZMonumentHistoriqueValue = "classé" | "inscrit" | "aucune";
export type LRZRareteValue = "commun" | "régulier" | "rare" | "trésor";
export type LRZChateauRenommeeValue =
    "phare" | "majeur" | "notable" | "confidentiel";
export type LRZChateauVisiteValue =
    | "ouvert au public"
    | "extérieurs & parc"
    | "privé, non visitable"
    | "inconnu";

export type LRZBadgeDetail = Exclude<ReactNode, boolean> | false;
export type LRZBadgeIcon = Exclude<ReactNode, boolean> | false;

type SharedBadgeProps = {
    /** Remplace le libellé fourni par le preset. */
    label?: ReactNode;
    /** Remplace le détail fourni par le preset. */
    detail?: LRZBadgeDetail;
    /** Remplace la couleur fournie par le preset. */
    color?: LRZColor;
    /** Remplace l’icône du preset. Utiliser false pour la masquer. */
    icon?: LRZBadgeIcon;
    /** Forme visuelle du badge, indépendante de son éventuel preset métier. */
    variant?: LRZBadgeVariant;
    /** Force ou retire une bordure en pointillés. */
    dashed?: boolean;
    /** Active ou désactive le dégradé associé à la variante. */
    gradient?: boolean;
    /** Infobulle native facultative. */
    title?: string;
    /** Classe additionnelle pour le placement dans un composant parent. */
    className?: string;
};

type GenericBadgeProps = SharedBadgeProps & {
    preset?: never;
    value?: never;
    /** Texte principal du badge, par exemple « Étape 1 ». */
    label: ReactNode;
};

type PresetBadgeProps =
    | (SharedBadgeProps & {
          preset: "extinction-faune";
          value: LRZExtinctionValue;
      })
    | (SharedBadgeProps & {
          preset: "indigenat-flore";
          value: LRZIndigenatValue;
      })
    | (SharedBadgeProps & {
          preset: "protection-flore";
          value: LRZFloreProtectionValue;
      })
    | (SharedBadgeProps & {
          preset: "monument-historique-chateau";
          value: LRZMonumentHistoriqueValue;
      })
    | (SharedBadgeProps & {
          preset: "unesco-chateau";
          value: boolean;
      })
    | (SharedBadgeProps & {
          preset: "rarete-faune";
          value: LRZRareteValue;
      })
    | (SharedBadgeProps & {
          preset: "rarete-flore";
          value: LRZRareteValue;
      })
    | (SharedBadgeProps & {
          preset: "renommee-chateau";
          value: LRZChateauRenommeeValue;
      })
    | (SharedBadgeProps & {
          preset: "visite-chateau";
          value: LRZChateauVisiteValue;
      });

export type LRZBadgeProps = GenericBadgeProps | PresetBadgeProps;

type PresetDefinition = {
    label: string;
    detail?: string;
    title: string;
    color: LRZColor;
    icon: LucideIcon;
};

const PRESET_VARIANTS: Record<LRZBadgePreset, LRZBadgeVariant> = {
    "extinction-faune": "pill",
    "indigenat-flore": "leaf",
    "protection-flore": "shield",
    "monument-historique-chateau": "plaque",
    "unesco-chateau": "medallion",
    "rarete-faune": "trail",
    "rarete-flore": "herbarium",
    "renommee-chateau": "crest",
    "visite-chateau": "ticket",
};

const EXTINCTION_PRESET: Record<LRZExtinctionValue, PresetDefinition> = {
    LC: {
        label: "LC",
        detail: "Préoccupation mineure",
        title: "UICN · Préoccupation mineure",
        color: "vert-metallise",
        icon: CircleCheck,
    },
    NT: {
        label: "NT",
        detail: "Quasi menacé",
        title: "UICN · Quasi menacé",
        color: "ocre",
        icon: CircleAlert,
    },
    VU: {
        label: "VU",
        detail: "Vulnérable",
        title: "UICN · Vulnérable",
        color: "orange",
        icon: TriangleAlert,
    },
    EN: {
        label: "EN",
        detail: "En danger",
        title: "UICN · En danger",
        color: "orange-cuivre",
        icon: Siren,
    },
    CR: {
        label: "CR",
        detail: "En danger critique",
        title: "UICN · En danger critique",
        color: "rouge",
        icon: Skull,
    },
    NA: {
        label: "NA",
        detail: "Non applicable",
        title: "UICN · Non applicable",
        color: "galet",
        icon: CircleMinus,
    },
};

const INDIGENAT_PRESET: Record<LRZIndigenatValue, PresetDefinition> = {
    indigène: {
        label: "Indigène",
        title: "Flore indigène du territoire ligérien",
        color: "vert-metallise",
        icon: Sprout,
    },
    exotique: {
        label: "Exotique",
        detail: "introduite",
        title: "Flore exotique introduite",
        color: "bleu-gris",
        icon: Plane,
    },
    envahissante: {
        label: "Envahissante",
        detail: "à surveiller",
        title: "Espèce exotique envahissante",
        color: "orange-cuivre",
        icon: Biohazard,
    },
};

const FLORE_PROTECTION_PRESET: Record<
    LRZFloreProtectionValue,
    PresetDefinition
> = {
    nationale: {
        label: "Nationale",
        detail: "protégée",
        title: "Protection botanique nationale",
        color: "gris-ardoise",
        icon: ShieldCheck,
    },
    régionale: {
        label: "Régionale",
        detail: "protégée",
        title: "Protection botanique régionale",
        color: "bleu-gris",
        icon: Shield,
    },
    aucune: {
        label: "Non protégée",
        title: "Aucune protection botanique",
        color: "galet",
        icon: ShieldOff,
    },
};

const MONUMENT_PRESET: Record<LRZMonumentHistoriqueValue, PresetDefinition> = {
    classé: {
        label: "Classé",
        detail: "Monument historique",
        title: "Classé au titre des Monuments historiques",
        color: "vert-metallise",
        icon: Landmark,
    },
    inscrit: {
        label: "Inscrit",
        detail: "Monument historique",
        title: "Inscrit au titre des Monuments historiques",
        color: "ocre",
        icon: ScrollText,
    },
    aucune: {
        label: "Non protégé",
        title: "Non protégé au titre des Monuments historiques",
        color: "pierre",
        icon: CircleMinus,
    },
};

const UNESCO_PRESET: Record<"oui" | "non", PresetDefinition> = {
    oui: {
        label: "UNESCO",
        detail: "Val de Loire",
        title: "Dans le périmètre du Val de Loire inscrit à l’UNESCO",
        color: "bleu-metallise",
        icon: Globe2,
    },
    non: {
        label: "UNESCO",
        detail: "Hors périmètre",
        title: "Hors du périmètre du Val de Loire inscrit à l’UNESCO",
        color: "galet",
        icon: CircleMinus,
    },
};

const FAUNE_RARETE_PRESET: Record<LRZRareteValue, PresetDefinition> = {
    commun: {
        label: "Commun",
        detail: "facile à croiser",
        title: "Faune commune sur le parcours",
        color: "gris-brun",
        icon: PawPrint,
    },
    régulier: {
        label: "Régulier",
        detail: "présence familière",
        title: "Faune régulièrement observée",
        color: "bleu-gris",
        icon: Footprints,
    },
    rare: {
        label: "Rare",
        detail: "ouvrez l’œil",
        title: "Observation rare",
        color: "ocre",
        icon: Binoculars,
    },
    trésor: {
        label: "Trésor",
        detail: "rencontre d’exception",
        title: "Trésor de la faune ligérienne",
        color: "soleil",
        icon: Sparkles,
    },
};

const FLORE_RARETE_PRESET: Record<LRZRareteValue, PresetDefinition> = {
    commun: {
        label: "Commune",
        detail: "du paysage",
        title: "Flore commune du territoire",
        color: "prairie",
        icon: Leaf,
    },
    régulier: {
        label: "Régulière",
        detail: "bien implantée",
        title: "Flore régulièrement rencontrée",
        color: "vert-olive",
        icon: Sprout,
    },
    rare: {
        label: "Rare",
        detail: "à préserver",
        title: "Flore rare du territoire ligérien",
        color: "coucher",
        icon: Flower2,
    },
    trésor: {
        label: "Trésor",
        detail: "joyau botanique",
        title: "Trésor botanique ligérien",
        color: "soleil",
        icon: Gem,
    },
};

const CHATEAU_RENOMMEE_PRESET: Record<
    LRZChateauRenommeeValue,
    PresetDefinition
> = {
    phare: {
        label: "Phare",
        detail: "incontournable",
        title: "Château phare du Val de Loire",
        color: "soleil",
        icon: Crown,
    },
    majeur: {
        label: "Majeur",
        detail: "grande signature",
        title: "Château majeur du Val de Loire",
        color: "brique",
        icon: Castle,
    },
    notable: {
        label: "Notable",
        detail: "remarquable",
        title: "Château notable du Val de Loire",
        color: "ocre",
        icon: Feather,
    },
    confidentiel: {
        label: "Confidentiel",
        detail: "secret de Loire",
        title: "Château confidentiel à découvrir",
        color: "pierre",
        icon: KeyRound,
    },
};

const CHATEAU_VISITE_PRESET: Record<LRZChateauVisiteValue, PresetDefinition> = {
    "ouvert au public": {
        label: "Ouvert",
        detail: "visite publique",
        title: "Château ouvert au public",
        color: "prairie",
        icon: TicketCheck,
    },
    "extérieurs & parc": {
        label: "Parc & extérieurs",
        detail: "accès partiel",
        title: "Parc et extérieurs accessibles",
        color: "vert-metallise",
        icon: Trees,
    },
    "privé, non visitable": {
        label: "Privé",
        detail: "non visitable",
        title: "Propriété privée non visitable",
        color: "brique",
        icon: LockKeyhole,
    },
    inconnu: {
        label: "Inconnu",
        detail: "à vérifier",
        title: "Conditions de visite inconnues",
        color: "galet",
        icon: CircleHelp,
    },
};

function getPresetDefinition(props: PresetBadgeProps): PresetDefinition {
    switch (props.preset) {
        case "extinction-faune":
            return EXTINCTION_PRESET[props.value];
        case "indigenat-flore":
            return INDIGENAT_PRESET[props.value];
        case "protection-flore":
            return FLORE_PROTECTION_PRESET[props.value];
        case "monument-historique-chateau":
            return MONUMENT_PRESET[props.value];
        case "unesco-chateau":
            return UNESCO_PRESET[props.value ? "oui" : "non"];
        case "rarete-faune":
            return FAUNE_RARETE_PRESET[props.value];
        case "rarete-flore":
            return FLORE_RARETE_PRESET[props.value];
        case "renommee-chateau":
            return CHATEAU_RENOMMEE_PRESET[props.value];
        case "visite-chateau":
            return CHATEAU_VISITE_PRESET[props.value];
    }
}

type BadgeStyle = CSSProperties & {
    "--badge-color": string;
};

export default function LRZBadge(props: LRZBadgeProps) {
    const preset = props.preset
        ? getPresetDefinition(props as PresetBadgeProps)
        : undefined;
    const color = props.color ?? preset?.color ?? "galet";
    const paletteColor = `var(${LRZ_COLOR_VARIABLES[color]})`;
    const label = props.label ?? preset?.label;
    const detail = props.detail ?? preset?.detail;
    const PresetIcon = preset?.icon;
    const icon =
        props.icon === undefined ? (
            PresetIcon ? (
                <PresetIcon strokeWidth={2} />
            ) : undefined
        ) : (
            props.icon
        );
    const hasIcon = icon !== undefined && icon !== null && icon !== false;
    const variant =
        props.variant ??
        (props.preset ? PRESET_VARIANTS[props.preset] : "default");
    const gradient = props.gradient ?? Boolean(props.preset);
    const value =
        "value" in props && props.value !== undefined
            ? typeof props.value === "boolean"
                ? props.value
                    ? "oui"
                    : "non"
                : props.value
            : undefined;

    return (
        <span
            className={[styles.badge, props.className]
                .filter(Boolean)
                .join(" ")}
            data-color={color}
            data-preset={props.preset}
            data-value={value}
            data-variant={variant}
            data-dashed={
                props.dashed === undefined ? undefined : String(props.dashed)
            }
            data-gradient={String(gradient)}
            data-has-icon={String(hasIcon)}
            data-icon-hidden={String(props.icon === false)}
            title={props.title ?? preset?.title}
            style={{ "--badge-color": paletteColor } as BadgeStyle}
        >
            <span className={styles.symbol} aria-hidden="true">
                {hasIcon ? <span className={styles.icon}>{icon}</span> : null}
            </span>
            <span className={styles.label}>{label}</span>
            {detail !== undefined && detail !== false ? (
                <span className={styles.detail}>{detail}</span>
            ) : null}
        </span>
    );
}
