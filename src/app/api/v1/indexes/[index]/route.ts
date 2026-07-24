import { indexNotFound, withApiErrorBoundary } from "@/api/http/errors";
import {
    apiResponse,
    headResponse,
    optionsResponse,
} from "@/api/http/responses";
import { PUBLIC_LICENSES } from "@/api/licenses";
import {
    getPublishedIndex,
    getPublishedIndexes,
} from "@/api/publication/registry";

export const dynamic = "force-static";

export function generateStaticParams() {
    return getPublishedIndexes().map(({ slug }) => ({ index: slug }));
}

export async function GET(
    _request: Request,
    ctx: RouteContext<"/api/v1/indexes/[index]">,
) {
    return withApiErrorBoundary("/api/v1/indexes/[index]", async () => {
        const { index } = await ctx.params;
        const instance = `/api/v1/indexes/${index}`;
        const publishedIndex = getPublishedIndex(index);

        if (!publishedIndex) return indexNotFound(instance);

        return apiResponse({
            apiVersion: "1",
            data: publishedIndex,
            meta: { license: PUBLIC_LICENSES },
            links: {
                self: instance,
                entries: `${instance}/entries`,
                indexes: "/api/v1/indexes",
            },
        });
    });
}

export async function HEAD(
    request: Request,
    ctx: RouteContext<"/api/v1/indexes/[index]">,
) {
    return headResponse(await GET(request, ctx));
}

export function OPTIONS() {
    return optionsResponse();
}
