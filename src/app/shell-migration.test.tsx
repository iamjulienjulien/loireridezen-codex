import type { ComponentProps, ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AtelierShellProps } from "@/components/_shells/AtelierShell";
import AtelierShell from "@/components/_shells/AtelierShell";
import type { CollectionShellProps } from "@/components/_shells/CollectionShell";
import CollectionShell from "@/components/_shells/CollectionShell";
import type { HomeShellProps } from "@/components/_shells/HomeShell";
import HomeShell from "@/components/_shells/HomeShell";
import type { IndexShellProps } from "@/components/_shells/IndexShell";
import IndexShell from "@/components/_shells/IndexShell";
import type { PageShellProps } from "@/components/_shells/PageShell";
import PageShell from "@/components/_shells/PageShell";
import { COLLECTIONS } from "@/registry/collections";
import { featureIsEnabled } from "@/registry/feature-flags";

import AboutPage from "./a-propos/page";
import AtelierLayout from "./atelier/layout";
import ChateauxIndex from "./chateaux/ChateauxIndex";
import { ChateauxRoute } from "./chateaux/ChateauxRoute";
import CollectionPage from "./chateaux/collections/[collectionSlug]/page";
import DocumentationTopbar from "@/components/_docs/DocumentationTopbar";
import ApiDocumentationPage from "./docs/api/page";
import DocumentationHomePage from "./docs/page";
import SdkDocumentationPage from "./docs/sdk/page";
import { FauneRoute } from "./faune/FauneRoute";
import { FloreRoute } from "./flore/FloreRoute";
import { GuinguettesRoute } from "./guinguettes/GuinguettesRoute";
import HomeContent from "./HomeContent";
import HomePage from "./page";
import PersonnagesIndex from "./personnages/PersonnagesIndex";
import { PersonnagesRoute } from "./personnages/PersonnagesRoute";
import { VignoblesRoute } from "./vignobles/VignoblesRoute";

const REMAINING_INDEX_ROUTES = [
    { href: "/faune", render: FauneRoute },
    { href: "/flore", render: FloreRoute },
    { href: "/guinguettes", render: GuinguettesRoute },
    { href: "/vignobles", render: VignoblesRoute },
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
        const catalogue = route.props.children as ReactElement<
            ComponentProps<typeof ChateauxIndex>
        >;

        expect(route.type).toBe(IndexShell);
        expect(route.props.page.href).toBe("/chateaux");
        expect(route.props.totalEntries).toBeGreaterThan(0);
        expect(catalogue.type).toBe(ChateauxIndex);
        expect(catalogue.props.nearbyGuinguettesByChateau).toBeDefined();
        expect(
            Object.values(
                catalogue.props.nearbyGuinguettesByChateau ?? {},
            ).some((matches) => matches.length > 0),
        ).toBe(true);
        expect(
            Object.values(
                catalogue.props.nearbyGuinguettesByChateau ?? {},
            ).every((matches) => matches.length <= 3),
        ).toBe(true);
    });

    it("keeps nearby Guinguettes out of the production catalogue", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        const route = ChateauxRoute() as ReactElement<IndexShellProps>;
        const catalogue = route.props.children as ReactElement<
            ComponentProps<typeof ChateauxIndex>
        >;

        expect(catalogue.props.nearbyGuinguettesByChateau).toBeUndefined();
    });

    it("composes the same nearby table in staging as in development", () => {
        const developmentRoute =
            ChateauxRoute() as ReactElement<IndexShellProps>;
        const developmentCatalogue = developmentRoute.props
            .children as ReactElement<ComponentProps<typeof ChateauxIndex>>;

        vi.stubEnv("CURRENT_ENV", "staging");
        const stagingRoute = ChateauxRoute() as ReactElement<IndexShellProps>;
        const stagingCatalogue = stagingRoute.props.children as ReactElement<
            ComponentProps<typeof ChateauxIndex>
        >;

        expect(stagingCatalogue.props.nearbyGuinguettesByChateau).toEqual(
            developmentCatalogue.props.nearbyGuinguettesByChateau,
        );
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
