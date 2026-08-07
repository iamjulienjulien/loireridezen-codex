import faune from "@data/faune.json";
import type { FauneEspece } from "@/types/faune";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import FauneIndex from "./FauneIndex";

export const metadata = buildPageMetadata(getIndexPageDefinition("/faune"));

export default function FaunePage() {
    const especes = faune.especes as FauneEspece[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <FauneIndex especes={especes} indexes={indexes} />;
}
