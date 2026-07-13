import type { Metadata } from "next";
import chateau from "@data/chateau.json";
import type { Chateau } from "@/types/chateau";
import { getIndexesForEnv } from "@/registry/indexes";
import ChateauxIndex from "./ChateauxIndex";

export const metadata: Metadata = {
    title: "Châteaux de la Loire — Codex",
    description: "Index des châteaux du val, de la source à l'Atlantique.",
};

export default function ChateauxPage() {
    const chateaux = chateau.chateaux as Chateau[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <ChateauxIndex chateaux={chateaux} indexes={indexes} />;
}
