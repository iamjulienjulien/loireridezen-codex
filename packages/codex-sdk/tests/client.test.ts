import { afterEach, describe, expect, it, vi } from "vitest";
import {
    CodexApiError,
    CodexResponseError,
    CodexTimeoutError,
    createCodexClient,
} from "../src/index.js";
import type { CodexFetch } from "../src/index.js";

const jsonResponse = (
    body: unknown,
    status = 200,
    contentType = "application/json",
) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": contentType },
    });

describe("createCodexClient", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("covers the five public GET operations with an injected fetch", async () => {
        const calls: Array<{ url: string; init?: RequestInit }> = [];
        const fetchMock: CodexFetch = async (input, init) => {
            calls.push({ url: String(input), init });
            return jsonResponse({ apiVersion: "1", data: null });
        };
        const client = createCodexClient({
            baseUrl: "https://example.test/base/path",
            fetch: fetchMock,
            timeoutMs: 0,
        });

        await client.api.get();
        await client.indexes.list();
        await client.indexes.get("faune");
        await client.entries.list("flore");
        await client.entries.get("chateaux", "château de gien");

        expect(calls.map(({ url }) => url)).toEqual([
            "https://example.test/api/v1",
            "https://example.test/api/v1/indexes",
            "https://example.test/api/v1/indexes/faune",
            "https://example.test/api/v1/indexes/flore/entries",
            "https://example.test/api/v1/indexes/chateaux/entries/ch%C3%A2teau%20de%20gien",
        ]);
        expect(calls.every(({ init }) => init?.method === "GET")).toBe(true);
        expect(new Headers(calls[0]?.init?.headers).get("accept")).toBe(
            "application/json",
        );
    });

    it("merges default and request headers", async () => {
        let received = new Headers();
        const client = createCodexClient({
            fetch: async (_input, init) => {
                received = new Headers(init?.headers);
                return jsonResponse({ apiVersion: "1" });
            },
            headers: { "x-client": "codex-sdk", accept: "application/json" },
            timeoutMs: 0,
        });

        await client.api.get({ headers: { accept: "application/ld+json" } });

        expect(received.get("x-client")).toBe("codex-sdk");
        expect(received.get("accept")).toBe("application/ld+json");
    });

    it("turns Problem Details responses into CodexApiError", async () => {
        const problem = {
            type: "https://example.test/problems/not-found",
            title: "Resource not found",
            status: 404,
            detail: "No published index matches the requested identifier.",
            instance: "/api/v1/indexes/faune",
        };
        const client = createCodexClient({
            fetch: async () =>
                jsonResponse(problem, 404, "application/problem+json"),
            timeoutMs: 0,
        });

        const request = client.indexes.get("faune");

        await expect(request).rejects.toMatchObject({
            name: "CodexApiError",
            status: 404,
            url: "https://codex.loireridezen.bike/api/v1/indexes/faune",
            problem,
            body: problem,
            message: problem.detail,
        });
        await expect(request).rejects.toBeInstanceOf(CodexApiError);
    });

    it("preserves caller cancellation", async () => {
        const reason = new Error("navigation cancelled");
        const controller = new AbortController();
        const client = createCodexClient({
            fetch: abortableFetch(),
            timeoutMs: 0,
        });

        const request = client.api.get({ signal: controller.signal });
        controller.abort(reason);

        await expect(request).rejects.toBe(reason);
    });

    it("reports timeouts separately from caller cancellation", async () => {
        vi.useFakeTimers();
        const client = createCodexClient({
            fetch: abortableFetch(),
            timeoutMs: 25,
        });

        const request = client.api.get();
        const assertion = expect(request).rejects.toMatchObject({
            name: "CodexTimeoutError",
            timeoutMs: 25,
            url: "https://codex.loireridezen.bike/api/v1",
        });

        await vi.advanceTimersByTimeAsync(25);
        await assertion;
        await expect(request).rejects.toBeInstanceOf(CodexTimeoutError);
    });

    it("reports invalid success payloads as CodexResponseError", async () => {
        const client = createCodexClient({
            fetch: async () =>
                new Response("not json", {
                    status: 200,
                    headers: { "content-type": "text/plain" },
                }),
            timeoutMs: 0,
        });

        await expect(client.api.get()).rejects.toBeInstanceOf(
            CodexResponseError,
        );
        await expect(client.api.get()).rejects.toMatchObject({
            url: "https://codex.loireridezen.bike/api/v1",
        });
    });

    it("rejects invalid timeout configuration", () => {
        expect(() => createCodexClient({ timeoutMs: -1 })).toThrow(RangeError);
        expect(() => createCodexClient({ timeoutMs: Number.NaN })).toThrow(
            RangeError,
        );
    });
});

const abortableFetch = (): CodexFetch => async (_input, init) =>
    new Promise<Response>((_resolve, reject) => {
        const signal = init?.signal;

        if (signal?.aborted) {
            reject(signal.reason);
            return;
        }

        signal?.addEventListener("abort", () => reject(signal.reason), {
            once: true,
        });
    });
