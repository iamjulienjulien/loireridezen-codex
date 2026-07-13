import type { Metadata } from "next";
import flore from "@data/flore.json";
import type { Flore } from "@/types/flore";
import { getIndexesForEnv } from "@/registry/indexes";
import FloreIndex from "./FloreIndex";

export const metadata: Metadata = {
    title: "Flore ligérienne — Codex",
    description: "Index de la flore du fil, de la source à l'Atlantique.",
};

export default function FlorePage() {
    const flore_ = flore.flore as Flore[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <FloreIndex flore={flore_} indexes={indexes} />;
}
