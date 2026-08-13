import type { CSSProperties, ReactNode } from "react";

import type { PageFooterProps } from "@/components/_layout/PageFooter";
import type { PageHeaderProps } from "@/components/_layout/PageHeader";

import type {
    ShellContainerSpacing,
    ShellContainerWidth,
} from "./ShellContainer";

export type ShellHeaderSlots = Pick<
    PageHeaderProps,
    "identity" | "navigation" | "actions" | "breadcrumbs" | "separator"
> & {
    headerClassName?: string;
};

export type ShellSharedProps = {
    children: ReactNode;
    footer?: ReactNode;
    footerProps?: Omit<PageFooterProps, "children" | "color">;
    frameClassName?: string;
    frameStyle?: CSSProperties;
    containerClassName?: string;
    mainClassName?: string;
};

export type ConfigurableShellLayoutProps = {
    width?: ShellContainerWidth;
    spacing?: ShellContainerSpacing;
};
