import type { MouseEvent } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { trackRelationOpen } = vi.hoisted(() => ({
    trackRelationOpen: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({ trackRelationOpen }));

import TrackedRelationLink from "./TrackedRelationLink";

function createClickEvent(defaultPrevented = false) {
    return { defaultPrevented } as MouseEvent<HTMLAnchorElement>;
}

describe("TrackedRelationLink", () => {
    afterEach(() => vi.clearAllMocks());

    it("tracks one relational activation with its complete context", () => {
        const element = TrackedRelationLink({
            href: "/territoire/chinonais",
            source_index: "vignobles",
            source_slug: "chinon",
            target_index: "territoires",
            target_slug: "chinonais",
            surface: "vignobles_card",
            visible_items: 2,
            total_items: 2,
            children: "Chinonais",
        });

        element.props.onClick(createClickEvent());

        expect(trackRelationOpen).toHaveBeenCalledOnce();
        expect(trackRelationOpen).toHaveBeenCalledWith({
            source_index: "vignobles",
            source_slug: "chinon",
            target_index: "territoires",
            target_slug: "chinonais",
            surface: "vignobles_card",
            visible_items: 2,
            total_items: 2,
        });
        expect(element.props["data-analytics-event"]).toBe("relation_open");
    });

    it("respects a consumer that prevents navigation", () => {
        const onClick = vi.fn((event: MouseEvent<HTMLAnchorElement>) => {
            Object.defineProperty(event, "defaultPrevented", { value: true });
        });
        const element = TrackedRelationLink({
            href: "/vignoble/vouvray",
            source_index: "territoires",
            source_slug: "touraine",
            target_index: "vignobles",
            target_slug: "vouvray",
            surface: "territoire_card",
            onClick,
            children: "Vouvray",
        });
        const event = createClickEvent();

        element.props.onClick(event);

        expect(onClick).toHaveBeenCalledWith(event);
        expect(trackRelationOpen).not.toHaveBeenCalled();
    });
});
