import type { Metadata } from "next";
import Link from "next/link";

import styles from "./docs-home.module.css";
import PageFooter from "@/components/PageFooter";
import { getCanonicalUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
    title: "Documentation — Le Codex ligérien",
    description: "Les guides et références techniques du Codex ligérien.",
    alternates: {
        canonical: getCanonicalUrl("/docs"),
    },
};

const SECTIONS = [
    {
        href: "/docs/api",
        label: "API publique · V1",
        title: "API du Codex",
        description:
            "Démarrage rapide, ressources disponibles et référence narrative de l’API publique.",
        meta: "Guide & référence",
    },
    {
        href: "/docs/sdk",
        label: "SDK TypeScript · V0.1",
        title: "SDK du Codex",
        description:
            "Installation, client typé, gestion des erreurs et intégration React Native/Expo.",
        meta: "Guide d’intégration",
    },
] as const;

export default function DocumentationHomePage() {
    return (
        <main className={styles.page}>
            <header className={styles.topbar}>
                <Link className={styles.brand} href="/">
                    <span aria-hidden="true">🌊</span>
                    <span>Le Codex ligérien</span>
                </Link>

                <Link className={styles.siteLink} href="/">
                    Retour au site
                </Link>
            </header>

            <section className={styles.hero}>
                <p className={styles.eyebrow}>Documentation</p>
                <h1>Guides et références du Codex.</h1>
                <p>
                    Les ressources pour explorer, intégrer et comprendre les
                    données du Codex ligérien.
                </p>
            </section>

            <section className={styles.catalog} aria-labelledby="rubriques">
                <header className={styles.catalogHeader}>
                    <p className={styles.eyebrow}>Rubriques</p>
                    <h2 id="rubriques">Commencer ici</h2>
                    <span>{SECTIONS.length} ressources</span>
                </header>

                <div className={styles.grid}>
                    {SECTIONS.map((section) => (
                        <Link
                            className={styles.card}
                            href={section.href}
                            key={section.href}
                        >
                            <span className={styles.cardLabel}>
                                {section.label}
                            </span>
                            <h3>{section.title}</h3>
                            <p>{section.description}</p>
                            <span className={styles.cardFooter}>
                                {section.meta}
                                <span aria-hidden="true">→</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <PageFooter />
        </main>
    );
}
