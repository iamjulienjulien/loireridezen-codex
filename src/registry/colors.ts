import type { LRZColor } from "@/types/lrz";

export const LRZ_NATURALIST_COLORS = {
    // Neutres
    blanc: "#F7F6F2",
    "blanc gris": "#E5E7E3",
    argent: "#BEC5C8",
    gris: "#7C7C78",
    "gris ardoise": "#5C6772",
    "gris brun": "#76695D",
    noir: "#2B2B29",

    // Bruns
    beige: "#CFBE9F",
    crème: "#F2E7CF",
    ocre: "#B88945",
    fauve: "#B37A43",
    brun: "#795739",
    "brun roux": "#8F573C",
    "brun foncé": "#503827",

    // Rouges / oranges
    orange: "#D97A3E",
    "orange cuivré": "#B96841",
    roux: "#A55A35",
    rouge: "#A44842",

    // Jaunes
    jaune: "#D8B548",

    // Verts
    vert: "#5C8754",
    "vert vif": "#6AA657",
    "vert olive": "#707C40",
    "vert métallisé": "#3E7F73",

    // Bleus
    bleu: "#4D80A7",
    "bleu gris": "#6C8796",
    "bleu turquoise": "#3E93A7",
    "bleu métallique": "#2C708E",
};

export const LRZ_COLOR = {
    nature: {
        prairie: "#5C8754",
        roseau: "#707C40",
        foret: "#503827",
        sable: "#CFBE9F",
        galet: "#7C7C78",
        eau: "#4D80A7",
        eauClaire: "#3E93A7",
        ciel: "#F7F6F2",
        soleil: "#D8B548",
        coucher: "#D97A3E",
    },

    faune: LRZ_NATURALIST_COLORS,

    patrimoine: {
        pierre: "#D6D0C6",
        ardoise: "#5C6772",
        brique: "#A44842",
        tuffeau: "#F2E7CF",
    },
};

/** Variable CSS associée à chaque nom public de la palette LRZ. */
export const LRZ_COLOR_VARIABLES: Record<LRZColor, `--lrz-${string}`> = {
    prairie: "--lrz-nature-prairie",
    roseau: "--lrz-nature-roseau",
    foret: "--lrz-nature-foret",
    sable: "--lrz-nature-sable",
    galet: "--lrz-nature-galet",
    eau: "--lrz-nature-eau",
    "eau-claire": "--lrz-nature-eau-claire",
    ciel: "--lrz-nature-ciel",
    soleil: "--lrz-nature-soleil",
    coucher: "--lrz-nature-coucher",
    blanc: "--lrz-faune-blanc",
    "blanc-gris": "--lrz-faune-blanc-gris",
    argent: "--lrz-faune-argent",
    gris: "--lrz-faune-gris",
    "gris-ardoise": "--lrz-faune-gris-ardoise",
    "gris-brun": "--lrz-faune-gris-brun",
    noir: "--lrz-faune-noir",
    beige: "--lrz-faune-beige",
    creme: "--lrz-faune-creme",
    ocre: "--lrz-faune-ocre",
    fauve: "--lrz-faune-fauve",
    brun: "--lrz-faune-brun",
    "brun-roux": "--lrz-faune-brun-roux",
    "brun-fonce": "--lrz-faune-brun-fonce",
    jaune: "--lrz-faune-jaune",
    orange: "--lrz-faune-orange",
    "orange-cuivre": "--lrz-faune-orange-cuivre",
    roux: "--lrz-faune-roux",
    rouge: "--lrz-faune-rouge",
    vert: "--lrz-faune-vert",
    "vert-vif": "--lrz-faune-vert-vif",
    "vert-olive": "--lrz-faune-vert-olive",
    "vert-metallise": "--lrz-faune-vert-metallise",
    bleu: "--lrz-faune-bleu",
    "bleu-gris": "--lrz-faune-bleu-gris",
    "bleu-turquoise": "--lrz-faune-bleu-turquoise",
    "bleu-metallise": "--lrz-faune-bleu-metallise",
    pierre: "--lrz-patrimoine-pierre",
    ardoise: "--lrz-patrimoine-ardoise",
    brique: "--lrz-patrimoine-brique",
    tuffeau: "--lrz-patrimoine-tuffeau",
};

export const LRZ_COLOR_NAMES = Object.keys(LRZ_COLOR_VARIABLES) as LRZColor[];
