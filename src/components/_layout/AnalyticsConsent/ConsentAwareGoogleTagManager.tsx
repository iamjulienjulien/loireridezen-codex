"use client";

import { GoogleTagManager } from "@next/third-parties/google";

import { useAnalyticsConsent } from "./AnalyticsConsentProvider";

export type ConsentAwareGoogleTagManagerProps = {
    enabled: boolean;
    gtmId: string;
};

export default function ConsentAwareGoogleTagManager({
    enabled,
    gtmId,
}: ConsentAwareGoogleTagManagerProps) {
    const { ready, status } = useAnalyticsConsent();

    if (!enabled || !ready || status !== "accepted") return null;

    return <GoogleTagManager gtmId={gtmId} />;
}

export { ConsentAwareGoogleTagManager };
