import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getIndexBySlug, getIndexesForEnv } from "@/registry/indexes";

import HomeContent from "./HomeContent";

describe("HomeContent", () => {
    afterEach(() => vi.unstubAllEnvs());

    it("groups the published indexes into inhabited and living universes", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        const markup = renderToStaticMarkup(
            <HomeContent indexes={getIndexesForEnv("production")} />,
        );

        expect(markup.match(/<h2/g)).toHaveLength(2);
        expect(markup.match(/<h3/g)).toHaveLength(3);
        expect(markup).toContain("Le fleuve habité");
        expect(markup).toContain("Le fleuve vivant");
        expect(markup).not.toContain("Le fleuve raconté");
        expect(markup).toContain('data-index-format="catalogue"');
        expect(markup).toContain('data-index-format="naturaliste"');
    });

    it("keeps each index attached to its editorial universe and format", () => {
        expect(getIndexBySlug("chateaux")).toMatchObject({
            universe: "habite",
            format: "catalogue",
        });
        expect(getIndexBySlug("guinguettes")).toMatchObject({
            universe: "habite",
            format: "catalogue",
        });
        expect(getIndexBySlug("faune")).toMatchObject({
            universe: "vivant",
            format: "naturaliste",
        });
        expect(getIndexBySlug("flore")).toMatchObject({
            universe: "vivant",
            format: "naturaliste",
        });
        expect(getIndexBySlug("personnages")).toMatchObject({
            universe: "raconte",
            format: "repertoire",
            dataFile: "catalogue-personnages.json",
            env: ["development"],
        });
        expect(getIndexBySlug("vocabulaire")).toMatchObject({
            universe: "raconte",
            format: "lexique",
        });
    });
});
