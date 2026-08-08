"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IndexPresentation from "@/components/IndexPresentation";
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
    relationCount: number;
    initialOpenSlug?: string;
};

export default function PersonnagesIndex({
    entries,
    indexes,
    relationCount,
    initialOpenSlug,
}: PersonnagesIndexProps) {
    const entry = getIndex("/personnages")!;
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const openEntry = openSlug
        ? entries.find(({ personnage }) => personnage.id === openSlug)
        : undefined;

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
            >
                {entry.presentation_md}
            </IndexPresentation>

            <p className={styles.context}>
                {entries.length} personnages · {relationCount} liens avec les
                châteaux
            </p>

            <section className={styles.grid} aria-label="Personnages du Codex">
                {entries.map(({ personnage, relations }) => (
                    <PersonnageCard
                        key={personnage.id}
                        personnage={personnage}
                        relations={relations}
                    />
                ))}
            </section>

            <p className={styles.note}>
                Ce répertoire relie les personnages aux châteaux du Codex ; il
                n’a pas vocation à remplacer leurs notices historiques
                détaillées.
            </p>
        </>
    );
}
