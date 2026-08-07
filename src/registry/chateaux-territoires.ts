import type { ChateauV2 } from "@/types/chateauV2";
import { TERRITOIRES, type TerritoireSlug } from "./territoires";

/** Association éditoriale centralisée entre les châteaux et les territoires. */
export const CHATEAUX_PAR_TERRITOIRE = {
    nivernais: [
        "palais-ducal-de-nevers",
        "chateau-de-la-bussiere",
        "chateau-de-saint-brisson-sur-loire",
    ],
    orleanais: [
        "chateau-de-gien",
        "chateau-de-sully-sur-loire",
        "chateau-de-chamerolles",
        "chateau-de-meung-sur-loire",
        "chateau-de-beaugency",
    ],
    blaisois: [
        "chateau-de-chambord",
        "chateau-de-villesavin",
        "chateau-de-cheverny",
        "chateau-de-beauregard",
        "chateau-royal-de-blois",
        "chateau-de-fougeres-sur-bievre",
        "chateau-de-talcy",
        "chateau-de-menars",
        "domaine-de-chaumont-sur-loire",
    ],
    touraine: [
        "chateau-royal-d-amboise",
        "domaine-royal-de-chateau-gaillard",
        "chateau-du-clos-luce",
        "chateau-de-chenonceau",
        "chateau-de-montpoupon",
        "chateau-de-montresor",
        "cite-royale-de-loches",
        "domaine-de-cande",
        "chateau-du-plessis-les-tours",
        "chateau-de-villandry",
        "chateau-d-azay-le-rideau",
        "chateau-de-l-islette",
        "chateau-de-sache",
        "chateau-de-langeais",
    ],
    chinonais: [
        "chateau-d-usse",
        "chateau-du-rivau",
        "forteresse-royale-de-chinon",
        "chateau-de-valencay",
    ],
    anjou: [
        "chateau-du-lude",
        "chateau-de-bauge",
        "chateau-de-gizeux",
        "chateau-de-montgeoffroy",
        "chateau-de-brissac",
        "chateau-du-plessis-bourre",
        "chateau-du-plessis-mace",
        "chateau-d-angers",
        "chateau-de-serrant",
    ],
    saumurois: [
        "chateau-de-montsoreau",
        "chateau-de-breze",
        "chateau-de-montreuil-bellay",
        "chateau-de-saumur",
    ],
    "bretagne-ligerienne": [
        "chateau-d-ancenis",
        "chateau-d-oudon",
        "chateau-de-goulaine",
        "chateau-des-ducs-de-bretagne",
    ],
} as const satisfies Record<TerritoireSlug, readonly string[]>;

const TERRITOIRE_PAR_CHATEAU = new Map<string, TerritoireSlug>(
    Object.entries(CHATEAUX_PAR_TERRITOIRE).flatMap(([territory, slugs]) =>
        slugs.map((slug) => [slug, territory as TerritoireSlug]),
    ),
);

export function getTerritoireSlugForChateau(
    chateau: Pick<ChateauV2, "slug">,
): TerritoireSlug | undefined {
    return TERRITOIRE_PAR_CHATEAU.get(chateau.slug);
}

export function getTerritoireChateaux(
    chateaux: readonly ChateauV2[],
    territorySlug: TerritoireSlug,
) {
    const order = new Map<string, number>(
        CHATEAUX_PAR_TERRITOIRE[territorySlug].map((slug, index) => [
            slug,
            index,
        ]),
    );

    return chateaux
        .filter(
            (chateau) => getTerritoireSlugForChateau(chateau) === territorySlug,
        )
        .sort((a, b) => {
            const longitudeOrder = b.coordonnees.lng - a.coordonnees.lng;

            return (
                longitudeOrder ||
                (order.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
                    (order.get(b.slug) ?? Number.MAX_SAFE_INTEGER)
            );
        });
}

export function getTerritoiresWithChateaux(chateaux: readonly ChateauV2[]) {
    return TERRITOIRES.map((territory) => ({
        territory,
        chateaux: getTerritoireChateaux(chateaux, territory.slug),
    })).filter(({ chateaux }) => chateaux.length > 0);
}
