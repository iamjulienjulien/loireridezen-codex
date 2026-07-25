import Link from "next/link";
import styles from "./ComponentsNavigation.module.css";

const COMPONENTS = [
    {
        id: "lrz-badge",
        label: "LRZBadge",
        href: "/atelier/components/lrz-badge",
    },
    {
        id: "lrz-anecdote",
        label: "LRZAnecdote",
        href: "/atelier/components/lrz-anecdote",
    },
] as const;

type ComponentId = (typeof COMPONENTS)[number]["id"];

export default function ComponentsNavigation({
    current,
}: {
    current: ComponentId;
}) {
    return (
        <nav className={styles.navigation} aria-label="Composants UI">
            <span className={styles.title}>Composants UI</span>
            <ul className={styles.list}>
                {COMPONENTS.map((component) => {
                    const isCurrent = component.id === current;

                    return (
                        <li key={component.id}>
                            <Link
                                className={`${styles.link} ${isCurrent ? styles.active : ""}`}
                                href={component.href}
                                aria-current={isCurrent ? "page" : undefined}
                            >
                                <span className={styles.dot} aria-hidden />
                                {component.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
