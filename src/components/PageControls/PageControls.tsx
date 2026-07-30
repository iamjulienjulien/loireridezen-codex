"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";

import { LRZButton } from "@/components/LRZButton";
import {
    LRZButtonGroup,
    LRZButtonGroupItem,
} from "@/components/LRZButtonGroup";
import {
    LRZFilterGroup,
    type LRZFilterGroupOption,
} from "@/components/LRZFilterGroup";
import type { LRZColor } from "@/types/lrz";

import styles from "./PageControls.module.css";

export type PageControlsFilterOption = LRZFilterGroupOption;

export interface PageControlsFilterGroup {
    label: string;
    active: string;
    options: PageControlsFilterOption[];
    onSelect: (id: string) => void;
}

export interface PageControlsViewGroup {
    value: string;
    options: Array<{
        value: string;
        label: string;
        icon?: ReactNode;
    }>;
    onValueChange: (value: string) => void;
    ariaLabel: string;
}

export interface PageControlsAction {
    label: string;
    activeLabel?: string;
    active: boolean;
    icon?: ReactNode;
    onClick: () => void;
}

export type PageControlsVariant = "default" | "chateaux";
export type PageControlsMode = "full" | "filters-toggle" | "compact";

type PageControlsProps = {
    query: string;
    onQuery: (value: string) => void;
    placeholder?: string;
    resultCount?: number;
    totalCount?: number;
    unit?: string;
    groups: PageControlsFilterGroup[];
    accent?: string;
    buttonColor?: LRZColor;
    variant?: PageControlsVariant;
    mode?: PageControlsMode;
    defaultFiltersOpen?: boolean;
    viewGroup?: PageControlsViewGroup;
    action?: PageControlsAction;
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
    groups,
    accent,
    buttonColor = "ocre",
    variant = "default",
    mode = "full",
    defaultFiltersOpen = false,
    viewGroup,
    action,
    reset,
}: PageControlsProps) {
    const filtersId = useId();
    const [filtersOpen, setFiltersOpen] = useState(defaultFiltersOpen);
    const filtersVisible = mode === "full" || filtersOpen;
    const activeFiltersCount = groups.filter(
        (group) => group.active !== "all",
    ).length;
    const style = accent
        ? ({ "--page-controls-accent": accent } as PageControlsStyle)
        : undefined;

    const hasFilterToggle = mode === "filters-toggle";
    const showControls = mode !== "compact";

    return (
        <section
            className={styles.panel}
            data-mode={mode}
            data-variant={variant}
            style={style}
            aria-label={
                variant === "chateaux"
                    ? "Recherche et filtres des châteaux"
                    : "Recherche et filtres"
            }
        >
            {showControls ? (
                <div className={styles.toolbar}>
                    <div className={styles.toolbarStart}>
                        <label className={styles.searchField}>
                            <Search
                                className={styles.searchIcon}
                                size={15}
                                aria-hidden="true"
                            />
                            <span className={styles.visuallyHidden}>
                                Rechercher
                            </span>
                            <input
                                type="search"
                                className={styles.input}
                                placeholder={placeholder}
                                aria-label={placeholder}
                                value={query}
                                onChange={(event) =>
                                    onQuery(event.target.value)
                                }
                            />
                            {query ? (
                                <button
                                    type="button"
                                    className={styles.clear}
                                    aria-label="Effacer la recherche"
                                    onClick={() => onQuery("")}
                                >
                                    ×
                                </button>
                            ) : null}
                        </label>

                        {hasFilterToggle ? (
                            <LRZButton
                                color={buttonColor}
                                variant={filtersOpen ? "primary" : "secondary"}
                                size="sm"
                                aria-expanded={filtersOpen}
                                aria-controls={filtersId}
                                leadingIcon={<Filter />}
                                trailingIcon={
                                    filtersOpen ? (
                                        <ChevronUp />
                                    ) : (
                                        <ChevronDown />
                                    )
                                }
                                onClick={() => setFiltersOpen((open) => !open)}
                            >
                                Filtres
                            </LRZButton>
                        ) : null}
                    </div>

                    <div className={styles.toolbarEnd}>
                        {action ? (
                            <LRZButton
                                aria-pressed={action.active}
                                color={buttonColor}
                                variant={
                                    action.active ? "primary" : "secondary"
                                }
                                size="sm"
                                leadingIcon={action.icon}
                                onClick={action.onClick}
                            >
                                {action.active
                                    ? (action.activeLabel ?? action.label)
                                    : action.label}
                            </LRZButton>
                        ) : null}

                        {viewGroup ? (
                            <LRZButtonGroup
                                value={viewGroup.value}
                                onValueChange={viewGroup.onValueChange}
                                ariaLabel={viewGroup.ariaLabel}
                                color={buttonColor}
                                variant="secondary"
                                size="sm"
                            >
                                {viewGroup.options.map((option) => (
                                    <LRZButtonGroupItem
                                        key={option.value}
                                        value={option.value}
                                        leadingIcon={option.icon}
                                    >
                                        {option.label}
                                    </LRZButtonGroupItem>
                                ))}
                            </LRZButtonGroup>
                        ) : null}
                    </div>
                </div>
            ) : null}

            {showControls && filtersVisible ? (
                <div id={filtersId} className={styles.filtersPanel}>
                    <div className={styles.filters}>
                        {groups.map((group) => (
                            <LRZFilterGroup
                                key={group.label}
                                label={group.label}
                                activeId={group.active}
                                options={group.options}
                                onSelect={group.onSelect}
                                accent={accent}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
