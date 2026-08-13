"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

export type IndexCardTrackingContextValue = {
    indexSlug: string;
    entrySlugs: readonly string[];
};

export type IndexCardTrackingProviderProps = IndexCardTrackingContextValue & {
    children: ReactNode;
};

const IndexCardTrackingContext =
    createContext<IndexCardTrackingContextValue | null>(null);

export function IndexCardTrackingProvider({
    indexSlug,
    entrySlugs,
    children,
}: IndexCardTrackingProviderProps) {
    const value = useMemo(
        () => ({ indexSlug, entrySlugs }),
        [entrySlugs, indexSlug],
    );

    return (
        <IndexCardTrackingContext.Provider value={value}>
            {children}
        </IndexCardTrackingContext.Provider>
    );
}

export function useIndexCardTracking() {
    return useContext(IndexCardTrackingContext);
}
