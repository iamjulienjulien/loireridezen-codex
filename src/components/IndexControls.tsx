"use client";

import type { CSSProperties } from "react";
import styles from "./IndexControls.module.css";

export interface FilterOption {
    id: string;
    label: string;
    /** Décompte optionnel affiché en badge. */
    count?: number;
}

export interface FilterGroup {
    label: string;
    active: string;
    options: FilterOption[];
    onSelect: (id: string) => void;
}

export default function IndexControls({
    query,
    onQuery,
    placeholder = "Chercher…",
    resultCount,
    totalCount,
    unit,
    groups,
    accent,
    expand,
}: {
    query: string;
    onQuery: (v: string) => void;
    placeholder?: string;
    resultCount: number;
    totalCount: number;
    unit?: string;
    groups: FilterGroup[];
    /** Couleur d'accent de la section (états actifs / focus). */
    accent?: string;
    /** Interrupteur « Tout déplier / replier », optionnel. */
    expand?: {
        all: boolean;
        onToggle: () => void;
    };
}) {
    const style = accent
        ? ({ "--accent": accent } as CSSProperties)
        : undefined;

    return (
        <section
            className={styles.panel}
            style={style}
            aria-label="Recherche et filtres"
        >
            <div className={styles.searchRow}>
                <div className={styles.search}>
                    <span className={styles.icon} aria-hidden>
                        ⌕
                    </span>
                    <input
                        type="search"
                        className={styles.input}
                        placeholder={placeholder}
                        aria-label={placeholder}
                        value={query}
                        onChange={(e) => onQuery(e.target.value)}
                    />
                    {query && (
                        <button
                            type="button"
                            className={styles.clear}
                            aria-label="Effacer la recherche"
                            onClick={() => onQuery("")}
                        >
                            ×
                        </button>
                    )}
                </div>
                <span className={styles.count}>
                    <b>{resultCount}</b> / {totalCount}
                    {unit ? ` ${unit}` : ""}
                </span>
                {expand && (
                    <button
                        type="button"
                        className={styles.expandToggle}
                        role="switch"
                        aria-checked={expand.all}
                        onClick={expand.onToggle}
                    >
                        <span className={styles.switchTrack} aria-hidden>
                            <span className={styles.switchThumb} />
                        </span>
                        {expand.all ? "Tout replier" : "Tout déplier"}
                    </button>
                )}
            </div>

            {groups.map((g) => (
                <div
                    key={g.label}
                    className={styles.chipRow}
                    role="group"
                    aria-label={`Filtrer par ${g.label.toLowerCase()}`}
                >
                    <span className={styles.groupLabel}>{g.label}</span>
                    {g.options.map((o) => (
                        <button
                            key={o.id}
                            type="button"
                            className={styles.chip}
                            aria-pressed={g.active === o.id}
                            onClick={() => g.onSelect(o.id)}
                        >
                            {o.label}
                            {o.count !== undefined && (
                                <span className={styles.chipN}>{o.count}</span>
                            )}
                        </button>
                    ))}
                </div>
            ))}
        </section>
    );
}
