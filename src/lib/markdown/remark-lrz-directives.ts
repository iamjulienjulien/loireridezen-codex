import type { Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const QUOTE_VARIANTS = new Set([
    "default",
    "highlight",
    "fieldNote",
    "testimonial",
]);

const CALLOUT_VARIANTS = new Set([
    "info",
    "tip",
    "warning",
    "danger",
    "success",
]);

const normalizeQuoteVariant = (value: string | null | undefined): string => {
    if (value && QUOTE_VARIANTS.has(value)) {
        return value;
    }

    return "default";
};

const normalizeCalloutVariant = (value: string | null | undefined): string => {
    if (value && CALLOUT_VARIANTS.has(value)) {
        return value;
    }

    return "info";
};

const TABLE_VARIANTS = new Set(["default", "compact", "striped", "comparison"]);

const normalizeTableVariant = (value: string | null | undefined): string => {
    if (value && TABLE_VARIANTS.has(value)) {
        return value;
    }

    return "default";
};

const remarkLrzDirectives: Plugin<[], Root> = () => {
    return (tree: Root) => {
        visit(tree, "containerDirective", (node: ContainerDirective) => {
            const attributes = node.attributes ?? {};

            node.data ??= {};

            if (node.name === "quote") {
                node.data.hName = "blockquote";

                node.data.hProperties = {
                    "data-lrz-quote": "true",
                    "data-variant": normalizeQuoteVariant(attributes.variant),
                    ...(attributes.label
                        ? {
                              "data-label": attributes.label,
                          }
                        : {}),
                    ...(attributes.author
                        ? {
                              "data-author": attributes.author,
                          }
                        : {}),
                    ...(attributes.source
                        ? {
                              "data-source": attributes.source,
                          }
                        : {}),
                    ...(attributes.cite
                        ? {
                              cite: attributes.cite,
                          }
                        : {}),
                };

                return;
            }

            if (node.name === "callout") {
                node.data.hName = "aside";

                node.data.hProperties = {
                    "data-lrz-callout": "true",
                    "data-variant": normalizeCalloutVariant(attributes.variant),
                    ...(attributes.title
                        ? {
                              "data-title": attributes.title,
                          }
                        : {}),
                    ...(attributes.icon
                        ? {
                              "data-icon": attributes.icon,
                          }
                        : {}),
                    ...(attributes.compact
                        ? {
                              "data-compact": attributes.compact,
                          }
                        : {}),
                };
            }

            if (node.name === "table") {
                node.data.hName = "div";

                node.data.hProperties = {
                    "data-lrz-table": "true",
                    "data-variant": normalizeTableVariant(attributes.variant),
                    ...(attributes.title
                        ? {
                              "data-title": attributes.title,
                          }
                        : {}),
                    ...(attributes.description
                        ? {
                              "data-description": attributes.description,
                          }
                        : {}),
                    ...(attributes.emphasizeFirstColumn !== undefined
                        ? {
                              "data-emphasize-first-column": "true",
                          }
                        : {}),
                };

                return;
            }
        });
    };
};

export default remarkLrzDirectives;
