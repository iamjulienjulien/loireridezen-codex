import { describe, expect, it } from "vitest";
import { findRestrictiveConstraintChanges } from "./api-contract-diff.mjs";

const schemaDocument = (constraint) => ({
    components: {
        schemas: {
            Example: {
                type: "string",
                ...constraint,
            },
        },
    },
});

describe("oasdiff constraint compatibility supplement", () => {
    it.each([
        ["minimum", 0, 1],
        ["exclusiveMinimum", 0, 1],
        ["minLength", 2, 3],
        ["minItems", 2, 3],
        ["minProperties", 2, 3],
        ["maximum", 10, 9],
        ["exclusiveMaximum", 10, 9],
        ["maxLength", 10, 9],
        ["maxItems", 10, 9],
        ["maxProperties", 10, 9],
    ])("detects a restrictive %s change", (keyword, base, revision) => {
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({ [keyword]: base }),
                schemaDocument({ [keyword]: revision }),
            ),
        ).toEqual([
            {
                path: `/components/schemas/Example/${keyword}`,
                keyword,
                base,
                revision,
            },
        ]);
    });

    it.each([
        ["minimum", 1, 0],
        ["minLength", 3, 2],
        ["maximum", 9, 10],
        ["maxItems", 9, 10],
    ])("allows a relaxed %s change", (keyword, base, revision) => {
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({ [keyword]: base }),
                schemaDocument({ [keyword]: revision }),
            ),
        ).toEqual([]);
    });

    it("detects added or changed pattern and multipleOf constraints", () => {
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({}),
                schemaDocument({ pattern: "^[a-z]+$", multipleOf: 2 }),
            ),
        ).toEqual([
            {
                path: "/components/schemas/Example/pattern",
                keyword: "pattern",
                base: undefined,
                revision: "^[a-z]+$",
            },
            {
                path: "/components/schemas/Example/multipleOf",
                keyword: "multipleOf",
                base: undefined,
                revision: 2,
            },
        ]);
    });

    it("allows an exact multipleOf relaxation and blocks hardening or incompatibility", () => {
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({ multipleOf: 4 }),
                schemaDocument({ multipleOf: 2 }),
            ),
        ).toEqual([]);
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({ multipleOf: 2 }),
                schemaDocument({ multipleOf: 4 }),
            ),
        ).toHaveLength(1);
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({ multipleOf: 2 }),
                schemaDocument({ multipleOf: 3 }),
            ),
        ).toHaveLength(1);
    });

    it("detects uniqueItems enabled and allows it to be disabled", () => {
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({ uniqueItems: false }),
                schemaDocument({ uniqueItems: true }),
            ),
        ).toHaveLength(1);
        expect(
            findRestrictiveConstraintChanges(
                schemaDocument({ uniqueItems: true }),
                schemaDocument({ uniqueItems: false }),
            ),
        ).toEqual([]);
    });

    it("allows a constrained optional property on a new schema subtree", () => {
        const base = schemaDocument({ properties: {} });
        const revision = schemaDocument({
            properties: {
                preview: {
                    type: "string",
                    minLength: 1,
                    pattern: "^[a-z]+$",
                },
            },
        });

        expect(findRestrictiveConstraintChanges(base, revision)).toEqual([]);
    });

    it("ignores annotations even when examples contain constraint-like keys", () => {
        const base = schemaDocument({
            description: "minimum: 0",
            example: { minimum: 0, nested: { maximum: 10 } },
            examples: [{ minLength: 1 }],
            default: { uniqueItems: false },
        });
        const revision = schemaDocument({
            description: "minimum: 1",
            example: { minimum: 1, nested: { maximum: 5 } },
            examples: [{ minLength: 2 }],
            default: { uniqueItems: true },
        });

        expect(findRestrictiveConstraintChanges(base, revision)).toEqual([]);
    });

    it("still checks a property whose business name matches an annotation", () => {
        const base = schemaDocument({
            properties: {
                example: { type: "number", minimum: 0 },
            },
        });
        const revision = schemaDocument({
            properties: {
                example: { type: "number", minimum: 1 },
            },
        });

        expect(findRestrictiveConstraintChanges(base, revision)).toEqual([
            {
                path: "/components/schemas/Example/properties/example/minimum",
                keyword: "minimum",
                base: 0,
                revision: 1,
            },
        ]);
    });
});
