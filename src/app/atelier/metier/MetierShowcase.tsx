"use client";

import { useState } from "react";

import ChateauxCard from "@/components/_cards/ChateauxCard";
import FauneCard from "@/components/_cards/FauneCard";
import FloreCard from "@/components/_cards/FloreCard";
import GuinguetteCard from "@/components/_cards/GuinguetteCard";
import PatrimoineCard from "@/components/_cards/PatrimoineCard";
import PersonnageCard from "@/components/_cards/PersonnageCard";
import TerritoireCard from "@/components/_cards/TerritoireCard";
import VignoblesCard from "@/components/_cards/VignoblesCard";
import VilleVillageCard from "@/components/_cards/VilleVillageCard";
import VocabulaireCard from "@/components/_cards/VocabulaireCard";
import LRZBadge from "@/components/_ui/LRZBadge";
import type { NearbyGuinguettesByChateau } from "@/lib/nearby-guinguettes";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type {
    Personnage,
    PersonnagesParLieu,
    RelationPersonnageLieu,
} from "@/types/personnage";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

import { MOCK_CHATEAU } from "@/mocks/mockChateau";
import { MOCK_FAUNE } from "@/mocks/mockFaune";
import { MOCK_FLORE } from "@/mocks/mockFlore";
import { MOCK_GUINGUETTE } from "@/mocks/mockGuinguette";
import { MOCK_MOT } from "@/mocks/mockMot";
import { MOCK_PATRIMOINE } from "@/mocks/mockPatrimoine";
import type { VilleVillageCatalogueEntry } from "@/types/villeVillageCatalogue";
import styles from "../atelier.module.css";

type PersonnageExample = {
    personnage: Personnage;
    relations: RelationPersonnageLieu[];
};

type TerritoireExample = {
    territoire: TerritoireCatalogueEntry;
    chateaux: readonly Chateau[];
    guinguettes: readonly Guinguette[];
};

const noop = () => undefined;

export default function MetierShowcase({
    personnageExamples,
    personnagesByChateau,
    nearbyGuinguettesByChateau,
    territoireExamples,
    vignobleExamples,
    villeVillageExamples,
}: {
    personnageExamples: readonly PersonnageExample[];
    personnagesByChateau: PersonnagesParLieu;
    nearbyGuinguettesByChateau: NearbyGuinguettesByChateau;
    territoireExamples: readonly TerritoireExample[];
    vignobleExamples: readonly Vignoble[];
    villeVillageExamples: readonly VilleVillageCatalogueEntry[];
}) {
    const [showNearbyGuinguettes, setShowNearbyGuinguettes] = useState(true);

    return (
        <div className={styles.showcaseStack}>
            <section id="faune-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 01</p>
                    <h2>FauneCard</h2>
                    <span>Les espèces, leurs statuts et leurs traces.</span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_FAUNE.slice(0, 3).map((item) => (
                        <FauneCard key={item.slug} d={item} />
                    ))}
                </div>
            </section>

            <section id="flore-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 02</p>
                    <h2>FloreCard</h2>
                    <span>
                        Les plantes, leurs milieux et leurs protections.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_FLORE.slice(0, 3).map((item) => (
                        <FloreCard key={item.slug} d={item} />
                    ))}
                </div>
            </section>

            <section id="chateaux-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 03</p>
                    <div className={styles.showcaseTitleRow}>
                        <h2>ChateauxCard</h2>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={showNearbyGuinguettes}
                            className={styles.switch}
                            onClick={() =>
                                setShowNearbyGuinguettes((current) => !current)
                            }
                        >
                            <span>Nouveau rendu</span>
                            <span
                                className={styles.switchTrack}
                                aria-hidden="true"
                            >
                                <span className={styles.switchThumb} />
                            </span>
                        </button>
                    </div>
                    <span>
                        Les demeures, les protections et leurs histoires.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_CHATEAU.slice(0, 3).map((item) => (
                        <ChateauxCard
                            key={item.slug}
                            d={item}
                            personnages={personnagesByChateau[item.slug] ?? []}
                            nearbyGuinguettes={
                                showNearbyGuinguettes
                                    ? (nearbyGuinguettesByChateau[item.slug] ??
                                      [])
                                    : undefined
                            }
                        />
                    ))}
                </div>
            </section>

            <section id="guinguette-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 04</p>
                    <h2>GuinguetteCard</h2>
                    <span>
                        Une lecture éditoriale des escales, de leurs ambiances
                        et de leurs informations pratiques.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_GUINGUETTE.map((item) => (
                        <GuinguetteCard key={item.slug} guinguette={item} />
                    ))}
                </div>
            </section>

            <section id="vignobles-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 05</p>
                    <h2>VignoblesCard</h2>
                    <span>
                        Les appellations, leurs robes, leurs terroirs et leurs
                        profils de dégustation.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {vignobleExamples.map((vignoble) => (
                        <VignoblesCard
                            key={vignoble.slug}
                            d={vignoble}
                            open={false}
                            onToggle={noop}
                        />
                    ))}
                </div>
            </section>

            <section id="territoire-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 06</p>
                    <h2>TerritoireCard</h2>
                    <span>
                        Les chapitres géohistoriques, leurs repères et les lieux
                        qui composent le fil ligérien.
                    </span>
                </header>
                <div className={styles.territoireShowcaseGrid}>
                    {territoireExamples.map(
                        ({ territoire, chateaux, guinguettes }) => (
                            <TerritoireCard
                                key={territoire.slug}
                                territoire={territoire}
                                chateaux={chateaux}
                                guinguettes={guinguettes}
                            />
                        ),
                    )}
                </div>
            </section>

            <section id="personnage-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 07</p>
                    <h2>PersonnageCard</h2>
                    <span>
                        Les figures historiques, leurs rôles et leurs liens avec
                        les châteaux.
                    </span>
                </header>
                <div className={styles.personnageShowcaseGrid}>
                    {personnageExamples.map(({ personnage, relations }) => (
                        <PersonnageCard
                            key={personnage.id}
                            personnage={personnage}
                            relations={relations}
                        />
                    ))}
                </div>
            </section>

            <section id="patrimoine-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 08</p>
                    <div className={styles.showcaseTitleRow}>
                        <h2>PatrimoineCard</h2>
                        <LRZBadge
                            label="En développement"
                            variant="pill"
                            color="ocre"
                            dashed
                        />
                    </div>
                    <span>
                        Les ouvrages ligériens, leur état, leurs matériaux et
                        leurs usages.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_PATRIMOINE.slice(0, 3).map((item, index) => (
                        <PatrimoineCard
                            key={item.slug}
                            d={item}
                            numero={index + 1}
                            open={false}
                            onToggle={noop}
                        />
                    ))}
                </div>
            </section>

            <section id="ville-village-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 09</p>
                    <div className={styles.showcaseTitleRow}>
                        <h2>VilleVillageCard</h2>
                        <LRZBadge
                            label="En développement"
                            variant="pill"
                            color="ocre"
                            dashed
                        />
                    </div>
                    <span>
                        Les villes et villages, leurs territoires et leurs
                        relations au fleuve.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {villeVillageExamples.map((item) => (
                        <VilleVillageCard key={item.slug} villeVillage={item} />
                    ))}
                </div>
            </section>

            <section id="vocabulaire-card" className={styles.showcaseSection}>
                <header className={styles.showcaseHeader}>
                    <p>Fiche métier · 10</p>
                    <div className={styles.showcaseTitleRow}>
                        <h2>VocabulaireCard</h2>
                        <LRZBadge
                            label="En développement"
                            variant="pill"
                            color="ocre"
                            dashed
                        />
                    </div>
                    <span>
                        Les mots du fleuve, leurs usages, leurs variantes et
                        leur mémoire.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {MOCK_MOT.slice(0, 3).map((item) => (
                        <VocabulaireCard
                            key={item.slug}
                            d={item}
                            open={false}
                            onToggle={noop}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
