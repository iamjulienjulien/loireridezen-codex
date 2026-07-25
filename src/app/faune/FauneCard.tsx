import type { CSSProperties } from "react";
import Image from "next/image";
import type { FauneCouleur, FauneEspece, FauneStatut } from "@/types/faune";
import styles from "./faune.module.css";
import { LRZColor } from "@/types/lrz";
import LRZBadge from "@/components/LRZBadge/LRZBadge";

/** Couleur d'accent par type (reprend les pastilles de type). */
const TYPE_ACCENT: Record<string, string> = {
    oiseau: "#4f86c6",
    mammifère: "#b06a3a",
    poisson: "#2f9ca0",
    reptile: "#7d9a3f",
    amphibien: "#4fa25c",
    insecte: "#8f6bc2",
};

const TYPE_LABEL: Record<string, string> = {
    oiseau: "Oiseau",
    mammifère: "Mammifère",
    poisson: "Poisson",
    reptile: "Reptile",
    amphibien: "Amphibien",
    insecte: "Insecte",
};

export const FAUNE_COULEURS: Record<FauneCouleur, string> = {
    argent: "var(--lrz-faune-argent)",
    beige: "var(--lrz-faune-beige)",
    blanc: "var(--lrz-faune-blanc)",
    "blanc gris": "var(--lrz-faune-blanc-gris)",

    bleu: "var(--lrz-faune-bleu)",
    "bleu gris": "var(--lrz-faune-bleu-gris)",
    "bleu métallique": "var(--lrz-faune-bleu-metallise)",
    "bleu turquoise": "var(--lrz-faune-bleu-turquoise)",

    brun: "var(--lrz-faune-brun)",
    "brun foncé": "var(--lrz-faune-brun-fonce)",
    "brun roux": "var(--lrz-faune-brun-roux)",

    crème: "var(--lrz-faune-creme)",
    fauve: "var(--lrz-faune-fauve)",

    gris: "var(--lrz-faune-gris)",
    "gris ardoise": "var(--lrz-faune-gris-ardoise)",
    "gris brun": "var(--lrz-faune-gris-brun)",

    jaune: "var(--lrz-faune-jaune)",

    noir: "var(--lrz-faune-noir)",

    ocre: "var(--lrz-faune-ocre)",

    orange: "var(--lrz-faune-orange)",
    "orange cuivré": "var(--lrz-faune-orange-cuivre)",

    rouge: "var(--lrz-faune-rouge)",
    roux: "var(--lrz-faune-roux)",

    vert: "var(--lrz-faune-vert)",
    "vert métallique": "var(--lrz-faune-vert-metallise)",
    "vert olive": "var(--lrz-faune-vert-olive)",
    "vert vif": "var(--lrz-faune-vert-vif)",
};

const STATUS: Record<FauneStatut, { label: string; color: LRZColor }> = {
    LC: {
        label: "Préoccupation mineure",
        color: "vert-metallise",
    },
    NT: {
        label: "Quasi menacé",
        color: "ocre",
    },
    VU: {
        label: "Vulnérable",
        color: "orange",
    },
    EN: {
        label: "En danger",
        color: "orange-cuivre",
    },
    CR: {
        label: "En danger critique",
        color: "rouge",
    },
    NA: {
        label: "Non applicable",
        color: "galet",
    },
};

const RARETE_CLASS: Record<string, string> = {
    commun: styles.rCommun,
    régulier: styles.rRegulier,
    rare: styles.rRare,
    trésor: styles.rTresor,
};

function StatusChip({ code }: { code: FauneStatut }) {
    const s = STATUS[code] ?? STATUS.NA;
    return <LRZBadge color={s.color} label={code} detail={s.label} />;
}

export type FauneCardProps = {
    d: FauneEspece;
    open: boolean;
    onToggle: () => void;
};

/**
 * Fiche faune actuellement utilisée.
 *
 * Identité colorée par type, bande d’accent latérale et emoji mis en valeur.
 */
export default function FauneCard({ d, open, onToggle }: FauneCardProps) {
    const accent = TYPE_ACCENT[d.type] ?? "var(--gold)";
    return (
        <article
            className={`${styles.fiche} ${styles.ficheV2} ${d.rarete === "trésor" ? styles.tresor : ""}`}
            style={{ "--type-accent": accent } as CSSProperties}
            data-type={d.type}
        >
            <div className={styles.fEyebrow}>
                <span className={styles.fType} data-type={d.type}>
                    {TYPE_LABEL[d.type] ?? d.type}
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
                            width={68}
                            height={68}
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
                    <span className={styles.k}>Période</span>
                    <span className={styles.v}>{d.periode}</span>
                </div>
            </div>
            <div className={styles.fCons}>
                <div className={styles.consItem}>
                    <span className={styles.k}>UICN Monde</span>
                    <StatusChip code={d.conservation.monde} />
                </div>
                <div className={styles.consItem}>
                    <span className={styles.k}>Liste rouge France</span>
                    <StatusChip code={d.conservation.france} />
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
                Taxonomie &amp; notes
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
                        <span className={styles.k}>Classe · Famille</span>
                        <span className={styles.v}>
                            {d.classe} · {d.famille}
                        </span>
                    </div>
                    <div>
                        <span className={styles.k}>Rang taxinomique</span>
                        <span className={styles.rang}>{d.rangTaxinomique}</span>
                    </div>
                    {d.conservation.note && (
                        <p className={styles.consNote}>{d.conservation.note}</p>
                    )}
                </div>
            )}
        </article>
    );
}
