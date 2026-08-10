import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import AboutPage from "./page";

describe("AboutPage", () => {
    afterEach(() => vi.unstubAllEnvs());

    it("presents the Codex entry points and structured data", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        const markup = renderToStaticMarkup(<AboutPage />);

        expect(markup).toContain("Trois façons d’entrer dans le Codex.");
        expect(markup).toContain("Le fleuve habité");
        expect(markup).toContain("Le fleuve vivant");
        expect(markup).toContain("Le fleuve raconté");
        expect(markup).toContain('href="/chateaux"');
        expect(markup).toContain('href="/faune"');
        expect(markup).toContain('href="/territoires"');
        expect(markup).toContain("Un même voyage, plusieurs portes d’entrée.");
        expect(markup).toContain("Le Passeport ligérien");
        expect(markup).toContain("https://www.instagram.com/loireridezen/");
        expect(markup).toContain("https://carte.loireridezen.link");
        expect(markup).toContain('data-meta="general"');
        expect(markup).toContain('data-slug="atlas"');
        expect(markup).toContain('data-slug="horizon"');
        expect(markup).toContain('type="application/ld+json"');
        expect(markup).toContain("AboutPage");
    });
});
