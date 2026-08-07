import guinguettesData from "@data/guinguettes.json";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import type { Guinguette } from "@/types/guinguette";
import GuinguettesIndex from "./GuinguettesIndex";

export const metadata = buildPageMetadata(
    getIndexPageDefinition("/guinguettes"),
);

export default function GuinguettesPage() {
    const guinguettes = guinguettesData.guinguettes as Guinguette[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return <GuinguettesIndex guinguettes={guinguettes} indexes={indexes} />;
}
