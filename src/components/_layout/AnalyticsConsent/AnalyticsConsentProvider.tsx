"use client";

import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import AnalyticsConsentBanner from "./AnalyticsConsentBanner";
import ConsentAwareGoogleTagManager from "./ConsentAwareGoogleTagManager";
import {
    type AnalyticsConsentValue,
    clearGoogleAnalyticsCookies,
    denyAnalyticsConsent,
    grantAnalyticsConsent,
    readAnalyticsConsent,
    writeAnalyticsConsent,
} from "./analytics-consent";

type AnalyticsConsentContextValue = {
    status: AnalyticsConsentValue | null;
    ready: boolean;
    preferencesOpen: boolean;
    accept: () => void;
    refuse: () => void;
    openPreferences: () => void;
    closePreferences: () => void;
};

const AnalyticsConsentContext =
    createContext<AnalyticsConsentContextValue | null>(null);

export type AnalyticsConsentProviderProps = {
    children: ReactNode;
    googleTagManagerId: string;
    googleTagManagerEnabled: boolean;
};

export function useAnalyticsConsent(): AnalyticsConsentContextValue {
    const context = useContext(AnalyticsConsentContext);

    if (!context) {
        throw new Error(
            "useAnalyticsConsent doit être utilisé dans AnalyticsConsentProvider.",
        );
    }

    return context;
}

export function useOptionalAnalyticsConsent(): AnalyticsConsentContextValue | null {
    return useContext(AnalyticsConsentContext);
}

export default function AnalyticsConsentProvider({
    children,
    googleTagManagerId,
    googleTagManagerEnabled,
}: AnalyticsConsentProviderProps) {
    const [status, setStatus] = useState<AnalyticsConsentValue | null>(null);
    const [ready, setReady] = useState(false);
    const [preferencesOpen, setPreferencesOpen] = useState(false);

    useEffect(() => {
        let active = true;

        queueMicrotask(() => {
            if (!active) return;

            const consent = readAnalyticsConsent(window.localStorage);

            if (consent?.value === "accepted") {
                grantAnalyticsConsent();
            }

            setStatus(consent?.value ?? null);
            setReady(true);
        });

        return () => {
            active = false;
        };
    }, []);

    const accept = useCallback(() => {
        grantAnalyticsConsent();
        writeAnalyticsConsent(window.localStorage, "accepted");
        setStatus("accepted");
        setPreferencesOpen(false);
    }, []);

    const refuse = useCallback(() => {
        const shouldReload = status === "accepted";

        denyAnalyticsConsent();
        writeAnalyticsConsent(window.localStorage, "refused");
        clearGoogleAnalyticsCookies();
        setStatus("refused");
        setPreferencesOpen(false);

        if (shouldReload) {
            window.location.reload();
        }
    }, [status]);

    const openPreferences = useCallback(() => setPreferencesOpen(true), []);
    const closePreferences = useCallback(() => setPreferencesOpen(false), []);

    const context = useMemo<AnalyticsConsentContextValue>(
        () => ({
            status,
            ready,
            preferencesOpen,
            accept,
            refuse,
            openPreferences,
            closePreferences,
        }),
        [
            accept,
            closePreferences,
            openPreferences,
            preferencesOpen,
            ready,
            refuse,
            status,
        ],
    );

    return (
        <AnalyticsConsentContext.Provider value={context}>
            {children}
            <AnalyticsConsentBanner />
            <ConsentAwareGoogleTagManager
                enabled={googleTagManagerEnabled}
                gtmId={googleTagManagerId}
            />
        </AnalyticsConsentContext.Provider>
    );
}

export { AnalyticsConsentProvider };
