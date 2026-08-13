import type { Components } from "react-markdown";

import LRZDocCallout, {
    type LRZDocCalloutVariant,
} from "@/components/_ui/LRZDocCallout";
import LRZDocCodeBlock from "@/components/_ui/LRZDocCodeBlock";
import LRZDocCodeInline from "@/components/_ui/LRZDocCodeInline";
import LRZDocList from "@/components/_ui/LRZDocList";
import LRZDocQuote, {
    type LRZDocQuoteVariant,
} from "@/components/_ui/LRZDocQuote";
import LRZDocTable, {
    type LRZDocTableVariant,
} from "@/components/_ui/LRZDocTable";

import { headingId, textContent } from "./markdown";

type CreateDocumentationComponentsOptions = {
    anchorClassName: string;
    resolveHref?: (href: string) => string;
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

export const createDocumentationComponents = ({
    anchorClassName,
    resolveHref = (href) => href,
}: CreateDocumentationComponentsOptions): Components => {
    const sectionHeading = (level: 2 | 3, children: React.ReactNode) => {
        const id = headingId(textContent(children));
        const Heading = level === 2 ? "h2" : "h3";

        return (
            <Heading id={id}>
                {children}

                <a
                    className={anchorClassName}
                    href={`#${id}`}
                    aria-label="Lien direct vers cette section"
                >
                    #
                </a>
            </Heading>
        );
    };

    return {
        h2: ({ children }) => sectionHeading(2, children),

        h3: ({ children }) => sectionHeading(3, children),

        a: ({ children, href }) => (
            <a href={resolveHref(href ?? "")}>{children}</a>
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

            return (
                <LRZDocCallout
                    {...asideProps}
                    variant={variant}
                    title={title}
                    icon={icon === "none" ? null : icon}
                    compact={rawCompact === "true"}
                >
                    {children}
                </LRZDocCallout>
            );
        },

        pre: ({ children, ...props }) => (
            <LRZDocCodeBlock {...props}>{children}</LRZDocCodeBlock>
        ),

        code: ({ children, className, ...props }) => {
            if (className?.startsWith("language-")) {
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
                    variant={
                        isTableVariant(rawVariant) ? rawVariant : "default"
                    }
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
};
