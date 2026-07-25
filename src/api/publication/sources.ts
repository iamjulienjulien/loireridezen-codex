import chateauData from "@data/chateau.json";
import fauneData from "@data/faune.json";
import floreData from "@data/flore.json";
import motData from "@data/mot.json";
import patrimoineData from "@data/patrimoine.json";
import vignobleData from "@data/vignoble.json";
import type { z } from "zod";
import {
    adaptChateau,
    adaptFaune,
    adaptFlore,
    adaptMot,
    adaptPatrimoine,
    adaptVignoble,
    type EntryAdapter,
} from "@/api/adapters";
import {
    chateauCatalogSchema,
    fauneCatalogSchema,
    floreCatalogSchema,
    motCatalogSchema,
    patrimoineCatalogSchema,
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
        dataFile: "chateau.json",
        collectionKey: "chateaux",
        raw: chateauData,
        schema: chateauCatalogSchema,
        adapter: adaptChateau as EntryAdapter,
        mediaDirectory: "chateau",
    },
    {
        slug: "vignobles",
        dataFile: "vignoble.json",
        collectionKey: "vignobles",
        raw: vignobleData,
        schema: vignobleCatalogSchema,
        adapter: adaptVignoble as EntryAdapter,
        mediaDirectory: "vignoble",
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
