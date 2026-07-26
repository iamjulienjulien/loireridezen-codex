// src/components/ui/collection-rank/collection-rank.tsx

import type { CSSProperties } from "react";

import styles from "./collection-rank.module.css";

export type CollectionRankVariant = "badge" | "medal" | "plain";

export type CollectionRankSize = "sm" | "md" | "lg";

export type CollectionRankProps = {
    rank: number;
    variant?: CollectionRankVariant;
    size?: CollectionRankSize;
    className?: string;
    showLabel?: boolean;
};

type RankTier = "gold" | "silver" | "bronze" | "standard";

type RankVisual = {
    tier: RankTier;
    metalLabel?: string;
    accessibleLabel: string;
};

function getRankVisual(rank: number): RankVisual {
    switch (rank) {
        case 1:
            return {
                tier: "gold",
                metalLabel: "Or",
                accessibleLabel: "Première place",
            };

        case 2:
            return {
                tier: "silver",
                metalLabel: "Argent",
                accessibleLabel: "Deuxième place",
            };

        case 3:
            return {
                tier: "bronze",
                metalLabel: "Bronze",
                accessibleLabel: "Troisième place",
            };

        default:
            return {
                tier: "standard",
                accessibleLabel: `Rang ${rank}`,
            };
    }
}

function joinClassNames(
    ...classNames: Array<string | false | null | undefined>
): string {
    return classNames.filter(Boolean).join(" ");
}

export function CollectionRank({
    rank,
    variant = "badge",
    size = "md",
    className,
    showLabel = false,
}: CollectionRankProps) {
    const normalizedRank = Math.max(1, Math.floor(rank));
    const visual = getRankVisual(normalizedRank);

    const style = {
        "--rank-value":
            normalizedRank <= 3 ? `"${visual.metalLabel ?? ""}"` : `""`,
    } as CSSProperties;

    return (
        <span
            className={joinClassNames(
                styles.rank,
                styles[variant],
                styles[size],
                styles[visual.tier],
                showLabel && styles.withLabel,
                className,
            )}
            style={style}
            aria-label={visual.accessibleLabel}
            data-rank={normalizedRank}
            data-tier={visual.tier}
        >
            <span className={styles.number} aria-hidden="true">
                {String(normalizedRank).padStart(2, "0")}
            </span>

            {showLabel ? (
                <span className={styles.label}>
                    {visual.metalLabel ?? `Rang ${normalizedRank}`}
                </span>
            ) : null}
        </span>
    );
}

export default CollectionRank;
