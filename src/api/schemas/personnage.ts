import { z } from "zod";

import {
    customEmojiSchema,
    isoDateSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

const relationTypeSchema = z.enum([
    "commande",
    "construction",
    "propriete",
    "residence",
    "sejour",
    "visite",
    "captivite",
    "protection",
    "restauration",
    "inspiration",
    "evocation_litteraire",
    "architecture",
    "performance",
    "inhumation",
    "evenement",
    "fondation",
    "gestion",
    "contexte",
]);

export const personnageEntrySchema = z
    .object({
        id: slugSchema,
        nom: z.string().min(1),
        autresNoms: stringArraySchema,
        categoriePrincipale: slugSchema,
        roles: stringArraySchema,
        tags: stringArraySchema,
        illustration: customEmojiSchema("personnage").optional(),
    })
    .strict()
    .transform((entry) => ({ ...entry, slug: entry.id }));

const personnageRelationSchema = z
    .object({
        personnageId: slugSchema,
        lieuId: slugSchema,
        lieuNom: z.string().min(1),
        types: z.array(relationTypeSchema),
        libelle: z.string().min(1),
        periodeAffichee: z.string().min(1),
        importance: z.enum(["majeur", "notable", "secondaire"]),
        description: z.string().min(1),
        niveauCertitude: z.enum(["etabli", "tradition"]),
    })
    .strict();

export const personnageCatalogSchema = z
    .object({
        meta: z
            .object({
                titre: z.string().min(1),
                source: z.string().min(1),
                corridor: z
                    .string()
                    .min(1)
                    .default("Val de Loire, de l’amont à l’estuaire"),
                maj: isoDateSchema,
                schemaVersion: z.string().min(1),
                description: z.string().min(1),
                nombrePersonnages: z.number().int().nonnegative(),
                nombreRelations: z.number().int().nonnegative(),
                taxonomie: z
                    .object({
                        categories: z.string().min(1),
                        typesRelation: z.array(relationTypeSchema),
                    })
                    .strict(),
            })
            .strict(),
        personnages: z.array(personnageEntrySchema),
        relations: z.array(personnageRelationSchema),
    })
    .strict();

export type ValidatedPersonnageEntry = z.infer<typeof personnageEntrySchema>;
