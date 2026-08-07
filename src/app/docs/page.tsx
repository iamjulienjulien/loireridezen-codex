import Link from "next/link";

import styles from "./docs-home.module.css";
import PageShell from "@/components/layout/PageShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getContentPageDefinition } from "@/registry/pages";

const DOCUMENTATION_PAGE = getContentPageDefinition("/docs");

export const metadata = buildPageMetadata(DOCUMENTATION_PAGE);

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
        <PageShell
            page={DOCUMENTATION_PAGE}
            width="content"
            actions={
                <Link className={styles.siteLink} href="/">
                    Retour au site
                </Link>
            }
            footer={`${SECTIONS.length} ressources documentaires`}
        >
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
        </PageShell>
    );
}
