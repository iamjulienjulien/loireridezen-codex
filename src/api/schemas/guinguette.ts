import { z } from "zod";
import { isTerritoireSlug } from "@/registry/territoires";
import { baseMetaShape, slugSchema, stringArraySchema } from "./common";

const nullableBooleanSchema = z.boolean().nullable();

export const guinguetteEntrySchema = z
    .object({
        slug: slugSchema,
        nom: z.string().min(1),
        autresNoms: stringArraySchema,
        sousTitre: z.string().min(1).nullable(),
        commune: z.string().min(1),
        communeDeleguee: z.string().min(1).nullable(),
        departement: z.string().min(1),
        territoire: z.string().refine(isTerritoireSlug, {
            message: "Territoire ligérien inconnu",
        }),
        coursDEau: z.string().min(1).nullable(),
        type: z.enum([
            "guinguette",
            "restaurant-guinguette",
            "bar-guinguette",
            "guinguette-itinerante",
        ]),
        ambiance: stringArraySchema,
        terrasse: nullableBooleanSchema,
        musiqueLive: nullableBooleanSchema,
        accessibleVelo: nullableBooleanSchema,
        loireAVelo: nullableBooleanSchema,
        vue: z.string().min(1),
        periode: z.string().min(1),
        position: z
            .object({
                latitude: z.number().min(-90).max(90).nullable(),
                longitude: z.number().min(-180).max(180).nullable(),
            })
            .strict(),
        liens: z
            .object({
                siteWeb: z.string().min(1).nullable(),
                instagram: z.string().min(1).nullable(),
                facebook: z.string().min(1).nullable(),
                googleMaps: z.string().min(1).nullable(),
            })
            .strict(),
        description: z.string().min(1),
        services: stringArraySchema,
        tags: stringArraySchema,
        statut: z.enum(["actif", "a_verifier", "historique"]),
        verification: z.string().min(1),
    })
    .strict();

export const guinguetteCatalogSchema = z
    .object({
        meta: z
            .object({
                ...baseMetaShape,
                nombreEntrees: z.number().int().nonnegative(),
                departements: z.array(
                    z
                        .object({
                            nom: z.string().min(1),
                            code: z.string().min(1),
                        })
                        .strict(),
                ),
            })
            .strict(),
        guinguettes: z.array(guinguetteEntrySchema),
    })
    .strict();

export type ValidatedGuinguetteEntry = z.infer<typeof guinguetteEntrySchema>;
