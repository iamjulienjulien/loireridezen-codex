"use client";

import { useState, type ReactNode } from "react";
import FauneCard from "../faune/FauneCard";
import FloreCard from "../flore/FloreCard";
import ChateauxCard from "../chateaux/ChateauxCard";
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
    note,
    render,
    open,
    allOpen,
    onToggle,
    onToggleAll,
}: SectionProps<T, V>) {
    return (
        <section id={id} className={styles.section}>
            <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <p className={styles.sectionDesc}>{desc}</p>
            </div>
            {versions.map((v) => {
                const groupKey = `${id}-${v}`;
                const cardKeys = items.map((d) => `${groupKey}-${keyOf(d)}`);
                return (
                    <div key={v} className={styles.variant}>
                        <div className={styles.variantHead}>
                            <span className={styles.variantLabel}>
                                version {v}
                            </span>
                            <span className={styles.variantNote}>
                                {note(v)}
                            </span>
                            <button
                                type="button"
                                className={styles.switch}
                                role="switch"
                                aria-checked={Boolean(allOpen[groupKey])}
                                onClick={() => onToggleAll(groupKey, cardKeys)}
                            >
                                <span
                                    className={styles.switchTrack}
                                    aria-hidden
                                >
                                    <span className={styles.switchThumb} />
                                </span>
                                {allOpen[groupKey]
                                    ? "Tout replier"
                                    : "Tout déplier"}
                            </button>
                        </div>
                        <div className={styles.grid}>
                            {items.map((d, i) => {
                                const key = cardKeys[i];
                                return render(
                                    d,
                                    v,
                                    key,
                                    Boolean(open[key]),
                                    () => onToggle(key),
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

export default function AtelierPage() {
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const [allOpen, setAllOpen] = useState<Record<string, boolean>>({});

    const toggle = (key: string) => setOpen((o) => ({ ...o, [key]: !o[key] }));

    const toggleAll = (groupKey: string, cardKeys: string[]) => {
        const next = !allOpen[groupKey];
        setAllOpen((a) => ({ ...a, [groupKey]: next }));
        setOpen((o) => {
            const copy = { ...o };
            for (const k of cardKeys) copy[k] = next;
            return copy;
        });
    };

    return (
        <main className={styles.page}>
            <TableOfContents items={TOC_ITEMS} />
            <div className={styles.wrap}>
                <header className={styles.head}>
                    <div className={styles.eyebrow}>Loire Ride Zen · Codex</div>
                    <h1 className={styles.title}>Atelier</h1>
                    <p className={styles.lede}>
                        La collection des esquisses de composants — variantes,
                        états et données de démonstration, au même endroit.
                    </p>
                </header>

                <AtelierSection
                    id="faune"
                    title="FauneCard"
                    desc={`Carte d'espèce de l'index Faune — ${MOCK_FAUNE.length} animaux de démonstration (2 par type, tirés du catalogue).`}
                    items={MOCK_FAUNE}
                    keyOf={(d) => d.nomScientifique}
                    versions={[1, 2, 3] as const}
                    note={(v) =>
                        v === 1
                            ? "rendu d'origine"
                            : v === 2
                              ? "identité colorée par type + emoji custom agrandi"
                              : "fiche naturaliste complète : hero, stats, tags, anecdote"
                    }
                    render={(d, v, key, isOpen, onToggle) => (
                        <FauneCard
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

                <AtelierSection
                    id="flore"
                    title="FloreCard"
                    desc={`Carte d'espèce de l'index Flore — ${MOCK_FLORE.length} plantes de démonstration (2 par catégorie, tirées du catalogue).`}
                    items={MOCK_FLORE}
                    keyOf={(d) => d.slug}
                    versions={[1, 2, 3] as const}
                    note={(v) =>
                        v === 1
                            ? "rendu d'origine"
                            : v === 2
                              ? "identité colorée par catégorie"
                              : "fiche botanique complète : hero, stats, tags, anecdote"
                    }
                    render={(d, v, key, isOpen, onToggle) => (
                        <FloreCard
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

                <AtelierSection
                    id="chateaux"
                    title="ChateauxCard"
                    desc={`Carte de château de l'index Châteaux — ${MOCK_CHATEAU.length} châteaux de démonstration (2 par époque, tirés du catalogue).`}
                    items={MOCK_CHATEAU}
                    keyOf={(d) => d.slug}
                    versions={[1, 2, 3] as const}
                    note={(v) =>
                        v === 1
                            ? "rendu d'origine"
                            : v === 2
                              ? "corniche par époque + vignette encadrée + ✦ phares"
                              : "fiche complète : hero paysage, stats, classement, résumé"
                    }
                    render={(d, v, key, isOpen, onToggle) => (
                        <ChateauxCard
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
            </div>
        </main>
    );
}
