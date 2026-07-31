import type { Guinguette, GuinguetteStatut } from "@/types/guinguette";
import styles from "./guinguettes.module.css";

const TYPE_LABELS: Record<Guinguette["type"], string> = {
    guinguette: "Guinguette",
    "restaurant-guinguette": "Restaurant-guinguette",
    "bar-guinguette": "Bar-guinguette",
    "guinguette-itinerante": "Guinguette itinérante",
};

const STATUS_LABELS: Record<GuinguetteStatut, string> = {
    actif: "Actif",
    a_verifier: "À vérifier",
    historique: "Historique",
};

const VERIFICATION_LABELS: Record<string, string> = {
    confirme_par_office_de_tourisme: "Confirmé par un office de tourisme",
    nom_ambigu: "Nom ou établissement ambigu",
    etablissement_non_confirme: "Établissement actuel non confirmé",
    concept_confirme_programmation_a_actualiser:
        "Concept confirmé, programmation à actualiser",
};

const LINK_LABELS = {
    siteWeb: "Site web",
    instagram: "Instagram",
    facebook: "Facebook",
    googleMaps: "Itinéraire",
} as const;

type GuinguetteCardProps = {
    guinguette: Guinguette;
    open: boolean;
    onToggle: () => void;
};

export default function GuinguetteCard({
    guinguette,
    open,
    onToggle,
}: GuinguetteCardProps) {
    const locality = guinguette.communeDeleguee
        ? `${guinguette.communeDeleguee} · ${guinguette.commune}`
        : guinguette.commune;

    const links = Object.entries(guinguette.liens).filter(
        (entry): entry is [keyof typeof LINK_LABELS, string] =>
            Boolean(entry[1]),
    );

    const hasCoordinates =
        guinguette.position.latitude !== null &&
        guinguette.position.longitude !== null;

    const isUnverified = guinguette.statut === "a_verifier";

    return (
        <article
            className={`${styles.card} ${
                isUnverified ? styles.cardUnverified : ""
            }`}
            data-status={guinguette.statut}
        >
            <div className={styles.lampions} aria-hidden>
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>

            <header className={styles.hero}>
                <div className={styles.icon} aria-hidden>
                    {guinguette.type === "guinguette-itinerante" ? "🎪" : "⛱️"}
                </div>

                <div className={styles.heroText}>
                    <div className={styles.eyebrowRow}>
                        <span className={styles.location}>{locality}</span>
                        <span
                            className={`${styles.status} ${
                                styles[
                                    `status${toPascalCase(guinguette.statut)}`
                                ] ?? ""
                            }`}
                        >
                            {STATUS_LABELS[guinguette.statut]}
                        </span>
                    </div>

                    <h3 className={styles.name}>{guinguette.nom}</h3>
                    <p className={styles.setting}>
                        {guinguette.coursDEau ?? "Cours d’eau à confirmer"} ·{" "}
                        {TYPE_LABELS[guinguette.type]}
                    </p>
                </div>
            </header>

            {guinguette.sousTitre && (
                <p className={styles.tagline}>{guinguette.sousTitre}</p>
            )}

            <div className={styles.pills}>
                <span className={styles.pill}>{guinguette.vue}</span>
                <span className={styles.pill}>{guinguette.periode}</span>
                {guinguette.loireAVelo === true && (
                    <span className={styles.pillAccent}>Loire à Vélo</span>
                )}
            </div>

            {guinguette.ambiance.length > 0 && (
                <div className={styles.ambiences} aria-label="Ambiances">
                    {guinguette.ambiance.map((ambiance) => (
                        <span key={ambiance}>{ambiance}</span>
                    ))}
                </div>
            )}

            <div className={styles.quickFacts}>
                <BooleanFact label="Terrasse" value={guinguette.terrasse} />
                <BooleanFact
                    label="Musique live"
                    value={guinguette.musiqueLive}
                />
                <BooleanFact
                    label="Accessible à vélo"
                    value={guinguette.accessibleVelo}
                />
            </div>

            {isUnverified && (
                <p className={styles.warning}>
                    Cette fiche demande une vérification avant publication comme
                    établissement actif.
                </p>
            )}

            <button
                type="button"
                className={styles.detailsButton}
                aria-expanded={open}
                aria-controls={`guinguette-details-${guinguette.id}`}
                onClick={onToggle}
            >
                <span
                    className={styles.caret}
                    style={{ transform: open ? "rotate(90deg)" : undefined }}
                    aria-hidden
                >
                    ▸
                </span>
                {open ? "Refermer la fiche" : "Explorer la guinguette"}
            </button>

            {open && (
                <div
                    id={`guinguette-details-${guinguette.id}`}
                    className={styles.details}
                >
                    <p className={styles.resume}>{guinguette.description}</p>

                    {guinguette.autresNoms.length > 0 && (
                        <Info
                            label="Autres noms"
                            value={guinguette.autresNoms.join(" · ")}
                        />
                    )}

                    {guinguette.services.length > 0 && (
                        <div className={styles.servicesBlock}>
                            <span className={styles.infoLabel}>Services</span>
                            <div className={styles.services}>
                                {guinguette.services.map((service) => (
                                    <span key={service}>{service}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.infoGrid}>
                        <Info
                            label="Département"
                            value={guinguette.departement}
                        />
                        <Info
                            label="Cours d’eau"
                            value={guinguette.coursDEau ?? "Non renseigné"}
                        />
                        <Info
                            label="Vérification"
                            value={
                                VERIFICATION_LABELS[guinguette.verification] ??
                                humanize(guinguette.verification)
                            }
                        />
                        <Info
                            label="Coordonnées"
                            value={
                                hasCoordinates
                                    ? `${guinguette.position.latitude}, ${guinguette.position.longitude}`
                                    : "Non renseignées"
                            }
                        />
                    </div>

                    {links.length > 0 && (
                        <nav className={styles.links} aria-label="Liens utiles">
                            {links.map(([key, href]) => (
                                <a
                                    key={key}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {LINK_LABELS[key]} ↗
                                </a>
                            ))}
                        </nav>
                    )}
                </div>
            )}
        </article>
    );
}

function BooleanFact({
    label,
    value,
}: {
    label: string;
    value: boolean | null;
}) {
    return (
        <div className={styles.fact} data-value={String(value)}>
            <span className={styles.factIcon} aria-hidden>
                {value === true ? "✓" : value === false ? "×" : "?"}
            </span>
            <span>{label}</span>
        </div>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className={styles.info}>
            <span className={styles.infoLabel}>{label}</span>
            <span className={styles.infoValue}>{value}</span>
        </div>
    );
}

function humanize(value: string) {
    return value.replaceAll("_", " ");
}

function toPascalCase(value: string) {
    return value
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
}
