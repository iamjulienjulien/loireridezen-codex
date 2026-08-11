import { z } from "zod";
import {
    baseMetaShape,
    publicIllustrationSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

export const fauneColorSchema = z.enum([
    "argent",
    "beige",
    "blanc",
    "blanc gris",
    "bleu",
    "bleu gris",
    "bleu métallique",
    "bleu turquoise",
    "brun",
    "brun foncé",
    "brun roux",
    "crème",
    "fauve",
    "gris",
    "gris ardoise",
    "gris brun",
    "jaune",
    "noir",
    "ocre",
    "orange",
    "orange cuivré",
    "rouge",
    "roux",
    "vert",
    "vert métallique",
    "vert olive",
    "vert vif",
]);

export const fauneEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: publicIllustrationSchema("faune").optional(),
        slug: slugSchema,
        type: z.enum([
            "oiseau",
            "mammifère",
            "poisson",
            "reptile",
            "amphibien",
            "insecte",
        ]),
        nomCommun: z.string(),
        autresNoms: stringArraySchema,
        nomScientifique: z.string(),
        regne: z.string(),
        classe: z.string(),
        famille: z.string(),
        rangTaxinomique: z.string(),
        identification: z
            .object({
                longueur: z.string().optional(),
                hauteur: z.string().optional(),
                envergure: z.string().optional(),
                poids: z.string().optional(),
                silhouette: z.string(),
                couleurs: z.array(fauneColorSchema),
                dimorphisme: z.string(),
            })
            .strict(),
        conservation: z
            .object({
                monde: z.enum(["LC", "NT", "VU", "EN", "CR", "NA"]),
                france: z.enum(["LC", "NT", "VU", "EN", "CR", "NA"]),
                note: z.string().optional(),
            })
            .strict(),
        rarete: z.enum(["commun", "régulier", "rare", "trésor"]),
        milieu: z.string(),
        periode: z.string(),
        sousTitre: z.string(),
        taille: z.string().optional(),
        poids: z.string().optional(),
        longevite: z.string().optional(),
        regime: z.string().optional(),
        anecdote: z.string().optional(),
        rectEmoji: z.boolean().optional(),
    })
    .strict();

export const fauneCatalogSchema = z
    .object({
        meta: z.object(baseMetaShape).strict(),
        especes: z.array(fauneEntrySchema),
    })
    .strict();

export type ValidatedFauneEntry = z.infer<typeof fauneEntrySchema>;
