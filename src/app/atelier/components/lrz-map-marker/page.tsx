import Link from "next/link";

import { LRZMapMarker } from "@/components/LRZMapMarker";
import { getAtelierPageMetadata } from "@/lib/atelier-metadata";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import styles from "../filter-playground.module.css";
import LRZMapMarkerPlayground from "./LRZMapMarkerPlayground";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-map-marker",
);

const EXAMPLES = [
    {
        label: "Château de Chambord",
        variant: "pin" as const,
        color: "bleu" as const,
    },
    {
        label: "Halte festive",
        variant: "square" as const,
        color: "brique" as const,
        symbol: "♫",
    },
    {
        label: "18 lieux",
        variant: "badge" as const,
        color: "eau" as const,
        symbol: "⌖",
    },
    {
        label: "Repère discret",
        variant: "dot" as const,
        color: "prairie" as const,
    },
    {
        label: "Lieu remarquable",
        variant: "diamond" as const,
        color: "ocre" as const,
        symbol: "✦",
    },
    {
        label: "Point d’intérêt",
        variant: "hexagon" as const,
        color: "eau" as const,
        symbol: "⌂",
    },
    {
        label: "Chapitre",
        variant: "shield" as const,
        color: "brique" as const,
        symbol: "✦",
    },
    {
        label: "Lieu singulier",
        variant: "star" as const,
        color: "ocre" as const,
        symbol: "✦",
    },
    {
        label: "Vue du domaine",
        variant: "image" as const,
        color: "prairie" as const,
        media: (
            <img
                src="/illustrations/chateaux/chateau-de-chambord/jour@2x.png"
                alt=""
            />
        ),
    },
];

const TONE_EXAMPLES = ["solid", "soft", "outline"] as const;

const SHAPE_EXAMPLES = [
    { variant: "pin", color: "bleu", symbol: "⌖" },
    { variant: "square", color: "brique", symbol: "♫" },
    { variant: "diamond", color: "ocre", symbol: "✦" },
    { variant: "shield", color: "prairie", symbol: "⌂" },
    { variant: "star", color: "eau", symbol: "✦" },
] as const;

const SIZE_EXAMPLES = ["xs", "sm", "md", "lg", "xl"] as const;

const STATE_EXAMPLES = [
    { label: "Par défaut", variant: "pin" as const },
    { label: "Actif", variant: "square" as const, active: true },
    { label: "Sélectionné", variant: "diamond" as const, selected: true },
    { label: "Signalé", variant: "star" as const, pulse: true },
    { label: "Regroupement", variant: "badge" as const, badge: "12" },
] as const;

export default function LRZMapMarkerPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-map-marker" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZMapMarker</h1>
                    <p className={styles.lede}>
                        Le marqueur commun des cartes LRZ : un même composant
                        pour les lieux, les regroupements, les repères actifs et
                        les états de sélection.
                    </p>
                </header>

                <section className={styles.section} aria-labelledby="variants">
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="variants">
                            Des silhouettes pour lire la carte
                        </h2>
                        <p>
                            Pins, losanges, hexagones et écussons rendent les
                            catégories lisibles d’un coup d’œil. Le marqueur
                            média donne, lui, une place aux images de terrain.
                        </p>
                    </div>
                    <div className={styles.previewDark}>
                        <div className={styles.row}>
                            {EXAMPLES.map((example) => (
                                <LRZMapMarker
                                    key={example.label}
                                    {...example}
                                    size="lg"
                                    showLabel={example.variant === "badge"}
                                    interactive={false}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="visual-matrix"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Matrice visuelle</p>
                        <h2 id="visual-matrix">Surfaces, échelles et états</h2>
                        <p>
                            Ces séries permettent de contrôler la cohérence des
                            silhouettes lorsqu’elles changent de traitement, de
                            taille ou d’état sur la carte.
                        </p>
                    </div>

                    <div className={styles.stack}>
                        {TONE_EXAMPLES.map((tone) => (
                            <div className={styles.previewDark} key={tone}>
                                <p className={styles.previewLabel}>
                                    Surface · {tone}
                                </p>
                                <div className={styles.row}>
                                    {SHAPE_EXAMPLES.map((example) => (
                                        <LRZMapMarker
                                            key={`${tone}-${example.variant}`}
                                            {...example}
                                            label={`${example.variant} ${tone}`}
                                            tone={tone}
                                            size="lg"
                                            interactive={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className={styles.previewDark}>
                            <p className={styles.previewLabel}>
                                Échelle · xs à xl
                            </p>
                            <div className={styles.row}>
                                {SIZE_EXAMPLES.map((size) => (
                                    <LRZMapMarker
                                        key={size}
                                        label={`Taille ${size}`}
                                        variant="pin"
                                        tone="soft"
                                        size={size}
                                        color="bleu"
                                        symbol="⌖"
                                        interactive={false}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.previewDark}>
                            <p className={styles.previewLabel}>
                                États et informations
                            </p>
                            <div className={styles.row}>
                                {STATE_EXAMPLES.map((example) => (
                                    <LRZMapMarker
                                        key={example.label}
                                        {...example}
                                        tone="soft"
                                        size="lg"
                                        color="ocre"
                                        symbol="✦"
                                        interactive={false}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <LRZMapMarkerPlayground />
            </div>
        </>
    );
}
