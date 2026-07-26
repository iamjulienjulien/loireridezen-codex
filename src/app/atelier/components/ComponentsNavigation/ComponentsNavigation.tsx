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
    {
        id: "lrz-accordion",
        label: "LRZAccordion",
        href: "/atelier/components/lrz-accordion",
    },
    {
        id: "lrz-separateur",
        label: "LRZSeparateur",
        href: "/atelier/components/lrz-separateur",
    },
    {
        id: "lrz-section",
        label: "LRZSection",
        href: "/atelier/components/lrz-section",
    },
    {
        id: "lrz-card",
        label: "LRZCard",
        href: "/atelier/components/lrz-card",
    },
    {
        id: "lrz-meta-list",
        label: "LRZMetaList",
        href: "/atelier/components/lrz-meta-list",
    },
    {
        id: "lrz-typography",
        label: "LRZTypography",
        href: "/atelier/components/lrz-typography",
    },
    {
        id: "lrz-doc-code-block",
        label: "LRZDocCodeBlock",
        href: "/atelier/components/lrz-doc-code-block",
    },
    {
        id: "lrz-doc-code-inline",
        label: "LRZDocCodeInline",
        href: "/atelier/components/lrz-doc-code-inline",
    },
    {
        id: "lrz-doc-list",
        label: "LRZDocList",
        href: "/atelier/components/lrz-doc-list",
    },
    {
        id: "lrz-doc-quote",
        label: "LRZDocQuote",
        href: "/atelier/components/lrz-doc-quote",
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
