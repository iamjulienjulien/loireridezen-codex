import { z } from "zod";
import {
    baseMetaShape,
    publicIllustrationSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

export const motEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: publicIllustrationSchema("vocabulaire").optional(),
        slug: slugSchema,
        terme: z.string(),
        autresFormes: stringArraySchema,
        genre: z.enum(["masculin", "féminin", "—"]),
        sousTitre: z.string(),
        categorie: z.enum(["relief", "bateau", "ouvrage", "métier", "eau"]),
        definition: z.string(),
        etymologie: z.string().optional(),
        exemple: z.string().optional(),
        usage: z.enum(["vivant", "rare", "oublié"]),
        registre: z.enum(["courant", "technique", "toponymique"]),
    })
    .strict();

export const motCatalogSchema = z
    .object({
        meta: z.object({ ...baseMetaShape, categories: z.string() }).strict(),
        mots: z.array(motEntrySchema),
    })
    .strict();

export type ValidatedMotEntry = z.infer<typeof motEntrySchema>;
