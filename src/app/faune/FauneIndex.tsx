"use client";

import { useMemo, useState } from "react";
import type { FauneEspece } from "@/types/faune";
import IndexHeader from "@/components/IndexHeader";
import IndexFooter from "@/components/IndexFooter";
import IndexPresentation from "@/components/IndexPresentation";
import IndexControls from "@/components/IndexControls";
import { useAmbiance } from "@/hooks/useAmbiance";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import FauneCard from "./FauneCard";
import styles from "./faune.module.css";

const TYPES = [
    { id: "all", label: "Tout" },
    { id: "oiseau", label: "Oiseaux" },
    { id: "mammifère", label: "Mammifères" },
    { id: "poisson", label: "Poissons" },
    { id: "reptile", label: "Reptiles" },
    { id: "amphibien", label: "Amphibiens" },
    { id: "insecte", label: "Insectes" },
] as const;

const RARETES = [
    { id: "all", label: "Tout" },
    { id: "commun", label: "Commun" },
    { id: "régulier", label: "Régulier" },
    { id: "rare", label: "Rare" },
    { id: "trésor", label: "Trésor" },
] as const;

const norm = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function FauneIndex({
    especes,
    indexes,
}: {
    especes: FauneEspece[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/faune")!;
    const [type, setType] = useState<string>("all");
    const [rarete, setRarete] = useState<string>("all");
    const [q, setQ] = useState("");
    const [ambiance, setAmbiance] = useAmbiance();
    const [expandAll, setExpandAll] = useState(false);
    const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
        {},
    );

    const toggleAll = () => {
        setExpandAll((v) => !v);
        setOpenOverrides({});
    };
    const toggleOne = (id: string) =>
        setOpenOverrides((o) => ({
            ...o,
            [id]: !(o[id] ?? expandAll),
        }));

    const countFor = (field: "type" | "rarete", id: string) =>
        especes.filter((d) => d[field] === id).length;

    const list = useMemo(() => {
        const nq = norm(q.trim());
        return especes.filter((d) => {
            if (type !== "all" && d.type !== type) return false;
            if (rarete !== "all" && d.rarete !== rarete) return false;
            if (nq) {
                const hay = norm(
                    [d.nomCommun, d.nomScientifique, ...d.autresNoms].join(" "),
                );
                if (!hay.includes(nq)) return false;
            }
            return true;
        });
    }, [especes, type, rarete, q]);

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <IndexHeader current="/faune" indexes={indexes} />

                <IndexPresentation
                    description={entry.description}
                    current="/faune"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                <IndexControls
                    query={q}
                    onQuery={setQ}
                    placeholder="Chercher une espèce, un nom scientifique…"
                    resultCount={list.length}
                    totalCount={especes.length}
                    unit="espèces"
                    accent={entry.accent}
                    groups={[
                        {
                            label: "Type",
                            active: type,
                            onSelect: setType,
                            options: TYPES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("type", it.id),
                            })),
                        },
                        {
                            label: "Rareté",
                            active: rarete,
                            onSelect: setRarete,
                            options: RARETES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("rarete", it.id),
                            })),
                        },
                    ]}
                    expand={{ all: expandAll, onToggle: toggleAll }}
                />

                {list.length === 0 ? (
                    <p className={styles.empty}>
                        Rien à cet endroit du fil. Élargis la recherche ou
                        change de filtre.
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {list.map((d) => (
                            <FauneCard
                                key={d.nomScientifique}
                                version={2}
                                d={d}
                                open={
                                    openOverrides[d.nomScientifique] ??
                                    expandAll
                                }
                                onToggle={() => toggleOne(d.nomScientifique)}
                            />
                        ))}
                    </div>
                )}

                <IndexFooter ambiance={ambiance} onAmbiance={setAmbiance}>
                    <span
                        style={{
                            display: "block",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            marginBottom: "5px",
                        }}
                    >
                        {list.length} {entry.footerNote}
                    </span>
                    {entry.title} · Le Codex Ligérien · Loire Ride Zen
                </IndexFooter>
            </div>
        </main>
    );
}
