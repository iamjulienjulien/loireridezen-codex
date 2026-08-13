"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

import { LRZ_COLOR_VARIABLES } from "@/registry/colors";
import type { LRZColor } from "@/types/lrz";

import styles from "./LRZButton.module.css";

export type LRZButtonVariant = "primary" | "secondary" | "ghost" | "quiet";

export type LRZButtonPreset =
    "default" | "danger" | "success" | "warning" | "info";

export type LRZButtonSize = "sm" | "md" | "lg" | "icon";

const PRESET_COLORS: Record<LRZButtonPreset, LRZColor> = {
    default: "ocre",
    danger: "rouge",
    success: "prairie",
    warning: "ambre",
    info: "eau",
};

export type LRZButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
> & {
    children: ReactNode;
    variant?: LRZButtonVariant;
    preset?: LRZButtonPreset;
    size?: LRZButtonSize;
    color?: LRZColor;
    fullWidth?: boolean;
    loading?: boolean;
    loadingLabel?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
};

type LRZButtonStyle = CSSProperties & {
    "--button-color": string;
};

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

function LoadingIcon() {
    return (
        <span className={styles.loadingIcon} aria-hidden="true">
            <span />
            <span />
            <span />
        </span>
    );
}

export default function LRZButton({
    children,
    variant = "primary",
    preset = "default",
    size = "md",
    color,
    fullWidth = false,
    loading = false,
    loadingLabel = "Chargement…",
    leadingIcon,
    trailingIcon,
    className,
    style,
    disabled,
    type,
    ...buttonProps
}: LRZButtonProps) {
    const buttonColor = color ?? PRESET_COLORS[preset];
    const buttonStyle: LRZButtonStyle = {
        ...style,
        "--button-color": `var(${LRZ_COLOR_VARIABLES[buttonColor]})`,
    };

    return (
        <button
            {...buttonProps}
            type={type ?? "button"}
            className={joinClassNames(
                styles.button,
                styles[variant],
                styles[size],
                fullWidth && styles.fullWidth,
                loading && styles.loading,
                className,
            )}
            style={buttonStyle}
            data-preset={preset !== "default" ? preset : undefined}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
        >
            {loading ? (
                <LoadingIcon />
            ) : leadingIcon !== undefined ? (
                <span className={styles.glyph} aria-hidden="true">
                    {leadingIcon}
                </span>
            ) : null}

            <span className={styles.label}>
                {loading ? loadingLabel : children}
            </span>

            {!loading && trailingIcon !== undefined ? (
                <span className={styles.glyph} aria-hidden="true">
                    {trailingIcon}
                </span>
            ) : null}
        </button>
    );
}

export { LRZButton };
