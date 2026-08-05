import { isValidElement, type ReactNode } from "react";

export const headingId = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("fr")
        .replace(/[’']/g, "-")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const textContent = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }
    if (Array.isArray(node)) return node.map(textContent).join("");
    if (isValidElement<{ children?: ReactNode }>(node)) {
        return textContent(node.props.children);
    }
    return "";
};
