"use client";

import type { CSSProperties } from "react";
import { MapPin, Waves } from "lucide-react";

import type { Chateau } from "@/types/chateau";
import type { Territoire } from "@/types/territoire";
import type { PersonnagesParLieu } from "@/types/personnage";

import ChateauxCard from "@/app/chateaux/ChateauxCard";
import { LRZSymbol } from "@/components/LRZSymbol";
import { isCommonTerritoire } from "@/registry/Meta/common-territoire";

import styles from "./TerritoireSection.module.css";
import { lighter } from "@/lib/colors";
import LRZSeparateur from "../LRZSeparateur/LRZSeparateur";
import { getLRZColorValue } from "@/registry/colors";

type TerritoireSectionStyle = CSSProperties & {
    "--territoire-accent": string;
};

type TerritoireSectionProps = {
    territory: Territoire;
    chateaux: readonly Chateau[];
    personnagesByChateau: PersonnagesParLieu;
    /** Ajoute un repère DOM pour la synchronisation expérimentale de carte. */
    mapSync?: boolean;
};

export default function TerritoireSection({
    territory,
    chateaux,
    personnagesByChateau,
    mapSync = false,
}: TerritoireSectionProps) {
    const { identite, limites } = territory;

    const color = getLRZColorValue(identite.color);
    const colorLighter = lighter(color, 0);

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
            {/* <div style={{ marginTop: "0rem", marginBottom: ".7rem" }}>
                <LRZSeparateur
                    preset="diamond"
                    color={identite.color}
                    size="lg"
                    scope="content"
                    marginBlock={"0"}
                    weight="regular"
                    tone="normal"
                />
            </div> */}
            <header className={styles.header}>
                <div className={styles.eyebrowRow}>
                    <p className={styles.eyebrow}>
                        De <strong>{limites.amont}</strong> à{" "}
                        <strong>{limites.aval}</strong>
                    </p>
                    <p className={styles.count}>
                        <strong>{chateaux.length}</strong>{" "}
                        {chateaux.length > 1 ? "châteaux" : "château"}
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
                        // fadeEdges
                    />
                </div>
                <div className={styles.identity}>
                    {isCommonTerritoire(territory.slug) ? (
                        <LRZSymbol
                            collection="common"
                            meta="territoire"
                            slug={territory.slug}
                            size={120}
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
                            <h2
                                id={`territoire-${territory.slug}-title`}
                                className={styles.title}
                            >
                                {territory.nom}
                            </h2>
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
                    </div>
                </div>
            </header>

            <div className={styles.grid}>
                {chateaux.map((chateau) => (
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
                            open={false}
                            personnages={
                                personnagesByChateau[chateau.slug] ?? []
                            }
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
