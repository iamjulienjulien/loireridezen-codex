import type { ReactNode } from "react";

import CollectionOutro from "@/components/CollectionOutro/CollectionOutro";
import PageHeader, {
    PageHeaderBreadcrumbs,
    PageHeaderIndexNavigation,
} from "@/components/PageHeader";
import type { IndexEntry } from "@/registry/indexes";
import type { CollectionPageDefinition } from "@/registry/pages";

import ShellScaffold from "./ShellScaffold";
import type { ShellHeaderSlots, ShellSharedProps } from "./types";

export type CollectionShellProps = ShellSharedProps &
    ShellHeaderSlots & {
        page: CollectionPageDefinition;
        indexes: readonly IndexEntry[];
        description?: ReactNode;
        mark?: ReactNode;
        outro?: ReactNode | false;
    };

export default function CollectionShell({
    page,
    indexes,
    children,
    footer,
    outro,
    description,
    mark = page.mark,
    identity,
    navigation,
    actions,
    breadcrumbs,
    separator,
    headerClassName,
    ...shellProps
}: CollectionShellProps) {
    const parentIndex = indexes.find((index) => index.href === page.indexHref);
    const resolvedNavigation =
        navigation === undefined ? (
            <PageHeaderIndexNavigation
                current={page.href}
                indexes={indexes}
                activeSectionHref={page.indexHref}
            />
        ) : (
            navigation
        );
    const resolvedBreadcrumbs =
        breadcrumbs === undefined ? (
            <PageHeaderBreadcrumbs
                items={[
                    { href: "/", label: "Le Codex ligérien" },
                    {
                        href: page.indexHref,
                        label: parentIndex?.label ?? page.indexSlug,
                    },
                ]}
            />
        ) : (
            breadcrumbs
        );
    const resolvedOutro =
        outro === undefined ? (
            <CollectionOutro
                note={page.footerNote}
                href={page.indexHref}
                mark={page.mark}
                linkLabel={`Retour à l’index « ${parentIndex?.label ?? page.indexSlug} »`}
            />
        ) : (
            outro
        );

    return (
        <ShellScaffold
            {...shellProps}
            kind="collection"
            accent={page.accent}
            color={page.color}
            width="wide"
            footer={footer}
            header={
                <PageHeader
                    variant="collection"
                    title={page.title}
                    eyebrow={page.eyebrow}
                    description={description}
                    mark={mark}
                    accent={page.accent}
                    color={page.color}
                    identity={identity}
                    navigation={resolvedNavigation}
                    actions={actions}
                    breadcrumbs={resolvedBreadcrumbs}
                    separator={separator}
                    className={headerClassName}
                />
            }
        >
            {children}
            {resolvedOutro}
        </ShellScaffold>
    );
}
