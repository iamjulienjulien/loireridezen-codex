import type { ReactNode } from "react";

import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import type { LRZColor } from "@/types/lrz";

import styles from "./PageFooter.module.css";

export type PageFooterProps = {
    children: ReactNode;
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
