import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AtelierShellProps } from "@/components/layout/AtelierShell";
import AtelierShell from "@/components/layout/AtelierShell";
import type { CollectionShellProps } from "@/components/layout/CollectionShell";
import CollectionShell from "@/components/layout/CollectionShell";
import type { HomeShellProps } from "@/components/layout/HomeShell";
import HomeShell from "@/components/layout/HomeShell";
import type { IndexShellProps } from "@/components/layout/IndexShell";
import IndexShell from "@/components/layout/IndexShell";
import type { PageShellProps } from "@/components/layout/PageShell";
import PageShell from "@/components/layout/PageShell";
import { COLLECTIONS } from "@/registry/collections";
import { featureIsEnabled } from "@/registry/feature-flags";

import AboutPage from "./a-propos/page";
import AtelierLayout from "./atelier/layout";
import ChateauxIndex from "./chateaux/ChateauxIndex";
import { ChateauxRoute } from "./chateaux/ChateauxRoute";
import CollectionPage from "./chateaux/collections/[collectionSlug]/page";
import DocumentationTopbar from "./docs/DocumentationTopbar";
import ApiDocumentationPage from "./docs/api/page";
import DocumentationHomePage from "./docs/page";
import SdkDocumentationPage from "./docs/sdk/page";
import { FauneRoute } from "./faune/FauneRoute";
import { FloreRoute } from "./flore/FloreRoute";
import GuinguettesPage from "./guinguettes/page";
import HomeContent from "./HomeContent";
import HomePage from "./page";
import PatrimoinePage from "./patrimoine/page";
import PersonnagesIndex from "./personnages/PersonnagesIndex";
import { PersonnagesRoute } from "./personnages/PersonnagesRoute";
import VignoblesPage from "./vignobles/page";
import VocabulairePage from "./vocabulaire/page";
import VillesVillagesPage from "./villes-villages/page";

const REMAINING_INDEX_ROUTES = [
    { href: "/faune", render: FauneRoute },
    { href: "/flore", render: FloreRoute },
    { href: "/guinguettes", render: GuinguettesPage },
    { href: "/patrimoine", render: PatrimoinePage },
    { href: "/vignobles", render: VignoblesPage },
    { href: "/vocabulaire", render: VocabulairePage },
    { href: "/villes-villages", render: VillesVillagesPage },
] as const;

describe("pilot shell migration", () => {
    beforeEach(() => vi.stubEnv("CURRENT_ENV", "development"));
    afterEach(() => vi.unstubAllEnvs());

    it("composes Home through HomeShell", () => {
        const route = HomePage() as ReactElement<HomeShellProps>;
        const content = route.props.children as ReactElement;

        expect(route.type).toBe(HomeShell);
        expect(route.props.page.kind).toBe("home");
        expect(content.type).toBe(HomeContent);
    });

    it("keeps the Châteaux catalogue client inside IndexShell", () => {
        const route = ChateauxRoute() as ReactElement<IndexShellProps>;
        const catalogue = route.props.children as ReactElement;

        expect(route.type).toBe(IndexShell);
        expect(route.props.page.href).toBe("/chateaux");
        expect(route.props.totalEntries).toBeGreaterThan(0);
        expect(catalogue.type).toBe(ChateauxIndex);
    });

    it.each(REMAINING_INDEX_ROUTES)(
        "composes $href through IndexShell",
        ({ href, render }) => {
            const route = render() as ReactElement<IndexShellProps>;

            expect(route.type).toBe(IndexShell);
            expect(route.props.page.href).toBe(href);
            expect(route.props.totalEntries).toBeGreaterThan(0);
        },
    );

    it("composes a dynamic Châteaux collection through CollectionShell", async () => {
        if (!featureIsEnabled("collections", "development")) {
            await expect(
                CollectionPage({
                    params: Promise.resolve({
                        collectionSlug: "incontournables-du-val",
                    }),
                }),
            ).rejects.toThrow();
            return;
        }

        const route = (await CollectionPage({
            params: Promise.resolve({
                collectionSlug: "incontournables-du-val",
            }),
        })) as ReactElement<CollectionShellProps>;

        expect(route.type).toBe(CollectionShell);
        expect(route.props.page.kind).toBe("collection");
        expect(route.props.page.indexHref).toBe("/chateaux");
        expect(route.props.footer).toBeUndefined();
    });

    it.each(COLLECTIONS)(
        "composes the $slug collection through CollectionShell",
        async ({ slug }) => {
            if (!featureIsEnabled("collections", "development")) {
                await expect(
                    CollectionPage({
                        params: Promise.resolve({ collectionSlug: slug }),
                    }),
                ).rejects.toThrow();
                return;
            }

            const route = (await CollectionPage({
                params: Promise.resolve({ collectionSlug: slug }),
            })) as ReactElement<CollectionShellProps>;

            expect(route.type).toBe(CollectionShell);
            expect(route.props.page.slug).toBe(slug);
        },
    );

    it("composes À propos through the configurable PageShell", () => {
        const route = AboutPage() as ReactElement<PageShellProps>;

        expect(route.type).toBe(PageShell);
        expect(route.props.page.href).toBe("/a-propos");
        expect(route.props.width).toBe("wide");
        expect(route.props.navigation).toBeDefined();
    });

    it("composes Personnages through IndexShell behind its feature flag", () => {
        const route = PersonnagesRoute() as ReactElement<IndexShellProps>;
        const catalogue = route.props.children as ReactElement;

        expect(route.type).toBe(IndexShell);
        expect(route.props.page.href).toBe("/personnages");
        expect(route.props.page.format).toBe("repertoire");
        expect(route.props.totalEntries).toBeGreaterThan(0);
        expect(catalogue.type).toBe(PersonnagesIndex);
    });

    it("composes the documentation landing page through PageShell", () => {
        const route = DocumentationHomePage() as ReactElement<PageShellProps>;

        expect(route.type).toBe(PageShell);
        expect(route.props.page.href).toBe("/docs");
        expect(route.props.actions).toBeDefined();
    });

    it.each([
        ["/docs/api", "api", ApiDocumentationPage],
        ["/docs/sdk", "sdk", SdkDocumentationPage],
    ] as const)(
        "keeps the specialized topbar and sidebar for %s",
        (href, section, render) => {
            const route = render() as ReactElement<PageShellProps>;
            const header = route.props.header as ReactElement<{
                current: string;
            }>;

            expect(route.type).toBe(PageShell);
            expect(route.props.page.href).toBe(href);
            expect(route.props.width).toBe("full");
            expect(header.type).toBe(DocumentationTopbar);
            expect(header.props.current).toBe(section);
        },
    );

    it("keeps Atelier in its feature-gated ambient layout", () => {
        const route = AtelierLayout({
            children: <section>Atelier</section>,
        }) as ReactElement<AtelierShellProps>;

        expect(route.type).toBe(AtelierShell);
        expect(route.props.page.kind).toBe("atelier");
        expect(route.props.header).toBe(false);
    });
});
