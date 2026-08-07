import personnageData from "@data/catalogue-personnages.json";
import { describe, expect, it } from "vitest";

import { personnageCatalogSchema } from "./personnage";

describe("personnage catalog schema", () => {
    it("validates the real character catalog", () => {
        const result = personnageCatalogSchema.safeParse(personnageData);

        expect(result.success).toBe(true);
        if (!result.success) return;

        expect(result.data.personnages).toHaveLength(
            personnageData.meta.nombrePersonnages,
        );
        expect(result.data.relations).toHaveLength(
            personnageData.meta.nombreRelations,
        );
        expect(result.data.personnages[0].slug).toBe(
            personnageData.personnages[0].id,
        );
    });
});
