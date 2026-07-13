import type { CSSProperties } from "react";
import type { Patrimoine } from "@/types/patrimoine";
import styles from "./patrimoine.module.css";

const TYPE_LABEL: Record<string, string> = {
    moulin: "Moulin",
    pont: "Pont",
    phare: "Phare & feu",
    port: "Port & cale",
    eau: "Eau",
    artisanal: "Artisanal",
    mémoriel: "Mémoriel",
    défensif: "Défensif",
};

/** Couleur d'accent par type (reprend les pastilles de type). */
const TYPE_ACCENT: Record<string, string> = {
    pont: "#6a7d8c",
    port: "#4f7d8c",
    artisanal: "#a8703a",
    moulin: "#9a8a4a",
    mémoriel: "#8a7256",
    eau: "#5a8c9c",
    phare: "#c58a3a",
    défensif: "#8a5a4a",
};

const ETAT_META: Record<string, { stamp: string; cls: string }> = {
    "en usage": { stamp: "Debout", cls: "sEnUsage" },
    restauré: { stamp: "Restauré", cls: "sRestaure" },
    vestige: { stamp: "Vestige", cls: "sVestige" },
    disparu: { stamp: "Disparu", cls: "sDisparu" },
};

const MATERIAU_LABEL: Record<string, string> = {
    tuffeau: "Tuffeau",
    ardoise: "Ardoise",
    brique: "Brique",
    schiste: "Schiste",
    silex: "Silex",
    bois: "Bois",
    métal: "Métal",
    mixte: "Mixte",
};

const PROTECTION_LABEL: Record<string, string> = {
    classé: "Classé MH",
    inscrit: "Inscrit MH",
    labellisé: "Labellisé",
    aucune: "—",
};

type PatrimoineCardProps = {
    d: Patrimoine;
    numero: number;
    open: boolean;
    onToggle: () => void;
    /** Variante de rendu de la carte. */
    version?: 1 | 2 | 3;
};

export default function PatrimoineCard({
    version = 1,
    ...props
}: PatrimoineCardProps) {
    switch (version) {
        case 3:
            return <PatrimoineCardV3 {...props} />;
        case 2:
            return <PatrimoineCardV2 {...props} />;
        case 1:
        default:
            return <PatrimoineCardV1 {...props} />;
    }
}

function PatrimoineCardV1({
    d,
    numero,
    open,
    onToggle,
}: Omit<PatrimoineCardProps, "version">) {
    return (
        <article className={styles.fiche} data-etat={d.etat}>
            <FicheBody d={d} numero={numero} open={open} onToggle={onToggle} />
        </article>
    );
}

/**
 * Version 2 — identité colorée par type : filet supérieur et liseré
 * intérieur teintés par le type d'ouvrage, bordure/ombre accentuées au
 * survol. Réutilise le corps de la fiche v1.
 */
function PatrimoineCardV2({
    d,
    numero,
    open,
    onToggle,
}: Omit<PatrimoineCardProps, "version">) {
    const accent = TYPE_ACCENT[d.type] ?? "var(--gold)";
    return (
        <article
            className={`${styles.fiche} ${styles.ficheV2}`}
            style={{ "--type-accent": accent } as CSSProperties}
            data-etat={d.etat}
        >
            <FicheBody d={d} numero={numero} open={open} onToggle={onToggle} />
        </article>
    );
}

/** Contenu commun de la fiche (identique entre versions). */
function FicheBody({
    d,
    numero,
    open,
    onToggle,
}: Omit<PatrimoineCardProps, "version">) {
    const etat = ETAT_META[d.etat] ?? ETAT_META["en usage"];
    const hasMore = Boolean(d.resume || d.note);

    return (
        <>
            <span className={styles.grid} aria-hidden />

            <span className={`${styles.stamp} ${styles[etat.cls]}`} aria-hidden>
                {etat.stamp}
            </span>

            <div className={styles.eTop}>
                <span className={styles.type} data-type={d.type}>
                    {TYPE_LABEL[d.type] ?? d.type}
                </span>
            </div>

            <h3 className={styles.nom}>{d.nom}</h3>
            <p className={styles.sub}>« {d.sousTitre} »</p>

            <div className={styles.body}>
                <div className={styles.croquis} aria-hidden>
                    <span className={styles.croquisMark}>{d.emoji || "▨"}</span>
                    <span className={styles.croquisCap}>élévation</span>
                </div>
                <dl className={styles.releve}>
                    <div>
                        <dt>Commune</dt>
                        <dd>{d.commune}</dd>
                    </div>
                    <div>
                        <dt>Époque</dt>
                        <dd>{d.epoque}</dd>
                    </div>
                    <div>
                        <dt>Situation</dt>
                        <dd>{d.situation}</dd>
                    </div>
                </dl>
            </div>

            <p className={styles.fonction}>{d.fonction}</p>

            <div className={styles.cartouche}>
                <div className={styles.cartCell}>
                    <span className={styles.cartK}>Matériau</span>
                    <span className={styles.cartV}>
                        {MATERIAU_LABEL[d.materiau] ?? d.materiau}
                    </span>
                </div>
                <div className={styles.cartCell}>
                    <span className={styles.cartK}>Protection</span>
                    <span className={styles.cartV}>
                        {PROTECTION_LABEL[d.protection] ?? d.protection}
                    </span>
                </div>
                <div className={styles.cartCell}>
                    <span className={styles.cartK}>Relevé</span>
                    <span className={styles.cartV}>
                        N° {String(numero).padStart(3, "0")}
                    </span>
                </div>
            </div>

            {hasMore && (
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
                    Notes de relevé
                </button>
            )}
            {open && hasMore && (
                <div className={styles.details}>
                    {d.resume && <p className={styles.resume}>{d.resume}</p>}
                    {d.autresNoms.length > 0 && (
                        <p className={styles.autres}>
                            Aussi : {d.autresNoms.join(" · ")}
                        </p>
                    )}
                    {d.departement && (
                        <p className={styles.dept}>{d.departement}</p>
                    )}
                    {d.note && <p className={styles.note}>{d.note}</p>}
                </div>
            )}
        </>
    );
}

/**
 * Version 3 — fiche complète : hero teinté par type, statistiques
 * (commune, époque, matériau, situation), dépliant relevé, puis
 * classement (état + protection) et résumé ancrés en bas.
 * Même style que FauneCardV3.
 */
function PatrimoineCardV3({
    d,
    numero,
    open,
    onToggle,
}: Omit<PatrimoineCardProps, "version">) {
    const etat = ETAT_META[d.etat] ?? ETAT_META["en usage"];
    const accent = TYPE_ACCENT[d.type] ?? "var(--gold)";
    const stats = [
        d.commune && { k: "Commune", v: d.commune },
        d.epoque && { k: "Époque", v: d.epoque },
        d.materiau && {
            k: "Matériau",
            v: MATERIAU_LABEL[d.materiau] ?? d.materiau,
        },
        d.situation && { k: "Situation", v: d.situation },
    ].filter((s): s is { k: string; v: string } => Boolean(s));

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV3}`}
            style={{ "--type-accent": accent } as CSSProperties}
            data-etat={d.etat}
        >
            <div className={styles.heroV3}>
                <span
                    className={`${styles.heroEmojiV3} ${styles.heroBadgeV3}`}
                    aria-hidden
                >
                    {d.emoji || "▨"}
                </span>
                <div className={styles.heroTextV3}>
                    <div className={styles.heroEyebrowV3}>
                        <span className={styles.heroTypeV3} data-type={d.type}>
                            {TYPE_LABEL[d.type] ?? d.type}
                        </span>
                        <span className={styles.heroReleveV3}>
                            N° {String(numero).padStart(3, "0")}
                        </span>
                    </div>
                    <h3 className={styles.heroNameV3}>{d.nom}</h3>
                    <p className={styles.heroSciV3}>{d.fonction}</p>
                </div>
            </div>

            <p className={styles.subV3}>« {d.sousTitre} »</p>

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
                <span className={styles.tagV3}>◍ {d.departement}</span>
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
                Relevé
            </button>
            {open && (
                <div className={styles.details}>
                    {d.autresNoms.length > 0 && (
                        <p className={styles.autres}>
                            Aussi : {d.autresNoms.join(" · ")}
                        </p>
                    )}
                    {d.note && <p className={styles.note}>{d.note}</p>}
                    <div className={styles.coordV3}>
                        {d.coordonnees.lat.toFixed(4)},{" "}
                        {d.coordonnees.lng.toFixed(4)}
                    </div>
                </div>
            )}

            <div className={`${styles.statsV3} ${styles.footStatsV3}`}>
                <div className={styles.statV3}>
                    <span className={styles.statKV3}>État</span>
                    <span className={styles.statVV3}>{etat.stamp}</span>
                </div>
                <div className={styles.statV3}>
                    <span className={styles.statKV3}>Protection</span>
                    <span className={styles.statVV3}>
                        {PROTECTION_LABEL[d.protection] ?? d.protection}
                    </span>
                </div>
            </div>

            {d.resume && (
                <p className={styles.anecdoteV3}>
                    <span className={styles.anecdoteMarkV3} aria-hidden>
                        ❝
                    </span>
                    {d.resume}
                </p>
            )}
        </article>
    );
}
