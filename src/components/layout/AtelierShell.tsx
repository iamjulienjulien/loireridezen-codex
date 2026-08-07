import type { ReactNode } from "react";

import PageHeader from "@/components/PageHeader";
import type { AtelierPageDefinition } from "@/types/page";

import ShellScaffold from "./ShellScaffold";
import type {
    ConfigurableShellLayoutProps,
    ShellHeaderSlots,
    ShellSharedProps,
} from "./types";

export type AtelierShellProps = ShellSharedProps &
    ShellHeaderSlots &
    ConfigurableShellLayoutProps & {
        page: AtelierPageDefinition;
        description?: ReactNode;
        mark?: ReactNode;
    };

export default function AtelierShell({
    page,
    children,
    width = "wide",
    spacing = "compact",
    description = page.description,
    mark = page.mark,
    identity,
    navigation,
    actions,
    breadcrumbs,
    separator,
    headerClassName,
    ...shellProps
}: AtelierShellProps) {
    return (
        <ShellScaffold
            {...shellProps}
            kind="atelier"
            accent={page.accent}
            color={page.color}
            width={width}
            spacing={spacing}
            header={
                <PageHeader
                    variant="atelier"
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
