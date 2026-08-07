import Image from "next/image";
import type { CSSProperties } from "react";
import { MapPin, Waves } from "lucide-react";

import LRZCard from "@/components/LRZCard";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";

import styles from "./TerritoireCard.module.css";

type TerritoireCardProps = {
    territoire: TerritoireCatalogueEntry;
};

type TerritoireCardStyle = CSSProperties & {
    "--territoire-accent": string;
};

export default function TerritoireCard({ territoire }: TerritoireCardProps) {
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
                            {territoire.nom}
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
            </div>
        </LRZCard>
    );
}
