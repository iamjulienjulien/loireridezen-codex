import type { ReactNode } from "react";

import LRZAccordion from "@/components/LRZAccordion/LRZAccordion";
import LRZBadge from "@/components/LRZBadge/LRZBadge";
import {
    LRZCard,
    LRZCardContent,
    LRZCardHeader,
    LRZCardSection,
} from "@/components/LRZCard";
import LRZMetaList, { type LRZMetaListItem } from "@/components/LRZMetaList";
import type { Guinguette, GuinguetteStatut } from "@/types/guinguette";

import styles from "./guinguettes.module.css";

const TYPE_LABELS: Record<Guinguette["type"], string> = {
    guinguette: "Guinguette",
    "restaurant-guinguette": "Restaurant-guinguette",
    "bar-guinguette": "Bar-guinguette",
    "guinguette-itinerante": "Guinguette itinérante",
};

const STATUS_LABELS: Record<GuinguetteStatut, string> = {
    actif: "Adresse active",
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

type GuinguetteCardV2Props = {
    guinguette: Guinguette;
    open: boolean;
    onToggle: () => void;
};

export default function GuinguetteCardV2({
    guinguette,
    open,
    onToggle,
}: GuinguetteCardV2Props) {
    const locality = guinguette.communeDeleguee
        ? `${guinguette.communeDeleguee} · ${guinguette.commune}`
        : guinguette.commune;

    const links = Object.entries(guinguette.liens).filter(
        (entry): entry is [keyof typeof LINK_LABELS, string] =>
            typeof entry[1] === "string" && entry[1].length > 0,
    );

    const hasCoordinates =
        guinguette.position.latitude !== null &&
        guinguette.position.longitude !== null;

    const isUnverified = guinguette.statut === "a_verifier";
    const cardColor = getCardColor(guinguette);
    const icon = guinguette.type === "guinguette-itinerante" ? "🎪" : "⛱️";
    const titleId = `guinguette-${guinguette.slug}-title`;

    const primaryMetaItems: LRZMetaListItem[] = [
        {
            id: "season",
            label: "Saison",
            value: guinguette.periode,
            icon: "☀️",
            emphasized: true,
        },
        {
            id: "setting",
            label: "Cadre",
            value: [capitalize(guinguette.vue), guinguette.coursDEau]
                .filter(Boolean)
                .join(" · "),
            icon: "〰️",
        },
        {
            id: "bike-access",
            label: "Accès vélo",
            value: getBikeLabel(
                guinguette.accessibleVelo,
                guinguette.loireAVelo,
            ),
            icon: "🚲",
        },
    ];

    const practicalMetaItems: LRZMetaListItem[] = [
        {
            id: "locality",
            label: "Commune",
            value: locality,
        },
        {
            id: "department",
            label: "Département",
            value: guinguette.departement,
        },
        {
            id: "type",
            label: "Type",
            value: TYPE_LABELS[guinguette.type],
        },
        {
            id: "verification",
            label: "Vérification",
            value:
                VERIFICATION_LABELS[guinguette.verification] ??
                humanize(guinguette.verification),
            span: "full",
        },
        {
            id: "coordinates",
            label: "Coordonnées",
            value: hasCoordinates
                ? `${guinguette.position.latitude}, ${guinguette.position.longitude}`
                : null,
            hint: hasCoordinates
                ? undefined
                : "Non renseignées dans le catalogue",
            span: "full",
        },
        {
            id: "other-names",
            label: "Autres noms",
            value:
                guinguette.autresNoms.length > 0
                    ? guinguette.autresNoms.join(" · ")
                    : null,
            hidden: guinguette.autresNoms.length === 0,
            span: "full",
        },
    ];

    return (
        <LRZCard
            color={cardColor}
            tone="surface"
            accent="top"
            padding="none"
            elevation="card"
            interactive
            equalHeight
            ariaLabelledby={titleId}
            className={styles.guinguetteCard}
            data-status={guinguette.statut}
        >
            <LRZCardContent padding="md" grow className={styles.cardContent}>
                <LRZCardHeader
                    title={guinguette.nom}
                    titleId={titleId}
                    titleAs="h3"
                    eyebrow={locality}
                    description={[
                        TYPE_LABELS[guinguette.type],
                        guinguette.coursDEau,
                    ]
                        .filter(Boolean)
                        .join(" · ")}
                    icon={<span className={styles.cardIcon}>{icon}</span>}
                    metadata={
                        <LRZBadge
                            label={STATUS_LABELS[guinguette.statut]}
                            color={getStatusColor(guinguette.statut)}
                            variant="pill"
                        />
                    }
                    className={styles.cardHeader}
                />

                {guinguette.sousTitre ? (
                    <p className={styles.tagline}>{guinguette.sousTitre}</p>
                ) : null}

                <LRZMetaList
                    items={primaryMetaItems}
                    color={cardColor}
                    tone="soft"
                    size="sm"
                    layout="stacked"
                    columns={3}
                    emptyValue="À confirmer"
                    className={styles.primaryMeta}
                />

                <div
                    className={styles.signals}
                    aria-label="Informations principales"
                >
                    <Signal
                        icon="🌿"
                        label="Terrasse"
                        value={guinguette.terrasse}
                    />
                    <Signal
                        icon="♫"
                        label="Musique live"
                        value={guinguette.musiqueLive}
                    />
                    <Signal
                        icon="🚲"
                        label="Loire à Vélo"
                        value={guinguette.loireAVelo}
                    />
                </div>

                {guinguette.ambiance.length > 0 ? (
                    <div className={styles.badges} aria-label="Ambiances">
                        {guinguette.ambiance.slice(0, 4).map((ambiance) => (
                            <LRZBadge
                                key={ambiance}
                                label={ambiance}
                                color="roseau"
                                variant="default"
                                dashed
                            />
                        ))}
                        {guinguette.ambiance.length > 4 ? (
                            <LRZBadge
                                label={`+${guinguette.ambiance.length - 4}`}
                                detail="ambiances"
                                color="gris"
                                variant="ticket"
                            />
                        ) : null}
                    </div>
                ) : null}
            </LRZCardContent>

            {isUnverified ? (
                <LRZCardSection
                    padding="sm"
                    tone="soft"
                    divided
                    className={styles.warningSection}
                >
                    <div className={styles.warning} role="note">
                        <span aria-hidden>⚑</span>
                        <p>
                            Cette entrée doit être contrôlée avant d’être
                            présentée comme un établissement actuellement
                            ouvert.
                        </p>
                    </div>
                </LRZCardSection>
            ) : null}

            <LRZCardSection
                padding="none"
                tone="transparent"
                divided
                className={styles.accordionSection}
            >
                <LRZAccordion
                    id={`guinguette-${guinguette.slug}-details`}
                    title={open ? "Refermer l’escale" : "Explorer l’escale"}
                    description="Description, services et liens pratiques"
                    icon="🧭"
                    color={cardColor}
                    tone="plain"
                    size="md"
                    fullWidth
                    headingLevel={4}
                    open={open}
                    onOpenChange={() => onToggle()}
                    unmountOnClose
                    className={styles.accordion}
                    triggerClassName={styles.accordionTrigger}
                    panelClassName={styles.accordionPanel}
                >
                    <div className={styles.details}>
                        <p className={styles.description}>
                            {guinguette.description}
                        </p>

                        {guinguette.services.length > 0 ? (
                            <section
                                className={styles.detailSection}
                                aria-labelledby={`services-${guinguette.slug}`}
                            >
                                <h5 id={`services-${guinguette.slug}`}>
                                    Sur place
                                </h5>
                                <div className={styles.badges}>
                                    {guinguette.services.map((service) => (
                                        <LRZBadge
                                            key={service}
                                            label={service}
                                            color={cardColor}
                                            variant="pill"
                                        />
                                    ))}
                                </div>
                            </section>
                        ) : null}

                        <LRZMetaList
                            items={practicalMetaItems}
                            color={cardColor}
                            tone="divided"
                            size="sm"
                            layout="responsive"
                            columns={2}
                            emptyValue="À confirmer"
                            className={styles.practicalMeta}
                        />

                        {links.length > 0 ? (
                            <nav
                                className={styles.links}
                                aria-label="Liens utiles"
                            >
                                {links.map(([key, href]) => (
                                    <a
                                        key={key}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        data-primary={
                                            key === "googleMaps" || undefined
                                        }
                                    >
                                        <span aria-hidden>
                                            {getLinkIcon(key)}
                                        </span>
                                        <span>{LINK_LABELS[key]}</span>
                                        <span aria-hidden>↗</span>
                                    </a>
                                ))}
                            </nav>
                        ) : null}
                    </div>
                </LRZAccordion>
            </LRZCardSection>
        </LRZCard>
    );
}

function Signal({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: boolean | null;
}) {
    return (
        <div
            className={styles.signal}
            data-value={value === null ? "unknown" : String(value)}
        >
            <span className={styles.signalIcon} aria-hidden>
                {icon}
            </span>
            <span className={styles.signalText}>
                <strong>{label}</strong>
                <small>{getBooleanLabel(value)}</small>
            </span>
        </div>
    );
}

function getBooleanLabel(value: boolean | null) {
    if (value === true) return "Oui";
    if (value === false) return "Non";
    return "À confirmer";
}

function getBikeLabel(
    accessibleVelo: boolean | null,
    loireAVelo: boolean | null,
) {
    if (loireAVelo === true) return "Sur La Loire à Vélo";
    if (accessibleVelo === true) return "Accessible à vélo";
    if (accessibleVelo === false) return "Accès vélo non indiqué";
    return "Accès à confirmer";
}

function getCardColor(guinguette: Guinguette) {
    if (guinguette.statut === "historique") return "ardoise" as const;
    if (guinguette.statut === "a_verifier") return "ocre" as const;
    if (guinguette.type === "guinguette-itinerante") return "roseau" as const;
    return "fauve" as const;
}

function getStatusColor(status: GuinguetteStatut) {
    switch (status) {
        case "actif":
            return "prairie" as const;
        case "a_verifier":
            return "ocre" as const;
        case "historique":
            return "ardoise" as const;
    }
}

function getLinkIcon(key: keyof typeof LINK_LABELS) {
    switch (key) {
        case "googleMaps":
            return "⌖";
        case "instagram":
            return "◎";
        case "facebook":
            return "f";
        case "siteWeb":
            return "⌂";
    }
}

function humanize(value: string) {
    return value.replaceAll("_", " ");
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
