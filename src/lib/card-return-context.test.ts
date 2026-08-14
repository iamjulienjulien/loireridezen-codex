import { describe, expect, it } from "vitest";

import {
    buildCardHrefWithReturn,
    resolveCardReturnContext,
} from "@/lib/card-return-context";

const catalogs = {
    vignobles: [{ slug: "chinon", nom: "Chinon" }],
    territoires: [{ slug: "chinonais", nom: "Chinonais" }],
};

describe("card return context", () => {
    it("resolves supported vineyard and territory routes", () => {
        expect(resolveCardReturnContext("/vignoble/chinon", catalogs)).toEqual({
            href: "/vignoble/chinon",
            label: "Chinon",
        });
        expect(
            resolveCardReturnContext("/territoire/chinonais", catalogs),
        ).toEqual({ href: "/territoire/chinonais", label: "Chinonais" });
    });

    it.each([
        undefined,
        ["/vignoble/chinon"],
        "https://example.com/vignoble/chinon",
        "//example.com/vignoble/chinon",
        "/chateau/chinon",
        "/vignoble/chinon?retour=/territoire/chinonais",
        "/vignoble/chinon#details",
        "/vignoble/Chinon",
    ])("rejects an unsupported return value: %s", (value) => {
        expect(resolveCardReturnContext(value, catalogs)).toBeUndefined();
    });

    it("rejects a valid-looking route whose slug is absent", () => {
        expect(
            resolveCardReturnContext("/territoire/inconnu", catalogs),
        ).toBeUndefined();
    });

    it("builds an encoded contextual href without altering its canonical path", () => {
        expect(
            buildCardHrefWithReturn(
                "/territoire/chinonais",
                "/vignoble/chinon",
            ),
        ).toBe("/territoire/chinonais?retour=%2Fvignoble%2Fchinon");
        expect(buildCardHrefWithReturn("/vignoble/chinon")).toBe(
            "/vignoble/chinon",
        );
    });
});
