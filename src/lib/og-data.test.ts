import { describe, expect, it } from "vitest";

import { getCodexOgImageUrl, getCodexOgItem } from "./og-data";

describe("Codex Open Graph items", () => {
    it.each([
        ["chateau", "chateau-de-chambord", "Châteaux de la Loire"],
        ["faune", "heron-cendre", "Faune ligérienne"],
        ["flore", "peuplier-noir", "Flore ligérienne"],
        [
            "guinguette",
            "guinguette-du-port-chatillon-en-bazois",
            "Guinguettes de Loire",
        ],
        ["personnage", "agnes-sorel", "Personnages de la Loire"],
        ["territoire", "nivernais", "Territoires ligériens"],
    ] as const)("resolves the %s OG item", (kind, slug, indexTitle) => {
        expect(getCodexOgItem(kind, slug)).toMatchObject({
            indexTitle,
        });
    });

    it("builds an absolute stable image URL", () => {
        expect(getCodexOgImageUrl("chateau", "chateau-de-chambord")).toBe(
            "https://codex.loireridezen.bike/api/og/chateau/chateau-de-chambord",
        );
    });

    it("does not resolve an unknown item", () => {
        expect(getCodexOgItem("faune", "inconnu")).toBeUndefined();
    });
});
