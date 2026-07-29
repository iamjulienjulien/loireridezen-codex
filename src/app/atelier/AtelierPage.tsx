import Link from "next/link";

import styles from "./atelier.module.css";

const CATEGORIES = [
    {
        title: "Composants UI",
        description:
            "Les briques visuelles du Codex : typographie, cartes, filtres, badges et navigation.",
        href: "/atelier/ui",
        count: "12 fiches",
    },
    {
        title: "Composants Doc",
        description:
            "Les éléments qui structurent les pages de documentation et les contenus de référence.",
        href: "/atelier/doc",
        count: "4 fiches",
    },
    {
        title: "Composants Métier",
        description:
            "Les fiches spécialisées qui donnent corps aux index Faune, Flore et Châteaux.",
        href: "/atelier/metier",
        count: "3 fiches",
    },
    {
        title: "Composants Collections",
        description:
            "Les composants éditoriaux des classements, podiums, héros et listes de collections.",
        href: "/atelier/collections",
        count: "8 fiches",
    },
] as const;

export default function AtelierHomePage() {
    return (
        <main className={styles.page}>
            <div className={styles.wrap}>
                <header className={styles.homeHeader}>
                    <Link className={styles.siteLink} href="/">
                        ← Retour à Loire Ride Zen
                    </Link>
                    <p className={styles.eyebrow}>Loire Ride Zen · Codex</p>
                    <h1 className={styles.homeTitle}>Atelier</h1>
                    <p className={styles.homeLede}>
                        Le sommaire du système de composants ligérien. Chaque
                        famille mène vers ses fiches, ses variantes et ses
                        exemples de mise en œuvre.
                    </p>
                </header>

                <nav
                    className={styles.categoryGrid}
                    aria-label="Familles de composants"
                >
                    {CATEGORIES.map((category, index) => (
                        <Link
                            key={category.href}
                            href={category.href}
                            className={styles.categoryCard}
                        >
                            <span className={styles.categoryIndex}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className={styles.categoryCount}>
                                {category.count}
                            </span>
                            <h2>{category.title}</h2>
                            <p>{category.description}</p>
                            <span className={styles.categoryAction}>
                                Explorer <span aria-hidden="true">→</span>
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </main>
    );
}
