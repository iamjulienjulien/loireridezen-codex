import type { Guinguette } from "@/types/guinguette";
import { TERRITOIRES } from "@/registry/territoires";

/** Regroupe les guinguettes du catalogue selon les territoires du Codex. */
export function getTerritoiresWithGuinguettes(
    guinguettes: readonly Guinguette[],
) {
    return TERRITOIRES.map((territory) => ({
        territory,
        guinguettes: guinguettes.filter(
            (guinguette) => guinguette.territoire === territory.slug,
        ),
    })).filter(({ guinguettes }) => guinguettes.length > 0);
}
