import mot from "@data/catalogue-mots.json";
import IndexShell from "@/components/layout/IndexShell";
import type { Mot } from "@/types/mot";
import { requireIndexForEnv } from "@/lib/publication-guards";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import { getIndexPageDefinition } from "@/registry/pages";
import VocabulaireIndex from "./VocabulaireIndex";

const VOCABULAIRE_PAGE = getIndexPageDefinition("/vocabulaire");

export function generateMetadata() {
    requireIndexForEnv("vocabulaire");
    return buildPageMetadata(VOCABULAIRE_PAGE);
}

export default function VocabulairePage() {
    requireIndexForEnv("vocabulaire");
    const mots = mot.mots as Mot[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return (
        <IndexShell
            page={VOCABULAIRE_PAGE}
            indexes={indexes}
            totalEntries={mots.length}
        >
            <VocabulaireIndex mots={mots} indexes={indexes} />
        </IndexShell>
    );
}
