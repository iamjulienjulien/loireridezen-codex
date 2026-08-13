import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getIndexBySlug, getIndexesForEnv } from "@/registry/indexes";

import HomeContent from "./HomeContent";

describe("HomeContent", () => {
    afterEach(() => vi.unstubAllEnvs());

    it("groups the published indexes into their editorial universes", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        const markup = renderToStaticMarkup(
            <HomeContent indexes={getIndexesForEnv("production")} />,
        );

        expect(markup.match(/<h2/g)).toHaveLength(3);
        expect(markup.match(/<h3/g)).toHaveLength(7);
        expect(markup).toContain("Le fleuve habité");
        expect(markup).toContain("Le fleuve vivant");
        expect(markup).toContain("Le fleuve raconté");
        expect(markup).toContain('data-index-format="catalogue"');
        expect(markup).toContain('data-index-format="naturaliste"');
        expect(markup.match(/data-analytics-event="index_open"/g)).toHaveLength(
            7,
        );
        expect(markup).toContain('data-analytics-source="home"');
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
        expect(getIndexBySlug("territoires")).toMatchObject({
            universe: "raconte",
            format: "catalogue",
            dataFile: "catalogue-territoires.json",
            env: ["development", "staging", "production"],
        });
        expect(getIndexBySlug("personnages")).toMatchObject({
            universe: "raconte",
            format: "repertoire",
            dataFile: "catalogue-personnages.json",
            env: ["development", "staging", "production"],
        });
        expect(getIndexBySlug("vocabulaire")).toMatchObject({
            universe: "raconte",
            format: "lexique",
        });
    });

    it("keeps disabled indexes out of every public environment", () => {
        vi.stubEnv("CURRENT_ENV", "development");

        const markup = renderToStaticMarkup(
            <HomeContent indexes={getIndexesForEnv("development")} />,
        );

        expect(markup).toContain('data-index-availability="published"');
        expect(markup).not.toContain("En préparation");
        expect(markup).not.toContain("Vocabulaire du fleuve");
        expect(markup).not.toContain("Petit patrimoine du fil");
        expect(markup).not.toContain("Villes et villages de la Loire");
    });
});
