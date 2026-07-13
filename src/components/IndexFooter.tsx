"use client";

import type { ReactNode } from "react";
import AmbianceSelector from "./AmbianceSelector";
import type { Ambiance } from "@/registry/ambiances";
import styles from "./IndexFooter.module.css";

export type { Ambiance } from "@/registry/ambiances";

export default function IndexFooter({
    ambiance,
    onAmbiance,
    children,
}: {
    ambiance: Ambiance;
    onAmbiance: (a: Ambiance) => void;
    children: ReactNode;
}) {
    return (
        <footer className={styles.footer}>
            <div className={styles.separator} aria-hidden />
            <AmbianceSelector ambiance={ambiance} onAmbiance={onAmbiance} />
            <p className={styles.foot}>{children}</p>
        </footer>
    );
}
