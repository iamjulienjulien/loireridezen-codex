import { getAtelierPageMetadata } from "@/lib/atelier-metadata";
import Link from "next/link";
import { Grid2X2, Images, List, Map, Table2 } from "lucide-react";

import {
    LRZButtonGroup,
    LRZButtonGroupItem,
} from "@/components/LRZButtonGroup";

import ComponentsNavigation from "../ComponentsNavigation/ComponentsNavigation";
import LRZButtonGroupPlayground from "./LRZButtonGroupPlayground";
import styles from "../filter-playground.module.css";

export const metadata = getAtelierPageMetadata(
    "/atelier/components/lrz-button-group",
);

export default function LRZButtonGroupPage() {
    return (
        <>
            <ComponentsNavigation current="lrz-button-group" />
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <Link className={styles.back} href="/atelier">
                        ← Retour à l’Atelier
                    </Link>
                    <p className={styles.eyebrow}>
                        Loire Ride Zen · Composants UI
                    </p>
                    <h1 className={styles.title}>LRZButtonGroup</h1>
                    <p className={styles.lede}>
                        Un groupe de boutons pour choisir une vue, un mode de
                        lecture ou une organisation sans quitter le contexte.
                    </p>
                </header>

                <section
                    className={styles.section}
                    aria-labelledby="button-group-views"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Vues d’index</p>
                        <h2 id="button-group-views">
                            Une seule sélection, plusieurs lectures
                        </h2>
                        <p>
                            Le bouton actif est annoncé comme une option
                            sélectionnée. Les flèches du clavier permettent de
                            parcourir rapidement le groupe.
                        </p>
                    </div>
                    <div className={styles.preview}>
                        <p className={styles.previewLabel}>Châteaux</p>
                        <LRZButtonGroup
                            defaultValue="territories"
                            ariaLabel="Vue de l’index Châteaux"
                            color="ocre"
                        >
                            <LRZButtonGroupItem
                                value="territories"
                                leadingIcon={<Grid2X2 size={15} />}
                            >
                                Territoires
                            </LRZButtonGroupItem>
                            <LRZButtonGroupItem
                                value="catalogue"
                                leadingIcon={<List size={15} />}
                            >
                                Catalogue
                            </LRZButtonGroupItem>
                            <LRZButtonGroupItem
                                value="table"
                                leadingIcon={<Table2 size={15} />}
                            >
                                Tableau
                            </LRZButtonGroupItem>
                            <LRZButtonGroupItem
                                value="gallery"
                                leadingIcon={<Images size={15} />}
                            >
                                Galerie
                            </LRZButtonGroupItem>
                        </LRZButtonGroup>
                    </div>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="button-group-orientation"
                >
                    <div className={styles.sectionHeader}>
                        <p className={styles.kicker}>Orientations</p>
                        <h2 id="button-group-orientation">
                            Horizontal dans les contrôles, vertical dans les
                            panneaux
                        </h2>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.row}>
                            <LRZButtonGroup
                                defaultValue="map"
                                ariaLabel="Mode d’exploration"
                                color="eau"
                            >
                                <LRZButtonGroupItem
                                    value="map"
                                    leadingIcon={<Map size={15} />}
                                >
                                    Carte
                                </LRZButtonGroupItem>
                                <LRZButtonGroupItem value="list">
                                    Liste
                                </LRZButtonGroupItem>
                            </LRZButtonGroup>

                            <LRZButtonGroup
                                defaultValue="overview"
                                ariaLabel="Filtre de contenu"
                                orientation="vertical"
                                color="miel"
                            >
                                <LRZButtonGroupItem value="overview">
                                    Vue d’ensemble
                                </LRZButtonGroupItem>
                                <LRZButtonGroupItem value="details">
                                    Détails
                                </LRZButtonGroupItem>
                            </LRZButtonGroup>
                        </div>
                    </div>
                </section>

                <LRZButtonGroupPlayground />
            </div>
        </>
    );
}
