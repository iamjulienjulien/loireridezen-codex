"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Flore } from "@/types/flore";
import IndexPresentation from "@/components/IndexPresentation";
import { LRZSection } from "@/components/_ui/LRZSection";
import LRZSeparateur from "@/components/_ui/LRZSeparateur/LRZSeparateur";
import { PageControls } from "@/components/_layout/PageControls";
import { LRZCardDialog } from "@/components/_ui/LRZCardDialog";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { SITE_URL } from "@/lib/site-metadata";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import FloreCard from "@/components/_cards/FloreCard";
import styles from "@/components/_cards/FloreCard/flore.module.css";

const norm = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function FloreIndex({
    flore,
    indexes,
    initialOpenSlug,
}: {
    flore: Flore[];
    indexes: readonly IndexEntry[];
    initialOpenSlug?: string;
}) {
    const entry = getIndex("/flore")!;
    const [categorie, setCategorie] = useState<string>("all");
    const [rarete, setRarete] = useState<string>("all");
    const [q, setQ] = useState("");
    const [expandAll, setExpandAll] = useState(false);
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const openFlore = openSlug
        ? flore.find((entry) => entry.slug === openSlug)
        : undefined;
    const openFloreIndex = openFlore ? flore.indexOf(openFlore) : -1;

    const toggleAll = () => setExpandAll((value) => !value);

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
            {openFlore ? (
                <LRZCardDialog
                    open={Boolean(openFlore)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setOpenSlug(undefined);
                            router.replace("/flore");
                        }
                    }}
                    indexLabel={entry.title}
                    indexIcon={
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="flore"
                            size="md"
                            decorative
                        />
                    }
                    item={{ id: openFlore.slug, label: openFlore.nomCommun }}
                    navigation={{
                        position: openFloreIndex + 1,
                        total: flore.length,
                        previous:
                            openFloreIndex > 0
                                ? {
                                      id: flore[openFloreIndex - 1].slug,
                                      label: flore[openFloreIndex - 1]
                                          .nomCommun,
                                  }
                                : undefined,
                        next:
                            openFloreIndex < flore.length - 1
                                ? {
                                      id: flore[openFloreIndex + 1].slug,
                                      label: flore[openFloreIndex + 1]
                                          .nomCommun,
                                  }
                                : undefined,
                        onNavigate: ({ id }) => {
                            setOpenSlug(id);
                            router.replace(`/flore/${id}`);
                        },
                    }}
                    share={{
                        title: `${openFlore.nomCommun} — ${entry.title}`,
                        url: `${SITE_URL}/flore/${openFlore.slug}`,
                    }}
                    color={entry.color}
                >
                    <FloreCard d={openFlore} />
                </LRZCardDialog>
            ) : null}

            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/flore"
                indexes={indexes}
            />

            <LRZSection
                eyebrow="Le grand inventaire"
                title="Toutes les plantes du fil ligérien"
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
                        placeholder="Chercher une plante, un nom scientifique, une famille…"
                        resultCount={list.length}
                        totalCount={flore.length}
                        unit="espèces"
                        accent={entry.accent}
                        buttonColor={entry.color}
                        mode="filters-toggle"
                        reset={{
                            active:
                                categorie !== "all" ||
                                rarete !== "all" ||
                                q !== "",
                            onReset: () => {
                                setCategorie("all");
                                setRarete("all");
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
                                preset: {
                                    collection: "flore",
                                    meta: "categorie",
                                },
                                getCount: (id) =>
                                    flore.filter(
                                        (entry) => entry.categorie === id,
                                    ).length,
                            },
                            {
                                label: "Rareté",
                                active: rarete,
                                onSelect: setRarete,
                                preset: {
                                    collection: "flore",
                                    meta: "rarete",
                                },
                                getCount: (id) =>
                                    flore.filter((entry) => entry.rarete === id)
                                        .length,
                            },
                        ]}
                    />
                </div>

                {list.length === 0 ? (
                    <p className={styles.empty}>
                        Rien ne pousse à cet endroit du fil. Élargis la
                        recherche ou change de filtre.
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
            </LRZSection>
        </>
    );
}
