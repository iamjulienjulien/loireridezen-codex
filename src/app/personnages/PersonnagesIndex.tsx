"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import IndexPresentation from "@/components/IndexPresentation";
import { IndexCardTrackingProvider } from "@/components/_layout/AnalyticsTracking";
import { LRZSection } from "@/components/_ui/LRZSection";
import LRZSeparateur from "@/components/_ui/LRZSeparateur";
import { PageControls } from "@/components/_layout/PageControls";
import { LRZCardDialog } from "@/components/_ui/LRZCardDialog";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { SITE_URL } from "@/lib/site-metadata";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import type { Personnage, RelationPersonnageLieu } from "@/types/personnage";

import PersonnageCard from "@/components/_cards/PersonnageCard";
import styles from "./personnages.module.css";

export type PersonnageIndexEntry = {
    personnage: Personnage;
    relations: readonly RelationPersonnageLieu[];
};

type PersonnagesIndexProps = {
    entries: readonly PersonnageIndexEntry[];
    indexes: readonly IndexEntry[];
    initialOpenSlug?: string;
};

export default function PersonnagesIndex({
    entries,
    indexes,
    initialOpenSlug,
}: PersonnagesIndexProps) {
    const entry = getIndex("/personnages")!;
    const [categorie, setCategorie] = useState("all");
    const [query, setQuery] = useState("");
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const openEntry = openSlug
        ? entries.find(({ personnage }) => personnage.id === openSlug)
        : undefined;
    const openEntryIndex = openEntry ? entries.indexOf(openEntry) : -1;
    const filteredEntries = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        return entries.filter(({ personnage }) => {
            if (
                categorie !== "all" &&
                personnage.categoriePrincipale !== categorie
            ) {
                return false;
            }
            if (!normalizedQuery) return true;

            return [personnage.nom, ...(personnage.autresNoms ?? [])]
                .join(" ")
                .toLocaleLowerCase()
                .includes(normalizedQuery);
        });
    }, [categorie, entries, query]);

    return (
        <>
            {openEntry ? (
                <LRZCardDialog
                    open={Boolean(openEntry)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setOpenSlug(undefined);
                            router.replace("/personnages");
                        }
                    }}
                    indexLabel={entry.title}
                    indexIcon={
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="personnages"
                            size="md"
                            decorative
                        />
                    }
                    item={{
                        id: openEntry.personnage.id,
                        label: openEntry.personnage.nom,
                    }}
                    navigation={{
                        position: openEntryIndex + 1,
                        total: entries.length,
                        previous:
                            openEntryIndex > 0
                                ? {
                                      id: entries[openEntryIndex - 1].personnage
                                          .id,
                                      label: entries[openEntryIndex - 1]
                                          .personnage.nom,
                                  }
                                : undefined,
                        next:
                            openEntryIndex < entries.length - 1
                                ? {
                                      id: entries[openEntryIndex + 1].personnage
                                          .id,
                                      label: entries[openEntryIndex + 1]
                                          .personnage.nom,
                                  }
                                : undefined,
                        onNavigate: ({ id }) => {
                            setOpenSlug(id);
                            router.replace(`/personnage/${id}`);
                        },
                    }}
                    share={{
                        title: `${openEntry.personnage.nom} — ${entry.title}`,
                        url: `${SITE_URL}/personnage/${openEntry.personnage.id}`,
                    }}
                    color={entry.color}
                >
                    <PersonnageCard
                        personnage={openEntry.personnage}
                        relations={openEntry.relations}
                    />
                </LRZCardDialog>
            ) : null}

            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/personnages"
                indexes={indexes}
            />

            <LRZSection
                eyebrow="Le grand répertoire"
                title="Les personnages du fil ligérien"
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
                        query={query}
                        onQuery={setQuery}
                        placeholder="Chercher un personnage…"
                        resultCount={filteredEntries.length}
                        totalCount={entries.length}
                        unit="personnages"
                        accent={entry.accent}
                        buttonColor={entry.color}
                        mode="filters-toggle"
                        reset={{
                            active: categorie !== "all" || query !== "",
                            onReset: () => {
                                setCategorie("all");
                                setQuery("");
                            },
                        }}
                        groups={[
                            {
                                label: "Catégorie",
                                active: categorie,
                                onSelect: setCategorie,
                                preset: {
                                    collection: "personnage",
                                    meta: "categorie",
                                },
                                getCount: (id) =>
                                    entries.filter(
                                        ({ personnage }) =>
                                            personnage.categoriePrincipale ===
                                            id,
                                    ).length,
                            },
                        ]}
                    />
                </div>

                <IndexCardTrackingProvider
                    indexSlug="personnages"
                    entrySlugs={entries.map(({ personnage }) => personnage.id)}
                >
                    <section
                        className={styles.grid}
                        aria-label="Personnages du Codex"
                    >
                        {filteredEntries.map(({ personnage, relations }) => (
                            <PersonnageCard
                                key={personnage.id}
                                personnage={personnage}
                                relations={relations}
                            />
                        ))}
                    </section>
                </IndexCardTrackingProvider>
            </LRZSection>

            <p className={styles.note}>
                Ce répertoire relie les personnages aux châteaux du Codex ; il
                n’a pas vocation à remplacer leurs notices historiques
                détaillées.
            </p>
        </>
    );
}
