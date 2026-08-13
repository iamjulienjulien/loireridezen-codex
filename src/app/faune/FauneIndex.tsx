"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { FauneEspece } from "@/types/faune";
import IndexPresentation from "@/components/IndexPresentation";
import { IndexCardTrackingProvider } from "@/components/_layout/AnalyticsTracking";
import { LRZSection } from "@/components/_ui/LRZSection";
import LRZSeparateur from "@/components/_ui/LRZSeparateur";
import { PageControls } from "@/components/_layout/PageControls";
import { LRZCardDialog } from "@/components/_ui/LRZCardDialog";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { SITE_URL } from "@/lib/site-metadata";
import { trackCardNavigate } from "@/lib/analytics";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import FauneCard from "@/components/_cards/FauneCard";
import styles from "@/components/_cards/FauneCard/faune.module.css";

const norm = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function FauneIndex({
    especes,
    indexes,
    initialOpenSlug,
}: {
    especes: FauneEspece[];
    indexes: readonly IndexEntry[];
    initialOpenSlug?: string;
}) {
    const entry = getIndex("/faune")!;
    const [type, setType] = useState<string>("all");
    const [rarete, setRarete] = useState<string>("all");
    const [q, setQ] = useState("");
    const [expandAll, setExpandAll] = useState(false);
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const openEspece = openSlug
        ? especes.find((espece) => espece.slug === openSlug)
        : undefined;
    const openEspeceIndex = openEspece ? especes.indexOf(openEspece) : -1;

    const toggleAll = () => setExpandAll((value) => !value);

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

    const resetFilters = () => {
        setType("all");
        setRarete("all");
        setQ("");
    };

    return (
        <>
            {openEspece ? (
                <LRZCardDialog
                    open={Boolean(openEspece)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setOpenSlug(undefined);
                            router.replace("/faune");
                        }
                    }}
                    indexLabel={entry.title}
                    indexIcon={
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="faune"
                            size="md"
                            decorative
                        />
                    }
                    item={{
                        id: openEspece.slug,
                        label: openEspece.nomCommun,
                    }}
                    navigation={{
                        position: openEspeceIndex + 1,
                        total: especes.length,
                        previous:
                            openEspeceIndex > 0
                                ? {
                                      id: especes[openEspeceIndex - 1].slug,
                                      label: especes[openEspeceIndex - 1]
                                          .nomCommun,
                                  }
                                : undefined,
                        next:
                            openEspeceIndex < especes.length - 1
                                ? {
                                      id: especes[openEspeceIndex + 1].slug,
                                      label: especes[openEspeceIndex + 1]
                                          .nomCommun,
                                  }
                                : undefined,
                        onNavigate: ({ id }, context) => {
                            trackCardNavigate({
                                index_slug: "faune",
                                entry_slug: id,
                                previous_entry_slug: openEspece.slug,
                                direction: context.direction,
                                interaction_mode: context.interactionMode,
                                position: context.position,
                                total_items: context.total,
                            });
                            setOpenSlug(id);
                            router.replace(`/faune/${id}`);
                        },
                    }}
                    share={{
                        title: `${openEspece.nomCommun} — ${entry.title}`,
                        url: `${SITE_URL}/faune/${openEspece.slug}`,
                    }}
                    color={entry.color}
                >
                    <FauneCard d={openEspece} />
                </LRZCardDialog>
            ) : null}

            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/faune"
                indexes={indexes}
            />

            <LRZSection
                eyebrow="Le grand inventaire"
                title="Toutes les espèces du fil ligérien"
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
                headerLayout="stack"
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
                        placeholder="Chercher une espèce, un nom scientifique…"
                        resultCount={list.length}
                        totalCount={especes.length}
                        unit="espèces"
                        accent={entry.accent}
                        buttonColor={entry.color}
                        mode="filters-toggle"
                        reset={{
                            active:
                                type !== "all" || rarete !== "all" || q !== "",
                            onReset: resetFilters,
                        }}
                        action={{
                            label: "Tout déplier",
                            activeLabel: "Tout replier",
                            active: expandAll,
                            onClick: toggleAll,
                        }}
                        groups={[
                            {
                                label: "Type",
                                active: type,
                                onSelect: setType,
                                preset: {
                                    collection: "faune",
                                    meta: "type",
                                },
                                getCount: (id) =>
                                    especes.filter(
                                        (espece) => espece.type === id,
                                    ).length,
                            },
                            {
                                label: "Rareté",
                                active: rarete,
                                onSelect: setRarete,
                                preset: {
                                    collection: "faune",
                                    meta: "rarete",
                                },
                                getCount: (id) =>
                                    especes.filter(
                                        (espece) => espece.rarete === id,
                                    ).length,
                            },
                        ]}
                    />
                </div>

                <IndexCardTrackingProvider
                    indexSlug="faune"
                    entrySlugs={especes.map((espece) => espece.slug)}
                >
                    {list.length === 0 ? (
                        <p className={styles.empty}>
                            Rien à cet endroit du fil. Élargis la recherche ou
                            change de filtre.
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {list.map((d) => (
                                <FauneCard
                                    key={`${d.nomScientifique}-${expandAll}`}
                                    d={d}
                                    expandAll={expandAll}
                                />
                            ))}
                        </div>
                    )}
                </IndexCardTrackingProvider>
            </LRZSection>
        </>
    );
}
