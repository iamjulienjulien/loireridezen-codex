export const SUCCESS_CACHE_CONTROL =
    "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

export const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
} as const;

export const successHeaders = {
    ...CORS_HEADERS,
    "Cache-Control": SUCCESS_CACHE_CONTROL,
    "Content-Type": "application/json; charset=utf-8",
} as const;

export const problemHeaders = {
    ...CORS_HEADERS,
    "Cache-Control": "no-store",
    "Content-Type": "application/problem+json; charset=utf-8",
} as const;
