import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Binoculars, ListTree, ShieldCheck } from "lucide-react";
import type { FauneCouleur, FauneEspece, FauneStatut } from "@/types/faune";
import styles from "./faune.module.css";
import LRZAccordion from "@/components/_ui/LRZAccordion/LRZAccordion";
import LRZAnecdote from "@/components/_ui/LRZAnecdote/LRZAnecdote";
import LRZBadge from "@/components/_ui/LRZBadge/LRZBadge";
import LRZMetaList from "@/components/_ui/LRZMetaList";
import { LRZStamp } from "@/components/_ui/LRZStamp";
import { LRZTextClamp } from "@/components/_ui/LRZTextClamp";
import { getFauneTypeMeta } from "@/registry/Meta/faune-type";

/** Couleur d'accent par type (reprend les pastilles de type). */
const TYPE_ACCENT: Record<string, string> = {
    oiseau: "#4f86c6",
    mammifère: "#b06a3a",
    poisson: "#2f9ca0",
    reptile: "#7d9a3f",
    amphibien: "#4fa25c",
    insecte: "#8f6bc2",
};

export const FAUNE_COULEURS: Record<FauneCouleur, string> = {
    argent: "var(--color-argent)",
    beige: "var(--color-beige)",
    blanc: "var(--color-blanc)",
    "blanc gris": "var(--color-blanc-gris)",

    bleu: "var(--color-bleu)",
    "bleu gris": "var(--color-bleu-gris)",
    "bleu métallique": "var(--color-bleu-metallise)",
    "bleu turquoise": "var(--color-bleu-turquoise)",

    brun: "var(--color-brun)",
    "brun foncé": "var(--color-brun-fonce)",
    "brun roux": "var(--color-brun-roux)",

    crème: "var(--color-creme)",
    fauve: "var(--color-fauve)",

    gris: "var(--color-gris)",
    "gris ardoise": "var(--color-gris-ardoise)",
    "gris brun": "var(--color-gris-brun)",

    jaune: "var(--color-jaune)",

    noir: "var(--color-noir)",

    ocre: "var(--color-ocre)",

    orange: "var(--color-orange)",
    "orange cuivré": "var(--color-orange-cuivre)",

    rouge: "var(--color-rouge)",
    roux: "var(--color-roux)",

    vert: "var(--color-vert)",
    "vert métallique": "var(--color-vert-metallise)",
    "vert olive": "var(--color-vert-olive)",
    "vert vif": "var(--color-vert-vif)",
};

function StatusChip({ code }: { code: FauneStatut }) {
    return <LRZBadge preset="extinction-faune" value={code} />;
}

export type FauneCardProps = {
    d: FauneEspece;
    expandAll?: boolean;
};

/**
 * Fiche faune actuellement utilisée.
 *
 * Identité colorée par type, bande d’accent latérale et emoji mis en valeur.
 */
export default function FauneCard({ d, expandAll = false }: FauneCardProps) {
    const accent = TYPE_ACCENT[d.type] ?? "var(--gold)";
    const typeColor = getFauneTypeMeta(d.type)?.color ?? "ocre";

    return (
        <article
            className={`${styles.fiche} ${styles.ficheV2} ${d.rarete === "trésor" ? styles.tresor : ""}`}
            style={{ "--type-accent": accent } as CSSProperties}
            data-type={d.type}
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
                            height={68}
                        />
                    ) : (
                        d.emoji || "•"
                    )}
                </span>
                <div className={styles.fIdentity}>
                    <LRZTextClamp
                        as="h3"
                        className={styles.fName}
                        lines={1}
                        fixedHeight
                    >
                        <Link
                            href={`/faune/${d.slug}`}
                            className={styles.fNameLink}
                        >
                            {d.nomCommun}
                        </Link>
                    </LRZTextClamp>
                    <div className={styles.fSci}>{d.nomScientifique}</div>
                    <p className={styles.fSub}>{d.sousTitre}</p>
                </div>
            </div>
            <div className={styles.wave} aria-hidden />
            <div className={styles.fEyebrow}>
                <LRZStamp
                    collection="faune"
                    meta="type"
                    slug={d.type}
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
                    collection="faune"
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
                id={`faune-${d.slug}-observation`}
                title="Observation"
                description="Milieu et période d’observation"
                icon={<Binoculars className={styles.accordionIcon} />}
                color={typeColor}
                tone="surface"
                size="sm"
                fullWidth
                headingLevel={4}
                defaultOpen={expandAll}
                unmountOnClose
                className={styles.taxonomyAccordion}
            >
                <LRZMetaList
                    color={typeColor}
                    layout="responsive"
                    items={[
                        {
                            id: "milieu",
                            label: "Milieu",
                            value: d.milieu,
                        },
                        {
                            id: "periode",
                            label: "Période",
                            value: d.periode,
                        },
                    ]}
                />
            </LRZAccordion>
            <LRZAccordion
                id={`faune-${d.slug}-taxonomy`}
                title="Taxonomie"
                description="Classe, famille et rang taxinomique"
                icon={<ListTree className={styles.accordionIcon} />}
                color={typeColor}
                tone="surface"
                size="sm"
                fullWidth
                headingLevel={4}
                defaultOpen={expandAll}
                unmountOnClose
                className={styles.taxonomyAccordion}
            >
                <LRZMetaList
                    color={typeColor}
                    layout="responsive"
                    hideEmpty
                    items={[
                        {
                            id: "autres-noms",
                            label: "Autres noms",
                            value: d.autresNoms.join(" · "),
                        },
                        {
                            id: "classe",
                            label: "Classe",
                            value: d.classe,
                        },
                        {
                            id: "famille",
                            label: "Famille",
                            value: d.famille,
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
                id={`faune-${d.slug}-protection`}
                title="Protection"
                description="Statuts UICN et note de conservation"
                icon={<ShieldCheck className={styles.accordionIcon} />}
                color={typeColor}
                tone="surface"
                size="sm"
                fullWidth
                headingLevel={4}
                defaultOpen={expandAll}
                unmountOnClose
            >
                <LRZMetaList
                    color={typeColor}
                    layout="responsive"
                    tone="plain"
                    size="sm"
                    items={[
                        {
                            id: "uicn-monde",
                            label: "UICN Monde",
                            value: <StatusChip code={d.conservation.monde} />,
                        },
                        {
                            id: "liste-rouge-france",
                            label: "Liste rouge France",
                            value: <StatusChip code={d.conservation.france} />,
                        },
                    ]}
                />
                {d.conservation.note ? (
                    <div className={styles.conservationNote}>
                        <LRZAnecdote color={typeColor}>
                            {d.conservation.note}
                        </LRZAnecdote>
                    </div>
                ) : null}
            </LRZAccordion>
        </article>
    );
}
