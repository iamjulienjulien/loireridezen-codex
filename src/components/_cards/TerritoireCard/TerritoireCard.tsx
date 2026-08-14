"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { Castle, MapPin, Music2, Waves } from "lucide-react";

import { TrackedCardLink } from "@/components/_layout/AnalyticsTracking";
import LRZAccordion from "@/components/_ui/LRZAccordion";
import LRZCard from "@/components/_ui/LRZCard";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { buildCardHrefWithReturn } from "@/lib/card-return-context";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import styles from "./TerritoireCard.module.css";

export type TerritoireCardProps = {
    territoire: TerritoireCatalogueEntry;
    chateaux: readonly Chateau[];
    guinguettes: readonly Guinguette[];
    vignobles?: readonly Vignoble[];
};

type TerritoireCardStyle = CSSProperties & {
    "--territoire-accent": string;
};

export const getVineyardAccordionTitle = (
    expanded: boolean,
    remainingCount: number,
) =>
    expanded
        ? "Masquer les autres vignobles"
        : `Voir ${remainingCount} ${remainingCount > 1 ? "autres vignobles" : "autre vignoble"}`;

export default function TerritoireCard({
    territoire,
    chateaux,
    guinguettes,
    vignobles,
}: TerritoireCardProps) {
    const { identite, limites } = territoire;
    const titleId = `territoire-${territoire.slug}-title`;

    return (
        <LRZCard
            id={`territoire-${territoire.slug}`}
            className={styles.card}
            color={identite.color}
            customColor={identite.accent}
            accent="start"
            equalHeight
            ariaLabelledby={titleId}
            style={
                {
                    "--territoire-accent": identite.accent,
                } as TerritoireCardStyle
            }
        >
            <div className={styles.content}>
                <div className={styles.sequence}>
                    <span>
                        Chapitre {String(territoire.ordre).padStart(2, "0")}
                    </span>
                    <span>{territoire.paysage}</span>
                </div>

                <div className={styles.identity}>
                    <div className={styles.crest}>
                        <span aria-hidden="true">{identite.mark}</span>
                    </div>

                    <div className={styles.heading}>
                        <p className={styles.nature}>{territoire.nature}</p>
                        <h3 id={titleId} className={styles.name}>
                            <TrackedCardLink
                                entrySlug={territoire.slug}
                                className={styles.nameLink}
                                href={`/territoire/${territoire.slug}`}
                            >
                                {territoire.nom}
                            </TrackedCardLink>
                        </h3>
                        <p className={styles.subtitle}>
                            {territoire.sousTitre}
                        </p>
                    </div>
                </div>

                <p className={styles.summary}>{territoire.description}</p>

                <div className={styles.corridor}>
                    <span className={styles.corridorLabel}>Du fil</span>
                    <strong>{limites.amont}</strong>
                    <span className={styles.corridorLine} aria-hidden="true" />
                    <strong>{limites.aval}</strong>
                </div>

                <dl className={styles.details}>
                    <div>
                        <dt>
                            <MapPin aria-hidden="true" />
                            Repères
                        </dt>
                        <dd>{territoire.reperes.join(" · ")}</dd>
                    </div>
                    <div>
                        <dt>
                            <Waves aria-hidden="true" />
                            Eaux
                        </dt>
                        <dd>{territoire.coursEau.join(" · ")}</dd>
                    </div>
                </dl>

                <ul
                    className={styles.symbols}
                    aria-label="Symboles du territoire"
                >
                    {identite.symboles.map((symbole) => (
                        <li key={symbole}>{symbole}</li>
                    ))}
                </ul>

                {vignobles && vignobles.length > 0 ? (
                    <TerritoryVineyards
                        territoire={territoire}
                        vignobles={vignobles}
                    />
                ) : null}

                {chateaux.length > 0 ? (
                    <LRZAccordion
                        id={`territoire-${territoire.slug}-chateaux`}
                        className={styles.relatedAccordion}
                        title="Les châteaux"
                        description={`${chateaux.length} ${chateaux.length > 1 ? "repères castraux" : "repère castral"} du territoire`}
                        icon={<Castle className={styles.accordionIcon} />}
                        color={identite.color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                    >
                        <ul
                            className={styles.chateaux}
                            aria-label={`Châteaux du ${territoire.nom}`}
                        >
                            {chateaux.map((chateau) => (
                                <li key={chateau.slug}>
                                    <Link href={`/chateau/${chateau.slug}`}>
                                        {chateau.nom}
                                    </Link>
                                    <span>{chateau.commune}</span>
                                </li>
                            ))}
                        </ul>
                    </LRZAccordion>
                ) : null}

                {guinguettes.length > 0 ? (
                    <LRZAccordion
                        id={`territoire-${territoire.slug}-guinguettes`}
                        className={styles.relatedAccordion}
                        title="Les guinguettes"
                        description={`${guinguettes.length} ${guinguettes.length > 1 ? "haltes festives" : "halte festive"} du territoire`}
                        icon={<Music2 className={styles.accordionIcon} />}
                        color={identite.color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                    >
                        <ul
                            className={styles.guinguettes}
                            aria-label={`Guinguettes du ${territoire.nom}`}
                        >
                            {guinguettes.map((guinguette) => (
                                <li key={guinguette.slug}>
                                    <Link
                                        href={`/guinguette/${guinguette.slug}`}
                                    >
                                        {guinguette.nom}
                                    </Link>
                                    <span>{guinguette.commune}</span>
                                </li>
                            ))}
                        </ul>
                    </LRZAccordion>
                ) : null}
            </div>
        </LRZCard>
    );
}

function TerritoryVineyards({
    territoire,
    vignobles,
}: {
    territoire: TerritoireCatalogueEntry;
    vignobles: readonly Vignoble[];
}) {
    const [expanded, setExpanded] = useState(false);
    const visible = vignobles.slice(0, 3);
    const remaining = vignobles.slice(3);

    return (
        <section
            className={styles.vineyards}
            aria-labelledby={`territoire-${territoire.slug}-vignobles-title`}
        >
            <div className={styles.vineyardsHeading}>
                <span>Sur les coteaux</span>
                <h4 id={`territoire-${territoire.slug}-vignobles-title`}>
                    Vignobles du territoire
                </h4>
            </div>

            <VineyardRows vignobles={visible} territoire={territoire} />

            {remaining.length > 0 ? (
                <LRZAccordion
                    id={`territoire-${territoire.slug}-vignobles-more`}
                    className={styles.vineyardsAccordion}
                    title={getVineyardAccordionTitle(
                        expanded,
                        remaining.length,
                    )}
                    description={`${vignobles.length} appellations liées au territoire`}
                    color={territoire.identite.color}
                    tone="plain"
                    size="sm"
                    fullWidth
                    headingLevel={5}
                    open={expanded}
                    onOpenChange={setExpanded}
                >
                    <VineyardRows
                        vignobles={remaining}
                        territoire={territoire}
                    />
                </LRZAccordion>
            ) : null}
        </section>
    );
}

function VineyardRows({
    vignobles,
    territoire,
}: {
    vignobles: readonly Vignoble[];
    territoire: TerritoireCatalogueEntry;
}) {
    return (
        <ul
            className={styles.vineyardRows}
            aria-label={`Vignobles du ${territoire.nom}`}
        >
            {vignobles.map((vignoble) => (
                <li key={vignoble.slug}>
                    <Link
                        href={buildCardHrefWithReturn(
                            `/vignoble/${vignoble.slug}`,
                            `/territoire/${territoire.slug}`,
                        )}
                    >
                        <LRZSymbol
                            collection="vignoble"
                            meta="couleur"
                            slug={vignoble.couleur}
                            size={34}
                            frame="subtle"
                            decorative
                        />
                        <span>
                            <strong>{vignoble.nom}</strong>
                            <small>{vignoble.appellation.niveau}</small>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
