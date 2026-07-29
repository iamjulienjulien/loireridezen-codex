"use client";

import type { ReactNode } from "react";
import styles from "./IndexFooter.module.css";

export default function IndexFooter({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <footer className={styles.footer}>
            <div className={styles.separator} aria-hidden />
            <p className={styles.foot}>{children}</p>
        </footer>
    );
}
