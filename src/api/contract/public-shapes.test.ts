import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { GET as getApiRoot } from "@/app/api/v1/route";
import { GET as getIndexes } from "@/app/api/v1/indexes/route";
import { GET as getIndex } from "@/app/api/v1/indexes/[index]/route";
import { GET as getEntries } from "@/app/api/v1/indexes/[index]/entries/route";
import { GET as getEntry } from "@/app/api/v1/indexes/[index]/entries/[slug]/route";
import {
    getPublishedEntries,
    getPublishedIndexes,
} from "@/api/publication/registry";
import { publicCollectionShape, publicShape } from "./public-shapes";

process.env.SITE_URL = "https://example.test";

type JsonObject = Record<string, unknown>;

const contract = JSON.parse(
    readFileSync(
        join(process.cwd(), "public", "api", "v1", "openapi.json"),
        "utf8",
    ),
) as JsonObject;
const asObject = (value: unknown) => value as JsonObject;
const components = asObject(contract.components);
const schemas = asObject(components.schemas) as Record<string, JsonObject>;
const schemaContext = (name: string) => ({
    root: contract,
    schema: schemas[name],
});
const resolveSchema = (schema: JsonObject): JsonObject => {
    if (typeof schema.$ref !== "string") return schema;
    let value: unknown = contract;
    for (const key of schema.$ref.slice(2).split("/")) {
        value = asObject(value)[key];
    }
    return asObject(value);
};

const request = new Request("https://example.test/api/v1");
const context = <T extends Record<string, string>>(params: T) =>
    ({ params: Promise.resolve(params) }) as never;

const publishedIndexes = getPublishedIndexes();
const entriesByIndex = new Map(
    publishedIndexes.map(({ slug }) => [slug, getPublishedEntries(slug) ?? []]),
);

let apiRoot: JsonObject;
let indexCollection: JsonObject;
let indexDetail: JsonObject;
let entryCollection: JsonObject;
let notFound: JsonObject;
const detailsByIndex = new Map<string, JsonObject[]>();

beforeAll(async () => {
    apiRoot = asObject(await (await getApiRoot()).json());
    indexCollection = asObject(await (await getIndexes()).json());

    const firstIndex = publishedIndexes[0].slug;
    indexDetail = asObject(
        await getIndex(request, context({ index: firstIndex })).then(
            (response) => response.json(),
        ),
    );
    entryCollection = asObject(
        await getEntries(request, context({ index: firstIndex })).then(
            (response) => response.json(),
        ),
    );
    notFound = asObject(
        await getEntry(
            request,
            context({ index: firstIndex, slug: "entree-inconnue" }),
        ).then((response) => response.json()),
    );

    for (const { slug: index } of publishedIndexes) {
        const details: JsonObject[] = [];
        for (const entry of entriesByIndex.get(index) ?? []) {
            details.push(
                asObject(
                    await getEntry(
                        request,
                        context({ index, slug: entry.slug }),
                    ).then((response) => response.json()),
                ),
            );
        }
        detailsByIndex.set(index, details);
    }
});

describe("public structural signatures", () => {
    it("snapshots the API root envelope", () => {
        expect(
            publicShape(apiRoot, schemaContext("ApiRootResponse")),
        ).toMatchSnapshot();
    });

    it("snapshots a published index", () => {
        expect(
            publicShape(indexDetail.data, schemaContext("PublicIndex")),
        ).toMatchSnapshot();
    });

    it("snapshots the index collection envelope", () => {
        expect(
            publicShape(
                indexCollection,
                schemaContext("IndexCollectionResponse"),
            ),
        ).toMatchSnapshot();
    });

    it("snapshots an entry collection envelope", () => {
        expect(
            publicShape(
                entryCollection,
                schemaContext("EntryCollectionResponse"),
            ),
        ).toMatchSnapshot();
    });

    it("snapshots the common entry foundation", () => {
        const commonEntries = [...detailsByIndex.values()]
            .flat()
            .map(({ data }) => {
                const entry = asObject(data);
                return {
                    id: entry.id,
                    index: entry.index,
                    slug: entry.slug,
                    name: entry.name,
                    subtitle: entry.subtitle,
                    summary: entry.summary,
                    media: entry.media,
                };
            });

        expect(
            publicCollectionShape(commonEntries, schemaContext("PublicEntry")),
        ).toMatchSnapshot();
    });

    for (const { slug: index } of publishedIndexes) {
        it(`snapshots ${index} attributes`, () => {
            const attributes = (detailsByIndex.get(index) ?? []).map(
                ({ data }) => asObject(data).attributes,
            );
            const publicEntry = schemas.PublicEntry;
            const discriminator = asObject(publicEntry.discriminator);
            const mapping = asObject(discriminator.mapping);
            const entrySchema = resolveSchema({ $ref: mapping[index] });
            const properties = asObject(entrySchema.properties);
            const attributesSchema = properties.attributes;

            expect(
                publicCollectionShape(attributes, {
                    root: contract,
                    schema: attributesSchema,
                }),
            ).toMatchSnapshot();
        });
    }

    it("snapshots public links", () => {
        const links = [
            apiRoot.links,
            indexCollection.links,
            indexDetail.links,
            entryCollection.links,
            ...[...detailsByIndex.values()].flat().map(({ links }) => links),
        ];

        expect(publicCollectionShape(links)).toMatchSnapshot();
    });

    it("snapshots a public 404 problem", () => {
        expect(
            publicShape(notFound, schemaContext("Problem")),
        ).toMatchSnapshot();
    });
});

describe("structural signature normalization", () => {
    it("ignores editorial values, order, duplicates and collection length", () => {
        const first = [
            { name: "Héron", links: { self: "https://one.test" }, rank: 1 },
            { name: "Loutre", links: { self: "https://two.test" }, rank: 2 },
        ];
        const second = [
            {
                rank: 99,
                links: { self: "https://changed.test" },
                name: "Castor",
            },
        ];

        expect(publicCollectionShape(first)).toEqual(
            publicCollectionShape(second),
        );
    });

    it("keeps nullable and optional structure visible", () => {
        expect(
            publicCollectionShape([
                { summary: null, note: "visible" },
                { summary: "text" },
            ]),
        ).toEqual({
            note: { oneOf: ["absent", "string"] },
            summary: { oneOf: ["null", "string"] },
        });
    });

    it("changes when a structural field is added", () => {
        const baseline = publicCollectionShape([{ slug: "heron" }]);
        const changed = publicCollectionShape([
            { slug: "heron", scientificName: "Ardea cinerea" },
        ]);

        expect(changed).not.toEqual(baseline);
    });

    it.each([
        [
            "license removal",
            { meta: { license: { content: "value" } } },
            { meta: {} },
        ],
        ["slug rename", { slug: "heron" }, { id: "heron" }],
        ["numeric type change", { entryCount: 49 }, { entryCount: "49" }],
    ])("detects a %s", (_name, baseline, changed) => {
        expect(publicShape(changed)).not.toEqual(publicShape(baseline));
    });

    it("canonicalizes contractually nullable editorial values", () => {
        const indexContext = schemaContext("PublicIndex");
        expect(
            publicShape({ editorialWarning: "Texte éditorial" }, indexContext),
        ).toEqual(publicShape({ editorialWarning: null }, indexContext));

        const entryContext = schemaContext("PublicEntry");
        expect(
            publicShape(
                { index: "chateaux", summary: "Texte éditorial" },
                entryContext,
            ),
        ).toEqual(
            publicShape({ index: "chateaux", summary: null }, entryContext),
        );
    });
});
