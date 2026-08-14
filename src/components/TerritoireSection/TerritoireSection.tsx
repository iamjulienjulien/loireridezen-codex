"use client";

import type { CSSProperties } from "react";
import { MapPin, Waves } from "lucide-react";
import Link from "next/link";

import type { Territoire } from "@/types/territoire";
import type { PersonnagesParLieu } from "@/types/personnage";
import type { Guinguette } from "@/types/guinguette";
import type { NearbyGuinguettesByChateau } from "@/lib/nearby-guinguettes";
import type { Vignoble } from "@/types/vignoble";

import ChateauxCard from "@/components/_cards/ChateauxCard";
import GuinguetteCard from "@/components/_cards/GuinguetteCard";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { LRZStamp } from "@/components/_ui/LRZStamp";
import { LRZTypography } from "@/components/_ui/LRZTypography";
import { isCommonTerritoire } from "@/registry/Meta/common-territoire";

import styles from "./TerritoireSection.module.css";
import { lighter } from "@/lib/colors";
import LRZSeparateur from "@/components/_ui/LRZSeparateur";
import { getLRZColorValue } from "@/registry/colors";
import type { Chateau } from "@/types/chateau";

type TerritoireSectionStyle = CSSProperties & {
    "--territoire-accent": string;
};

type TerritoireSectionProps = {
    territory: Territoire;
    chateaux?: readonly Chateau[];
    guinguettes?: readonly Guinguette[];
    personnagesByChateau?: PersonnagesParLieu;
    nearbyGuinguettesByChateau?: NearbyGuinguettesByChateau;
    vignobles?: readonly Vignoble[];
    /** Ajoute un repère DOM pour la synchronisation expérimentale de carte. */
    mapSync?: boolean;
    onShowOnMap?: (slug: string) => void;
};

export default function TerritoireSection({
    territory,
    chateaux,
    guinguettes,
    personnagesByChateau,
    nearbyGuinguettesByChateau,
    vignobles,
    mapSync = false,
    onShowOnMap,
}: TerritoireSectionProps) {
    const { identite, limites } = territory;
    const entries = chateaux ?? guinguettes ?? [];
    const isGuinguettes = guinguettes !== undefined;

    const color = getLRZColorValue(identite.color);
    const colorLighter = lighter(color, 0);
    const visibleVignobles = vignobles?.slice(0, 3) ?? [];
    const hasMoreVignobles = (vignobles?.length ?? 0) > 3;

    return (
        <section
            id={`territoire-${territory.slug}`}
            className={styles.section}
            data-map-sync-territory={mapSync ? territory.slug : undefined}
            style={
                {
                    "--territoire-accent": color,
                    "--territoire-accent-lighter": colorLighter,
                    "--territoire-color": color,
                    "--territoire-color-lighter": colorLighter,
                } as TerritoireSectionStyle
            }
            aria-labelledby={`territoire-${territory.slug}-title`}
        >
            <header className={styles.header}>
                <div className={styles.eyebrowRow}>
                    <p className={styles.eyebrow}>
                        De <strong>{limites.amont}</strong> à{" "}
                        <strong>{limites.aval}</strong>
                    </p>
                    <p className={styles.count}>
                        <strong>{entries.length}</strong>{" "}
                        {isGuinguettes
                            ? entries.length > 1
                                ? "guinguettes"
                                : "guinguette"
                            : entries.length > 1
                              ? "châteaux"
                              : "château"}
                    </p>
                </div>
                <div style={{ marginTop: "1rem", marginBottom: ".7rem" }}>
                    <LRZSeparateur
                        preset="dot"
                        color={identite.color}
                        size="lg"
                        scope="content"
                        marginBlock={"0"}
                        weight="regular"
                        tone="subtle"
                    />
                </div>
                <div className={styles.identity}>
                    {isCommonTerritoire(territory.slug) ? (
                        <LRZSymbol
                            collection="common"
                            meta="territoire"
                            slug={territory.slug}
                            size={152}
                            frame="none"
                            padding="none"
                            shadow="strong"
                            decorative
                            className={styles.crest}
                        />
                    ) : (
                        <span className={styles.mark} aria-hidden="true">
                            {identite.mark}
                        </span>
                    )}

                    <div className={styles.copy}>
                        <div className={styles.titleRow}>
                            <LRZTypography
                                id={`territoire-${territory.slug}-title`}
                                className={styles.title}
                                preset="heading-1"
                                as="h2"
                                gradient={{
                                    from: identite.color,
                                    to: identite.color,
                                    angle: 105,
                                }}
                                style={{
                                    backgroundImage:
                                        "linear-gradient(108deg, color-mix(in srgb, var(--typography-gradient-from) 56%, var(--color-ambiance-texte-primaire)) 0%, var(--typography-gradient-from) 40%, color-mix(in srgb, var(--typography-gradient-from) 82%, var(--color-ambiance-texte-primaire)) 68%, color-mix(in srgb, var(--typography-gradient-from) 48%, var(--color-ambiance-texte-primaire)) 100%)",
                                }}
                            >
                                {territory.nom}
                            </LRZTypography>
                        </div>

                        <p className={styles.subtitle}>{territory.sousTitre}</p>

                        <dl className={styles.details}>
                            <div>
                                <dt>
                                    <MapPin aria-hidden="true" />
                                    Villes
                                </dt>
                                <dd>{territory.reperes.join(" · ")}</dd>
                            </div>
                            <div>
                                <dt>
                                    <Waves aria-hidden="true" />
                                    Eaux
                                </dt>
                                <dd>{territory.coursEau.join(" · ")}</dd>
                            </div>
                        </dl>

                        {visibleVignobles.length > 0 ? (
                            <div className={styles.vineyards}>
                                <p>Vignobles du territoire</p>
                                <div className={styles.vineyardStamps}>
                                    {visibleVignobles.map((vignoble) => (
                                        <Link
                                            key={vignoble.slug}
                                            href={`/vignoble/${vignoble.slug}`}
                                            className={styles.vineyardStampLink}
                                        >
                                            <LRZStamp
                                                collection="vignoble"
                                                meta="couleur"
                                                slug={vignoble.couleur}
                                                label={vignoble.nom}
                                                variant="badge"
                                                tone="ghost"
                                                size="xs"
                                                font="display"
                                                labelSize="xs"
                                                padding="xs"
                                                gap="xs"
                                                gradient={false}
                                            />
                                        </Link>
                                    ))}
                                    {hasMoreVignobles ? (
                                        <Link
                                            href={`/territoire/${territory.slug}`}
                                            className={styles.moreVineyardsLink}
                                            aria-label={`Voir les ${vignobles?.length} vignobles du ${territory.nom}`}
                                        >
                                            Voir tous les vignobles
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </header>

            <div className={styles.grid}>
                {isGuinguettes
                    ? guinguettes?.map((guinguette) => (
                          <div
                              id={`guinguette-${guinguette.slug}`}
                              data-guinguette-map-slug={
                                  mapSync ? guinguette.slug : undefined
                              }
                              data-map-sync-card={mapSync ? "" : undefined}
                              key={guinguette.slug}
                          >
                              <GuinguetteCard guinguette={guinguette} />
                          </div>
                      ))
                    : chateaux?.map((chateau) => (
                          <div
                              id={`chateau-${chateau.slug}`}
                              data-chateau-map-slug={
                                  mapSync ? chateau.slug : undefined
                              }
                              data-map-sync-card={mapSync ? "" : undefined}
                              key={chateau.slug}
                          >
                              <ChateauxCard
                                  d={chateau}
                                  t={territory}
                                  personnages={
                                      personnagesByChateau?.[chateau.slug] ?? []
                                  }
                                  nearbyGuinguettes={
                                      nearbyGuinguettesByChateau?.[chateau.slug]
                                  }
                                  onShowOnMap={onShowOnMap}
                              />
                          </div>
                      ))}
            </div>
        </section>
    );
}
