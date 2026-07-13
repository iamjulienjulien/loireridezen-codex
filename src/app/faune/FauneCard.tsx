import type { CSSProperties } from "react";
import Image from "next/image";
import type { FauneCouleur, FauneEspece, FauneStatut } from "@/types/faune";
import styles from "./faune.module.css";
import { FauneColors } from "./FauneColors";
import { FauneIdentificationCard } from "./FauneIdentificationCard";

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
    "vert métallisé": "var(--lrz-faune-vert-metallise)",
    "vert olive": "var(--lrz-faune-vert-olive)",
    "vert vif": "var(--lrz-faune-vert-vif)",
};

const STATUS: Record<
    FauneStatut,
    { label: string; solid: string; soft: string }
> = {
    LC: {
        label: "Préoccupation mineure",
        solid: "#5a8c7c",
        soft: "rgba(90,140,124,.16)",
    },
    NT: {
        label: "Quasi menacé",
        solid: "#b0862f",
        soft: "rgba(176,134,47,.16)",
    },
    VU: { label: "Vulnérable", solid: "#c47a2e", soft: "rgba(196,122,46,.16)" },
    EN: { label: "En danger", solid: "#c25f4a", soft: "rgba(194,95,74,.16)" },
    CR: {
        label: "En danger critique",
        solid: "#b5443a",
        soft: "rgba(181,68,58,.18)",
    },
    NA: {
        label: "Non applicable",
        solid: "#9a8f82",
        soft: "rgba(154,143,130,.16)",
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
    return (
        <span
            className={styles.sc}
            style={{ color: s.solid, background: s.soft }}
            title={s.label}
        >
            <span className={styles.dot} />
            {code}
            <span className={styles.scLabel}>{s.label}</span>
        </span>
    );
}

type FauneCardProps = {
    d: FauneEspece;
    open: boolean;
    onToggle: () => void;
    /** Variante de rendu de la carte. */
    version?: 1 | 2 | 3;
};

export default function FauneCard({ version = 1, ...props }: FauneCardProps) {
    switch (version) {
        case 3:
            return <FauneCardV3 {...props} />;
        case 2:
            return <FauneCardV2 {...props} />;
        case 1:
        default:
            return <FauneCardV1 {...props} />;
    }
}

function FauneCardV1({ d, open, onToggle }: Omit<FauneCardProps, "version">) {
    return (
        <article
            className={`${styles.fiche} ${d.rarete === "trésor" ? styles.tresor : ""}`}
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

/**
 * Version 2 — identité colorée par type : bande d'accent latérale,
 * emoji en badge teinté, bordure/ombre accentuées au survol.
 * Réutilise la structure v1 en n'ajoutant que quelques classes `*V2`.
 */
function FauneCardV2({ d, open, onToggle }: Omit<FauneCardProps, "version">) {
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

/**
 * Version 3 — fiche naturaliste complète : hero teinté par type, bandeau
 * de statistiques (taille, poids, longévité, régime), tags habitat/période,
 * conservation, et une anecdote mise en exergue. Rendu plus dense et
 * éditorial ; s'appuie sur les champs enrichis (optionnels) de l'espèce.
 */
function FauneCardV3({ d, open, onToggle }: Omit<FauneCardProps, "version">) {
    const accent = TYPE_ACCENT[d.type] ?? "var(--gold)";
    const stats = [
        d.taille && { k: "Taille", v: d.taille },

        d.poids && { k: "Poids", v: d.poids },
        d.longevite && { k: "Longévité", v: d.longevite },
        d.regime && { k: "Régime", v: d.regime },
    ].filter((s): s is { k: string; v: string } => Boolean(s));

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV3} ${d.rarete === "trésor" ? styles.tresor : ""}`}
            style={{ "--type-accent": accent } as CSSProperties}
            data-type={d.type}
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
                        <span className={styles.heroTypeV3} data-type={d.type}>
                            {TYPE_LABEL[d.type] ?? d.type}
                        </span>
                        <span
                            className={`${styles.rarete} ${RARETE_CLASS[d.rarete] ?? ""}`}
                        >
                            {d.rarete}
                        </span>
                    </div>
                    <h3 className={styles.heroNameV3}>{d.nomCommun}</h3>
                    <p className={styles.heroSciV3}>{d.sousTitre}</p>
                </div>
            </div>
            <div>
                <p className={styles.subV3}>{d.nomScientifique}</p>
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
                    Taxonomie
                </button>
            </div>
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

            {d.identification && (
                <FauneIdentificationCard identification={d.identification} />
            )}

            {d.identification.couleurs.length > 0 && (
                <FauneColors colors={d.identification.couleurs} />
            )}

            <div className={styles.tagsV3}>
                <span className={styles.tagV3}>◍ {d.milieu}</span>
                <span className={styles.tagV3}>◷ {d.periode}</span>
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
