"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import IndexPresentation from "@/components/IndexPresentation";
import { LRZSection } from "@/components/LRZSection";
import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import { PageControls } from "@/components/PageControls";
import {
    LRZDialog,
    LRZDialogBody,
    LRZDialogContent,
} from "@/components/LRZDialog";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import type { Personnage, RelationPersonnageLieu } from "@/types/personnage";

import PersonnageCard from "./PersonnageCard";
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
            <LRZDialog
                open={Boolean(openEntry)}
                onOpenChange={(open) => {
                    if (!open) {
                        setOpenSlug(undefined);
                        router.replace("/personnages");
                    }
                }}
            >
                {openEntry ? (
                    <LRZDialogContent size="sm" variant="immersive">
                        <LRZDialogBody padding="none">
                            <PersonnageCard
                                personnage={openEntry.personnage}
                                relations={openEntry.relations}
                            />
                        </LRZDialogBody>
                    </LRZDialogContent>
                ) : null}
            </LRZDialog>

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
            </LRZSection>

            <p className={styles.note}>
                Ce répertoire relie les personnages aux châteaux du Codex ; il
                n’a pas vocation à remplacer leurs notices historiques
                détaillées.
            </p>
        </>
    );
}
