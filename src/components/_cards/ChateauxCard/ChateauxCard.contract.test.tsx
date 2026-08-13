import chateauxData from "@data/catalogue-chateaux.json";
import guinguettesData from "@data/catalogue-guinguettes.json";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, expectTypeOf, it } from "vitest";

import ChateauxCard, {
    type ChateauCardProps,
} from "@/components/_cards/ChateauxCard";
import { AmbianceProvider } from "@/hooks/useAmbiance";
import type { NearbyGuinguette } from "@/lib/nearby-guinguettes";
import type { Chateau } from "@/types/chateau";
import type { Guinguette } from "@/types/guinguette";

const CHATEAU = chateauxData.chateaux[0] as Chateau;
const GUINGUETTES = guinguettesData.guinguettes as Guinguette[];

const renderCard = ({
    chateau = CHATEAU,
    nearbyGuinguettes,
}: {
    chateau?: Chateau;
    nearbyGuinguettes?: readonly NearbyGuinguette[];
} = {}) =>
    renderToStaticMarkup(
        <AmbianceProvider>
            <ChateauxCard d={chateau} nearbyGuinguettes={nearbyGuinguettes} />
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
        expect(renderCard()).toContain("Visite &amp; expériences");
        expect(renderCard({ nearbyGuinguettes: [] })).toContain(
            "Visite &amp; alentours",
        );
    });

    it("renders labelled experiences and nearby Guinguette rows", () => {
        const reviewGuinguette =
            GUINGUETTES.find(({ statut }) => statut === "a_verifier") ??
            GUINGUETTES[0];
        const nearbyGuinguettes = [
            { guinguette: reviewGuinguette, distanceKm: 0.646 },
            { guinguette: GUINGUETTES[1], distanceKm: 1.1 },
            { guinguette: GUINGUETTES[2], distanceKm: 1.4 },
        ] satisfies NearbyGuinguette[];
        const markup = renderCard({ nearbyGuinguettes });

        expect(markup).toContain(
            "Expériences au château et guinguettes à proximité",
        );
        expect(markup).toContain('data-variant="badge"');
        expect(markup).toContain("Après la visite");
        expect(markup).toContain(reviewGuinguette.nom);
        expect(markup).toContain("650 m");
        expect(markup.match(/href="\/guinguette\//g)).toHaveLength(3);
        expect(markup).toContain(`?retour=%2Fchateau%2F${CHATEAU.slug}`);

        if (reviewGuinguette.statut === "a_verifier") {
            expect(markup).toContain("Informations à vérifier");
        }
    });

    it("hides the enriched accordion when it has no content", () => {
        const chateauWithoutExperiences = {
            ...CHATEAU,
            meta: {
                ...CHATEAU.meta,
                experience: [],
            },
        } satisfies Chateau;
        const markup = renderCard({
            chateau: chateauWithoutExperiences,
            nearbyGuinguettes: [],
        });

        expect(markup).not.toContain("Visite &amp; alentours");
        expect(markup).not.toContain("Après la visite");
    });
});
