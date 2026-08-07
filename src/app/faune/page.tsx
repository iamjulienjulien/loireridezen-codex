import type { Metadata } from "next";
import faune from "@data/faune.json";
import type { FauneEspece } from "@/types/faune";
import { getCanonicalUrl } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import FauneIndex from "./FauneIndex";

export const metadata: Metadata = {
    title: "Faune ligérienne — Le Codex Ligérien",
    description: "Index de la faune du fil, de la source à l'Atlantique.",
    alternates: {
        canonical: getCanonicalUrl("/faune"),
    },
};

export default function FaunePage() {
    const especes = faune.especes as FauneEspece[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <FauneIndex especes={especes} indexes={indexes} />;
}
