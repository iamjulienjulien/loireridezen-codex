import type { Metadata } from "next";
import { getIndexesForEnv } from "@/registry/indexes";
import AtelierHomePage from "./AtelierPage";

export const metadata: Metadata = {
    title: "Atelier — Codex",
    description:
        "La collection des esquisses de composants — variantes, états et données de démonstration, au même endroit.",
};

export default function AtelierPage() {
    // const chateaux = chateau.chateaux as Chateau[];
    const indexes = getIndexesForEnv(process.env.CURRENT_ENV);
    return <AtelierHomePage indexes={indexes} />;
}
