import type { LRZColor } from "@/registry/colors";

/**
 * Structure commune à toutes les valeurs de métadonnées des collections.
 */
export type CollectionMetaDefinition<TSlug extends string = string> = {
    readonly slug: TSlug;
    readonly label: string;
    readonly color: LRZColor;
};

type CollectionMetaInput = Omit<CollectionMetaDefinition, "slug">;

export type CollectionMetaRegistry = Readonly<
    Record<string, CollectionMetaDefinition>
>;

type DefinedCollectionMetaRegistry<
    TDefinitions extends Readonly<Record<string, CollectionMetaInput>>,
> = {
    readonly [
        TSlug in Extract<keyof TDefinitions, string>
    ]: CollectionMetaDefinition<TSlug>;
};

/**
 * Construit un registre de métadonnées et injecte sa clé dans chaque entrée.
 *
 * Les registres déclarent ainsi uniquement `label` et `color`, tandis que la
 * structure publique reste toujours `{ slug, label, color }`.
 */
export function defineCollectionMetaRegistry<
    const TDefinitions extends Readonly<Record<string, CollectionMetaInput>>,
>(definitions: TDefinitions): DefinedCollectionMetaRegistry<TDefinitions> {
    return Object.fromEntries(
        Object.entries(definitions).map(([slug, definition]) => [
            slug,
            { slug, ...definition },
        ]),
    ) as DefinedCollectionMetaRegistry<TDefinitions>;
}

export function isCollectionMetaSlug<
    const TRegistry extends CollectionMetaRegistry,
>(
    registry: TRegistry,
    value: string,
): value is Extract<keyof TRegistry, string> {
    return Object.hasOwn(registry, value);
}

export function getCollectionMeta<
    const TRegistry extends CollectionMetaRegistry,
>(
    registry: TRegistry,
    slug: string,
): TRegistry[Extract<keyof TRegistry, string>] | undefined {
    return isCollectionMetaSlug(registry, slug) ? registry[slug] : undefined;
}
