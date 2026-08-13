export {
    default,
    default as AnalyticsConsentProvider,
    useAnalyticsConsent,
} from "./AnalyticsConsentProvider";
export type { AnalyticsConsentProviderProps } from "./AnalyticsConsentProvider";
export { default as AnalyticsConsentBanner } from "./AnalyticsConsentBanner";
export { default as AnalyticsPreferencesButton } from "./AnalyticsPreferencesButton";
export type { AnalyticsPreferencesButtonProps } from "./AnalyticsPreferencesButton";
export { default as ConsentAwareGoogleTagManager } from "./ConsentAwareGoogleTagManager";
export type { ConsentAwareGoogleTagManagerProps } from "./ConsentAwareGoogleTagManager";
export {
    ANALYTICS_CONSENT_DURATION_MONTHS,
    ANALYTICS_CONSENT_STORAGE_KEY,
    analyticsIsEnabled,
    clearGoogleAnalyticsCookies,
    createStoredAnalyticsConsent,
    denyAnalyticsConsent,
    grantAnalyticsConsent,
    parseStoredAnalyticsConsent,
    readAnalyticsConsent,
    writeAnalyticsConsent,
} from "@/lib/analytics";
export type {
    AnalyticsConsentValue,
    StoredAnalyticsConsent,
} from "@/lib/analytics";
