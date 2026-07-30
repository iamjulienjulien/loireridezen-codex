import "./atelier.css";

import { notFound } from "next/navigation";

import { featureIsEnabled } from "@/registry/feature-flags";

export default function AtelierLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (!featureIsEnabled("atelier")) {
        notFound();
    }

    return children;
}
