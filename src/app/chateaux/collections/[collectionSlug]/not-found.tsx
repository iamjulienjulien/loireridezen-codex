// src/app/chateaux/collections/[collectionSlug]/not-found.tsx

import Link from "next/link";

import styles from "./page.module.css";

export default function CollectionNotFound() {
    return (
        <main className={styles.notFoundPage}>
            <section className={styles.notFoundCard}>
                <span className={styles.notFoundMark} aria-hidden="true">
                    🗝️
                </span>

                <p className={styles.notFoundEyebrow}>Collection introuvable</p>

                <h1 className={styles.notFoundTitle}>
                    Cette porte du Codex ne s’ouvre pas
                </h1>

                <p className={styles.notFoundDescription}>
                    La collection demandée n’existe pas, n’est plus publiée ou
                    attend encore d’être inscrite au registre.
                </p>

                <div className={styles.notFoundActions}>
                    <Link href="/chateaux" className={styles.notFoundPrimary}>
                        Retour aux châteaux
                    </Link>

                    <Link href="/" className={styles.notFoundSecondary}>
                        Retour au Codex
                    </Link>
                </div>
            </section>
        </main>
    );
}
