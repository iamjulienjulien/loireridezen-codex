import type {
    ValidatedChateauEntry,
    ValidatedFauneEntry,
    ValidatedFloreEntry,
    ValidatedMotEntry,
    ValidatedPatrimoineEntry,
    ValidatedVignobleEntry,
} from "@/api/schemas";
import { getSiteUrl } from "@/api/site-url";
import type { PublicEntry } from "@/api/types";
import type { IndexSlug } from "@/registry/indexes";

export type InternalEntry =
    | ValidatedChateauEntry
    | ValidatedFauneEntry
    | ValidatedFloreEntry
    | ValidatedMotEntry
    | ValidatedPatrimoineEntry
    | ValidatedVignobleEntry;

export type EntryAdapter<T extends InternalEntry = InternalEntry> = (
    entry: T,
) => PublicEntry;

const media = (emoji: string, customEmoji?: string) => ({
    emoji,
    imageUrl: customEmoji ? `${getSiteUrl()}${customEmoji}` : null,
});

const identity = (index: IndexSlug, slug: string) => `${index}:${slug}`;

export const adaptFaune: EntryAdapter<ValidatedFauneEntry> = (entry) => {
    const {
        emoji,
        customEmoji,
        slug,
        nomCommun,
        sousTitre,
        autresNoms,
        ...attributes
    } = entry;
    return {
        id: identity("faune", slug),
        index: "faune",
        slug,
        name: nomCommun,
        subtitle: sousTitre,
        summary: null,
        media: media(emoji, customEmoji),
        attributes: { autresNoms, ...attributes },
    };
};

export const adaptFlore: EntryAdapter<ValidatedFloreEntry> = (entry) => {
    const {
        emoji,
        customEmoji,
        slug,
        nomCommun,
        sousTitre,
        autresNoms,
        ...attributes
    } = entry;
    return {
        id: identity("flore", slug),
        index: "flore",
        slug,
        name: nomCommun,
        subtitle: sousTitre,
        summary: null,
        media: media(emoji, customEmoji),
        attributes: { autresNoms, ...attributes },
    };
};

export const adaptChateau: EntryAdapter<ValidatedChateauEntry> = (entry) => {
    const {
        emoji,
        customEmoji,
        slug,
        nom,
        sousTitre,
        resume,
        autresNoms,
        ...attributes
    } = entry;
    return {
        id: identity("chateaux", slug),
        index: "chateaux",
        slug,
        name: nom,
        subtitle: sousTitre,
        summary: resume ?? null,
        media: media(emoji, customEmoji),
        attributes: { autresNoms, ...attributes },
    };
};

export const adaptVignoble: EntryAdapter<ValidatedVignobleEntry> = (entry) => {
    const {
        emoji,
        customEmoji,
        slug,
        nom,
        sousTitre,
        resume,
        autresNoms,
        ...attributes
    } = entry;
    return {
        id: identity("vignobles", slug),
        index: "vignobles",
        slug,
        name: nom,
        subtitle: sousTitre,
        summary: resume ?? null,
        media: media(emoji, customEmoji),
        attributes: { autresNoms, ...attributes },
    };
};

export const adaptMot: EntryAdapter<ValidatedMotEntry> = (entry) => {
    const {
        emoji,
        customEmoji,
        slug,
        terme,
        sousTitre,
        definition,
        autresFormes,
        ...attributes
    } = entry;
    return {
        id: identity("vocabulaire", slug),
        index: "vocabulaire",
        slug,
        name: terme,
        subtitle: sousTitre,
        summary: definition,
        media: media(emoji, customEmoji),
        attributes: { autresFormes, ...attributes },
    };
};

export const adaptPatrimoine: EntryAdapter<ValidatedPatrimoineEntry> = (
    entry,
) => {
    const {
        emoji,
        customEmoji,
        slug,
        nom,
        sousTitre,
        resume,
        autresNoms,
        ...attributes
    } = entry;
    return {
        id: identity("patrimoine", slug),
        index: "patrimoine",
        slug,
        name: nom,
        subtitle: sousTitre,
        summary: resume ?? null,
        media: media(emoji, customEmoji),
        attributes: { autresNoms, ...attributes },
    };
};
