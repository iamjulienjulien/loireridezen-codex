import { z } from "zod";
import { isCommonArchitecture } from "@/registry/Meta/common-architecture";
import { isCommonEpoque } from "@/registry/Meta/common-epoque";
import { isCommonExperience } from "@/registry/Meta/common-experience";
import {
    baseMetaShape,
    coordinatesSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

const chateauIllustrationSchema = z
    .string()
    .startsWith("/illustrations/chateaux/");

const chateauIllustrationsSchema = z
    .object({
        aube: chateauIllustrationSchema,
        jour: chateauIllustrationSchema,
        soir: chateauIllustrationSchema,
        nuit: chateauIllustrationSchema,
    })
    .strict();

const architectureSchema = z
    .string()
    .refine(isCommonArchitecture, "Unknown common architecture slug");
const epoqueSchema = z
    .string()
    .refine(isCommonEpoque, "Unknown common period slug");
const experienceSchema = z
    .string()
    .refine(isCommonExperience, "Unknown common experience slug");

export const chateauEntrySchema = z
    .object({
        slug: slugSchema,
        nom: z.string(),
        autresNoms: stringArraySchema,
        sousTitre: z.string(),
        resume: z.string().optional(),
        commune: z.string(),
        departement: z.string(),
        coordonnees: coordinatesSchema,
        riviere: z.string(),
        illustrations: chateauIllustrationsSchema,
        meta: z
            .object({
                architecture: z.array(architectureSchema),
                epoque: z.array(epoqueSchema),
                experience: z.array(experienceSchema),
            })
            .strict(),
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
