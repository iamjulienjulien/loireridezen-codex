import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { AmbianceProvider } from "@/hooks/useAmbiance";
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

export const metadata: Metadata = {
    title: "Loire Ride Zen — Le Codex Ligérien",
    description: "Le codex du fil ligérien, de la source à l'Atlantique.",
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
            { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" data-mode="jour" suppressHydrationWarning>
            <body
                className={`${fraunces.variable} ${inter.variable} ${mono.variable} font-[family-name:var(--font-body)] antialiased`}
            >
                <Script id="lrz-ambiance" strategy="beforeInteractive">
                    {AMBIANCE_INITIALIZATION_SCRIPT}
                </Script>
                <AmbianceProvider
                    showAmbianceSelector={
                        process.env.CURRENT_ENV === "development"
                    }
                >
                    {children}
                </AmbianceProvider>
            </body>
        </html>
    );
}
