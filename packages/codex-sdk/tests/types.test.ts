import { describe, expectTypeOf, it } from "vitest";
import type {
    ChateauAttributes,
    FauneAttributes,
    FloreAttributes,
    GuinguetteAttributes,
    PersonnageAttributes,
    PublicEntry,
    PublishedIndexSlug,
    TerritoireAttributes,
    VignobleAttributes,
} from "../src/index.js";

describe("public SDK types", () => {
    it("exposes the published index union from OpenAPI", () => {
        expectTypeOf<PublishedIndexSlug>().toEqualTypeOf<
            | "faune"
            | "flore"
            | "chateaux"
            | "guinguettes"
            | "territoires"
            | "personnages"
            | "vignobles"
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
        expectTypeOf<
            Extract<PublicEntry, { index: "guinguettes" }>["attributes"]
        >().toEqualTypeOf<GuinguetteAttributes>();
        expectTypeOf<
            Extract<PublicEntry, { index: "territoires" }>["attributes"]
        >().toEqualTypeOf<TerritoireAttributes>();
        expectTypeOf<
            Extract<PublicEntry, { index: "personnages" }>["attributes"]
        >().toEqualTypeOf<PersonnageAttributes>();
        expectTypeOf<
            Extract<PublicEntry, { index: "vignobles" }>["attributes"]
        >().toEqualTypeOf<VignobleAttributes>();
    });

    it("exposes the canonical vineyard territory relation", () => {
        type TerritoireSlug =
            | "nivernais"
            | "orleanais"
            | "blaisois"
            | "touraine"
            | "chinonais"
            | "saumurois"
            | "anjou"
            | "bretagne-ligerienne";

        expectTypeOf<VignobleAttributes["meta"]["territoires"]>().toEqualTypeOf<
            TerritoireSlug[] | undefined
        >();
        expectTypeOf<
            VignobleAttributes["meta"]["territoirePrincipal"]
        >().toEqualTypeOf<TerritoireSlug | undefined>();
        expectTypeOf<TerritoireAttributes>().not.toHaveProperty("vignobles");
    });
});
