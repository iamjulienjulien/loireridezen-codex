import { describe, expect, it } from "vitest";
import vignobleData from "@data/catalogue-vignobles.json";
import { vignobleEntrySchema } from "./vignoble";

const createEntry = () => structuredClone(vignobleData.vignobles[0]);

describe("vignoble territory schema", () => {
    it("accepts an explicitly empty territory list", () => {
        const entry = createEntry();
        entry.meta.territoires = [];
        delete entry.meta.territoirePrincipal;

        expect(vignobleEntrySchema.safeParse(entry).success).toBe(true);
    });

    it("rejects unknown and duplicate territories", () => {
        const unknown = createEntry() as unknown as {
            meta: { territoires: string[] };
        };
        unknown.meta.territoires = ["territoire-inconnu"];

        const duplicate = createEntry();
        duplicate.meta.territoires = ["orleanais", "orleanais"];

        expect(vignobleEntrySchema.safeParse(unknown).success).toBe(false);
        expect(vignobleEntrySchema.safeParse(duplicate).success).toBe(false);
    });

    it("requires the primary territory to belong to the territory list", () => {
        const entry = createEntry();
        entry.meta.territoires = ["orleanais"];
        entry.meta.territoirePrincipal = "nivernais";

        expect(vignobleEntrySchema.safeParse(entry).success).toBe(false);
    });
});
