// Registre de couleurs V2 — source de vérité de la palette LRZ.

export type LRZHexColor = `#${string}`;
export type LRZCssColorVariable = `--color-${string}`;

export type LRZColorCategory = "nature" | "base" | "patrimoine";

export type LRZColorFamily =
    | "nature"
    | "neutres"
    | "terres"
    | "bruns"
    | "jaunes"
    | "rouges"
    | "roses"
    | "verts"
    | "bleus"
    | "patrimoine";

export type LRZColorDefinition = {
    label: string;
    category: LRZColorCategory;
    family: LRZColorFamily;
    value: LRZHexColor;
    variable: LRZCssColorVariable;
};

/**
 * Préserve les clés littérales et valide toutes les définitions du registre.
 */
function defineColorRegistry<
    const TRegistry extends Record<string, LRZColorDefinition>,
>(registry: TRegistry): TRegistry {
    return registry;
}

/**
 * Registre central des couleurs Loire Ride Zen.
 *
 * Conventions :
 *
 * - Nature : `--color-nature-*`
 * - Palette naturaliste de base : `--color-*`
 * - Patrimoine : `--color-patrimoine-*`
 *
 * Les clés du registre constituent directement le type public `LRZColor`.
 */
export const LRZ_COLOR_REGISTRY = defineColorRegistry({
    /* ======================================================================
       Nature
       ====================================================================== */

    prairie: {
        label: "Prairie",
        category: "nature",
        family: "nature",
        value: "#5C8754",
        variable: "--color-nature-prairie",
    },
    roseau: {
        label: "Roseau",
        category: "nature",
        family: "nature",
        value: "#707C40",
        variable: "--color-nature-roseau",
    },
    foret: {
        label: "Forêt",
        category: "nature",
        family: "nature",
        value: "#503827",
        variable: "--color-nature-foret",
    },
    sable: {
        label: "Sable",
        category: "nature",
        family: "nature",
        value: "#CFBE9F",
        variable: "--color-nature-sable",
    },
    galet: {
        label: "Galet",
        category: "nature",
        family: "nature",
        value: "#7C7C78",
        variable: "--color-nature-galet",
    },
    eau: {
        label: "Eau",
        category: "nature",
        family: "nature",
        value: "#4D80A7",
        variable: "--color-nature-eau",
    },
    "eau-claire": {
        label: "Eau claire",
        category: "nature",
        family: "nature",
        value: "#3E93A7",
        variable: "--color-nature-eau-claire",
    },
    ciel: {
        label: "Ciel",
        category: "nature",
        family: "nature",
        value: "#F7F6F2",
        variable: "--color-nature-ciel",
    },
    soleil: {
        label: "Soleil",
        category: "nature",
        family: "nature",
        value: "#D8B548",
        variable: "--color-nature-soleil",
    },
    coucher: {
        label: "Coucher",
        category: "nature",
        family: "nature",
        value: "#D97A3E",
        variable: "--color-nature-coucher",
    },

    /* ======================================================================
       Palette naturaliste · Neutres
       ====================================================================== */

    blanc: {
        label: "Blanc",
        category: "base",
        family: "neutres",
        value: "#F7F6F2",
        variable: "--color-blanc",
    },
    ivoire: {
        label: "Ivoire",
        category: "base",
        family: "neutres",
        value: "#F3EFE4",
        variable: "--color-ivoire",
    },
    "blanc-gris": {
        label: "Blanc gris",
        category: "base",
        family: "neutres",
        value: "#E5E7E3",
        variable: "--color-blanc-gris",
    },
    argent: {
        label: "Argent",
        category: "base",
        family: "neutres",
        value: "#BEC5C8",
        variable: "--color-argent",
    },
    "gris-clair": {
        label: "Gris clair",
        category: "base",
        family: "neutres",
        value: "#A8AAA5",
        variable: "--color-gris-clair",
    },
    gris: {
        label: "Gris",
        category: "base",
        family: "neutres",
        value: "#7C7C78",
        variable: "--color-gris",
    },
    "gris-ardoise": {
        label: "Gris ardoise",
        category: "base",
        family: "neutres",
        value: "#5C6772",
        variable: "--color-gris-ardoise",
    },
    "gris-brun": {
        label: "Gris brun",
        category: "base",
        family: "neutres",
        value: "#76695D",
        variable: "--color-gris-brun",
    },
    anthracite: {
        label: "Anthracite",
        category: "base",
        family: "neutres",
        value: "#424540",
        variable: "--color-anthracite",
    },
    noir: {
        label: "Noir",
        category: "base",
        family: "neutres",
        value: "#2B2B29",
        variable: "--color-noir",
    },

    /* ======================================================================
       Palette naturaliste · Terres
       ====================================================================== */

    lin: {
        label: "Lin",
        category: "base",
        family: "terres",
        value: "#DED1B8",
        variable: "--color-lin",
    },
    beige: {
        label: "Beige",
        category: "base",
        family: "terres",
        value: "#CFBE9F",
        variable: "--color-beige",
    },
    creme: {
        label: "Crème",
        category: "base",
        family: "terres",
        value: "#F2E7CF",
        variable: "--color-creme",
    },
    taupe: {
        label: "Taupe",
        category: "base",
        family: "terres",
        value: "#9A8875",
        variable: "--color-taupe",
    },
    "ocre-clair": {
        label: "Ocre clair",
        category: "base",
        family: "terres",
        value: "#CEA968",
        variable: "--color-ocre-clair",
    },
    ocre: {
        label: "Ocre",
        category: "base",
        family: "terres",
        value: "#B88945",
        variable: "--color-ocre",
    },
    fauve: {
        label: "Fauve",
        category: "base",
        family: "terres",
        value: "#B37A43",
        variable: "--color-fauve",
    },

    /* ======================================================================
       Palette naturaliste · Bruns
       ====================================================================== */

    noisette: {
        label: "Noisette",
        category: "base",
        family: "bruns",
        value: "#9A6C43",
        variable: "--color-noisette",
    },
    brun: {
        label: "Brun",
        category: "base",
        family: "bruns",
        value: "#795739",
        variable: "--color-brun",
    },
    "brun-roux": {
        label: "Brun roux",
        category: "base",
        family: "bruns",
        value: "#8F573C",
        variable: "--color-brun-roux",
    },
    "brun-fonce": {
        label: "Brun foncé",
        category: "base",
        family: "bruns",
        value: "#503827",
        variable: "--color-brun-fonce",
    },
    ecorce: {
        label: "Écorce",
        category: "base",
        family: "bruns",
        value: "#46352B",
        variable: "--color-ecorce",
    },

    /* ======================================================================
       Palette naturaliste · Jaunes
       ====================================================================== */

    "jaune-paille": {
        label: "Jaune paille",
        category: "base",
        family: "jaunes",
        value: "#DFCA7D",
        variable: "--color-jaune-paille",
    },
    jaune: {
        label: "Jaune",
        category: "base",
        family: "jaunes",
        value: "#D8B548",
        variable: "--color-jaune",
    },
    miel: {
        label: "Miel",
        category: "base",
        family: "jaunes",
        value: "#C7953E",
        variable: "--color-miel",
    },
    ambre: {
        label: "Ambre",
        category: "base",
        family: "jaunes",
        value: "#B87932",
        variable: "--color-ambre",
    },

    /* ======================================================================
       Palette naturaliste · Rouges et oranges
       ====================================================================== */

    "orange-clair": {
        label: "Orange clair",
        category: "base",
        family: "rouges",
        value: "#E79A5D",
        variable: "--color-orange-clair",
    },
    orange: {
        label: "Orange",
        category: "base",
        family: "rouges",
        value: "#D97A3E",
        variable: "--color-orange",
    },
    "orange-cuivre": {
        label: "Orange cuivré",
        category: "base",
        family: "rouges",
        value: "#B96841",
        variable: "--color-orange-cuivre",
    },
    roux: {
        label: "Roux",
        category: "base",
        family: "rouges",
        value: "#A55A35",
        variable: "--color-roux",
    },
    "terre-cuite": {
        label: "Terre cuite",
        category: "base",
        family: "rouges",
        value: "#AD5F49",
        variable: "--color-terre-cuite",
    },
    corail: {
        label: "Corail",
        category: "base",
        family: "rouges",
        value: "#C76858",
        variable: "--color-corail",
    },
    rouge: {
        label: "Rouge",
        category: "base",
        family: "rouges",
        value: "#A44842",
        variable: "--color-rouge",
    },
    grenat: {
        label: "Grenat",
        category: "base",
        family: "rouges",
        value: "#7F3D3F",
        variable: "--color-grenat",
    },
    "lie-de-vin": {
        label: "Lie-de-vin",
        category: "base",
        family: "rouges",
        value: "#663D49",
        variable: "--color-lie-de-vin",
    },

    /* ======================================================================
       Palette naturaliste · Roses et violets
       ====================================================================== */

    "rose-poudre": {
        label: "Rose poudré",
        category: "base",
        family: "roses",
        value: "#D6AAA2",
        variable: "--color-rose-poudre",
    },
    "rose-sauvage": {
        label: "Rose sauvage",
        category: "base",
        family: "roses",
        value: "#B86F72",
        variable: "--color-rose-sauvage",
    },
    mauve: {
        label: "Mauve",
        category: "base",
        family: "roses",
        value: "#8C7187",
        variable: "--color-mauve",
    },
    prune: {
        label: "Prune",
        category: "base",
        family: "roses",
        value: "#665064",
        variable: "--color-prune",
    },

    /* ======================================================================
       Palette naturaliste · Verts
       ====================================================================== */

    "vert-clair": {
        label: "Vert clair",
        category: "base",
        family: "verts",
        value: "#92AD7D",
        variable: "--color-vert-clair",
    },
    vert: {
        label: "Vert",
        category: "base",
        family: "verts",
        value: "#5C8754",
        variable: "--color-vert",
    },
    "vert-vif": {
        label: "Vert vif",
        category: "base",
        family: "verts",
        value: "#6AA657",
        variable: "--color-vert-vif",
    },
    "vert-sauge": {
        label: "Vert sauge",
        category: "base",
        family: "verts",
        value: "#82947A",
        variable: "--color-vert-sauge",
    },
    "vert-mousse": {
        label: "Vert mousse",
        category: "base",
        family: "verts",
        value: "#63734F",
        variable: "--color-vert-mousse",
    },
    "vert-olive": {
        label: "Vert olive",
        category: "base",
        family: "verts",
        value: "#707C40",
        variable: "--color-vert-olive",
    },
    "vert-roseau": {
        label: "Vert roseau",
        category: "base",
        family: "verts",
        value: "#7F884E",
        variable: "--color-vert-roseau",
    },
    "vert-pin": {
        label: "Vert pin",
        category: "base",
        family: "verts",
        value: "#3F6651",
        variable: "--color-vert-pin",
    },
    "vert-metallise": {
        label: "Vert métallisé",
        category: "base",
        family: "verts",
        value: "#3E7F73",
        variable: "--color-vert-metallise",
    },
    "vert-fonce": {
        label: "Vert foncé",
        category: "base",
        family: "verts",
        value: "#345443",
        variable: "--color-vert-fonce",
    },

    /* ======================================================================
       Palette naturaliste · Bleus
       ====================================================================== */

    "bleu-clair": {
        label: "Bleu clair",
        category: "base",
        family: "bleus",
        value: "#8FB3C6",
        variable: "--color-bleu-clair",
    },
    bleu: {
        label: "Bleu",
        category: "base",
        family: "bleus",
        value: "#4D80A7",
        variable: "--color-bleu",
    },
    "bleu-gris": {
        label: "Bleu gris",
        category: "base",
        family: "bleus",
        value: "#6C8796",
        variable: "--color-bleu-gris",
    },
    "bleu-turquoise": {
        label: "Bleu turquoise",
        category: "base",
        family: "bleus",
        value: "#3E93A7",
        variable: "--color-bleu-turquoise",
    },
    "bleu-metallise": {
        label: "Bleu métallisé",
        category: "base",
        family: "bleus",
        value: "#2C708E",
        variable: "--color-bleu-metallise",
    },
    "bleu-loire": {
        label: "Bleu Loire",
        category: "base",
        family: "bleus",
        value: "#397A91",
        variable: "--color-bleu-loire",
    },
    "bleu-ardoise": {
        label: "Bleu ardoise",
        category: "base",
        family: "bleus",
        value: "#456476",
        variable: "--color-bleu-ardoise",
    },
    "bleu-nuit": {
        label: "Bleu nuit",
        category: "base",
        family: "bleus",
        value: "#304957",
        variable: "--color-bleu-nuit",
    },

    /* ======================================================================
       Patrimoine
       ====================================================================== */

    pierre: {
        label: "Pierre",
        category: "patrimoine",
        family: "patrimoine",
        value: "#D6D0C6",
        variable: "--color-patrimoine-pierre",
    },
    ardoise: {
        label: "Ardoise",
        category: "patrimoine",
        family: "patrimoine",
        value: "#5C6772",
        variable: "--color-patrimoine-ardoise",
    },
    brique: {
        label: "Brique",
        category: "patrimoine",
        family: "patrimoine",
        value: "#A44842",
        variable: "--color-patrimoine-brique",
    },
    tuffeau: {
        label: "Tuffeau",
        category: "patrimoine",
        family: "patrimoine",
        value: "#F2E7CF",
        variable: "--color-patrimoine-tuffeau",
    },
});

/**
 * Toutes les couleurs publiques sont dérivées du registre.
 *
 * Ajouter une entrée au registre suffit donc à faire évoluer ce type.
 */
export type LRZColor = keyof typeof LRZ_COLOR_REGISTRY;

/** Définition précise d'une couleur donnée. */
export type LRZColorRegistryDefinition<TColor extends LRZColor = LRZColor> =
    (typeof LRZ_COLOR_REGISTRY)[TColor];

/** Tous les noms publics de couleurs disponibles. */
export const LRZ_COLOR_NAMES = Object.keys(LRZ_COLOR_REGISTRY) as LRZColor[];

/**
 * Transforme le registre en conservant ses clés publiques.
 */
function mapRegistry<TValue>(
    selector: (definition: LRZColorDefinition, color: LRZColor) => TValue,
): Record<LRZColor, TValue> {
    return Object.fromEntries(
        LRZ_COLOR_NAMES.map((color) => [
            color,
            selector(LRZ_COLOR_REGISTRY[color], color),
        ]),
    ) as Record<LRZColor, TValue>;
}

/** Valeur hexadécimale associée à chaque couleur LRZ. */
export const LRZ_COLOR_VALUES = mapRegistry(({ value }) => value);

/** Variable CSS associée à chaque couleur LRZ. */
export const LRZ_COLOR_VARIABLES = mapRegistry(({ variable }) => variable);

/** Libellé humain associé à chaque couleur LRZ. */
export const LRZ_COLOR_LABELS = mapRegistry(({ label }) => label);

/** Catégorie associée à chaque couleur LRZ. */
export const LRZ_COLOR_CATEGORIES = mapRegistry(({ category }) => category);

/** Famille chromatique associée à chaque couleur LRZ. */
export const LRZ_COLOR_FAMILIES = mapRegistry(({ family }) => family);

/**
 * Retourne la définition complète d'une couleur.
 *
 * @example
 * getLRZColor("prairie");
 */
export function getLRZColor<TColor extends LRZColor>(
    color: TColor,
): LRZColorRegistryDefinition<TColor> {
    return LRZ_COLOR_REGISTRY[color];
}

/**
 * Retourne la valeur hexadécimale d'une couleur.
 *
 * @example
 * getLRZColorValue("prairie"); // "#5C8754"
 * getLRZColorValue("fauve"); // "#B37A43"
 */
export function getLRZColorValue(color: LRZColor): LRZHexColor {
    return LRZ_COLOR_REGISTRY[color].value;
}

/**
 * Retourne la variable CSS associée à une couleur.
 *
 * @example
 * getLRZColorVariable("prairie"); // "--color-nature-prairie"
 * getLRZColorVariable("fauve"); // "--color-fauve"
 */
export function getLRZColorVariable(color: LRZColor): LRZCssColorVariable {
    return LRZ_COLOR_REGISTRY[color].variable;
}

/**
 * Retourne une expression CSS `var(...)`.
 *
 * @example
 * getLRZColorVar("prairie"); // "var(--color-nature-prairie)"
 */
export function getLRZColorVar(color: LRZColor): `var(${LRZCssColorVariable})` {
    return `var(${getLRZColorVariable(color)})`;
}

/**
 * Retourne le libellé humain d'une couleur.
 *
 * @example
 * getLRZColorLabel("brun-fonce"); // "Brun foncé"
 */
export function getLRZColorLabel(color: LRZColor): string {
    return LRZ_COLOR_REGISTRY[color].label;
}

/**
 * Retourne la catégorie principale d'une couleur.
 */
export function getLRZColorCategory(color: LRZColor): LRZColorCategory {
    return LRZ_COLOR_REGISTRY[color].category;
}

/**
 * Retourne la famille chromatique d'une couleur.
 */
export function getLRZColorFamily(color: LRZColor): LRZColorFamily {
    return LRZ_COLOR_REGISTRY[color].family;
}

/**
 * Retourne toutes les couleurs appartenant à une catégorie.
 */
export function getLRZColorsByCategory(category: LRZColorCategory): LRZColor[] {
    return LRZ_COLOR_NAMES.filter(
        (color) => LRZ_COLOR_REGISTRY[color].category === category,
    );
}

/**
 * Retourne toutes les couleurs appartenant à une famille chromatique.
 */
export function getLRZColorsByFamily(family: LRZColorFamily): LRZColor[] {
    return LRZ_COLOR_NAMES.filter(
        (color) => LRZ_COLOR_REGISTRY[color].family === family,
    );
}

export type LRZColorGroup = {
    id: LRZColorFamily;
    title: string;
    colors: LRZColor[];
};

/**
 * Groupes détaillés utilisés dans la documentation,
 * l'atelier UI et les sélecteurs de couleurs.
 */
export const LRZ_COLOR_GROUPS: LRZColorGroup[] = [
    {
        id: "nature",
        title: "Nature",
        colors: getLRZColorsByFamily("nature"),
    },
    {
        id: "neutres",
        title: "Neutres",
        colors: getLRZColorsByFamily("neutres"),
    },
    {
        id: "terres",
        title: "Terres",
        colors: getLRZColorsByFamily("terres"),
    },
    {
        id: "bruns",
        title: "Bruns",
        colors: getLRZColorsByFamily("bruns"),
    },
    {
        id: "jaunes",
        title: "Jaunes et ors",
        colors: getLRZColorsByFamily("jaunes"),
    },
    {
        id: "rouges",
        title: "Rouges et oranges",
        colors: getLRZColorsByFamily("rouges"),
    },
    {
        id: "roses",
        title: "Roses et violets",
        colors: getLRZColorsByFamily("roses"),
    },
    {
        id: "verts",
        title: "Verts",
        colors: getLRZColorsByFamily("verts"),
    },
    {
        id: "bleus",
        title: "Bleus",
        colors: getLRZColorsByFamily("bleus"),
    },
    {
        id: "patrimoine",
        title: "Patrimoine",
        colors: getLRZColorsByFamily("patrimoine"),
    },
];

/**
 * Palette naturaliste de base.
 *
 * Elle exclut volontairement les tokens éditoriaux Nature et Patrimoine.
 */
export const LRZ_NATURALIST_COLORS = Object.fromEntries(
    getLRZColorsByCategory("base").map((color) => [
        color,
        getLRZColorValue(color),
    ]),
) as {
    readonly [
        TColor in LRZColor as LRZColorRegistryDefinition<TColor>["category"] extends "base"
            ? TColor
            : never
    ]: LRZHexColor;
};

/**
 * Accès structuré aux trois grandes catégories.
 */
export const LRZ_COLOR = {
    nature: Object.fromEntries(
        getLRZColorsByCategory("nature").map((color) => [
            color,
            getLRZColorValue(color),
        ]),
    ),

    base: LRZ_NATURALIST_COLORS,

    patrimoine: Object.fromEntries(
        getLRZColorsByCategory("patrimoine").map((color) => [
            color,
            getLRZColorValue(color),
        ]),
    ),
} as const;
