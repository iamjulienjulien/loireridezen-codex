import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MarkdownAsync } from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";

import PageShell from "@/components/_shells/PageShell";
import remarkLrzDirectives from "@/lib/markdown/remark-lrz-directives";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getContentPageDefinition } from "@/registry/pages";
import DocumentationTopbar from "@/components/_docs/DocumentationTopbar";

import styles from "../api/api-docs.module.css";
import { createDocumentationComponents } from "../markdown-components";
import { headingId } from "../markdown";
import { SDK_DOCUMENTATION_SECTIONS } from "./markdown";

export const dynamic = "force-static";

const SDK_PAGE = getContentPageDefinition("/docs/sdk");

export const metadata = buildPageMetadata(SDK_PAGE);

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
        <PageShell
            page={SDK_PAGE}
            width="full"
            spacing="none"
            header={<DocumentationTopbar current="sdk" />}
            containerClassName={styles.documentationContainer}
            footer={
                <>
                    Loire Ride Zen · SDK TypeScript v0.1 ·{" "}
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
                        {SDK_DOCUMENTATION_SECTIONS.map((title) => (
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
