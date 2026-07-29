"use client";

import type { CSSProperties } from "react";

import {
    LRZFilterGroup,
    type LRZFilterGroupOption,
} from "@/components/LRZFilterGroup";

import styles from "./PageControls.module.css";

export type PageControlsFilterOption = LRZFilterGroupOption;

export interface PageControlsFilterGroup {
    label: string;
    active: string;
    options: PageControlsFilterOption[];
    onSelect: (id: string) => void;
}

export interface PageControlsSwitcher {
    label: string;
    checked: boolean;
    offLabel: string;
    onLabel: string;
    onToggle: () => void;
}

export type PageControlsVariant = "default" | "chateaux";

type PageControlsProps = {
    query: string;
    onQuery: (value: string) => void;
    placeholder?: string;
    resultCount: number;
    totalCount: number;
    unit?: string;
    groups: PageControlsFilterGroup[];
    accent?: string;
    variant?: PageControlsVariant;
    expand?: {
        all: boolean;
        onToggle: () => void;
    };
    switcher?: PageControlsSwitcher;
    reset?: {
        active: boolean;
        onReset: () => void;
    };
};

type PageControlsStyle = CSSProperties & {
    "--page-controls-accent"?: string;
};

export default function PageControls({
    query,
    onQuery,
    placeholder = "Chercher…",
    resultCount,
    totalCount,
    unit,
    groups,
    accent,
    variant = "default",
    expand,
    switcher,
    reset,
}: PageControlsProps) {
    const style = accent
        ? ({ "--page-controls-accent": accent } as PageControlsStyle)
        : undefined;

    const resultLabel = unit ?? "résultats";

    return (
        <section
            className={styles.panel}
            data-variant={variant}
            style={style}
            aria-label={
                variant === "chateaux"
                    ? "Recherche et filtres des châteaux"
                    : "Recherche et filtres"
            }
        >
            {variant === "chateaux" && (
                <div className={styles.context}>
                    <div>
                        <p className={styles.eyebrow}>Explorer l’inventaire</p>
                        <p className={styles.contextText}>
                            Compare les époques, les renommées et les façons
                            d’habiter le fil royal.
                        </p>
                    </div>
                    <span className={styles.contextMark} aria-hidden="true">
                        ◆
                    </span>
                </div>
            )}

            <div className={styles.toolbar}>
                <label className={styles.search}>
                    <span className={styles.searchLabel}>Rechercher</span>
                    <span className={styles.searchField}>
                        <span className={styles.icon} aria-hidden="true">
                            ⌕
                        </span>
                        <input
                            type="search"
                            className={styles.input}
                            placeholder={placeholder}
                            aria-label={placeholder}
                            value={query}
                            onChange={(event) => onQuery(event.target.value)}
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
                    </span>
                </label>

                <div className={styles.summary} aria-live="polite">
                    <span className={styles.count}>
                        <strong>{resultCount}</strong> / {totalCount}{" "}
                        {resultLabel}
                    </span>
                    {reset?.active && (
                        <button
                            type="button"
                            className={styles.reset}
                            onClick={reset.onReset}
                        >
                            Réinitialiser
                        </button>
                    )}
                </div>
            </div>

            {(switcher || expand) && (
                <div
                    className={styles.actions}
                    aria-label="Options d’affichage"
                >
                    {switcher && (
                        <button
                            type="button"
                            className={styles.switchToggle}
                            role="switch"
                            aria-checked={switcher.checked}
                            aria-label={switcher.label}
                            onClick={switcher.onToggle}
                        >
                            <span className={styles.actionCopy}>
                                <span className={styles.actionLabel}>
                                    {switcher.label}
                                </span>
                                <span className={styles.actionValue}>
                                    {switcher.checked
                                        ? switcher.onLabel
                                        : switcher.offLabel}
                                </span>
                            </span>
                            <span
                                className={styles.switchTrack}
                                aria-hidden="true"
                            >
                                <span className={styles.switchThumb} />
                            </span>
                        </button>
                    )}
                    {expand && (
                        <button
                            type="button"
                            className={styles.expandToggle}
                            aria-pressed={expand.all}
                            aria-label={
                                expand.all
                                    ? "Replier toutes les fiches"
                                    : "Déplier toutes les fiches"
                            }
                            onClick={expand.onToggle}
                        >
                            {expand.all ? "Tout replier" : "Tout déplier"}
                        </button>
                    )}
                </div>
            )}

            <div className={styles.filters}>
                {groups.map((group) => (
                    <LRZFilterGroup
                        key={group.label}
                        label={group.label}
                        activeId={group.active}
                        options={group.options}
                        onSelect={group.onSelect}
                        accent={accent}
                        variant={variant === "chateaux" ? "card" : "default"}
                    />
                ))}
            </div>
        </section>
    );
}
