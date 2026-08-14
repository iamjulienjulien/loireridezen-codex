"use client";

import { useState, type CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import IndexPresentation from "@/components/IndexPresentation";
import { IndexCardTrackingProvider } from "@/components/_layout/AnalyticsTracking";
import { LRZCardDialog } from "@/components/_ui/LRZCardDialog";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import LRZSeparateur from "@/components/_ui/LRZSeparateur";
import { LRZSection } from "@/components/_ui/LRZSection";
import { SITE_URL } from "@/lib/site-metadata";
import {
    buildCardHrefWithReturn,
    type CardReturnContext,
} from "@/lib/card-return-context";
import { trackCardNavigate } from "@/lib/analytics";
import type { VignoblesParTerritoire } from "@/lib/vignobles-territoires";
import { getTerritoireChateaux } from "@/registry/chateaux-territoires";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import type { TerritoireSlug } from "@/registry/territoires";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import TerritoireCard from "@/components/_cards/TerritoireCard";
import styles from "./territoires.module.css";

type TerritoiresIndexProps = {
    territoires: readonly TerritoireCatalogueEntry[];
    chateaux: readonly Chateau[];
    guinguettes: readonly Guinguette[];
    indexes: readonly IndexEntry[];
    initialOpenSlug?: string;
    returnContext?: CardReturnContext;
    vignoblesByTerritoire?: VignoblesParTerritoire;
};

export default function TerritoiresIndex({
    territoires,
    chateaux,
    guinguettes,
    indexes,
    initialOpenSlug,
    returnContext,
    vignoblesByTerritoire,
}: TerritoiresIndexProps) {
    const entry = getIndex("/territoires")!;
    const [openSlug, setOpenSlug] = useState(initialOpenSlug);
    const router = useRouter();
    const openTerritoire = openSlug
        ? territoires.find((territoire) => territoire.slug === openSlug)
        : undefined;
    const openTerritoireIndex = openTerritoire
        ? territoires.indexOf(openTerritoire)
        : -1;

    return (
        <>
            {openTerritoire ? (
                <LRZCardDialog
                    open={Boolean(openTerritoire)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setOpenSlug(undefined);
                            router.replace("/territoires");
                        }
                    }}
                    indexLabel={entry.title}
                    indexIcon={
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="territoires"
                            size="md"
                            decorative
                        />
                    }
                    item={{
                        id: openTerritoire.slug,
                        label: openTerritoire.nom,
                    }}
                    returnTo={
                        returnContext
                            ? {
                                  ...returnContext,
                                  onNavigate: () =>
                                      router.push(returnContext.href),
                              }
                            : undefined
                    }
                    navigation={{
                        position: openTerritoireIndex + 1,
                        total: territoires.length,
                        previous:
                            openTerritoireIndex > 0
                                ? {
                                      id: territoires[openTerritoireIndex - 1]
                                          .slug,
                                      label: territoires[
                                          openTerritoireIndex - 1
                                      ].nom,
                                  }
                                : undefined,
                        next:
                            openTerritoireIndex < territoires.length - 1
                                ? {
                                      id: territoires[openTerritoireIndex + 1]
                                          .slug,
                                      label: territoires[
                                          openTerritoireIndex + 1
                                      ].nom,
                                  }
                                : undefined,
                        onNavigate: ({ id }, context) => {
                            trackCardNavigate({
                                index_slug: "territoires",
                                entry_slug: id,
                                previous_entry_slug: openTerritoire.slug,
                                direction: context.direction,
                                interaction_mode: context.interactionMode,
                                position: context.position,
                                total_items: context.total,
                            });
                            setOpenSlug(id);
                            router.replace(
                                buildCardHrefWithReturn(
                                    `/territoire/${id}`,
                                    returnContext?.href,
                                ),
                            );
                        },
                    }}
                    share={{
                        title: `${openTerritoire.nom} — ${entry.title}`,
                        url: `${SITE_URL}/territoire/${openTerritoire.slug}`,
                    }}
                    color={entry.color}
                >
                    <TerritoireCard
                        territoire={openTerritoire}
                        chateaux={getTerritoireChateaux(
                            chateaux,
                            openTerritoire.slug as TerritoireSlug,
                        )}
                        guinguettes={guinguettes.filter(
                            (guinguette) =>
                                guinguette.territoire === openTerritoire.slug,
                        )}
                        vignobles={
                            vignoblesByTerritoire
                                ? (vignoblesByTerritoire[
                                      openTerritoire.slug as TerritoireSlug
                                  ] ?? [])
                                : undefined
                        }
                    />
                </LRZCardDialog>
            ) : null}

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

                <IndexCardTrackingProvider
                    indexSlug="territoires"
                    entrySlugs={territoires.map(
                        (territoire) => territoire.slug,
                    )}
                >
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
                                    vignobles={
                                        vignoblesByTerritoire
                                            ? (vignoblesByTerritoire[
                                                  territoire.slug as TerritoireSlug
                                              ] ?? [])
                                            : undefined
                                    }
                                />
                            </li>
                        ))}
                    </ol>
                </IndexCardTrackingProvider>
            </LRZSection>
        </>
    );
}
