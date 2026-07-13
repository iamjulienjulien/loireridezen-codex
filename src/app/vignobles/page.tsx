import type { Metadata } from "next";
import vignoble from "@data/vignoble.json";
import type { Vignoble } from "@/types/vignoble";
import { getIndexesForEnv } from "@/registry/indexes";
import VignoblesIndex from "./VignoblesIndex";

export const metadata: Metadata = {
    title: "Vignobles & AOC ligériens — Codex",
    description:
        "Index des appellations de la Loire, de la source à l'Atlantique.",
};

export default function VignoblesPage() {
    const vignobles = vignoble.vignobles as Vignoble[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <VignoblesIndex vignobles={vignobles} indexes={indexes} />;
}
