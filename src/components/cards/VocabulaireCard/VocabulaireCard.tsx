import type { CSSProperties } from "react";
import type { Mot } from "@/types/mot";
import styles from "./vocabulaire.module.css";

const CATEGORIE_LABEL: Record<string, string> = {
    relief: "Relief",
    bateau: "Bateau",
    ouvrage: "Ouvrage",
    métier: "Métier",
    eau: "Eau",
};

/** Couleur d'accent par catégorie (reprend les pastilles de catégorie). */
const CATEGORIE_ACCENT: Record<string, string> = {
    relief: "#a8894a",
    bateau: "#7a6a4a",
    ouvrage: "#8a7256",
    métier: "#9a7b3a",
    eau: "#4f7d8c",
};

const USAGE_META: Record<string, { label: string; cls: string }> = {
    vivant: { label: "vivant", cls: "uVivant" },
    rare: { label: "rare", cls: "uRare" },
    oublié: { label: "† oublié", cls: "uOubli" },
};

const REGISTRE_LABEL: Record<string, string> = {
    courant: "courant",
    technique: "technique",
    toponymique: "toponymique",
};

const GENRE_ABBR: Record<string, string> = {
    masculin: "n. m.",
    féminin: "n. f.",
    "—": "",
};

type VocabulaireCardProps = {
    d: Mot;
    open: boolean;
    onToggle: () => void;
    /** Variante de rendu de la carte. */
    version?: 1 | 2 | 3;
};

export default function VocabulaireCard({
    version = 1,
    ...props
}: VocabulaireCardProps) {
    switch (version) {
        case 3:
            return <VocabulaireCardV3 {...props} />;
        case 2:
            return <VocabulaireCardV2 {...props} />;
        case 1:
        default:
            return <VocabulaireCardV1 {...props} />;
    }
}

function VocabulaireCardV1({
    d,
    open,
    onToggle,
}: Omit<VocabulaireCardProps, "version">) {
    const u = USAGE_META[d.usage] ?? USAGE_META.vivant;
    const genre = GENRE_ABBR[d.genre] ?? "";
    const hasMore = Boolean(d.etymologie || d.exemple);

    return (
        <article className={styles.entree} data-usage={d.usage}>
            <div className={styles.eTop}>
                <span className={styles.categorie} data-categorie={d.categorie}>
                    {CATEGORIE_LABEL[d.categorie] ?? d.categorie}
                </span>
                <span className={`${styles.usage} ${styles[u.cls]}`}>
                    {u.label}
                </span>
            </div>

            <h3 className={styles.terme}>
                {d.terme}
                {genre && <span className={styles.genre}>{genre}</span>}
            </h3>
            <p className={styles.gloss}>« {d.sousTitre} »</p>

            <p className={styles.definition}>{d.definition}</p>

            <div className={styles.foot}>
                {d.autresFormes.length > 0 && (
                    <span className={styles.variantes}>
                        var. {d.autresFormes.join(", ")}
                    </span>
                )}
                <span className={styles.registre}>
                    {REGISTRE_LABEL[d.registre] ?? d.registre}
                </span>
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
                    Étymologie &amp; usage
                </button>
            )}
            {open && hasMore && (
                <div className={styles.details}>
                    {d.etymologie && (
                        <p className={styles.etymo}>
                            <span className={styles.etymoMark} aria-hidden>
                                ❧
                            </span>
                            {d.etymologie}
                        </p>
                    )}
                    {d.exemple && (
                        <p className={styles.exemple}>« {d.exemple} »</p>
                    )}
                </div>
            )}
        </article>
    );
}

/**
 * Version 2 — esprit dictionnaire : filet d'accent par catégorie et
 * initiale enluminée sur le terme, en conservant la « patine mémorielle »
 * (les mots oubliés se retirent). Réutilise la structure v1.
 */
function VocabulaireCardV2({
    d,
    open,
    onToggle,
}: Omit<VocabulaireCardProps, "version">) {
    const u = USAGE_META[d.usage] ?? USAGE_META.vivant;
    const genre = GENRE_ABBR[d.genre] ?? "";
    const hasMore = Boolean(d.etymologie || d.exemple);
    const accent = CATEGORIE_ACCENT[d.categorie] ?? "var(--gold)";

    return (
        <article
            className={`${styles.entree} ${styles.entreeV2}`}
            style={{ "--cat-accent": accent } as CSSProperties}
            data-usage={d.usage}
        >
            <div className={styles.eTop}>
                <span className={styles.categorie} data-categorie={d.categorie}>
                    {CATEGORIE_LABEL[d.categorie] ?? d.categorie}
                </span>
                <span className={`${styles.usage} ${styles[u.cls]}`}>
                    {u.label}
                </span>
            </div>

            <h3 className={`${styles.terme} ${styles.termeV2}`}>
                {d.terme}
                {genre && <span className={styles.genre}>{genre}</span>}
            </h3>
            <p className={styles.gloss}>« {d.sousTitre} »</p>

            <p className={styles.definition}>{d.definition}</p>

            <div className={styles.foot}>
                {d.autresFormes.length > 0 && (
                    <span className={styles.variantes}>
                        var. {d.autresFormes.join(", ")}
                    </span>
                )}
                <span className={styles.registre}>
                    {REGISTRE_LABEL[d.registre] ?? d.registre}
                </span>
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
                    Étymologie &amp; usage
                </button>
            )}
            {open && hasMore && (
                <div className={styles.details}>
                    {d.etymologie && (
                        <p className={styles.etymo}>
                            <span className={styles.etymoMark} aria-hidden>
                                ❧
                            </span>
                            {d.etymologie}
                        </p>
                    )}
                    {d.exemple && (
                        <p className={styles.exemple}>« {d.exemple} »</p>
                    )}
                </div>
            )}
        </article>
    );
}

/**
 * Version 3 — fiche de dictionnaire complète : initiale enluminée en avatar
 * (accent par catégorie), définition, variantes, métadonnées, exemple en
 * dépliant et étymologie ancrée en bas. Conserve la « patine mémorielle ».
 * Même esprit que FauneCardV3.
 */
function VocabulaireCardV3({
    d,
    open,
    onToggle,
}: Omit<VocabulaireCardProps, "version">) {
    const u = USAGE_META[d.usage] ?? USAGE_META.vivant;
    const genre = GENRE_ABBR[d.genre] ?? "";
    const accent = CATEGORIE_ACCENT[d.categorie] ?? "var(--gold)";
    const stats = [
        { k: "Registre", v: REGISTRE_LABEL[d.registre] ?? d.registre },
        genre && { k: "Genre", v: genre },
    ].filter((s): s is { k: string; v: string } => Boolean(s));

    return (
        <article
            className={`${styles.entree} ${styles.entreeV3}`}
            style={{ "--cat-accent": accent } as CSSProperties}
            data-usage={d.usage}
        >
            <div className={styles.heroV3}>
                <span className={styles.heroInitialeV3} aria-hidden>
                    {d.terme.charAt(0).toUpperCase()}
                </span>
                <div className={styles.heroTextV3}>
                    <div className={styles.heroEyebrowV3}>
                        <span
                            className={styles.heroCatV3}
                            data-categorie={d.categorie}
                        >
                            {CATEGORIE_LABEL[d.categorie] ?? d.categorie}
                        </span>
                        <span className={`${styles.usage} ${styles[u.cls]}`}>
                            {u.label}
                        </span>
                    </div>
                    <h3 className={styles.heroNameV3}>
                        {d.terme}
                        {genre && <span className={styles.genre}>{genre}</span>}
                    </h3>
                    <p className={styles.heroSciV3}>« {d.sousTitre} »</p>
                </div>
            </div>

            <p className={styles.defV3}>{d.definition}</p>

            {d.autresFormes.length > 0 && (
                <div className={styles.tagsV3}>
                    {d.autresFormes.map((f) => (
                        <span key={f} className={styles.tagV3}>
                            {f}
                        </span>
                    ))}
                </div>
            )}

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

            {d.exemple && (
                <>
                    <button
                        className={styles.detailsBtn}
                        aria-expanded={open}
                        onClick={onToggle}
                    >
                        <span
                            className={styles.caret}
                            style={{
                                transform: open ? "rotate(90deg)" : "none",
                            }}
                        >
                            ▸
                        </span>{" "}
                        Exemple
                    </button>
                    {open && (
                        <div className={styles.details}>
                            <p className={styles.exemple}>« {d.exemple} »</p>
                        </div>
                    )}
                </>
            )}

            {d.etymologie && (
                <p className={styles.anecdoteV3}>
                    <span className={styles.anecdoteMarkV3} aria-hidden>
                        ❧
                    </span>
                    {d.etymologie}
                </p>
            )}
        </article>
    );
}
