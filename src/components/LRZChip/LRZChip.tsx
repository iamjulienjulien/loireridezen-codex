"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

import styles from "./LRZChip.module.css";

export type LRZChipVariant = "default" | "solid" | "quiet";
export type LRZChipSize = "sm" | "md";

export type LRZChipProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "aria-pressed"
> & {
    children: ReactNode;
    active?: boolean;
    count?: number;
    accent?: string;
    size?: LRZChipSize;
    variant?: LRZChipVariant;
};

type LRZChipStyle = CSSProperties & {
    "--chip-accent"?: string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export default function LRZChip({
    children,
    active = false,
    count,
    accent,
    size = "md",
    variant = "default",
    className,
    disabled,
    ...buttonProps
}: LRZChipProps) {
    const style = accent
        ? ({ "--chip-accent": accent } as LRZChipStyle)
        : undefined;
    const accessibleLabel =
        count === undefined
            ? undefined
            : `${String(children)}, ${count} résultats`;

    return (
        <button
            {...buttonProps}
            type={buttonProps.type ?? "button"}
            className={joinClassNames(
                styles.chip,
                styles[size],
                styles[variant],
                className,
            )}
            style={style}
            aria-pressed={active}
            aria-label={buttonProps["aria-label"] ?? accessibleLabel}
            disabled={disabled}
        >
            <span className={styles.label}>{children}</span>
            {count !== undefined && (
                <span className={styles.count} aria-hidden="true">
                    {count}
                </span>
            )}
        </button>
    );
}
