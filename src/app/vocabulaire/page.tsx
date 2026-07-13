import type { Metadata } from "next";
import mot from "@data/mot.json";
import type { Mot } from "@/types/mot";
import { getIndexesForEnv } from "@/registry/indexes";
import VocabulaireIndex from "./VocabulaireIndex";

export const metadata: Metadata = {
    title: "Le vocabulaire du fleuve — Codex",
    description: "Lexique de la Loire, la mémoire déposée dans les mots.",
};

export default function VocabulairePage() {
    const mots = mot.mots as Mot[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <VocabulaireIndex mots={mots} indexes={indexes} />;
}
