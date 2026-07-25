import type { CSSProperties } from "react";
import Image from "next/image";

import type { Chateau } from "@/types/chateau";

import styles from "./chateaux.module.css";
import { LRZColor } from "@/types/lrz";
import LRZBadge from "@/components/LRZBadge/LRZBadge";
import LRZAnecdote from "@/components/LRZAnecdote/LRZAnecdote";
import { Footprints } from "lucide-react";

/** Couleur d'accent par époque. */
const EPOQUE_ACCENT: Record<string, string> = {
    Médiéval: "#795739",
    Renaissance: "#b88945",
    Classique: "#4d80a7",
    Éclectique: "#a44842",
};
const EPOQUE_COLOR: Record<string, LRZColor> = {
    Médiéval: "brun",
    Renaissance: "ocre",
    Classique: "eau",
    Éclectique: "brique",
};

const MH: Record<string, { label: string; color: LRZColor }> = {
    classé: {
        label: "Classé",
        color: "vert-metallise",
    },
    inscrit: {
        label: "Inscrit",
        color: "ocre",
    },
    aucune: {
        label: "Non protégé",
        color: "galet",
    },
};

const UNESCO: Record<string, { label: string; color: LRZColor }> = {
    oui: {
        label: "Val de Loire",
        color: "bleu-metallise",
    },
    non: {
        label: "Hors périmètre",
        color: "galet",
    },
};

export type ChateauCardProps = {
    d: Chateau;
    open: boolean;
    onToggle: () => void;
};

/**
 * Fiche château illustrée.
 *
 * Le château détouré habite le hero, tandis que les informations sont
 * regroupées par histoire, architecture, localisation et protections.
 */
export default function ChateauCard({ d, open, onToggle }: ChateauCardProps) {
    const mh = MH[d.protection.monumentHistorique] ?? MH.aucune;
    const unesco = d.protection.unesco ? UNESCO.oui : UNESCO.non;
    const accent = EPOQUE_ACCENT[d.epoque] ?? "var(--gold)";
    const color = EPOQUE_COLOR[d.epoque] ?? "galet";
    const complementsId = `chateau-complements-${d.slug}`;

    const hasComplements =
        d.autresNoms.length > 0 || Boolean(d.protection.note);

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV4}`}
            style={
                {
                    "--epoque-accent": accent,
                } as CSSProperties
            }
            data-epoque={d.epoque}
        >
            <header className={styles.heroV4}>
                <div className={styles.heroArtworkV4} aria-hidden="true">
                    {d.customEmoji ? (
                        <Image
                            className={styles.heroImageV4}
                            src={d.customEmoji}
                            alt=""
                            fill
                            sizes="(max-width: 560px) 85vw, (max-width: 1080px) 45vw, 320px"
                        />
                    ) : (
                        <span className={styles.heroFallbackV4}>
                            {d.emoji || "🏰"}
                        </span>
                    )}
                </div>

                <div className={styles.heroContentV4}>
                    <p className={styles.heroEpoqueV4}>{d.epoque}</p>
                    <h3 className={styles.heroNameV4}>{d.nom}</h3>
                </div>
            </header>

            <div className={styles.bodyV4}>
                <p className={styles.subtitleV4}>{d.sousTitre}</p>

                <div className={styles.infoGroupsV4}>
                    <section className={styles.infoGroupV4}>
                        <h4 className={styles.infoTitleV4}>
                            Histoire &amp; architecture
                        </h4>

                        <dl className={styles.infoListV4}>
                            <div className={styles.infoRowV4}>
                                <dt>Époque</dt>
                                <dd>{d.epoque}</dd>
                            </div>

                            <div className={styles.infoRowV4}>
                                <dt>Architecture</dt>
                                <dd>{d.style}</dd>
                            </div>

                            <div className={styles.infoRowV4}>
                                <dt>Construction</dt>
                                <dd>{d.construction}</dd>
                            </div>

                            {d.commanditaire ? (
                                <div className={styles.infoRowV4}>
                                    <dt>Commanditaire</dt>
                                    <dd>{d.commanditaire}</dd>
                                </div>
                            ) : null}
                        </dl>
                    </section>

                    <section className={styles.infoGroupV4}>
                        <h4 className={styles.infoTitleV4}>Localisation</h4>

                        <dl className={styles.infoListV4}>
                            <div className={styles.infoRowV4}>
                                <dt>Commune</dt>
                                <dd>{d.commune}</dd>
                            </div>

                            <div className={styles.infoRowV4}>
                                <dt>Département</dt>
                                <dd>{d.departement}</dd>
                            </div>

                            <div className={styles.infoRowV4}>
                                <dt>Cours d’eau</dt>
                                <dd>{d.riviere}</dd>
                            </div>
                        </dl>
                    </section>
                </div>

                <section
                    className={styles.statusV4}
                    aria-label="Visite et protections"
                >
                    <p className={styles.visitV4}>
                        <span aria-hidden="true">
                            <Footprints />
                        </span>

                        <span>
                            <strong>Visite</strong> · {d.visite}
                        </span>
                    </p>

                    <div className={styles.protectionsV4}>
                        <div className={styles.protectionV4}>
                            <span className={styles.protectionLabelV4}>
                                Monument historique
                            </span>

                            <LRZBadge color={mh.color} label={mh.label} />
                        </div>

                        <div className={styles.protectionV4}>
                            <span className={styles.protectionLabelV4}>
                                UNESCO
                            </span>

                            <LRZBadge
                                color={unesco.color}
                                label={unesco.label}
                            />
                        </div>
                    </div>
                </section>

                {hasComplements ? (
                    <div className={styles.complementsV4}>
                        <button
                            className={styles.detailsBtnV4}
                            type="button"
                            aria-expanded={open}
                            aria-controls={complementsId}
                            onClick={onToggle}
                        >
                            <span
                                className={styles.caret}
                                style={{
                                    transform: open ? "rotate(90deg)" : "none",
                                    marginRight: "5px",
                                }}
                                aria-hidden="true"
                            >
                                ▸
                            </span>
                            Compléments
                        </button>

                        <div
                            id={complementsId}
                            className={styles.detailsV4}
                            hidden={!open}
                        >
                            {d.autresNoms.length > 0 ? (
                                <div>
                                    <span className={styles.k}>
                                        Autres noms
                                    </span>

                                    <span className={styles.v}>
                                        {d.autresNoms.join(" · ")}
                                    </span>
                                </div>
                            ) : null}

                            {d.protection.note ? (
                                <p className={styles.consNote}>
                                    {d.protection.note}
                                </p>
                            ) : null}
                        </div>
                    </div>
                ) : null}

                {d.resume ? (
                    <LRZAnecdote color={color}>{d.resume}</LRZAnecdote>
                ) : null}
            </div>
        </article>
    );
}
