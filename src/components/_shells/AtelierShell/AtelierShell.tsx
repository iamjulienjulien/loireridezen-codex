import type { ReactNode } from "react";

import PageHeader from "@/components/_layout/PageHeader";
import type { AtelierPageDefinition } from "@/types/page";

import ShellScaffold from "../ShellScaffold";
import type {
    ConfigurableShellLayoutProps,
    ShellHeaderSlots,
    ShellSharedProps,
} from "../types";

export type AtelierShellProps = ShellSharedProps &
    ShellHeaderSlots &
    ConfigurableShellLayoutProps & {
        page: AtelierPageDefinition;
        header?: ReactNode | false;
        description?: ReactNode;
        mark?: ReactNode;
    };

export default function AtelierShell({
    page,
    children,
    width = "wide",
    spacing = "compact",
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
}: AtelierShellProps) {
    const resolvedHeader =
        header === undefined ? (
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
        ) : (
            header
        );

    return (
        <ShellScaffold
            {...shellProps}
            kind="atelier"
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
