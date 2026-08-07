import mot from "@data/mot.json";
import type { Mot } from "@/types/mot";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import VocabulaireIndex from "./VocabulaireIndex";

export const metadata = buildPageMetadata(
    getIndexPageDefinition("/vocabulaire"),
);

export default function VocabulairePage() {
    const mots = mot.mots as Mot[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <VocabulaireIndex mots={mots} indexes={indexes} />;
}
