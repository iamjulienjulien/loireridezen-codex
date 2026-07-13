"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Ambiance } from "@/registry/ambiances";

const AMBIANCE_REFRESH_INTERVAL = 60_000;
interface AmbianceContextValue {
    ambiance: Ambiance;
    setAmbiance: (ambiance: Ambiance) => void;
    showAmbianceSelector: boolean;
}

const AmbianceContext = createContext<AmbianceContextValue | null>(null);

export function detectAmbiance(hour: number): Ambiance {
    if (hour >= 5 && hour < 9) return "aube";
    if (hour >= 9 && hour < 17) return "jour";
    if (hour >= 17 && hour < 21) return "soir";
    return "nuit";
}

export function AmbianceProvider({
    children,
    showAmbianceSelector,
}: {
    children: ReactNode;
    showAmbianceSelector: boolean;
}) {
    const [forcedAmbiance, setForcedAmbiance] = useState<Ambiance | null>(null);
    const [autoAmbiance, setAutoAmbiance] = useState<Ambiance | null>(null);

    useEffect(() => {
        if (forcedAmbiance !== null) return;

        const tick = () => {
            setAutoAmbiance(detectAmbiance(new Date().getHours()));
        };

        tick();
        const id = window.setInterval(tick, AMBIANCE_REFRESH_INTERVAL);
        return () => window.clearInterval(id);
    }, [forcedAmbiance]);

    const ambiance = forcedAmbiance ?? autoAmbiance ?? "jour";

    useEffect(() => {
        if (forcedAmbiance === null && autoAmbiance === null) return;
        document.documentElement.dataset.mode = ambiance;
    }, [ambiance, autoAmbiance, forcedAmbiance]);

    return (
        <AmbianceContext.Provider
            value={{
                ambiance,
                setAmbiance: setForcedAmbiance,
                showAmbianceSelector,
            }}
        >
            {children}
        </AmbianceContext.Provider>
    );
}

function useAmbianceContext(): AmbianceContextValue {
    const context = useContext(AmbianceContext);

    if (context === null) {
        throw new Error("useAmbiance doit être utilisé dans AmbianceProvider");
    }

    return context;
}

export function useAmbiance(): [Ambiance, (ambiance: Ambiance) => void] {
    const { ambiance, setAmbiance } = useAmbianceContext();
    return [ambiance, setAmbiance];
}

export function useAmbianceSelectorVisibility(): boolean {
    return useAmbianceContext().showAmbianceSelector;
}
