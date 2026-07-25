type JsonObject = Record<string, unknown>;

const absent = Symbol("absent");
type ShapeValue = unknown | typeof absent;

export interface PublicShapeSchemaContext {
    root: unknown;
    schema: unknown;
}

const isObject = (value: ShapeValue): value is JsonObject =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const stableKey = (value: unknown) => JSON.stringify(value);

const uniqueSorted = (values: unknown[]) =>
    [
        ...new Map(values.map((value) => [stableKey(value), value])).values(),
    ].sort((left, right) => stableKey(left).localeCompare(stableKey(right)));

const primitiveType = (value: ShapeValue) => {
    if (value === absent) return "absent";
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
};

const resolvePointer = (root: unknown, reference: string): unknown => {
    if (!reference.startsWith("#/")) return undefined;
    return reference
        .slice(2)
        .split("/")
        .map((token) =>
            decodeURIComponent(token)
                .replaceAll("~1", "/")
                .replaceAll("~0", "~"),
        )
        .reduce<unknown>((value, token) => {
            if (!isObject(value)) return undefined;
            return value[token];
        }, root);
};

const resolveSchema = (
    schema: unknown,
    value: ShapeValue,
    root: unknown,
): JsonObject | undefined => {
    if (!isObject(schema)) return undefined;
    if (typeof schema.$ref === "string") {
        return resolveSchema(resolvePointer(root, schema.$ref), value, root);
    }

    if (Array.isArray(schema.oneOf)) {
        const discriminator = isObject(schema.discriminator)
            ? schema.discriminator
            : undefined;
        const propertyName = discriminator?.propertyName;
        const mapping = isObject(discriminator?.mapping)
            ? discriminator.mapping
            : undefined;
        if (
            typeof propertyName === "string" &&
            isObject(value) &&
            typeof value[propertyName] === "string" &&
            typeof mapping?.[value[propertyName]] === "string"
        ) {
            return resolveSchema(
                { $ref: mapping[value[propertyName]] },
                value,
                root,
            );
        }
    }

    return schema;
};

const declaredTypes = (schema: JsonObject | undefined) => {
    const type = schema?.type;
    if (typeof type === "string") return [type];
    return Array.isArray(type)
        ? type.filter((item): item is string => typeof item === "string")
        : [];
};

const propertySchema = (schema: JsonObject | undefined, key: string) => {
    const properties = isObject(schema?.properties)
        ? schema.properties
        : undefined;
    return properties?.[key];
};

const itemSchema = (schema: JsonObject | undefined) => schema?.items;

const buildShape = (
    values: ShapeValue[],
    schemas: unknown[] = [],
    schemaRoot?: unknown,
): unknown => {
    const resolvedSchemas = values.map((value, index) =>
        resolveSchema(schemas[index], value, schemaRoot),
    );
    const declared = new Set(resolvedSchemas.flatMap(declaredTypes));
    const declaredSamples = new Map<string, unknown>([
        ["null", null],
        ["string", ""],
        ["boolean", false],
        ["number", 0],
        ["integer", 0],
    ]);
    for (const [type, sample] of declaredSamples) {
        const observedType = type === "integer" ? "number" : type;
        if (
            declared.has(type) &&
            !values.some((value) => primitiveType(value) === observedType)
        ) {
            values = [...values, sample];
            resolvedSchemas.push(
                resolvedSchemas.find((schema) =>
                    declaredTypes(schema).includes(type),
                ),
            );
        }
    }

    const types = [...new Set(values.map(primitiveType))].sort();
    const concreteTypes = types.filter(
        (type) => type !== "absent" && type !== "null",
    );

    if (concreteTypes.length === 0) return types.join("|");

    if (
        concreteTypes.length === 1 &&
        concreteTypes[0] === "object" &&
        values.every(
            (value) => value === absent || value === null || isObject(value),
        )
    ) {
        const objects = values.flatMap((value, index) =>
            isObject(value) ? [{ value, schema: resolvedSchemas[index] }] : [],
        );
        const keys = [
            ...new Set(objects.flatMap(({ value }) => Object.keys(value))),
        ].sort();
        const shape = Object.fromEntries(
            keys.map((key) => [
                key,
                buildShape(
                    objects.map(({ value }) =>
                        key in value ? value[key] : absent,
                    ),
                    objects.map(({ schema }) => propertySchema(schema, key)),
                    schemaRoot,
                ),
            ]),
        );
        if (types.includes("absent") || types.includes("null")) {
            return {
                oneOf: uniqueSorted([
                    ...types.filter(
                        (type) => type === "absent" || type === "null",
                    ),
                    shape,
                ]),
            };
        }
        return shape;
    }

    if (
        concreteTypes.length === 1 &&
        concreteTypes[0] === "array" &&
        values.every(
            (value) =>
                value === absent || value === null || Array.isArray(value),
        )
    ) {
        const arrays = values.flatMap((value, index) =>
            Array.isArray(value)
                ? [{ value, schema: resolvedSchemas[index] }]
                : [],
        );
        const elements = arrays.flatMap(({ value }) => value);
        const elementSchemas = arrays.flatMap(({ value, schema }) =>
            value.map(() => itemSchema(schema)),
        );
        const arrayShape =
            elements.length === 0
                ? []
                : [buildShape(elements, elementSchemas, schemaRoot)];
        if (types.includes("absent") || types.includes("null")) {
            return {
                oneOf: uniqueSorted([
                    ...types.filter(
                        (type) => type === "absent" || type === "null",
                    ),
                    arrayShape,
                ]),
            };
        }
        return arrayShape;
    }

    if (types.length === 1) return types[0];

    const complex = values
        .map((value, index) => ({ value, schema: resolvedSchemas[index] }))
        .filter(({ value }) => isObject(value) || Array.isArray(value))
        .map(({ value, schema }) => buildShape([value], [schema], schemaRoot));
    const primitives = types.filter(
        (type) => type !== "object" && type !== "array",
    );
    return { oneOf: uniqueSorted([...primitives, ...complex]) };
};

export const publicShape = (
    value: unknown,
    context?: PublicShapeSchemaContext,
): unknown =>
    buildShape([value], context ? [context.schema] : [], context?.root);

export const publicCollectionShape = (
    values: unknown[],
    context?: PublicShapeSchemaContext,
): unknown =>
    buildShape(
        values,
        context ? values.map(() => context.schema) : [],
        context?.root,
    );
