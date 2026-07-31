import type { ReactNode } from "react";
import {
    BadgeCheck,
    Bike,
    CalendarDays,
    CircleCheck,
    CircleHelp,
    CircleX,
    ExternalLink,
    Globe2,
    GlobeCheck,
    MapPin,
    Music2,
    Navigation,
    Route,
    Sparkles,
    TentTree,
    Umbrella,
    UtensilsCrossed,
    Waves,
} from "lucide-react";

import LRZAccordion from "@/components/LRZAccordion/LRZAccordion";
import LRZBadge, { type LRZBadgeIcon } from "@/components/LRZBadge/LRZBadge";
import { getGuinguetteAmbienceDefinition } from "@/registry/guinguette-ambiences";
import { getTerritoire } from "@/registry/territoires";
import {
    LRZCard,
    LRZCardContent,
    LRZCardHeader,
    LRZCardSection,
} from "@/components/LRZCard";
import LRZMetaList, { type LRZMetaListItem } from "@/components/LRZMetaList";
import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import { LRZTooltip } from "@/components/LRZTooltip";
import type { LRZColor } from "@/types/lrz";
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

const SERVICE_ICONS: Record<string, LRZBadgeIcon> = {
    restauration: <UtensilsCrossed size={13} />,
    bar: <span aria-hidden>🍷</span>,
    terrasse: <Umbrella size={13} />,
    concerts: <Music2 size={13} />,
    musique: <Music2 size={13} />,
    animations: <Sparkles size={13} />,
    danse: <Sparkles size={13} />,
    jeux: <span aria-hidden>🎲</span>,
    tapas: <UtensilsCrossed size={13} />,
    "accès par bac": <Waves size={13} />,
    "animaux acceptés": <span aria-hidden>🐾</span>,
};

const LINK_LABELS = {
    siteWeb: "Site web",
    instagram: "Instagram",
    facebook: "Facebook",
    googleMaps: "Itinéraire",
} as const;

type LinkKey = keyof typeof LINK_LABELS;

type GuinguetteCardV3Props = {
    guinguette: Guinguette;
    open: boolean;
    onToggle: () => void;
};

export default function GuinguetteCardV3({
    guinguette,
    open,
    onToggle,
}: GuinguetteCardV3Props) {
    const locality = guinguette.communeDeleguee
        ? `${guinguette.communeDeleguee} · ${guinguette.commune}`
        : guinguette.commune;

    const links = Object.entries(guinguette.liens).filter(
        (entry): entry is [LinkKey, string] =>
            typeof entry[1] === "string" && entry[1].length > 0,
    );

    const cardColor = getCardColor(guinguette);
    const territoire = getTerritoire(guinguette.territoire);
    const isUnverified = guinguette.statut === "a_verifier";
    const isItinerant = guinguette.type === "guinguette-itinerante";
    const titleId = `guinguette-${guinguette.slug}-title`;

    const primaryMetaItems: LRZMetaListItem[] = [
        {
            id: "season",
            label: "Saison",
            value: guinguette.periode,
            icon: <CalendarDays size={14} />,
            emphasized: true,
        },
        {
            id: "setting",
            label: "Au fil de l’eau",
            value: [capitalize(guinguette.vue), guinguette.coursDEau]
                .filter(Boolean)
                .join(" · "),
            icon: <Waves size={14} />,
        },
        {
            id: "bike-access",
            label: "Accès vélo",
            value: getBikeLabel(
                guinguette.accessibleVelo,
                guinguette.loireAVelo,
            ),
            hint:
                guinguette.loireAVelo === true
                    ? "Directement sur La Loire à Vélo"
                    : undefined,
            icon: <Bike size={14} />,
            span: "full",
        },
    ];

    const practicalMetaItems: LRZMetaListItem[] = [
        {
            id: "locality",
            label: "Commune",
            value: locality,
            icon: <MapPin size={13} />,
        },
        {
            id: "department",
            label: "Département",
            value: guinguette.departement,
        },
        {
            id: "territory",
            label: "Territoire",
            value: territoire?.nom ?? humanize(guinguette.territoire),
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
            icon: <BadgeCheck size={13} />,
            span: "full",
        },
        {
            id: "coordinates",
            label: "Coordonnées",
            value:
                guinguette.position.latitude !== null &&
                guinguette.position.longitude !== null
                    ? `${guinguette.position.latitude.toFixed(5)}, ${guinguette.position.longitude.toFixed(5)}`
                    : null,
            hint:
                guinguette.position.latitude === null ||
                guinguette.position.longitude === null
                    ? "Non renseignées dans le catalogue"
                    : undefined,
            span: "full",
        },
        {
            id: "aliases",
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
            equalHeight={false}
            ariaLabelledby={titleId}
            className={styles.guinguetteCard}
            data-status={guinguette.statut}
            data-open={open || undefined}
        >
            <LRZCardContent padding="md" className={styles.cardContent}>
                <div className={styles.heroWash} aria-hidden="true">
                    <Waves />
                </div>

                <LRZCardHeader
                    eyebrow={locality}
                    title={guinguette.nom}
                    titleAs="h3"
                    titleId={titleId}
                    description={[
                        TYPE_LABELS[guinguette.type],
                        guinguette.coursDEau,
                    ]
                        .filter(Boolean)
                        .join(" · ")}
                    icon={
                        <span className={styles.cardIcon}>
                            {isItinerant ? <TentTree /> : <Umbrella />}
                        </span>
                    }
                    metadata={
                        <LRZBadge
                            label={STATUS_LABELS[guinguette.statut]}
                            detail={
                                guinguette.statut === "actif"
                                    ? "confirmée"
                                    : guinguette.statut === "a_verifier"
                                      ? "publication prudente"
                                      : "mémoire du lieu"
                            }
                            icon={getStatusIcon(guinguette.statut)}
                            color={cardColor}
                            variant={
                                guinguette.statut === "actif"
                                    ? "plaque"
                                    : "shield"
                            }
                            dashed={isUnverified}
                            gradient={guinguette.statut === "actif"}
                            className={styles.statusBadge}
                        />
                    }
                    className={styles.cardHeader}
                />

                {guinguette.sousTitre ? (
                    <blockquote className={styles.tagline}>
                        {guinguette.sousTitre}
                    </blockquote>
                ) : null}

                <LRZMetaList
                    items={primaryMetaItems}
                    color={cardColor}
                    tone="soft"
                    size="sm"
                    layout="stacked"
                    columns={2}
                    emptyValue="À confirmer"
                    className={styles.primaryMeta}
                />

                <div
                    className={styles.signalRail}
                    aria-label="Services essentiels"
                >
                    <Signal
                        icon={<Umbrella size={17} />}
                        label="Terrasse"
                        value={guinguette.terrasse}
                    />
                    <Signal
                        icon={<Music2 size={17} />}
                        label="Musique"
                        value={guinguette.musiqueLive}
                    />
                    <Signal
                        icon={<Bike size={17} />}
                        label="Vélo"
                        value={guinguette.accessibleVelo}
                    />
                </div>

                {guinguette.ambiance.length > 0 ? (
                    <div
                        className={styles.ambienceList}
                        aria-label="Ambiances de la guinguette"
                    >
                        {guinguette.ambiance.map((ambience) => {
                            const definition =
                                getGuinguetteAmbienceDefinition(ambience);

                            if (!definition) {
                                return (
                                    <LRZBadge
                                        key={ambience}
                                        label={ambience}
                                        color="galet"
                                        variant="default"
                                        dashed
                                        title="Ambiance non répertoriée"
                                    />
                                );
                            }

                            const Icon = definition.icon;

                            return (
                                <LRZBadge
                                    key={ambience}

                                    label={definition.label}

                                    icon={<Icon size={12} strokeWidth={1.8} />}

                                    color={definition.color}

                                    variant="pill"

                                    gradient={false}

                                    title={definition.description}
                                />
                            );
                        })}
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
                    <div className={styles.warning}>
                        <CircleHelp size={17} aria-hidden="true" />
                        <p>
                            Cette entrée demande une vérification avant
                            publication comme établissement actuellement actif.
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
                    description="Portrait, services et repères pratiques"
                    icon={<Navigation size={17} />}
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

                        <LRZSeparateur
                            scope="content"
                            preset="ornament"
                            size="xs"
                            tone="subtle"
                            color={cardColor}
                            marginBlock={2}
                            compactOnMobile
                        />

                        {guinguette.services.length > 0 ? (
                            <section
                                className={styles.detailSection}
                                aria-labelledby={`services-${guinguette.slug}`}
                            >
                                <h5 id={`services-${guinguette.slug}`}>
                                    Sur place
                                </h5>
                                <div className={styles.serviceCloud}>
                                    {guinguette.services.map((service) => (
                                        <LRZBadge
                                            key={service}
                                            label={service}
                                            icon={
                                                SERVICE_ICONS[service] ?? false
                                            }
                                            color={cardColor}
                                            variant="default"
                                            gradient={false}
                                            className={styles.serviceBadge}
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

                        {guinguette.tags.length > 0 ? (
                            <section className={styles.detailSection}>
                                <h5>Repères du Codex</h5>
                                <div className={styles.tagCloud}>
                                    {guinguette.tags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </section>
                        ) : null}

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
                                        <span
                                            className={styles.linkIcon}
                                            aria-hidden="true"
                                        >
                                            {getLinkIcon(key)}
                                        </span>
                                        <span>{LINK_LABELS[key]}</span>
                                        <ExternalLink
                                            size={12}
                                            aria-hidden="true"
                                        />
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
    const stateIcon =
        value === true ? (
            <CircleCheck size={13} />
        ) : value === false ? (
            <CircleX size={13} />
        ) : (
            <CircleHelp size={13} />
        );

    return (
        <LRZTooltip
            content={`${label} : ${getBooleanLabel(value)}`}
            side="top"
            portal
        >
            <span
                className={styles.signal}
                data-value={value === null ? "unknown" : String(value)}
            >
                <span className={styles.signalMainIcon} aria-hidden="true">
                    {icon}
                </span>
                <span className={styles.signalCopy}>
                    <strong>{label}</strong>
                    <small>{getBooleanLabel(value)}</small>
                </span>
                <span className={styles.signalStateIcon} aria-hidden="true">
                    {stateIcon}
                </span>
            </span>
        </LRZTooltip>
    );
}

function getStatusIcon(status: GuinguetteStatut) {
    if (status === "actif") return <BadgeCheck size={14} />;
    if (status === "a_verifier") return <CircleHelp size={14} />;
    return <TentTree size={14} />;
}

function getLinkIcon(key: LinkKey) {
    switch (key) {
        case "siteWeb":
            return <Globe2 size={15} />;
        case "instagram":
            return <GlobeCheck size={15} />;
        case "facebook":
            return <GlobeCheck size={15} />;
        case "googleMaps":
            return <Route size={15} />;
    }
}

function getCardColor(guinguette: Guinguette): LRZColor {
    if (guinguette.statut === "a_verifier") return "ocre";
    if (guinguette.statut === "historique") return "gris-ardoise";
    if (guinguette.type === "guinguette-itinerante") return "roseau";
    if (guinguette.coursDEau === "Loire") return "fauve";
    return "bleu-gris";
}

function getBikeLabel(
    accessibleVelo: boolean | null,
    loireAVelo: boolean | null,
) {
    if (loireAVelo === true) return "Sur La Loire à Vélo";
    if (accessibleVelo === true) return "Accessible à vélo";
    if (accessibleVelo === false) return "Accès vélo non indiqué";
    return "À confirmer";
}

function getBooleanLabel(value: boolean | null) {
    if (value === true) return "Oui";
    if (value === false) return "Non";
    return "À confirmer";
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function humanize(value: string) {
    return value.replaceAll("_", " ");
}
