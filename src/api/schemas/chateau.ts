import { z } from "zod";
import {
    baseMetaShape,
    coordinatesSchema,
    customEmojiSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

export const chateauEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: customEmojiSchema("chateau").optional(),
        slug: slugSchema,
        nom: z.string(),
        autresNoms: stringArraySchema,
        sousTitre: z.string(),
        resume: z.string().optional(),
        commune: z.string(),
        departement: z.string(),
        coordonnees: coordinatesSchema,
        riviere: z.string(),
        epoque: z.enum(["Médiéval", "Renaissance", "Classique", "Éclectique"]),
        style: z.string(),
        construction: z.string(),
        commanditaire: z.string().optional(),
        protection: z
            .object({
                monumentHistorique: z.enum(["classé", "inscrit", "aucune"]),
                unesco: z.boolean(),
                note: z.string().optional(),
            })
            .strict(),
        renommee: z.enum(["phare", "majeur", "notable", "confidentiel"]),
        visite: z.enum([
            "ouvert au public",
            "extérieurs & parc",
            "privé, non visitable",
        ]),
    })
    .strict();

export const chateauCatalogSchema = z
    .object({
        meta: z.object({ ...baseMetaShape, ordre: z.string() }).strict(),
        chateaux: z.array(chateauEntrySchema),
    })
    .strict();

export type ValidatedChateauEntry = z.infer<typeof chateauEntrySchema>;
