import type { Problem } from "./types.js";

export interface CodexApiErrorOptions {
    status: number;
    statusText: string;
    url: string;
    problem?: Problem;
    body?: unknown;
}

export class CodexApiError extends Error {
    readonly status: number;
    readonly statusText: string;
    readonly url: string;
    readonly problem?: Problem;
    readonly body?: unknown;

    constructor(options: CodexApiErrorOptions) {
        super(
            options.problem?.detail ||
                options.problem?.title ||
                `Codex API request failed with status ${options.status}.`,
        );
        this.name = "CodexApiError";
        this.status = options.status;
        this.statusText = options.statusText;
        this.url = options.url;
        this.problem = options.problem;
        this.body = options.body;
    }

    static async fromResponse(
        response: Response,
        requestUrl = response.url,
    ): Promise<CodexApiError> {
        const text = await response.text();
        let body: unknown = text;

        if (text) {
            try {
                body = JSON.parse(text) as unknown;
            } catch {
                // Keep the raw response body for diagnostics.
            }
        }

        return new CodexApiError({
            status: response.status,
            statusText: response.statusText,
            url: response.url || requestUrl,
            problem: isProblem(body) ? body : undefined,
            body,
        });
    }
}

export class CodexTimeoutError extends Error {
    readonly timeoutMs: number;
    readonly url: string;

    constructor(url: string, timeoutMs: number) {
        super(`Codex API request timed out after ${timeoutMs} ms.`);
        this.name = "CodexTimeoutError";
        this.timeoutMs = timeoutMs;
        this.url = url;
    }
}

export class CodexResponseError extends Error {
    readonly status: number;
    readonly url: string;
    readonly cause: unknown;

    constructor(response: Response, cause: unknown, requestUrl = response.url) {
        super("Codex API returned an invalid JSON response.");
        this.name = "CodexResponseError";
        this.status = response.status;
        this.url = response.url || requestUrl;
        this.cause = cause;
    }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const isProblem = (value: unknown): value is Problem => {
    if (!isRecord(value)) return false;

    return (
        typeof value.type === "string" &&
        typeof value.title === "string" &&
        typeof value.status === "number" &&
        typeof value.detail === "string" &&
        typeof value.instance === "string"
    );
};
