import { isTerritoireSlug, type TerritoireSlug } from "@/registry/territoires";
import type { TerritoireCatalogueEntry } from "@/types/territoireCatalogue";
import type { Vignoble } from "@/types/vignoble";

export type VignobleTerritoireView = {
    territoire: TerritoireCatalogueEntry;
    principal: boolean;
};

export type VignoblesParTerritoire = Partial<
    Record<TerritoireSlug, readonly Vignoble[]>
>;

const getTerritoiresBySlug = (
    territoires: readonly TerritoireCatalogueEntry[],
): ReadonlyMap<TerritoireSlug, TerritoireCatalogueEntry> =>
    new Map(
        territoires.flatMap((territoire) =>
            isTerritoireSlug(territoire.slug)
                ? [[territoire.slug, territoire] as const]
                : [],
        ),
    );

export const resolveVignobleTerritoires = (
    vignoble: Vignoble,
    territoires: readonly TerritoireCatalogueEntry[],
): VignobleTerritoireView[] => {
    const territoiresBySlug = getTerritoiresBySlug(territoires);
    const principal = vignoble.meta.territoirePrincipal;
    const slugs = [...vignoble.meta.territoires];

    if (principal !== undefined) {
        const principalIndex = slugs.indexOf(principal);

        if (principalIndex > 0) {
            slugs.splice(principalIndex, 1);
            slugs.unshift(principal);
        }
    }

    return slugs.flatMap((slug): VignobleTerritoireView[] => {
        const territoire = territoiresBySlug.get(slug);

        return territoire === undefined
            ? []
            : [{ territoire, principal: slug === principal }];
    });
};

export const buildVignoblesParTerritoire = (
    vignobles: readonly Vignoble[],
    territoires: readonly TerritoireCatalogueEntry[],
): VignoblesParTerritoire => {
    const territoiresBySlug = getTerritoiresBySlug(territoires);
    const principaux = new Map<TerritoireSlug, Vignoble[]>();
    const secondaires = new Map<TerritoireSlug, Vignoble[]>();

    for (const vignoble of vignobles) {
        const slugsVisites = new Set<TerritoireSlug>();

        for (const slug of vignoble.meta.territoires) {
            if (!territoiresBySlug.has(slug) || slugsVisites.has(slug)) {
                continue;
            }

            slugsVisites.add(slug);
            const destination =
                vignoble.meta.territoirePrincipal === slug
                    ? principaux
                    : secondaires;
            const bucket = destination.get(slug) ?? [];
            bucket.push(vignoble);
            destination.set(slug, bucket);
        }
    }

    const result: VignoblesParTerritoire = {};

    for (const territoire of territoires) {
        if (!isTerritoireSlug(territoire.slug)) {
            continue;
        }

        const vignoblesDuTerritoire = [
            ...(principaux.get(territoire.slug) ?? []),
            ...(secondaires.get(territoire.slug) ?? []),
        ];

        if (vignoblesDuTerritoire.length > 0) {
            result[territoire.slug] = vignoblesDuTerritoire;
        }
    }

    return result;
};
