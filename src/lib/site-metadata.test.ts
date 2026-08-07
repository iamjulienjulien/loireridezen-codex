import { describe, expect, it } from "vitest";

import {
    getCanonicalUrl,
    SITE_DESCRIPTION,
    SITE_TITLE,
    SITE_URL,
} from "./site-metadata";

describe("site metadata", () => {
    it("keeps the title within the recommended SEO length", () => {
        expect(SITE_TITLE.length).toBeGreaterThanOrEqual(50);
        expect(SITE_TITLE.length).toBeLessThanOrEqual(60);
    });

    it("keeps the description within the recommended SEO length", () => {
        expect(SITE_DESCRIPTION.length).toBeGreaterThanOrEqual(120);
        expect(SITE_DESCRIPTION.length).toBeLessThanOrEqual(160);
    });

    it("builds canonical URLs on the production origin", () => {
        expect(SITE_URL).toBe("https://codex.loireridezen.bike");
        expect(getCanonicalUrl("/").toString()).toBe(`${SITE_URL}/`);
        expect(getCanonicalUrl("/faune").toString()).toBe(`${SITE_URL}/faune`);
    });
});
