import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { VignoblesParTerritoire } from "@/lib/vignobles-territoires";

import GuinguettesIndex from "./GuinguettesIndex";
import { GuinguettesRoute } from "./GuinguettesRoute";

type GuinguettesIndexElement = ReactElement<{
    vignoblesByTerritoire?: VignoblesParTerritoire;
}>;

const getIndexElement = () => {
    const route = GuinguettesRoute() as ReactElement<{
        children: GuinguettesIndexElement;
    }>;

    expect(route.props.children.type).toBe(GuinguettesIndex);

    return route.props.children;
};

describe("GuinguettesRoute · vignobles territoriaux", () => {
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
