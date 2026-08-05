import { describe, expectTypeOf, it } from "vitest";
import type {
    ChateauAttributes,
    FauneAttributes,
    FloreAttributes,
    PublicEntry,
    PublishedIndexSlug,
} from "../src/index.js";

describe("public SDK types", () => {
    it("exposes the published index union from OpenAPI", () => {
        expectTypeOf<PublishedIndexSlug>().toEqualTypeOf<
            "faune" | "flore" | "chateaux"
        >();
    });

    it("keeps entry attributes discriminated by index", () => {
        expectTypeOf<
            Extract<PublicEntry, { index: "faune" }>["attributes"]
        >().toEqualTypeOf<FauneAttributes>();
        expectTypeOf<
            Extract<PublicEntry, { index: "flore" }>["attributes"]
        >().toEqualTypeOf<FloreAttributes>();
        expectTypeOf<
            Extract<PublicEntry, { index: "chateaux" }>["attributes"]
        >().toEqualTypeOf<ChateauAttributes>();
    });
});
