"use client";

import { useMemo, useState } from "react";
import type { Chateau } from "@/types/chateau";
import IndexHeader from "@/components/IndexHeader";
import IndexFooter from "@/components/IndexFooter";
import IndexPresentation from "@/components/IndexPresentation";
import IndexControls from "@/components/IndexControls";
import { useAmbiance } from "@/hooks/useAmbiance";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import ChateauxCard from "./ChateauxCard";
import styles from "./chateaux.module.css";

const EPOQUES = [
    { id: "all", label: "Tout" },
    { id: "Médiéval", label: "Médiéval" },
    { id: "Renaissance", label: "Renaissance" },
    { id: "Classique", label: "Classique" },
    { id: "Éclectique", label: "Éclectique" },
] as const;

const RENOMMEES = [
    { id: "all", label: "Tout" },
    { id: "phare", label: "Phare" },
    { id: "majeur", label: "Majeur" },
    { id: "notable", label: "Notable" },
    { id: "confidentiel", label: "Confidentiel" },
] as const;

const norm = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function ChateauxIndex({
    chateaux,
    indexes,
}: {
    chateaux: Chateau[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/chateaux")!;
    const [epoque, setEpoque] = useState<string>("all");
    const [renommee, setRenommee] = useState<string>("all");
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

    const countFor = (field: "epoque" | "renommee", id: string) =>
        chateaux.filter((d) => d[field] === id).length;

    const list = useMemo(() => {
        const nq = norm(q.trim());
        return chateaux.filter((d) => {
            if (epoque !== "all" && d.epoque !== epoque) return false;
            if (renommee !== "all" && d.renommee !== renommee) return false;
            if (nq) {
                const hay = norm(
                    [
                        d.nom,
                        d.commune,
                        d.style,
                        d.commanditaire ?? "",
                        ...d.autresNoms,
                    ].join(" "),
                );
                if (!hay.includes(nq)) return false;
            }
            return true;
        });
    }, [chateaux, epoque, renommee, q]);

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <IndexHeader current="/chateaux" indexes={indexes} />

                <IndexPresentation
                    description={entry.description}
                    current="/chateaux"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                <IndexControls
                    query={q}
                    onQuery={setQ}
                    placeholder="Chercher un château, une commune, un style…"
                    resultCount={list.length}
                    totalCount={chateaux.length}
                    unit="châteaux"
                    accent={entry.accent}
                    groups={[
                        {
                            label: "Époque",
                            active: epoque,
                            onSelect: setEpoque,
                            options: EPOQUES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("epoque", it.id),
                            })),
                        },
                        {
                            label: "Renommée",
                            active: renommee,
                            onSelect: setRenommee,
                            options: RENOMMEES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("renommee", it.id),
                            })),
                        },
                    ]}
                    expand={{ all: expandAll, onToggle: toggleAll }}
                />

                {list.length === 0 ? (
                    <p className={styles.empty}>
                        Aucun château à cet endroit du fil. Élargis la recherche
                        ou change de filtre.
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {list.map((d) => (
                            <ChateauxCard
                                key={d.slug}
                                version={3}
                                d={d}
                                open={openOverrides[d.slug] ?? expandAll}
                                onToggle={() => toggleOne(d.slug)}
                            />
                        ))}
                    </div>
                )}

                <IndexFooter ambiance={ambiance} onAmbiance={setAmbiance}>
                    {entry.title} · Loire Ride Zen · Codex
                    <br />
                    {chateaux.length} {entry.footerNote}
                </IndexFooter>
            </div>
        </main>
    );
}
