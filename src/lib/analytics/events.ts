import { analyticsConsentIsGranted } from "./consent";

export type IndexOpenSource = "home" | "page_header";
export type CardNavigationDirection = "previous" | "next";
export type CardNavigationMode = "button" | "keyboard" | "swipe";
export type RelationIndexSlug =
    "chateaux" | "guinguettes" | "territoires" | "vignobles";
export type RelationSurface =
    | "vignobles_card"
    | "territoire_card"
    | "chateaux_territory_header"
    | "guinguettes_territory_header";

export type IndexOpenEvent = {
    event: "index_open";
    index_slug: string;
    source: IndexOpenSource;
};

export type CardOpenEvent = {
    event: "card_open";
    index_slug: string;
    entry_slug: string;
    position: number;
    total_items: number;
};

export type CardNavigateEvent = {
    event: "card_navigate";
    index_slug: string;
    entry_slug: string;
    previous_entry_slug: string;
    direction: CardNavigationDirection;
    interaction_mode: CardNavigationMode;
    position: number;
    total_items: number;
};

export type RelationOpenEvent = {
    event: "relation_open";
    source_index: RelationIndexSlug;
    source_slug: string;
    target_index: RelationIndexSlug;
    target_slug: string;
    surface: RelationSurface;
    visible_items?: number;
    total_items?: number;
};

export type RelationExpandEvent = {
    event: "relation_expand";
    source_index: RelationIndexSlug;
    source_slug: string;
    surface: RelationSurface;
    visible_items: number;
    total_items: number;
};

export type CodexAnalyticsEvent =
    | IndexOpenEvent
    | CardOpenEvent
    | CardNavigateEvent
    | RelationOpenEvent
    | RelationExpandEvent;

type AnalyticsWindow = Window & {
    dataLayer?: unknown[];
};

const isNonEmptySlug = (value: string) => value.trim().length > 0;

function hasValidPosition(event: CardOpenEvent | CardNavigateEvent): boolean {
    return (
        Number.isInteger(event.position) &&
        Number.isInteger(event.total_items) &&
        event.position >= 1 &&
        event.total_items >= 1 &&
        event.position <= event.total_items
    );
}

const relationIndexes: readonly RelationIndexSlug[] = [
    "chateaux",
    "guinguettes",
    "territoires",
    "vignobles",
];
const relationSurfaces: readonly RelationSurface[] = [
    "vignobles_card",
    "territoire_card",
    "chateaux_territory_header",
    "guinguettes_territory_header",
];

function hasValidRelationCount(
    visibleItems: number | undefined,
    totalItems: number | undefined,
    required: boolean,
) {
    if (visibleItems === undefined || totalItems === undefined) {
        return !required && visibleItems === totalItems;
    }

    return (
        Number.isInteger(visibleItems) &&
        Number.isInteger(totalItems) &&
        visibleItems >= 1 &&
        totalItems >= visibleItems
    );
}

function hasValidRelationIdentity(
    index: RelationIndexSlug,
    slug: string,
    surface: RelationSurface,
) {
    return (
        relationIndexes.includes(index) &&
        isNonEmptySlug(slug) &&
        relationSurfaces.includes(surface)
    );
}

function isValidAnalyticsEvent(event: CodexAnalyticsEvent): boolean {
    if (event.event === "relation_open") {
        return (
            hasValidRelationIdentity(
                event.source_index,
                event.source_slug,
                event.surface,
            ) &&
            relationIndexes.includes(event.target_index) &&
            isNonEmptySlug(event.target_slug) &&
            hasValidRelationCount(event.visible_items, event.total_items, false)
        );
    }

    if (event.event === "relation_expand") {
        return (
            hasValidRelationIdentity(
                event.source_index,
                event.source_slug,
                event.surface,
            ) &&
            hasValidRelationCount(event.visible_items, event.total_items, true)
        );
    }

    if (!isNonEmptySlug(event.index_slug)) return false;

    if (event.event === "index_open") {
        return event.source === "home" || event.source === "page_header";
    }

    if (!isNonEmptySlug(event.entry_slug) || !hasValidPosition(event)) {
        return false;
    }

    if (event.event === "card_open") return true;

    return (
        isNonEmptySlug(event.previous_entry_slug) &&
        (event.direction === "previous" || event.direction === "next") &&
        (event.interaction_mode === "button" ||
            event.interaction_mode === "keyboard" ||
            event.interaction_mode === "swipe")
    );
}

export function trackAnalyticsEvent(event: CodexAnalyticsEvent): boolean {
    if (typeof window === "undefined" || !isValidAnalyticsEvent(event)) {
        return false;
    }

    try {
        if (!analyticsConsentIsGranted(window.localStorage)) {
            return false;
        }

        const analyticsWindow = window as AnalyticsWindow;
        analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
        analyticsWindow.dataLayer.push(event);
        return true;
    } catch {
        return false;
    }
}

export function trackIndexOpen(event: Omit<IndexOpenEvent, "event">): boolean {
    return trackAnalyticsEvent({ event: "index_open", ...event });
}

export function trackCardOpen(event: Omit<CardOpenEvent, "event">): boolean {
    return trackAnalyticsEvent({ event: "card_open", ...event });
}

export function trackCardNavigate(
    event: Omit<CardNavigateEvent, "event">,
): boolean {
    return trackAnalyticsEvent({ event: "card_navigate", ...event });
}

export function trackRelationOpen(
    event: Omit<RelationOpenEvent, "event">,
): boolean {
    return trackAnalyticsEvent({ event: "relation_open", ...event });
}

export function trackRelationExpand(
    event: Omit<RelationExpandEvent, "event">,
): boolean {
    return trackAnalyticsEvent({ event: "relation_expand", ...event });
}
