export const ANALYTICS_CONSENT_STORAGE_KEY = "lrz.analytics-consent.v1";

export const ANALYTICS_CONSENT_DURATION_MONTHS = 6;

export function analyticsIsEnabled(environment?: string): boolean {
    return environment === "production";
}

export type AnalyticsConsentValue = "accepted" | "refused";

export type StoredAnalyticsConsent = {
    value: AnalyticsConsentValue;
    decidedAt: string;
    expiresAt: string;
};

type AnalyticsStorage = Pick<Storage, "getItem" | "removeItem" | "setItem">;

const isConsentValue = (value: unknown): value is AnalyticsConsentValue =>
    value === "accepted" || value === "refused";

export function createStoredAnalyticsConsent(
    value: AnalyticsConsentValue,
    now = new Date(),
): StoredAnalyticsConsent {
    const expiresAt = new Date(now);
    expiresAt.setUTCMonth(
        expiresAt.getUTCMonth() + ANALYTICS_CONSENT_DURATION_MONTHS,
    );

    return {
        value,
        decidedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
    };
}

export function parseStoredAnalyticsConsent(
    rawValue: string | null,
    now = new Date(),
): StoredAnalyticsConsent | null {
    if (!rawValue) return null;

    try {
        const consent = JSON.parse(rawValue) as Partial<StoredAnalyticsConsent>;
        const decidedAt = Date.parse(consent.decidedAt ?? "");
        const expiresAt = Date.parse(consent.expiresAt ?? "");

        if (
            !isConsentValue(consent.value) ||
            !Number.isFinite(decidedAt) ||
            !Number.isFinite(expiresAt) ||
            decidedAt > expiresAt ||
            expiresAt <= now.getTime()
        ) {
            return null;
        }

        return consent as StoredAnalyticsConsent;
    } catch {
        return null;
    }
}

export function readAnalyticsConsent(
    storage: AnalyticsStorage,
    now = new Date(),
): StoredAnalyticsConsent | null {
    try {
        const rawValue = storage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
        const consent = parseStoredAnalyticsConsent(rawValue, now);

        if (rawValue && !consent) {
            storage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY);
        }

        return consent;
    } catch {
        return null;
    }
}

export function writeAnalyticsConsent(
    storage: AnalyticsStorage,
    value: AnalyticsConsentValue,
    now = new Date(),
): StoredAnalyticsConsent | null {
    const consent = createStoredAnalyticsConsent(value, now);

    try {
        storage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, JSON.stringify(consent));
        return consent;
    } catch {
        return null;
    }
}

type ConsentModeValue = "denied" | "granted";

type DataLayerCommand = [
    "consent",
    "default" | "update",
    Record<string, ConsentModeValue | number>,
];

function pushConsentCommand(command: DataLayerCommand) {
    window.dataLayer = window.dataLayer ?? [];

    const gtag = function (...args: DataLayerCommand) {
        window.dataLayer?.push(args);
    };

    gtag(...command);
}

export function grantAnalyticsConsent() {
    if (typeof window === "undefined") return;

    pushConsentCommand([
        "consent",
        "default",
        {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "denied",
            wait_for_update: 500,
        },
    ]);
    pushConsentCommand([
        "consent",
        "update",
        {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "granted",
        },
    ]);
}

export function denyAnalyticsConsent() {
    if (typeof window === "undefined") return;

    pushConsentCommand([
        "consent",
        "update",
        {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "denied",
        },
    ]);
}

function getCookieDomains(hostname: string): Array<string | undefined> {
    const domains = new Set<string | undefined>([undefined, hostname]);
    const labels = hostname.split(".");

    if (labels.length > 2) {
        domains.add(`.${labels.slice(-2).join(".")}`);
    }

    return [...domains];
}

export function clearGoogleAnalyticsCookies(
    cookieSource?: string,
    hostname?: string,
) {
    if (typeof document === "undefined" || typeof window === "undefined") {
        return;
    }

    const source = cookieSource ?? document.cookie;
    const currentHostname = hostname ?? window.location.hostname;
    const cookieNames = source
        .split(";")
        .map((cookie) => cookie.trim().split("=")[0])
        .filter(
            (name): name is string =>
                Boolean(name) && (name === "_ga" || name.startsWith("_ga_")),
        );

    for (const name of cookieNames) {
        for (const domain of getCookieDomains(currentHostname)) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
        }
    }
}
