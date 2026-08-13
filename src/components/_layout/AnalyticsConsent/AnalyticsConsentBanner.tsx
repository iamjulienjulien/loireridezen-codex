"use client";

import { BarChart3 } from "lucide-react";

import { LRZBanner } from "@/components/_ui/LRZBanner";
import { LRZButton } from "@/components/_ui/LRZButton";

import { useAnalyticsConsent } from "./AnalyticsConsentProvider";

export default function AnalyticsConsentBanner() {
    const { accept, closePreferences, preferencesOpen, ready, refuse, status } =
        useAnalyticsConsent();

    if (!ready || (status !== null && !preferencesOpen)) return null;

    const isPreferencesView = preferencesOpen && status !== null;

    return (
        <LRZBanner
            eyebrow="Mesure d’audience"
            title={
                isPreferencesView
                    ? "Préférences de mesure"
                    : "Un peu de lumière sur le voyage ?"
            }
            icon={<BarChart3 />}
            tone="contrast"
            position="fixed-bottom"
            color="eau"
            actions={
                <>
                    {isPreferencesView ? (
                        <LRZButton variant="quiet" onClick={closePreferences}>
                            Fermer
                        </LRZButton>
                    ) : null}
                    <LRZButton variant="secondary" color="eau" onClick={refuse}>
                        Refuser
                    </LRZButton>
                    <LRZButton color="eau" onClick={accept}>
                        Accepter
                    </LRZButton>
                </>
            }
        >
            <p>
                Nous aimerions mesurer, de façon anonyme, les pages et les
                fiches consultées pour mieux comprendre les chemins suivis dans
                le Codex. Aucun outil de mesure ne sera chargé sans votre
                accord.
            </p>
        </LRZBanner>
    );
}

export { AnalyticsConsentBanner };
