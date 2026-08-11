import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/catalogue-faune.json";
import floreData from "@data/catalogue-flore.json";
import guinguetteData from "@data/catalogue-guinguettes.json";
import motData from "@data/catalogue-mots.json";
import patrimoineData from "@data/catalogue-patrimoine.json";
import personnageData from "@data/catalogue-personnages.json";
import territoireData from "@data/catalogue-territoires.json";
import vignobleData from "@data/catalogue-vignobles.json";
import type { z } from "zod";
import {
    adaptChateau,
    adaptFaune,
    adaptFlore,
    adaptGuinguette,
    adaptMot,
    adaptPatrimoine,
    adaptPersonnage,
    adaptTerritoire,
    adaptVignoble,
    type EntryAdapter,
} from "@/api/adapters";
import {
    chateauCatalogSchema,
    fauneCatalogSchema,
    floreCatalogSchema,
    guinguetteCatalogSchema,
    motCatalogSchema,
    patrimoineCatalogSchema,
    personnageCatalogSchema,
    territoireCatalogSchema,
    vignobleCatalogSchema,
} from "@/api/schemas";
import type { IndexSlug } from "@/registry/indexes";

export interface TechnicalIndexSource {
    slug: IndexSlug;
    dataFile: string;
    collectionKey: string;
    raw: unknown;
    schema: z.ZodType;
    adapter: EntryAdapter;
    mediaDirectory: string;
    /** Whether every entry must expose the legacy `customEmoji` field. */
    mediaRequired?: boolean;
}

export const TECHNICAL_INDEX_SOURCES: readonly TechnicalIndexSource[] = [
    {
        slug: "faune",
        dataFile: "catalogue-faune.json",
        collectionKey: "especes",
        raw: fauneData,
        schema: fauneCatalogSchema,
        adapter: adaptFaune as EntryAdapter,
        mediaDirectory: "faune",
    },
    {
        slug: "flore",
        dataFile: "catalogue-flore.json",
        collectionKey: "flore",
        raw: floreData,
        schema: floreCatalogSchema,
        adapter: adaptFlore as EntryAdapter,
        mediaDirectory: "flore",
    },
    {
        slug: "chateaux",
        dataFile: "catalogue-chateaux.json",
        collectionKey: "chateaux",
        raw: chateauData,
        schema: chateauCatalogSchema,
        adapter: adaptChateau as EntryAdapter,
        mediaDirectory: "chateau",
        mediaRequired: false,
    },
    {
        slug: "guinguettes",
        dataFile: "catalogue-guinguettes.json",
        collectionKey: "guinguettes",
        raw: guinguetteData,
        schema: guinguetteCatalogSchema,
        adapter: adaptGuinguette as EntryAdapter,
        mediaDirectory: "guinguette",
        mediaRequired: false,
    },
    {
        slug: "territoires",
        dataFile: "catalogue-territoires.json",
        collectionKey: "territoires",
        raw: territoireData,
        schema: territoireCatalogSchema,
        adapter: adaptTerritoire as EntryAdapter,
        mediaDirectory: "blasons",
        mediaRequired: false,
    },
    {
        slug: "personnages",
        dataFile: "catalogue-personnages.json",
        collectionKey: "personnages",
        raw: personnageData,
        schema: personnageCatalogSchema,
        adapter: adaptPersonnage as EntryAdapter,
        mediaDirectory: "personnage",
        mediaRequired: false,
    },
    {
        slug: "vignobles",
        dataFile: "catalogue-vignobles.json",
        collectionKey: "vignobles",
        raw: vignobleData,
        schema: vignobleCatalogSchema,
        adapter: adaptVignoble as EntryAdapter,
        mediaDirectory: "vignoble",
        mediaRequired: false,
    },
    {
        slug: "vocabulaire",
        dataFile: "catalogue-mots.json",
        collectionKey: "mots",
        raw: motData,
        schema: motCatalogSchema,
        adapter: adaptMot as EntryAdapter,
        mediaDirectory: "mot",
    },
    {
        slug: "patrimoine",
        dataFile: "catalogue-patrimoine.json",
        collectionKey: "patrimoine",
        raw: patrimoineData,
        schema: patrimoineCatalogSchema,
        adapter: adaptPatrimoine as EntryAdapter,
        mediaDirectory: "patrimoine",
    },
] as const;
