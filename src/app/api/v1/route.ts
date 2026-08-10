import { PUBLIC_LICENSES } from "@/api/licenses";
import { withApiErrorBoundary } from "@/api/http/errors";
import {
    apiResponse,
    headResponse,
    optionsResponse,
} from "@/api/http/responses";

export const dynamic = "force-static";

export async function GET() {
    return withApiErrorBoundary("/api/v1", () =>
        apiResponse({
            apiVersion: "1",
            data: {
                name: "API publique du Codex Ligérien",
                description:
                    "Index éditoriaux publics de Loire Ride Zen, en lecture seule.",
                version: "1",
            },
            meta: { license: PUBLIC_LICENSES },
            links: {
                self: "/api/v1",
                indexes: "/api/v1/indexes",
                openapi: "/api/v1/openapi.json",
                documentation: "/docs/api",
            },
        }),
    );
}

export async function HEAD() {
    return headResponse(await GET());
}

export function OPTIONS() {
    return optionsResponse();
}
