import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";

import PageShell from "@/components/layout/PageShell";
import remarkLrzDirectives from "@/lib/markdown/remark-lrz-directives";
import { buildPageMetadata } from "@/lib/site-metadata";
import { createDocumentationComponents } from "../markdown-components";
import { getContentPageDefinition } from "@/registry/pages";
import DocumentationTopbar from "../DocumentationTopbar";

import {
    API_DOCUMENTATION_SECTIONS,
    documentationHref,
    headingId,
} from "./markdown";

import styles from "./api-docs.module.css";

export const dynamic = "force-static";

const API_PAGE = getContentPageDefinition("/docs/api");

export const metadata = buildPageMetadata(API_PAGE);

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
        <PageShell
            page={API_PAGE}
            width="full"
            spacing="none"
            header={<DocumentationTopbar current="api" />}
            containerClassName={styles.documentationContainer}
            footer={
                <>
                    Loire Ride Zen · API publique V1 ·{" "}
                    <a href="/docs/sdk">SDK TypeScript</a> ·{" "}
                    <a href="#demarrage-rapide">Revenir au démarrage rapide</a>
                </>
            }
            footerProps={{
                className: styles.documentationFooter,
                signatureSpacing: "none",
            }}
        >
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

                <article className={styles.content}>
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
                </article>
            </div>
        </PageShell>
    );
}
