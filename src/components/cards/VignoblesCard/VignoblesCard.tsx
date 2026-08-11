import { Grape, Info, MapPin, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import LRZCard from "@/components/LRZCard";
import { LRZStamp } from "@/components/LRZStamp";
import type { Vignoble } from "@/types/vignoble";
import { LRZSymbol } from "@/components/LRZSymbol";
import { LRZTextClamp } from "@/components/LRZTextClamp";
import { LRZTooltip } from "@/components/LRZTooltip";
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

const VIGNOBLE_TITLE_QUALIFIERS = ["Premier Cru Chaume", "Grand Cru"] as const;

function splitVignobleTitle(title: string) {
    const qualifier = VIGNOBLE_TITLE_QUALIFIERS.find((value) =>
        title.endsWith(` ${value}`),
    );

    return qualifier
        ? {
              name: title.slice(0, -(qualifier.length + 1)),
              qualifier,
          }
        : { name: title, qualifier: null };
}

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
 * La robe devient un symbole de collection et le portrait du vin reste
 * entièrement visible. Les accordéons sont réservés aux repères secondaires.
 */
function VignoblesCardV4({ d }: Omit<VignoblesCardProps, "version">) {
    const colorMeta = getVignobleCouleurMeta(d.couleur);
    const color = colorMeta?.color ?? "miel";
    const titleId = `vignoble-${d.slug}-title`;
    const title = splitVignobleTitle(d.nom);

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
                    <div className={styles.identityCopyV4}>
                        <div className={styles.eyebrowV4}>
                            <span className={styles.robeLabelV4}>
                                {colorMeta?.label ?? d.couleur}
                            </span>
                        </div>
                        <Link
                            className={styles.nameLinkV4}
                            href={`/vignoble/${d.slug}`}
                        >
                            <h3 className={styles.nameV4} id={titleId}>
                                <span>{title.name}</span>
                                {title.qualifier ? (
                                    <span className={styles.titleQualifierV4}>
                                        {title.qualifier}
                                    </span>
                                ) : null}
                            </h3>
                        </Link>
                        <p className={styles.subtitleV4}>{d.sousTitre}</p>
                    </div>

                    <div className={styles.robeBackdropV4} aria-hidden>
                        <LRZSymbol
                            className={styles.robeBackdropSymbolV4}
                            collection="vignoble"
                            meta="couleur"
                            slug={d.couleur}
                            size={96}
                            frame="none"
                            padding="none"
                            shadow="none"
                            decorative
                        />
                    </div>
                </header>

                <section
                    className={styles.appellationCardV4}
                    aria-label="Appellation"
                >
                    <LRZStamp
                        className={styles.appellationStampV4}
                        collection="vignoble"
                        meta="appellation"
                        slug={d.appellation.niveau}
                        detail={
                            d.appellation.depuis
                                ? `Reconnue depuis ${d.appellation.depuis}`
                                : false
                        }
                        variant="plaque"
                        tone="subtle"
                        size="md"
                        font="display"
                        labelSize={14}
                        paddingX={12}
                        paddingY={7}
                        gap="md"
                        shadow="soft"
                        symbolScale={1.05}
                        fullWidth
                        gradient={false}
                    />
                </section>

                <div className={styles.waveV4} aria-hidden />

                <section
                    className={styles.winePortraitV4}
                    aria-labelledby={`${titleId}-portrait`}
                >
                    <div className={styles.portraitHeadingV4}>
                        <span className={styles.portraitIconV4} aria-hidden>
                            <Grape />
                        </span>
                        <div>
                            <p className={styles.portraitEyebrowV4}>
                                Portrait du vin
                            </p>
                            <LRZTextClamp
                                as="h4"
                                className={styles.portraitTitleV4}
                                id={`${titleId}-portrait`}
                                lines={3}
                                tooltip
                                tooltipPortal
                                fixedHeight
                            >
                                {d.style}
                            </LRZTextClamp>
                        </div>
                    </div>

                    <div className={styles.symbolBoardV4}>
                        <div className={styles.symbolRowV4}>
                            <p className={styles.symbolLabelV4}>Cépages</p>
                            <div
                                className={styles.metaSymbolsV4}
                                aria-label="Cépages"
                            >
                                {d.meta.cepages.map((cepage) => (
                                    <LRZSymbol
                                        key={cepage}
                                        collection="vignoble"
                                        meta="cepage"
                                        slug={cepage}
                                        frame="subtle"
                                        size={41}
                                        tooltip
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.symbolRowV4}>
                            <p className={styles.symbolLabelV4}>Terroirs</p>
                            <div
                                className={styles.metaSymbolsV4}
                                aria-label="Terroirs"
                            >
                                {d.meta.terroirs.map((terroir) => (
                                    <LRZSymbol
                                        key={terroir}
                                        collection="vignoble"
                                        meta="terroir"
                                        slug={terroir}
                                        frame="subtle"
                                        size={41}
                                        tooltip
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {d.accord ? (
                        <div className={styles.pairingV4}>
                            <UtensilsCrossed aria-hidden />
                            <div>
                                <span>À la table</span>
                                <LRZTextClamp
                                    as="strong"
                                    lines={2}
                                    fixedHeight
                                    tooltip
                                    tooltipPortal
                                >
                                    {d.accord}
                                </LRZTextClamp>
                            </div>
                        </div>
                    ) : null}
                </section>

                <section
                    className={styles.geographyCardV4}
                    aria-labelledby={`${titleId}-geography`}
                >
                    <div className={styles.geographyHeadingV4}>
                        <span className={styles.portraitIconV4} aria-hidden>
                            <MapPin />
                        </span>
                        <div>
                            <p>Géographie du vin</p>
                            <h4 id={`${titleId}-geography`}>{d.rive}</h4>
                        </div>
                        {d.resume ? (
                            <LRZTooltip
                                content={d.resume}
                                side="top"
                                align="end"
                                portal
                            >
                                <button
                                    className={styles.geographyInfoV4}
                                    type="button"
                                    aria-label={`En savoir plus sur la géographie de ${d.nom}`}
                                >
                                    <Info aria-hidden />
                                </button>
                            </LRZTooltip>
                        ) : null}
                    </div>

                    <dl className={styles.geographyFactsV4}>
                        <div>
                            <dt>Département</dt>
                            <dd>{d.departement}</dd>
                        </div>
                        <div>
                            <dt>Point du coteau</dt>
                            <dd>
                                {d.coordonnees.lat.toFixed(3)} ·{" "}
                                {d.coordonnees.lng.toFixed(3)}
                            </dd>
                        </div>
                    </dl>
                </section>
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
