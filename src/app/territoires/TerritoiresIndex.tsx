"use client";

import { useState, type CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import IndexPresentation from "@/components/IndexPresentation";
import {
    LRZDialog,
    LRZDialogBody,
    LRZDialogContent,
} from "@/components/LRZDialog";
import LRZSeparateur from "@/components/LRZSeparateur";
import { LRZSection } from "@/components/LRZSection";
import { getTerritoireChateaux } from "@/registry/chateaux-territoires";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import type { TerritoireSlug } from "@/registry/territoires";
import type { ChateauV2 } from "@/types/chateauV2";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import TerritoireCard from "./TerritoireCard";
import styles from "./territoires.module.css";

type TerritoiresIndexProps = {
    territoires: readonly TerritoireCatalogueEntry[];
    chateaux: readonly ChateauV2[];
    guinguettes: readonly Guinguette[];
    indexes: readonly IndexEntry[];
    initialOpenSlug?: string;
};

export default function TerritoiresIndex({
    territoires,
    chateaux,
    guinguettes,
    indexes,
    initialOpenSlug,
}: TerritoiresIndexProps) {
    const entry = getIndex("/territoires")!;
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const openTerritoire = openSlug
        ? territoires.find((territoire) => territoire.slug === openSlug)
        : undefined;

    return (
        <>
            <LRZDialog
                open={Boolean(openTerritoire)}
                onOpenChange={(open) => {
                    if (!open) {
                        setOpenSlug(undefined);
                        router.replace("/territoires");
                    }
                }}
            >
                {openTerritoire ? (
                    <LRZDialogContent
                        size="sm"
                        variant="immersive"
                        scrollMode="content"
                        color={entry.color}
                    >
                        <LRZDialogBody padding="none">
                            <TerritoireCard
                                territoire={openTerritoire}
                                chateaux={getTerritoireChateaux(
                                    chateaux,
                                    openTerritoire.slug as TerritoireSlug,
                                )}
                                guinguettes={guinguettes.filter(
                                    (guinguette) =>
                                        guinguette.territoire ===
                                        openTerritoire.slug,
                                )}
                            />
                        </LRZDialogBody>
                    </LRZDialogContent>
                ) : null}
            </LRZDialog>

            <IndexPresentation
                description={entry.description}
                descriptionFooter={entry.presentationFooter}
                current="/territoires"
                indexes={indexes}
            />

            <LRZSection
                eyebrow="Le grand atlas"
                title="Les territoires du fil ligérien"
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

                <ol className={styles.grid}>
                    {territoires.map((territoire) => (
                        <li className={styles.item} key={territoire.slug}>
                            <TerritoireCard
                                territoire={territoire}
                                chateaux={getTerritoireChateaux(
                                    chateaux,
                                    territoire.slug as TerritoireSlug,
                                )}
                                guinguettes={guinguettes.filter(
                                    (guinguette) =>
                                        guinguette.territoire ===
                                        territoire.slug,
                                )}
                            />
                        </li>
                    ))}
                </ol>
            </LRZSection>
        </>
    );
}
