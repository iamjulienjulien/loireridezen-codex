import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/** Registre officiel de la métadonnée `cepage` de la collection Vignobles. */
export const VIGNOBLE_CEPAGE_REGISTRY = defineCollectionMetaRegistry({
    chenin: { label: "Chenin", color: "jaune-paille" },
    "sauvignon-blanc": { label: "Sauvignon blanc", color: "vert-clair" },
    "melon-de-bourgogne": {
        label: "Melon de Bourgogne",
        color: "vert-sauge",
    },
    chardonnay: { label: "Chardonnay", color: "miel" },
    "folle-blanche": { label: "Folle blanche", color: "vert-roseau" },
    romorantin: { label: "Romorantin", color: "ambre" },
    "menu-pineau": { label: "Menu pineau", color: "ocre-clair" },
    tressallier: { label: "Tressallier", color: "jaune" },
    chasselas: { label: "Chasselas", color: "jaune-paille" },
    "cabernet-franc": { label: "Cabernet franc", color: "lie-de-vin" },
    "cabernet-sauvignon": {
        label: "Cabernet sauvignon",
        color: "grenat",
    },
    "pinot-noir": { label: "Pinot noir", color: "prune" },
    "pinot-gris": { label: "Pinot gris", color: "rose-poudre" },
    "pinot-meunier": { label: "Pinot meunier", color: "bleu-nuit" },
    gamay: { label: "Gamay", color: "rose-sauvage" },
    "grolleau-noir": { label: "Grolleau noir", color: "brun-roux" },
    "grolleau-gris": { label: "Grolleau gris", color: "mauve" },
    "pineau-daunis": { label: "Pineau d’Aunis", color: "rouge" },
    cot: { label: "Côt", color: "prune" },
});

export type VignobleCepage = keyof typeof VIGNOBLE_CEPAGE_REGISTRY;

export type VignobleCepageMeta =
    (typeof VIGNOBLE_CEPAGE_REGISTRY)[VignobleCepage];

/** Liste ordonnée des cépages ligériens illustrés. */
export const VIGNOBLE_CEPAGE_META = Object.freeze(
    Object.values(VIGNOBLE_CEPAGE_REGISTRY),
);

export function isVignobleCepage(value: string): value is VignobleCepage {
    return isCollectionMetaSlug(VIGNOBLE_CEPAGE_REGISTRY, value);
}

export function getVignobleCepageMeta(
    slug: string,
): VignobleCepageMeta | undefined {
    return getCollectionMeta(VIGNOBLE_CEPAGE_REGISTRY, slug);
}
