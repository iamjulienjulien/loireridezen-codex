import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import type { EntryAdapter } from "@/api/adapters";
import { getPublishedEntries } from "@/api/publication/registry";
import {
    TECHNICAL_INDEX_SOURCES,
    type TechnicalIndexSource,
} from "@/api/publication/sources";
import { INDEXES, type IndexEntry, type IndexSlug } from "@/registry/indexes";
import { DATA_CATALOG_EXCLUSIONS, inspectDataQuality } from "./checks";
import { formatDataQualityReport } from "./report";
import type {
    DataQualityInput,
    DataQualityIssueCode,
    DataQualityReport,
} from "./types";

type MutableCatalog = {
    meta: { maj: string; etat: "publie" | "brouillon" };
    entries: Array<Record<string, unknown>>;
};

type Fixture = {
    rootDir: string;
    indexes: IndexEntry[];
    sources: TechnicalIndexSource[];
    catalogs: MutableCatalog[];
    skipMedia: Set<string>;
    directories: string[];
    extraFiles: Record<string, string>;
    catalogExclusions: string[];
};

const fixtureSchema = z.object({
    meta: z.object({
        maj: z.string(),
        etat: z.enum(["publie", "brouillon"]),
    }),
    entries: z.array(
        z
            .object({
                slug: z.string(),
                customEmoji: z.string().optional(),
                coordonnees: z
                    .object({ lat: z.number(), lng: z.number() })
                    .optional(),
            })
            .passthrough(),
    ),
});

const adapter = (() => {
    throw new Error("The fixture adapter must not be executed.");
}) as EntryAdapter;

const buildDefinition = (
    slug: IndexSlug,
    dataFile: string,
    etat: IndexEntry["etat"] = "publie",
): IndexEntry => ({
    ...INDEXES[0],
    slug,
    href: `/${slug}`,
    dataFile,
    etat,
    env: etat === "publie" ? ["development", "staging", "production"] : [],
});

const addBundle = (
    fixture: Fixture,
    slug: IndexSlug,
    mediaPrefix: string,
    dataFile: string,
) => {
    const catalog: MutableCatalog = {
        meta: { maj: "2026-07-08", etat: "publie" },
        entries: [
            {
                slug: "entry",
                customEmoji: `${mediaPrefix}entry.png`,
                coordonnees: { lat: 47, lng: 1 },
            },
        ],
    };
    fixture.indexes.push(buildDefinition(slug, dataFile));
    fixture.catalogs.push(catalog);
    fixture.sources.push({
        slug,
        dataFile,
        collectionKey: "entries",
        raw: catalog,
        schema: fixtureSchema,
        adapter,
        mediaPrefix,
    });
};

const writeFixture = (fixture: Fixture) => {
    for (const source of fixture.sources) {
        const file = join(fixture.rootDir, "data", source.dataFile);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, `${JSON.stringify(source.raw, null, 2)}\n`);
    }
    for (const catalog of fixture.catalogs) {
        for (const entry of catalog.entries) {
            const media = entry.customEmoji;
            if (
                typeof media !== "string" ||
                fixture.skipMedia.has(media) ||
                !media.startsWith("/")
            ) {
                continue;
            }
            const file = join(
                fixture.rootDir,
                "public",
                media.replace(/^\/+/, ""),
            );
            mkdirSync(dirname(file), { recursive: true });
            writeFileSync(file, "fixture");
        }
    }
    for (const directory of fixture.directories) {
        mkdirSync(join(fixture.rootDir, directory), { recursive: true });
    }
    for (const [relativeFile, content] of Object.entries(fixture.extraFiles)) {
        const file = join(fixture.rootDir, relativeFile);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, content);
    }
};

const runFixture = (
    mutate: (fixture: Fixture) => void = () => undefined,
    siteUrl = "https://example.test",
): DataQualityReport => {
    const fixture: Fixture = {
        rootDir: mkdtempSync(join(tmpdir(), "lrz-data-quality-")),
        indexes: [],
        sources: [],
        catalogs: [],
        skipMedia: new Set(),
        directories: [],
        extraFiles: {},
        catalogExclusions: [],
    };
    addBundle(
        fixture,
        "faune",
        "/illustrations/faune/",
        "catalogue-faune.json",
    );
    try {
        mutate(fixture);
        writeFixture(fixture);
        const input: DataQualityInput = {
            rootDir: fixture.rootDir,
            now: new Date("2026-07-25T12:00:00Z"),
            siteUrl,
            indexes: fixture.indexes,
            sources: fixture.sources,
            catalogExclusions: fixture.catalogExclusions,
        };
        return inspectDataQuality(input);
    } finally {
        rmSync(fixture.rootDir, { recursive: true, force: true });
    }
};

const issuesWith = (report: DataQualityReport, code: DataQualityIssueCode) =>
    report.issues.filter((issue) => issue.code === code);

const expectIssue = (
    report: DataQualityReport,
    code: DataQualityIssueCode,
    severity: "error" | "warning" = "error",
) => {
    const issue = issuesWith(report, code)[0];
    expect(issue).toMatchObject({
        code,
        severity,
        index: expect.any(String),
        file: expect.any(String),
        path: expect.any(String),
    });
};

describe("data quality mutations", () => {
    it("accepts a coherent minimal catalog", () => {
        expect(runFixture().summary).toMatchObject({ errors: 0, warnings: 0 });
    });

    it("allows an explicitly staged draft catalog without a technical source", () => {
        const report = runFixture((fixture) => {
            const dataFile = "catalogue-villes-villages.json";
            const definition = buildDefinition(
                "villes-villages",
                dataFile,
                "desactive",
            );

            definition.env = [];
            fixture.indexes.push(definition);
            fixture.catalogExclusions.push(dataFile);
            fixture.extraFiles[`data/${dataFile}`] = "{}\n";
        });

        expect(issuesWith(report, "REGISTRY_SOURCE_MISSING")).toHaveLength(0);
        expect(issuesWith(report, "CATALOG_FILE_UNREGISTERED")).toHaveLength(0);
    });

    it("detects a duplicate entry slug and public ID", () => {
        const report = runFixture(({ catalogs }) => {
            catalogs[0].entries.push({ ...catalogs[0].entries[0] });
        });
        expectIssue(report, "ENTRY_SLUG_DUPLICATE");
        expectIssue(report, "ENTRY_PUBLIC_ID_DUPLICATE");
    });

    it("allows the same entry slug in different indexes", () => {
        const report = runFixture((fixture) => {
            addBundle(
                fixture,
                "flore",
                "/illustrations/flore/",
                "catalogue-flore.json",
            );
        });
        expect(issuesWith(report, "ENTRY_PUBLIC_ID_DUPLICATE")).toHaveLength(0);
        expect(report.summary.errors).toBe(0);
    });

    it("detects duplicate technical sources", () => {
        const report = runFixture(({ sources }) => {
            sources.push({ ...sources[0] });
        });
        const issue = issuesWith(report, "REGISTRY_SOURCE_DUPLICATE")[0];
        expect(issue).toMatchObject({
            severity: "error",
            index: "faune",
            path: "TECHNICAL_INDEX_SOURCES.slug",
        });
    });

    it.each([
        ["2026-02-30", "DATE_CALENDAR_INVALID"],
        ["2026-07-26", "DATE_IN_FUTURE"],
    ] as const)("detects the invalid date %s", (date, code) => {
        const report = runFixture(({ catalogs }) => {
            catalogs[0].meta.maj = date;
        });
        expectIssue(report, code);
    });

    it.each([
        [{ lat: 0, lng: 0 }, "COORDINATES_ZERO_SENTINEL"],
        [{ lat: 1, lng: 47 }, "COORDINATES_LIKELY_SWAPPED"],
        [{ lat: Number.NaN, lng: 1 }, "COORDINATES_NOT_FINITE"],
        [{ lat: 91, lng: 1 }, "COORDINATES_WORLD_BOUNDS_INVALID"],
        [{ lat: 43, lng: 1 }, "COORDINATES_OUTSIDE_CORRIDOR"],
    ] as const)("detects invalid coordinates as %s", (coordinates, code) => {
        const report = runFixture(({ catalogs }) => {
            catalogs[0].entries[0].coordonnees = coordinates;
        });
        expectIssue(report, code);
    });

    it("warns near the corridor boundary", () => {
        const report = runFixture(({ catalogs }) => {
            catalogs[0].entries[0].coordonnees = { lat: 44.6, lng: 1 };
        });
        expectIssue(report, "COORDINATES_NEAR_CORRIDOR_BOUNDARY", "warning");
        expect(report.summary.errors).toBe(0);
    });

    it.each([
        ["../../secret.png", "MEDIA_PATH_TRAVERSAL"],
        ["/illustrations/faune/missing.png", "MEDIA_FILE_MISSING"],
        ["/illustrations/faune/entry.PNG", "MEDIA_EXTENSION_INVALID"],
        ["/illustrations/faune/entry.png?size=2", "MEDIA_PATH_INVALID"],
    ] as const)("detects the media mutation %s", (media, code) => {
        const report = runFixture(({ catalogs, skipMedia }) => {
            catalogs[0].entries[0].customEmoji = media;
            skipMedia.add(media);
        });
        expectIssue(report, code);
    });

    it("detects a path case mismatch", () => {
        const report = runFixture(({ catalogs, skipMedia, extraFiles }) => {
            const media = "/illustrations/faune/Entry.png";
            catalogs[0].entries[0].customEmoji = media;
            skipMedia.add(media);
            extraFiles["public/illustrations/faune/entry.png"] = "fixture";
        });
        expectIssue(report, "MEDIA_PATH_CASE_MISMATCH");
    });

    it("rejects a directory used as a media target", () => {
        const report = runFixture(({ catalogs, skipMedia, directories }) => {
            const media = "/illustrations/faune/folder.png";
            catalogs[0].entries[0].customEmoji = media;
            skipMedia.add(media);
            directories.push("public/illustrations/faune/folder.png");
        });
        expectIssue(report, "MEDIA_TARGET_NOT_FILE");
    });

    it("requires media for a published entry", () => {
        const report = runFixture(({ catalogs }) => {
            delete catalogs[0].entries[0].customEmoji;
        });
        expectIssue(report, "MEDIA_REQUIRED_FOR_PUBLISHED_ENTRY");
    });

    it("allows missing media for an unpublished entry with a warning", () => {
        const report = runFixture(({ catalogs, indexes }) => {
            delete catalogs[0].entries[0].customEmoji;
            catalogs[0].meta.etat = "brouillon";
            indexes[0] = buildDefinition(
                "faune",
                "catalogue-faune.json",
                "desactive",
            );
        });
        expectIssue(report, "MEDIA_MISSING_FOR_UNPUBLISHED_ENTRY", "warning");
        expect(report.summary.errors).toBe(0);
    });

    it("detects a mismatched data file", () => {
        const report = runFixture(({ indexes }) => {
            indexes[0] = { ...indexes[0], dataFile: "other.json" };
        });
        const issue = issuesWith(report, "REGISTRY_DATAFILE_MISMATCH")[0];
        expect(issue).toMatchObject({
            severity: "error",
            index: "faune",
            file: "data/catalogue-faune.json",
            path: "dataFile",
        });
    });

    it("detects a mismatch with the exposed published count", () => {
        const fixture: Fixture = {
            rootDir: mkdtempSync(join(tmpdir(), "lrz-exposed-count-")),
            indexes: [],
            sources: [],
            catalogs: [],
            skipMedia: new Set(),
            directories: [],
            extraFiles: {},
            catalogExclusions: [],
        };
        addBundle(
            fixture,
            "faune",
            "/illustrations/faune/",
            "catalogue-faune.json",
        );
        try {
            writeFixture(fixture);
            const report = inspectDataQuality({
                rootDir: fixture.rootDir,
                now: new Date("2026-07-25T12:00:00Z"),
                siteUrl: "https://example.test",
                indexes: fixture.indexes,
                sources: fixture.sources,
                exposedEntryCount: () => 0,
            });
            expectIssue(report, "REGISTRY_EXPOSED_COUNT_MISMATCH");
        } finally {
            rmSync(fixture.rootDir, { recursive: true, force: true });
        }
    });

    it("detects a catalog state that contradicts its index state", () => {
        const report = runFixture(({ catalogs }) => {
            catalogs[0].meta.etat = "brouillon";
        });

        expectIssue(report, "CATALOG_PUBLICATION_STATE_MISMATCH");
    });

    it("detects a wrongly associated schema", () => {
        const report = runFixture(({ sources }) => {
            sources[0] = { ...sources[0], schema: z.never() };
        });
        expectIssue(report, "CATALOG_SCHEMA_INVALID");
    });

    it("detects an unregistered JSON catalog", () => {
        const report = runFixture(({ extraFiles }) => {
            extraFiles["data/rogue.json"] = "{}\n";
        });
        const issue = issuesWith(report, "CATALOG_FILE_UNREGISTERED")[0];
        expect(issue).toMatchObject({
            severity: "error",
            file: "data/rogue.json",
        });
    });

    it("detects invalid registry slugs and hrefs", () => {
        const report = runFixture(({ indexes }) => {
            indexes[0] = { ...indexes[0], slug: "Faune", href: "/animals" };
        });
        expect(issuesWith(report, "REGISTRY_INDEX_SLUG_INVALID")).toHaveLength(
            1,
        );
        expect(issuesWith(report, "REGISTRY_INDEX_HREF_MISMATCH")).toHaveLength(
            1,
        );
    });

    it.each([
        ["desactive", ["development", "production"]],
        ["publie", ["development"]],
    ] as const)("detects etat/env contradiction for %s", (etat, env) => {
        const report = runFixture(({ indexes }) => {
            indexes[0] = { ...indexes[0], etat, env: [...env] };
        });
        expect(
            issuesWith(report, "REGISTRY_PUBLICATION_STATE_MISMATCH"),
        ).toHaveLength(1);
    });

    it("warns about orphan and system media files", () => {
        const report = runFixture(({ extraFiles }) => {
            extraFiles["public/illustrations/faune/orphan.svg"] = "<svg/>";
            extraFiles["public/illustrations/faune/.DS_Store"] = "system";
        });
        expect(issuesWith(report, "MEDIA_ORPHAN")[0]).toMatchObject({
            severity: "warning",
            file: "public/illustrations/faune/orphan.svg",
        });
        expect(issuesWith(report, "MEDIA_SYSTEM_FILE")[0]).toMatchObject({
            severity: "warning",
            file: "public/illustrations/faune/.DS_Store",
        });
    });

    it.each(["ftp://example.test", "not a URL", "https://example.test/path"])(
        "rejects the SITE_URL origin %s",
        (siteUrl) => {
            const report = runFixture(() => undefined, siteUrl);
            expectIssue(report, "MEDIA_PUBLIC_URL_INVALID");
        },
    );

    it("rejects media URLs changing origin", () => {
        const report = runFixture(({ catalogs, skipMedia }) => {
            const media = "https://evil.test/entry.png";
            catalogs[0].entries[0].customEmoji = media;
            skipMedia.add(media);
        });
        expectIssue(report, "MEDIA_PUBLIC_URL_INVALID");
    });

    it("aggregates and sorts several errors", () => {
        const report = runFixture(({ catalogs }) => {
            catalogs[0].meta.maj = "2026-02-30";
            catalogs[0].entries.push({ ...catalogs[0].entries[0] });
        });
        expect(report.summary.errors).toBeGreaterThanOrEqual(3);
        expect(report.issues[0].severity).toBe("error");
        expect(report.issues.map(({ code }) => code)).toEqual(
            [...report.issues.map(({ code }) => code)].sort(),
        );
    });
});

describe("real editorial data", () => {
    it("contains no blocking issue", () => {
        process.env.SITE_URL = "https://example.test";
        const report = inspectDataQuality({
            rootDir: process.cwd(),
            now: new Date(),
            siteUrl: "https://example.test",
            indexes: INDEXES,
            sources: TECHNICAL_INDEX_SOURCES,
            catalogExclusions: DATA_CATALOG_EXCLUSIONS,
            exposedEntryCount: (slug) => getPublishedEntries(slug)?.length,
        });

        console.log(formatDataQualityReport(report));
        expect(report.summary).toMatchObject({
            indexes: 10,
            entries: 524,
            referencedMedia: 382,
            mediaFiles: 382,
            errors: 0,
        });
        expect(report.summary.warnings).toBeGreaterThanOrEqual(0);
    });
});
