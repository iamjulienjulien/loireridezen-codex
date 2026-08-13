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
};

export default function VocabulaireCard({
    d,
    open,
    onToggle,
}: VocabulaireCardProps) {
    const u = USAGE_META[d.usage] ?? USAGE_META.vivant;
    const genre = GENRE_ABBR[d.genre] ?? "";
    const hasMore = Boolean(d.etymologie || d.exemple);
    const accent = CATEGORIE_ACCENT[d.categorie] ?? "var(--gold)";

    return (
        <article
            className={`${styles.entree} ${styles.entreeAccentuee}`}
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

            <h3 className={`${styles.terme} ${styles.termeEnlumine}`}>
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
