import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownAsync } from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";

import remarkLrzDirectives from "@/lib/markdown/remark-lrz-directives";

import styles from "../api/api-docs.module.css";
import { createDocumentationComponents } from "../markdown-components";
import { headingId } from "../markdown";
import { SDK_DOCUMENTATION_SECTIONS } from "./markdown";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "SDK TypeScript — Le Codex ligérien",
    description:
        "Guide du SDK TypeScript officiel de l’API publique du Codex ligérien, avec intégration Expo et React Native.",
};

const GUIDE_PATH = join(process.cwd(), "packages", "codex-sdk", "README.md");

const readGuide = () => {
    try {
        const guide = readFileSync(GUIDE_PATH, "utf8").trim();

        if (!guide) {
            throw new Error("the file is empty");
        }

        return guide;
    } catch (error) {
        throw new Error(
            `Unable to build /docs/sdk from ${GUIDE_PATH}: ${
                error instanceof Error ? error.message : String(error)
            }`,
        );
    }
};

const markdownComponents = createDocumentationComponents({
    anchorClassName: styles.anchor,
});

export default function SdkDocumentationPage() {
    const guide = readGuide();

    return (
        <div className={styles.page}>
            <header className={styles.topbar}>
                <Link className={styles.brand} href="/">
                    <span aria-hidden="true">🌊</span>
                    <span>Le Codex ligérien</span>
                </Link>

                <nav className={styles.primaryNav} aria-label="Liens SDK">
                    <Link href="/docs">Documentation</Link>
                    <Link href="/docs/api">API</Link>
                    <a href="/api/v1/openapi.json">OpenAPI</a>
                    <a href="https://github.com/iamjulienjulien/loireridezen-codex/tree/main/packages/codex-sdk">
                        Source
                    </a>
                </nav>
            </header>

            <div className={styles.shell}>
                <aside className={styles.sidebar} aria-label="Sommaire">
                    <p className={styles.sidebarLabel}>Sur cette page</p>

                    <ol>
                        {SDK_DOCUMENTATION_SECTIONS.map((title) => (
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
                <span>Loire Ride Zen · SDK TypeScript v0.1</span>

                <a href="#demarrage-rapide">Revenir au démarrage rapide</a>
            </footer>
        </div>
    );
}
