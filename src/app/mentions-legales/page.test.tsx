import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import LegalNoticePage from "./page";

describe("LegalNoticePage", () => {
    afterEach(() => vi.unstubAllEnvs());

    it("publishes the editor, host, licenses and V1 analytics information", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        const markup = renderToStaticMarkup(<LegalNoticePage />);

        expect(markup).toContain("Édition du site");
        expect(markup).toContain("Julien Julien");
        expect(markup).toContain("julien@loireridezen.bike");
        expect(markup).toContain("Vercel Inc.");
        expect(markup).toContain("+1 559 288 7060");
        expect(markup).toContain("CC BY-NC-SA 4.0");
        expect(markup).toContain("Vercel Web Analytics");
        expect(markup).toContain("aucune balise n’y est publiée pour la V1");
        expect(markup).toContain("Droit applicable");
    });
});
