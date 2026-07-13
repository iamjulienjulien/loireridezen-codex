import type { Metadata } from "next";
import patrimoine from "@data/patrimoine.json";
import type { Patrimoine } from "@/types/patrimoine";
import { getIndexesForEnv } from "@/registry/indexes";
import PatrimoineIndex from "./PatrimoineIndex";

export const metadata: Metadata = {
    title: "Petit patrimoine du fil — Codex",
    description:
        "Le fleuve-travail : ponts, ports, fours à chaux et moulins de la Loire.",
};

export default function PatrimoinePage() {
    const items = patrimoine.patrimoine as Patrimoine[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <PatrimoineIndex items={items} indexes={indexes} />;
}
