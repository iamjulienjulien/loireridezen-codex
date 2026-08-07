import {
    defineCollectionMetaRegistry,
    getCollectionMeta,
    isCollectionMetaSlug,
} from "@/registry/Meta/registry";

/** Registre des index du Codex disposant d’un symbole illustré. */
export const CODEX_INDEX_REGISTRY = defineCollectionMetaRegistry({
    chateaux: {
        label: "Châteaux",
        color: "ocre",
    },
    faune: {
        label: "Faune",
        color: "eau",
    },
    flore: {
        label: "Flore",
        color: "prairie",
    },
    guinguettes: {
        label: "Guinguettes",
        color: "brique",
    },
});

export type CodexIndex = keyof typeof CODEX_INDEX_REGISTRY;

export type CodexIndexMeta = (typeof CODEX_INDEX_REGISTRY)[CodexIndex];

/** Liste ordonnée des index illustrés du Codex. */
export const CODEX_INDEX_META = Object.freeze(
    Object.values(CODEX_INDEX_REGISTRY),
);

export function isCodexIndex(value: string): value is CodexIndex {
    return isCollectionMetaSlug(CODEX_INDEX_REGISTRY, value);
}

export function getCodexIndexMeta(slug: string): CodexIndexMeta | undefined {
    return getCollectionMeta(CODEX_INDEX_REGISTRY, slug);
}
