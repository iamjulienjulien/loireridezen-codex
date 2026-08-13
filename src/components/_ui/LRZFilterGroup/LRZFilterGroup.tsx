"use client";

import type { CSSProperties, ReactNode } from "react";

import {
    LRZFilterChip,
    type LRZFilterPreset,
} from "@/components/_ui/LRZFilterChip";
import { getLRZSymbolDefinition, getLRZSymbolSlugs } from "@/registry/symbols";

import styles from "./LRZFilterGroup.module.css";

export type LRZFilterGroupOption = {
    id: string;
    label?: string;
    count?: number;
    disabled?: boolean;
    preset?: LRZFilterPreset;
};

export type LRZFilterGroupPreset = Pick<LRZFilterPreset, "collection" | "meta">;

export type LRZFilterGroupVariant = "default" | "card" | "inline";
export type LRZFilterGroupOrientation = "horizontal" | "vertical";

export type LRZFilterGroupProps = {
    label: ReactNode;
    options?: readonly LRZFilterGroupOption[];
    /** Preset de métadonnée appliqué aux options qui n’en fournissent pas. */
    preset?: LRZFilterGroupPreset;
    /** Compte dynamique utilisé pour afficher et filtrer les options. */
    getCount?: (id: string) => number | undefined;
    activeId?: string;
    onSelect: (id: string) => void;
    accent?: string;
    size?: "sm" | "md";
    variant?: LRZFilterGroupVariant;
    orientation?: LRZFilterGroupOrientation;
    className?: string;
};

type LRZFilterGroupStyle = CSSProperties & {
    "--filter-group-accent"?: string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZFilterGroup({
    label,
    options,
    preset,
    getCount,
    activeId,
    onSelect,
    accent,
    size = "md",
    variant = "default",
    orientation = "horizontal",
    className,
}: LRZFilterGroupProps) {
    const style = accent
        ? ({ "--filter-group-accent": accent } as LRZFilterGroupStyle)
        : undefined;
    const resolvedOptions: readonly LRZFilterGroupOption[] =
        options ??
        (preset
            ? [
                  { id: "all", label: "Tout" },
                  ...getLRZSymbolSlugs(preset.collection, preset.meta).map(
                      (slug) => ({ id: slug }),
                  ),
              ]
            : []);
    const countedOptions = resolvedOptions.map((option) =>
        option.id !== "all" && option.count === undefined && getCount
            ? { ...option, count: getCount(option.id) }
            : option,
    );
    const visibleOptions = countedOptions.filter(
        (option) => option.id === "all" || option.count !== 0,
    );
    if (visibleOptions.length <= 1) return null;

    const activeOption = visibleOptions.find(
        (option) => option.id === activeId,
    );
    const activePreset =
        activeOption?.preset ??
        (preset && activeOption
            ? ({ ...preset, slug: activeOption.id } as LRZFilterPreset)
            : undefined);
    const activeLabel =
        activeOption?.label ??
        (activePreset
            ? getLRZSymbolDefinition(
                  activePreset.collection,
                  activePreset.meta,
                  activePreset.slug,
              )?.label
            : undefined);

    return (
        <fieldset
            className={joinClassNames(
                styles.group,
                styles[variant],
                styles[orientation],
                className,
            )}
            style={style}
        >
            <legend className={styles.legend}>
                <span>{label}</span>
                {activeLabel && (
                    <span className={styles.activeLabel}>{activeLabel}</span>
                )}
            </legend>
            <div
                className={styles.options}
                role="group"
                aria-label={String(label)}
            >
                {visibleOptions.map((option) =>
                    (() => {
                        const optionPreset =
                            option.preset ??
                            (preset
                                ? ({
                                      ...preset,
                                      slug: option.id,
                                  } as LRZFilterPreset)
                                : undefined);
                        const optionLabel =
                            option.label ??
                            (optionPreset
                                ? getLRZSymbolDefinition(
                                      optionPreset.collection,
                                      optionPreset.meta,
                                      optionPreset.slug,
                                  )?.label
                                : option.id);

                        return (
                            <LRZFilterChip
                                key={option.id}
                                active={option.id === activeId}
                                count={option.count}
                                disabled={option.disabled}
                                accent={optionPreset ? undefined : accent}
                                size={size}
                                preset={optionPreset}
                                onClick={() => onSelect(option.id)}
                            >
                                {optionLabel}
                            </LRZFilterChip>
                        );
                    })(),
                )}
            </div>
        </fieldset>
    );
}
