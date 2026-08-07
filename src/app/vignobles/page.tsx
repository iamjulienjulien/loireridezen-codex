import vignoble from "@data/vignoble.json";
import type { Vignoble } from "@/types/vignoble";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import VignoblesIndex from "./VignoblesIndex";

export const metadata = buildPageMetadata(getIndexPageDefinition("/vignobles"));

export default function VignoblesPage() {
    const vignobles = vignoble.vignobles as Vignoble[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <VignoblesIndex vignobles={vignobles} indexes={indexes} />;
}
