import type { ReactNode } from "react";
import Link from "next/link";

import styles from "@/app/atelier/atelier.module.css";

type AtelierCategoryLayoutProps = {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
};

export default function AtelierCategoryLayout({
    eyebrow,
    title,
    description,
    children,
}: AtelierCategoryLayoutProps) {
    return (
        <>
            <div className={styles.wrap}>
                <header className={styles.categoryHeader}>
                    <div className={styles.categoryLinks}>
                        <Link className={styles.siteLink} href="/">
                            ← Retour à Loire Ride Zen
                        </Link>
                        <Link className={styles.atelierLink} href="/atelier">
                            Sommaire de l’Atelier
                        </Link>
                    </div>
                    <p className={styles.eyebrow}>{eyebrow}</p>
                    <h1 className={styles.categoryTitle}>{title}</h1>
                    <p className={styles.categoryLede}>{description}</p>
                </header>
                {children}
            </div>
        </>
    );
}
