import "./atelier.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AtelierShell from "@/components/_shells/AtelierShell";
import { ATELIER_PAGE } from "@/registry/atelier-pages";
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
        <AtelierShell
            page={ATELIER_PAGE}
            width="full"
            spacing="none"
            header={false}
            containerClassName="atelier-layout"
        >
            {children}
        </AtelierShell>
    );
}
