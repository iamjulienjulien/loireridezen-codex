import type {
    ValidatedChateauEntry,
    ValidatedFauneEntry,
    ValidatedFloreEntry,
    ValidatedGuinguetteEntry,
    ValidatedMotEntry,
    ValidatedPatrimoineEntry,
    ValidatedPersonnageEntry,
    ValidatedTerritoireEntry,
    ValidatedVignobleEntry,
} from "@/api/schemas";
import { getSiteUrl } from "@/api/site-url";
import type { PublicEntry } from "@/api/types";
import type { IndexSlug } from "@/registry/indexes";

export type InternalEntry =
    | ValidatedChateauEntry
    | ValidatedFauneEntry
    | ValidatedFloreEntry
    | ValidatedGuinguetteEntry
    | ValidatedMotEntry
    | ValidatedPatrimoineEntry
    | ValidatedPersonnageEntry
    | ValidatedTerritoireEntry
    | ValidatedVignobleEntry;

export type EntryAdapter<T extends InternalEntry = InternalEntry> = (
    entry: T,
) => PublicEntry;

const media = (emoji: string, customEmoji?: string) => ({
    emoji,
    imageUrl: customEmoji ? `${getSiteUrl()}${customEmoji}` : null,
});

export const publicEntryId = (index: IndexSlug, slug: string) =>
    `${index}:${slug}`;

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
        id: publicEntryId("faune", slug),
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
        id: publicEntryId("flore", slug),
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
    const { slug, nom, sousTitre, resume, autresNoms, ...attributes } = entry;
    return {
        id: publicEntryId("chateaux", slug),
        index: "chateaux",
        slug,
        name: nom,
        subtitle: sousTitre,
        summary: resume ?? null,
        media: media("🏰", entry.illustrations.jour),
        attributes: { autresNoms, ...attributes },
    };
};

export const adaptGuinguette: EntryAdapter<ValidatedGuinguetteEntry> = (
    entry,
) => {
    const { slug, nom, sousTitre, description, autresNoms, ...attributes } =
        entry;

    return {
        id: publicEntryId("guinguettes", slug),
        index: "guinguettes",
        slug,
        name: nom,
        subtitle: sousTitre ?? "Guinguette ligérienne",
        summary: description,
        media: media("🍷"),
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
        id: publicEntryId("vignobles", slug),
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
        id: publicEntryId("vocabulaire", slug),
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
        id: publicEntryId("patrimoine", slug),
        index: "patrimoine",
        slug,
        name: nom,
        subtitle: sousTitre,
        summary: resume ?? null,
        media: media(emoji, customEmoji),
        attributes: { autresNoms, ...attributes },
    };
};

export const adaptTerritoire: EntryAdapter<ValidatedTerritoireEntry> = (
    entry,
) => {
    const { slug, nom, sousTitre, description, identite, ...attributes } =
        entry;
    const { mark, blason, ...identityAttributes } = identite;

    return {
        id: publicEntryId("territoires", slug),
        index: "territoires",
        slug,
        name: nom,
        subtitle: sousTitre,
        summary: description,
        media: media(mark, blason),
        attributes: {
            ...attributes,
            identite: identityAttributes,
        },
    };
};

export const adaptPersonnage: EntryAdapter<ValidatedPersonnageEntry> = (
    entry,
) => {
    const {
        slug,
        nom,
        autresNoms,
        roles,
        illustration,
        categoriePrincipale,
        tags,
    } = entry;

    return {
        id: publicEntryId("personnages", slug),
        index: "personnages",
        slug,
        name: nom,
        subtitle: roles[0] ?? "Personnage du Codex Ligérien",
        summary: null,
        media: media("♜", illustration),
        attributes: { autresNoms, roles, categoriePrincipale, tags },
    };
};
