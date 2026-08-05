import { posix } from "node:path";

export { headingId, textContent } from "../markdown";

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

export const documentationHref = (href: string) => {
    if (!href.startsWith("./") && !href.startsWith("../")) return href;
    const [path, fragment] = href.split("#", 2);
    const repositoryPath = posix.normalize(posix.join("docs/api", path));
    return `${REPOSITORY_BLOB_ROOT}${repositoryPath}${
        fragment ? `#${fragment}` : ""
    }`;
};
