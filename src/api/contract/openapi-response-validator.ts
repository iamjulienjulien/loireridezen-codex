import { readFileSync } from "node:fs";
import { join } from "node:path";
import Ajv2020, {
    type ErrorObject,
    type ValidateFunction,
} from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

type HttpMethod = "GET" | "HEAD" | "OPTIONS";
type JsonObject = Record<string, unknown>;

interface OpenApiOperation {
    responses?: Record<string, JsonObject>;
}

interface OpenApiPathItem {
    get?: OpenApiOperation;
    head?: OpenApiOperation;
    options?: OpenApiOperation;
}

interface OpenApiDocument {
    paths?: Record<string, OpenApiPathItem>;
    components?: {
        responses?: Record<string, JsonObject>;
        schemas?: Record<string, JsonObject>;
    };
}

export interface ValidatePublicResponseInput {
    method: HttpMethod;
    openApiPath: string;
    requestPath: string;
    response: Response;
}

interface SelectedSchema {
    name: string;
    schema: unknown;
}

const contractPath = join(process.cwd(), "public", "api", "v1", "openapi.json");
const contract = JSON.parse(
    readFileSync(contractPath, "utf8"),
) as OpenApiDocument;

if (!contract.paths || !contract.components?.schemas) {
    throw new Error(
        `The OpenAPI contract is missing paths or component schemas: ${contractPath}`,
    );
}

const schemaRootId = "urn:loireridezen:codex:openapi:v1";

// OpenAPI 3.1 schemas use JSON Schema 2020-12, but the component container and
// annotation keywords are not themselves JSON Schema keywords. Keeping
// strictTypes enabled while relaxing strictSchema lets Ajv resolve the original
// internal references without weakening type validation.
const ajv = new Ajv2020({
    allErrors: true,
    coerceTypes: false,
    useDefaults: false,
    removeAdditional: false,
    strictSchema: false,
    strictTypes: true,
});
addFormats(ajv);
ajv.addSchema({
    $id: schemaRootId,
    components: {
        schemas: contract.components.schemas,
    },
});

const validators = new Map<string, ValidateFunction>();

const isObject = (value: unknown): value is JsonObject =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const decodePointerToken = (token: string) =>
    decodeURIComponent(token).replaceAll("~1", "/").replaceAll("~0", "~");

const resolveLocalReference = (reference: string): unknown => {
    if (!reference.startsWith("#/")) {
        throw new Error(
            `External OpenAPI reference is not supported: ${reference}`,
        );
    }

    return reference
        .slice(2)
        .split("/")
        .map(decodePointerToken)
        .reduce<unknown>((value, token) => {
            if (!isObject(value) || !(token in value)) {
                throw new Error(`Unresolved OpenAPI reference: ${reference}`);
            }
            return value[token];
        }, contract);
};

const resolveObject = (value: unknown): JsonObject => {
    if (!isObject(value)) {
        throw new Error("Expected an OpenAPI object.");
    }

    const reference = value.$ref;
    return typeof reference === "string"
        ? resolveObject(resolveLocalReference(reference))
        : value;
};

const absoluteSchemaReferences = (value: unknown): unknown => {
    if (Array.isArray(value)) {
        return value.map(absoluteSchemaReferences);
    }
    if (!isObject(value)) return value;

    return Object.fromEntries(
        Object.entries(value).map(([key, child]) => {
            if (
                key === "$ref" &&
                typeof child === "string" &&
                child.startsWith("#/components/schemas/")
            ) {
                return [key, `${schemaRootId}${child}`];
            }
            return [key, absoluteSchemaReferences(child)];
        }),
    );
};

const selectedSchemaName = (schema: unknown, fallback: string) => {
    if (!isObject(schema) || typeof schema.$ref !== "string") return fallback;
    return schema.$ref.split("/").at(-1) ?? fallback;
};

const selectResponseSchema = (
    input: ValidatePublicResponseInput,
): SelectedSchema => {
    const pathItem = contract.paths?.[input.openApiPath];
    if (!pathItem) {
        throw new Error(`Undocumented OpenAPI path: ${input.openApiPath}`);
    }

    const operation =
        pathItem[input.method.toLowerCase() as keyof OpenApiPathItem];
    if (!operation) {
        throw new Error(
            `Undocumented OpenAPI operation: ${input.method} ${input.openApiPath}`,
        );
    }

    const responseDefinition =
        operation.responses?.[String(input.response.status)] ??
        operation.responses?.default;
    if (!responseDefinition) {
        throw new Error(
            `Undocumented status ${input.response.status} for ${input.method} ${input.openApiPath}`,
        );
    }

    const response = resolveObject(responseDefinition);
    const contentTypeHeader = input.response.headers.get("content-type");
    if (!contentTypeHeader) {
        throw new Error(
            `Missing Content-Type for ${input.method} ${input.requestPath} → ${input.response.status}`,
        );
    }
    const mediaType = contentTypeHeader.split(";", 1)[0].trim().toLowerCase();
    const content = resolveObject(response.content);
    const media = content[mediaType];
    if (!isObject(media)) {
        throw new Error(
            `Undocumented media type ${mediaType} for ${input.method} ${input.requestPath} → ${input.response.status}`,
        );
    }
    if (!("schema" in media)) {
        throw new Error(
            `Missing response schema for ${input.method} ${input.openApiPath} → ${input.response.status} (${mediaType})`,
        );
    }

    return {
        name: selectedSchemaName(
            media.schema,
            `${input.openApiPath} ${input.method} ${input.response.status} ${mediaType}`,
        ),
        schema: media.schema,
    };
};

const formatAjvPath = (error: ErrorObject) => {
    const missing =
        error.keyword === "required" &&
        typeof error.params.missingProperty === "string"
            ? `/${error.params.missingProperty}`
            : "";
    const pointer = `${error.instancePath}${missing}`;
    return `body${pointer.replaceAll("/", ".") || ""}`;
};

const formatValidationFailure = (
    input: ValidatePublicResponseInput,
    mediaType: string,
    schemaName: string,
    errors: ErrorObject[],
) =>
    [
        `${input.method} ${input.requestPath} → ${input.response.status}`,
        `content-type: ${mediaType}`,
        `schema: ${schemaName}`,
        ...errors.map(
            (error) =>
                `${formatAjvPath(error)}: ${error.keyword} ${error.message ?? "validation failed"}`,
        ),
    ].join("\n");

export const validatePublicResponse = async (
    input: ValidatePublicResponseInput,
): Promise<unknown> => {
    const contentType =
        input.response.headers
            .get("content-type")
            ?.split(";", 1)[0]
            .trim()
            .toLowerCase() ?? "<missing>";
    const selected = selectResponseSchema(input);
    const cacheKey = [
        input.method,
        input.openApiPath,
        input.response.status,
        contentType,
    ].join(" ");

    let validate = validators.get(cacheKey);
    if (!validate) {
        validate = ajv.compile(
            absoluteSchemaReferences(selected.schema) as JsonObject,
        );
        validators.set(cacheKey, validate);
    }

    const rawBody = await input.response.clone().text();
    if (rawBody.length === 0) {
        throw new Error(
            `${input.method} ${input.requestPath} → ${input.response.status}\n` +
                `content-type: ${contentType}\n` +
                `schema: ${selected.name}\n` +
                "body: expected JSON body is missing",
        );
    }

    let body: unknown;
    try {
        body = JSON.parse(rawBody);
    } catch {
        throw new Error(
            `${input.method} ${input.requestPath} → ${input.response.status}\n` +
                `content-type: ${contentType}\n` +
                `schema: ${selected.name}\n` +
                "body: invalid JSON",
        );
    }

    if (!validate(body)) {
        throw new Error(
            formatValidationFailure(
                input,
                contentType,
                selected.name,
                validate.errors ?? [],
            ),
        );
    }

    return body;
};
