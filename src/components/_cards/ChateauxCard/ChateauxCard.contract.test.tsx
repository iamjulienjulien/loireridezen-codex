import chateauxData from "@data/catalogue-chateaux.json";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, expectTypeOf, it } from "vitest";

import ChateauxCard, {
    type ChateauCardProps,
} from "@/components/_cards/ChateauxCard";
import { AmbianceProvider } from "@/hooks/useAmbiance";
import type { NearbyGuinguette } from "@/lib/nearby-guinguettes";
import type { Chateau } from "@/types/chateau";

const CHATEAU = chateauxData.chateaux[0] as Chateau;

const renderCard = (nearbyGuinguettes?: readonly NearbyGuinguette[]) =>
    renderToStaticMarkup(
        <AmbianceProvider>
            <ChateauxCard d={CHATEAU} nearbyGuinguettes={nearbyGuinguettes} />
        </AmbianceProvider>,
    );

describe("ChateauxCard nearby Guinguettes contract", () => {
    it("exposes a readonly optional list of precomputed matches", () => {
        expectTypeOf<ChateauCardProps["nearbyGuinguettes"]>().toEqualTypeOf<
            readonly NearbyGuinguette[] | undefined
        >();
    });

    it("keeps an unavailable enrichment distinct from an empty result", () => {
        const unavailableProps = {
            d: CHATEAU,
        } satisfies ChateauCardProps;
        const emptyProps = {
            d: CHATEAU,
            nearbyGuinguettes: [],
        } satisfies ChateauCardProps;

        expect(unavailableProps).not.toHaveProperty("nearbyGuinguettes");
        expect(emptyProps).toHaveProperty("nearbyGuinguettes", []);
        expect(renderCard()).toBe(renderCard([]));
    });
});
