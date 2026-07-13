"use client";

import { useMemo, useState } from "react";
import type { Patrimoine } from "@/types/patrimoine";
import IndexHeader from "@/components/IndexHeader";
import IndexFooter from "@/components/IndexFooter";
import IndexPresentation from "@/components/IndexPresentation";
import IndexControls from "@/components/IndexControls";
import { useAmbiance } from "@/hooks/useAmbiance";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import PatrimoineCard from "./PatrimoineCard";
import styles from "./patrimoine.module.css";

const TYPES = [
    { id: "all", label: "Tout" },
    { id: "pont", label: "Ponts" },
    { id: "port", label: "Ports" },
    { id: "artisanal", label: "Artisanal" },
    { id: "moulin", label: "Moulins" },
    { id: "mémoriel", label: "Mémoriel" },
    { id: "eau", label: "Eau" },
    { id: "phare", label: "Phares" },
    { id: "défensif", label: "Défensif" },
] as const;

const ETATS = [
    { id: "all", label: "Tout" },
    { id: "en usage", label: "Debout" },
    { id: "restauré", label: "Restauré" },
    { id: "vestige", label: "Vestige" },
    { id: "disparu", label: "Disparu" },
] as const;

const norm = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function PatrimoineIndex({
    items,
    indexes,
}: {
    items: Patrimoine[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/patrimoine")!;
    const [type, setType] = useState<string>("all");
    const [etat, setEtat] = useState<string>("all");
    const [q, setQ] = useState("");
    const [ambiance, setAmbiance] = useAmbiance();
    const [expandAll, setExpandAll] = useState(false);
    const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
        {},
    );

    const numeros = useMemo(
        () => new Map(items.map((d, i) => [d.slug, i + 1])),
        [items],
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

    const countFor = (field: "type" | "etat", id: string) =>
        items.filter((d) => d[field] === id).length;

    const list = useMemo(() => {
        const nq = norm(q.trim());
        return items.filter((d) => {
            if (type !== "all" && d.type !== type) return false;
            if (etat !== "all" && d.etat !== etat) return false;
            if (nq) {
                const hay = norm(
                    [
                        d.nom,
                        d.commune,
                        d.fonction,
                        d.situation,
                        d.resume ?? "",
                        ...d.autresNoms,
                    ].join(" "),
                );
                if (!hay.includes(nq)) return false;
            }
            return true;
        });
    }, [items, type, etat, q]);

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <IndexHeader current="/patrimoine" indexes={indexes} />

                <IndexPresentation
                    description={entry.description}
                    current="/patrimoine"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                <IndexControls
                    query={q}
                    onQuery={setQ}
                    placeholder="Chercher un ouvrage, une commune, une fonction…"
                    resultCount={list.length}
                    totalCount={items.length}
                    unit="ouvrages"
                    accent={entry.accent}
                    expand={{ all: expandAll, onToggle: toggleAll }}
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
                            label: "État",
                            active: etat,
                            onSelect: setEtat,
                            options: ETATS.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("etat", it.id),
                            })),
                        },
                    ]}
                />

                {list.length === 0 ? (
                    <p className={styles.empty}>
                        Aucun ouvrage à cet endroit du fil. Élargis la recherche
                        ou change de filtre.
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {list.map((d) => (
                            <PatrimoineCard
                                key={d.slug}
                                version={2}
                                d={d}
                                numero={numeros.get(d.slug) ?? 0}
                                open={openOverrides[d.slug] ?? expandAll}
                                onToggle={() => toggleOne(d.slug)}
                            />
                        ))}
                    </div>
                )}

                <IndexFooter ambiance={ambiance} onAmbiance={setAmbiance}>
                    {entry.title} · Loire Ride Zen · Codex
                    <br />
                    {items.length} {entry.footerNote}
                </IndexFooter>
            </div>
        </main>
    );
}
