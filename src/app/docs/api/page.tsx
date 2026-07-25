import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import {
    API_DOCUMENTATION_SECTIONS,
    documentationHref,
    headingId,
    textContent,
} from "./markdown";
import styles from "./api-docs.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Documentation API — Le Codex ligérien",
    description:
        "Guide de démarrage et référence narrative de l’API publique du Codex ligérien.",
};

const GUIDE_PATH = join(process.cwd(), "docs", "api", "README.md");

const readGuide = () => {
    try {
        const guide = readFileSync(GUIDE_PATH, "utf8").trim();
        if (!guide) throw new Error("the file is empty");
        return guide;
    } catch (error) {
        throw new Error(
            `Unable to build /docs/api from ${GUIDE_PATH}: ${
                error instanceof Error ? error.message : String(error)
            }`,
        );
    }
};

const sectionHeading = (level: 2 | 3, children: React.ReactNode) => {
    const id = headingId(textContent(children));
    const Heading = level === 2 ? "h2" : "h3";
    return (
        <Heading id={id}>
            {children}
            <a
                className={styles.anchor}
                href={`#${id}`}
                aria-label="Lien direct vers cette section"
            >
                #
            </a>
        </Heading>
    );
};

const markdownComponents: Components = {
    h2: ({ children }) => sectionHeading(2, children),
    h3: ({ children }) => sectionHeading(3, children),
    a: ({ children, href }) => (
        <a href={documentationHref(href ?? "")}>{children}</a>
    ),
    blockquote: ({ children }) => (
        <blockquote className={styles.notice}>{children}</blockquote>
    ),
    pre: ({ children }) => <pre className={styles.codeBlock}>{children}</pre>,
    code: ({ children, className }) => (
        <code className={className}>{children}</code>
    ),
    table: ({ children }) => (
        <div className={styles.tableScroll}>
            <table>{children}</table>
        </div>
    ),
};

export default function ApiDocumentationPage() {
    const guide = readGuide();

    return (
        <div className={styles.page}>
            <header className={styles.topbar}>
                <Link className={styles.brand} href="/">
                    <span aria-hidden>🌊</span>
                    <span>Le Codex ligérien</span>
                </Link>
                <nav className={styles.primaryNav} aria-label="Liens API">
                    <a href="/api/v1">API</a>
                    <a href="/api/v1/openapi.json">OpenAPI</a>
                    <a href="https://github.com/iamjulienjulien/loireridezen-codex/tree/main/docs/api">
                        Source
                    </a>
                </nav>
            </header>

            <div className={styles.shell}>
                <aside className={styles.sidebar} aria-label="Sommaire">
                    <p className={styles.sidebarLabel}>Sur cette page</p>
                    <ol>
                        {API_DOCUMENTATION_SECTIONS.map((title) => (
                            <li key={title}>
                                <a href={`#${headingId(title)}`}>{title}</a>
                            </li>
                        ))}
                    </ol>
                </aside>

                <main className={styles.content}>
                    <ReactMarkdown components={markdownComponents}>
                        {guide}
                    </ReactMarkdown>
                </main>
            </div>

            <footer className={styles.footer}>
                <span>Loire Ride Zen · API publique V1</span>
                <a href="#demarrage-rapide">Revenir au démarrage rapide</a>
            </footer>
        </div>
    );
}
