"use client";

import { useMemo, useState, type CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import type { Vignoble } from "@/types/vignoble";
import IndexPresentation from "@/components/IndexPresentation";
import { LRZCardDialog } from "@/components/_ui/LRZCardDialog";
import { LRZSection } from "@/components/_ui/LRZSection";
import LRZSeparateur from "@/components/_ui/LRZSeparateur";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { PageControls } from "@/components/_layout/PageControls";
import { SITE_URL } from "@/lib/site-metadata";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import VignoblesCard from "@/components/_cards/VignoblesCard";
import styles from "@/components/_cards/VignoblesCard/vignobles.module.css";

const norm = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function VignoblesIndex({
    vignobles,
    indexes,
    initialOpenSlug,
}: {
    vignobles: Vignoble[];
    indexes: readonly IndexEntry[];
    initialOpenSlug?: string;
}) {
    const entry = getIndex("/vignobles")!;
    const [couleur, setCouleur] = useState<string>("all");
    const [notoriete, setNotoriete] = useState<string>("all");
    const [q, setQ] = useState("");
    const [expandAll, setExpandAll] = useState(false);
    const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
        {},
    );
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const openVignoble = openSlug
        ? vignobles.find((vignoble) => vignoble.slug === openSlug)
        : undefined;
    const openVignobleIndex = openVignoble
        ? vignobles.indexOf(openVignoble)
        : -1;

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
            {openVignoble ? (
                <LRZCardDialog
                    open={Boolean(openVignoble)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setOpenSlug(undefined);
                            router.replace("/vignobles");
                        }
                    }}
                    indexLabel={entry.title}
                    indexIcon={
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="vignobles"
                            size="md"
                            decorative
                        />
                    }
                    item={{ id: openVignoble.slug, label: openVignoble.nom }}
                    navigation={{
                        position: openVignobleIndex + 1,
                        total: vignobles.length,
                        previous:
                            openVignobleIndex > 0
                                ? {
                                      id: vignobles[openVignobleIndex - 1].slug,
                                      label: vignobles[openVignobleIndex - 1]
                                          .nom,
                                  }
                                : undefined,
                        next:
                            openVignobleIndex < vignobles.length - 1
                                ? {
                                      id: vignobles[openVignobleIndex + 1].slug,
                                      label: vignobles[openVignobleIndex + 1]
                                          .nom,
                                  }
                                : undefined,
                        onNavigate: ({ id }) => {
                            setOpenSlug(id);
                            router.replace(`/vignoble/${id}`);
                        },
                    }}
                    share={{
                        title: `${openVignoble.nom} — ${entry.title}`,
                        text: openVignoble.sousTitre,
                        url: `${SITE_URL}/vignoble/${openVignoble.slug}`,
                    }}
                    color={entry.color}
                >
                    <VignoblesCard
                        d={openVignoble}
                        open={false}
                        onToggle={() => undefined}
                    />
                </LRZCardDialog>
            ) : null}

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
