import type { ReactNode } from "react";
import Link from "next/link";
import {
    BadgeCheck,
    Bike,
    CalendarDays,
    CircleCheck,
    CircleHelp,
    CircleX,
    ExternalLink,
    Globe2,
    MapPin,
    Music2,
    Route,
    Umbrella,
    Waves,
} from "lucide-react";

import LRZAccordion from "@/components/_ui/LRZAccordion/LRZAccordion";
import LRZAnecdote from "@/components/_ui/LRZAnecdote/LRZAnecdote";
import LRZBadge, {
    type LRZBadgeIcon,
} from "@/components/_ui/LRZBadge/LRZBadge";
import LRZCard from "@/components/_ui/LRZCard";
import LRZMetaList, {
    type LRZMetaListItem,
} from "@/components/_ui/LRZMetaList";
import { LRZTextClamp } from "@/components/_ui/LRZTextClamp";
import type { Guinguette } from "@/types/guinguette";
import type { LRZColor } from "@/types/lrz";

import styles from "./GuinguetteCard.module.css";
import LRZSymbol from "@/components/_ui/LRZSymbol";

const TYPE_LABELS: Record<Guinguette["type"], string> = {
    guinguette: "Guinguette",
    "restaurant-guinguette": "Restaurant-guinguette",
    "bar-guinguette": "Bar-guinguette",
    "guinguette-itinerante": "Guinguette itinérante",
};

const VERIFICATION_LABELS: Record<string, string> = {
    confirme_par_office_de_tourisme: "Confirmé par un office de tourisme",
    nom_ambigu: "Nom ou établissement ambigu",
    etablissement_non_confirme: "Établissement actuel non confirmé",
    concept_confirme_programmation_a_actualiser:
        "Concept confirmé, programmation à actualiser",
};

const SERVICE_ICONS: Record<string, LRZBadgeIcon> = {
    restauration: <span aria-hidden>🍽️</span>,
    bar: <span aria-hidden>🍷</span>,
    terrasse: <span aria-hidden>☀️</span>,
    concerts: <span aria-hidden>🎤</span>,
    musique: <span aria-hidden>🎶</span>,
    animations: <span aria-hidden>🤹🏻‍♀️</span>,
    danse: <span aria-hidden>🕺🏻</span>,
    jeux: <span aria-hidden>🎲</span>,
    tapas: <span aria-hidden>🥜</span>,
    "accès par bac": <span aria-hidden>⚓️</span>,
    "animaux acceptés": <span aria-hidden>🐾</span>,
};

const LINK_LABELS = {
    siteWeb: "Site web",
    instagram: "Instagram",
    facebook: "Facebook",
    googleMaps: "Itinéraire",
} as const;

type LinkKey = keyof typeof LINK_LABELS;

export type GuinguetteCardProps = {
    guinguette: Guinguette;
    expandAll?: boolean;
};

/**
 * Carte guinguette alignée sur la grammaire éditoriale de Faune et Flore.
 *
 * L'identité et les ambiances restent immédiatement lisibles, tandis que les
 * informations détaillées sont réparties dans trois accordéons métier.
 */
export default function GuinguetteCard({
    guinguette,
    expandAll = false,
}: GuinguetteCardProps) {
    const color = getCardColor(guinguette);
    const locality = guinguette.communeDeleguee
        ? `${guinguette.communeDeleguee} · ${guinguette.commune}`
        : guinguette.commune;
    const titleId = `guinguette-${guinguette.slug}-title`;
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
            value: locality + " [" + guinguette.departement + "]",
            icon: <MapPin size={13} />,
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
                    <LRZSymbol
                        collection="common"
                        meta="territoire"
                        slug={guinguette.territoire}
                        frame="subtle"
                        size={60}
                        padding="sm"
                        shadow="soft"
                        tooltip
                    />

                    <div className={styles.identityCopy}>
                        <p className={styles.classification}>
                            {TYPE_LABELS[guinguette.type]}
                        </p>
                        <LRZTextClamp
                            as="h3"
                            id={titleId}
                            className={styles.name}
                            lines={2}
                            fixedHeight
                        >
                            <Link href={`/guinguette/${guinguette.slug}`}>
                                {guinguette.nom}
                            </Link>
                        </LRZTextClamp>
                        {/* <p className={styles.locality}>{locality}</p>
                        <p className={styles.classification}>
                            {TYPE_LABELS[guinguette.type]}
                            {guinguette.coursDEau
                                ? ` · ${guinguette.coursDEau}`
                                : null}
                        </p> */}
                    </div>
                </header>

                <div className={styles.wave} aria-hidden="true" />

                {guinguette.sousTitre ? (
                    <LRZTextClamp
                        as="p"
                        // id={titleId}
                        className={styles.subtitle}
                        lines={1}
                        fixedHeight
                    >
                        {guinguette.sousTitre}
                    </LRZTextClamp>
                ) : null}

                <div className={styles.stamps} aria-label="Repères illustrés">
                    {guinguette.ambiance.map((ambience) => (
                        <LRZSymbol
                            key={ambience}
                            collection="guinguette"
                            meta="ambience"
                            slug={ambience}
                            frame="subtle"
                            size="lg"
                            tooltip
                            // variant="chip"
                            // tone="subtle"
                            // size="xs"
                            // font="mono"
                            // labelSize={11}
                            // paddingX={10}
                            // paddingY={4}
                            // gap="lg"
                            // symbolScale={0.9}
                            // gradient={false}
                        />
                    ))}
                </div>

                {false ? (
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
                                tone="soft"
                                size="sm"
                                layout="stacked"
                                // columns={2}
                                emptyValue="À confirmer"
                            />

                            {links.length > 10 ? (
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
