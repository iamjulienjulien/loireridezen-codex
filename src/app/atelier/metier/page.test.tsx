import type { ComponentProps, ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import AtelierCategoryLayout from "@/components/_atelier/AtelierCategoryLayout";

import MetierShowcase from "./MetierShowcase";
import AtelierMetierPage from "./page";

const getShowcase = () => {
    const page = AtelierMetierPage() as ReactElement<
        ComponentProps<typeof AtelierCategoryLayout>
    >;
    const children = page.props.children as ReactElement[];

    return children[0] as ReactElement<ComponentProps<typeof MetierShowcase>>;
};

describe("Atelier métier followTheThread prototype", () => {
    afterEach(() => vi.unstubAllEnvs());

    it.each(["development", "staging"] as const)(
        "exposes the six acceptance scenarios in %s",
        (environment) => {
            vi.stubEnv("CURRENT_ENV", environment);

            const showcase = getShowcase();

            expect(showcase.type).toBe(MetierShowcase);
            expect(showcase.props.followTheThreadEnabled).toBe(true);
            expect(showcase.props.chateauExamples).toHaveLength(6);
            expect(showcase.props.vineyardTerritoriesExamples).toHaveLength(3);
            expect(showcase.props.territoryVineyardsExamples).toHaveLength(3);
            expect(
                showcase.props.vineyardTerritoriesExamples.map(
                    ({ territoires }) => territoires.length,
                ),
            ).toEqual([1, 3, 2]);
            expect(
                showcase.props.territoryVineyardsExamples.map(
                    ({ vignobles }) => vignobles.length,
                ),
            ).toEqual([3, 18, 0]);
            expect(
                showcase.props.chateauExamples.some(({ nearbyGuinguettes }) =>
                    nearbyGuinguettes.some(
                        ({ guinguette }) => guinguette.statut === "a_verifier",
                    ),
                ),
            ).toBe(true);
        },
    );

    it("keeps the prototype disabled in production", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        expect(getShowcase().props.followTheThreadEnabled).toBe(false);
    });
});
