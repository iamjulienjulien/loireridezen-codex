import { beforeAll, describe, expect, it, vi } from "vitest";
import {
    GET as getApi,
    HEAD as headApi,
    OPTIONS as optionsApi,
} from "@/app/api/v1/route";
import { GET as getIndexes } from "@/app/api/v1/indexes/route";
import { GET as getIndex } from "@/app/api/v1/indexes/[index]/route";
import { GET as getEntries } from "@/app/api/v1/indexes/[index]/entries/route";
import {
    GET as getEntry,
    HEAD as headEntry,
} from "@/app/api/v1/indexes/[index]/entries/[slug]/route";
import { withApiErrorBoundary } from "./errors";

beforeAll(() => {
    process.env.SITE_URL = "https://example.test";
});

const request = new Request("https://example.test/api/v1");
const context = <T extends Record<string, string>>(params: T) =>
    ({ params: Promise.resolve(params) }) as never;

const expectSuccessHeaders = (response: Response) => {
    expect(response.headers.get("content-type")).toBe(
        "application/json; charset=utf-8",
    );
    expect(response.headers.get("cache-control")).toContain("s-maxage=3600");
    expect(response.headers.get("access-control-allow-origin")).toBe("*");
};

describe("public API route handlers", () => {
    it("returns the five success response shapes", async () => {
        const responses = [
            await getApi(),
            await getIndexes(),
            await getIndex(request, context({ index: "faune" })),
            await getEntries(request, context({ index: "faune" })),
            await getEntry(
                request,
                context({ index: "faune", slug: "heron-cendre" }),
            ),
        ];
        let license: unknown;

        for (const response of responses) {
            expect(response.status).toBe(200);
            expectSuccessHeaders(response);
            const body = await response.json();
            expect(body.apiVersion).toBe("1");
            expect(body).toHaveProperty("data");
            expect(body).toHaveProperty("meta.license");
            license ??= body.meta.license;
            expect(body.meta.license).toEqual(license);
            expect(body).toHaveProperty("links.self");
            expect(JSON.stringify(body)).not.toMatch(/dataFile|"env"/);
        }
    });

    it("links to the contract and developer documentation", async () => {
        const response = await getApi();
        const body = await response.json();

        expect(body.links.openapi).toBe("/api/v1/openapi.json");
        expect(body.links.documentation).toBe("/docs/api");
    });

    it.each([
        ["unknown index", () => getIndex(request, context({ index: "x" }))],
        [
            "review index",
            () => getIndex(request, context({ index: "territoires" })),
        ],
        [
            "unknown entry",
            () =>
                getEntry(request, context({ index: "faune", slug: "inconnu" })),
        ],
    ])(
        "returns a private, non-cacheable problem for an %s",
        async (_name, run) => {
            const response = await run();
            expect(response.status).toBe(404);
            expect(response.headers.get("content-type")).toBe(
                "application/problem+json; charset=utf-8",
            );
            expect(response.headers.get("cache-control")).toBe("no-store");
            expect(response.headers.get("access-control-allow-origin")).toBe(
                "*",
            );
            const body = await response.json();
            expect(body).not.toHaveProperty("stack");
            expect(JSON.stringify(body)).not.toMatch(/Zod|\/Users\//);
        },
    );

    it("returns no body for HEAD with the same status and headers", async () => {
        const getResponse = await getApi();
        const headResponse = await headApi();
        expect(headResponse.status).toBe(getResponse.status);
        expect(headResponse.headers.get("cache-control")).toBe(
            getResponse.headers.get("cache-control"),
        );
        expect(await headResponse.text()).toBe("");

        const missing = await headEntry(
            request,
            context({ index: "faune", slug: "inconnu" }),
        );
        expect(missing.status).toBe(404);
        expect(await missing.text()).toBe("");
    });

    it("answers preflight without credentials", () => {
        const response = optionsApi();
        expect(response.status).toBe(204);
        expect(response.headers.get("access-control-allow-methods")).toBe(
            "GET, HEAD, OPTIONS",
        );
        expect(response.headers.has("access-control-allow-credentials")).toBe(
            false,
        );
    });

    it("returns a generic non-cacheable problem for unexpected errors", async () => {
        const logger = vi.spyOn(console, "error").mockImplementation(() => {});
        const response = await withApiErrorBoundary("/api/v1/test", () => {
            throw new Error(
                "Sensitive Zod details from /Users/example/private.json",
            );
        });

        expect(response.status).toBe(500);
        expect(response.headers.get("content-type")).toBe(
            "application/problem+json; charset=utf-8",
        );
        expect(response.headers.get("cache-control")).toBe("no-store");
        expect(response.headers.get("access-control-allow-origin")).toBe("*");
        const body = await response.text();
        expect(body).not.toMatch(/Sensitive|Zod|\/Users\//);
        expect(logger).toHaveBeenCalledOnce();
        logger.mockRestore();
    });
});
