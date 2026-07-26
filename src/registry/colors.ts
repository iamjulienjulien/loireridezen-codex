import type { LRZColor } from "@/types/lrz";

export type LRZHexColor = `#${string}`;
export type LRZCssColorVariable = `--lrz-${string}`;
export type LRZColorCategory = "nature" | "faune" | "patrimoine";

export type LRZColorDefinition = {
    label: string;
    category: LRZColorCategory;
    value: LRZHexColor;
    variable: LRZCssColorVariable;
};

/**
 * Registre central des couleurs Loire Ride Zen.
 *
 * Les clés correspondent aux valeurs publiques du type `LRZColor`.
 * Toutes les autres collections de couleurs sont dérivées de ce registre.
 */
export const LRZ_COLOR_REGISTRY = {
    // Nature
    prairie: {
        label: "Prairie",
        category: "nature",
        value: "#5C8754",
        variable: "--lrz-nature-prairie",
    },
    roseau: {
        label: "Roseau",
        category: "nature",
        value: "#707C40",
        variable: "--lrz-nature-roseau",
    },
    foret: {
        label: "Forêt",
        category: "nature",
        value: "#503827",
        variable: "--lrz-nature-foret",
    },
    sable: {
        label: "Sable",
        category: "nature",
        value: "#CFBE9F",
        variable: "--lrz-nature-sable",
    },
    galet: {
        label: "Galet",
        category: "nature",
        value: "#7C7C78",
        variable: "--lrz-nature-galet",
    },
    eau: {
        label: "Eau",
        category: "nature",
        value: "#4D80A7",
        variable: "--lrz-nature-eau",
    },
    "eau-claire": {
        label: "Eau claire",
        category: "nature",
        value: "#3E93A7",
        variable: "--lrz-nature-eau-claire",
    },
    ciel: {
        label: "Ciel",
        category: "nature",
        value: "#F7F6F2",
        variable: "--lrz-nature-ciel",
    },
    soleil: {
        label: "Soleil",
        category: "nature",
        value: "#D8B548",
        variable: "--lrz-nature-soleil",
    },
    coucher: {
        label: "Coucher",
        category: "nature",
        value: "#D97A3E",
        variable: "--lrz-nature-coucher",
    },

    // Faune · Neutres
    blanc: {
        label: "Blanc",
        category: "faune",
        value: "#F7F6F2",
        variable: "--lrz-faune-blanc",
    },
    "blanc-gris": {
        label: "Blanc gris",
        category: "faune",
        value: "#E5E7E3",
        variable: "--lrz-faune-blanc-gris",
    },
    argent: {
        label: "Argent",
        category: "faune",
        value: "#BEC5C8",
        variable: "--lrz-faune-argent",
    },
    gris: {
        label: "Gris",
        category: "faune",
        value: "#7C7C78",
        variable: "--lrz-faune-gris",
    },
    "gris-ardoise": {
        label: "Gris ardoise",
        category: "faune",
        value: "#5C6772",
        variable: "--lrz-faune-gris-ardoise",
    },
    "gris-brun": {
        label: "Gris brun",
        category: "faune",
        value: "#76695D",
        variable: "--lrz-faune-gris-brun",
    },
    noir: {
        label: "Noir",
        category: "faune",
        value: "#2B2B29",
        variable: "--lrz-faune-noir",
    },

    // Faune · Bruns
    beige: {
        label: "Beige",
        category: "faune",
        value: "#CFBE9F",
        variable: "--lrz-faune-beige",
    },
    creme: {
        label: "Crème",
        category: "faune",
        value: "#F2E7CF",
        variable: "--lrz-faune-creme",
    },
    ocre: {
        label: "Ocre",
        category: "faune",
        value: "#B88945",
        variable: "--lrz-faune-ocre",
    },
    fauve: {
        label: "Fauve",
        category: "faune",
        value: "#B37A43",
        variable: "--lrz-faune-fauve",
    },
    brun: {
        label: "Brun",
        category: "faune",
        value: "#795739",
        variable: "--lrz-faune-brun",
    },
    "brun-roux": {
        label: "Brun roux",
        category: "faune",
        value: "#8F573C",
        variable: "--lrz-faune-brun-roux",
    },
    "brun-fonce": {
        label: "Brun foncé",
        category: "faune",
        value: "#503827",
        variable: "--lrz-faune-brun-fonce",
    },

    // Faune · Rouges et oranges
    orange: {
        label: "Orange",
        category: "faune",
        value: "#D97A3E",
        variable: "--lrz-faune-orange",
    },
    "orange-cuivre": {
        label: "Orange cuivré",
        category: "faune",
        value: "#B96841",
        variable: "--lrz-faune-orange-cuivre",
    },
    roux: {
        label: "Roux",
        category: "faune",
        value: "#A55A35",
        variable: "--lrz-faune-roux",
    },
    rouge: {
        label: "Rouge",
        category: "faune",
        value: "#A44842",
        variable: "--lrz-faune-rouge",
    },

    // Faune · Jaunes
    jaune: {
        label: "Jaune",
        category: "faune",
        value: "#D8B548",
        variable: "--lrz-faune-jaune",
    },

    // Faune · Verts
    vert: {
        label: "Vert",
        category: "faune",
        value: "#5C8754",
        variable: "--lrz-faune-vert",
    },
    "vert-vif": {
        label: "Vert vif",
        category: "faune",
        value: "#6AA657",
        variable: "--lrz-faune-vert-vif",
    },
    "vert-olive": {
        label: "Vert olive",
        category: "faune",
        value: "#707C40",
        variable: "--lrz-faune-vert-olive",
    },
    "vert-metallise": {
        label: "Vert métallisé",
        category: "faune",
        value: "#3E7F73",
        variable: "--lrz-faune-vert-metallise",
    },

    // Faune · Bleus
    bleu: {
        label: "Bleu",
        category: "faune",
        value: "#4D80A7",
        variable: "--lrz-faune-bleu",
    },
    "bleu-gris": {
        label: "Bleu gris",
        category: "faune",
        value: "#6C8796",
        variable: "--lrz-faune-bleu-gris",
    },
    "bleu-turquoise": {
        label: "Bleu turquoise",
        category: "faune",
        value: "#3E93A7",
        variable: "--lrz-faune-bleu-turquoise",
    },
    "bleu-metallise": {
        label: "Bleu métallisé",
        category: "faune",
        value: "#2C708E",
        variable: "--lrz-faune-bleu-metallise",
    },

    // Patrimoine
    pierre: {
        label: "Pierre",
        category: "patrimoine",
        value: "#D6D0C6",
        variable: "--lrz-patrimoine-pierre",
    },
    ardoise: {
        label: "Ardoise",
        category: "patrimoine",
        value: "#5C6772",
        variable: "--lrz-patrimoine-ardoise",
    },
    brique: {
        label: "Brique",
        category: "patrimoine",
        value: "#A44842",
        variable: "--lrz-patrimoine-brique",
    },
    tuffeau: {
        label: "Tuffeau",
        category: "patrimoine",
        value: "#F2E7CF",
        variable: "--lrz-patrimoine-tuffeau",
    },
} as const satisfies Record<LRZColor, LRZColorDefinition>;

/**
 * Transforme les valeurs d’un objet en conservant précisément ses clés.
 */
function mapRegistry<TValue>(
    selector: (definition: LRZColorDefinition) => TValue,
): Record<LRZColor, TValue> {
    return Object.fromEntries(
        LRZ_COLOR_NAMES.map((color) => [
            color,
            selector(LRZ_COLOR_REGISTRY[color]),
        ]),
    ) as Record<LRZColor, TValue>;
}

/** Tous les noms publics de couleurs disponibles. */
export const LRZ_COLOR_NAMES = Object.keys(LRZ_COLOR_REGISTRY) as LRZColor[];

/** Valeur hexadécimale associée à chaque couleur LRZ. */
export const LRZ_COLOR_VALUES = mapRegistry(({ value }) => value) as Record<
    LRZColor,
    LRZHexColor
>;

/** Variable CSS associée à chaque couleur LRZ. */
export const LRZ_COLOR_VARIABLES = mapRegistry(
    ({ variable }) => variable,
) as Record<LRZColor, LRZCssColorVariable>;

/** Libellé lisible associé à chaque couleur LRZ. */
export const LRZ_COLOR_LABELS = mapRegistry(({ label }) => label);

/**
 * Retourne la définition complète d’une couleur.
 *
 * @example
 * getLRZColor("prairie");
 */
export function getLRZColor(color: LRZColor): LRZColorDefinition {
    return LRZ_COLOR_REGISTRY[color];
}

/**
 * Retourne la valeur hexadécimale d’une couleur.
 *
 * @example
 * getLRZColorValue("prairie"); // "#5C8754"
 * getLRZColorValue("brun"); // "#795739"
 */
export function getLRZColorValue(color: LRZColor): LRZHexColor {
    return LRZ_COLOR_REGISTRY[color].value;
}

/**
 * Retourne la variable CSS associée à une couleur.
 *
 * @example
 * getLRZColorVariable("prairie"); // "--lrz-nature-prairie"
 */
export function getLRZColorVariable(color: LRZColor): LRZCssColorVariable {
    return LRZ_COLOR_REGISTRY[color].variable;
}

/**
 * Retourne une expression CSS `var(...)`.
 *
 * @example
 * getLRZColorVar("prairie"); // "var(--lrz-nature-prairie)"
 */
export function getLRZColorVar(color: LRZColor): `var(${LRZCssColorVariable})` {
    return `var(${getLRZColorVariable(color)})`;
}

/**
 * Retourne le libellé humain d’une couleur.
 *
 * @example
 * getLRZColorLabel("brun-fonce"); // "Brun foncé"
 */
export function getLRZColorLabel(color: LRZColor): string {
    return LRZ_COLOR_REGISTRY[color].label;
}

export type LRZColorGroup = {
    id: LRZColorCategory;
    title: string;
    colors: LRZColor[];
};

/** Groupes de couleurs utilisés dans la documentation et les composants UI. */
export const LRZ_COLOR_GROUPS: LRZColorGroup[] = [
    {
        id: "nature",
        title: "Nature",
        colors: LRZ_COLOR_NAMES.filter(
            (color) => LRZ_COLOR_REGISTRY[color].category === "nature",
        ),
    },
    {
        id: "faune",
        title: "Faune",
        colors: LRZ_COLOR_NAMES.filter(
            (color) => LRZ_COLOR_REGISTRY[color].category === "faune",
        ),
    },
    {
        id: "patrimoine",
        title: "Patrimoine",
        colors: LRZ_COLOR_NAMES.filter(
            (color) => LRZ_COLOR_REGISTRY[color].category === "patrimoine",
        ),
    },
];

/**
 * Palettes historiques conservées pour les usages existants.
 *
 * Pour le nouveau code, privilégier `LRZ_COLOR_REGISTRY`
 * et les fonctions `getLRZColor*`.
 */
export const LRZ_NATURALIST_COLORS = {
    blanc: getLRZColorValue("blanc"),
    "blanc gris": getLRZColorValue("blanc-gris"),
    argent: getLRZColorValue("argent"),
    gris: getLRZColorValue("gris"),
    "gris ardoise": getLRZColorValue("gris-ardoise"),
    "gris brun": getLRZColorValue("gris-brun"),
    noir: getLRZColorValue("noir"),

    beige: getLRZColorValue("beige"),
    crème: getLRZColorValue("creme"),
    ocre: getLRZColorValue("ocre"),
    fauve: getLRZColorValue("fauve"),
    brun: getLRZColorValue("brun"),
    "brun roux": getLRZColorValue("brun-roux"),
    "brun foncé": getLRZColorValue("brun-fonce"),

    orange: getLRZColorValue("orange"),
    "orange cuivré": getLRZColorValue("orange-cuivre"),
    roux: getLRZColorValue("roux"),
    rouge: getLRZColorValue("rouge"),

    jaune: getLRZColorValue("jaune"),

    vert: getLRZColorValue("vert"),
    "vert vif": getLRZColorValue("vert-vif"),
    "vert olive": getLRZColorValue("vert-olive"),
    "vert métallisé": getLRZColorValue("vert-metallise"),

    bleu: getLRZColorValue("bleu"),
    "bleu gris": getLRZColorValue("bleu-gris"),
    "bleu turquoise": getLRZColorValue("bleu-turquoise"),
    "bleu métallique": getLRZColorValue("bleu-metallise"),
} as const;

export const LRZ_COLOR = {
    nature: {
        prairie: getLRZColorValue("prairie"),
        roseau: getLRZColorValue("roseau"),
        foret: getLRZColorValue("foret"),
        sable: getLRZColorValue("sable"),
        galet: getLRZColorValue("galet"),
        eau: getLRZColorValue("eau"),
        eauClaire: getLRZColorValue("eau-claire"),
        ciel: getLRZColorValue("ciel"),
        soleil: getLRZColorValue("soleil"),
        coucher: getLRZColorValue("coucher"),
    },

    faune: LRZ_NATURALIST_COLORS,

    patrimoine: {
        pierre: getLRZColorValue("pierre"),
        ardoise: getLRZColorValue("ardoise"),
        brique: getLRZColorValue("brique"),
        tuffeau: getLRZColorValue("tuffeau"),
    },
} as const;
