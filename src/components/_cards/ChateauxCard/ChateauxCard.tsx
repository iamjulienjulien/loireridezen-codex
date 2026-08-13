"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { TrackedCardLink } from "@/components/_layout/AnalyticsTracking";

import type { Chateau } from "@/types/chateau";
import type { Ambiance } from "@/registry/ambiances";

import styles from "./ChateauCard.module.css";
import LRZBadge from "@/components/_ui/LRZBadge";
import LRZAnecdote from "@/components/_ui/LRZAnecdote";
import {
    BookOpen,
    Castle,
    CircleHelp,
    MapPin,
    MapPinned,
    Route,
    Ticket,
} from "lucide-react";
import LRZAccordion from "@/components/_ui/LRZAccordion";
import LRZMetaList from "@/components/_ui/LRZMetaList";
import LRZCard, { LRZCardMedia } from "@/components/_ui/LRZCard";
import { LRZStamp } from "@/components/_ui/LRZStamp";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { LRZTextClamp } from "@/components/_ui/LRZTextClamp";
import { LRZTooltip } from "@/components/_ui/LRZTooltip";
import LRZTypography from "@/components/_ui/LRZTypography";
import { useAmbiance } from "@/hooks/useAmbiance";
import {
    getCategoriePersonnage,
    isCategoriePersonnageSlug,
} from "@/registry/categories-personnages";
import { Territoire } from "@/types/territoire";
import type { PersonnageAvecRelationLieu } from "@/types/personnage";
import type { NearbyGuinguette } from "@/lib/nearby-guinguettes";
import { formatDistanceKm } from "@/lib/nearby-guinguettes";

const CHATEAU_NAME_PREFIXES = [
    "Forteresse royale de",
    "Domaine royal de",
    "Château royal de",
    "Palais ducal de",
    "Cité royale de",
    "Château royal",
    "Château des",
    "Château de",
    "Château du",
    "Domaine de",
] as const;

function parseChateauName(name: string) {
    const apostrophePrefix = ["Château d'", "Château d’"].find((candidate) =>
        name.startsWith(candidate),
    );

    if (apostrophePrefix) {
        return {
            prefix: "Château",
            connector: apostrophePrefix.slice("Château ".length),
            name: name.slice(apostrophePrefix.length).trim(),
        };
    }

    const prefix = CHATEAU_NAME_PREFIXES.find((candidate) =>
        name.startsWith(`${candidate} `),
    );

    if (!prefix) {
        return { prefix: null, connector: null, name };
    }

    return {
        prefix,
        connector: null,
        name: name.slice(prefix.length).trim(),
    };
}

function ucfirst(value: string) {
    return value.length > 0
        ? value.charAt(0).toLocaleUpperCase("fr-FR") + value.slice(1)
        : value;
}

type ChateauHeroStyle = CSSProperties & {
    "--star-field": string;
};

function hashString(value: string): number {
    let hash = 2166136261;

    for (let index = 0; index < value.length; index += 1) {
        hash ^= value.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
}

function createSeededRandom(seed: number): () => number {
    return () => {
        seed += 0x6d2b79f5;

        let value = seed;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
}

function createStarField(slug: string, count = 18): string {
    const random = createSeededRandom(hashString(slug));

    return Array.from({ length: count }, () => {
        const x = Math.round((4 + random() * 92) * 10) / 10;
        const y = Math.round((4 + random() * 66) * 10) / 10;
        const size = Math.round((0.45 + random() * 0.75) * 100) / 100;
        const opacity = Math.round((0.35 + random() * 0.55) * 100) / 100;

        return `radial-gradient(circle at ${x}% ${y}%, rgba(255, 247, 218, ${opacity}) 0 ${size}px, transparent ${size + 0.6}px)`;
    }).join(", ");
}

export function getChateauIllustration(
    chateau: Chateau,
    ambiance: Ambiance,
): string {
    return chateau.illustrations[ambiance];
}

export type ChateauCardProps = {
    d: Chateau;
    t?: Territoire;
    personnages?: readonly PersonnageAvecRelationLieu[];
    /**
     * Résultats déjà calculés côté serveur.
     * `undefined` indique que l’enrichissement n’est pas fourni ; un tableau
     * vide indique qu’il est actif mais qu’aucune Guinguette n’est assez proche.
     */
    nearbyGuinguettes?: readonly NearbyGuinguette[];
    onShowOnMap?: (slug: string) => void;
};

type ChateauAccordionKey = "history" | "architecture" | "visit";

/**
 * Fiche château illustrée.
 *
 * Le château détouré habite le hero, tandis que les informations sont
 * regroupées par histoire, architecture, patrimoine et visite.
 */
export default function ChateauCard({
    d,
    t,
    personnages = [],
    nearbyGuinguettes,
    onShowOnMap,
}: ChateauCardProps) {
    const [ambiance] = useAmbiance();
    const illustration = getChateauIllustration(d, ambiance);
    const starField = useMemo(() => createStarField(d.slug), [d.slug]);
    const title = parseChateauName(d.nom);
    const nearbyEnrichmentEnabled = nearbyGuinguettes !== undefined;
    const nearbyMatches = nearbyGuinguettes ?? [];
    const hasVisitAndSurroundings =
        d.meta.experience.length > 0 || nearbyMatches.length > 0;
    const [openSection, setOpenSection] = useState<ChateauAccordionKey | null>(
        null,
    );

    const color =
        ambiance === "nuit"
            ? "sable"
            : ambiance === "soir"
              ? "orange-cuivre"
              : "brun";

    function setSectionOpen(section: ChateauAccordionKey, nextOpen: boolean) {
        setOpenSection((current) => {
            if (nextOpen) return section;
            return current === section ? null : current;
        });
    }

    return (
        <LRZCard
            className={styles.fiche}
            tone="surface"
            color={t?.identite.color ?? undefined}
        >
            <LRZCardMedia ratio="auto">
                <div
                    className={styles.hero}
                    style={{ "--star-field": starField } as ChateauHeroStyle}
                >
                    <div className={styles.heroArtwork} aria-hidden="true">
                        <Image
                            className={styles.heroImage}
                            src={illustration}
                            alt=""
                            fill
                            sizes="(max-width: 560px) 85vw, (max-width: 1080px) 45vw, 320px"
                        />
                    </div>
                </div>
            </LRZCardMedia>

            <div className={styles.heroContent}>
                {/* <p className={styles.heroEpoque}>{d.epoque}</p> */}
                <h3 className={styles.heroName}>
                    <TrackedCardLink
                        entrySlug={d.slug}
                        href={`/chateau/${d.slug}`}
                        className={styles.heroNameLink}
                    >
                        {title.prefix ? (
                            <span className={styles.heroNamePrefix}>
                                {title.prefix}
                            </span>
                        ) : null}
                        <span className={styles.heroNameSecondLine}>
                            {title.connector ? (
                                <span className={styles.heroNameConnector}>
                                    {title.connector}
                                </span>
                            ) : null}
                            <span className={styles.heroNameMain}>
                                {title.name}
                            </span>
                        </span>
                    </TrackedCardLink>
                </h3>
            </div>
            <div className={styles.subtitleWrapper}>
                <LRZTypography
                    align="center"
                    preset="editorial"
                    italic={false}
                    font="display"
                    leading="snug"
                    color="primary"
                    weight="medium"
                >
                    <LRZTextClamp as="span" lines={1} fixedHeight tooltipPortal>
                        {ucfirst(d.sousTitre)}
                    </LRZTextClamp>
                </LRZTypography>
            </div>
            <div
                className={styles.locationBand}
                data-has-map-link={onShowOnMap ? true : undefined}
            >
                <p className={styles.locationPrimary}>
                    <MapPin
                        className={styles.locationIcon}
                        aria-hidden="true"
                    />
                    <span className={styles.locationText}>
                        <LRZTooltip
                            content={`Département : ${d.departement}`}
                            side="top"
                            portal
                        >
                            <span
                                className={styles.communeTooltipTrigger}
                                tabIndex={0}
                            >
                                {d.commune}
                            </span>
                        </LRZTooltip>
                    </span>
                </p>
                <p className={styles.locationRiver}>
                    <span className={styles.locationIconSpacer} />
                    <span className={styles.locationText}>
                        <span className={styles.locationRiverLabel}>
                            Cours d’eau
                        </span>
                        <span
                            className={styles.locationSeparator}
                            aria-hidden="true"
                        >
                            ·
                        </span>
                        {d.riviere}
                    </span>
                </p>
                {onShowOnMap ? (
                    <button
                        type="button"
                        className={styles.locationMapLink}
                        aria-label={`Voir ${d.nom} sur la carte`}
                        onClick={() => onShowOnMap(d.slug)}
                    >
                        <MapPinned aria-hidden="true" />
                        Carte
                    </button>
                ) : null}
            </div>

            <div className={styles.body}>
                <div className={styles.stampsLine}>
                    <LRZStamp
                        collection="chateau"
                        meta="renommee"
                        slug={d.renommee}
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
                        collection="chateau"
                        meta="visite"
                        slug={d.visite}
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
                <LRZAccordion
                    title="Histoire"
                    description={
                        <LRZTextClamp
                            as="span"
                            lines={1}
                            fixedHeight
                            tooltip={false}
                        >
                            Récit et personnages
                        </LRZTextClamp>
                    }
                    id="histoire"
                    icon={<BookOpen className={styles.accordionIcon} />}
                    open={openSection === "history"}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("history", nextOpen)
                    }
                    color={color}
                    tone="surface"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                    animated
                >
                    <div className={styles.historyPanel}>
                        {d.resume ? (
                            <LRZAnecdote color={color}>{d.resume}</LRZAnecdote>
                        ) : null}

                        <LRZMetaList
                            color={color}
                            tone="soft"
                            size="sm"
                            layout="responsive"
                            hideEmpty
                            items={[
                                {
                                    id: "autres-noms",
                                    label: "Autres noms",
                                    value: d.autresNoms.join(" · "),
                                },
                                {
                                    id: "commanditaire",
                                    label: "Commanditaire",
                                    value: d.commanditaire,
                                    emphasized: true,
                                },
                            ]}
                        />

                        {personnages.length > 0 ? (
                            <ChateauPersonnageList personnages={personnages} />
                        ) : null}
                    </div>
                </LRZAccordion>

                <LRZAccordion
                    title="Architecture &amp; patrimoine"
                    description={
                        <LRZTextClamp
                            as="span"
                            lines={1}
                            fixedHeight
                            tooltip={false}
                        >
                            Styles, construction et protections
                        </LRZTextClamp>
                    }
                    id="architecture-patrimoine"
                    icon={<Castle className={styles.accordionIcon} />}
                    open={openSection === "architecture"}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("architecture", nextOpen)
                    }
                    color={color}
                    tone="surface"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                    animated
                >
                    <div className={styles.architecturePanel}>
                        <div className={styles.metaSections}>
                            <div className={styles.metaSection}>
                                <p className={styles.metaSectionLabel}>
                                    Époques
                                </p>
                                <div
                                    className={styles.metaStamps}
                                    aria-label="Époques"
                                >
                                    {d.meta.epoque.map((epoque) => (
                                        <LRZStamp
                                            key={epoque}
                                            collection="common"
                                            meta="epoque"
                                            slug={epoque}
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
                                    ))}
                                </div>
                            </div>

                            <div className={styles.metaSection}>
                                <p className={styles.metaSectionLabel}>
                                    Architectures
                                </p>
                                <div
                                    className={styles.metaStamps}
                                    aria-label="Architectures"
                                >
                                    {d.meta.architecture.map((architecture) => (
                                        <LRZStamp
                                            key={architecture}
                                            collection="common"
                                            meta="architecture"
                                            slug={architecture}
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
                                    ))}
                                </div>
                            </div>
                        </div>

                        <LRZMetaList
                            color="ocre"
                            layout="responsive"
                            hideEmpty
                            items={[
                                {
                                    id: "construction",
                                    label: "Construction",
                                    value: d.construction,
                                },
                                {
                                    id: "monument-historique",
                                    label: "Monument historique",
                                    value: (
                                        <LRZBadge
                                            preset="monument-historique-chateau"
                                            value={
                                                d.protection.monumentHistorique
                                            }
                                        />
                                    ),
                                },
                                {
                                    id: "unesco",
                                    label: "UNESCO",
                                    value: (
                                        <LRZBadge
                                            preset="unesco-chateau"
                                            value={d.protection.unesco}
                                        />
                                    ),
                                },
                                {
                                    id: "note-patrimoniale",
                                    label: "Note patrimoniale",
                                    value: d.protection.note,
                                },
                            ]}
                        />
                    </div>
                </LRZAccordion>

                {!nearbyEnrichmentEnabled || hasVisitAndSurroundings ? (
                    <LRZAccordion
                        title={
                            nearbyEnrichmentEnabled
                                ? "Visite & alentours"
                                : "Visite & expériences"
                        }
                        description={
                            <LRZTextClamp
                                as="span"
                                lines={1}
                                fixedHeight
                                tooltip={false}
                            >
                                {nearbyEnrichmentEnabled
                                    ? "Expériences au château et guinguettes à proximité"
                                    : "Accès et expériences"}
                            </LRZTextClamp>
                        }
                        id="visite"
                        icon={
                            nearbyEnrichmentEnabled ? (
                                <Route className={styles.accordionIcon} />
                            ) : (
                                <Ticket className={styles.accordionIcon} />
                            )
                        }
                        open={openSection === "visit"}
                        onOpenChange={(nextOpen) =>
                            setSectionOpen("visit", nextOpen)
                        }
                        color={color}
                        tone="surface"
                        fullWidth
                        headingLevel={4}
                        size="sm"
                        animated
                    >
                        <div className={styles.visitPanel}>
                            {nearbyEnrichmentEnabled ? (
                                <>
                                    {d.meta.experience.length > 0 ? (
                                        <section
                                            className={styles.visitSection}
                                            aria-labelledby={`experiences-${d.slug}`}
                                        >
                                            <p
                                                id={`experiences-${d.slug}`}
                                                className={
                                                    styles.visitSectionLabel
                                                }
                                            >
                                                Expériences
                                            </p>
                                            <div
                                                className={
                                                    styles.experienceGrid
                                                }
                                            >
                                                {d.meta.experience.map(
                                                    (experience) => (
                                                        <LRZStamp
                                                            key={experience}
                                                            collection="common"
                                                            meta="experience"
                                                            slug={experience}
                                                            variant="badge"
                                                            tone="ghost"
                                                            size="md"
                                                            font="body"
                                                            labelSize="xs"
                                                            padding="xs"
                                                            gap="sm"
                                                            symbolFrame="subtle"
                                                            symbolShape="rounded"
                                                            symbolScale={1}
                                                            gradient={false}
                                                            fullWidth
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </section>
                                    ) : null}

                                    {nearbyMatches.length > 0 ? (
                                        <section
                                            className={styles.visitSection}
                                            aria-labelledby={`nearby-guinguettes-${d.slug}`}
                                        >
                                            <div
                                                className={
                                                    styles.visitSectionHeading
                                                }
                                            >
                                                <p
                                                    id={`nearby-guinguettes-${d.slug}`}
                                                    className={
                                                        styles.visitSectionLabel
                                                    }
                                                >
                                                    Après la visite
                                                </p>
                                                <span
                                                    className={
                                                        styles.visitSectionHint
                                                    }
                                                >
                                                    Guinguettes à proximité
                                                </span>
                                            </div>
                                            <NearbyGuinguetteList
                                                matches={nearbyMatches}
                                            />
                                        </section>
                                    ) : null}
                                </>
                            ) : d.meta.experience.length > 0 ? (
                                <div className={styles.legacyExperienceGrid}>
                                    {d.meta.experience.map((experience) => (
                                        <LRZSymbol
                                            key={experience}
                                            collection="common"
                                            meta="experience"
                                            slug={experience}
                                            frame="solid"
                                            size={65}
                                            tooltip
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </LRZAccordion>
                ) : null}
            </div>
        </LRZCard>
    );
}

function NearbyGuinguetteList({
    matches,
}: {
    matches: readonly NearbyGuinguette[];
}) {
    return (
        <div className={styles.nearbyList}>
            {matches.map(({ guinguette, distanceKm }) => {
                const distance = formatDistanceKm(distanceKm);

                return (
                    <Link
                        key={guinguette.slug}
                        href={`/guinguette/${guinguette.slug}`}
                        className={styles.nearbyLink}
                        aria-label={`${guinguette.nom}, à ${distance} du château`}
                    >
                        <LRZSymbol
                            collection="codex"
                            meta="index"
                            slug="guinguettes"
                            size={34}
                            frame="subtle"
                            shape="rounded"
                            padding="xs"
                            decorative
                            className={styles.nearbySymbol}
                        />
                        <span className={styles.nearbyCopy}>
                            <strong className={styles.nearbyName}>
                                {guinguette.nom}
                            </strong>
                            {guinguette.sousTitre ? (
                                <LRZTextClamp
                                    as="span"
                                    className={styles.nearbySubtitle}
                                    lines={1}
                                    fixedHeight
                                    tooltip={false}
                                >
                                    {guinguette.sousTitre}
                                </LRZTextClamp>
                            ) : null}
                            <span className={styles.nearbyDetails}>
                                {guinguette.periode ? (
                                    <span>{guinguette.periode}</span>
                                ) : null}
                                {guinguette.statut === "a_verifier" ? (
                                    <span className={styles.nearbyReview}>
                                        <CircleHelp aria-hidden="true" />
                                        Informations à vérifier
                                    </span>
                                ) : null}
                            </span>
                        </span>
                        <strong className={styles.nearbyDistance}>
                            {distance}
                        </strong>
                    </Link>
                );
            })}
        </div>
    );
}

function ChateauPersonnageList({
    personnages,
}: {
    personnages: readonly PersonnageAvecRelationLieu[];
}) {
    return (
        <ul className={styles.personnageList}>
            {personnages.map(({ personnage, relation }) => {
                const categorie = getCategoriePersonnage(
                    personnage.categoriePrincipale,
                );
                const style = {
                    "--personnage-accent":
                        categorie?.identite.accent ?? "var(--color-ocre)",
                } as CSSProperties;

                return (
                    <li
                        key={`${personnage.id}-${relation.lieuId}`}
                        className={styles.personnageItem}
                        data-importance={relation.importance}
                        style={style}
                    >
                        {personnage.illustration ? (
                            <Image
                                className={styles.personnageBackdrop}
                                src={personnage.illustration}
                                alt=""
                                width={132}
                                height={148}
                                sizes="132px"
                                aria-hidden="true"
                            />
                        ) : (
                            <span
                                className={styles.personnageBackdropInitials}
                                aria-hidden="true"
                            >
                                {getInitials(personnage.nom)}
                            </span>
                        )}

                        <div className={styles.personnageCopy}>
                            <div className={styles.personnageHeading}>
                                {isCategoriePersonnageSlug(
                                    personnage.categoriePrincipale,
                                ) ? (
                                    <LRZSymbol
                                        collection="personnage"
                                        meta="categorie"
                                        slug={personnage.categoriePrincipale}
                                        size="xs"
                                        frame="none"
                                        padding="none"
                                        shadow="soft"
                                        decorative={false}
                                        label={
                                            categorie?.nom ??
                                            personnage.categoriePrincipale
                                        }
                                        tooltip
                                        className={
                                            styles.personnageCategorySymbol
                                        }
                                    />
                                ) : null}
                                <LRZTextClamp
                                    as="strong"
                                    lines={1}
                                    fixedHeight
                                    tooltipPortal
                                >
                                    {personnage.nom}
                                </LRZTextClamp>
                            </div>

                            <div className={styles.personnageRelation}>
                                <p className={styles.personnageRole}>
                                    {relation.libelle}
                                </p>
                                <p className={styles.personnageDate}>
                                    {relation.periodeAffichee}
                                </p>
                            </div>

                            <LRZTextClamp
                                as="p"
                                className={styles.personnageDescription}
                                lines={3}
                                fixedHeight
                                tooltipPortal
                            >
                                {relation.description}
                            </LRZTextClamp>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

function getInitials(name: string) {
    const words = name.split(/[\s-]+/).filter(Boolean);

    if (words.length === 0) return "?";
    if (words.length === 1) return words[0].slice(0, 2).toLocaleUpperCase("fr");

    return `${words[0][0]}${words.at(-1)?.[0] ?? ""}`.toLocaleUpperCase("fr");
}
