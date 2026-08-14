import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { VignoblesParTerritoire } from "@/lib/vignobles-territoires";

import TerritoiresIndex from "./TerritoiresIndex";
import { TerritoiresRoute } from "./TerritoiresRoute";

type TerritoiresIndexElement = ReactElement<{
    vignoblesByTerritoire?: VignoblesParTerritoire;
}>;

const getIndexElement = () => {
    const route = TerritoiresRoute() as ReactElement<{
        children: TerritoiresIndexElement;
    }>;

    expect(route.props.children.type).toBe(TerritoiresIndex);

    return route.props.children;
};

describe("TerritoiresRoute · followTheThread", () => {
    afterEach(() => vi.unstubAllEnvs());

    it.each(["development", "staging"])(
        "construit l'index inverse en environnement %s",
        (environment) => {
            vi.stubEnv("CURRENT_ENV", environment);

            const relations = getIndexElement().props.vignoblesByTerritoire;

            expect(relations).toBeDefined();
            expect(relations?.nivernais).toHaveLength(3);
            expect(relations?.anjou?.length).toBeGreaterThan(3);
            expect(relations?.["bretagne-ligerienne"]?.length).toBeGreaterThan(
                3,
            );
        },
    );

    it("ne transmet aucun enrichissement en production", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        expect(getIndexElement().props.vignoblesByTerritoire).toBeUndefined();
    });
});
