import type { MouseEvent } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { trackIndexOpen } = vi.hoisted(() => ({
    trackIndexOpen: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({ trackIndexOpen }));

import TrackedIndexLink from "./TrackedIndexLink";

function createClickEvent(defaultPrevented = false) {
    return { defaultPrevented } as MouseEvent<HTMLAnchorElement>;
}

describe("TrackedIndexLink", () => {
    afterEach(() => vi.clearAllMocks());

    it("tracks an enabled index activation", () => {
        const element = TrackedIndexLink({
            href: "/faune",
            indexSlug: "faune",
            source: "home",
            children: "Faune",
        });

        element.props.onClick(createClickEvent());

        expect(trackIndexOpen).toHaveBeenCalledOnce();
        expect(trackIndexOpen).toHaveBeenCalledWith({
            index_slug: "faune",
            source: "home",
        });
        expect(element.props["data-analytics-event"]).toBe("index_open");
    });

    it("does not track the current index", () => {
        const element = TrackedIndexLink({
            href: "/faune",
            indexSlug: "faune",
            source: "page_header",
            trackingEnabled: false,
            children: "Faune",
        });

        element.props.onClick(createClickEvent());

        expect(trackIndexOpen).not.toHaveBeenCalled();
        expect(element.props["data-analytics-event"]).toBeUndefined();
    });

    it("respects a consumer that prevents navigation", () => {
        const onClick = vi.fn((event: MouseEvent<HTMLAnchorElement>) => {
            Object.defineProperty(event, "defaultPrevented", { value: true });
        });
        const element = TrackedIndexLink({
            href: "/vignobles",
            indexSlug: "vignobles",
            source: "home",
            onClick,
            children: "Vignobles",
        });
        const event = createClickEvent();

        element.props.onClick(event);

        expect(onClick).toHaveBeenCalledWith(event);
        expect(trackIndexOpen).not.toHaveBeenCalled();
    });
});
