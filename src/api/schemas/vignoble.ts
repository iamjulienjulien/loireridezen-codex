import { z } from "zod";
import {
    baseMetaShape,
    coordinatesSchema,
    customEmojiSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

export const vignobleEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: customEmojiSchema("vignoble").optional(),
        slug: slugSchema,
        nom: z.string(),
        autresNoms: stringArraySchema,
        sousTitre: z.string(),
        resume: z.string().optional(),
        couleur: z.enum([
            "blanc sec",
            "blanc moelleux",
            "rouge",
            "rosé",
            "effervescent",
        ]),
        rive: z.enum([
            "Auvergne & Forez",
            "Centre-Loire",
            "Touraine",
            "Anjou-Saumur",
            "Pays nantais",
        ]),
        departement: z.string(),
        coordonnees: coordinatesSchema,
        cepages: stringArraySchema,
        style: z.string(),
        accord: z.string().optional(),
        appellation: z
            .object({
                niveau: z.enum(["AOC communale", "AOC régionale", "IGP"]),
                depuis: z.string().optional(),
                note: z.string().optional(),
            })
            .strict(),
        notoriete: z.enum(["phare", "majeur", "notable", "confidentiel"]),
    })
    .strict();

export const vignobleCatalogSchema = z
    .object({
        meta: z.object({ ...baseMetaShape, ordre: z.string() }).strict(),
        vignobles: z.array(vignobleEntrySchema),
    })
    .strict();

export type ValidatedVignobleEntry = z.infer<typeof vignobleEntrySchema>;
