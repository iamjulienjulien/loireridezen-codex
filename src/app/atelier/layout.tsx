import "./atelier.css";

import { notFound } from "next/navigation";

import PageFooter from "@/components/PageFooter";
import { featureIsEnabled } from "@/registry/feature-flags";

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
