import { afterEach, describe, expect, it, vi } from "vitest";

import {
    trackAnalyticsEvent,
    trackCardNavigate,
    trackCardOpen,
    trackIndexOpen,
    trackRelationExpand,
    trackRelationOpen,
    writeAnalyticsConsent,
} from ".";

function createStorage() {
    let value: string | null = null;

    return {
        getItem: vi.fn(() => value),
        setItem: vi.fn((_key: string, nextValue: string) => {
            value = nextValue;
        }),
        removeItem: vi.fn(() => {
            value = null;
        }),
    };
}

function stubAnalyticsWindow(consent: "accepted" | "refused" | null) {
    const localStorage = createStorage();
    const dataLayer: unknown[] = [];

    if (consent) {
        writeAnalyticsConsent(localStorage, consent);
    }

    vi.stubGlobal("window", { dataLayer, localStorage });

    return { dataLayer, localStorage };
}

describe("Codex analytics events", () => {
    afterEach(() => vi.unstubAllGlobals());

    it("does not publish on the server", () => {
        vi.stubGlobal("window", undefined);

        expect(trackIndexOpen({ index_slug: "chateaux", source: "home" })).toBe(
            false,
        );
    });

    it.each([null, "refused"] as const)(
        "does not queue events when consent is %s",
        (consent) => {
            const { dataLayer } = stubAnalyticsWindow(consent);

            expect(
                trackIndexOpen({
                    index_slug: "chateaux",
                    source: "home",
                }),
            ).toBe(false);
            expect(dataLayer).toEqual([]);
        },
    );

    it("publishes the three typed events after consent", () => {
        const { dataLayer } = stubAnalyticsWindow("accepted");

        expect(
            trackIndexOpen({ index_slug: "vignobles", source: "home" }),
        ).toBe(true);
        expect(
            trackCardOpen({
                index_slug: "vignobles",
                entry_slug: "sancerre",
                position: 8,
                total_items: 70,
            }),
        ).toBe(true);
        expect(
            trackCardNavigate({
                index_slug: "vignobles",
                entry_slug: "menetou-salon",
                previous_entry_slug: "sancerre",
                direction: "next",
                interaction_mode: "keyboard",
                position: 9,
                total_items: 70,
            }),
        ).toBe(true);

        expect(dataLayer).toEqual([
            {
                event: "index_open",
                index_slug: "vignobles",
                source: "home",
            },
            {
                event: "card_open",
                index_slug: "vignobles",
                entry_slug: "sancerre",
                position: 8,
                total_items: 70,
            },
            {
                event: "card_navigate",
                index_slug: "vignobles",
                entry_slug: "menetou-salon",
                previous_entry_slug: "sancerre",
                direction: "next",
                interaction_mode: "keyboard",
                position: 9,
                total_items: 70,
            },
        ]);
    });

    it.each([
        { position: 0, total_items: 10 },
        { position: 11, total_items: 10 },
        { position: 1.5, total_items: 10 },
        { position: 1, total_items: 0 },
    ])("rejects an invalid navigation position", (position) => {
        const { dataLayer } = stubAnalyticsWindow("accepted");

        expect(
            trackCardOpen({
                index_slug: "faune",
                entry_slug: "castor-europe",
                ...position,
            }),
        ).toBe(false);
        expect(dataLayer).toEqual([]);
    });

    it("rejects empty stable identifiers", () => {
        const { dataLayer } = stubAnalyticsWindow("accepted");

        expect(
            trackAnalyticsEvent({
                event: "card_navigate",
                index_slug: "territoires",
                entry_slug: "anjou",
                previous_entry_slug: " ",
                direction: "previous",
                interaction_mode: "swipe",
                position: 1,
                total_items: 4,
            }),
        ).toBe(false);
        expect(dataLayer).toEqual([]);
    });

    it("survives an unavailable storage", () => {
        const dataLayer: unknown[] = [];
        vi.stubGlobal("window", {
            dataLayer,
            localStorage: {
                getItem: vi.fn(() => {
                    throw new Error("storage unavailable");
                }),
                setItem: vi.fn(),
                removeItem: vi.fn(),
            },
        });

        expect(
            trackIndexOpen({ index_slug: "faune", source: "page_header" }),
        ).toBe(false);
        expect(dataLayer).toEqual([]);
    });

    it("publishes relational navigation and expansion after consent", () => {
        const { dataLayer } = stubAnalyticsWindow("accepted");

        expect(
            trackRelationOpen({
                source_index: "vignobles",
                source_slug: "chinon",
                target_index: "territoires",
                target_slug: "chinonais",
                surface: "vignobles_card",
                visible_items: 2,
                total_items: 2,
            }),
        ).toBe(true);
        expect(
            trackRelationExpand({
                source_index: "territoires",
                source_slug: "anjou",
                surface: "territoire_card",
                visible_items: 3,
                total_items: 18,
            }),
        ).toBe(true);

        expect(dataLayer).toEqual([
            {
                event: "relation_open",
                source_index: "vignobles",
                source_slug: "chinon",
                target_index: "territoires",
                target_slug: "chinonais",
                surface: "vignobles_card",
                visible_items: 2,
                total_items: 2,
            },
            {
                event: "relation_expand",
                source_index: "territoires",
                source_slug: "anjou",
                surface: "territoire_card",
                visible_items: 3,
                total_items: 18,
            },
        ]);
    });

    it("rejects incomplete or inconsistent relational payloads", () => {
        const { dataLayer } = stubAnalyticsWindow("accepted");

        expect(
            trackRelationOpen({
                source_index: "vignobles",
                source_slug: " ",
                target_index: "territoires",
                target_slug: "anjou",
                surface: "vignobles_card",
            }),
        ).toBe(false);
        expect(
            trackRelationExpand({
                source_index: "territoires",
                source_slug: "anjou",
                surface: "territoire_card",
                visible_items: 4,
                total_items: 3,
            }),
        ).toBe(false);
        expect(dataLayer).toEqual([]);
    });

    it.each([null, "refused"] as const)(
        "does not publish relational events when consent is %s",
        (consent) => {
            const { dataLayer } = stubAnalyticsWindow(consent);

            expect(
                trackRelationOpen({
                    source_index: "territoires",
                    source_slug: "touraine",
                    target_index: "vignobles",
                    target_slug: "vouvray",
                    surface: "territoire_card",
                }),
            ).toBe(false);
            expect(dataLayer).toEqual([]);
        },
    );
});
