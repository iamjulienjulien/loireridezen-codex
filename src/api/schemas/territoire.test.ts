import territoireData from "@data/catalogue-territoires.json";
import { describe, expect, it } from "vitest";

import { territoireCatalogSchema } from "./territoire";

describe("territoire catalog schema", () => {
    it("validates the real territory catalog", () => {
        expect(territoireCatalogSchema.safeParse(territoireData).success).toBe(
            true,
        );
    });
});
