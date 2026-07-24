import { PUBLIC_LICENSES } from "@/api/licenses";
import { withApiErrorBoundary } from "@/api/http/errors";
import {
    apiResponse,
    headResponse,
    optionsResponse,
} from "@/api/http/responses";
import { getPublishedIndexes } from "@/api/publication/registry";

export const dynamic = "force-static";

export async function GET() {
    return withApiErrorBoundary("/api/v1/indexes", () => {
        const indexes = getPublishedIndexes();
        return apiResponse({
            apiVersion: "1",
            data: indexes,
            meta: {
                total: indexes.length,
                license: PUBLIC_LICENSES,
            },
            links: {
                self: "/api/v1/indexes",
                api: "/api/v1",
            },
        });
    });
}

export async function HEAD() {
    return headResponse(await GET());
}

export function OPTIONS() {
    return optionsResponse();
}
