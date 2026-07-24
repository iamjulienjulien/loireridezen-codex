import { getSiteUrl } from "@/api/site-url";
import { problemHeaders } from "./headers";

interface ProblemOptions {
    status: number;
    slug: string;
    title: string;
    detail: string;
    instance: string;
}

export const problemResponse = ({
    status,
    slug,
    title,
    detail,
    instance,
}: ProblemOptions) =>
    new Response(
        JSON.stringify({
            type: `${getSiteUrl()}/problems/${slug}`,
            title,
            status,
            detail,
            instance,
        }),
        {
            status,
            headers: problemHeaders,
        },
    );

export const indexNotFound = (instance: string) =>
    problemResponse({
        status: 404,
        slug: "not-found",
        title: "Resource not found",
        detail: "No published index matches the requested identifier.",
        instance,
    });

export const entryNotFound = (instance: string) =>
    problemResponse({
        status: 404,
        slug: "not-found",
        title: "Resource not found",
        detail: "No published entry matches the requested identifier.",
        instance,
    });

export const internalServerError = (instance: string) =>
    problemResponse({
        status: 500,
        slug: "internal-server-error",
        title: "Internal server error",
        detail: "The server could not complete the request.",
        instance,
    });

export const withApiErrorBoundary = async (
    instance: string,
    operation: () => Response | Promise<Response>,
): Promise<Response> => {
    try {
        return await operation();
    } catch (error) {
        console.error("Public API request failed.", error);
        return internalServerError(instance);
    }
};
