import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
    HOME_PAGE,
    getCollectionPageDefinition,
    getContentPageDefinition,
    getIndexPageDefinition,
} from "@/registry/pages";
import { getAtelierPageDefinition } from "@/registry/atelier-pages";
import { getIndexesForEnv } from "@/registry/indexes";

import AmbientPageFrame from "./AmbientPageFrame";
import AtelierShell from "../_shells/AtelierShell";
import CollectionShell from "../_shells/CollectionShell";
import HomeShell from "../_shells/HomeShell";
import IndexShell from "../_shells/IndexShell";
import PageShell from "../_shells/PageShell";
import ShellContainer from "../_shells/ShellContainer";

const expectSemanticShell = (markup: string, kind: string) => {
    expect(markup).toContain(`data-page-kind="${kind}"`);
    expect(markup.match(/<header/g)).toHaveLength(1);
    expect(markup.match(/<main/g)).toHaveLength(1);
    expect(markup.match(/<footer/g)).toHaveLength(1);
};

describe("layout primitives", () => {
    it("exposes the ambient page kind and accent", () => {
        const markup = renderToStaticMarkup(
            <AmbientPageFrame kind="page" accent="#123456">
                <p>Contenu</p>
            </AmbientPageFrame>,
        );

        expect(markup).toContain("data-ambient-page-frame");
        expect(markup).toContain('data-page-kind="page"');
        expect(markup).toContain("--page-accent:#123456");
    });

    it.each(["narrow", "reading", "content", "wide", "full"] as const)(
        "renders the %s container width",
        (width) => {
            const markup = renderToStaticMarkup(
                <ShellContainer width={width} spacing="compact">
                    Contenu
                </ShellContainer>,
            );

            expect(markup).toContain(`data-width="${width}"`);
            expect(markup).toContain('data-spacing="compact"');
        },
    );
});

describe("page shells", () => {
    beforeEach(() => vi.stubEnv("CURRENT_ENV", "development"));
    afterEach(() => vi.unstubAllEnvs());

    it("composes the immersive Home shell with a narrow container", () => {
        const markup = renderToStaticMarkup(
            <HomeShell page={HOME_PAGE} footer="Accueil du Codex">
                <section>Index disponibles</section>
            </HomeShell>,
        );

        expectSemanticShell(markup, "home");
        expect(markup).toContain('data-width="narrow"');
        expect(markup).toContain('data-page-header-variant="home"');
        expect(markup).toContain("Index disponibles");
        expect(markup).toContain("Accueil du Codex");
    });

    it("preserves the Index header and reports the catalogue total", () => {
        const indexes = getIndexesForEnv("development");
        const page = getIndexPageDefinition("/chateaux");
        const markup = renderToStaticMarkup(
            <IndexShell page={page} indexes={indexes} totalEntries={42}>
                <section>Catalogue</section>
            </IndexShell>,
        );

        expectSemanticShell(markup, "index");
        expect(markup).toContain('data-width="content"');
        expect(markup).toContain('data-page-header-variant="index"');
        expect(markup).toContain('aria-label="Index du Codex"');
        expect(markup).toContain(`42 ${page.footerNote}`);
    });

    it("composes a wide Collection shell with its parent context", () => {
        const indexes = getIndexesForEnv("development");
        const page = getCollectionPageDefinition("incontournables-du-val");
        const markup = renderToStaticMarkup(
            <CollectionShell page={page} indexes={indexes}>
                <section>Classement</section>
            </CollectionShell>,
        );

        expectSemanticShell(markup, "collection");
        expect(markup).toContain('data-width="wide"');
        expect(markup).toContain('data-page-header-variant="collection"');
        expect(markup).toContain('aria-label="Fil d’Ariane"');
        expect(markup).toContain('data-collection-outro=""');
        expect(markup).toContain("Châteaux");
        expect(markup).toContain(page.footerNote);
    });

    it("keeps Page width and header slots configurable", () => {
        const page = getContentPageDefinition("/docs");
        const markup = renderToStaticMarkup(
            <PageShell
                page={page}
                width="reading"
                breadcrumbs={<nav aria-label="Test breadcrumb">Accueil</nav>}
                navigation={<nav aria-label="Test navigation">Guides</nav>}
                actions={<button type="button">Copier</button>}
            >
                <article>Documentation</article>
            </PageShell>,
        );

        expectSemanticShell(markup, "page");
        expect(markup).toContain('data-width="reading"');
        expect(markup).toContain('data-page-header-variant="documentation"');
        expect(markup).toContain('aria-label="Test breadcrumb"');
        expect(markup).toContain('aria-label="Test navigation"');
        expect(markup).toContain("Copier");
    });

    it("keeps Atelier as a dedicated configurable shell", () => {
        const page = getAtelierPageDefinition("/atelier/ui");
        const markup = renderToStaticMarkup(
            <AtelierShell page={page} width="content">
                <section>Composants UI</section>
            </AtelierShell>,
        );

        expectSemanticShell(markup, "atelier");
        expect(markup).toContain('data-width="content"');
        expect(markup).toContain('data-page-header-variant="atelier"');
        expect(markup).toContain("Composants UI");
    });

    it("centralizes Atelier semantics when its internal header is retained", () => {
        const page = getAtelierPageDefinition("/atelier");
        const markup = renderToStaticMarkup(
            <AtelierShell page={page} header={false} width="full">
                <section>Sommaire interne</section>
            </AtelierShell>,
        );

        expect(markup.match(/<header/g)).toBeNull();
        expect(markup.match(/<main/g)).toHaveLength(1);
        expect(markup.match(/<footer/g)).toHaveLength(1);
        expect(markup).toContain("Sommaire interne");
    });
});
