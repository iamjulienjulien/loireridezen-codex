"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

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
import { LRZAccordion } from "@/components/_ui/LRZAccordion";
import { LRZStamp } from "@/components/_ui/LRZStamp";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { buildCardHrefWithReturn } from "@/lib/card-return-context";
import type { NearbyGuinguette } from "@/lib/nearby-guinguettes";
import type { VignobleTerritoireView } from "@/lib/vignobles-territoires";
import type { TerritoireSlug } from "@/registry/territoires";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";
import type {
    Personnage,
    PersonnagesParLieu,
    RelationPersonnageLieu,
} from "@/types/personnage";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

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

export type ChateauShowcaseExample = {
    label: string;
    detail: string;
    chateau: Chateau;
    nearbyGuinguettes: readonly NearbyGuinguette[];
};

export type VineyardTerritoriesShowcaseExample = {
    label: string;
    detail: string;
    vignoble: Vignoble;
    territoires: readonly VignobleTerritoireView[];
};

export type TerritoryVineyardsShowcaseExample = {
    label: string;
    detail: string;
    territoire: TerritoireCatalogueEntry;
    vignobles: readonly Vignoble[];
};

const noop = () => undefined;

export default function MetierShowcase({
    chateauExamples,
    followTheThreadEnabled,
    personnageExamples,
    personnagesByChateau,
    territoireExamples,
    vignobleExamples,
    vineyardTerritoriesExamples,
    territoryVineyardsExamples,
    villeVillageExamples,
}: {
    chateauExamples: readonly ChateauShowcaseExample[];
    followTheThreadEnabled: boolean;
    personnageExamples: readonly PersonnageExample[];
    personnagesByChateau: PersonnagesParLieu;
    territoireExamples: readonly TerritoireExample[];
    vignobleExamples: readonly Vignoble[];
    vineyardTerritoriesExamples: readonly VineyardTerritoriesShowcaseExample[];
    territoryVineyardsExamples: readonly TerritoryVineyardsShowcaseExample[];
    villeVillageExamples: readonly VilleVillageCatalogueEntry[];
}) {
    const [showNearbyGuinguettes, setShowNearbyGuinguettes] = useState(
        followTheThreadEnabled,
    );
    const [showVineyardTerritories, setShowVineyardTerritories] = useState(
        followTheThreadEnabled,
    );
    const visibleChateauExamples = followTheThreadEnabled
        ? chateauExamples
        : chateauExamples.slice(0, 3);

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
                        {followTheThreadEnabled ? (
                            <button
                                type="button"
                                role="switch"
                                aria-checked={showNearbyGuinguettes}
                                className={styles.switch}
                                onClick={() =>
                                    setShowNearbyGuinguettes(
                                        (current) => !current,
                                    )
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
                        ) : null}
                    </div>
                    <span>
                        Les demeures, les protections et leurs histoires.
                    </span>
                </header>
                <div className={styles.showcaseGrid}>
                    {visibleChateauExamples.map(
                        ({ label, detail, chateau, nearbyGuinguettes }) => (
                            <article
                                key={label}
                                className={styles.showcaseScenario}
                            >
                                {followTheThreadEnabled ? (
                                    <header
                                        className={
                                            styles.showcaseScenarioHeader
                                        }
                                    >
                                        <LRZBadge
                                            label={label}
                                            variant="pill"
                                            color="brique"
                                            dashed
                                        />
                                        <span>{detail}</span>
                                    </header>
                                ) : null}
                                <ChateauxCard
                                    d={chateau}
                                    personnages={
                                        personnagesByChateau[chateau.slug] ?? []
                                    }
                                    nearbyGuinguettes={
                                        followTheThreadEnabled &&
                                        showNearbyGuinguettes
                                            ? nearbyGuinguettes
                                            : undefined
                                    }
                                />
                            </article>
                        ),
                    )}
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

            {followTheThreadEnabled ? (
                <section
                    id="vignobles-territoires-prototype"
                    className={styles.showcaseSection}
                >
                    <header className={styles.showcaseHeader}>
                        <p>Prototype V1.2 · Suivre le fil</p>
                        <div className={styles.showcaseTitleRow}>
                            <h2>Vignobles ↔ Territoires</h2>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={showVineyardTerritories}
                                className={styles.switch}
                                onClick={() =>
                                    setShowVineyardTerritories(
                                        (current) => !current,
                                    )
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
                            Six états pour régler la grammaire commune des
                            cartes et des en-têtes territoriaux.
                        </span>
                    </header>

                    {showVineyardTerritories ? (
                        <div className={styles.relationPrototypeStack}>
                            <PrototypeGroup
                                eyebrow="VignoblesCard"
                                title="Territoires du vin"
                                description="Des stamps compacts intégrés à la géographie de l’appellation."
                            >
                                <div className={styles.relationScenarioGrid}>
                                    {vineyardTerritoriesExamples.map(
                                        (example) => (
                                            <RelationScenario
                                                key={example.label}
                                                label={example.label}
                                                detail={example.detail}
                                            >
                                                <VineyardTerritoriesPrototype
                                                    example={example}
                                                />
                                            </RelationScenario>
                                        ),
                                    )}
                                </div>
                            </PrototypeGroup>

                            <PrototypeGroup
                                eyebrow="TerritoireCard"
                                title="Vignobles du territoire"
                                description="Trois lignes visibles, puis un accordéon lorsque le territoire devient dense."
                            >
                                <div className={styles.relationScenarioGrid}>
                                    {territoryVineyardsExamples.map(
                                        (example) => (
                                            <RelationScenario
                                                key={example.label}
                                                label={example.label}
                                                detail={example.detail}
                                            >
                                                <TerritoryVineyardsPrototype
                                                    example={example}
                                                />
                                            </RelationScenario>
                                        ),
                                    )}
                                </div>
                            </PrototypeGroup>

                            <PrototypeGroup
                                eyebrow="Headers territoriaux"
                                title="Un aperçu, pas un second inventaire"
                                description="Zéro, trois ou plus de trois appellations dans une ligne secondaire compacte."
                            >
                                <div className={styles.territoryHeaderStack}>
                                    {territoryVineyardsExamples.map(
                                        (example) => (
                                            <TerritoryHeaderPrototype
                                                key={example.label}
                                                example={example}
                                            />
                                        ),
                                    )}
                                </div>
                            </PrototypeGroup>
                        </div>
                    ) : (
                        <div className={styles.prototypeDisabled}>
                            Rendu V1.1 conservé : aucune relation viticole
                            ajoutée aux cartes ou aux headers.
                        </div>
                    )}
                </section>
            ) : null}

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

function PrototypeGroup({
    eyebrow,
    title,
    description,
    children,
}: {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className={styles.prototypeGroup}>
            <header className={styles.prototypeGroupHeader}>
                <p>{eyebrow}</p>
                <h3>{title}</h3>
                <span>{description}</span>
            </header>
            {children}
        </section>
    );
}

function RelationScenario({
    label,
    detail,
    children,
}: {
    label: string;
    detail: string;
    children: ReactNode;
}) {
    return (
        <article className={styles.relationScenario}>
            <header className={styles.showcaseScenarioHeader}>
                <LRZBadge label={label} variant="pill" color="miel" dashed />
                <span>{detail}</span>
            </header>
            {children}
        </article>
    );
}

function VineyardTerritoriesPrototype({
    example,
}: {
    example: VineyardTerritoriesShowcaseExample;
}) {
    return (
        <div className={styles.prototypeCard}>
            <div className={styles.prototypeCardHeading}>
                <span>Géographie du vin</span>
                <strong>{example.vignoble.nom}</strong>
            </div>
            <div className={styles.prototypeRelationBlock}>
                <p>Territoires du vin</p>
                <div className={styles.territoryStampList}>
                    {example.territoires.map(({ territoire, principal }) => (
                        <Link
                            key={territoire.slug}
                            href={buildCardHrefWithReturn(
                                `/territoire/${territoire.slug}`,
                                `/vignoble/${example.vignoble.slug}`,
                            )}
                            className={styles.stampLink}
                        >
                            <LRZStamp
                                collection="common"
                                meta="territoire"
                                slug={territoire.slug as TerritoireSlug}
                                variant="badge"
                                tone={principal ? "subtle" : "ghost"}
                                size="sm"
                                font="display"
                                labelSize="sm"
                                padding="xs"
                                gap="xs"
                                symbolFrame={principal ? "subtle" : "none"}
                                gradient={principal}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TerritoryVineyardsPrototype({
    example,
}: {
    example: TerritoryVineyardsShowcaseExample;
}) {
    const visible = example.vignobles.slice(0, 3);
    const remaining = example.vignobles.slice(3);

    if (example.vignobles.length === 0) {
        return (
            <div
                className={styles.prototypeEmptyState}
                data-relation-block="absent"
            >
                <span>Diagnostic Atelier</span>
                <strong>Aucun bloc rendu dans la carte</strong>
            </div>
        );
    }

    return (
        <div className={styles.prototypeCard}>
            <div className={styles.prototypeCardHeading}>
                <span>Vignobles du territoire</span>
                <strong>{example.territoire.nom}</strong>
            </div>
            <VineyardRows vignobles={visible} territoire={example.territoire} />
            {remaining.length > 0 ? (
                <LRZAccordion
                    id={`prototype-${example.territoire.slug}-vignobles`}
                    className={styles.prototypeAccordion}
                    title={`Voir ${remaining.length} autres vignobles`}
                    description="Liste complète du territoire"
                    color={example.territoire.identite.color}
                    tone="plain"
                    size="sm"
                    fullWidth
                    headingLevel={4}
                >
                    <VineyardRows
                        vignobles={remaining}
                        territoire={example.territoire}
                    />
                </LRZAccordion>
            ) : null}
        </div>
    );
}

function VineyardRows({
    vignobles,
    territoire,
}: {
    vignobles: readonly Vignoble[];
    territoire: TerritoireCatalogueEntry;
}) {
    return (
        <ul className={styles.vineyardRows}>
            {vignobles.map((vignoble) => (
                <li key={vignoble.slug}>
                    <Link
                        href={buildCardHrefWithReturn(
                            `/vignoble/${vignoble.slug}`,
                            `/territoire/${territoire.slug}`,
                        )}
                    >
                        <LRZSymbol
                            collection="vignoble"
                            meta="couleur"
                            slug={vignoble.couleur}
                            size={34}
                            frame="subtle"
                            decorative
                        />
                        <span>
                            <strong>{vignoble.nom}</strong>
                            <small>{vignoble.appellation.niveau}</small>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function TerritoryHeaderPrototype({
    example,
}: {
    example: TerritoryVineyardsShowcaseExample;
}) {
    const visible = example.vignobles.slice(0, 3);
    const remaining = example.vignobles.length - visible.length;

    return (
        <article className={styles.territoryHeaderPrototype}>
            <div>
                <span>{example.label}</span>
                <h4>{example.territoire.nom}</h4>
                <p>{example.territoire.sousTitre}</p>
            </div>
            {visible.length > 0 ? (
                <div className={styles.headerVineyards}>
                    <span>Vignobles du territoire</span>
                    <div>
                        {visible.map((vignoble) => (
                            <Link
                                key={vignoble.slug}
                                href={`/vignoble/${vignoble.slug}`}
                                className={styles.stampLink}
                            >
                                <LRZStamp
                                    collection="vignoble"
                                    meta="couleur"
                                    slug={vignoble.couleur}
                                    label={vignoble.nom}
                                    variant="badge"
                                    tone="ghost"
                                    size="xs"
                                    font="display"
                                    labelSize="xs"
                                    padding="xs"
                                    gap="xs"
                                    gradient={false}
                                />
                            </Link>
                        ))}
                        {remaining > 0 ? (
                            <Link
                                href={`/territoire/${example.territoire.slug}`}
                                className={styles.moreVineyardsLink}
                            >
                                Voir les {example.vignobles.length} vignobles
                            </Link>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </article>
    );
}
