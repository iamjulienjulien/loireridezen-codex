"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import { trackRelationOpen, type RelationOpenEvent } from "@/lib/analytics";

export type TrackedRelationLinkProps = ComponentProps<typeof Link> &
    Omit<RelationOpenEvent, "event">;

export default function TrackedRelationLink({
    source_index,
    source_slug,
    target_index,
    target_slug,
    surface,
    visible_items,
    total_items,
    onClick,
    ...props
}: TrackedRelationLinkProps) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (event.defaultPrevented) return;

        trackRelationOpen({
            source_index,
            source_slug,
            target_index,
            target_slug,
            surface,
            visible_items,
            total_items,
        });
    };

    return (
        <Link
            {...props}
            onClick={handleClick}
            data-analytics-event="relation_open"
            data-analytics-source-index={source_index}
            data-analytics-source-slug={source_slug}
            data-analytics-target-index={target_index}
            data-analytics-target-slug={target_slug}
            data-analytics-surface={surface}
            data-analytics-visible-items={visible_items}
            data-analytics-total-items={total_items}
        />
    );
}

export { TrackedRelationLink };
