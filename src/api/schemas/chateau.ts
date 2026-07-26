import { z } from "zod";
import {
    baseMetaShape,
    coordinatesSchema,
    customEmojiSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

const chateauIllustrationSchema = z
    .string()
    .startsWith("/illustrations/chateaux/");

const chateauIllustrationVariantSchema = z
    .object({
        aube: chateauIllustrationSchema.optional(),
        jour: chateauIllustrationSchema.optional(),
        soir: chateauIllustrationSchema.optional(),
        nuit: chateauIllustrationSchema.optional(),
    })
    .strict();

export const chateauEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: customEmojiSchema("chateau").optional(),
        illustrationVariant: chateauIllustrationVariantSchema.optional(),
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
            "inconnu",
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
