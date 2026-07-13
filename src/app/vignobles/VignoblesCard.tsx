import type { Vignoble } from "@/types/vignoble";
import styles from "./vignobles.module.css";

const COULEUR_LABEL: Record<string, string> = {
    "blanc sec": "Blanc sec",
    "blanc moelleux": "Moelleux",
    rouge: "Rouge",
    rosé: "Rosé",
    effervescent: "Effervescent",
};

const NOTORIETE_CLASS: Record<string, string> = {
    phare: styles.nPhare,
    majeur: styles.nMajeur,
    notable: styles.nNotable,
    confidentiel: styles.nConfidentiel,
};

type VignoblesCardProps = {
    d: Vignoble;
    open: boolean;
    onToggle: () => void;
    /** Variante de rendu de la carte. */
    version?: 1 | 2 | 3;
};

export default function VignoblesCard({
    version = 1,
    ...props
}: VignoblesCardProps) {
    switch (version) {
        case 3:
            return <VignoblesCardV3 {...props} />;
        case 2:
            return <VignoblesCardV2 {...props} />;
        case 1:
        default:
            return <VignoblesCardV1 {...props} />;
    }
}

function VignoblesCardV1({
    d,
    open,
    onToggle,
}: Omit<VignoblesCardProps, "version">) {
    return (
        <article
            className={`${styles.fiche} ${d.notoriete === "phare" ? styles.phare : ""}`}
            data-couleur={d.couleur}
        >
            <div className={styles.top}>
                <span className={styles.rive}>{d.rive}</span>
                <span
                    className={`${styles.notoriete} ${NOTORIETE_CLASS[d.notoriete] ?? ""}`}
                >
                    {d.notoriete}
                </span>
            </div>

            <div className={styles.head}>
                <span
                    className={styles.robe}
                    aria-hidden
                    title={COULEUR_LABEL[d.couleur] ?? d.couleur}
                />
                <div className={styles.headText}>
                    <h3 className={styles.nom}>{d.nom}</h3>
                    <p className={styles.sub}>{d.sousTitre}</p>
                </div>
            </div>

            <p className={styles.tasting}>« {d.style} »</p>

            <div className={styles.cepages}>
                {d.cepages.map((c) => (
                    <span key={c} className={styles.cep}>
                        {c}
                    </span>
                ))}
            </div>

            <div className={styles.appellation}>
                <span className={styles.couleurPill}>
                    {COULEUR_LABEL[d.couleur] ?? d.couleur}
                </span>
                <span className={styles.niveau}>{d.appellation.niveau}</span>
                {d.appellation.depuis && (
                    <span className={styles.depuis}>
                        depuis {d.appellation.depuis}
                    </span>
                )}
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
                Détails &amp; accord
            </button>

            {open && (
                <div className={styles.details}>
                    {d.resume && <p className={styles.lead}>{d.resume}</p>}
                    {d.accord && (
                        <div className={styles.accord}>
                            <span className={styles.accordK}>Accord</span>
                            <span className={styles.accordV}>{d.accord}</span>
                        </div>
                    )}
                    <div className={styles.metaLine}>
                        <span className={styles.k}>Département</span>
                        <span className={styles.v}>{d.departement}</span>
                    </div>
                    {d.autresNoms.length > 0 && (
                        <div className={styles.metaLine}>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    )}
                    {d.appellation.note && (
                        <p className={styles.consNote}>{d.appellation.note}</p>
                    )}
                    <div className={styles.coord}>
                        {d.coordonnees.lat.toFixed(4)},{" "}
                        {d.coordonnees.lng.toFixed(4)}
                    </div>
                </div>
            )}
        </article>
    );
}

/**
 * Version 2 — dans l'esprit vinicole : wash de robe montant du bas (le vin
 * qui repose au fond du verre), goutte de robe agrandie et auréolée, survol
 * teinté par la couleur du vin. Réutilise la structure v1.
 */
function VignoblesCardV2({
    d,
    open,
    onToggle,
}: Omit<VignoblesCardProps, "version">) {
    return (
        <article
            className={`${styles.fiche} ${styles.ficheV2} ${d.notoriete === "phare" ? styles.phare : ""}`}
            data-couleur={d.couleur}
        >
            <div className={styles.top}>
                <span className={styles.rive}>{d.rive}</span>
                <span
                    className={`${styles.notoriete} ${NOTORIETE_CLASS[d.notoriete] ?? ""}`}
                >
                    {d.notoriete}
                </span>
            </div>

            <div className={styles.head}>
                <span
                    className={`${styles.robe} ${styles.robeV2}`}
                    aria-hidden
                    title={COULEUR_LABEL[d.couleur] ?? d.couleur}
                />
                <div className={styles.headText}>
                    <h3 className={styles.nom}>{d.nom}</h3>
                    <p className={styles.sub}>{d.sousTitre}</p>
                </div>
            </div>

            <p className={styles.tasting}>« {d.style} »</p>

            <div className={styles.cepages}>
                {d.cepages.map((c) => (
                    <span key={c} className={styles.cep}>
                        {c}
                    </span>
                ))}
            </div>

            <div className={styles.appellation}>
                <span className={styles.couleurPill}>
                    {COULEUR_LABEL[d.couleur] ?? d.couleur}
                </span>
                <span className={styles.niveau}>{d.appellation.niveau}</span>
                {d.appellation.depuis && (
                    <span className={styles.depuis}>
                        depuis {d.appellation.depuis}
                    </span>
                )}
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
                Détails &amp; accord
            </button>

            {open && (
                <div className={styles.details}>
                    {d.resume && <p className={styles.lead}>{d.resume}</p>}
                    {d.accord && (
                        <div className={styles.accord}>
                            <span className={styles.accordK}>Accord</span>
                            <span className={styles.accordV}>{d.accord}</span>
                        </div>
                    )}
                    <div className={styles.metaLine}>
                        <span className={styles.k}>Département</span>
                        <span className={styles.v}>{d.departement}</span>
                    </div>
                    {d.autresNoms.length > 0 && (
                        <div className={styles.metaLine}>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    )}
                    {d.appellation.note && (
                        <p className={styles.consNote}>{d.appellation.note}</p>
                    )}
                    <div className={styles.coord}>
                        {d.coordonnees.lat.toFixed(4)},{" "}
                        {d.coordonnees.lng.toFixed(4)}
                    </div>
                </div>
            )}
        </article>
    );
}

/**
 * Version 3 — fiche vinicole complète : hero avec la robe en avatar (accent
 * = couleur du vin), cépages, statistiques (appellation, millésime d'AOC,
 * département), dépliant détails, puis accord et résumé ancrés en bas.
 * Même style que FauneCardV3 / FloreCardV3.
 */
function VignoblesCardV3({
    d,
    open,
    onToggle,
}: Omit<VignoblesCardProps, "version">) {
    const stats = [
        { k: "Appellation", v: d.appellation.niveau },
        d.appellation.depuis && { k: "Depuis", v: d.appellation.depuis },
        { k: "Département", v: d.departement },
    ].filter((s): s is { k: string; v: string } => Boolean(s));

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV3} ${d.notoriete === "phare" ? styles.phare : ""}`}
            data-couleur={d.couleur}
        >
            <div className={styles.heroV3}>
                <span
                    className={`${styles.robe} ${styles.robeV3}`}
                    aria-hidden
                    title={COULEUR_LABEL[d.couleur] ?? d.couleur}
                />
                <div className={styles.heroTextV3}>
                    <div className={styles.heroEyebrowV3}>
                        <span className={styles.heroRiveV3}>{d.rive}</span>
                        <span
                            className={`${styles.notoriete} ${NOTORIETE_CLASS[d.notoriete] ?? ""}`}
                        >
                            {d.notoriete}
                        </span>
                    </div>
                    <h3 className={styles.heroNameV3}>{d.nom}</h3>
                    <p className={styles.heroSciV3}>
                        {COULEUR_LABEL[d.couleur] ?? d.couleur}
                    </p>
                </div>
            </div>

            <p className={styles.subV3}>« {d.style} »</p>

            <div className={styles.cepages}>
                {d.cepages.map((c) => (
                    <span key={c} className={styles.cep}>
                        {c}
                    </span>
                ))}
            </div>

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
                Détails
            </button>
            {open && (
                <div className={styles.details}>
                    {d.autresNoms.length > 0 && (
                        <div className={styles.metaLine}>
                            <span className={styles.k}>Autres noms</span>
                            <span className={styles.v}>
                                {d.autresNoms.join(" · ")}
                            </span>
                        </div>
                    )}
                    {d.appellation.note && (
                        <p className={styles.consNote}>{d.appellation.note}</p>
                    )}
                    <div className={styles.coord}>
                        {d.coordonnees.lat.toFixed(4)},{" "}
                        {d.coordonnees.lng.toFixed(4)}
                    </div>
                </div>
            )}

            {d.accord && (
                <div className={styles.accordV3}>
                    <span className={styles.accordKV3}>Accord</span>
                    <span className={styles.accordVV3}>{d.accord}</span>
                </div>
            )}

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
