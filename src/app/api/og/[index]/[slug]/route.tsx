import { getCodexOgItem, type CodexOgItemKind } from "@/lib/og-data";
import { renderCodexOgImage } from "@/lib/og-image";

export const revalidate = 86_400;

type OgItemRouteProps = {
    params: Promise<{ index: string; slug: string }>;
};

export async function GET(request: Request, { params }: OgItemRouteProps) {
    const { index, slug } = await params;
    const item = getCodexOgItem(index as CodexOgItemKind, slug);

    if (!item) {
        return new Response("Image Open Graph introuvable.", { status: 404 });
    }

    return renderCodexOgImage(item, request.url);
}
