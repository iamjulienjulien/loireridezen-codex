"use client";

import { useMemo, useState } from "react";
import PageFooter from "@/components/PageFooter";
import PageHeader from "@/components/PageHeader";
import IndexControls from "@/components/IndexControls";
import IndexPresentation from "@/components/IndexPresentation";
import { getIndex, type IndexEntry } from "@/registry/indexes";
import { TERRITOIRES } from "@/registry/territoires";
import type { Guinguette } from "@/types/guinguette";
import GuinguetteCard from "./GuinguetteCardV3";
import styles from "./guinguettes.module.css";

const STATUTS = [
    { id: "all", label: "Tous" },
    { id: "actif", label: "Actifs" },
    { id: "a_verifier", label: "À vérifier" },
    { id: "historique", label: "Historiques" },
] as const;

const normalize = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export default function GuinguettesIndex({
    guinguettes,
    indexes,
}: {
    guinguettes: Guinguette[];
    indexes: readonly IndexEntry[];
}) {
    const entry = getIndex("/guinguettes")!;
    const [territoire, setTerritoire] = useState("all");
    const [coursDEau, setCoursDEau] = useState("all");
    const [statut, setStatut] = useState("all");
    const [query, setQuery] = useState("");
    const [expandAll, setExpandAll] = useState(false);
    const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
        {},
    );

    const toggleAll = () => {
        setExpandAll((current) => !current);
        setOpenOverrides({});
    };

    const toggleOne = (id: string) => {
        setOpenOverrides((current) => ({
            ...current,
            [id]: !(current[id] ?? expandAll),
        }));
    };

    const countFor = (
        field: "territoire" | "coursDEau" | "statut",
        value: string,
    ) => guinguettes.filter((item) => item[field] === value).length;

    const territoireOptions = useMemo(
        () => [
            { id: "all", label: "Tout" },
            ...TERRITOIRES.filter(({ slug }) =>
                guinguettes.some((item) => item.territoire === slug),
            ).map(({ slug, nom }) => ({ id: slug, label: nom })),
        ],
        [guinguettes],
    );

    const coursEauOptions = useMemo(
        () => [
            { id: "all", label: "Tous" },
            ...Array.from(
                new Set(
                    guinguettes
                        .map(({ coursDEau: value }) => value)
                        .filter((value): value is string => Boolean(value)),
                ),
            )
                .sort((a, b) => a.localeCompare(b, "fr"))
                .map((value) => ({ id: value, label: value })),
        ],
        [guinguettes],
    );

    const list = useMemo(() => {
        const normalizedQuery = normalize(query.trim());

        return guinguettes.filter((item) => {
            if (territoire !== "all" && item.territoire !== territoire) {
                return false;
            }
            if (coursDEau !== "all" && item.coursDEau !== coursDEau) {
                return false;
            }
            if (statut !== "all" && item.statut !== statut) return false;

            if (normalizedQuery) {
                const haystack = normalize(
                    [
                        item.nom,
                        item.commune,
                        item.departement,
                        item.territoire,
                        item.coursDEau,
                        item.description,
                        item.sousTitre,
                        item.type,
                        ...item.ambiance,
                        ...item.services,
                        ...(item.tags ?? []),
                    ]
                        .filter(Boolean)
                        .join(" "),
                );

                if (!haystack.includes(normalizedQuery)) return false;
            }

            return true;
        });
    }, [guinguettes, territoire, coursDEau, statut, query]);

    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <PageHeader current="/guinguettes" indexes={indexes} />

                <IndexPresentation
                    description={entry.description}
                    current="/guinguettes"
                    indexes={indexes}
                >
                    {entry.presentation_md}
                </IndexPresentation>

                <IndexControls
                    query={query}
                    onQuery={setQuery}
                    placeholder="Chercher une guinguette, une commune, un cours d’eau…"
                    resultCount={list.length}
                    totalCount={guinguettes.length}
                    unit="guinguettes"
                    accent={entry.accent}
                    expand={{ all: expandAll, onToggle: toggleAll }}
                    groups={[
                        {
                            label: "Territoire",
                            active: territoire,
                            onSelect: setTerritoire,
                            options: territoireOptions.map((option) => ({
                                ...option,
                                count:
                                    option.id === "all"
                                        ? undefined
                                        : countFor("territoire", option.id),
                            })),
                        },
                        {
                            label: "Cours d’eau",
                            active: coursDEau,
                            onSelect: setCoursDEau,
                            options: coursEauOptions.map((option) => ({
                                ...option,
                                count:
                                    option.id === "all"
                                        ? undefined
                                        : countFor("coursDEau", option.id),
                            })),
                        },
                        {
                            label: "Statut",
                            active: statut,
                            onSelect: setStatut,
                            options: STATUTS.map((option) => ({
                                ...option,
                                count:
                                    option.id === "all"
                                        ? undefined
                                        : countFor("statut", option.id),
                            })),
                        },
                    ]}
                />

                {list.length === 0 ? (
                    <p className={styles.empty}>
                        Pas de lampions sur cette portion du fil. Élargis la
                        recherche ou change de filtre.
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {list.map((guinguette) => (
                            <GuinguetteCard
                                key={guinguette.slug}
                                guinguette={guinguette}
                                open={
                                    openOverrides[guinguette.slug] ?? expandAll
                                }
                                onToggle={() => toggleOne(guinguette.slug)}
                            />
                        ))}
                    </div>
                )}

                <PageFooter color={entry.color}>
                    Le Codex Ligérien ·{" "}
                    <a href="https://loireridezen.bike">Loire Ride Zen</a>
                    <br />
                    {guinguettes.length} {entry.footerNote}
                </PageFooter>
            </div>
        </main>
    );
}
