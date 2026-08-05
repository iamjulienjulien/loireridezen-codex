import {
    CodexApiError,
    CodexResponseError,
    CodexTimeoutError,
} from "./errors.js";
import type {
    ApiRootResponse,
    EntryCollectionResponse,
    EntryDetailResponse,
    IndexCollectionResponse,
    IndexDetailResponse,
    PublishedIndexSlug,
} from "./types.js";

export const CODEX_API_BASE_URL = "https://codex.loireridezen.bike";
export const DEFAULT_TIMEOUT_MS = 10_000;

export type CodexFetch = (
    input: RequestInfo | URL,
    init?: RequestInit,
) => Promise<Response>;

export interface CreateCodexClientOptions {
    baseUrl?: string;
    fetch?: CodexFetch;
    headers?: HeadersInit;
    timeoutMs?: number;
}

export interface CodexRequestOptions {
    signal?: AbortSignal;
    headers?: HeadersInit;
    timeoutMs?: number;
}

export interface CodexClient {
    api: {
        get(options?: CodexRequestOptions): Promise<ApiRootResponse>;
    };
    indexes: {
        list(options?: CodexRequestOptions): Promise<IndexCollectionResponse>;
        get(
            index: PublishedIndexSlug,
            options?: CodexRequestOptions,
        ): Promise<IndexDetailResponse>;
    };
    entries: {
        list(
            index: PublishedIndexSlug,
            options?: CodexRequestOptions,
        ): Promise<EntryCollectionResponse>;
        get(
            index: PublishedIndexSlug,
            slug: string,
            options?: CodexRequestOptions,
        ): Promise<EntryDetailResponse>;
    };
}

export const createCodexClient = (
    options: CreateCodexClientOptions = {},
): CodexClient => {
    const baseUrl = normalizeBaseUrl(options.baseUrl ?? CODEX_API_BASE_URL);
    const fetchImplementation = options.fetch ?? globalThis.fetch;
    const defaultTimeoutMs = validateTimeout(
        options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    );

    if (typeof fetchImplementation !== "function") {
        throw new TypeError(
            "A fetch implementation is required to create a Codex client.",
        );
    }

    const request = async <T>(
        path: string,
        requestOptions: CodexRequestOptions = {},
    ): Promise<T> => {
        const url = new URL(path, baseUrl).toString();
        const timeoutMs = validateTimeout(
            requestOptions.timeoutMs ?? defaultTimeoutMs,
        );
        const controller = new AbortController();
        const headers = mergeHeaders(options.headers, requestOptions.headers);
        let timedOut = false;
        let timeout: ReturnType<typeof setTimeout> | undefined;

        const abortFromCaller = () =>
            controller.abort(requestOptions.signal?.reason);

        if (requestOptions.signal?.aborted) {
            abortFromCaller();
        } else {
            requestOptions.signal?.addEventListener("abort", abortFromCaller, {
                once: true,
            });
        }

        if (timeoutMs > 0) {
            timeout = setTimeout(() => {
                timedOut = true;
                controller.abort();
            }, timeoutMs);
        }

        let response: Response;

        try {
            response = await fetchImplementation(url, {
                method: "GET",
                headers,
                signal: controller.signal,
            });
        } catch (error) {
            if (timedOut) {
                throw new CodexTimeoutError(url, timeoutMs);
            }
            throw error;
        } finally {
            if (timeout) clearTimeout(timeout);
            requestOptions.signal?.removeEventListener(
                "abort",
                abortFromCaller,
            );
        }

        if (!response.ok) {
            throw await CodexApiError.fromResponse(response, url);
        }

        try {
            return (await response.json()) as T;
        } catch (error) {
            throw new CodexResponseError(response, error, url);
        }
    };

    return {
        api: {
            get: (requestOptions) =>
                request<ApiRootResponse>("/api/v1", requestOptions),
        },
        indexes: {
            list: (requestOptions) =>
                request<IndexCollectionResponse>(
                    "/api/v1/indexes",
                    requestOptions,
                ),
            get: (index, requestOptions) =>
                request<IndexDetailResponse>(
                    `/api/v1/indexes/${encodeURIComponent(index)}`,
                    requestOptions,
                ),
        },
        entries: {
            list: (index, requestOptions) =>
                request<EntryCollectionResponse>(
                    `/api/v1/indexes/${encodeURIComponent(index)}/entries`,
                    requestOptions,
                ),
            get: (index, slug, requestOptions) =>
                request<EntryDetailResponse>(
                    `/api/v1/indexes/${encodeURIComponent(index)}/entries/${encodeURIComponent(slug)}`,
                    requestOptions,
                ),
        },
    };
};

const normalizeBaseUrl = (baseUrl: string) => {
    const parsed = new URL(baseUrl);
    parsed.pathname = "/";
    parsed.search = "";
    parsed.hash = "";
    return parsed;
};

const validateTimeout = (timeoutMs: number) => {
    if (!Number.isFinite(timeoutMs) || timeoutMs < 0) {
        throw new RangeError(
            "timeoutMs must be a finite positive number or 0.",
        );
    }
    return timeoutMs;
};

const mergeHeaders = (
    defaults?: HeadersInit,
    overrides?: HeadersInit,
): Headers => {
    const headers = new Headers(defaults);
    new Headers(overrides).forEach((value, key) => headers.set(key, value));

    if (!headers.has("accept")) {
        headers.set("accept", "application/json");
    }

    return headers;
};
