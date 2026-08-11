"use client";

import { useEffect } from "react";
import Link from "next/link";

import "./globals.css";
import styles from "./route-error.module.css";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="fr" data-mode="jour">
            <body>
                <title>Erreur · Le Codex Ligérien</title>
                <main className={styles.page}>
                    <section
                        className={styles.card}
                        aria-labelledby="global-error-title"
                    >
                        <p className={styles.eyebrow}>Incident de navigation</p>
                        <span className={styles.mark} aria-hidden="true">
                            ◇
                        </span>
                        <h1 id="global-error-title" className={styles.title}>
                            Le courant nous a fait perdre le fil.
                        </h1>
                        <p className={styles.description}>
                            Une erreur inattendue empêche cette rive de
                            s’afficher. Vous pouvez tenter de reprendre la
                            navigation.
                        </p>
                        <div className={styles.actions}>
                            <button
                                className={styles.primaryAction}
                                type="button"
                                onClick={reset}
                            >
                                Réessayer
                            </button>
                            <Link className={styles.secondaryAction} href="/">
                                Revenir au Codex
                            </Link>
                        </div>
                    </section>
                </main>
            </body>
        </html>
    );
}
