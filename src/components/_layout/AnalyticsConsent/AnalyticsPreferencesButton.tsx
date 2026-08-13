"use client";

import type { ButtonHTMLAttributes } from "react";

import { useOptionalAnalyticsConsent } from "./AnalyticsConsentProvider";

export type AnalyticsPreferencesButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "onClick" | "type"
>;

export default function AnalyticsPreferencesButton(
    props: AnalyticsPreferencesButtonProps,
) {
    const consent = useOptionalAnalyticsConsent();

    return (
        <button
            {...props}
            type="button"
            onClick={() => consent?.openPreferences()}
        >
            Préférences de mesure
        </button>
    );
}

export { AnalyticsPreferencesButton };
