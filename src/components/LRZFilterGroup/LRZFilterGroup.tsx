"use client";

import type { CSSProperties, ReactNode } from "react";

import { LRZFilterChip } from "@/components/LRZFilterChip";

import styles from "./LRZFilterGroup.module.css";

export type LRZFilterGroupOption = {
    id: string;
    label: string;
    count?: number;
    disabled?: boolean;
};

export type LRZFilterGroupVariant = "default" | "card" | "inline";
export type LRZFilterGroupOrientation = "horizontal" | "vertical";

export type LRZFilterGroupProps = {
    label: ReactNode;
    options: readonly LRZFilterGroupOption[];
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
    const activeLabel = options.find((option) => option.id === activeId)?.label;

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
                {options.map((option) => (
                    <LRZFilterChip
                        key={option.id}
                        active={option.id === activeId}
                        count={option.count}
                        disabled={option.disabled}
                        accent={accent}
                        size={size}
                        onClick={() => onSelect(option.id)}
                    >
                        {option.label}
                    </LRZFilterChip>
                ))}
            </div>
        </fieldset>
    );
}
