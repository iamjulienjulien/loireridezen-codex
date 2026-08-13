"use client";

import { useMemo, useState } from "react";
import type { Mot } from "@/types/mot";
import IndexPresentation from "@/components/IndexPresentation";
import { PageControls } from "@/components/_layout/PageControls";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import VocabulaireCard from "@/components/_cards/VocabulaireCard";
import styles from "@/components/_cards/VocabulaireCard/vocabulaire.module.css";

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
        <>
            <IndexPresentation
                description={entry.description}
                current="/vocabulaire"
                indexes={indexes}
            >
                {entry.presentation_md}
            </IndexPresentation>

            <PageControls
                query={q}
                onQuery={setQ}
                placeholder="Chercher un mot, une définition, une variante…"
                resultCount={list.length}
                totalCount={mots.length}
                unit="mots"
                accent={entry.accent}
                buttonColor={entry.color}
                mode="filters-toggle"
                reset={{
                    active: categorie !== "all" || usage !== "all" || q !== "",
                    onReset: () => {
                        setCategorie("all");
                        setUsage("all");
                        setQ("");
                    },
                }}
                action={{
                    label: "Tout déplier",
                    activeLabel: "Tout replier",
                    active: expandAll,
                    onClick: toggleAll,
                }}
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
                            d={d}
                            open={openOverrides[d.slug] ?? expandAll}
                            onToggle={() => toggleOne(d.slug)}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
