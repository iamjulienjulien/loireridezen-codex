import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

import { describe, expect, it } from "vitest";

import { ATELIER_PAGE_DEFINITIONS } from "@/registry/atelier-pages";
import { getIndexBySlug } from "@/registry/indexes";
import { PAGE_CATEGORY_CONTRACT } from "@/types/page";

import {
    ATELIER_PAGE,
    COLLECTION_PAGE_DEFINITIONS,
    CONTENT_PAGES,
    PAGE_DEFINITIONS,
    getPageDefinition,
    getPageKind,
} from "./pages";

const APP_DIRECTORY = join(process.cwd(), "src", "app");

const getAppPageFiles = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) return getAppPageFiles(path);
        if (entry.isFile() && entry.name === "page.tsx") return [path];

        return [];
    });

const toRoutePathname = (pageFile: string): string => {
    const routeSegments = relative(APP_DIRECTORY, pageFile)
        .split(sep)
        .slice(0, -1)
        .filter((segment) => !/^\(.+\)$/u.test(segment));

    return routeSegments.length === 0 ? "/" : `/${routeSegments.join("/")}`;
};

describe("page registry", () => {
    it("classifies every App Router page in one of the five categories", () => {
        const unclassifiedRoutes = getAppPageFiles(APP_DIRECTORY)
            .map(toRoutePathname)
            .filter((pathname) => getPageKind(pathname) === undefined);

        expect(unclassifiedRoutes).toEqual([]);
    });

    it("uses the shared PageHeader for every page category", () => {
        expect(PAGE_CATEGORY_CONTRACT).toMatchObject({
            home: { header: "page-header" },
            index: { header: "page-header" },
            collection: { header: "page-header" },
            page: { header: "page-header" },
            atelier: { header: "page-header" },
        });
    });

    it("classifies documentation routes as Page documentation variants", () => {
        const documentationPages = CONTENT_PAGES.filter(
            (page) => page.variant === "documentation",
        );

        expect(documentationPages.map((page) => page.href)).toEqual([
            "/docs",
            "/docs/api",
            "/docs/sdk",
        ]);
        expect(documentationPages.every((page) => page.kind === "page")).toBe(
            true,
        );
    });

    it("keeps Personnages as a feature-gated Page", () => {
        expect(
            CONTENT_PAGES.find((page) => page.href === "/personnages"),
        ).toMatchObject({
            kind: "page",
            variant: "editorial",
            featureFlag: "personnages",
        });
    });

    it("classifies every Atelier subpage through its dedicated route family", () => {
        expect(getPageKind("/atelier")).toBe("atelier");
        expect(getPageKind("/atelier/components/lrz-card")).toBe("atelier");
        expect(getPageDefinition("/atelier/components/lrz-card")).toMatchObject(
            {
                kind: "atelier",
                href: "/atelier/components/lrz-card",
            },
        );
        expect(getPageDefinition("/atelier/route-inconnue")).toBe(ATELIER_PAGE);
    });

    it("declares metadata for every Atelier page file", () => {
        const atelierRoutes = getAppPageFiles(join(APP_DIRECTORY, "atelier"))
            .map(toRoutePathname)
            .sort();
        const declaredRoutes = ATELIER_PAGE_DEFINITIONS.map(
            (page) => page.href,
        ).sort();

        expect(declaredRoutes).toEqual(atelierRoutes);
        expect(
            ATELIER_PAGE_DEFINITIONS.every(
                (page) => page.seo.indexable === false,
            ),
        ).toBe(true);
    });

    it("requires every collection to reference an existing parent index", () => {
        for (const collection of COLLECTION_PAGE_DEFINITIONS) {
            const parent = getIndexBySlug(collection.indexSlug);

            expect(parent?.href).toBe(collection.indexHref);
            expect(getPageKind(collection.href)).toBe("collection");
        }
    });

    it("does not declare the same canonical route twice", () => {
        const hrefs = PAGE_DEFINITIONS.map((definition) => definition.href);

        expect(new Set(hrefs).size).toBe(hrefs.length);
    });

    it("keeps public SEO copy within the validated target lengths", () => {
        const publicPages = PAGE_DEFINITIONS.filter(
            (definition) => definition.kind !== "atelier",
        );

        for (const page of publicPages) {
            const title = page.seo?.title ?? page.title;
            const description = page.seo?.description ?? page.description;

            expect(title.length, `${page.href} title`).toBeGreaterThanOrEqual(
                50,
            );
            expect(title.length, `${page.href} title`).toBeLessThanOrEqual(60);
            expect(
                description.length,
                `${page.href} description`,
            ).toBeGreaterThanOrEqual(120);
            expect(
                description.length,
                `${page.href} description`,
            ).toBeLessThanOrEqual(160);
        }
    });

    it("normalizes trailing slashes, queries and fragments", () => {
        expect(getPageKind("/docs/api/?version=v1#demarrage")).toBe("page");
        expect(getPageKind("/chateaux/")).toBe("index");
    });
});
