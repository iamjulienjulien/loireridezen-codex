import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import {
    Allura,
    Bodoni_Moda,
    Fraunces,
    Inter,
    JetBrains_Mono,
    Kalam,
    Lora,
    Space_Grotesk,
} from "next/font/google";
import Script from "next/script";
import AmbianceCommandPalette from "@/components/AmbianceCommandPalette";
import { AmbianceProvider } from "@/hooks/useAmbiance";
import {
    SITE_DESCRIPTION,
    SITE_OG_IMAGE,
    SITE_TITLE,
    SITE_URL,
} from "@/lib/site-metadata";
import { featureIsEnabled } from "@/registry/feature-flags";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const AMBIANCE_INITIALIZATION_SCRIPT = `
    (() => {
        const hour = new Date().getHours();
        const ambiance =
            hour >= 5 && hour < 9
                ? "aube"
                : hour >= 9 && hour < 17
                  ? "jour"
                  : hour >= 17 && hour < 21
                    ? "soir"
                    : "nuit";

        document.documentElement.dataset.mode = ambiance;
    })();
`;

const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
});
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});
const mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});
const lora = Lora({
    subsets: ["latin"],
    variable: "--font-edit",
    display: "swap",
});
const allura = Allura({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-signature",
    display: "swap",
    preload: false,
});
const bodoni = Bodoni_Moda({
    subsets: ["latin"],
    weight: "variable",
    variable: "--font-bodoni",
    display: "swap",
    preload: false,
});
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: "variable",
    variable: "--font-grotesk",
    display: "swap",
    preload: false,
});
const kalam = Kalam({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: "--font-note",
    display: "swap",
    preload: false,
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),

    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    manifest: "/site.webmanifest",

    verification: {
        google: "d6xEn7osgIrSXI9ekloZhEOrQKWKqUv_PPRd8gIB6J8",
    },

    icons: {
        icon: [
            {
                url: "/favicon.ico",
                sizes: "any",
            },
            {
                url: "/favicon-16x16.png",
                type: "image/png",
                sizes: "16x16",
            },
            {
                url: "/favicon-32x32.png",
                type: "image/png",
                sizes: "32x32",
            },
        ],
        apple: [
            {
                url: "/apple-touch-icon.png",
                sizes: "180x180",
            },
        ],
    },

    openGraph: {
        type: "website",
        locale: "fr_FR",
        siteName: "Loire Ride Zen",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: SITE_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: SITE_TITLE,
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: SITE_OG_IMAGE,
                alt: SITE_TITLE,
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentEnv = process.env.CURRENT_ENV;
    const commandPaletteEnabled =
        currentEnv === "development" || currentEnv === "production"
            ? featureIsEnabled("commandPalette", currentEnv)
            : false;

    return (
        <html lang="fr" data-mode="jour" suppressHydrationWarning>
            <body
                className={`${fraunces.variable} ${inter.variable} ${mono.variable} ${lora.variable} ${allura.variable} ${bodoni.variable} ${spaceGrotesk.variable} ${kalam.variable} font-[family-name:var(--font-body)] antialiased`}
            >
                <Script id="lrz-ambiance" strategy="beforeInteractive">
                    {AMBIANCE_INITIALIZATION_SCRIPT}
                </Script>
                <AmbianceProvider>
                    {children}
                    {commandPaletteEnabled ? <AmbianceCommandPalette /> : null}
                </AmbianceProvider>
            </body>
            <GoogleTagManager gtmId="GTM-WPQT6KX7" />
            <Analytics />
        </html>
    );
}
