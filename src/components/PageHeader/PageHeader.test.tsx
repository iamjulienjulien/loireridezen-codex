import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getIndexesForEnv } from "@/registry/indexes";

import PageHeader from "./PageHeader";
import {
    PageHeaderBreadcrumbs,
    PageHeaderIndexAvailability,
    PageHeaderIndexMark,
    PageHeaderIndexNavigation,
} from "./PageHeaderSlots";

describe("PageHeader", () => {
    afterEach(() => vi.unstubAllEnvs());

    it.each([
        "home",
        "index",
        "collection",
        "page",
        "editorial",
        "documentation",
        "atelier",
    ] as const)(
        "renders the %s variant through the shared component",
        (variant) => {
            const markup = renderToStaticMarkup(
                <PageHeader variant={variant} title={`Titre ${variant}`} />,
            );

            expect(markup).toContain(`data-page-header-variant="${variant}"`);
            expect(markup.match(/<h1/g)).toHaveLength(1);
            expect(markup).toContain(`Titre ${variant}`);
        },
    );

    it("preserves the historical Index identity and navigation", () => {
        vi.stubEnv("CURRENT_ENV", "development");
        const indexes = getIndexesForEnv("development");
        const current = indexes[0]!;
        const markup = renderToStaticMarkup(
            <PageHeader
                variant="index"
                title={current.title}
                accent={current.accent}
                color={current.color}
                mark={<PageHeaderIndexMark index={current} />}
                navigation={
                    <PageHeaderIndexNavigation
                        current={current.href}
                        indexes={indexes}
                    />
                }
            />,
        );

        expect(markup).toContain("Loire Ride Zen");
        expect(markup).toContain("Le Codex ligérien");
        expect(markup).toContain('aria-label="Index du Codex"');
        expect(markup).toContain(`href="${current.href}"`);
        expect(markup).toContain('aria-current="page"');
    });

    it("marks development-only indexes in the title and navigation", () => {
        vi.stubEnv("CURRENT_ENV", "development");
        const indexes = getIndexesForEnv("development");
        const current = indexes.find(
            (index) => !(index.env as readonly string[]).includes("production"),
        )!;
        const markup = renderToStaticMarkup(
            <PageHeader
                variant="index"
                title={current.title}
                accent={current.accent}
                color={current.color}
                titleAddon={<PageHeaderIndexAvailability index={current} />}
                navigation={
                    <PageHeaderIndexNavigation
                        current={current.href}
                        indexes={indexes}
                    />
                }
            />,
        );

        expect(markup).toContain('data-index-availability="preview"');
        expect(markup).toContain('data-index-availability="published"');
        expect(markup).toContain("En préparation");
    });

    it("preserves the compact historical Home composition", () => {
        const markup = renderToStaticMarkup(
            <PageHeader
                variant="home"
                title="Le Codex Ligérien"
                eyebrow="Loire Ride Zen"
                description="Explorer, observer, raconter la Loire."
            />,
        );

        expect(markup).toContain("Loire Ride Zen");
        expect(markup).toContain("Le Codex Ligérien");
        expect(markup).toContain("Explorer, observer, raconter la Loire.");
        expect(markup.match(/<h1/g)).toHaveLength(1);
        expect(markup).not.toContain('href="/"');
    });

    it("renders navigation, actions and breadcrumbs as optional slots", () => {
        const markup = renderToStaticMarkup(
            <PageHeader
                variant="page"
                title="Une page annexe"
                breadcrumbs={
                    <PageHeaderBreadcrumbs
                        items={[
                            { href: "/", label: "Accueil" },
                            { href: "/docs", label: "Documentation" },
                        ]}
                    />
                }
                navigation={<nav aria-label="Navigation test">Liens</nav>}
                actions={<button type="button">Action test</button>}
            />,
        );

        expect(markup).toContain('aria-label="Fil d’Ariane"');
        expect(markup).toContain('aria-label="Navigation test"');
        expect(markup).toContain("Action test");
    });

    it("does not invent collection copy when the description slot is absent", () => {
        const markup = renderToStaticMarkup(
            <PageHeader
                variant="collection"
                title="Collection exemple"
                mark="👑"
            />,
        );

        expect(markup).not.toContain("Description");
        expect(markup).toContain("Collection exemple");
    });
});
