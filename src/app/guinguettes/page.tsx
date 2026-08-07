import type { Metadata } from "next";
import guinguettesData from "@data/guinguettes.json";
import { getCanonicalUrl } from "@/lib/site-metadata";
import { getIndexesForEnv } from "@/registry/indexes";
import type { Guinguette } from "@/types/guinguette";
import GuinguettesIndex from "./GuinguettesIndex";

export const metadata: Metadata = {
    title: "Guinguettes ligériennes — Codex",
    description:
        "Un index des guinguettes posées au fil de la Loire et de ses affluents, entre cuisine, musique et haltes à vélo.",
    alternates: {
        canonical: getCanonicalUrl("/guinguettes"),
    },
};

export default function GuinguettesPage() {
    const guinguettes = guinguettesData.guinguettes as Guinguette[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);

    return <GuinguettesIndex guinguettes={guinguettes} indexes={indexes} />;
}
