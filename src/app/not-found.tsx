import type { Metadata } from "next";
import Link from "next/link";

import styles from "./route-error.module.css";

export const metadata: Metadata = {
    title: "Page introuvable · Le Codex Ligérien",
    description:
        "Cette rive du Codex Ligérien n’existe pas ou n’est plus accessible.",
};

export default function NotFound() {
    return (
        <main className={styles.page}>
            <section className={styles.card} aria-labelledby="not-found-title">
                <p className={styles.eyebrow}>Erreur 404 · Rive introuvable</p>
                <span className={styles.mark} aria-hidden="true">
                    ◇
                </span>
                <h1 id="not-found-title" className={styles.title}>
                    Le fil de la Loire s’arrête ici.
                </h1>
                <p className={styles.description}>
                    Cette page a peut-être changé de rive. Revenez au grand
                    inventaire pour reprendre le voyage.
                </p>
                <div className={styles.actions}>
                    <Link className={styles.primaryAction} href="/">
                        Revenir au Codex
                    </Link>
                    <Link className={styles.secondaryAction} href="/carte">
                        Ouvrir la carte
                    </Link>
                </div>
            </section>
        </main>
    );
}
