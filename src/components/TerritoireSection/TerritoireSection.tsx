"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { MapPin, Waves } from "lucide-react";

import type { Chateau } from "@/types/chateau";
import type { Territoire } from "@/types/territoire";

import ChateauxCard from "@/app/chateaux/ChateauxCard";

import styles from "./TerritoireSection.module.css";
import { lighter } from "@/lib/colors";

type TerritoireSectionStyle = CSSProperties & {
    "--territoire-accent": string;
};

type TerritoireSectionProps = {
    territory: Territoire;
    chateaux: readonly Chateau[];
};

export default function TerritoireSection({
    territory,
    chateaux,
}: TerritoireSectionProps) {
    const { identite, limites } = territory;

    const accentLighter = lighter(identite.accent, 0.1);

    return (
        <section
            id={`territoire-${territory.slug}`}
            className={styles.section}
            style={
                {
                    "--territoire-accent": identite.accent,
                    "--territoire-accent-lighter": accentLighter,
                } as TerritoireSectionStyle
            }
            aria-labelledby={`territoire-${territory.slug}-title`}
        >
            <header className={styles.header}>
                <div className={styles.eyebrowRow}>
                    <p className={styles.eyebrow}>
                        De {limites.amont} à {limites.aval}
                    </p>
                    <p className={styles.count}>
                        <strong>{chateaux.length}</strong>{" "}
                        {chateaux.length > 1 ? "châteaux" : "château"}
                    </p>
                </div>

                <div className={styles.identity}>
                    {identite.blason ? (
                        <Image
                            className={styles.crest}
                            src={identite.blason}
                            alt={
                                identite.blasonAlt ??
                                `Blason du territoire ${territory.nom}`
                            }
                            width={96}
                            height={120}
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
                    <ChateauxCard
                        key={chateau.slug}
                        d={chateau}
                        t={territory}
                        open={false}
                    />
                ))}
            </div>
        </section>
    );
}
