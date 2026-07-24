import { z } from "zod";
import {
    baseMetaShape,
    coordinatesSchema,
    customEmojiSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

export const patrimoineEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: customEmojiSchema("patrimoine").optional(),
        slug: slugSchema,
        nom: z.string(),
        autresNoms: stringArraySchema,
        sousTitre: z.string(),
        resume: z.string().optional(),
        type: z.enum([
            "moulin",
            "pont",
            "phare",
            "port",
            "eau",
            "artisanal",
            "mémoriel",
            "défensif",
        ]),
        commune: z.string(),
        departement: z.string(),
        coordonnees: coordinatesSchema,
        situation: z.string(),
        epoque: z.string(),
        materiau: z.enum([
            "tuffeau",
            "ardoise",
            "brique",
            "schiste",
            "silex",
            "bois",
            "métal",
            "mixte",
        ]),
        fonction: z.string(),
        etat: z.enum(["en usage", "restauré", "vestige", "disparu"]),
        protection: z.enum(["classé", "inscrit", "labellisé", "aucune"]),
        note: z.string().optional(),
    })
    .strict();

export const patrimoineCatalogSchema = z
    .object({
        meta: z.object({ ...baseMetaShape, ordre: z.string() }).strict(),
        patrimoine: z.array(patrimoineEntrySchema),
    })
    .strict();

export type ValidatedPatrimoineEntry = z.infer<typeof patrimoineEntrySchema>;
