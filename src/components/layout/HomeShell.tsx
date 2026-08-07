import type { ReactNode } from "react";

import PageHeader from "@/components/PageHeader";
import type { HomePageDefinition } from "@/registry/pages";

import ShellScaffold from "./ShellScaffold";
import type { ShellHeaderSlots, ShellSharedProps } from "./types";

export type HomeShellProps = ShellSharedProps &
    ShellHeaderSlots & {
        page: HomePageDefinition;
        description?: ReactNode;
        mark?: ReactNode;
    };

export default function HomeShell({
    page,
    children,
    description = page.description,
    mark = page.mark,
    identity,
    navigation,
    actions,
    breadcrumbs,
    separator,
    headerClassName,
    ...shellProps
}: HomeShellProps) {
    return (
        <ShellScaffold
            {...shellProps}
            kind="home"
            accent={page.accent}
            color="galet"
            width="narrow"
            spacing="none"
            home
            footerDefaults={{
                spacing: "relaxed",
                signatureSpacing: "none",
            }}
            header={
                <PageHeader
                    variant="home"
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
            }
        >
            {children}
        </ShellScaffold>
    );
}
