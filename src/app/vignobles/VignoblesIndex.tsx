"use client";

import { useMemo, useState } from "react";
import type { Vignoble } from "@/types/vignoble";
import IndexHeader from "@/components/IndexHeader";
import IndexFooter from "@/components/IndexFooter";
import IndexPresentation from "@/components/IndexPresentation";
import IndexControls from "@/components/IndexControls";
import { useAmbiance } from "@/hooks/useAmbiance";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import VignoblesCard from "./VignoblesCard";
import styles from "./vignobles.module.css";

const COULEURS = [
    { id: "all", label: "Tout" },
    { id: "blanc sec", label: "Blanc sec" },
    { id: "blanc moelleux", label: "Moelleux" },
    { id: "rouge", label: "Rouge" },
    { id: "rosé", label: "Rosé" },
    { id: "effervescent", label: "Bulles" },
] as const;

const RIVES = [
    { id: "all", label: "Tout" },
    { id: "Auvergne & Forez", label: "Auvergne & Forez" },
    { id: "Centre-Loire", label: "Centre-Loire" },
    { id: "Touraine", label: "Touraine" },
    { id: "Anjou-Saumur", label: "Anjou-Saumur" },
    { id: "Pays nantais", label: "Pays nantais" },
] as const;

const NOTORIETES = [
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

export default function VignoblesIndex({
    vignobles,
    indexes,
}: {
    vignobles: Vignoble[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/vignobles")!;
    const [couleur, setCouleur] = useState<string>("all");
    const [rive, setRive] = useState<string>("all");
    const [notoriete, setNotoriete] = useState<string>("all");
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

    const countFor = (field: "couleur" | "rive" | "notoriete", id: string) =>
        vignobles.filter((d) => d[field] === id).length;

    const list = useMemo(() => {
        const nq = norm(q.trim());
        return vignobles.filter((d) => {
            if (couleur !== "all" && d.couleur !== couleur) return false;
            if (rive !== "all" && d.rive !== rive) return false;
            if (notoriete !== "all" && d.notoriete !== notoriete) return false;
            if (nq) {
                const hay = norm(
                    [
                        d.nom,
                        d.style,
                        d.rive,
                        d.departement,
                        ...d.cepages,
                        ...d.autresNoms,
                    ].join(" "),
                );
                if (!hay.includes(nq)) return false;
            }
            return true;
        });
    }, [vignobles, couleur, rive, notoriete, q]);

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <IndexHeader current="/vignobles" indexes={indexes} />

                <IndexPresentation
                    description={entry.description}
                    current="/vignobles"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                <IndexControls
                    query={q}
                    onQuery={setQ}
                    placeholder="Chercher une appellation, un cépage, une commune…"
                    resultCount={list.length}
                    totalCount={vignobles.length}
                    unit="appellations"
                    accent={entry.accent}
                    expand={{ all: expandAll, onToggle: toggleAll }}
                    groups={[
                        {
                            label: "Couleur",
                            active: couleur,
                            onSelect: setCouleur,
                            options: COULEURS.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("couleur", it.id),
                            })),
                        },
                        {
                            label: "Rive",
                            active: rive,
                            onSelect: setRive,
                            options: RIVES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("rive", it.id),
                            })),
                        },
                        {
                            label: "Notoriété",
                            active: notoriete,
                            onSelect: setNotoriete,
                            options: NOTORIETES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("notoriete", it.id),
                            })),
                        },
                    ]}
                />

                {list.length === 0 ? (
                    <p className={styles.empty}>
                        Aucune appellation à cet endroit du fil. Élargis la
                        recherche ou change de filtre.
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {list.map((d) => (
                            <VignoblesCard
                                key={d.slug}
                                version={2}
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
                    {vignobles.length} {entry.footerNote}
                </IndexFooter>
            </div>
        </main>
    );
}
