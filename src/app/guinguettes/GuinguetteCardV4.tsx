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
    Landmark,
    MapPin,
    Music2,
    Route,
    TentTree,
    Umbrella,
    UtensilsCrossed,
    Waves,
} from "lucide-react";

import LRZAccordion from "@/components/LRZAccordion/LRZAccordion";
import LRZAnecdote from "@/components/LRZAnecdote/LRZAnecdote";
import LRZBadge, { type LRZBadgeIcon } from "@/components/LRZBadge/LRZBadge";
import LRZCard from "@/components/LRZCard";
import LRZMetaList, { type LRZMetaListItem } from "@/components/LRZMetaList";
import { LRZStamp } from "@/components/LRZStamp";
import { LRZTextClamp } from "@/components/LRZTextClamp";
import { getTerritoire } from "@/registry/territoires";
import type { Guinguette, GuinguetteStatut } from "@/types/guinguette";
import type { LRZColor } from "@/types/lrz";

import styles from "./GuinguetteCardV4.module.css";

const TYPE_LABELS: Record<Guinguette["type"], string> = {
    guinguette: "Guinguette",
    "restaurant-guinguette": "Restaurant-guinguette",
    "bar-guinguette": "Bar-guinguette",
    "guinguette-itinerante": "Guinguette itinérante",
};

const STATUS_LABELS: Record<GuinguetteStatut, string> = {
    actif: "Adresse active",
    a_verifier: "À vérifier",
    historique: "Lieu historique",
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
    animations: <span aria-hidden>✦</span>,
    danse: <span aria-hidden>♪</span>,
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

export type GuinguetteCardV4Props = {
    guinguette: Guinguette;
    expandAll?: boolean;
};

/**
 * Carte guinguette alignée sur la grammaire éditoriale de Faune et Flore.
 *
 * L'identité et les ambiances restent immédiatement lisibles, tandis que les
 * informations détaillées sont réparties dans trois accordéons métier.
 */
export default function GuinguetteCardV4({
    guinguette,
    expandAll = false,
}: GuinguetteCardV4Props) {
    const color = getCardColor(guinguette);
    const territoire = getTerritoire(guinguette.territoire);
    const locality = guinguette.communeDeleguee
        ? `${guinguette.communeDeleguee} · ${guinguette.commune}`
        : guinguette.commune;
    const isItinerant = guinguette.type === "guinguette-itinerante";
    const isUnverified = guinguette.statut === "a_verifier";
    const titleId = `guinguette-v4-${guinguette.slug}-title`;
    const links = Object.entries(guinguette.liens).filter(
        (entry): entry is [LinkKey, string] =>
            typeof entry[1] === "string" && entry[1].length > 0,
    );

    const stopoverItems: LRZMetaListItem[] = [
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

    const practicalItems: LRZMetaListItem[] = [
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
            color={color}
            tone="surface"
            accent="start"
            elevation="card"
            ariaLabelledby={titleId}
            className={styles.card}
            data-status={guinguette.statut}
        >
            <div className={styles.content}>
                <header className={styles.identity}>
                    <span className={styles.identityIcon} aria-hidden="true">
                        {isItinerant ? <TentTree /> : <Umbrella />}
                    </span>

                    <div className={styles.identityCopy}>
                        <p className={styles.locality}>{locality}</p>
                        <LRZTextClamp
                            as="h3"
                            id={titleId}
                            className={styles.name}
                            lines={2}
                            fixedHeight
                        >
                            {guinguette.nom}
                        </LRZTextClamp>
                        <p className={styles.classification}>
                            {TYPE_LABELS[guinguette.type]}
                            {guinguette.coursDEau
                                ? ` · ${guinguette.coursDEau}`
                                : null}
                        </p>
                    </div>

                    <LRZBadge
                        label={STATUS_LABELS[guinguette.statut]}
                        icon={getStatusIcon(guinguette.statut)}
                        color={color}
                        variant={
                            guinguette.statut === "actif" ? "plaque" : "shield"
                        }
                        dashed={isUnverified}
                        gradient={guinguette.statut === "actif"}
                        className={styles.status}
                    />
                </header>

                {guinguette.sousTitre ? (
                    <p className={styles.subtitle}>{guinguette.sousTitre}</p>
                ) : null}

                <div className={styles.wave} aria-hidden="true" />

                <div className={styles.stamps} aria-label="Repères illustrés">
                    <LRZStamp
                        collection="common"
                        meta="territoire"
                        slug={guinguette.territoire}
                        variant="chip"
                        tone="outline"
                        size="xs"
                        font="mono"
                        labelSize={11}
                        paddingX={10}
                        paddingY={4}
                        gap="lg"
                        symbolScale={0.9}
                        gradient={false}
                    />
                    {guinguette.ambiance.map((ambience) => (
                        <LRZStamp
                            key={ambience}
                            collection="guinguette"
                            meta="ambience"
                            slug={ambience}
                            variant="chip"
                            tone="outline"
                            size="xs"
                            font="mono"
                            labelSize={11}
                            paddingX={10}
                            paddingY={4}
                            gap="lg"
                            symbolScale={0.9}
                            gradient={false}
                        />
                    ))}
                </div>

                {isUnverified ? (
                    <div className={styles.warning} role="note">
                        <CircleHelp size={16} aria-hidden="true" />
                        <p>
                            Programmation ou ouverture à confirmer avant votre
                            venue.
                        </p>
                    </div>
                ) : null}

                <div className={styles.accordions}>
                    <LRZAccordion
                        id={`guinguette-v4-${guinguette.slug}-stopover`}
                        title="L’escale"
                        description="Cadre, saison et accès vélo"
                        icon={<Waves className={styles.accordionIcon} />}
                        color={color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                        defaultOpen={expandAll}
                        unmountOnClose
                    >
                        <LRZMetaList
                            items={stopoverItems}
                            color={color}
                            tone="divided"
                            size="sm"
                            layout="responsive"
                            columns={2}
                            emptyValue="À confirmer"
                        />
                    </LRZAccordion>

                    <LRZAccordion
                        id={`guinguette-v4-${guinguette.slug}-experience`}
                        title="L’expérience"
                        description="Portrait et services sur place"
                        icon={<Music2 className={styles.accordionIcon} />}
                        color={color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                        defaultOpen={expandAll}
                        unmountOnClose
                    >
                        <div className={styles.experience}>
                            <LRZAnecdote color={color} mark="❝">
                                {guinguette.description}
                            </LRZAnecdote>

                            <div
                                className={styles.signals}
                                aria-label="Services essentiels"
                            >
                                <Signal
                                    icon={<Umbrella size={16} />}
                                    label="Terrasse"
                                    value={guinguette.terrasse}
                                />
                                <Signal
                                    icon={<Music2 size={16} />}
                                    label="Musique"
                                    value={guinguette.musiqueLive}
                                />
                                <Signal
                                    icon={<Bike size={16} />}
                                    label="Vélo"
                                    value={guinguette.accessibleVelo}
                                />
                            </div>

                            {guinguette.services.length > 0 ? (
                                <div
                                    className={styles.services}
                                    aria-label="Services disponibles"
                                >
                                    {guinguette.services.map((service) => (
                                        <LRZBadge
                                            key={service}
                                            label={service}
                                            icon={
                                                SERVICE_ICONS[service] ?? false
                                            }
                                            color={color}
                                            variant="default"
                                            gradient={false}
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </LRZAccordion>

                    <LRZAccordion
                        id={`guinguette-v4-${guinguette.slug}-practical`}
                        title="Repères pratiques"
                        description="Localisation, statut et liens utiles"
                        icon={<MapPin className={styles.accordionIcon} />}
                        color={color}
                        tone="surface"
                        size="sm"
                        fullWidth
                        headingLevel={4}
                        defaultOpen={expandAll}
                        unmountOnClose
                    >
                        <div className={styles.practical}>
                            <LRZMetaList
                                items={practicalItems}
                                color={color}
                                tone="divided"
                                size="sm"
                                layout="responsive"
                                columns={2}
                                emptyValue="À confirmer"
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
                                                key === "googleMaps" ||
                                                undefined
                                            }
                                        >
                                            <span aria-hidden="true">
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
                </div>
            </div>
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
        <span
            className={styles.signal}
            data-value={value === null ? "unknown" : String(value)}
            aria-label={`${label} : ${getBooleanLabel(value)}`}
        >
            <span className={styles.signalIcon} aria-hidden="true">
                {icon}
            </span>
            <span className={styles.signalLabel}>{label}</span>
            <span className={styles.signalState} aria-hidden="true">
                {value === true ? (
                    <CircleCheck />
                ) : value === false ? (
                    <CircleX />
                ) : (
                    <CircleHelp />
                )}
            </span>
        </span>
    );
}

function getStatusIcon(status: GuinguetteStatut) {
    if (status === "actif") return <BadgeCheck size={14} />;
    if (status === "a_verifier") return <CircleHelp size={14} />;
    return <Landmark size={14} />;
}

function getLinkIcon(key: LinkKey) {
    if (key === "googleMaps") return <Route size={15} />;
    return <Globe2 size={15} />;
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
    return null;
}

function getBooleanLabel(value: boolean | null) {
    if (value === true) return "Oui";
    if (value === false) return "Non";
    return "À confirmer";
}

function capitalize(value: string) {
    return value.length > 0
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
}

function humanize(value: string) {
    return value.replaceAll("_", " ");
}
