import { describe, expect, it } from "vitest";
import { GET as getApiRoot } from "@/app/api/v1/route";
import { GET as getIndexes } from "@/app/api/v1/indexes/route";
import { GET as getIndex } from "@/app/api/v1/indexes/[index]/route";
import { GET as getEntries } from "@/app/api/v1/indexes/[index]/entries/route";
import { GET as getEntry } from "@/app/api/v1/indexes/[index]/entries/[slug]/route";
import {
    getPublishedEntries,
    getPublishedIndexes,
    getRegisteredIndexes,
} from "@/api/publication/registry";
import { validatePublicResponse } from "./openapi-response-validator";

process.env.SITE_URL = "https://example.test";

type JsonObject = Record<string, unknown>;

const request = new Request("https://example.test/api/v1");
const context = <T extends Record<string, string>>(params: T) =>
    ({ params: Promise.resolve(params) }) as never;

const validateGet = (
    openApiPath: string,
    requestPath: string,
    response: Response,
) =>
    validatePublicResponse({
        method: "GET",
        openApiPath,
        requestPath,
        response,
    });

const mutateJsonResponse = async (
    response: Response,
    mutate: (body: JsonObject) => void,
) => {
    const body = (await response.json()) as JsonObject;
    mutate(body);
    return new Response(JSON.stringify(body), {
        status: response.status,
        headers: response.headers,
    });
};

const publishedIndexes = getPublishedIndexes();
const publishedEntries = publishedIndexes.flatMap(({ slug: index }) =>
    (getPublishedEntries(index) ?? []).map((entry) => ({ index, entry })),
);
const unpublishedIndex = getRegisteredIndexes().find(
    ({ definition }) => definition.etat !== "publie",
);

describe("OpenAPI response validator", () => {
    it("accepts a conforming public response", async () => {
        const response = await getApiRoot();

        await expect(
            validateGet("/api/v1", "/api/v1", response),
        ).resolves.toHaveProperty("apiVersion", "1");
    });

    it("rejects a missing required property with an actionable path", async () => {
        const response = await mutateJsonResponse(
            await getApiRoot(),
            (body) => {
                delete (body.meta as JsonObject).license;
            },
        );

        await expect(
            validateGet("/api/v1", "/api/v1", response),
        ).rejects.toThrow(
            /GET \/api\/v1 → 200[\s\S]*schema: ApiRootResponse[\s\S]*body\.meta\.license: required/,
        );
    });

    it("rejects a renamed property", async () => {
        const response = await mutateJsonResponse(
            await getIndex(request, context({ index: "faune" })),
            (body) => {
                const data = body.data as JsonObject;
                data.id = data.slug;
                delete data.slug;
            },
        );

        await expect(
            validateGet(
                "/api/v1/indexes/{index}",
                "/api/v1/indexes/faune",
                response,
            ),
        ).rejects.toThrow(/body\.data\.slug: required/);
    });

    it("rejects an integer replaced by a string", async () => {
        const response = await mutateJsonResponse(
            await getIndex(request, context({ index: "faune" })),
            (body) => {
                const data = body.data as JsonObject;
                data.entryCount = String(data.entryCount);
            },
        );

        await expect(
            validateGet(
                "/api/v1/indexes/{index}",
                "/api/v1/indexes/faune",
                response,
            ),
        ).rejects.toThrow(/body\.data\.entryCount: type must be integer/);
    });

    it("rejects an additional property on a closed schema", async () => {
        const response = await mutateJsonResponse(
            await getApiRoot(),
            (body) => {
                body.debug = true;
            },
        );

        await expect(
            validateGet("/api/v1", "/api/v1", response),
        ).rejects.toThrow(/body: additionalProperties/);
    });

    it("validates URI formats", async () => {
        const response = await mutateJsonResponse(
            await getApiRoot(),
            (body) => {
                const meta = body.meta as JsonObject;
                const license = meta.license as JsonObject;
                const content = license.content as JsonObject;
                content.url = "not a uri";
            },
        );

        await expect(
            validateGet("/api/v1", "/api/v1", response),
        ).rejects.toThrow(/body\.meta\.license\.content\.url: format/);
    });

    it("validates date formats", async () => {
        const response = await mutateJsonResponse(
            await getIndex(request, context({ index: "faune" })),
            (body) => {
                (body.data as JsonObject).updatedAt = "31/12/2026";
            },
        );

        await expect(
            validateGet(
                "/api/v1/indexes/{index}",
                "/api/v1/indexes/faune",
                response,
            ),
        ).rejects.toThrow(/body\.data\.updatedAt: format/);
    });

    it("rejects an undocumented status", async () => {
        const source = await getApiRoot();
        const response = new Response(await source.text(), {
            status: 201,
            headers: source.headers,
        });

        await expect(
            validateGet("/api/v1", "/api/v1", response),
        ).rejects.toThrow(/Undocumented status 201 for GET \/api\/v1/);
    });

    it("rejects an undocumented media type", async () => {
        const source = await getApiRoot();
        const headers = new Headers(source.headers);
        headers.set("content-type", "text/plain; charset=utf-8");
        const response = new Response(await source.text(), {
            status: source.status,
            headers,
        });

        await expect(
            validateGet("/api/v1", "/api/v1", response),
        ).rejects.toThrow(
            /Undocumented media type text\/plain for GET \/api\/v1 → 200/,
        );
    });
});

describe("all public GET responses match the current OpenAPI contract", () => {
    it("validates API discovery", async () => {
        await validateGet("/api/v1", "/api/v1", await getApiRoot());
    });

    it("validates the published index collection", async () => {
        await validateGet(
            "/api/v1/indexes",
            "/api/v1/indexes",
            await getIndexes(),
        );
    });

    for (const publishedIndex of publishedIndexes) {
        const indexPath = `/api/v1/indexes/${publishedIndex.slug}`;

        it(`validates index ${publishedIndex.slug}`, async () => {
            await validateGet(
                "/api/v1/indexes/{index}",
                indexPath,
                await getIndex(
                    request,
                    context({ index: publishedIndex.slug }),
                ),
            );
        });

        it(`validates the ${publishedIndex.slug} entry collection`, async () => {
            await validateGet(
                "/api/v1/indexes/{index}/entries",
                `${indexPath}/entries`,
                await getEntries(
                    request,
                    context({ index: publishedIndex.slug }),
                ),
            );
        });
    }

    for (const { index, entry } of publishedEntries) {
        const entryPath = `/api/v1/indexes/${index}/entries/${entry.slug}`;

        it(`validates ${index}/${entry.slug}`, async () => {
            await validateGet(
                "/api/v1/indexes/{index}/entries/{slug}",
                entryPath,
                await getEntry(request, context({ index, slug: entry.slug })),
            );
        });
    }

    it("validates a 404 for a registered but unpublished index", async () => {
        expect(unpublishedIndex).toBeDefined();
        const slug = unpublishedIndex!.definition.slug;

        await validateGet(
            "/api/v1/indexes/{index}",
            `/api/v1/indexes/${slug}`,
            await getIndex(request, context({ index: slug })),
        );
    });

    it("validates a 404 for an unknown index", async () => {
        await validateGet(
            "/api/v1/indexes/{index}",
            "/api/v1/indexes/index-inconnu",
            await getIndex(request, context({ index: "index-inconnu" })),
        );
    });

    it("validates a 404 for an unknown entry", async () => {
        const index = publishedIndexes[0].slug;

        await validateGet(
            "/api/v1/indexes/{index}/entries/{slug}",
            `/api/v1/indexes/${index}/entries/entree-inconnue`,
            await getEntry(
                request,
                context({ index, slug: "entree-inconnue" }),
            ),
        );
    });
});
