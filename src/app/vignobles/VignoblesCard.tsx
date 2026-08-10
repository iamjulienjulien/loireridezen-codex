import { Grape, Landmark, UtensilsCrossed } from "lucide-react";

import LRZAccordion from "@/components/LRZAccordion";
import LRZAnecdote from "@/components/LRZAnecdote";
import LRZCard from "@/components/LRZCard";
import LRZMetaList from "@/components/LRZMetaList";
import { LRZStamp } from "@/components/LRZStamp";
import type { Vignoble } from "@/types/vignoble";
import { LRZSymbol } from "@/components/LRZSymbol";
import { getVignobleCouleurMeta } from "@/registry/Meta/vignoble-couleur";

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
    version?: 1 | 2 | 3 | 4;
};

export default function VignoblesCard({
    version = 1,
    ...props
}: VignoblesCardProps) {
    switch (version) {
        case 4:
            return <VignoblesCardV4 {...props} />;
        case 3:
            return <VignoblesCardV3 {...props} />;
        case 2:
            return <VignoblesCardV2 {...props} />;
        case 1:
        default:
            return <VignoblesCardV1 {...props} />;
    }
}

/**
 * Version 4 — fiche d’appellation alignée sur Faune, Flore et Guinguettes.
 *
 * La robe devient un symbole de collection ; le contenu se répartit en trois
 * accordéons métier pour conserver une carte compacte et riche à la fois.
 */
function VignoblesCardV4({ d, open }: Omit<VignoblesCardProps, "version">) {
    const color = getVignobleCouleurMeta(d.couleur)?.color ?? "miel";
    const titleId = `vignoble-${d.slug}-title`;

    return (
        <LRZCard
            color={color}
            tone="surface"
            accent="start"
            elevation="card"
            interactive
            equalHeight
            ariaLabelledby={titleId}
            className={styles.cardV4}
        >
            <div className={styles.contentV4}>
                <header className={styles.identityV4}>
                    <LRZSymbol
                        collection="vignoble"
                        meta="couleur"
                        slug={d.couleur}
                        size={64}
                        frame="none"
                        padding="none"
                        shadow="strong"
                        decorative
                    />

                    <div className={styles.identityCopyV4}>
                        <div className={styles.eyebrowV4}>
                            <span>{d.rive}</span>
                        </div>
                        <h3 className={styles.nameV4} id={titleId}>
                            {d.nom}
                        </h3>
                        <p className={styles.subtitleV4}>{d.sousTitre}</p>
                    </div>
                </header>

                <div
                    className={styles.primaryStampsV4}
                    aria-label="Appellation et notoriété"
                >
                    <LRZStamp
                        collection="vignoble"
                        meta="appellation"
                        slug={d.appellation.niveau}
                        variant="chip"
                        tone="outline"
                        size="xs"
                        font="mono"
                        labelSize={11}
                        paddingX={10}
                        paddingY={4}
                        gap="lg"
                        shadow="none"
                        symbolScale={0.9}
                        gradient={false}
                    />
                    <LRZStamp
                        collection="vignoble"
                        meta="notoriete"
                        slug={d.notoriete}
                        variant="chip"
                        tone="outline"
                        size="xs"
                        font="mono"
                        labelSize={11}
                        paddingX={10}
                        paddingY={4}
                        gap="lg"
                        shadow="none"
                        symbolScale={0.9}
                        gradient={false}
                    />
                </div>

                <div className={styles.waveV4} aria-hidden />

                <div className={styles.terroirsV4} aria-label="Terroirs">
                    {d.meta.terroirs.map((terroir) => (
                        <LRZSymbol
                            key={terroir}
                            collection="vignoble"
                            meta="terroir"
                            slug={terroir}
                            frame="subtle"
                            size="lg"
                            tooltip
                        />
                    ))}
                </div>

                <p className={styles.styleV4}>« {d.style} »</p>

                <div className={styles.accordionsV4}>
                    <LRZAccordion
                        id={`vignoble-${d.slug}-vin`}
                        title="Le vin"
                        description="Cépages et profil de dégustation"
                        icon={<Grape className={styles.accordionIconV4} />}
                        color={color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                        defaultOpen={open}
                        unmountOnClose
                    >
                        <LRZMetaList
                            color={color}
                            layout="responsive"
                            hideEmpty
                            items={[
                                {
                                    id: "cepages",
                                    label: "Cépages",
                                    value: d.cepages.join(" · "),
                                },
                                {
                                    id: "profil",
                                    label: "Profil",
                                    value: d.style,
                                },
                            ]}
                        />
                    </LRZAccordion>

                    <LRZAccordion
                        id={`vignoble-${d.slug}-appellation`}
                        title="L’appellation"
                        description="Repères, origine et reconnaissance"
                        icon={<Landmark className={styles.accordionIconV4} />}
                        color={color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                        defaultOpen={open}
                        unmountOnClose
                    >
                        <LRZMetaList
                            color={color}
                            layout="responsive"
                            hideEmpty
                            items={[
                                {
                                    id: "niveau",
                                    label: "Niveau",
                                    value: d.appellation.niveau,
                                },
                                {
                                    id: "depuis",
                                    label: "Reconnue depuis",
                                    value: d.appellation.depuis,
                                },
                                {
                                    id: "rive",
                                    label: "Rive",
                                    value: d.rive,
                                },
                                {
                                    id: "departement",
                                    label: "Département",
                                    value: d.departement,
                                },
                            ]}
                        />
                    </LRZAccordion>

                    <LRZAccordion
                        id={`vignoble-${d.slug}-table`}
                        title="À table"
                        description="Accord, récit et autres noms"
                        icon={
                            <UtensilsCrossed
                                className={styles.accordionIconV4}
                            />
                        }
                        color={color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                        defaultOpen={open}
                        unmountOnClose
                    >
                        <LRZMetaList
                            color={color}
                            layout="responsive"
                            hideEmpty
                            items={[
                                {
                                    id: "accord",
                                    label: "Accord",
                                    value: d.accord,
                                },
                                {
                                    id: "autres-noms",
                                    label: "Autres noms",
                                    value: d.autresNoms.join(" · "),
                                },
                                {
                                    id: "note",
                                    label: "Note d’appellation",
                                    value: d.appellation.note,
                                    span: "full",
                                },
                            ]}
                        />
                        {d.resume ? (
                            <LRZAnecdote
                                className={styles.anecdoteV4}
                                color={color}
                            >
                                {d.resume}
                            </LRZAnecdote>
                        ) : null}
                    </LRZAccordion>
                </div>
            </div>
        </LRZCard>
    );
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
                <LRZSymbol
                    collection="vignoble"
                    meta="couleur"
                    slug={d.couleur}
                    size={42}
                    frame="none"
                    padding="none"
                    shadow="soft"
                    title={COULEUR_LABEL[d.couleur] ?? d.couleur}
                    decorative
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
                <LRZSymbol
                    collection="vignoble"
                    meta="couleur"
                    slug={d.couleur}
                    size={50}
                    frame="none"
                    padding="none"
                    shadow="soft"
                    title={COULEUR_LABEL[d.couleur] ?? d.couleur}
                    decorative
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
                <LRZSymbol
                    collection="vignoble"
                    meta="couleur"
                    slug={d.couleur}
                    size={58}
                    frame="none"
                    padding="none"
                    shadow="soft"
                    title={COULEUR_LABEL[d.couleur] ?? d.couleur}
                    decorative
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
