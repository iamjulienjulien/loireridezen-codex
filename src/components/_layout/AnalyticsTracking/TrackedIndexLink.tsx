"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import { trackIndexOpen, type IndexOpenSource } from "@/lib/analytics";

export type TrackedIndexLinkProps = ComponentProps<typeof Link> & {
    indexSlug: string;
    source: IndexOpenSource;
    trackingEnabled?: boolean;
};

export default function TrackedIndexLink({
    indexSlug,
    source,
    trackingEnabled = true,
    onClick,
    ...props
}: TrackedIndexLinkProps) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (event.defaultPrevented || !trackingEnabled) {
            return;
        }

        trackIndexOpen({ index_slug: indexSlug, source });
    };

    return (
        <Link
            {...props}
            onClick={handleClick}
            data-analytics-event={trackingEnabled ? "index_open" : undefined}
            data-analytics-index-slug={trackingEnabled ? indexSlug : undefined}
            data-analytics-source={trackingEnabled ? source : undefined}
        />
    );
}

export { TrackedIndexLink };
