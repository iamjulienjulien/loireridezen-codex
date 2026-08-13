import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import { ArrowRight, Castle, MapPin, Plus } from "lucide-react";

import { LRZButton } from "@/components/_ui/LRZButton";

import ComponentsNavigation from "@/components/_atelier/ComponentsNavigation";
import LRZButtonPlayground from "./LRZButtonPlayground";
import styles from "../filter-playground.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-button",
);

const VARIANTS = [
    ["primary", "Action principale", "Découvrir un lieu"],
    ["secondary", "Action secondaire", "Voir la carte"],
    ["ghost", "Action discrète", "En savoir plus"],
    ["quiet", "Action contextuelle", "Modifier"],
] as const;

const PRESETS = [
    ["danger", "Action sensible", "Supprimer"],
    ["success", "Confirmation", "Valider"],
    ["warning", "Vigilance", "Revoir"],
    ["info", "Information", "En savoir plus"],
] as const;

export default function LRZButtonPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-button" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZButton</h1>
                    <p className={styles.lede}>
                        La primitive d’action du Codex : un langage visuel
                        commun pour guider, confirmer et déclencher une action.
                    </p>
                </header>

                <section
                    className={styles.section}
                    aria-labelledby="button-overview"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Variantes</p>
                        <h2 id="button-overview">
                            Chaque action trouve son accent
                        </h2>
                        <p>
                            La couleur personnalise l’accent tout en conservant
                            une hiérarchie et des états cohérents.
                        </p>
                    </div>
                    <div className={styles.grid}>
                        {VARIANTS.map(([variant, title, label]) => (
                            <article className={styles.example} key={variant}>
                                <h3 className={styles.exampleTitle}>{title}</h3>
                                <p className={styles.exampleDescription}>
                                    variant=&quot;{variant}&quot;
                                </p>
                                <LRZButton variant={variant}>{label}</LRZButton>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="button-presets"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Presets sémantiques</p>
                        <h2 id="button-presets">
                            L’intention choisit la couleur
                        </h2>
                        <p>
                            Le preset applique une couleur LRZ par défaut sans
                            multiplier les variantes visuelles.
                        </p>
                    </div>
                    <div className={styles.grid}>
                        {PRESETS.map(([preset, title, label]) => (
                            <article className={styles.example} key={preset}>
                                <h3 className={styles.exampleTitle}>{title}</h3>
                                <p className={styles.exampleDescription}>
                                    preset=&quot;{preset}&quot;
                                </p>
                                <LRZButton preset={preset}>{label}</LRZButton>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="button-states"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>États et composition</p>
                        <h2 id="button-states">Du CTA à l’icône seule</h2>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.row}>
                            <LRZButton size="sm" leadingIcon={<MapPin />}>
                                Petit format
                            </LRZButton>
                            <LRZButton size="lg" trailingIcon={<ArrowRight />}>
                                Grand format
                            </LRZButton>
                            <LRZButton
                                size="icon"
                                aria-label="Ajouter un lieu"
                                leadingIcon={<Plus />}
                            >
                                Ajouter
                            </LRZButton>
                            <LRZButton loading>Chargement</LRZButton>
                            <LRZButton disabled>Indisponible</LRZButton>
                        </div>
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="button-example"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Composition</p>
                        <h2 id="button-example">Un exemple éditorial</h2>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.row}>
                            <LRZButton color="tuffeau" leadingIcon={<Castle />}>
                                Découvrir Chambord
                            </LRZButton>
                            <LRZButton
                                variant="ghost"
                                color="eau"
                                leadingIcon={<MapPin />}
                            >
                                Voir sur la carte
                            </LRZButton>
                        </div>
                    </div>
                </section>

                <LRZButtonPlayground />
            </div>
        </>
    );
}
