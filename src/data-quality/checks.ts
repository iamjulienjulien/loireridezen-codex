import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { publicEntryId } from "@/api/adapters";
import { TECHNICAL_INDEX_SOURCES } from "@/api/publication/sources";
import { INDEXES } from "@/registry/indexes";
import type {
    DataQualityInput,
    DataQualityIssue,
    DataQualityIssueCode,
    DataQualityReport,
    DataQualitySeverity,
} from "./types";

type JsonObject = Record<string, unknown>;

export const DATA_CATALOG_EXCLUSIONS: readonly string[] = [
    "catalogue-villes-villages.json",
];
export const LOIRE_CORRIDOR_BOUNDS = {
    latitude: { min: 44.5, max: 48.5 },
    longitude: { min: -2.5, max: 5 },
} as const;
export const LOIRE_CORRIDOR_WARNING_MARGIN = 0.25;
export const ALLOWED_MEDIA_EXTENSIONS = [".png", ".webp", ".svg"] as const;

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const systemFiles = new Set([".DS_Store", "Thumbs.db"]);

const isObject = (value: unknown): value is JsonObject =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const sortedIssues = (issues: DataQualityIssue[]) =>
    issues.sort((left, right) => {
        const severity =
            (left.severity === "error" ? 0 : 1) -
            (right.severity === "error" ? 0 : 1);
        if (severity !== 0) return severity;
        return [left.code, left.index ?? "", left.file ?? "", left.path ?? ""]
            .join("\0")
            .localeCompare(
                [
                    right.code,
                    right.index ?? "",
                    right.file ?? "",
                    right.path ?? "",
                ].join("\0"),
            );
    });

const duplicateValues = (values: string[]) => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    for (const value of values) {
        if (seen.has(value)) duplicates.add(value);
        seen.add(value);
    }
    return duplicates;
};

const realIsoDate = (value: string) => {
    const match = datePattern.exec(value);
    if (!match) return false;
    const [, year, month, day] = match.map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
};

const utcDay = (value: Date) =>
    `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-${String(value.getUTCDate()).padStart(2, "0")}`;

const insideCorridor = (lat: number, lng: number) =>
    lat >= LOIRE_CORRIDOR_BOUNDS.latitude.min &&
    lat <= LOIRE_CORRIDOR_BOUNDS.latitude.max &&
    lng >= LOIRE_CORRIDOR_BOUNDS.longitude.min &&
    lng <= LOIRE_CORRIDOR_BOUNDS.longitude.max;

const nearCorridorBoundary = (lat: number, lng: number) =>
    lat - LOIRE_CORRIDOR_BOUNDS.latitude.min < LOIRE_CORRIDOR_WARNING_MARGIN ||
    LOIRE_CORRIDOR_BOUNDS.latitude.max - lat < LOIRE_CORRIDOR_WARNING_MARGIN ||
    lng - LOIRE_CORRIDOR_BOUNDS.longitude.min < LOIRE_CORRIDOR_WARNING_MARGIN ||
    LOIRE_CORRIDOR_BOUNDS.longitude.max - lng < LOIRE_CORRIDOR_WARNING_MARGIN;

const exactCasePathExists = (root: string, relativePath: string) => {
    let current = root;
    for (const segment of relativePath.split("/").filter(Boolean)) {
        if (!existsSync(current) || !statSync(current).isDirectory()) {
            return false;
        }
        const match = readdirSync(current).find((name) => name === segment);
        if (!match) return false;
        current = join(current, match);
    }
    return true;
};

const caseInsensitivePathExists = (root: string, relativePath: string) => {
    let current = root;
    for (const segment of relativePath.split("/").filter(Boolean)) {
        if (!existsSync(current) || !statSync(current).isDirectory()) {
            return false;
        }
        const match = readdirSync(current).find(
            (name) => name.toLocaleLowerCase() === segment.toLocaleLowerCase(),
        );
        if (!match) return false;
        current = join(current, match);
    }
    return true;
};

const discoverFiles = (directory: string): string[] => {
    if (!existsSync(directory) || !statSync(directory).isDirectory()) return [];
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const child = join(directory, entry.name);
        if (entry.isDirectory()) return discoverFiles(child);
        return entry.isFile() ? [child] : [];
    });
};

export const inspectDataQuality = (
    input: DataQualityInput = {
        rootDir: process.cwd(),
        now: new Date(),
        siteUrl: process.env.SITE_URL ?? "",
        indexes: INDEXES,
        sources: TECHNICAL_INDEX_SOURCES,
        catalogExclusions: DATA_CATALOG_EXCLUSIONS,
    },
): DataQualityReport => {
    const issues: DataQualityIssue[] = [];
    const referencedMedia = new Set<string>();
    const publicIds = new Set<string>();
    let entriesCount = 0;

    const add = (
        code: DataQualityIssueCode,
        severity: DataQualitySeverity,
        detail: Omit<DataQualityIssue, "code" | "severity">,
    ) => issues.push({ code, severity, ...detail });

    const indexSlugs = input.indexes.map(({ slug }) => slug);
    const indexHrefs = input.indexes.map(({ href }) => href);
    const indexFiles = input.indexes.map(({ dataFile }) => dataFile);
    for (const duplicate of duplicateValues(indexSlugs)) {
        add("REGISTRY_INDEX_SLUG_DUPLICATE", "error", {
            path: "INDEXES.slug",
            message: `Le slug d’index ${duplicate} est dupliqué.`,
            value: duplicate,
        });
    }
    for (const duplicate of duplicateValues(indexHrefs)) {
        add("REGISTRY_INDEX_HREF_DUPLICATE", "error", {
            path: "INDEXES.href",
            message: `Le href ${duplicate} est dupliqué.`,
            value: duplicate,
        });
    }
    for (const duplicate of duplicateValues(indexFiles)) {
        add("REGISTRY_DATAFILE_DUPLICATE", "error", {
            path: "INDEXES.dataFile",
            message: `Le fichier ${duplicate} est associé à plusieurs index.`,
            value: duplicate,
        });
    }

    const sourcesBySlug = new Map<string, (typeof input.sources)[number]>();
    const catalogExclusions = new Set(input.catalogExclusions ?? []);
    for (const duplicate of duplicateValues(
        input.sources.map(({ slug }) => slug),
    )) {
        add("REGISTRY_SOURCE_DUPLICATE", "error", {
            index: duplicate,
            path: "TECHNICAL_INDEX_SOURCES.slug",
            message: `La source technique ${duplicate} est dupliquée.`,
        });
    }
    for (const duplicate of duplicateValues(
        input.sources.map(({ dataFile }) => dataFile),
    )) {
        add("REGISTRY_DATAFILE_DUPLICATE", "error", {
            file: `data/${duplicate}`,
            path: "TECHNICAL_INDEX_SOURCES.dataFile",
            message: `La source de données ${duplicate} est dupliquée.`,
        });
    }
    for (const source of input.sources) sourcesBySlug.set(source.slug, source);

    for (const index of input.indexes) {
        if (!slugPattern.test(index.slug)) {
            add("REGISTRY_INDEX_SLUG_INVALID", "error", {
                index: index.slug,
                path: "slug",
                message: "Le slug d’index doit être en kebab-case ASCII.",
                value: index.slug,
            });
        }
        if (index.href !== `/${index.slug}`) {
            add("REGISTRY_INDEX_HREF_MISMATCH", "error", {
                index: index.slug,
                path: "href",
                message: `Le href attendu est /${index.slug}.`,
                value: index.href,
            });
        }
        const production = index.env.includes("production");
        if ((index.etat === "publie") !== production) {
            add("REGISTRY_PUBLICATION_STATE_MISMATCH", "error", {
                index: index.slug,
                path: "etat/env",
                message:
                    "etat=publie doit être strictement équivalent à la présence de production dans env.",
            });
        }
        const source = sourcesBySlug.get(index.slug);
        const stagedWithoutSource =
            index.etat === "desactive" &&
            index.env.length === 0 &&
            catalogExclusions.has(index.dataFile);
        if (!source && !stagedWithoutSource) {
            add("REGISTRY_SOURCE_MISSING", "error", {
                index: index.slug,
                path: "TECHNICAL_INDEX_SOURCES",
                message: "Aucune source technique ne correspond à cet index.",
            });
        } else if (source && source.dataFile !== index.dataFile) {
            add("REGISTRY_DATAFILE_MISMATCH", "error", {
                index: index.slug,
                file: `data/${source.dataFile}`,
                path: "dataFile",
                message: `Le registre annonce ${index.dataFile}, la source technique ${source.dataFile}.`,
            });
        }
    }
    for (const source of input.sources) {
        if (!input.indexes.some(({ slug }) => slug === source.slug)) {
            add("REGISTRY_SOURCE_UNKNOWN", "error", {
                index: source.slug,
                path: "TECHNICAL_INDEX_SOURCES",
                message: "La source technique ne correspond à aucun index.",
            });
        }
        if (!source.collectionKey) {
            add("REGISTRY_COLLECTION_KEY_INVALID", "error", {
                index: source.slug,
                path: "collectionKey",
                message: "La clé de collection est vide.",
            });
        }
        if (!source.schema || typeof source.schema.safeParse !== "function") {
            add("REGISTRY_SCHEMA_MISSING", "error", {
                index: source.slug,
                path: "schema",
                message: "Le schéma Zod est absent.",
            });
        }
        if (typeof source.adapter !== "function") {
            add("REGISTRY_ADAPTER_MISSING", "error", {
                index: source.slug,
                path: "adapter",
                message: "L’adaptateur public est absent.",
            });
        }
    }

    const dataDirectory = join(input.rootDir, "data");
    const discoveredCatalogs = existsSync(dataDirectory)
        ? readdirSync(dataDirectory, { withFileTypes: true })
              .filter(
                  (entry) =>
                      entry.isFile() &&
                      entry.name.endsWith(".json") &&
                      !catalogExclusions.has(entry.name),
              )
              .map(({ name }) => name)
        : [];
    const registeredFiles = new Set(
        input.sources.map(({ dataFile }) => dataFile),
    );
    for (const file of discoveredCatalogs) {
        if (!registeredFiles.has(file)) {
            add("CATALOG_FILE_UNREGISTERED", "error", {
                file: `data/${file}`,
                message: "Le catalogue JSON n’a aucun descripteur technique.",
            });
        }
    }

    let siteOrigin: URL | undefined;
    try {
        siteOrigin = new URL(input.siteUrl);
        if (
            !["http:", "https:"].includes(siteOrigin.protocol) ||
            siteOrigin.username ||
            siteOrigin.password ||
            siteOrigin.pathname !== "/" ||
            siteOrigin.search ||
            siteOrigin.hash
        ) {
            siteOrigin = undefined;
        }
    } catch {
        siteOrigin = undefined;
    }

    for (const source of input.sources) {
        const definition = input.indexes.find(
            ({ slug }) => slug === source.slug,
        );
        const file = `data/${source.dataFile}`;
        const absoluteFile = join(input.rootDir, file);
        if (!existsSync(absoluteFile)) {
            add("CATALOG_FILE_MISSING", "error", {
                index: source.slug,
                file,
                message: "Le fichier de catalogue est absent.",
            });
            continue;
        }
        if (!statSync(absoluteFile).isFile()) {
            add("CATALOG_FILE_NOT_REGULAR", "error", {
                index: source.slug,
                file,
                message: "La cible du catalogue n’est pas un fichier régulier.",
            });
            continue;
        }

        let diskValue: unknown;
        try {
            diskValue = JSON.parse(readFileSync(absoluteFile, "utf8"));
        } catch (error) {
            add("CATALOG_JSON_INVALID", "error", {
                index: source.slug,
                file,
                message: `Le JSON est invalide : ${error instanceof Error ? error.message : String(error)}.`,
            });
            continue;
        }
        if (!isDeepStrictEqual(diskValue, source.raw)) {
            add("CATALOG_IMPORT_MISMATCH", "error", {
                index: source.slug,
                file,
                path: "raw",
                message:
                    "La donnée importée ne correspond pas au fichier annoncé.",
            });
        }

        let validatedCatalog: JsonObject | undefined;
        if (source.schema && typeof source.schema.safeParse === "function") {
            const parsed = source.schema.safeParse(diskValue);
            if (!parsed.success) {
                for (const problem of parsed.error.issues) {
                    add("CATALOG_SCHEMA_INVALID", "error", {
                        index: source.slug,
                        file,
                        path: problem.path.join(".") || "<root>",
                        message: problem.message,
                    });
                }
            } else if (isObject(parsed.data)) {
                validatedCatalog = parsed.data;
            }
        }
        const catalog = isObject(diskValue) ? diskValue : {};
        const catalogMeta = isObject(catalog.meta) ? catalog.meta : {};
        const expectedCatalogState =
            definition?.etat === "publie" ? "publie" : "brouillon";
        if (catalogMeta.etat !== expectedCatalogState) {
            add("CATALOG_PUBLICATION_STATE_MISMATCH", "error", {
                index: source.slug,
                file,
                path: "meta.etat",
                message: `Le catalogue doit être ${expectedCatalogState} lorsque l’index est ${definition?.etat ?? "absent"}.`,
                value: catalogMeta.etat,
            });
        }
        const collection =
            validatedCatalog?.[source.collectionKey] ??
            catalog[source.collectionKey];
        if (!Array.isArray(collection)) {
            add("CATALOG_COLLECTION_NOT_ARRAY", "error", {
                index: source.slug,
                file,
                path: source.collectionKey,
                message: "La clé de collection ne pointe pas vers un tableau.",
            });
            continue;
        }
        entriesCount += collection.length;

        const meta = isObject(catalog.meta) ? catalog.meta : {};
        const updatedAt = meta.maj;
        if (typeof updatedAt !== "string" || !datePattern.test(updatedAt)) {
            add("DATE_FORMAT_INVALID", "error", {
                index: source.slug,
                file,
                path: "meta.maj",
                message: "La date doit respecter exactement YYYY-MM-DD.",
                value: updatedAt,
            });
        } else if (!realIsoDate(updatedAt)) {
            add("DATE_CALENDAR_INVALID", "error", {
                index: source.slug,
                file,
                path: "meta.maj",
                message: "La date n’existe pas dans le calendrier.",
                value: updatedAt,
            });
        } else if (updatedAt > utcDay(input.now)) {
            add("DATE_IN_FUTURE", "error", {
                index: source.slug,
                file,
                path: "meta.maj",
                message: `La date dépasse le jour UTC ${utcDay(input.now)}.`,
                value: updatedAt,
            });
        }

        const slugs = collection.map((entry) =>
            isObject(entry) ? entry.slug : undefined,
        );
        for (const duplicate of duplicateValues(
            slugs.filter((slug): slug is string => typeof slug === "string"),
        )) {
            add("ENTRY_SLUG_DUPLICATE", "error", {
                index: source.slug,
                file,
                path: source.collectionKey,
                message: `Le slug ${duplicate} est dupliqué dans l’index.`,
                value: duplicate,
            });
        }

        for (const [entryIndex, value] of collection.entries()) {
            if (!isObject(value)) continue;
            const basePath = `${source.collectionKey}[${entryIndex}]`;
            const slug = value.slug;
            if (typeof slug !== "string" || !slugPattern.test(slug)) {
                add("ENTRY_SLUG_INVALID", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.slug`,
                    message: "Le slug doit être en kebab-case ASCII.",
                    value: slug,
                });
            } else {
                const id = publicEntryId(source.slug, slug);
                if (id !== `${source.slug}:${slug}`) {
                    add("ENTRY_PUBLIC_ID_INVALID", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.slug`,
                        message:
                            "La dérivation de l’identifiant public diverge.",
                        value: id,
                    });
                }
                if (publicIds.has(id)) {
                    add("ENTRY_PUBLIC_ID_DUPLICATE", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.slug`,
                        message: `L’identifiant public ${id} est dupliqué.`,
                    });
                }
                publicIds.add(id);
            }

            if ("coordonnees" in value) {
                const coordinates = value.coordonnees;
                const path = `${basePath}.coordonnees`;
                const lat = isObject(coordinates) ? coordinates.lat : undefined;
                const lng = isObject(coordinates) ? coordinates.lng : undefined;
                if (
                    typeof lat !== "number" ||
                    typeof lng !== "number" ||
                    !Number.isFinite(lat) ||
                    !Number.isFinite(lng)
                ) {
                    add("COORDINATES_NOT_FINITE", "error", {
                        index: source.slug,
                        file,
                        path,
                        message: "Latitude et longitude doivent être finies.",
                        value: coordinates,
                    });
                } else if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                    add("COORDINATES_WORLD_BOUNDS_INVALID", "error", {
                        index: source.slug,
                        file,
                        path,
                        message:
                            "Les coordonnées dépassent les bornes mondiales.",
                        value: coordinates,
                    });
                } else if (lat === 0 && lng === 0) {
                    add("COORDINATES_ZERO_SENTINEL", "error", {
                        index: source.slug,
                        file,
                        path,
                        message: "Le point sentinelle 0,0 est interdit.",
                    });
                } else if (!insideCorridor(lat, lng)) {
                    const swapped = insideCorridor(lng, lat);
                    add(
                        swapped
                            ? "COORDINATES_LIKELY_SWAPPED"
                            : "COORDINATES_OUTSIDE_CORRIDOR",
                        "error",
                        {
                            index: source.slug,
                            file,
                            path,
                            message: swapped
                                ? "Latitude et longitude semblent inversées."
                                : "Les coordonnées sont hors du corridor ligérien.",
                            value: coordinates,
                        },
                    );
                } else if (nearCorridorBoundary(lat, lng)) {
                    add("COORDINATES_NEAR_CORRIDOR_BOUNDARY", "warning", {
                        index: source.slug,
                        file,
                        path,
                        message:
                            "Les coordonnées sont proches d’une limite du corridor.",
                        value: coordinates,
                    });
                }
            }

            const customEmoji = value.customEmoji;
            if (customEmoji === undefined) {
                if (
                    definition?.etat === "publie" &&
                    source.mediaRequired !== false
                ) {
                    add("MEDIA_REQUIRED_FOR_PUBLISHED_ENTRY", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.customEmoji`,
                        message:
                            "Une entrée publiée doit posséder une illustration.",
                    });
                } else if (definition?.etat !== "publie") {
                    add("MEDIA_MISSING_FOR_UNPUBLISHED_ENTRY", "warning", {
                        index: source.slug,
                        file,
                        path: `${basePath}.customEmoji`,
                        message:
                            "L’illustration de cette entrée WIP est encore absente.",
                    });
                }
                continue;
            }
            if (typeof customEmoji !== "string" || customEmoji.length === 0) {
                add("MEDIA_PATH_INVALID", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message: "Le chemin média est invalide.",
                    value: customEmoji,
                });
                continue;
            }
            referencedMedia.add(customEmoji);
            let decoded = customEmoji;
            try {
                decoded = decodeURIComponent(customEmoji);
            } catch {
                add("MEDIA_PATH_INVALID", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message: "Le chemin contient un encodage URI invalide.",
                    value: customEmoji,
                });
            }
            if (
                customEmoji.includes("\0") ||
                customEmoji.includes("\\") ||
                customEmoji.includes("?") ||
                customEmoji.includes("#")
            ) {
                add("MEDIA_PATH_INVALID", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message:
                        "Le chemin ne peut contenir NUL, backslash, query string ou fragment.",
                    value: customEmoji,
                });
            }
            if (decoded.split("/").includes("..")) {
                add("MEDIA_PATH_TRAVERSAL", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message: "La traversée de répertoire est interdite.",
                    value: customEmoji,
                });
            }
            const expectedPrefix = `/emoji/${source.mediaDirectory}/`;
            if (!customEmoji.startsWith(expectedPrefix)) {
                add("MEDIA_DIRECTORY_MISMATCH", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message: `Le chemin doit commencer par ${expectedPrefix}.`,
                    value: customEmoji,
                });
            }
            const extension = extname(customEmoji);
            if (
                !ALLOWED_MEDIA_EXTENSIONS.includes(
                    extension as (typeof ALLOWED_MEDIA_EXTENSIONS)[number],
                )
            ) {
                add("MEDIA_EXTENSION_INVALID", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message: `Extension non autorisée : ${extension || "<absente>"}.`,
                    value: customEmoji,
                });
            }

            const publicRoot = resolve(input.rootDir, "public");
            const mediaRoot = resolve(publicRoot, "emoji");
            const target = resolve(publicRoot, customEmoji.replace(/^\/+/, ""));
            const fromMediaRoot = relative(mediaRoot, target);
            if (
                fromMediaRoot.startsWith(`..${sep}`) ||
                fromMediaRoot === ".." ||
                resolve(target) === mediaRoot
            ) {
                add("MEDIA_PATH_TRAVERSAL", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message: "La cible sort de public/emoji.",
                    value: customEmoji,
                });
            } else if (!existsSync(target)) {
                const relativePublicPath = customEmoji.replace(/^\/+/, "");
                if (caseInsensitivePathExists(publicRoot, relativePublicPath)) {
                    add("MEDIA_PATH_CASE_MISMATCH", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.customEmoji`,
                        message: "La casse du chemin diffère du fichier réel.",
                        value: customEmoji,
                    });
                } else {
                    add("MEDIA_FILE_MISSING", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.customEmoji`,
                        message: "Aucun fichier ne correspond sous public/.",
                        value: customEmoji,
                    });
                }
            } else {
                const relativePublicPath = customEmoji.replace(/^\/+/, "");
                if (!exactCasePathExists(publicRoot, relativePublicPath)) {
                    add("MEDIA_PATH_CASE_MISMATCH", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.customEmoji`,
                        message: "La casse du chemin diffère du fichier réel.",
                        value: customEmoji,
                    });
                }
                if (!statSync(target).isFile()) {
                    add("MEDIA_TARGET_NOT_FILE", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.customEmoji`,
                        message:
                            "La cible média n’est pas un fichier régulier.",
                        value: customEmoji,
                    });
                }
            }

            if (!siteOrigin) {
                add("MEDIA_PUBLIC_URL_INVALID", "error", {
                    index: source.slug,
                    file,
                    path: `${basePath}.customEmoji`,
                    message: "SITE_URL doit être une origine HTTP(S) valide.",
                    value: input.siteUrl,
                });
            } else {
                try {
                    const publicUrl = new URL(customEmoji, siteOrigin);
                    if (
                        publicUrl.origin !== siteOrigin.origin ||
                        publicUrl.pathname !== customEmoji
                    ) {
                        throw new Error("origin or path mismatch");
                    }
                } catch {
                    add("MEDIA_PUBLIC_URL_INVALID", "error", {
                        index: source.slug,
                        file,
                        path: `${basePath}.customEmoji`,
                        message:
                            "L’URL publique ne reste pas sur l’origine du site.",
                        value: customEmoji,
                    });
                }
            }
        }

        if (definition?.etat === "publie" && input.exposedEntryCount) {
            const exposed = input.exposedEntryCount(source.slug);
            if (exposed !== collection.length) {
                add("REGISTRY_EXPOSED_COUNT_MISMATCH", "error", {
                    index: source.slug,
                    file,
                    path: source.collectionKey,
                    message: `Le registre expose ${String(exposed)} entrées au lieu de ${collection.length}.`,
                });
            }
        }
    }

    const mediaRoot = join(input.rootDir, "public", "emoji");
    const mediaFiles = discoverFiles(mediaRoot);
    let usefulMediaFiles = 0;
    for (const absoluteFile of mediaFiles) {
        const pathFromPublic = `/${relative(
            join(input.rootDir, "public"),
            absoluteFile,
        )
            .split(sep)
            .join("/")}`;
        const name = absoluteFile.split(sep).at(-1) ?? "";
        if (systemFiles.has(name)) {
            add("MEDIA_SYSTEM_FILE", "warning", {
                file: `public${pathFromPublic}`,
                message: "Un fichier système parasite est présent.",
            });
            continue;
        }
        if (
            ALLOWED_MEDIA_EXTENSIONS.includes(
                extname(name) as (typeof ALLOWED_MEDIA_EXTENSIONS)[number],
            )
        ) {
            usefulMediaFiles += 1;
            if (!referencedMedia.has(pathFromPublic)) {
                add("MEDIA_ORPHAN", "warning", {
                    file: `public${pathFromPublic}`,
                    message: "Le média n’est référencé par aucune entrée.",
                });
            }
        }
    }

    sortedIssues(issues);
    return {
        issues,
        summary: {
            indexes: input.indexes.length,
            entries: entriesCount,
            referencedMedia: referencedMedia.size,
            mediaFiles: usefulMediaFiles,
            errors: issues.filter(({ severity }) => severity === "error")
                .length,
            warnings: issues.filter(({ severity }) => severity === "warning")
                .length,
        },
    };
};
