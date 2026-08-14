import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { TerritoiresParVignoble } from "@/lib/vignobles-territoires";

import VignoblesIndex from "./VignoblesIndex";
import { VignoblesRoute } from "./VignoblesRoute";

type VignoblesIndexElement = ReactElement<{
    territoiresByVignoble?: TerritoiresParVignoble;
}>;

const getIndexElement = () => {
    const route = VignoblesRoute() as ReactElement<{
        children: VignoblesIndexElement;
    }>;

    expect(route.props.children.type).toBe(VignoblesIndex);

    return route.props.children;
};

describe("VignoblesRoute · followTheThread", () => {
    afterEach(() => vi.unstubAllEnvs());

    it.each(["development", "staging"])(
        "résout les territoires en environnement %s",
        (environment) => {
            vi.stubEnv("CURRENT_ENV", environment);

            const relations = getIndexElement().props.territoiresByVignoble;

            expect(relations).toBeDefined();
            expect(relations?.["pouilly-fume"]).toHaveLength(1);
            expect(relations?.touraine.length).toBeGreaterThan(1);
        },
    );

    it("ne transmet aucun enrichissement en production", () => {
        vi.stubEnv("CURRENT_ENV", "production");

        expect(getIndexElement().props.territoiresByVignoble).toBeUndefined();
    });
});
