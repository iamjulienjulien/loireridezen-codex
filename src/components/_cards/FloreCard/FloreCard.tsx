import type { CSSProperties } from "react";
import Image from "next/image";
import { Flower2, Leaf, ShieldCheck } from "lucide-react";

import { TrackedCardLink } from "@/components/_layout/AnalyticsTracking";
import LRZAccordion from "@/components/_ui/LRZAccordion";
import LRZAnecdote from "@/components/_ui/LRZAnecdote";
import LRZBadge from "@/components/_ui/LRZBadge";
import LRZMetaList from "@/components/_ui/LRZMetaList";
import { LRZStamp } from "@/components/_ui/LRZStamp";
import { LRZTextClamp } from "@/components/_ui/LRZTextClamp";
import { getLRZColorValue } from "@/registry/colors";
import { getFloreCategorieMeta } from "@/registry/Meta/flore-categorie";
import type { Flore } from "@/types/flore";

import styles from "./flore.module.css";

export type FloreCardProps = {
    d: Flore;
    expandAll?: boolean;
};

/**
 * Carte principale de l’index Flore.
 *
 * Elle partage la hiérarchie de FauneCard tout en conservant le vocabulaire
 * botanique : observation, classification, indigénat et protection.
 */
export default function FloreCard({ d, expandAll = false }: FloreCardProps) {
    const categoryColor =
        getFloreCategorieMeta(d.categorie)?.color ?? "vert-olive";
    const accent = getLRZColorValue(categoryColor);

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV2} ${d.rarete === "trésor" ? styles.tresor : ""}`}
            style={{ "--cat-accent": accent } as CSSProperties}
            data-categorie={d.categorie}
        >
            <div className={styles.fHead}>
                <span
                    className={`${styles.fEmoji} ${d.customEmoji ? styles.fEmojiCustomV2 : styles.fEmojiBadgeV2}`}
                    aria-hidden
                >
                    {d.customEmoji ? (
                        <Image
                            className={styles.fEmojiImg}
                            src={d.customEmoji}
                            alt=""
                            width={68}
                            height={61}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>
                <div className={styles.fIdentity}>
                    <LRZTextClamp
                        as="h3"
                        className={styles.fNameClamp}
                        lines={1}
                        fixedHeight
                    >
                        <TrackedCardLink
                            entrySlug={d.slug}
                            href={`/flore/${d.slug}`}
                            className={styles.fNameLink}
                        >
                            {d.nomCommun}
                        </TrackedCardLink>
                    </LRZTextClamp>
                    <div className={styles.fSci}>{d.nomScientifique}</div>
                    <p className={styles.fSub}>{d.sousTitre}</p>
                </div>
            </div>

            <div className={styles.wave} aria-hidden />

            <div className={styles.fEyebrow}>
                <LRZStamp
                    collection="flore"
                    meta="categorie"
                    slug={d.categorie}
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
                    collection="flore"
                    meta="rarete"
                    slug={d.rarete}
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
                id={`flore-${d.slug}-observation`}
                title="Observation"
                description="Milieu et période de floraison"
                icon={<Flower2 className={styles.accordionIcon} />}
                color={categoryColor}
                tone="surface"
                size="sm"
                fullWidth
                headingLevel={4}
                defaultOpen={expandAll}
                unmountOnClose
                className={styles.botanyAccordion}
            >
                <LRZMetaList
                    color={categoryColor}
                    layout="responsive"
                    items={[
                        {
                            id: "milieu",
                            label: "Milieu",
                            value: d.milieu,
                        },
                        {
                            id: "floraison",
                            label: "Floraison",
                            value: d.floraison,
                        },
                    ]}
                />
                {d.anecdote ? (
                    <LRZAnecdote
                        className={styles.cardAnecdote}
                        color={categoryColor}
                    >
                        {d.anecdote}
                    </LRZAnecdote>
                ) : null}
            </LRZAccordion>

            <LRZAccordion
                id={`flore-${d.slug}-botanique`}
                title="Botanique"
                description="Taille, famille et classification"
                icon={<Leaf className={styles.accordionIcon} />}
                color={categoryColor}
                tone="surface"
                size="sm"
                fullWidth
                headingLevel={4}
                defaultOpen={expandAll}
                unmountOnClose
                className={styles.botanyAccordion}
            >
                <LRZMetaList
                    color={categoryColor}
                    layout="responsive"
                    hideEmpty
                    items={[
                        {
                            id: "taille",
                            label: "Taille",
                            value: d.taille,
                        },
                        {
                            id: "regne",
                            label: "Règne",
                            value: d.regne,
                        },
                        {
                            id: "famille",
                            label: "Famille",
                            value: d.famille,
                        },
                        {
                            id: "usages",
                            label: "Usages",
                            value: d.usages,
                        },
                        {
                            id: "autres-noms",
                            label: "Autres noms",
                            value: d.autresNoms.join(" · "),
                        },
                        {
                            id: "rang-taxinomique",
                            label: "Rang taxinomique",
                            value: (
                                <span className={styles.rang}>
                                    {d.rangTaxinomique}
                                </span>
                            ),
                        },
                    ]}
                />
            </LRZAccordion>

            <LRZAccordion
                id={`flore-${d.slug}-protection`}
                title="Protection"
                description="Indigénat, protection et statut"
                icon={<ShieldCheck className={styles.accordionIcon} />}
                color={categoryColor}
                tone="surface"
                size="sm"
                fullWidth
                headingLevel={4}
                defaultOpen={expandAll}
                unmountOnClose
            >
                <LRZMetaList
                    color={categoryColor}
                    layout="responsive"
                    tone="plain"
                    size="sm"
                    items={[
                        {
                            id: "indigenat",
                            label: "Indigénat",
                            value: (
                                <LRZBadge
                                    preset="indigenat-flore"
                                    value={d.statut.indigenat}
                                />
                            ),
                        },
                        {
                            id: "protection",
                            label: "Protection",
                            value: (
                                <LRZBadge
                                    preset="protection-flore"
                                    value={d.statut.protection}
                                />
                            ),
                        },
                    ]}
                />
                {d.statut.note ? (
                    <div className={styles.protectionNote}>
                        <LRZAnecdote color={categoryColor}>
                            {d.statut.note}
                        </LRZAnecdote>
                    </div>
                ) : null}
            </LRZAccordion>
        </article>
    );
}
