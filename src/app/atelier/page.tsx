import type { Metadata } from "next";
import AtelierHomePage from "./AtelierPage";

export const metadata: Metadata = {
    title: "Atelier — Codex",
    description:
        "La collection des esquisses de composants — variantes, états et données de démonstration, au même endroit.",
};

export default function AtelierPage() {
    return <AtelierHomePage />;
}
