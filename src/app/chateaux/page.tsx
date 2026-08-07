import chateau from "@data/chateau.json";
import type { Chateau } from "@/types/chateau";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import ChateauxIndex from "./ChateauxIndex";

export const metadata = buildPageMetadata(getIndexPageDefinition("/chateaux"));

export default function ChateauxPage() {
    const chateaux = chateau.chateaux as Chateau[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <ChateauxIndex chateaux={chateaux} indexes={indexes} />;
}
