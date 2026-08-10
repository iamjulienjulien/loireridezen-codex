import chateauData from "@data/catalogue-chateaux.json";
import fauneData from "@data/faune.json";
import floreData from "@data/flore.json";
import guinguetteData from "@data/catalogue-guinguettes.json";
import motData from "@data/mot.json";
import patrimoineData from "@data/patrimoine.json";
import personnageData from "@data/catalogue-personnages.json";
import territoireData from "@data/catalogue-territoires.json";
import vignobleData from "@data/vignoble.json";
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
        dataFile: "faune.json",
        collectionKey: "especes",
        raw: fauneData,
        schema: fauneCatalogSchema,
        adapter: adaptFaune as EntryAdapter,
        mediaDirectory: "faune",
    },
    {
        slug: "flore",
        dataFile: "flore.json",
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
        dataFile: "vignoble.json",
        collectionKey: "vignobles",
        raw: vignobleData,
        schema: vignobleCatalogSchema,
        adapter: adaptVignoble as EntryAdapter,
        mediaDirectory: "vignoble",
        mediaRequired: false,
    },
    {
        slug: "vocabulaire",
        dataFile: "mot.json",
        collectionKey: "mots",
        raw: motData,
        schema: motCatalogSchema,
        adapter: adaptMot as EntryAdapter,
        mediaDirectory: "mot",
    },
    {
        slug: "patrimoine",
        dataFile: "patrimoine.json",
        collectionKey: "patrimoine",
        raw: patrimoineData,
        schema: patrimoineCatalogSchema,
        adapter: adaptPatrimoine as EntryAdapter,
        mediaDirectory: "patrimoine",
    },
] as const;
