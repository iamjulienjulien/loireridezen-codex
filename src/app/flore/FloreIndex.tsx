"use client";

import { useMemo, useState } from "react";
import type { Flore } from "@/types/flore";
import IndexPresentation from "@/components/IndexPresentation";
import IndexControls from "@/components/IndexControls";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import FloreCard from "./FloreCard";
import styles from "./flore.module.css";

const CATEGORIES = [
    { id: "all", label: "Tout" },
    { id: "arbre", label: "Arbres" },
    { id: "arbuste", label: "Arbustes" },
    { id: "herbacée", label: "Herbacées" },
    { id: "graminée", label: "Graminées" },
    { id: "aquatique", label: "Aquatiques" },
    { id: "fougère", label: "Fougères" },
    { id: "grimpante", label: "Grimpantes" },
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

export default function FloreIndex({
    flore,
    indexes,
}: {
    flore: Flore[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/flore")!;
    const [categorie, setCategorie] = useState<string>("all");
    const [rarete, setRarete] = useState<string>("all");
    const [q, setQ] = useState("");
    const [expandAll, setExpandAll] = useState(false);

    const toggleAll = () => setExpandAll((value) => !value);

    const countFor = (field: "categorie" | "rarete", id: string) =>
        flore.filter((d) => d[field] === id).length;

    const list = useMemo(() => {
        const nq = norm(q.trim());
        return flore.filter((d) => {
            if (categorie !== "all" && d.categorie !== categorie) return false;
            if (rarete !== "all" && d.rarete !== rarete) return false;
            if (nq) {
                const hay = norm(
                    [
                        d.nomCommun,
                        d.nomScientifique,
                        d.famille,
                        ...d.autresNoms,
                    ].join(" "),
                );
                if (!hay.includes(nq)) return false;
            }
            return true;
        });
    }, [flore, categorie, rarete, q]);

    return (
        <>
            <IndexPresentation
                description={entry.description}
                current="/flore"
                indexes={indexes}
            >
                {entry.presentation_md}
            </IndexPresentation>

            <IndexControls
                query={q}
                onQuery={setQ}
                placeholder="Chercher une plante, un nom scientifique, une famille…"
                resultCount={list.length}
                totalCount={flore.length}
                unit="espèces"
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
                    Rien ne pousse à cet endroit du fil. Élargis la recherche ou
                    change de filtre.
                </p>
            ) : (
                <div className={styles.grid}>
                    {list.map((d) => (
                        <FloreCard
                            key={`${d.slug}-${expandAll}`}
                            d={d}
                            expandAll={expandAll}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
