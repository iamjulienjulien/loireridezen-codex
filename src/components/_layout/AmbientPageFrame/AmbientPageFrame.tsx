import type { CSSProperties, ReactNode } from "react";

import type { PageKind } from "@/types/page";

import styles from "./AmbientPageFrame.module.css";

type AmbientPageFrameStyle = CSSProperties & {
    "--page-accent"?: string;
};

export type AmbientPageFrameProps = {
    children: ReactNode;
    kind: PageKind;
    accent?: string;
    className?: string;
    style?: CSSProperties;
};

export default function AmbientPageFrame({
    children,
    kind,
    accent,
    className,
    style,
}: AmbientPageFrameProps) {
    const frameStyle = {
        ...style,
        ...(accent ? { "--page-accent": accent } : {}),
    } as AmbientPageFrameStyle;

    return (
        <div
            className={[styles.frame, className].filter(Boolean).join(" ")}
            data-ambient-page-frame=""
            data-page-kind={kind}
            style={frameStyle}
        >
            <div className={styles.content}>{children}</div>
        </div>
    );
}
