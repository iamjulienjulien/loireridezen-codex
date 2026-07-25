import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import type { Chateau } from "@/types/chateau";

import styles from "./chateaux.module.css";

const RENOMMEE_CLASS: Record<string, string> = {
    confidentiel: styles.rConfidentiel,
    notable: styles.rNotable,
    majeur: styles.rMajeur,
    phare: styles.rPhare,
};

/** Couleur d'accent par époque. */
const EPOQUE_ACCENT: Record<string, string> = {
    Médiéval: "#8a7256",
    Renaissance: "#c58a3a",
    Classique: "#6a7d8c",
    Éclectique: "#8f6bc2",
};

const MH: Record<string, { solid: string; soft: string; label: string }> = {
    classé: {
        solid: "#5a8c7c",
        soft: "rgba(90,140,124,.16)",
        label: "Classé",
    },
    inscrit: {
        solid: "#b0862f",
        soft: "rgba(176,134,47,.16)",
        label: "Inscrit",
    },
    aucune: {
        solid: "#9a8f82",
        soft: "rgba(154,143,130,.16)",
        label: "Non protégé",
    },
};

const UNESCO = {
    oui: {
        solid: "#4f6d8c",
        soft: "rgba(79,109,140,.16)",
        label: "Val de Loire",
    },
    non: {
        solid: "#9a8f82",
        soft: "rgba(154,143,130,.16)",
        label: "Hors périmètre",
    },
};

function Tag({
    solid,
    soft,
    children,
}: {
    solid: string;
    soft: string;
    children: ReactNode;
}) {
    return (
        <span
            className={styles.sc}
            style={{
                color: solid,
                background: soft,
            }}
        >
            <span className={styles.dot} />
            {children}
        </span>
    );
}

export type ChateauCardOldProps = {
    d: Chateau;
    open: boolean;
    onToggle: () => void;
    version?: 1 | 2 | 3;
};

/**
 * Anciennes variantes de la fiche château.
 *
 * Conservées comme références graphiques et pour faciliter les comparaisons
 * avec la version actuellement utilisée dans ChateauCard.
 */
export default function ChateauCardOld({
    version = 1,
    ...props
}: ChateauCardOldProps) {
    switch (version) {
        case 3:
            return <ChateauCardV3 {...props} />;
        case 2:
            return <ChateauCardV2 {...props} />;
        case 1:
        default:
            return <ChateauCardV1 {...props} />;
    }
}

type LegacyCardProps = Omit<ChateauCardOldProps, "version">;

export function ChateauCardV1({ d, open, onToggle }: LegacyCardProps) {
    const mh = MH[d.protection.monumentHistorique] ?? MH.aucune;
    const unesco = d.protection.unesco ? UNESCO.oui : UNESCO.non;

    return (
        <article
            className={`${styles.fiche} ${
                d.renommee === "phare" ? styles.phare : ""
            }`}
        >
            <div className={styles.fEyebrow}>
                <span className={styles.fEpoque} data-epoque={d.epoque}>
                    {d.epoque}
                </span>

                <span
                    className={`${styles.renommee} ${
                        RENOMMEE_CLASS[d.renommee] ?? ""
                    }`}
                >
                    {d.renommee}
                </span>
            </div>

            <div className={styles.fHead}>
                <span className={styles.fEmoji} aria-hidden="true">
                    {d.customEmoji ? (
                        <Image
                            className={styles.fEmojiImg}
                            src={d.customEmoji}
                            alt=""
                            width={60}
                            height={40}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>

                <div>
                    <h3 className={styles.fName}>{d.nom}</h3>
                    <p className={styles.fSub}>{d.sousTitre}</p>
                </div>
            </div>

            <div className={styles.wave} aria-hidden="true" />

            <div className={styles.fSci}>{d.style}</div>

            <div className={styles.fMeta}>
                <div>
                    <span className={styles.k}>Commune</span>
                    <span className={styles.v}>{d.commune}</span>
                </div>

                <div>
                    <span className={styles.k}>Rivière</span>
                    <span className={styles.v}>{d.riviere}</span>
                </div>
            </div>

            <div className={styles.fCons}>
                <div className={styles.consItem}>
                    <span className={styles.k}>Monument historique</span>

                    <Tag solid={mh.solid} soft={mh.soft}>
                        {mh.label}
                    </Tag>
                </div>

                <div className={styles.consItem}>
                    <span className={styles.k}>UNESCO</span>

                    <Tag solid={unesco.solid} soft={unesco.soft}>
                        {unesco.label}
                    </Tag>
                </div>
            </div>

            <button
                className={styles.detailsBtn}
                type="button"
                aria-expanded={open}
                onClick={onToggle}
            >
                <span
                    className={styles.caret}
                    style={{
                        transform: open ? "rotate(90deg)" : "none",
                    }}
                    aria-hidden="true"
                >
                    ▸
                </span>{" "}
                Détails &amp; histoire
            </button>

            {open ? (
                <div className={styles.details}>
                    {d.resume ? (
                        <p className={styles.lead}>{d.resume}</p>
                    ) : null}

                    <div>
                        <span className={styles.k}>Département</span>
                        <span className={styles.v}>{d.departement}</span>
                    </div>

                    <div>
                        <span className={styles.k}>Construction</span>
                        <span className={styles.v}>{d.construction}</span>
                    </div>

                    {d.commanditaire ? (
                        <div>
                            <span className={styles.k}>Commanditaire</span>
                            <span className={styles.v}>{d.commanditaire}</span>
                        </div>
                    ) : null}

                    {d.autresNoms.length > 0 ? (
                        <div>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    ) : null}

                    {d.protection.note ? (
                        <p className={styles.consNote}>{d.protection.note}</p>
                    ) : null}
                </div>
            ) : null}
        </article>
    );
}

/**
 * Version 2.
 *
 * Corniche d'accent par époque, château dans une vignette encadrée
 * et marque particulière pour les châteaux phares.
 */
export function ChateauCardV2({ d, open, onToggle }: LegacyCardProps) {
    const mh = MH[d.protection.monumentHistorique] ?? MH.aucune;
    const unesco = d.protection.unesco ? UNESCO.oui : UNESCO.non;
    const accent = EPOQUE_ACCENT[d.epoque] ?? "var(--gold)";
    const estPhare = d.renommee === "phare";

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV2} ${
                estPhare ? styles.phare : ""
            }`}
            style={
                {
                    "--epoque-accent": accent,
                } as CSSProperties
            }
            data-epoque={d.epoque}
        >
            <div className={styles.fEyebrow}>
                <span className={styles.fEpoque} data-epoque={d.epoque}>
                    {d.epoque}
                </span>

                <span
                    className={`${styles.renommee} ${
                        RENOMMEE_CLASS[d.renommee] ?? ""
                    }`}
                >
                    {estPhare ? (
                        <span className={styles.phareMarkV2} aria-hidden="true">
                            ✦{" "}
                        </span>
                    ) : null}

                    {d.renommee}
                </span>
            </div>

            <div className={styles.fHead}>
                <span
                    className={`${styles.fEmoji} ${styles.fVignetteV2}`}
                    aria-hidden="true"
                >
                    {d.customEmoji ? (
                        <Image
                            className={styles.fEmojiImg}
                            src={d.customEmoji}
                            alt=""
                            width={72}
                            height={48}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>

                <div>
                    <h3 className={styles.fName}>{d.nom}</h3>
                    <p className={styles.fSub}>{d.sousTitre}</p>
                </div>
            </div>

            <div className={styles.wave} aria-hidden="true" />

            <div className={styles.fSci}>{d.style}</div>

            <div className={styles.fMeta}>
                <div>
                    <span className={styles.k}>Commune</span>
                    <span className={styles.v}>{d.commune}</span>
                </div>

                <div>
                    <span className={styles.k}>Rivière</span>
                    <span className={styles.v}>{d.riviere}</span>
                </div>
            </div>

            <div className={styles.fCons}>
                <div className={styles.consItem}>
                    <span className={styles.k}>Monument historique</span>

                    <Tag solid={mh.solid} soft={mh.soft}>
                        {mh.label}
                    </Tag>
                </div>

                <div className={styles.consItem}>
                    <span className={styles.k}>UNESCO</span>

                    <Tag solid={unesco.solid} soft={unesco.soft}>
                        {unesco.label}
                    </Tag>
                </div>
            </div>

            <button
                className={styles.detailsBtn}
                type="button"
                aria-expanded={open}
                onClick={onToggle}
            >
                <span
                    className={styles.caret}
                    style={{
                        transform: open ? "rotate(90deg)" : "none",
                    }}
                    aria-hidden="true"
                >
                    ▸
                </span>{" "}
                Détails &amp; histoire
            </button>

            {open ? (
                <div className={styles.details}>
                    {d.resume ? (
                        <p className={styles.lead}>{d.resume}</p>
                    ) : null}

                    <div>
                        <span className={styles.k}>Département</span>
                        <span className={styles.v}>{d.departement}</span>
                    </div>

                    <div>
                        <span className={styles.k}>Construction</span>
                        <span className={styles.v}>{d.construction}</span>
                    </div>

                    {d.commanditaire ? (
                        <div>
                            <span className={styles.k}>Commanditaire</span>
                            <span className={styles.v}>{d.commanditaire}</span>
                        </div>
                    ) : null}

                    {d.autresNoms.length > 0 ? (
                        <div>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    ) : null}

                    {d.protection.note ? (
                        <p className={styles.consNote}>{d.protection.note}</p>
                    ) : null}
                </div>
            ) : null}
        </article>
    );
}

/**
 * Version 3.
 *
 * Hero en vignette, statistiques, histoire dépliable, classement
 * Monument historique et UNESCO, puis résumé ancré en bas.
 */
export function ChateauCardV3({ d, open, onToggle }: LegacyCardProps) {
    const mh = MH[d.protection.monumentHistorique] ?? MH.aucune;
    const unesco = d.protection.unesco ? UNESCO.oui : UNESCO.non;
    const accent = EPOQUE_ACCENT[d.epoque] ?? "var(--gold)";

    const stats = [
        d.construction && {
            k: "Construction",
            v: d.construction,
        },
        d.commanditaire && {
            k: "Commanditaire",
            v: d.commanditaire,
        },
        d.commune && {
            k: "Commune",
            v: d.commune,
        },
        d.riviere && {
            k: "Rivière",
            v: d.riviere,
        },
    ].filter((stat): stat is { k: string; v: string } => Boolean(stat));

    const name = d.nom;

    let nameType: string;
    let nameMain: string;

    if (name.includes("des ")) {
        const [prefix, suffix] = name.split("des ");

        nameType = `${prefix}des `;
        nameMain = suffix;
    } else if (name.includes("de ")) {
        const [prefix, suffix] = name.split("de ");

        nameType = `${prefix}de `;
        nameMain = suffix;
    } else if (name.includes("d'")) {
        const [prefix, suffix] = name.split("d'");

        nameType = `${prefix}d'`;
        nameMain = suffix;
    } else if (name.includes("du ")) {
        const [prefix, suffix] = name.split("du ");

        nameType = `${prefix}du `;
        nameMain = suffix;
    } else {
        nameType = "";
        nameMain = name;
    }

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV3} ${
                d.renommee === "phare" ? styles.phare : ""
            }`}
            style={
                {
                    "--epoque-accent": accent,
                } as CSSProperties
            }
            data-epoque={d.epoque}
        >
            <div className={styles.heroV3}>
                <span
                    className={`${styles.heroEmojiV3} ${
                        d.customEmoji
                            ? styles.heroVignetteV3
                            : styles.heroBadgeV3
                    }`}
                    aria-hidden="true"
                >
                    {d.customEmoji ? (
                        <Image
                            className={styles.heroImgV3}
                            src={d.customEmoji}
                            alt=""
                            width={90}
                            height={60}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>

                <div className={styles.heroTextV3}>
                    <div className={styles.heroEyebrowV3}>
                        <span
                            className={styles.heroEpoqueV3}
                            data-epoque={d.epoque}
                        >
                            {d.epoque}
                        </span>

                        <span
                            className={`${styles.renommee} ${
                                RENOMMEE_CLASS[d.renommee] ?? ""
                            }`}
                        >
                            {d.renommee === "phare" ? (
                                <span
                                    className={styles.phareMarkV2}
                                    aria-hidden="true"
                                >
                                    ⭐️{" "}
                                </span>
                            ) : null}

                            {d.renommee}
                        </span>
                    </div>

                    <h3 className={styles.heroNameV3}>
                        <span
                            style={{
                                fontSize: ".9rem",
                                fontWeight: "400",
                            }}
                        >
                            {nameType}
                            <br />
                        </span>

                        {nameMain}
                    </h3>

                    <p className={styles.heroSciV3}>{d.style}</p>
                </div>
            </div>

            <p className={styles.subV3}>{d.sousTitre}</p>

            {stats.length > 0 ? (
                <div className={styles.statsV3}>
                    {stats.map((stat) => (
                        <div key={stat.k} className={styles.statV3}>
                            <span className={styles.statKV3}>{stat.k}</span>

                            <span className={styles.statVV3}>{stat.v}</span>
                        </div>
                    ))}
                </div>
            ) : null}

            <div className={styles.tagsV3}>
                <span className={styles.tagV3}>◍ {d.departement}</span>
            </div>

            <button
                className={styles.detailsBtn}
                type="button"
                aria-expanded={open}
                onClick={onToggle}
            >
                <span
                    className={styles.caret}
                    style={{
                        transform: open ? "rotate(90deg)" : "none",
                    }}
                    aria-hidden="true"
                >
                    ▸
                </span>{" "}
                Histoire
            </button>

            {open ? (
                <div className={styles.details}>
                    {d.autresNoms.length > 0 ? (
                        <div>
                            <span className={styles.k}>Autres noms</span>

                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    ) : null}

                    {d.protection.note ? (
                        <p className={styles.consNote}>{d.protection.note}</p>
                    ) : null}
                </div>
            ) : null}

            <div className={styles.fCons}>
                <div className={styles.consItem}>
                    <span className={styles.k}>Monument historique</span>

                    <Tag solid={mh.solid} soft={mh.soft}>
                        {mh.label}
                    </Tag>
                </div>

                <div className={styles.consItem}>
                    <span className={styles.k}>UNESCO</span>

                    <Tag solid={unesco.solid} soft={unesco.soft}>
                        {unesco.label}
                    </Tag>
                </div>
            </div>

            {d.resume ? (
                <p className={styles.anecdoteV3}>
                    <span className={styles.anecdoteMarkV3} aria-hidden="true">
                        ❝
                    </span>

                    {d.resume}
                </p>
            ) : null}
        </article>
    );
}
