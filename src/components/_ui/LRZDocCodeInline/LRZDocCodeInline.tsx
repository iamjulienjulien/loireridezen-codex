import type { ComponentPropsWithoutRef } from "react";

import styles from "./LRZDocCodeInline.module.css";

export type LRZDocCodeInlineProps = ComponentPropsWithoutRef<"code">;

export default function LRZDocCodeInline({
    children,
    className,
    ...props
}: LRZDocCodeInlineProps) {
    return (
        <code
            className={[styles.code, className].filter(Boolean).join(" ")}
            {...props}
        >
            {children}
        </code>
    );
}
