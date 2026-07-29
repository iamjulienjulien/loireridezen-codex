"use client";

import { useMemo, useState } from "react";

import type { Chateau } from "@/types/chateau";
import type { IndexEntry } from "@/registry/indexes";

import PageHeader from "@/components/PageHeader";
import { COLLECTIONS } from "@/registry/collections";

import IndexFooter from "@/components/IndexFooter";
import IndexPresentation from "@/components/IndexPresentation";
import { PageControls } from "@/components/PageControls";

import { CollectionCard } from "@/components/ui/collection-card";

import { useAmbiance } from "@/hooks/useAmbiance";
import { getIndex } from "@/registry/indexes";
import { getCollectionsByIndex } from "@/registry/collections";

import ChateauxCard from "./ChateauxCard";

import styles from "./chateaux.module.css";
import { LRZSection } from "@/components/LRZSection";
import { featureIsEnabled } from "@/registry/feature-flags";
import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import { TerritoireSection } from "@/components/TerritoireSection";
import { getTerritoiresWithChateaux } from "@/registry/chateaux-territoires";

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

const norm = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

type ChateauxIndexProps = {
    chateaux: Chateau[];
    indexes: readonly IndexEntry[];
};

export default function ChateauxIndex({
    chateaux,
    indexes,
}: ChateauxIndexProps) {
    const entry = getIndex("/chateaux")!;

    const [epoque, setEpoque] = useState<string>("all");
    const [renommee, setRenommee] = useState<string>("all");
    const [q, setQ] = useState("");
    const [ambiance, setAmbiance] = useAmbiance();
    const [expandAll, setExpandAll] = useState(false);
    const [groupByTerritory, setGroupByTerritory] = useState(true);
    const territoiresEnabled = featureIsEnabled("territoires");

    const collections = useMemo(() => {
        const castleBySlug = new Map(
            chateaux.map((castle) => [castle.slug, castle]),
        );

        return getCollectionsByIndex("chateaux").map((collection) => ({
            href: collection.href,

            data: {
                slug: collection.slug,
                titre: collection.title,
                emoji: collection.mark,
                sousTitre: collection.subtitle,
                type: collection.type,

                classement: collection.ranking.map((rankingEntry) => {
                    const castle = castleBySlug.get(rankingEntry.slug);

                    return {
                        rang: rankingEntry.rang,
                        slug: rankingEntry.slug,
                        nom: castle?.nom ?? rankingEntry.slug,
                    };
                }),
            },
        }));
    }, [chateaux]);

    const toggleAll = () => {
        setExpandAll((value) => !value);
    };

    const countFor = (field: "epoque" | "renommee", id: string) =>
        chateaux.filter((castle) => castle[field] === id).length;

    const list = useMemo(() => {
        const normalizedQuery = norm(q.trim());

        return chateaux.filter((castle) => {
            if (epoque !== "all" && castle.epoque !== epoque) {
                return false;
            }

            if (renommee !== "all" && castle.renommee !== renommee) {
                return false;
            }

            if (normalizedQuery) {
                const searchableContent = norm(
                    [
                        castle.nom,
                        castle.commune,
                        castle.style,
                        castle.commanditaire ?? "",
                        ...castle.autresNoms,
                    ].join(" "),
                );

                if (!searchableContent.includes(normalizedQuery)) {
                    return false;
                }
            }

            return true;
        });
    }, [chateaux, epoque, renommee, q]);

    const territorySections = useMemo(
        () =>
            territoiresEnabled && groupByTerritory
                ? getTerritoiresWithChateaux(list)
                : [],
        [groupByTerritory, list, territoiresEnabled],
    );

    const controlsInOwnSection = featureIsEnabled("indexControlsSection");
    const hasActiveFilters = epoque !== "all" || renommee !== "all" || q !== "";

    const resetFilters = () => {
        setEpoque("all");
        setRenommee("all");
        setQ("");
    };

    const indexControls = (
        <PageControls
            variant="chateaux"
            query={q}
            onQuery={setQ}
            placeholder="Chercher un château, une commune, un style…"
            resultCount={list.length}
            totalCount={chateaux.length}
            unit="châteaux"
            accent={entry.accent}
            reset={{
                active: hasActiveFilters,
                onReset: resetFilters,
            }}
            groups={[
                {
                    label: "Époque",
                    active: epoque,
                    onSelect: setEpoque,
                    options: EPOQUES.map((item) => ({
                        id: item.id,
                        label: item.label,
                        count:
                            item.id === "all"
                                ? undefined
                                : countFor("epoque", item.id),
                    })),
                },
                {
                    label: "Renommée",
                    active: renommee,
                    onSelect: setRenommee,
                    options: RENOMMEES.map((item) => ({
                        id: item.id,
                        label: item.label,
                        count:
                            item.id === "all"
                                ? undefined
                                : countFor("renommee", item.id),
                    })),
                },
            ]}
            expand={{
                all: expandAll,
                onToggle: toggleAll,
            }}
            switcher={
                territoiresEnabled
                    ? {
                          label: "Organisation",
                          checked: groupByTerritory,
                          offLabel: "Inventaire continu",
                          onLabel: "Par territoires",
                          onToggle: () =>
                              setGroupByTerritory((value) => !value),
                      }
                    : undefined
            }
        />
    );

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <PageHeader
                    current="/chateaux"
                    indexes={indexes}
                    collections={COLLECTIONS}
                />

                <IndexPresentation
                    description={entry.description}
                    descriptionFooter={entry.presentationFooter}
                    current="/chateaux"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                {featureIsEnabled("collections") && (
                    <LRZSection
                        eyebrow="Collections du Codex"
                        title="Explorer les châteaux autrement"
                        description="Des forteresses médiévales aux demeures de plaisance, ces collections relient les châteaux par époque, architecture, personnages et façons d’habiter le pouvoir."
                        tone="tinted"
                        color="ocre"
                        spacing="sm"
                        // separatorAfter="spark"
                        // separatorBefore="spark"
                    >
                        <div className={styles.collectionsGrid}>
                            {collections.map(({ data, href }) => (
                                <CollectionCard
                                    key={data.slug}
                                    collection={data}
                                    href={href}
                                    variant="compact"
                                />
                            ))}
                        </div>
                    </LRZSection>
                )}

                <LRZSeparateur preset="spark" size="lg" />

                {controlsInOwnSection && (
                    <LRZSection
                        eyebrow="Filtres & repères"
                        title="Choisir son chemin parmi les châteaux"
                        description="Remonte les siècles, compare les architectures et compose ton propre itinéraire à travers les grandes demeures du val de Loire."
                        tone="surface"
                        color="ocre"
                        spacing="sm"
                        // separatorAfter="spark"
                        // separatorBefore="spark"
                    >
                        {indexControls}
                    </LRZSection>
                )}

                <LRZSection
                    eyebrow="Le grand inventaire"
                    title="Tous les châteaux du fil royal"
                    description="Parcours l’ensemble des forteresses, palais et demeures recensés dans le Codex, des monuments les plus célèbres aux silhouettes plus confidentielles."
                    tone="soft"
                    color="ocre"
                    spacing="sm"
                    className="mt-20"
                    // separatorAfter="spark"
                    // separatorBefore="spark"
                >
                    {!controlsInOwnSection && indexControls}

                    {list.length === 0 ? (
                        <p className={styles.empty}>
                            Aucun château à cet endroit du fil. Élargis la
                            recherche ou change de filtre.
                        </p>
                    ) : territoiresEnabled && groupByTerritory ? (
                        <div className={styles.territories}>
                            {territorySections.map(
                                ({ territory, chateaux }) => (
                                    <TerritoireSection
                                        key={territory.slug}
                                        territory={territory}
                                        chateaux={chateaux}
                                        open={expandAll}
                                    />
                                ),
                            )}
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {list.map((castle) => (
                                <ChateauxCard
                                    key={castle.slug}
                                    d={castle}
                                    open={expandAll}
                                />
                            ))}
                        </div>
                    )}
                </LRZSection>

                <IndexFooter ambiance={ambiance} onAmbiance={setAmbiance}>
                    <span
                        style={{
                            display: "block",
                            marginBottom: "5px",
                            color: "var(--text-secondary)",
                            fontSize: "12px",
                        }}
                    >
                        {list.length} {entry.footerNote}
                    </span>
                    {entry.title} · Le Codex Ligérien · Loire Ride Zen
                </IndexFooter>
            </div>
        </main>
    );
}
