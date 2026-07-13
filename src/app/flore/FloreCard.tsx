import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { Flore } from "@/types/flore";
import styles from "./flore.module.css";

const CATEGORIE_LABEL: Record<string, string> = {
    arbre: "Arbre",
    arbuste: "Arbuste",
    herbacée: "Herbacée",
    graminée: "Graminée",
    aquatique: "Aquatique",
    fougère: "Fougère",
    grimpante: "Grimpante",
};

/** Couleur d'accent par catégorie (reprend les pastilles de catégorie). */
const CATEGORIE_ACCENT: Record<string, string> = {
    arbre: "#6a7d4a",
    arbuste: "#8a9a56",
    herbacée: "#c58a3a",
    graminée: "#a89a5a",
    aquatique: "#4f7d8c",
    fougère: "#4a7d5a",
    grimpante: "#7a8a5a",
};

const RARETE_CLASS: Record<string, string> = {
    commun: styles.rCommun,
    régulier: styles.rRegulier,
    rare: styles.rRare,
    trésor: styles.rTresor,
};

// Indigénat — l'intrus se voit (rouge d'alerte).
const INDIGENAT: Record<
    string,
    { solid: string; soft: string; label: string }
> = {
    indigène: {
        solid: "#5a8c7c",
        soft: "rgba(90,140,124,.16)",
        label: "Indigène",
    },
    exotique: {
        solid: "#9a8f82",
        soft: "rgba(154,143,130,.16)",
        label: "Exotique",
    },
    envahissante: {
        solid: "#c25f4a",
        soft: "rgba(194,95,74,.16)",
        label: "Envahissante",
    },
};
// Protection — teintes bleues, distinctes de l'indigénat.
const PROTECTION: Record<
    string,
    { solid: string; soft: string; label: string }
> = {
    nationale: {
        solid: "#4f6d8c",
        soft: "rgba(79,109,140,.16)",
        label: "Nationale",
    },
    régionale: {
        solid: "#6d8ca8",
        soft: "rgba(109,140,168,.16)",
        label: "Régionale",
    },
    aucune: {
        solid: "#9a8f82",
        soft: "rgba(154,143,130,.16)",
        label: "Non protégée",
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
        <span className={styles.sc} style={{ color: solid, background: soft }}>
            <span className={styles.dot} />
            {children}
        </span>
    );
}

type FloreCardProps = {
    d: Flore;
    open: boolean;
    onToggle: () => void;
    /** Variante de rendu de la carte. */
    version?: 1 | 2 | 3;
};

export default function FloreCard({ version = 1, ...props }: FloreCardProps) {
    switch (version) {
        case 3:
            return <FloreCardV3 {...props} />;
        case 2:
            return <FloreCardV2 {...props} />;
        case 1:
        default:
            return <FloreCardV1 {...props} />;
    }
}

function FloreCardV1({ d, open, onToggle }: Omit<FloreCardProps, "version">) {
    const ind = INDIGENAT[d.statut.indigenat] ?? INDIGENAT.exotique;
    const prot = PROTECTION[d.statut.protection] ?? PROTECTION.aucune;

    return (
        <article
            className={`${styles.fiche} ${d.rarete === "trésor" ? styles.tresor : ""}`}
        >
            <div className={styles.fEyebrow}>
                <span
                    className={styles.fCategorie}
                    data-categorie={d.categorie}
                >
                    {CATEGORIE_LABEL[d.categorie] ?? d.categorie}
                </span>
                <span
                    className={`${styles.rarete} ${RARETE_CLASS[d.rarete] ?? ""}`}
                >
                    {d.rarete}
                </span>
            </div>
            <div className={styles.fHead}>
                <span className={styles.fEmoji} aria-hidden>
                    {d.customEmoji ? (
                        <Image
                            className={styles.fEmojiImg}
                            src={d.customEmoji}
                            alt=""
                            width={42}
                            height={42}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>
                <div>
                    <h3 className={styles.fName}>{d.nomCommun}</h3>
                    <p className={styles.fSub}>{d.sousTitre}</p>
                </div>
            </div>
            <div className={styles.wave} aria-hidden />
            <div className={styles.fSci}>{d.nomScientifique}</div>
            <div className={styles.fMeta}>
                <div>
                    <span className={styles.k}>Milieu</span>
                    <span className={styles.v}>{d.milieu}</span>
                </div>
                <div>
                    <span className={styles.k}>Floraison</span>
                    <span className={styles.v}>{d.floraison}</span>
                </div>
            </div>
            <div className={styles.fCons}>
                <div className={styles.consItem}>
                    <span className={styles.k}>Indigénat</span>
                    <Tag solid={ind.solid} soft={ind.soft}>
                        {ind.label}
                    </Tag>
                </div>
                <div className={styles.consItem}>
                    <span className={styles.k}>Protection</span>
                    <Tag solid={prot.solid} soft={prot.soft}>
                        {prot.label}
                    </Tag>
                </div>
            </div>
            <button
                className={styles.detailsBtn}
                aria-expanded={open}
                onClick={onToggle}
            >
                <span
                    className={styles.caret}
                    style={{ transform: open ? "rotate(90deg)" : "none" }}
                >
                    ▸
                </span>{" "}
                Botanique &amp; notes
            </button>
            {open && (
                <div className={styles.details}>
                    <div>
                        <span className={styles.k}>Taille</span>
                        <span className={styles.v}>{d.taille}</span>
                    </div>
                    <div>
                        <span className={styles.k}>Famille</span>
                        <span className={styles.v}>{d.famille}</span>
                    </div>
                    {d.autresNoms.length > 0 && (
                        <div>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    )}
                    <div>
                        <span className={styles.k}>Rang taxinomique</span>
                        <span className={styles.rang}>{d.rangTaxinomique}</span>
                    </div>
                    {d.statut.note && (
                        <p className={styles.consNote}>{d.statut.note}</p>
                    )}
                </div>
            )}
        </article>
    );
}

/**
 * Version 2 — identité colorée par catégorie : bande d'accent latérale,
 * emoji en badge teinté (custom agrandi et sans cadre), survol accentué.
 * Réutilise la structure v1 en n'ajoutant que quelques classes `*V2`.
 */
function FloreCardV2({ d, open, onToggle }: Omit<FloreCardProps, "version">) {
    const ind = INDIGENAT[d.statut.indigenat] ?? INDIGENAT.exotique;
    const prot = PROTECTION[d.statut.protection] ?? PROTECTION.aucune;
    const accent = CATEGORIE_ACCENT[d.categorie] ?? "var(--gold)";

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV2} ${d.rarete === "trésor" ? styles.tresor : ""}`}
            style={{ "--cat-accent": accent } as CSSProperties}
            data-categorie={d.categorie}
        >
            <div className={styles.fEyebrow}>
                <span
                    className={styles.fCategorie}
                    data-categorie={d.categorie}
                >
                    {CATEGORIE_LABEL[d.categorie] ?? d.categorie}
                </span>
                <span
                    className={`${styles.rarete} ${RARETE_CLASS[d.rarete] ?? ""}`}
                >
                    {d.rarete}
                </span>
            </div>
            <div className={styles.fHead}>
                <span
                    className={`${styles.fEmoji} ${d.customEmoji ? styles.fEmojiCustomV2 : styles.fEmojiBadgeV2}`}
                    aria-hidden
                >
                    {d.customEmoji ? (
                        <Image
                            className={styles.fEmojiImg}
                            src={d.customEmoji}
                            alt=""
                            width={58}
                            height={58}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>
                <div>
                    <h3 className={styles.fName}>{d.nomCommun}</h3>
                    <p className={styles.fSub}>{d.sousTitre}</p>
                </div>
            </div>
            <div className={styles.wave} aria-hidden />
            <div className={styles.fSci}>{d.nomScientifique}</div>
            <div className={styles.fMeta}>
                <div>
                    <span className={styles.k}>Milieu</span>
                    <span className={styles.v}>{d.milieu}</span>
                </div>
                <div>
                    <span className={styles.k}>Floraison</span>
                    <span className={styles.v}>{d.floraison}</span>
                </div>
            </div>
            <div className={styles.fCons}>
                <div className={styles.consItem}>
                    <span className={styles.k}>Indigénat</span>
                    <Tag solid={ind.solid} soft={ind.soft}>
                        {ind.label}
                    </Tag>
                </div>
                <div className={styles.consItem}>
                    <span className={styles.k}>Protection</span>
                    <Tag solid={prot.solid} soft={prot.soft}>
                        {prot.label}
                    </Tag>
                </div>
            </div>
            <button
                className={styles.detailsBtn}
                aria-expanded={open}
                onClick={onToggle}
            >
                <span
                    className={styles.caret}
                    style={{ transform: open ? "rotate(90deg)" : "none" }}
                >
                    ▸
                </span>{" "}
                Botanique &amp; notes
            </button>
            {open && (
                <div className={styles.details}>
                    <div>
                        <span className={styles.k}>Taille</span>
                        <span className={styles.v}>{d.taille}</span>
                    </div>
                    <div>
                        <span className={styles.k}>Famille</span>
                        <span className={styles.v}>{d.famille}</span>
                    </div>
                    {d.autresNoms.length > 0 && (
                        <div>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    )}
                    <div>
                        <span className={styles.k}>Rang taxinomique</span>
                        <span className={styles.rang}>{d.rangTaxinomique}</span>
                    </div>
                    {d.statut.note && (
                        <p className={styles.consNote}>{d.statut.note}</p>
                    )}
                </div>
            )}
        </article>
    );
}

/**
 * Version 3 — fiche botanique complète : hero teinté par catégorie, bandeau
 * de statistiques (taille, famille, usages), tags milieu/floraison, dépliant
 * taxonomie, statut (indigénat + protection) et anecdote ancrés en bas.
 * Même style que FauneCardV3.
 */
function FloreCardV3({ d, open, onToggle }: Omit<FloreCardProps, "version">) {
    const ind = INDIGENAT[d.statut.indigenat] ?? INDIGENAT.exotique;
    const prot = PROTECTION[d.statut.protection] ?? PROTECTION.aucune;
    const accent = CATEGORIE_ACCENT[d.categorie] ?? "var(--gold)";
    const stats = [
        d.taille && { k: "Taille", v: d.taille },
        d.famille && { k: "Famille", v: d.famille },
        d.usages && { k: "Usages", v: d.usages },
    ].filter((s): s is { k: string; v: string } => Boolean(s));

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV3} ${d.rarete === "trésor" ? styles.tresor : ""}`}
            style={{ "--cat-accent": accent } as CSSProperties}
            data-categorie={d.categorie}
        >
            <div className={styles.heroV3}>
                <span
                    className={`${styles.heroEmojiV3} ${d.customEmoji ? styles.heroCustomV3 : styles.heroBadgeV3}`}
                    aria-hidden
                >
                    {d.customEmoji ? (
                        <Image
                            className={styles.heroImgV3}
                            src={d.customEmoji}
                            alt=""
                            width={64}
                            height={64}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>
                <div className={styles.heroTextV3}>
                    <div className={styles.heroEyebrowV3}>
                        <span
                            className={styles.heroCatV3}
                            data-categorie={d.categorie}
                        >
                            {CATEGORIE_LABEL[d.categorie] ?? d.categorie}
                        </span>
                        <span
                            className={`${styles.rarete} ${RARETE_CLASS[d.rarete] ?? ""}`}
                        >
                            {d.rarete}
                        </span>
                    </div>
                    <h3 className={styles.heroNameV3}>{d.nomCommun}</h3>
                    <p className={styles.heroSciV3}>{d.nomScientifique}</p>
                </div>
            </div>

            <p className={styles.subV3}>{d.sousTitre}</p>

            {stats.length > 0 && (
                <div className={styles.statsV3}>
                    {stats.map((s) => (
                        <div key={s.k} className={styles.statV3}>
                            <span className={styles.statKV3}>{s.k}</span>
                            <span className={styles.statVV3}>{s.v}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.tagsV3}>
                <span className={styles.tagV3}>◍ {d.milieu}</span>
                <span className={styles.tagV3}>❀ {d.floraison}</span>
            </div>

            <button
                className={styles.detailsBtn}
                aria-expanded={open}
                onClick={onToggle}
            >
                <span
                    className={styles.caret}
                    style={{ transform: open ? "rotate(90deg)" : "none" }}
                >
                    ▸
                </span>{" "}
                Botanique
            </button>
            {open && (
                <div className={styles.details}>
                    {d.autresNoms.length > 0 && (
                        <div>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    )}
                    <div>
                        <span className={styles.k}>Rang taxinomique</span>
                        <span className={styles.rang}>{d.rangTaxinomique}</span>
                    </div>
                    {d.statut.note && (
                        <p className={styles.consNote}>{d.statut.note}</p>
                    )}
                </div>
            )}

            <div className={styles.fCons}>
                <div className={styles.consItem}>
                    <span className={styles.k}>Indigénat</span>
                    <Tag solid={ind.solid} soft={ind.soft}>
                        {ind.label}
                    </Tag>
                </div>
                <div className={styles.consItem}>
                    <span className={styles.k}>Protection</span>
                    <Tag solid={prot.solid} soft={prot.soft}>
                        {prot.label}
                    </Tag>
                </div>
            </div>

            {d.anecdote && (
                <p className={styles.anecdoteV3}>
                    <span className={styles.anecdoteMarkV3} aria-hidden>
                        ❝
                    </span>
                    {d.anecdote}
                </p>
            )}
        </article>
    );
}
