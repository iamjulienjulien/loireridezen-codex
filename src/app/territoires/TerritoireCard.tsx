import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Castle, MapPin, Music2, Waves } from "lucide-react";

import LRZAccordion from "@/components/LRZAccordion";
import LRZCard from "@/components/LRZCard";
import type { ChateauV2 } from "@/types/chateauV2";
import type { Guinguette } from "@/types/guinguette";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import styles from "./TerritoireCard.module.css";

type TerritoireCardProps = {
    territoire: TerritoireCatalogueEntry;
    chateaux: readonly ChateauV2[];
    guinguettes: readonly Guinguette[];
};

type TerritoireCardStyle = CSSProperties & {
    "--territoire-accent": string;
};

export default function TerritoireCard({
    territoire,
    chateaux,
    guinguettes,
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
                        {identite.blason ? (
                            <Image
                                src={identite.blason}
                                alt={identite.blasonAlt ?? ""}
                                width={112}
                                height={112}
                                sizes="112px"
                            />
                        ) : (
                            <span aria-hidden="true">{identite.mark}</span>
                        )}
                    </div>

                    <div className={styles.heading}>
                        <p className={styles.nature}>{territoire.nature}</p>
                        <h3 id={titleId} className={styles.name}>
                            <Link
                                className={styles.nameLink}
                                href={`/territoire/${territoire.slug}`}
                            >
                                {territoire.nom}
                            </Link>
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
