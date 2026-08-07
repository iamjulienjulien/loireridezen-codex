import { describe, expect, it } from "vitest";

import {
    CODEX_INDEX_META,
    CODEX_INDEX_REGISTRY,
    getCodexIndexMeta,
    isCodexIndex,
} from "@/registry/Meta/codex-index";

describe("Codex index meta registry", () => {
    it("exposes every illustrated Codex index", () => {
        expect(CODEX_INDEX_META).toHaveLength(6);
        expect(CODEX_INDEX_META.map((index) => index.slug)).toEqual([
            "chateaux",
            "faune",
            "flore",
            "guinguettes",
            "personnages",
            "territoires",
        ]);
    });

    it("resolves a known index", () => {
        expect(getCodexIndexMeta("flore")).toBe(CODEX_INDEX_REGISTRY.flore);
    });

    it("rejects an index without an illustrated symbol", () => {
        expect(isCodexIndex("vignobles")).toBe(false);
        expect(getCodexIndexMeta("vignobles")).toBeUndefined();
    });
});
