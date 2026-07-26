import type { CSSProperties } from "react";
import Image from "next/image";
import type { Flore } from "@/types/flore";
import styles from "./flore.module.css";
import { LRZColor } from "@/types/lrz";
import LRZBadge from "@/components/LRZBadge/LRZBadge";

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
const INDIGENAT: Record<string, { label: string; color: LRZColor }> = {
    indigène: {
        label: "Indigène",
        color: "vert-metallise",
    },
    exotique: {
        label: "Exotique",
        color: "galet",
    },
    envahissante: {
        label: "Envahissante",
        color: "orange-cuivre",
    },
};
// Protection — teintes bleues, distinctes de l'indigénat.
const PROTECTION: Record<string, { label: string; color: LRZColor }> = {
    nationale: {
        label: "Nationale",
        color: "gris-ardoise",
    },
    régionale: {
        label: "Régionale",
        color: "bleu-gris",
    },
    aucune: {
        label: "Non protégée",
        color: "galet",
    },
};

export type FloreCardProps = {
    d: Flore;
    open: boolean;
    onToggle: () => void;
};

/**
 * Carte flore principale — ancienne version 2.
 * Identité colorée par catégorie, bande d’accent latérale et emoji teinté.
 */
export default function FloreCard({ d, open, onToggle }: FloreCardProps) {
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
                    <LRZBadge color={ind.color} label={ind.label} />
                </div>
                <div className={styles.consItem}>
                    <span className={styles.k}>Protection</span>
                    <LRZBadge color={prot.color} label={prot.label} />
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
