import type { ReactNode } from "react";

import styles from "./ShellContainer.module.css";

export const SHELL_CONTAINER_WIDTHS = [
    "narrow",
    "reading",
    "content",
    "wide",
    "full",
] as const;

export type ShellContainerWidth = (typeof SHELL_CONTAINER_WIDTHS)[number];

export type ShellContainerSpacing = "none" | "compact" | "default" | "relaxed";

export type ShellContainerProps = {
    children: ReactNode;
    width?: ShellContainerWidth;
    spacing?: ShellContainerSpacing;
    className?: string;
};

export default function ShellContainer({
    children,
    width = "content",
    spacing = "default",
    className,
}: ShellContainerProps) {
    return (
        <div
            className={[styles.container, className].filter(Boolean).join(" ")}
            data-shell-container=""
            data-spacing={spacing}
            data-width={width}
        >
            {children}
        </div>
    );
}
