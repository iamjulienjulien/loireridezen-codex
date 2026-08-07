import "./atelier.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageFooter from "@/components/PageFooter";
import { featureIsEnabled } from "@/registry/feature-flags";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function AtelierLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (!featureIsEnabled("atelier")) {
        notFound();
    }

    return (
        <>
            {children}
            <PageFooter />
        </>
    );
}
