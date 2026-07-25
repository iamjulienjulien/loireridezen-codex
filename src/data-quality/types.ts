import type { TechnicalIndexSource } from "@/api/publication/sources";
import type { IndexEntry } from "@/registry/indexes";

export const DATA_QUALITY_CODES = [
    "REGISTRY_INDEX_SLUG_INVALID",
    "REGISTRY_INDEX_SLUG_DUPLICATE",
    "REGISTRY_INDEX_HREF_DUPLICATE",
    "REGISTRY_INDEX_HREF_MISMATCH",
    "REGISTRY_DATAFILE_DUPLICATE",
    "REGISTRY_SOURCE_DUPLICATE",
    "REGISTRY_SOURCE_MISSING",
    "REGISTRY_SOURCE_UNKNOWN",
    "REGISTRY_DATAFILE_MISMATCH",
    "REGISTRY_COLLECTION_KEY_INVALID",
    "REGISTRY_SCHEMA_MISSING",
    "REGISTRY_ADAPTER_MISSING",
    "REGISTRY_PUBLICATION_STATE_MISMATCH",
    "REGISTRY_EXPOSED_COUNT_MISMATCH",
    "CATALOG_FILE_MISSING",
    "CATALOG_FILE_NOT_REGULAR",
    "CATALOG_FILE_UNREGISTERED",
    "CATALOG_JSON_INVALID",
    "CATALOG_SCHEMA_INVALID",
    "CATALOG_IMPORT_MISMATCH",
    "CATALOG_COLLECTION_NOT_ARRAY",
    "ENTRY_SLUG_INVALID",
    "ENTRY_SLUG_DUPLICATE",
    "ENTRY_PUBLIC_ID_INVALID",
    "ENTRY_PUBLIC_ID_DUPLICATE",
    "DATE_FORMAT_INVALID",
    "DATE_CALENDAR_INVALID",
    "DATE_IN_FUTURE",
    "COORDINATES_NOT_FINITE",
    "COORDINATES_WORLD_BOUNDS_INVALID",
    "COORDINATES_ZERO_SENTINEL",
    "COORDINATES_LIKELY_SWAPPED",
    "COORDINATES_OUTSIDE_CORRIDOR",
    "COORDINATES_NEAR_CORRIDOR_BOUNDARY",
    "MEDIA_PATH_INVALID",
    "MEDIA_PATH_TRAVERSAL",
    "MEDIA_DIRECTORY_MISMATCH",
    "MEDIA_EXTENSION_INVALID",
    "MEDIA_FILE_MISSING",
    "MEDIA_PATH_CASE_MISMATCH",
    "MEDIA_TARGET_NOT_FILE",
    "MEDIA_PUBLIC_URL_INVALID",
    "MEDIA_REQUIRED_FOR_PUBLISHED_ENTRY",
    "MEDIA_MISSING_FOR_UNPUBLISHED_ENTRY",
    "MEDIA_ORPHAN",
    "MEDIA_SYSTEM_FILE",
] as const;

export type DataQualityIssueCode = (typeof DATA_QUALITY_CODES)[number];
export type DataQualitySeverity = "error" | "warning";

export interface DataQualityIssue {
    code: DataQualityIssueCode;
    severity: DataQualitySeverity;
    index?: string;
    file?: string;
    path?: string;
    message: string;
    value?: unknown;
}

export interface DataQualitySummary {
    indexes: number;
    entries: number;
    referencedMedia: number;
    mediaFiles: number;
    errors: number;
    warnings: number;
}

export interface DataQualityReport {
    issues: DataQualityIssue[];
    summary: DataQualitySummary;
}

export interface DataQualityInput {
    rootDir: string;
    now: Date;
    siteUrl: string;
    indexes: readonly IndexEntry[];
    sources: readonly TechnicalIndexSource[];
    catalogExclusions?: readonly string[];
    exposedEntryCount?: (slug: string) => number | undefined;
}
