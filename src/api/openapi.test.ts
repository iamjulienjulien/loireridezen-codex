import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GET as getApiRoot } from "@/app/api/v1/route";
import { PUBLIC_LICENSES } from "@/api/licenses";
import { getPublishedIndexes } from "@/api/publication/registry";

type JsonObject = Record<string, unknown>;

interface Operation {
    operationId?: string;
    responses?: Record<string, JsonObject>;
}

interface PathItem extends JsonObject {
    get: Operation;
    head: Operation;
    options: Operation;
}

interface OpenApiDocument extends JsonObject {
    openapi: string;
    info: JsonObject & { version: string };
    servers: JsonObject[];
    security: unknown[];
    paths: Record<string, PathItem>;
    components: {
        responses: Record<string, JsonObject>;
        schemas: Record<string, JsonObject>;
    };
}

const contractPath = join(process.cwd(), "public", "api", "v1", "openapi.json");
const contract = JSON.parse(
    readFileSync(contractPath, "utf8"),
) as OpenApiDocument;

const expectedOperations = {
    "/api/v1": {
        get: "getApiRoot",
        head: "headApiRoot",
        options: "optionsApiRoot",
    },
    "/api/v1/indexes": {
        get: "listIndexes",
        head: "headIndexes",
        options: "optionsIndexes",
    },
    "/api/v1/indexes/{index}": {
        get: "getIndex",
        head: "headIndex",
        options: "optionsIndex",
    },
    "/api/v1/indexes/{index}/entries": {
        get: "listIndexEntries",
        head: "headIndexEntries",
        options: "optionsIndexEntries",
    },
    "/api/v1/indexes/{index}/entries/{slug}": {
        get: "getIndexEntry",
        head: "headIndexEntry",
        options: "optionsIndexEntry",
    },
} as const;

const asObject = (value: unknown): JsonObject => {
    expect(value).toBeTypeOf("object");
    expect(value).not.toBeNull();
    expect(Array.isArray(value)).toBe(false);
    return value as JsonObject;
};

const resolveResponse = (response: JsonObject) => {
    const reference = response.$ref;
    if (typeof reference !== "string") return response;

    const prefix = "#/components/responses/";
    expect(reference.startsWith(prefix)).toBe(true);
    const name = reference.slice(prefix.length);
    const resolved = contract.components.responses[name];
    expect(resolved).toBeDefined();
    return resolved;
};

const responseContent = (response: JsonObject) =>
    asObject(resolveResponse(response).content ?? {});

const collectPropertyNames = (value: unknown, names: Set<string>) => {
    if (Array.isArray(value)) {
        value.forEach((item) => collectPropertyNames(item, names));
        return;
    }
    if (!value || typeof value !== "object") return;

    for (const [key, child] of Object.entries(value)) {
        if (key === "properties") {
            Object.keys(asObject(child)).forEach((name) => names.add(name));
        }
        collectPropertyNames(child, names);
    }
};

describe("public OpenAPI contract", () => {
    it("is parseable OpenAPI 3.1.2 with the expected public metadata", () => {
        expect(contract.openapi).toBe("3.1.2");
        expect(contract.info.version).toBe("1.0.0");
        expect(contract.servers).toEqual([
            {
                url: "https://codex.loireridezen.bike",
                description: "Production",
            },
        ]);
        expect(contract.security).toEqual([]);
    });

    it("documents the five paths and fifteen unique operations", () => {
        expect(Object.keys(contract.paths)).toEqual(
            Object.keys(expectedOperations),
        );

        const operationIds = Object.entries(expectedOperations).flatMap(
            ([path, methods]) =>
                Object.entries(methods).map(([method, operationId]) => {
                    const operation = contract.paths[path][
                        method as keyof typeof methods
                    ] as Operation;
                    expect(operation.operationId).toBe(operationId);
                    return operation.operationId;
                }),
        );

        expect(new Set(operationIds).size).toBe(15);
    });

    it("keeps the published index enum synchronized with the registry", () => {
        const schema = contract.components.schemas.PublishedIndexSlug;
        const documented = schema.enum as string[];
        const published = getPublishedIndexes().map(({ slug }) => slug);

        expect(documented).toEqual(published);
    });

    it("uses seven strict entry variants and an explicit discriminator", () => {
        const entry = contract.components.schemas.PublicEntry;
        const discriminator = asObject(entry.discriminator);

        expect(entry.oneOf).toEqual([
            { $ref: "#/components/schemas/FauneEntry" },
            { $ref: "#/components/schemas/FloreEntry" },
            { $ref: "#/components/schemas/ChateauEntry" },
            { $ref: "#/components/schemas/GuinguetteEntry" },
            { $ref: "#/components/schemas/TerritoireEntry" },
            { $ref: "#/components/schemas/PersonnageEntry" },
            { $ref: "#/components/schemas/VignobleEntry" },
        ]);
        expect(discriminator.propertyName).toBe("index");
        expect(discriminator.mapping).toEqual({
            faune: "#/components/schemas/FauneEntry",
            flore: "#/components/schemas/FloreEntry",
            chateaux: "#/components/schemas/ChateauEntry",
            guinguettes: "#/components/schemas/GuinguetteEntry",
            territoires: "#/components/schemas/TerritoireEntry",
            personnages: "#/components/schemas/PersonnageEntry",
            vignobles: "#/components/schemas/VignobleEntry",
        });

        for (const name of [
            "FauneEntry",
            "FauneAttributes",
            "FloreEntry",
            "FloreAttributes",
            "ChateauEntry",
            "ChateauAttributes",
            "GuinguetteEntry",
            "GuinguetteAttributes",
            "TerritoireEntry",
            "TerritoireAttributes",
            "PersonnageEntry",
            "PersonnageAttributes",
            "VignobleEntry",
            "VignobleAttributes",
        ]) {
            expect(contract.components.schemas[name].additionalProperties).toBe(
                false,
            );
        }
    });

    it("publishes vineyard territories without duplicating their inverse", () => {
        const vignobleMeta = contract.components.schemas.VignobleMeta;
        const vignobleProperties = asObject(vignobleMeta.properties);
        const territoireAttributes =
            contract.components.schemas.TerritoireAttributes;
        const territoireProperties = asObject(territoireAttributes.properties);

        expect(vignobleMeta.required).not.toContain("territoires");
        expect(vignobleProperties).toHaveProperty("territoires");
        expect(vignobleProperties).toHaveProperty("territoirePrincipal");
        expect(territoireProperties).not.toHaveProperty("vignobles");
    });

    it("documents JSON successes and Problem Details errors", () => {
        for (const path of Object.keys(expectedOperations)) {
            const responses = contract.paths[path].get.responses ?? {};
            const success = responses["200"];
            expect(success).toBeDefined();
            expect(responseContent(success)).toHaveProperty("application/json");

            if (path.includes("{")) {
                const notFound = responses["404"];
                expect(notFound).toBeDefined();
                expect(responseContent(notFound)).toHaveProperty(
                    "application/problem+json",
                );
            }

            const internalError = responses["500"];
            expect(internalError).toBeDefined();
            expect(responseContent(internalError)).toHaveProperty(
                "application/problem+json",
            );
        }
    });

    it("documents bodyless HEAD and OPTIONS responses", () => {
        for (const pathItem of Object.values(contract.paths)) {
            for (const response of Object.values(
                pathItem.head.responses ?? {},
            )) {
                expect(resolveResponse(response)).not.toHaveProperty("content");
            }

            expect(Object.keys(pathItem.options.responses ?? {})).toEqual([
                "204",
            ]);
            expect(
                resolveResponse(pathItem.options.responses?.["204"] ?? {}),
            ).not.toHaveProperty("content");
        }
    });

    it("keeps the documented licenses synchronized with runtime constants", () => {
        const content = asObject(
            contract.components.schemas.ContentLicense.properties,
        );
        const media = asObject(
            contract.components.schemas.MediaLicense.properties,
        );

        expect(asObject(content.id).const).toBe(PUBLIC_LICENSES.content.id);
        expect(asObject(content.name).const).toBe(PUBLIC_LICENSES.content.name);
        expect(asObject(content.url).const).toBe(PUBLIC_LICENSES.content.url);
        expect(asObject(content.attribution).const).toBe(
            PUBLIC_LICENSES.content.attribution,
        );
        expect(asObject(media.name).const).toBe(PUBLIC_LICENSES.media.name);
        expect(asObject(media.copyright).const).toBe(
            PUBLIC_LICENSES.media.copyright,
        );
        expect(asObject(media.reuseAllowed).const).toBe(
            PUBLIC_LICENSES.media.reuseAllowed,
        );
    });

    it("never documents internal registry properties", () => {
        const propertyNames = new Set<string>();
        collectPropertyNames(contract, propertyNames);

        expect(propertyNames.has("env")).toBe(false);
        expect(propertyNames.has("dataFile")).toBe(false);
    });

    it("publishes structurally coherent schema examples", () => {
        for (const name of [
            "ApiRootResponse",
            "IndexCollectionResponse",
            "IndexDetailResponse",
            "EntryCollectionResponse",
            "EntryDetailResponse",
            "FauneEntry",
            "FloreEntry",
            "ChateauEntry",
            "VignobleEntry",
            "Problem",
        ]) {
            const schema = contract.components.schemas[name];
            const example = asObject(schema.example);
            const required = schema.required as string[];

            expect(Object.keys(example)).toEqual(
                expect.arrayContaining(required),
            );
            expect(Object.keys(example).every((key) => key !== "env")).toBe(
                true,
            );
            expect(
                Object.keys(example).every((key) => key !== "dataFile"),
            ).toBe(true);
        }
    });

    it("exposes the contract and documentation from the runtime API root", async () => {
        const response = await getApiRoot();
        const body = await response.json();
        const links = asObject(
            contract.components.schemas.ApiRootResponse.properties,
        ).links;
        const linkProperties = asObject(asObject(links).properties);
        const required = asObject(links).required as string[];

        expect(body.links.openapi).toBe("/api/v1/openapi.json");
        expect(body.links.documentation).toBe("/docs/api");
        expect(required).toContain("documentation");
        expect(asObject(linkProperties.documentation).const).toBe("/docs/api");
    });
});
