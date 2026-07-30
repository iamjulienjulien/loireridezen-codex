import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownAsync, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";

import remarkLrzDirectives from "@/lib/markdown/remark-lrz-directives";

import LRZDocCodeBlock from "@/components/LRZDocCodeBlock/LRZDocCodeBlock";
import LRZDocCodeInline from "@/components/LRZDocCodeInline/LRZDocCodeInline";

import {
    API_DOCUMENTATION_SECTIONS,
    documentationHref,
    headingId,
    textContent,
} from "./markdown";

import styles from "./api-docs.module.css";
import LRZDocList from "@/components/LRZDocList/LRZDocList";
import LRZDocQuote, {
    type LRZDocQuoteVariant,
} from "@/components/LRZDocQuote/LRZDocQuote";
import LRZDocCallout, {
    type LRZDocCalloutVariant,
} from "@/components/LRZDocCallout/LRZDocCallout";
import LRZDocTable, {
    LRZDocTableVariant,
} from "@/components/LRZDocTable/LRZDocTable";

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

const QUOTE_VARIANTS: readonly LRZDocQuoteVariant[] = [
    "default",
    "highlight",
    "fieldNote",
    "testimonial",
];

const isQuoteVariant = (value: unknown): value is LRZDocQuoteVariant =>
    typeof value === "string" &&
    QUOTE_VARIANTS.includes(value as LRZDocQuoteVariant);

type MarkdownBlockquoteProps = React.ComponentPropsWithoutRef<"blockquote"> & {
    "data-lrz-quote"?: string;
    "data-variant"?: string;
    "data-label"?: string;
    "data-author"?: string;
    "data-source"?: string;
};

const CALLOUT_VARIANTS: readonly LRZDocCalloutVariant[] = [
    "info",
    "tip",
    "warning",
    "danger",
    "success",
];

const isCalloutVariant = (value: unknown): value is LRZDocCalloutVariant =>
    typeof value === "string" &&
    CALLOUT_VARIANTS.includes(value as LRZDocCalloutVariant);

type MarkdownAsideProps = React.ComponentPropsWithoutRef<"aside"> & {
    "data-lrz-callout"?: string;
    "data-variant"?: string;
    "data-title"?: string;
    "data-icon"?: string;
    "data-compact"?: string;
};

const TABLE_VARIANTS: readonly LRZDocTableVariant[] = [
    "default",
    "compact",
    "striped",
    "comparison",
];

const isTableVariant = (value: unknown): value is LRZDocTableVariant =>
    typeof value === "string" &&
    TABLE_VARIANTS.includes(value as LRZDocTableVariant);

type MarkdownDivProps = React.ComponentPropsWithoutRef<"div"> & {
    "data-lrz-table"?: string;
    "data-variant"?: string;
    "data-title"?: string;
    "data-description"?: string;
    "data-emphasize-first-column"?: string;
};

const markdownComponents: Components = {
    h2: ({ children }) => sectionHeading(2, children),

    h3: ({ children }) => sectionHeading(3, children),

    a: ({ children, href }) => (
        <a href={documentationHref(href ?? "")}>{children}</a>
    ),

    blockquote: ({ children, ...props }) => {
        const {
            "data-variant": rawVariant,
            "data-label": label,
            "data-author": author,
            "data-source": source,
            cite,
            ...blockquoteProps
        } = props as MarkdownBlockquoteProps;

        const variant = isQuoteVariant(rawVariant) ? rawVariant : "default";

        return (
            <LRZDocQuote
                {...blockquoteProps}
                variant={variant}
                label={label}
                author={author}
                source={source}
                cite={cite}
            >
                {children}
            </LRZDocQuote>
        );
    },

    aside: ({ children, ...props }) => {
        const {
            "data-variant": rawVariant,
            "data-title": title,
            "data-icon": icon,
            "data-compact": rawCompact,
            ...asideProps
        } = props as MarkdownAsideProps;

        const variant = isCalloutVariant(rawVariant) ? rawVariant : "info";

        const compact = rawCompact === "true";

        return (
            <LRZDocCallout
                {...asideProps}
                variant={variant}
                title={title}
                icon={icon === "none" ? null : icon}
                compact={compact}
            >
                {children}
            </LRZDocCallout>
        );
    },

    pre: ({ children, ...props }) => (
        <LRZDocCodeBlock {...props}>{children}</LRZDocCodeBlock>
    ),

    code: ({ children, className, ...props }) => {
        const isCodeBlock = className?.startsWith("language-");

        if (isCodeBlock) {
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }

        return (
            <LRZDocCodeInline className={className} {...props}>
                {children}
            </LRZDocCodeInline>
        );
    },

    table: ({ children, ...props }) => <table {...props}>{children}</table>,

    div: ({ children, ...props }) => {
        const {
            "data-lrz-table": isLrzTable,
            "data-variant": rawVariant,
            "data-title": title,
            "data-description": description,
            "data-emphasize-first-column": rawEmphasize,
            ...divProps
        } = props as MarkdownDivProps;

        if (isLrzTable !== "true") {
            return <div {...divProps}>{children}</div>;
        }

        return (
            <LRZDocTable
                {...divProps}
                variant={isTableVariant(rawVariant) ? rawVariant : "default"}
                title={title}
                description={description}
                emphasizeFirstColumn={rawEmphasize === "true"}
            >
                {children}
            </LRZDocTable>
        );
    },

    ul: ({ children, ...props }) => (
        <LRZDocList variant="compact" {...props}>
            {children}
        </LRZDocList>
    ),

    ol: ({ children, ...props }) => (
        <LRZDocList ordered {...props}>
            {children}
        </LRZDocList>
    ),
};

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
