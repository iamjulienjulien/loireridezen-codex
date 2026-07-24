import { z } from "zod";
import {
    baseMetaShape,
    customEmojiSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

export const floreEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: customEmojiSchema("flore").optional(),
        slug: slugSchema,
        categorie: z.enum([
            "arbre",
            "arbuste",
            "herbacée",
            "graminée",
            "aquatique",
            "fougère",
            "grimpante",
        ]),
        nomCommun: z.string(),
        autresNoms: stringArraySchema,
        nomScientifique: z.string(),
        regne: z.string(),
        famille: z.string(),
        rangTaxinomique: z.string(),
        statut: z
            .object({
                indigenat: z.enum(["indigène", "exotique", "envahissante"]),
                protection: z.enum(["nationale", "régionale", "aucune"]),
                note: z.string().optional(),
            })
            .strict(),
        rarete: z.enum(["commun", "régulier", "rare", "trésor"]),
        milieu: z.string(),
        floraison: z.string(),
        taille: z.string(),
        sousTitre: z.string(),
        usages: z.string().optional(),
        anecdote: z.string().optional(),
    })
    .strict();

export const floreCatalogSchema = z
    .object({
        meta: z.object({ ...baseMetaShape, categories: z.string() }).strict(),
        flore: z.array(floreEntrySchema),
    })
    .strict();

export type ValidatedFloreEntry = z.infer<typeof floreEntrySchema>;
