"use client";

import { useMemo, useState } from "react";
import type { Mot } from "@/types/mot";
import IndexHeader from "@/components/IndexHeader";
import IndexFooter from "@/components/IndexFooter";
import IndexPresentation from "@/components/IndexPresentation";
import IndexControls from "@/components/IndexControls";
import { useAmbiance } from "@/hooks/useAmbiance";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import VocabulaireCard from "./VocabulaireCard";
import styles from "./vocabulaire.module.css";

const CATEGORIES = [
    { id: "all", label: "Tout" },
    { id: "relief", label: "Relief" },
    { id: "bateau", label: "Bateau" },
    { id: "ouvrage", label: "Ouvrage" },
    { id: "métier", label: "Métier" },
    { id: "eau", label: "Eau" },
] as const;

const USAGES = [
    { id: "all", label: "Tout" },
    { id: "vivant", label: "Vivant" },
    { id: "rare", label: "Rare" },
    { id: "oublié", label: "Oublié" },
] as const;

const norm = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function VocabulaireIndex({
    mots,
    indexes,
}: {
    mots: Mot[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/vocabulaire")!;
    const [categorie, setCategorie] = useState<string>("all");
    const [usage, setUsage] = useState<string>("all");
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

    const countFor = (field: "categorie" | "usage", id: string) =>
        mots.filter((d) => d[field] === id).length;

    const list = useMemo(() => {
        const nq = norm(q.trim());
        return mots.filter((d) => {
            if (categorie !== "all" && d.categorie !== categorie) return false;
            if (usage !== "all" && d.usage !== usage) return false;
            if (nq) {
                const hay = norm(
                    [
                        d.terme,
                        d.definition,
                        d.sousTitre,
                        ...d.autresFormes,
                    ].join(" "),
                );
                if (!hay.includes(nq)) return false;
            }
            return true;
        });
    }, [mots, categorie, usage, q]);

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <IndexHeader current="/vocabulaire" indexes={indexes} />

                <IndexPresentation
                    description={entry.description}
                    current="/vocabulaire"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                <IndexControls
                    query={q}
                    onQuery={setQ}
                    placeholder="Chercher un mot, une définition, une variante…"
                    resultCount={list.length}
                    totalCount={mots.length}
                    unit="mots"
                    accent={entry.accent}
                    groups={[
                        {
                            label: "Catégorie",
                            active: categorie,
                            onSelect: setCategorie,
                            options: CATEGORIES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("categorie", it.id),
                            })),
                        },
                        {
                            label: "Usage",
                            active: usage,
                            onSelect: setUsage,
                            options: USAGES.map((it) => ({
                                id: it.id,
                                label: it.label,
                                count:
                                    it.id === "all"
                                        ? undefined
                                        : countFor("usage", it.id),
                            })),
                        },
                    ]}
                    expand={{ all: expandAll, onToggle: toggleAll }}
                />

                {list.length === 0 ? (
                    <p className={styles.empty}>
                        Aucun mot à cet endroit du fil. Élargis la recherche ou
                        change de filtre.
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {list.map((d) => (
                            <VocabulaireCard
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
                    {mots.length} {entry.footerNote}
                </IndexFooter>
            </div>
        </main>
    );
}
