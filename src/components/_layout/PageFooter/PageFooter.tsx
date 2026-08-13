import type { ReactNode } from "react";
import Link from "next/link";

import LRZSeparateur from "@/components/_ui/LRZSeparateur/LRZSeparateur";
import { featureIsEnabled } from "@/registry/feature-flags";
import type { LRZColor } from "@/types/lrz";

import styles from "./PageFooter.module.css";

export type PageFooterProps = {
    children?: ReactNode;
    className?: string;
    color?: LRZColor;
    spacing?: "default" | "relaxed";
    signatureSpacing?: "default" | "none";
};

export default function PageFooter({
    children,
    className,
    color = "galet",
    spacing = "default",
    signatureSpacing = "default",
}: PageFooterProps) {
    return (
        <footer
            className={[styles.footer, className].filter(Boolean).join(" ")}
            data-signature-spacing={signatureSpacing}
            data-spacing={spacing}
        >
            <LRZSeparateur
                preset="spark"
                scope="content"
                size="lg"
                weight="thin"
                tone="strong"
                color={color}
                marginBlock={0}
                fadeEdges
            />
            <div className={styles.copy}>
                <p className={styles.content}>{children}</p>
                <p className={styles.navigationMain}>
                    <a href="https://loireridezen.bike">Loire Ride Zen</a> ·{" "}
                    <Link href="/">Le Codex Ligérien</Link>
                </p>
                <nav
                    className={styles.navigation}
                    aria-label="Liens de pied de page"
                >
                    <Link href="/a-propos">À propos</Link>
                    <Link href="/docs">Documentation</Link>
                    <Link href="/mentions-legales">Mentions légales</Link>

                    {featureIsEnabled("atelier") ? (
                        <Link href="/atelier">Atelier</Link>
                    ) : null}
                </nav>
                <p className={styles.signature}>
                    <span className={styles.signatureLabel}>
                        Imaginé et façonné par
                    </span>
                    <a
                        className={styles.signatureName}
                        href="https://julienjulien.fr"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Julien Julien
                    </a>
                </p>
            </div>
        </footer>
    );
}
