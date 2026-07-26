"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import FauneCard from "../faune/FauneCard";
import FloreCard from "../flore/FloreCard";
import ChateauxCard from "../chateaux/ChateauxCard";
import ChateauxCardOld from "../chateaux/ChateauxCardOld";
import VignoblesCard from "../vignobles/VignoblesCard";
import VocabulaireCard from "../vocabulaire/VocabulaireCard";
import PatrimoineCard from "../patrimoine/PatrimoineCard";
import { MOCK_FAUNE } from "./mockFaune";
import { MOCK_FLORE } from "./mockFlore";
import { MOCK_CHATEAU } from "./mockChateau";
import { MOCK_VIGNOBLE } from "./mockVignoble";
import { MOCK_MOT } from "./mockMot";
import { MOCK_PATRIMOINE } from "./mockPatrimoine";
import TableOfContents, { type TocItem } from "./TableOfContents";
import styles from "./atelier.module.css";
import type { IndexEntry } from "@/registry/indexes";
import FauneCardOld from "../faune/FauneCardOld";
import FloreCardOld from "../flore/FloreCardOld";

const TOC_ITEMS: TocItem[] = [
    { id: "faune", label: "FauneCard" },
    { id: "flore", label: "FloreCard" },
    { id: "chateaux", label: "ChateauxCard" },
    { id: "vignobles", label: "VignoblesCard" },
    { id: "vocabulaire", label: "VocabulaireCard" },
    { id: "patrimoine", label: "PatrimoineCard" },
];

type SectionProps<T, V extends number> = {
    id: string;
    title: string;
    desc: string;
    items: T[];
    keyOf: (d: T) => string;
    versions: readonly V[];
    defaultVersion?: V;
    note: (v: V) => string;
    render: (
        d: T,
        v: V,
        key: string,
        isOpen: boolean,
        onToggle: () => void,
    ) => ReactNode;
    open: Record<string, boolean>;
    allOpen: Record<string, boolean>;
    onToggle: (key: string) => void;
    onToggleAll: (groupKey: string, cardKeys: string[]) => void;
};

function AtelierSection<T, V extends number>({
    id,
    title,
    desc,
    items,
    keyOf,
    versions,
    defaultVersion,
    note,
    render,
    open,
    allOpen,
    onToggle,
    onToggleAll,
}: SectionProps<T, V>) {
    const [activeVersion, setActiveVersion] = useState<V>(
        defaultVersion ?? versions[0],
    );
    const tabsId = useId();

    const activeGroupKey = `${id}-${activeVersion}`;
    const activeCardKeys = items.map(
        (item) => `${activeGroupKey}-${keyOf(item)}`,
    );

    const selectAdjacentVersion = (currentVersion: V, direction: 1 | -1) => {
        const currentIndex = versions.indexOf(currentVersion);
        const nextIndex =
            (currentIndex + direction + versions.length) % versions.length;

        setActiveVersion(versions[nextIndex]);
    };

    const handleTabKeyDown = (
        event: KeyboardEvent<HTMLButtonElement>,
        version: V,
    ) => {
        switch (event.key) {
            case "ArrowRight":
                event.preventDefault();
                selectAdjacentVersion(version, 1);
                break;

            case "ArrowLeft":
                event.preventDefault();
                selectAdjacentVersion(version, -1);
                break;

            case "Home":
                event.preventDefault();
                setActiveVersion(versions[0]);
                break;

            case "End":
                event.preventDefault();
                setActiveVersion(versions[versions.length - 1]);
                break;
        }
    };

    return (
        <section id={id} className={styles.section}>
            <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <p className={styles.sectionDesc}>{desc}</p>
            </div>

            <div className={styles.tabs}>
                <div
                    className={styles.tabList}
                    role="tablist"
                    aria-label={`Versions de ${title}`}
                >
                    {versions.map((version) => {
                        const isActive = version === activeVersion;
                        const tabId = `${tabsId}-tab-${version}`;
                        const panelId = `${tabsId}-panel-${version}`;

                        return (
                            <button
                                key={version}
                                id={tabId}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={panelId}
                                tabIndex={isActive ? 0 : -1}
                                className={styles.tab}
                                data-active={isActive || undefined}
                                onClick={() => setActiveVersion(version)}
                                onKeyDown={(event) =>
                                    handleTabKeyDown(event, version)
                                }
                            >
                                <span className={styles.tabIndex}>
                                    {String(version).padStart(2, "0")}
                                </span>

                                <span className={styles.tabContent}>
                                    <span className={styles.tabLabel}>
                                        Version {version}
                                    </span>
                                    <span className={styles.tabNote}>
                                        {note(version)}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div
                    id={`${tabsId}-panel-${activeVersion}`}
                    className={styles.tabPanel}
                    role="tabpanel"
                    aria-labelledby={`${tabsId}-tab-${activeVersion}`}
                    tabIndex={0}
                >
                    <div className={styles.variantHead}>
                        <div className={styles.activeVariant}>
                            <span className={styles.variantLabel}>
                                Version {activeVersion}
                            </span>

                            <span className={styles.variantNote}>
                                {note(activeVersion)}
                            </span>
                        </div>

                        <button
                            type="button"
                            className={styles.switch}
                            role="switch"
                            aria-checked={Boolean(allOpen[activeGroupKey])}
                            onClick={() =>
                                onToggleAll(activeGroupKey, activeCardKeys)
                            }
                        >
                            <span
                                className={styles.switchTrack}
                                aria-hidden="true"
                            >
                                <span className={styles.switchThumb} />
                            </span>

                            {allOpen[activeGroupKey]
                                ? "Tout replier"
                                : "Tout déplier"}
                        </button>
                    </div>

                    <div className={styles.grid}>
                        {items.map((item, index) => {
                            const key = activeCardKeys[index];

                            return render(
                                item,
                                activeVersion,
                                key,
                                Boolean(open[key]),
                                () => onToggle(key),
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function AtelierHomePage({
    indexes,
}: {
    indexes: readonly IndexEntry[];
}) {
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const [allOpen, setAllOpen] = useState<Record<string, boolean>>({});

    const indexesList = indexes.map((index) => index.slug);

    const toggle = (key: string) => {
        setOpen((current) => ({
            ...current,
            [key]: !current[key],
        }));
    };

    const toggleAll = (groupKey: string, cardKeys: string[]) => {
        const next = !allOpen[groupKey];

        setAllOpen((current) => ({
            ...current,
            [groupKey]: next,
        }));

        setOpen((current) => {
            const updated = { ...current };

            for (const key of cardKeys) {
                updated[key] = next;
            }

            return updated;
        });
    };

    return (
        <main className={styles.page}>
            <TableOfContents
                items={TOC_ITEMS.filter((item) =>
                    indexesList.includes(item.id),
                )}
            />

            <div className={styles.wrap}>
                <header className={styles.head}>
                    <div className={styles.eyebrow}>Loire Ride Zen · Codex</div>

                    <h1 className={styles.title}>Atelier</h1>

                    <p className={styles.lede}>
                        La collection des esquisses de composants — variantes,
                        états et données de démonstration, au même endroit.
                    </p>

                    <nav
                        className={styles.componentNav}
                        aria-label="Composants UI"
                    >
                        <span className={styles.componentNavLabel}>
                            Composants UI
                        </span>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-badge"
                        >
                            <span>LRZBadge</span>
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-anecdote"
                        >
                            <span>LRZAnecdote</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-accordion"
                        >
                            <span>LRZAccordion</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-separateur"
                        >
                            <span>LRZSeparateur</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-section"
                        >
                            <span>LRZSection</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-card"
                        >
                            <span>LRZCard</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </nav>
                    <nav
                        className={styles.componentNav}
                        aria-label="Composants Doc"
                    >
                        <span className={styles.componentNavLabel}>
                            Composants Doc
                        </span>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-code-block"
                        >
                            <span>LRZDocCodeBlock</span>
                            {/* <small>Bloc de code</small> */}
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-code-inline"
                        >
                            <span>LRZDocCodeInline</span>
                            {/* <small>Extrait de code</small> */}
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-list"
                        >
                            <span>LRZDocList</span>
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            className={styles.componentLink}
                            href="/atelier/components/lrz-doc-quote"
                        >
                            <span>LRZDocQuote</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </nav>
                </header>

                {indexesList.includes("faune") && (
                    <AtelierSection
                        id="faune"
                        title="FauneCard"
                        desc={`Carte d'espèce de l'index Faune — ${MOCK_FAUNE.length} animaux de démonstration (2 par type, tirés du catalogue).`}
                        items={MOCK_FAUNE}
                        keyOf={(d) => d.nomScientifique}
                        versions={[1, 2, 3] as const}
                        defaultVersion={2}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "identité colorée par type + emoji custom agrandi"
                                  : "fiche naturaliste complète : hero, stats, tags, anecdote"
                        }
                        render={(d, v, key, isOpen, onToggle) =>
                            v === 2 ? (
                                <FauneCard
                                    key={key}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            ) : (
                                <FauneCardOld
                                    key={key}
                                    version={v}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            )
                        }
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("flore") && (
                    <AtelierSection
                        id="flore"
                        title="FloreCard"
                        desc={`Carte d'espèce de l'index Flore — ${MOCK_FLORE.length} plantes de démonstration (2 par catégorie, tirées du catalogue).`}
                        items={MOCK_FLORE}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        defaultVersion={2}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "identité colorée par catégorie"
                                  : "fiche botanique complète : hero, stats, tags, anecdote"
                        }
                        render={(d, v, key, isOpen, onToggle) =>
                            v === 2 ? (
                                <FloreCard
                                    key={key}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            ) : (
                                <FloreCardOld
                                    key={key}
                                    version={v}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            )
                        }
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("chateaux") && (
                    <AtelierSection
                        id="chateaux"
                        title="ChateauxCard"
                        desc={`Carte de château de l'index Châteaux — ${MOCK_CHATEAU.length} châteaux de démonstration (jusqu’à 2 par époque, tirés du catalogue).`}
                        items={MOCK_CHATEAU}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3, 4] as const}
                        defaultVersion={4}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "corniche par époque + vignette encadrée + ✦ phares"
                                  : v === 3
                                    ? "fiche complète : hero paysage, stats, classement, résumé"
                                    : "scène illustrée : château détouré, informations structurées, protections"
                        }
                        render={(d, v, key, isOpen, onToggle) =>
                            v === 4 ? (
                                <ChateauxCard
                                    key={key}

                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            ) : (
                                <ChateauxCardOld
                                    key={key}
                                    version={v}
                                    d={d}
                                    open={isOpen}
                                    onToggle={onToggle}
                                />
                            )
                        }
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("vignobles") && (
                    <AtelierSection
                        id="vignobles"
                        title="VignoblesCard"
                        desc={`Carte d'appellation de l'index Vignobles — ${MOCK_VIGNOBLE.length} appellations de démonstration (2 par couleur, tirées du catalogue).`}
                        items={MOCK_VIGNOBLE}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine"
                                : v === 2
                                  ? "robe au fond du verre + goutte auréolée"
                                  : "fiche vinicole complète : robe en avatar, stats, accord, résumé"
                        }
                        render={(d, v, key, isOpen, onToggle) => (
                            <VignoblesCard
                                key={key}
                                version={v}
                                d={d}
                                open={isOpen}
                                onToggle={onToggle}
                            />
                        )}
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("vocabulaire") && (
                    <AtelierSection
                        id="vocabulaire"
                        title="VocabulaireCard"
                        desc={`Entrée de l'index Vocabulaire — ${MOCK_MOT.length} mots de démonstration (2 par catégorie, tirés du catalogue).`}
                        items={MOCK_MOT}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine (patine mémorielle)"
                                : v === 2
                                  ? "filet par catégorie + initiale enluminée"
                                  : "fiche complète : initiale en avatar, définition, exemple, étymologie"
                        }
                        render={(d, v, key, isOpen, onToggle) => (
                            <VocabulaireCard
                                key={key}
                                version={v}
                                d={d}
                                open={isOpen}
                                onToggle={onToggle}
                            />
                        )}
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}

                {indexesList.includes("patrimoine") && (
                    <AtelierSection
                        id="patrimoine"
                        title="PatrimoineCard"
                        desc={`Fiche d'inventaire de l'index Patrimoine — ${MOCK_PATRIMOINE.length} ouvrages de démonstration (jusqu'à 2 par type, tirés du catalogue).`}
                        items={MOCK_PATRIMOINE}
                        keyOf={(d) => d.slug}
                        versions={[1, 2, 3] as const}
                        note={(v) =>
                            v === 1
                                ? "rendu d'origine (fiche d'inventaire)"
                                : v === 2
                                  ? "identité colorée par type d'ouvrage"
                                  : "fiche complète : hero, stats, classement, résumé"
                        }
                        render={(d, v, key, isOpen, onToggle) => (
                            <PatrimoineCard
                                key={key}
                                version={v}
                                d={d}
                                numero={MOCK_PATRIMOINE.indexOf(d) + 1}
                                open={isOpen}
                                onToggle={onToggle}
                            />
                        )}
                        open={open}
                        allOpen={allOpen}
                        onToggle={toggle}
                        onToggleAll={toggleAll}
                    />
                )}
            </div>
        </main>
    );
}
