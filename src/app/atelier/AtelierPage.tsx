import Link from "next/link";

import styles from "./atelier.module.css";

const CATEGORIES = [
    {
        title: "Couleurs",
        description:
            "La palette LRZ, ses familles, ses tokens CSS et les conventions de mise en œuvre.",
        href: "/atelier/colors",
        count: "Palette V2",
    },
    {
        title: "Typographie",
        description:
            "Les familles, presets et conventions qui donnent son rythme au Codex.",
        href: "/atelier/typography",
        count: "5 familles",
    },
    {
        title: "Composants UI",
        description:
            "Les briques visuelles du Codex : typographie, cartes, filtres, badges et navigation.",
        href: "/atelier/ui",
        count: "23 fiches",
    },
    {
        title: "Composants Doc",
        description:
            "Les éléments qui structurent les pages de documentation et les contenus de référence.",
        href: "/atelier/doc",
        count: "6 fiches",
    },
    {
        title: "Composants Métier",
        description:
            "Les fiches spécialisées qui donnent corps aux index Faune, Flore, Châteaux, Guinguettes et Personnages.",
        href: "/atelier/metier",
        count: "5 fiches",
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
