"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";

import type { Chateau } from "@/types/chateau";
import type { Ambiance } from "@/registry/ambiances";

import styles from "./ChateauCard.module.css";
import LRZBadge from "@/components/LRZBadge/LRZBadge";
import LRZAnecdote from "@/components/LRZAnecdote/LRZAnecdote";
import { Castle, MapPin, Ticket, UsersRound } from "lucide-react";
import LRZAccordion from "@/components/LRZAccordion/LRZAccordion";
import LRZMetaList from "@/components/LRZMetaList";
import LRZCard, { LRZCardMedia } from "@/components/LRZCard";
import { LRZSymbol } from "@/components/LRZSymbol";
import { LRZTextClamp } from "@/components/LRZTextClamp";
import LRZTypography from "@/components/LRZTypography";
import { useAmbiance } from "@/hooks/useAmbiance";
import {
    getCategoriePersonnage,
    isCategoriePersonnageSlug,
} from "@/registry/categories-personnages";
import { featureIsEnabled } from "@/registry/feature-flags";
import { Territoire } from "@/types/territoire";
import type { PersonnageAvecRelationLieu } from "@/types/personnage";

// const EPOQUE_COLOR: Record<string, LRZColor> = {
//     Médiéval: "brun",
//     Renaissance: "ocre",
//     Classique: "eau",
//     Éclectique: "brique",
// };

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
): string | undefined {
    if (!featureIsEnabled("ambianceChateauxVisual")) return chateau.customEmoji;
    return chateau.illustrationVariant?.[ambiance] ?? chateau.customEmoji;
}

export type ChateauCardProps = {
    d: Chateau;
    t?: Territoire;
    open: boolean;
    personnages?: readonly PersonnageAvecRelationLieu[];
};

type ChateauAccordionKey = "history" | "location" | "visit" | "characters";

function createAccordionState(open: boolean) {
    return {
        history: open,
        location: open,
        visit: open,
        characters: open,
    };
}

/**
 * Fiche château illustrée.
 *
 * Le château détouré habite le hero, tandis que les informations sont
 * regroupées par histoire, architecture, localisation et protections.
 */
export default function ChateauCard({
    d,
    t,
    open,
    personnages = [],
}: ChateauCardProps) {
    const [ambiance] = useAmbiance();
    const illustration = getChateauIllustration(d, ambiance);
    const starField = useMemo(() => createStarField(d.slug), [d.slug]);
    const title = parseChateauName(d.nom);
    const [openSections, setOpenSections] = useState(() =>
        createAccordionState(open),
    );
    const [globalOpen, setGlobalOpen] = useState(open);
    const personnagesEnabled = featureIsEnabled("personnages");

    const color =
        ambiance === "nuit"
            ? "sable"
            : ambiance === "soir"
              ? "orange-cuivre"
              : "brun";

    if (globalOpen !== open) {
        setGlobalOpen(open);
        setOpenSections(createAccordionState(open));
    }

    function setSectionOpen(section: ChateauAccordionKey, nextOpen: boolean) {
        setOpenSections((current) => ({
            ...current,
            [section]: nextOpen,
        }));
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
                        {illustration ? (
                            <Image
                                className={styles.heroImage}
                                src={illustration}
                                alt=""
                                fill
                                sizes="(max-width: 560px) 85vw, (max-width: 1080px) 45vw, 320px"
                            />
                        ) : (
                            <span className={styles.heroFallback}>
                                {d.emoji || "🏰"}
                            </span>
                        )}
                    </div>
                </div>
            </LRZCardMedia>

            <div className={styles.heroContent}>
                {/* <p className={styles.heroEpoque}>{d.epoque}</p> */}
                <h3 className={styles.heroName}>
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
                </h3>
            </div>
            <div className={styles.subtitleWrapper}>
                <LRZTypography
                    align="center"
                    preset="editorial"
                    italic={false}
                    font="display"
                >
                    {ucfirst(d.sousTitre)}
                </LRZTypography>
            </div>

            <div className={styles.body}>
                {featureIsEnabled("chateauxRenommee") && (
                    <div>
                        <LRZBadge
                            preset="renommee-chateau"
                            value={d.renommee}
                            detail={false}
                            variant="shield"
                        />
                    </div>
                )}
                <LRZAccordion
                    title="Histoire &amp; architecture"
                    description="Époque, architecture et construction"
                    id="histoire"
                    icon={<Castle className={styles.accordionIcon} />}
                    open={openSections.history}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("history", nextOpen)
                    }
                    color={color}
                    tone="surface"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                >
                    <div>
                        <LRZMetaList
                            className="pb-4"
                            color="ocre"
                            layout="responsive"
                            hideEmpty
                            items={[
                                {
                                    id: "epoque",
                                    label: "Époque",
                                    value: d.epoque,
                                },
                                {
                                    id: "architecture",
                                    label: "Architecture",
                                    value: d.style,
                                },

                                {
                                    id: "construction",
                                    label: "Construction",
                                    value: d.construction,
                                },
                                {
                                    id: "autres-noms",
                                    label: "Autres noms",
                                    value: d.autresNoms.join(" · "),
                                },
                            ]}
                        />
                        {d.resume ? (
                            <LRZAnecdote color={color}>{d.resume}</LRZAnecdote>
                        ) : null}
                    </div>
                </LRZAccordion>

                <LRZAccordion
                    title="Localisation"
                    description="Commune, département et cours d’eau"
                    id="localisation"
                    icon={<MapPin className={styles.accordionIcon} />}
                    open={openSections.location}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("location", nextOpen)
                    }
                    color={color}
                    tone="surface"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                >
                    <LRZMetaList
                        color="ocre"
                        layout="responsive"
                        items={[
                            {
                                id: "commune",
                                label: "Commune",
                                value: d.commune,
                            },
                            {
                                id: "departement",
                                label: "Département",
                                value: d.departement,
                            },
                            {
                                id: "riviere",
                                label: "Cours d’eau",
                                value: d.riviere,
                            },
                        ]}
                    />
                </LRZAccordion>

                <LRZAccordion
                    title="Visite & patrimoine"
                    description="Visite, protections et patrimoine"
                    id="visite"
                    icon={<Ticket className={styles.accordionIcon} />}
                    open={openSections.visit}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("visit", nextOpen)
                    }
                    color={color}
                    tone="surface"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                >
                    <LRZMetaList
                        color="ocre"
                        layout="responsive"
                        tone="plain"
                        size="sm"
                        items={[
                            {
                                id: "monument-historique",
                                label: "Monument historique",
                                value: (
                                    <LRZBadge
                                        preset="monument-historique-chateau"
                                        value={d.protection.monumentHistorique}
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
                                id: "visite",
                                label: "Visite",
                                value: (
                                    <LRZBadge
                                        preset="visite-chateau"
                                        value={d.visite}
                                    />
                                ),
                            },
                        ]}
                    />
                </LRZAccordion>

                {personnagesEnabled &&
                (personnages.length > 0 || Boolean(d.commanditaire)) ? (
                    <LRZAccordion
                        title="Personnages"
                        description={
                            personnages.length > 0
                                ? formatPersonnageCount(personnages.length)
                                : "Commanditaire du lieu"
                        }
                        id={`personnages-${d.slug}`}
                        icon={<UsersRound className={styles.accordionIcon} />}
                        open={openSections.characters}
                        onOpenChange={(nextOpen) =>
                            setSectionOpen("characters", nextOpen)
                        }
                        color={color}
                        tone="surface"
                        fullWidth
                        headingLevel={4}
                        size="sm"
                        unmountOnClose
                    >
                        <div className={styles.personnagesPanel}>
                            {d.commanditaire ? (
                                <LRZMetaList
                                    className={styles.commanditaireMeta}
                                    color={color}
                                    tone="soft"
                                    size="sm"
                                    layout="responsive"
                                    items={[
                                        {
                                            id: "commanditaire",
                                            label: "Commanditaire",
                                            value: d.commanditaire,
                                            emphasized: true,
                                        },
                                    ]}
                                />
                            ) : null}

                            {personnages.length > 0 ? (
                                <ChateauPersonnageList
                                    personnages={personnages}
                                />
                            ) : null}
                        </div>
                    </LRZAccordion>
                ) : null}
            </div>
        </LRZCard>
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
                                        title={
                                            categorie?.nom ??
                                            personnage.categoriePrincipale
                                        }
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
                                lines={4}
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

function formatPersonnageCount(count: number) {
    return count === 1
        ? "1 figure liée au lieu"
        : `${count} figures liées au lieu`;
}

function getInitials(name: string) {
    const words = name.split(/[\s-]+/).filter(Boolean);

    if (words.length === 0) return "?";
    if (words.length === 1) return words[0].slice(0, 2).toLocaleUpperCase("fr");

    return `${words[0][0]}${words.at(-1)?.[0] ?? ""}`.toLocaleUpperCase("fr");
}
