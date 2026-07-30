/**
 * Registre des feature flags du Codex ligérien.
 *
 * Chaque flag contient la liste des environnements dans lesquels il est actif.
 * Un tableau vide désactive le flag partout.
 */

import { isEnv, type Env } from "@/registry/indexes";

const defineFeatureFlags = <
    const TFeatureFlags extends Record<string, readonly Env[]>,
>(
    featureFlags: TFeatureFlags,
) => featureFlags;

/**
 * Source de vérité unique des feature flags.
 *
 * Exemple :
 *
 * new_feature: ["development"],
 */
export const FEATURE_FLAGS = defineFeatureFlags({
    atelier: ["development"],
    collections: [],
    indexesCustomEmoji: [],
    ambianceChateauxVisual: ["development"],
    commandPalette: ["development"],
    territoires: ["development", "production"],
    indexControlsSection: [],
    chateauxViewportMapSpike: [],
    chateauxInteractiveMap: ["development"],
    personnages: ["development"],
});

export type FeatureFlagName = keyof typeof FEATURE_FLAGS;

export const isFeatureFlagName = (value: string): value is FeatureFlagName =>
    Object.hasOwn(FEATURE_FLAGS, value);

export const featureIsEnabled = (
    feature: FeatureFlagName,
    env?: Env,
): boolean => {
    const currentEnv =
        env ?? process.env.CURRENT_ENV ?? process.env.NEXT_PUBLIC_CURRENT_ENV;

    if (!isEnv(currentEnv)) {
        throw new Error(`CURRENT_ENV invalide ou absent : ${currentEnv}`);
    }

    return FEATURE_FLAGS[feature].some(
        (enabledEnv) => enabledEnv === currentEnv,
    );
};
