import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { VignoblesParTerritoire } from "@/lib/vignobles-territoires";

import ChateauxIndex from "./ChateauxIndex";
import { ChateauxRoute } from "./ChateauxRoute";

type ChateauxIndexElement = ReactElement<{
    vignoblesByTerritoire?: VignoblesParTerritoire;
}>;

const getIndexElement = () => {
    const route = ChateauxRoute() as ReactElement<{
        children: ChateauxIndexElement;
    }>;

    expect(route.props.children.type).toBe(ChateauxIndex);

    return route.props.children;
};

describe("ChateauxRoute · vignobles territoriaux", () => {
    afterEach(() => vi.unstubAllEnvs());

    it.each(["development", "staging"])(
        "prépare l'aperçu en environnement %s",
        (environment) => {
            vi.stubEnv("CURRENT_ENV", environment);

            const relations = getIndexElement().props.vignoblesByTerritoire;

            expect(relations?.nivernais).toHaveLength(3);
            expect(relations?.anjou?.length).toBeGreaterThan(3);
        },
    );

    it("ne transmet aucun aperçu en production", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        expect(getIndexElement().props.vignoblesByTerritoire).toBeUndefined();
    });
});
