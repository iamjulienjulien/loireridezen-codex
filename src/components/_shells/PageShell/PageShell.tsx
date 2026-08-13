import type { ReactNode } from "react";

import PageHeader, {
    type PageHeaderVariant,
} from "@/components/_layout/PageHeader";
import type { ContentPageDefinition } from "@/registry/pages";

import ShellScaffold from "../ShellScaffold";
import type {
    ConfigurableShellLayoutProps,
    ShellHeaderSlots,
    ShellSharedProps,
} from "../types";

type ContentPageHeaderVariant = Extract<
    PageHeaderVariant,
    "page" | "editorial" | "documentation"
>;

export type PageShellProps = ShellSharedProps &
    ShellHeaderSlots &
    ConfigurableShellLayoutProps & {
        page: ContentPageDefinition;
        headerVariant?: ContentPageHeaderVariant;
        header?: ReactNode | false;
        description?: ReactNode;
        mark?: ReactNode;
    };

export default function PageShell({
    page,
    children,
    width = "content",
    spacing = "default",
    headerVariant = page.variant,
    header,
    description = page.description,
    mark = page.mark,
    identity,
    navigation,
    actions,
    breadcrumbs,
    separator,
    headerClassName,
    ...shellProps
}: PageShellProps) {
    const resolvedHeader =
        header === undefined ? (
            <PageHeader
                variant={headerVariant}
                title={page.title}
                eyebrow={page.eyebrow}
                description={description}
                mark={mark}
                accent={page.accent}
                color={page.color}
                identity={identity}
                navigation={navigation}
                actions={actions}
                breadcrumbs={breadcrumbs}
                separator={separator}
                className={headerClassName}
            />
        ) : (
            header
        );

    return (
        <ShellScaffold
            {...shellProps}
            kind="page"
            accent={page.accent}
            color={page.color}
            width={width}
            spacing={spacing}
            header={resolvedHeader}
        >
            {children}
        </ShellScaffold>
    );
}
