import { analyticsConsentIsGranted } from "./consent";

export type IndexOpenSource = "home" | "page_header";
export type CardNavigationDirection = "previous" | "next";
export type CardNavigationMode = "button" | "keyboard" | "swipe";

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

export type CodexAnalyticsEvent =
    IndexOpenEvent | CardOpenEvent | CardNavigateEvent;

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

function isValidAnalyticsEvent(event: CodexAnalyticsEvent): boolean {
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
