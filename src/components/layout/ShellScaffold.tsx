import type { ReactNode } from "react";

import PageFooter, { type PageFooterProps } from "@/components/PageFooter";
import type { LRZColor } from "@/types/lrz";
import type { PageKind } from "@/types/page";

import AmbientPageFrame from "./AmbientPageFrame";
import ShellContainer, {
    type ShellContainerSpacing,
    type ShellContainerWidth,
} from "./ShellContainer";
import styles from "./Shells.module.css";
import type { ShellSharedProps } from "./types";

type ShellScaffoldProps = ShellSharedProps & {
    kind: PageKind;
    accent: string;
    color: LRZColor;
    header: ReactNode;
    width: ShellContainerWidth;
    spacing?: ShellContainerSpacing;
    footerDefaults?: Omit<PageFooterProps, "children" | "color">;
    home?: boolean;
};

export default function ShellScaffold({
    children,
    kind,
    accent,
    color,
    header,
    width,
    spacing = "default",
    footer,
    footerProps,
    footerDefaults,
    frameClassName,
    frameStyle,
    containerClassName,
    mainClassName,
    home = false,
}: ShellScaffoldProps) {
    return (
        <AmbientPageFrame
            kind={kind}
            accent={accent}
            className={frameClassName}
            style={frameStyle}
        >
            <ShellContainer
                width={width}
                spacing={spacing}
                className={[
                    styles.container,
                    home && styles.homeContainer,
                    containerClassName,
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {header}
                <main
                    className={[
                        styles.main,
                        home && styles.homeMain,
                        mainClassName,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {children}
                </main>
                <PageFooter {...footerDefaults} {...footerProps} color={color}>
                    {footer}
                </PageFooter>
            </ShellContainer>
        </AmbientPageFrame>
    );
}
