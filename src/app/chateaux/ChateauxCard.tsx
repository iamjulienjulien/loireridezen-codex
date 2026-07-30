"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";

import type { Chateau } from "@/types/chateau";
import type { Ambiance } from "@/registry/ambiances";

import styles from "./ChateauCard.module.css";
import { LRZColor } from "@/types/lrz";
import LRZBadge from "@/components/LRZBadge/LRZBadge";
import LRZAnecdote from "@/components/LRZAnecdote/LRZAnecdote";
import { Castle, MapPin, Ticket } from "lucide-react";
import LRZAccordion from "@/components/LRZAccordion/LRZAccordion";
import LRZMetaList from "@/components/LRZMetaList";
import LRZCard, { LRZCardMedia } from "@/components/LRZCard";
import LRZTypography from "@/components/LRZTypography";
import { useAmbiance } from "@/hooks/useAmbiance";
import { featureIsEnabled } from "@/registry/feature-flags";
import { Territoire } from "@/types/territoire";

// const EPOQUE_COLOR: Record<string, LRZColor> = {
//     Médiéval: "brun",
//     Renaissance: "ocre",
//     Classique: "eau",
//     Éclectique: "brique",
// };

const MH: Record<string, { label: string; color: LRZColor }> = {
    classé: {
        label: "Classé",
        color: "vert-metallise",
    },
    inscrit: {
        label: "Inscrit",
        color: "ocre",
    },
    aucune: {
        label: "Non protégé",
        color: "galet",
    },
};

const UNESCO: Record<string, { label: string; color: LRZColor }> = {
    oui: {
        label: "Val de Loire",
        color: "bleu-metallise",
    },
    non: {
        label: "Hors périmètre",
        color: "galet",
    },
};

const Visite: Record<string, { label: string; color: LRZColor }> = {
    "ouvert au public": {
        label: "Ouvert au public",
        color: "prairie",
    },
    "extérieurs & parc": {
        label: "extérieurs & parc",
        color: "eau",
    },
    "privé, non visitable": {
        label: "Privé, non visitable",
        color: "rouge",
    },
    inconnu: {
        label: "Non renseigné",
        color: "galet",
    },
};

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
};

type ChateauAccordionKey = "history" | "location" | "visit";

function createAccordionState(open: boolean) {
    return {
        history: open,
        location: open,
        visit: open,
    };
}

/**
 * Fiche château illustrée.
 *
 * Le château détouré habite le hero, tandis que les informations sont
 * regroupées par histoire, architecture, localisation et protections.
 */
export default function ChateauCard({ d, t, open }: ChateauCardProps) {
    const [ambiance] = useAmbiance();
    const illustration = getChateauIllustration(d, ambiance);
    const starField = useMemo(() => createStarField(d.slug), [d.slug]);
    const mh = MH[d.protection.monumentHistorique] ?? MH.aucune;
    const visite = Visite[d.visite] ?? Visite.inconnu;
    const unesco = d.protection.unesco ? UNESCO.oui : UNESCO.non;
    const title = parseChateauName(d.nom);
    const [openSections, setOpenSections] = useState(() =>
        createAccordionState(open),
    );
    const [globalOpen, setGlobalOpen] = useState(open);

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
                {featureIsEnabled('chateauxRenommee') &&<div>
                    <LRZBadge
                        preset="renommee-chateau"
                        value={d.renommee}
                        detail={false}
                        variant="shield"
                    />
                </div>}
                <LRZAccordion
                    title="Histoire &amp; architecture"
                    id="histoire"
                    icon={<Castle className="text-sm mr-1" />}
                    open={openSections.history}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("history", nextOpen)
                    }
                    color={color}
                    tone="plain"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                    triggerClassName={styles.accordionTrigger}
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
                                    id: "commanditaire",
                                    label: "Commanditaire",
                                    value: d.commanditaire,
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
                    id="localisation"
                    icon={<MapPin className="text-sm mr-1" />}
                    open={openSections.location}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("location", nextOpen)
                    }
                    color={color}
                    tone="plain"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                    triggerClassName={styles.accordionTrigger}
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
                    id="visite"
                    icon={<Ticket className="text-sm mr-1" />}
                    open={openSections.visit}
                    onOpenChange={(nextOpen) =>
                        setSectionOpen("visit", nextOpen)
                    }
                    color={color}
                    tone="plain"
                    fullWidth
                    headingLevel={4}
                    size="sm"
                    triggerClassName={styles.accordionTrigger}
                >
                    <LRZMetaList
                        className="pb-5"
                        color="ocre"
                        layout="responsive"
                        tone="plain"
                        valueAlign="center"
                        size="sm"
                        items={[
                            {
                                id: "monument-historique",
                                label: "",
                                value: (
                                    <LRZBadge
                                        preset="monument-historique-chateau"
                                        value={d.protection.monumentHistorique}
                                    />
                                ),
                            },
                            {
                                id: "unesco",
                                label: "",
                                value: (
                                    <LRZBadge
                                        preset="unesco-chateau"
                                        value={d.protection.unesco}
                                    />
                                ),
                            },
                            {
                                id: "visite",
                                label: "",
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
            </div>
        </LRZCard>
    );
}
