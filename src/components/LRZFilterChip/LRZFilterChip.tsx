"use client";

import type { ReactNode } from "react";

import {
    LRZChip,
    type LRZChipProps,
    type LRZChipSize,
} from "@/components/LRZChip";

export type LRZFilterChipSize = LRZChipSize;

export type LRZFilterChipProps = Omit<LRZChipProps, "children"> & {
    children: ReactNode;
};

/** Chip de filtre : une option sélectionnable au sein d’un filtre ou d’un groupe. */
export default function LRZFilterChip({
    children,
    ...props
}: LRZFilterChipProps) {
    return <LRZChip {...props}>{children}</LRZChip>;
}
