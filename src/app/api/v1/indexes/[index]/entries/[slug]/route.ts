import {
    entryNotFound,
    indexNotFound,
    withApiErrorBoundary,
} from "@/api/http/errors";
import {
    apiResponse,
    headResponse,
    optionsResponse,
} from "@/api/http/responses";
import { PUBLIC_LICENSES } from "@/api/licenses";
import {
    getPublishedEntries,
    getPublishedEntry,
    getPublishedIndexes,
} from "@/api/publication/registry";

export const dynamic = "force-static";

export function generateStaticParams() {
    return getPublishedIndexes().flatMap(({ slug: index }) =>
        (getPublishedEntries(index) ?? []).map(({ slug }) => ({
            index,
            slug,
        })),
    );
}

export async function GET(
    _request: Request,
    ctx: RouteContext<"/api/v1/indexes/[index]/entries/[slug]">,
) {
    return withApiErrorBoundary(
        "/api/v1/indexes/[index]/entries/[slug]",
        async () => {
            const { index, slug } = await ctx.params;
            const instance = `/api/v1/indexes/${index}/entries/${slug}`;

            if (!getPublishedEntries(index)) return indexNotFound(instance);

            const entry = getPublishedEntry(index, slug);
            if (!entry) return entryNotFound(instance);

            return apiResponse({
                apiVersion: "1",
                data: entry,
                meta: { license: PUBLIC_LICENSES },
                links: {
                    self: instance,
                    index: `/api/v1/indexes/${index}`,
                    collection: `/api/v1/indexes/${index}/entries`,
                },
            });
        },
    );
}

export async function HEAD(
    request: Request,
    ctx: RouteContext<"/api/v1/indexes/[index]/entries/[slug]">,
) {
    return headResponse(await GET(request, ctx));
}

export function OPTIONS() {
    return optionsResponse();
}
