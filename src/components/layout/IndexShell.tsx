import type { ReactNode } from "react";

import PageHeader, {
    PageHeaderIndexMark,
    PageHeaderIndexNavigation,
} from "@/components/PageHeader";
import type { IndexEntry } from "@/registry/indexes";
import type { IndexPageDefinition } from "@/registry/pages";

import ShellScaffold from "./ShellScaffold";
import styles from "./Shells.module.css";
import type { ShellHeaderSlots, ShellSharedProps } from "./types";

type IndexShellHeaderSlots = Pick<
    ShellHeaderSlots,
    "identity" | "navigation" | "actions" | "separator" | "headerClassName"
>;

export type IndexShellProps = ShellSharedProps &
    IndexShellHeaderSlots & {
        page: IndexPageDefinition;
        indexes: readonly IndexEntry[];
        totalEntries: number;
        mark?: ReactNode;
    };

export default function IndexShell({
    page,
    indexes,
    totalEntries,
    children,
    footer,
    mark,
    identity,
    navigation,
    actions,
    separator,
    headerClassName,
    ...shellProps
}: IndexShellProps) {
    const resolvedMark =
        mark === undefined ? <PageHeaderIndexMark index={page} /> : mark;
    const resolvedNavigation =
        navigation === undefined ? (
            <PageHeaderIndexNavigation current={page.href} indexes={indexes} />
        ) : (
            navigation
        );
    const resolvedFooter =
        footer === undefined ? (
            <span className={styles.indexFooterCount}>
                {totalEntries} {page.footerNote}
            </span>
        ) : (
            footer
        );

    return (
        <ShellScaffold
            {...shellProps}
            kind="index"
            accent={page.accent}
            color={page.color}
            width="content"
            footer={resolvedFooter}
            header={
                <PageHeader
                    variant="index"
                    title={page.title}
                    eyebrow={page.eyebrow}
                    mark={resolvedMark}
                    accent={page.accent}
                    color={page.color}
                    identity={identity}
                    navigation={resolvedNavigation}
                    actions={actions}
                    separator={separator}
                    className={headerClassName}
                />
            }
        >
            {children}
        </ShellScaffold>
    );
}
