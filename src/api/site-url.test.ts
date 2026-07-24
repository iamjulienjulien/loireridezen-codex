import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "./site-url";

const originalSiteUrl = process.env.SITE_URL;

afterEach(() => {
    if (originalSiteUrl === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = originalSiteUrl;
});

describe("SITE_URL", () => {
    it("accepts HTTP and HTTPS URLs and removes trailing slashes", () => {
        process.env.SITE_URL = "https://example.test///";
        expect(getSiteUrl()).toBe("https://example.test");

        process.env.SITE_URL = "http://localhost:3000/";
        expect(getSiteUrl()).toBe("http://localhost:3000");
    });

    it.each([undefined, "example.test", "ftp://example.test"])(
        "rejects an absent or invalid value",
        (value) => {
            if (value === undefined) delete process.env.SITE_URL;
            else process.env.SITE_URL = value;
            expect(() => getSiteUrl()).toThrow(
                "SITE_URL must be configured as a valid HTTP or HTTPS URL.",
            );
        },
    );
});
