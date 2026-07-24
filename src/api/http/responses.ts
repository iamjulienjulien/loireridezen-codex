import { CORS_HEADERS, successHeaders } from "./headers";

export const apiResponse = <T>(body: T, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: successHeaders,
    });

export const headResponse = (response: Response) =>
    new Response(null, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
    });

export const optionsResponse = () =>
    new Response(null, {
        status: 204,
        headers: {
            ...CORS_HEADERS,
            Allow: "GET, HEAD, OPTIONS",
            "Cache-Control": "no-store",
        },
    });
