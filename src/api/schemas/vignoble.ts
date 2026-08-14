import { z } from "zod";
import { isTerritoireSlug } from "@/registry/territoires";
import {
    baseMetaShape,
    coordinatesSchema,
    publicIllustrationSchema,
    slugSchema,
    stringArraySchema,
} from "./common";

const territoireSlugSchema = z.string().refine(isTerritoireSlug, {
    message: "Territoire ligérien inconnu",
});

const vignobleMetaSchema = z
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
        territoires: z.array(territoireSlugSchema),
        territoirePrincipal: territoireSlugSchema.optional(),
    })
    .strict()
    .superRefine(({ territoires, territoirePrincipal }, context) => {
        if (new Set(territoires).size !== territoires.length) {
            context.addIssue({
                code: "custom",
                path: ["territoires"],
                message: "Les territoires d’un vignoble doivent être uniques",
            });
        }

        if (
            territoirePrincipal !== undefined &&
            !territoires.includes(territoirePrincipal)
        ) {
            context.addIssue({
                code: "custom",
                path: ["territoirePrincipal"],
                message:
                    "Le territoire principal doit appartenir aux territoires du vignoble",
            });
        }
    });

export const vignobleEntrySchema = z
    .object({
        emoji: z.string(),
        customEmoji: publicIllustrationSchema("vignobles").optional(),
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
        meta: vignobleMetaSchema,
    })
    .strict();

export const vignobleCatalogSchema = z
    .object({
        meta: z.object({ ...baseMetaShape, ordre: z.string() }).strict(),
        vignobles: z.array(vignobleEntrySchema),
    })
    .strict();

export type ValidatedVignobleEntry = z.infer<typeof vignobleEntrySchema>;
