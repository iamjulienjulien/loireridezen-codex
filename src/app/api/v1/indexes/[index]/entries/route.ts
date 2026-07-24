import { indexNotFound, withApiErrorBoundary } from "@/api/http/errors";
import {
    apiResponse,
    headResponse,
    optionsResponse,
} from "@/api/http/responses";
import { PUBLIC_LICENSES } from "@/api/licenses";
import {
    getPublishedEntries,
    getPublishedIndexes,
} from "@/api/publication/registry";

export const dynamic = "force-static";

export function generateStaticParams() {
    return getPublishedIndexes().map(({ slug }) => ({ index: slug }));
}

export async function GET(
    _request: Request,
    ctx: RouteContext<"/api/v1/indexes/[index]/entries">,
) {
    return withApiErrorBoundary("/api/v1/indexes/[index]/entries", async () => {
        const { index } = await ctx.params;
        const instance = `/api/v1/indexes/${index}/entries`;
        const entries = getPublishedEntries(index);

        if (!entries) return indexNotFound(instance);

        return apiResponse({
            apiVersion: "1",
            data: entries,
            meta: {
                index,
                total: entries.length,
                license: PUBLIC_LICENSES,
            },
            links: {
                self: instance,
                index: `/api/v1/indexes/${index}`,
            },
        });
    });
}

export async function HEAD(
    request: Request,
    ctx: RouteContext<"/api/v1/indexes/[index]/entries">,
) {
    return headResponse(await GET(request, ctx));
}

export function OPTIONS() {
    return optionsResponse();
}
