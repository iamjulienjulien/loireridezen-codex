import { describe, expect, it, vi } from "vitest";

import {
    resolveLRZCardDialogNavigation,
    type LRZCardDialogNavigation,
    type LRZCardDialogNavigationMode,
} from "./LRZCardDialog";

const navigation: LRZCardDialogNavigation = {
    previous: { id: "amboise", label: "Amboise" },
    next: { id: "chambord", label: "Chambord" },
    position: 2,
    total: 3,
    onNavigate: vi.fn(),
};

describe("resolveLRZCardDialogNavigation", () => {
    it.each<LRZCardDialogNavigationMode>(["button", "keyboard", "swipe"])(
        "preserves the %s interaction mode",
        (interactionMode) => {
            expect(
                resolveLRZCardDialogNavigation(
                    navigation,
                    "next",
                    interactionMode,
                ),
            ).toEqual({
                item: { id: "chambord", label: "Chambord" },
                context: {
                    direction: "next",
                    interactionMode,
                    position: 3,
                    total: 3,
                },
            });
        },
    );

    it("computes the previous one-based position", () => {
        expect(
            resolveLRZCardDialogNavigation(navigation, "previous", "button"),
        ).toEqual({
            item: { id: "amboise", label: "Amboise" },
            context: {
                direction: "previous",
                interactionMode: "button",
                position: 1,
                total: 3,
            },
        });
    });

    it("rejects a direction without a destination", () => {
        expect(
            resolveLRZCardDialogNavigation(
                { ...navigation, previous: undefined, position: 1 },
                "previous",
                "keyboard",
            ),
        ).toBe(null);
    });
});
