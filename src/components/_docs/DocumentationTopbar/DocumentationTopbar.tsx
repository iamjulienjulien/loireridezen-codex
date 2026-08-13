import Link from "next/link";

import styles from "@/app/docs/api/api-docs.module.css";

type DocumentationSection = "api" | "sdk";

type DocumentationTopbarProps = {
    current: DocumentationSection;
};

const SOURCE_HREFS: Record<DocumentationSection, string> = {
    api: "https://github.com/iamjulienjulien/loireridezen-codex/tree/main/docs/api",
    sdk: "https://github.com/iamjulienjulien/loireridezen-codex/tree/main/packages/codex-sdk",
};

export default function DocumentationTopbar({
    current,
}: DocumentationTopbarProps) {
    return (
        <header className={styles.topbar}>
            <Link className={styles.brand} href="/">
                <span aria-hidden="true">🌊</span>
                <span>Le Codex Ligérien</span>
            </Link>

            <nav className={styles.primaryNav} aria-label="Documentation">
                <Link href="/docs">Documentation</Link>
                <Link
                    href="/docs/api"
                    aria-current={current === "api" ? "page" : undefined}
                >
                    API
                </Link>
                <Link
                    href="/docs/sdk"
                    aria-current={current === "sdk" ? "page" : undefined}
                >
                    SDK TypeScript
                </Link>
                {current === "api" ? <a href="/api/v1">API V1</a> : null}
                <a href="/api/v1/openapi.json">OpenAPI</a>
                <a href={SOURCE_HREFS[current]}>Source</a>
            </nav>
        </header>
    );
}
