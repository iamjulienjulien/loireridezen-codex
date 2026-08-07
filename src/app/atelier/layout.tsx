import "./atelier.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AmbientPageFrame from "@/components/layout/AmbientPageFrame";
import PageFooter from "@/components/PageFooter";
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
        <AmbientPageFrame
            kind="atelier"
            accent={ATELIER_PAGE.accent}
            className="atelier-layout"
        >
            {children}
            <PageFooter color={ATELIER_PAGE.color} />
        </AmbientPageFrame>
    );
}
