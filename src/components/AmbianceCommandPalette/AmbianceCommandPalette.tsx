"use client";

import { useMemo } from "react";

import LRZCommandPalette, {
    type LRZCommand,
} from "@/components/_ui/LRZCommandPalette";
import { useAmbiance } from "@/hooks/useAmbiance";
import { AMBIANCES, type Ambiance } from "@/registry/ambiances";

const AMBIANCE_DETAILS: Record<
    Ambiance,
    { description: string; keywords: readonly string[] }
> = {
    aube: {
        description: "Lumière rose et fraîche du début du jour",
        keywords: ["matin", "lever", "rose", "lumière"],
    },
    jour: {
        description: "Lumière claire et naturelle du Val de Loire",
        keywords: ["journée", "soleil", "clair", "lumière"],
    },
    soir: {
        description: "Teintes chaudes et dorées du crépuscule",
        keywords: ["crépuscule", "coucher", "orange", "doré"],
    },
    nuit: {
        description: "Bleu profond, étoiles et lumières nocturnes",
        keywords: ["sombre", "nocturne", "étoiles", "lune"],
    },
};

export default function AmbianceCommandPalette() {
    const [ambiance, setAmbiance] = useAmbiance();

    const commands = useMemo<readonly LRZCommand[]>(
        () =>
            AMBIANCES.map((item) => ({
                id: `ambiance-${item.id}`,
                label: item.label,
                description: AMBIANCE_DETAILS[item.id].description,
                icon: item.emoji,
                keywords: ["ambiance", ...AMBIANCE_DETAILS[item.id].keywords],
                group: "Ambiance",
                active: ambiance === item.id,
                onSelect: () => setAmbiance(item.id),
            })),
        [ambiance, setAmbiance],
    );

    return (
        <LRZCommandPalette
            commands={commands}
            title="Changer d’ambiance"
            placeholder="Rechercher une ambiance…"
            emptyMessage="Aucune ambiance trouvée"
        />
    );
}
