import {
    Children,
    isValidElement,
    type ComponentPropsWithoutRef,
    type ReactNode,
} from "react";
import { codeToHtml, type BundledLanguage } from "shiki";

import LRZDocCodeBlockClient from "./LRZDocCodeBlockClient";

type CodeElementProps = ComponentPropsWithoutRef<"code">;

export type LRZDocCodeBlockProps = Omit<
    ComponentPropsWithoutRef<"pre">,
    "children"
> & {
    children: ReactNode;

    /** Langage utilisé lorsqu’il n’est pas fourni par Markdown. */
    language?: string;

    /** Nom de fichier ou titre affiché dans l’en-tête. */
    filename?: string;
};

const LANGUAGE_ALIASES: Record<string, BundledLanguage> = {
    bash: "bash",
    shell: "shellscript",
    shellscript: "shellscript",
    sh: "shellscript",
    zsh: "shellscript",

    css: "css",
    scss: "scss",

    html: "html",

    js: "javascript",
    javascript: "javascript",

    json: "json",
    jsonc: "jsonc",

    jsx: "jsx",

    md: "markdown",
    markdown: "markdown",
    mdx: "mdx",

    sql: "sql",

    ts: "typescript",
    tsx: "tsx",
    typescript: "typescript",

    yaml: "yaml",
    yml: "yaml",
};

function extractLanguage(className?: string) {
    const match = className?.match(/(?:^|\s)language-([\w-]+)/);

    return match?.[1]?.toLowerCase();
}

function normalizeLanguage(language?: string): BundledLanguage | "text" {
    if (!language) {
        return "text";
    }

    return LANGUAGE_ALIASES[language] ?? "text";
}

function stringifyCodeChildren(children: ReactNode) {
    return Children.toArray(children)
        .map((child) => {
            if (typeof child === "string" || typeof child === "number") {
                return String(child);
            }

            return "";
        })
        .join("");
}

function extractCode(children: ReactNode) {
    const child = Children.toArray(children)[0];

    if (!isValidElement<CodeElementProps>(child)) {
        return {
            code: stringifyCodeChildren(children),
            className: undefined,
        };
    }

    return {
        code: stringifyCodeChildren(child.props.children).replace(/\n$/, ""),
        className: child.props.className,
    };
}

export default async function LRZDocCodeBlock({
    children,
    className,
    language: languageProp,
    filename,
    id,
    title,
}: LRZDocCodeBlockProps) {
    const { code, className: codeClassName } = extractCode(children);

    const markdownLanguage = extractLanguage(codeClassName);

    const language = languageProp ?? markdownLanguage;

    const normalizedLanguage = normalizeLanguage(language);

    const highlightedCode = await codeToHtml(code, {
        lang: normalizedLanguage,
        themes: {
            light: "gruvbox-light-medium",
            dark: "gruvbox-dark-medium",
        },
        defaultColor: false,
    });

    return (
        <LRZDocCodeBlockClient
            id={id}
            title={title}
            className={className}
            code={code}
            highlightedCode={highlightedCode}
            language={language}
            filename={filename}
        />
    );
}
