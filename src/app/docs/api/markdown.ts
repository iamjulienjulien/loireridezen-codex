import { isValidElement, type ReactNode } from "react";
import { posix } from "node:path";

const REPOSITORY_BLOB_ROOT =
    "https://github.com/iamjulienjulien/loireridezen-codex/blob/main/";

export const API_DOCUMENTATION_SECTIONS = [
    "Démarrage rapide",
    "Parcours conseillé",
    "Exemples curl",
    "JavaScript",
    "TypeScript",
    "Modèle de données",
    "Erreurs",
    "CORS et cache",
    "Attribution et licences",
    "OpenAPI et Bruno",
    "Développement local et source",
] as const;

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

export const documentationHref = (href: string) => {
    if (!href.startsWith("./") && !href.startsWith("../")) return href;
    const [path, fragment] = href.split("#", 2);
    const repositoryPath = posix.normalize(posix.join("docs/api", path));
    return `${REPOSITORY_BLOB_ROOT}${repositoryPath}${
        fragment ? `#${fragment}` : ""
    }`;
};
