"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./LRZDocCodeBlock.module.css";

export type LRZDocCodeBlockClientProps = {
    id?: string;
    title?: string;
    className?: string;

    /** Code brut copié dans le presse-papiers. */
    code: string;

    /** HTML déjà colorisé côté serveur par Shiki. */
    highlightedCode: string;

    language?: string;
    filename?: string;
};

type CopyStatus = "idle" | "copied" | "error";

export default function LRZDocCodeBlockClient({
    id,
    title,
    className,
    code,
    highlightedCode,
    language,
    filename,
}: LRZDocCodeBlockClientProps) {
    const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

    const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hasHeader = Boolean(filename || language);

    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
    }, []);

    const scheduleReset = () => {
        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
        }

        resetTimeoutRef.current = setTimeout(() => {
            setCopyStatus("idle");
        }, 2000);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);

            setCopyStatus("copied");
            scheduleReset();
        } catch {
            setCopyStatus("error");
            scheduleReset();
        }
    };

    const copyLabel = {
        idle: "Copier",
        copied: "Copié",
        error: "Échec",
    }[copyStatus];

    const copyAriaLabel = {
        idle: "Copier le code",
        copied: "Code copié",
        error: "La copie du code a échoué",
    }[copyStatus];

    return (
        <div
            id={id}
            title={title}
            className={[styles.root, className].filter(Boolean).join(" ")}
            data-language={language}
        >
            {hasHeader ? (
                <div className={styles.header}>
                    <div className={styles.headerIdentity}>
                        {filename ? (
                            <span className={styles.filename}>{filename}</span>
                        ) : null}

                        {language ? (
                            <span className={styles.language}>{language}</span>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        className={styles.copyButton}
                        data-status={copyStatus}
                        onClick={handleCopy}
                        aria-label={copyAriaLabel}
                    >
                        <span className={styles.copyIcon} aria-hidden="true">
                            {copyStatus === "copied" ? (
                                <svg viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="m3.5 8.2 2.7 2.7 6.3-6.3"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 16 16" fill="none">
                                    <rect
                                        x="5.25"
                                        y="5.25"
                                        width="7.25"
                                        height="7.25"
                                        rx="1.25"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                    />

                                    <path
                                        d="M10.75 5.25V4.5A1.5 1.5 0 0 0 9.25 3h-5.5A1.5 1.5 0 0 0 2.25 4.5V10A1.5 1.5 0 0 0 3.75 11.5h1.5"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </span>

                        <span>{copyLabel}</span>
                    </button>
                </div>
            ) : null}

            <div
                className={styles.highlight}
                dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                }}
            />
        </div>
    );
}
