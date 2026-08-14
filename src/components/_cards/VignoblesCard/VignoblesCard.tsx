import { Grape, Info, MapPin, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { TrackedCardLink } from "@/components/_layout/AnalyticsTracking";
import LRZCard from "@/components/_ui/LRZCard";
import { LRZStamp } from "@/components/_ui/LRZStamp";
import type { Vignoble } from "@/types/vignoble";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { LRZTextClamp } from "@/components/_ui/LRZTextClamp";
import { LRZTooltip } from "@/components/_ui/LRZTooltip";
import { getVignobleCouleurMeta } from "@/registry/Meta/vignoble-couleur";
import { buildCardHrefWithReturn } from "@/lib/card-return-context";
import type { VignobleTerritoireView } from "@/lib/vignobles-territoires";
import type { TerritoireSlug } from "@/registry/territoires";

import styles from "./vignobles.module.css";

export type VignoblesCardProps = {
    d: Vignoble;
    open: boolean;
    onToggle: () => void;
    territoires?: readonly VignobleTerritoireView[];
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

export default function VignoblesCard({ d, territoires }: VignoblesCardProps) {
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
            className={styles.card}
        >
            <div className={styles.content}>
                <header className={styles.identity}>
                    <div className={styles.identityCopy}>
                        <div className={styles.eyebrow}>
                            <span className={styles.robeLabel}>
                                {colorMeta?.label ?? d.couleur}
                            </span>
                        </div>
                        <TrackedCardLink
                            entrySlug={d.slug}
                            className={styles.nameLink}
                            href={`/vignoble/${d.slug}`}
                        >
                            <h3 className={styles.name} id={titleId}>
                                <span>{title.name}</span>
                                {title.qualifier ? (
                                    <span className={styles.titleQualifier}>
                                        {title.qualifier}
                                    </span>
                                ) : null}
                            </h3>
                        </TrackedCardLink>
                        <p className={styles.subtitle}>{d.sousTitre}</p>
                    </div>

                    <div className={styles.robeBackdrop} aria-hidden>
                        <LRZSymbol
                            className={styles.robeBackdropSymbol}
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
                    className={styles.appellationCard}
                    aria-label="Appellation"
                >
                    <LRZStamp
                        className={styles.appellationStamp}
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

                <div className={styles.wave} aria-hidden />

                <section
                    className={styles.winePortrait}
                    aria-labelledby={`${titleId}-portrait`}
                >
                    <div className={styles.portraitHeading}>
                        <span className={styles.portraitIcon} aria-hidden>
                            <Grape />
                        </span>
                        <div>
                            <p className={styles.portraitEyebrow}>
                                Portrait du vin
                            </p>
                            <LRZTextClamp
                                as="h4"
                                className={styles.portraitTitle}
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

                    <div className={styles.symbolBoard}>
                        <div className={styles.symbolRow}>
                            <p className={styles.symbolLabel}>Cépages</p>
                            <div
                                className={styles.metaSymbols}
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

                        <div className={styles.symbolRow}>
                            <p className={styles.symbolLabel}>Terroirs</p>
                            <div
                                className={styles.metaSymbols}
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
                        <div className={styles.pairing}>
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
                    className={styles.geographyCard}
                    aria-labelledby={`${titleId}-geography`}
                >
                    <div className={styles.geographyHeading}>
                        <span className={styles.portraitIcon} aria-hidden>
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
                                    className={styles.geographyInfo}
                                    type="button"
                                    aria-label={`En savoir plus sur la géographie de ${d.nom}`}
                                >
                                    <Info aria-hidden />
                                </button>
                            </LRZTooltip>
                        ) : null}
                    </div>

                    <dl className={styles.geographyFacts}>
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

                    {territoires && territoires.length > 0 ? (
                        <div className={styles.territoryRelations}>
                            <p>Territoires du vin</p>
                            <div className={styles.territoryStampList}>
                                {territoires.map(
                                    ({ territoire, principal }) => (
                                        <Link
                                            key={territoire.slug}
                                            href={buildCardHrefWithReturn(
                                                `/territoire/${territoire.slug}`,
                                                `/vignoble/${d.slug}`,
                                            )}
                                            className={
                                                styles.territoryStampLink
                                            }
                                            data-primary-territory={
                                                principal ? "true" : undefined
                                            }
                                            aria-label={`${territoire.nom}${
                                                principal
                                                    ? ", territoire principal"
                                                    : ""
                                            }`}
                                        >
                                            <LRZStamp
                                                collection="common"
                                                meta="territoire"
                                                slug={
                                                    territoire.slug as TerritoireSlug
                                                }
                                                variant="badge"
                                                tone={
                                                    principal
                                                        ? "subtle"
                                                        : "ghost"
                                                }
                                                size="sm"
                                                font="display"
                                                labelSize="sm"
                                                padding="xs"
                                                gap="xs"
                                                symbolFrame={
                                                    principal
                                                        ? "subtle"
                                                        : "none"
                                                }
                                                gradient={principal}
                                            />
                                        </Link>
                                    ),
                                )}
                            </div>
                        </div>
                    ) : null}
                </section>
            </div>
        </LRZCard>
    );
}
