import { z } from "zod";

import { LRZ_COLOR_NAMES, type LRZColor } from "@/registry/colors";

import { baseMetaShape, slugSchema, stringArraySchema } from "./common";

const lrzColorSchema = z
    .string()
    .refine(
        (value): value is LRZColor =>
            LRZ_COLOR_NAMES.includes(value as LRZColor),
        { message: "Couleur LRZ inconnue" },
    );

export const territoireEntrySchema = z
    .object({
        slug: slugSchema,
        ordre: z.number().int().positive(),
        nom: z.string().min(1),
        sousTitre: z.string().min(1),
        description: z.string().min(1),
        presentationMd: z.string().min(1),
        nature: z.enum([
            "duché",
            "comté",
            "province",
            "pays historique",
            "territoire éditorial",
        ]),
        paysage: z.enum([
            "val amont",
            "val royal",
            "val occidental",
            "estuaire",
        ]),
        reperes: stringArraySchema,
        coursEau: stringArraySchema,
        limites: z
            .object({
                amont: z.string().min(1),
                aval: z.string().min(1),
                note: z.string().min(1).optional(),
            })
            .strict(),
        identite: z
            .object({
                mark: z.string().min(1),
                accent: z.string().regex(/^#[0-9a-f]{6}$/i),
                color: lrzColorSchema,
                symboles: stringArraySchema,
            })
            .strict(),
    })
    .strict();

export const territoireCatalogSchema = z
    .object({
        meta: z
            .object({
                ...baseMetaShape,
                nombreEntrees: z.number().int().nonnegative(),
                ordre: z.string().min(1),
            })
            .strict(),
        territoires: z.array(territoireEntrySchema),
    })
    .strict();

export type ValidatedTerritoireEntry = z.infer<typeof territoireEntrySchema>;
