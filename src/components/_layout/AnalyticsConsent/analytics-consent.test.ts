import { afterEach, describe, expect, it, vi } from "vitest";

import {
    ANALYTICS_CONSENT_STORAGE_KEY,
    analyticsIsEnabled,
    clearGoogleAnalyticsCookies,
    createStoredAnalyticsConsent,
    grantAnalyticsConsent,
    parseStoredAnalyticsConsent,
    readAnalyticsConsent,
    writeAnalyticsConsent,
} from "@/lib/analytics";

const NOW = new Date("2026-08-13T12:00:00.000Z");

function createStorage(initialValue: string | null = null) {
    let value = initialValue;

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

describe("analytics consent storage", () => {
    afterEach(() => vi.unstubAllGlobals());

    it("creates an accepted choice valid for six months", () => {
        expect(createStoredAnalyticsConsent("accepted", NOW)).toEqual({
            value: "accepted",
            decidedAt: "2026-08-13T12:00:00.000Z",
            expiresAt: "2027-02-13T12:00:00.000Z",
        });
    });

    it("persists and reads a valid refusal", () => {
        const storage = createStorage();

        const written = writeAnalyticsConsent(storage, "refused", NOW);
        const read = readAnalyticsConsent(storage, NOW);

        expect(written?.value).toBe("refused");
        expect(read).toEqual(written);
        expect(storage.setItem).toHaveBeenCalledWith(
            ANALYTICS_CONSENT_STORAGE_KEY,
            expect.any(String),
        );
    });

    it.each([
        "not-json",
        JSON.stringify({ value: "maybe" }),
        JSON.stringify({
            value: "accepted",
            decidedAt: "2026-01-01T00:00:00.000Z",
            expiresAt: "2026-02-01T00:00:00.000Z",
        }),
    ])("rejects and removes an invalid choice", (rawValue) => {
        const storage = createStorage(rawValue);

        expect(readAnalyticsConsent(storage, NOW)).toBeNull();
        expect(storage.removeItem).toHaveBeenCalledWith(
            ANALYTICS_CONSENT_STORAGE_KEY,
        );
    });

    it("does not accept an incomplete choice", () => {
        expect(
            parseStoredAnalyticsConsent(
                JSON.stringify({ value: "accepted" }),
                NOW,
            ),
        ).toBeNull();
    });

    it("survives an unavailable storage", () => {
        const storage = {
            getItem: vi.fn(() => {
                throw new Error("storage unavailable");
            }),
            setItem: vi.fn(),
            removeItem: vi.fn(),
        };

        expect(readAnalyticsConsent(storage, NOW)).toBeNull();
    });

    it("enables GTM in staging and production", () => {
        expect(analyticsIsEnabled("development")).toBe(false);
        expect(analyticsIsEnabled("staging")).toBe(true);
        expect(analyticsIsEnabled("production")).toBe(true);
        expect(analyticsIsEnabled(undefined)).toBe(false);
    });

    it("grants Analytics while keeping all advertising consent denied", () => {
        const dataLayer: object[] = [];
        vi.stubGlobal("window", { dataLayer });

        grantAnalyticsConsent();

        const commands = dataLayer.map((command) =>
            Array.from(command as ArrayLike<unknown>),
        );

        expect(commands).toEqual([
            [
                "consent",
                "default",
                expect.objectContaining({
                    analytics_storage: "denied",
                    ad_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                }),
            ],
            [
                "consent",
                "update",
                expect.objectContaining({
                    analytics_storage: "granted",
                    ad_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                }),
            ],
        ]);
    });

    it("removes the accessible Google Analytics cookies", () => {
        const writes: string[] = [];
        vi.stubGlobal("window", {
            location: { hostname: "codex.loireridezen.bike" },
        });
        vi.stubGlobal("document", {
            get cookie() {
                return "session=kept; _ga=GA1.1; _ga_TEST=GS1";
            },
            set cookie(value: string) {
                writes.push(value);
            },
        });

        clearGoogleAnalyticsCookies();

        expect(writes).toHaveLength(6);
        expect(writes.every((value) => value.includes("Max-Age=0"))).toBe(true);
        expect(writes.some((value) => value.startsWith("session="))).toBe(
            false,
        );
    });
});
