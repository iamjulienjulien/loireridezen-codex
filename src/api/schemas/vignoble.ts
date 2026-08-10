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
        meta: z
            .object({
                terroirs: z
                    .array(
                        z.enum([
                            "tuffeau",
                            "calcaire",
                            "marne-calcaire",
                            "argilo-calcaire",
                            "argile-a-silex",
                            "schiste",
                            "micaschiste",
                            "gneiss",
                            "granite",
                            "gabbro",
                            "sable",
                            "graviers",
                            "alluvions",
                            "faluns",
                        ]),
                    )
                    .min(1),
                cepages: z.array(
                    z.enum([
                        "chenin",
                        "sauvignon-blanc",
                        "melon-de-bourgogne",
                        "chardonnay",
                        "chasselas",
                        "folle-blanche",
                        "romorantin",
                        "menu-pineau",
                        "tressallier",
                        "cabernet-franc",
                        "cabernet-sauvignon",
                        "pinot-noir",
                        "pinot-gris",
                        "pinot-meunier",
                        "gamay",
                        "grolleau-noir",
                        "grolleau-gris",
                        "pineau-daunis",
                        "cot",
                    ]),
                ),
            })
            .strict(),
    })
    .strict();

export const vignobleCatalogSchema = z
    .object({
        meta: z.object({ ...baseMetaShape, ordre: z.string() }).strict(),
        vignobles: z.array(vignobleEntrySchema),
    })
    .strict();

export type ValidatedVignobleEntry = z.infer<typeof vignobleEntrySchema>;
