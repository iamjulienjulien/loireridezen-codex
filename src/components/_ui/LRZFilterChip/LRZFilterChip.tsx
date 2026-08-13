"use client";

import type { ReactNode } from "react";

import {
    LRZChip,
    type LRZChipProps,
    type LRZChipSize,
} from "@/components/_ui/LRZChip";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import {
    getLRZSymbolDefinition,
    type LRZSymbolLocator,
} from "@/registry/symbols";

export type LRZFilterChipSize = LRZChipSize;

export type LRZFilterPreset = LRZSymbolLocator;

export type LRZFilterChipProps = Omit<LRZChipProps, "children"> & {
    children?: ReactNode;
    /** Métadonnée du registre utilisée pour résoudre label, couleur et symbole. */
    preset?: LRZFilterPreset;
};

/** Chip de filtre : une option sélectionnable au sein d’un filtre ou d’un groupe. */
export default function LRZFilterChip({
    children,
    preset,
    accent,
    ...props
}: LRZFilterChipProps) {
    const definition = preset
        ? getLRZSymbolDefinition(preset.collection, preset.meta, preset.slug)
        : undefined;
    const label = children ?? definition?.label ?? preset?.slug;

    return (
        <LRZChip
            {...props}
            accent={preset ? definition?.accent : accent}
            leading={
                preset ? (
                    <LRZSymbol
                        {...preset}
                        size="xs"
                        decorative
                        frame="none"
                        padding="none"
                    />
                ) : undefined
            }
        >
            {label}
        </LRZChip>
    );
}
