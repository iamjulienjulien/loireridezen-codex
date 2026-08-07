import flore from "@data/flore.json";
import type { Flore } from "@/types/flore";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import FloreIndex from "./FloreIndex";

export const metadata = buildPageMetadata(getIndexPageDefinition("/flore"));

export default function FlorePage() {
    const flore_ = flore.flore as Flore[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <FloreIndex flore={flore_} indexes={indexes} />;
}
