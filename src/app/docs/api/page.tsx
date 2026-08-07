import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";

import remarkLrzDirectives from "@/lib/markdown/remark-lrz-directives";
import { buildPageMetadata } from "@/lib/site-metadata";
import { createDocumentationComponents } from "../markdown-components";
import { getContentPageDefinition } from "@/registry/pages";

import {
    API_DOCUMENTATION_SECTIONS,
    documentationHref,
    headingId,
} from "./markdown";

import styles from "./api-docs.module.css";

export const dynamic = "force-static";

export const metadata = buildPageMetadata(
    getContentPageDefinition("/docs/api"),
);

const GUIDE_PATH = join(process.cwd(), "docs", "api", "README.md");

const readGuide = () => {
    try {
        const guide = readFileSync(GUIDE_PATH, "utf8").trim();

        if (!guide) {
            throw new Error("the file is empty");
        }

        return guide;
    } catch (error) {
        throw new Error(
            `Unable to build /docs/api from ${GUIDE_PATH}: ${
                error instanceof Error ? error.message : String(error)
            }`,
        );
    }
};

const markdownComponents = createDocumentationComponents({
    anchorClassName: styles.anchor,
    resolveHref: documentationHref,
});

export default function ApiDocumentationPage() {
    const guide = readGuide();

    return (
        <div className={styles.page}>
            <header className={styles.topbar}>
                <Link className={styles.brand} href="/">
                    <span aria-hidden="true">🌊</span>
                    <span>Le Codex ligérien</span>
                </Link>

                <nav className={styles.primaryNav} aria-label="Liens API">
                    <Link href="/docs">Documentation</Link>
                    <Link href="/docs/sdk">SDK TypeScript</Link>
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
                    <MarkdownAsync
                        components={markdownComponents}
                        remarkPlugins={[
                            remarkGfm,
                            remarkDirective,
                            remarkLrzDirectives,
                        ]}
                    >
                        {guide}
                    </MarkdownAsync>
                </main>
            </div>

            <footer className={styles.footer}>
                <span>Loire Ride Zen · API publique V1</span>

                <a href="#demarrage-rapide">Revenir au démarrage rapide</a>
            </footer>
        </div>
    );
}
