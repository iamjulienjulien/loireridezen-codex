"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import { trackCardOpen } from "@/lib/analytics";

import { useIndexCardTracking } from "./IndexCardTrackingProvider";

export type TrackedCardLinkProps = ComponentProps<typeof Link> & {
    entrySlug: string;
};

export function resolveCardTrackingPosition(
    entrySlugs: readonly string[],
    entrySlug: string,
) {
    const entryIndex = entrySlugs.indexOf(entrySlug);

    if (entryIndex < 0 || entrySlugs.length === 0) {
        return null;
    }

    return {
        position: entryIndex + 1,
        totalItems: entrySlugs.length,
    };
}

export default function TrackedCardLink({
    entrySlug,
    onClick,
    ...props
}: TrackedCardLinkProps) {
    const tracking = useIndexCardTracking();
    const resolvedPosition = tracking
        ? resolveCardTrackingPosition(tracking.entrySlugs, entrySlug)
        : null;

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (event.defaultPrevented || !tracking || !resolvedPosition) {
            return;
        }

        trackCardOpen({
            index_slug: tracking.indexSlug,
            entry_slug: entrySlug,
            position: resolvedPosition.position,
            total_items: resolvedPosition.totalItems,
        });
    };

    return (
        <Link
            {...props}
            onClick={handleClick}
            data-analytics-event={resolvedPosition ? "card_open" : undefined}
            data-analytics-index-slug={
                resolvedPosition ? tracking?.indexSlug : undefined
            }
            data-analytics-entry-slug={resolvedPosition ? entrySlug : undefined}
            data-analytics-position={resolvedPosition?.position}
            data-analytics-total-items={resolvedPosition?.totalItems}
        />
    );
}
