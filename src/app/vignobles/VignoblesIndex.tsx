"use client";

import { useMemo, useState, type CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import type { Vignoble } from "@/types/vignoble";
import IndexPresentation from "@/components/IndexPresentation";
import { LRZSection } from "@/components/LRZSection";
import LRZSeparateur from "@/components/LRZSeparateur";
import { PageControls } from "@/components/PageControls";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import VignoblesCard from "./VignoblesCard";
import styles from "./vignobles.module.css";

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
    const [notoriete, setNotoriete] = useState<string>("all");
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

    const countFor = (field: "couleur" | "notoriete", id: string) =>
        vignobles.filter((d) => d[field] === id).length;

    const list = useMemo(() => {
        const nq = norm(q.trim());
        return vignobles.filter((d) => {
            if (couleur !== "all" && d.couleur !== couleur) return false;
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
    }, [vignobles, couleur, notoriete, q]);

    return (
        <>
            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/vignobles"
                indexes={indexes}
            />

            <LRZSection
                eyebrow="Le grand inventaire"
                title="Les appellations du fil ligérien"
                description={
                    <div
                        className={styles.inventoryDescription}
                        style={
                            {
                                "--inventory-accent": entry.accent,
                            } as CSSProperties
                        }
                    >
                        <ReactMarkdown>{entry.presentation_md}</ReactMarkdown>
                    </div>
                }
                tone="soft"
                color={entry.color}
                spacing="sm"
                headerClassName={`${styles.inventoryHeader} mb-0!`}
            >
                <LRZSeparateur
                    scope="content"
                    preset="diamond"
                    size="xl"
                    marginBlock="2rem"
                    color={entry.color}
                />

                <div className="mt-5">
                    <PageControls
                        query={q}
                        onQuery={setQ}
                        placeholder="Chercher une appellation, un cépage, une commune…"
                        resultCount={list.length}
                        totalCount={vignobles.length}
                        unit="appellations"
                        accent={entry.accent}
                        buttonColor={entry.color}
                        mode="filters-toggle"
                        reset={{
                            active:
                                couleur !== "all" ||
                                notoriete !== "all" ||
                                q !== "",
                            onReset: () => {
                                setCouleur("all");
                                setNotoriete("all");
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
                                label: "Couleur",
                                active: couleur,
                                onSelect: setCouleur,
                                preset: {
                                    collection: "vignoble",
                                    meta: "couleur",
                                },
                                getCount: (id) => countFor("couleur", id),
                            },
                            {
                                label: "Notoriété",
                                active: notoriete,
                                onSelect: setNotoriete,
                                preset: {
                                    collection: "vignoble",
                                    meta: "notoriete",
                                },
                                getCount: (id) => countFor("notoriete", id),
                            },
                        ]}
                    />
                </div>

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
                                version={4}
                                d={d}
                                open={openOverrides[d.slug] ?? expandAll}
                                onToggle={() => toggleOne(d.slug)}
                            />
                        ))}
                    </div>
                )}
            </LRZSection>
        </>
    );
}
