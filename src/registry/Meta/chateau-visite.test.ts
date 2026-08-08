import { describe, expect, it } from "vitest";

import {
    CHATEAU_VISITE_META,
    CHATEAU_VISITE_REGISTRY,
    getChateauVisiteMeta,
    isChateauVisite,
} from "@/registry/Meta/chateau-visite";

describe("Chateau visite meta registry", () => {
    it("exposes every visiting condition with the common meta structure", () => {
        expect(CHATEAU_VISITE_META).toEqual([
            {
                slug: "ouvert au public",
                label: "Ouvert au public",
                color: "prairie",
            },
            {
                slug: "extérieurs & parc",
                label: "Extérieurs & parc",
                color: "vert-metallise",
            },
            {
                slug: "privé, non visitable",
                label: "Privé, non visitable",
                color: "brique",
            },
            { slug: "inconnu", label: "Inconnu", color: "galet" },
        ]);
    });

    it("resolves a known visiting condition", () => {
        expect(getChateauVisiteMeta("ouvert au public")).toBe(
            CHATEAU_VISITE_REGISTRY["ouvert au public"],
        );
    });

    it("rejects an unknown visiting condition", () => {
        expect(isChateauVisite("sur réservation")).toBe(false);
        expect(getChateauVisiteMeta("sur réservation")).toBeUndefined();
    });
});
