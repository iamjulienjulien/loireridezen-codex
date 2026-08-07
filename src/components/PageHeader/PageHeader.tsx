import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

import LRZScrambleText from "@/components/LRZLivingText/scramble/LRZScrambleText";
import LRZSeparateur from "@/components/LRZSeparateur/LRZSeparateur";
import type { LRZColor } from "@/types/lrz";

import styles from "./PageHeader.module.css";

export type PageHeaderVariant =
    | "home"
    | "index"
    | "collection"
    | "page"
    | "editorial"
    | "documentation"
    | "atelier";

export type PageHeaderProps = {
    variant: PageHeaderVariant;
    title: string;
    eyebrow?: ReactNode;
    description?: ReactNode;
    mark?: ReactNode;
    identity?: ReactNode;
    navigation?: ReactNode;
    actions?: ReactNode;
    breadcrumbs?: ReactNode;
    separator?: ReactNode | false;
    accent?: string;
    color?: LRZColor;
    className?: string;
};

type PageHeaderStyle = CSSProperties & {
    "--accent": string;
    "--page-header-accent": string;
};

export default function PageHeader({
    variant,
    title,
    eyebrow = "Loire Ride Zen",
    description,
    mark,
    identity,
    navigation,
    actions,
    breadcrumbs,
    separator,
    accent = "var(--gold)",
    color = "galet",
    className,
}: PageHeaderProps) {
    const style = {
        "--accent": accent,
        "--page-header-accent": accent,
    } as PageHeaderStyle;

    if (variant === "index") {
        return (
            <div
                className={[styles.root, className].filter(Boolean).join(" ")}
                data-page-header-variant="index"
                style={style}
            >
                <header className={styles.indexHeader}>
                    <div className={styles.indexBrand}>
                        {mark}

                        <div className={styles.indexBrandText}>
                            {identity ?? (
                                <span className={styles.indexIdentity}>
                                    <span
                                        className={styles.indexKickerBar}
                                        aria-hidden
                                    />
                                    <span className={styles.indexBrandName}>
                                        {eyebrow}
                                    </span>
                                    <span
                                        className={
                                            styles.indexIdentitySeparator
                                        }
                                        aria-hidden
                                    >
                                        ·
                                    </span>
                                    <Link
                                        href="/"
                                        className={styles.indexSiteName}
                                    >
                                        Le Codex ligérien
                                    </Link>
                                </span>
                            )}

                            <h1 className={styles.indexTitle}>{title}</h1>
                        </div>
                    </div>

                    {navigation || actions ? (
                        <div className={styles.indexTools}>
                            {navigation}
                            {actions}
                        </div>
                    ) : null}
                </header>

                {renderSeparator(separator, color, 5)}
            </div>
        );
    }

    return (
        <div
            className={[styles.root, className].filter(Boolean).join(" ")}
            data-page-header-variant={variant}
            style={style}
        >
            <header className={styles.header}>
                <div className={styles.topbar}>
                    {identity ?? (
                        <Link href="/" className={styles.identity}>
                            <span className={styles.identityKicker}>
                                Loire Ride Zen
                            </span>
                            <span
                                className={styles.identitySeparator}
                                aria-hidden
                            >
                                ·
                            </span>
                            <span className={styles.identityName}>
                                Le Codex ligérien
                            </span>
                        </Link>
                    )}

                    {navigation || actions ? (
                        <div className={styles.tools}>
                            {navigation}
                            {actions ? (
                                <div className={styles.actions}>{actions}</div>
                            ) : null}
                        </div>
                    ) : null}
                </div>

                <div className={styles.hero}>
                    {mark ? (
                        <span className={styles.mark} aria-hidden>
                            {mark}
                        </span>
                    ) : null}

                    <div className={styles.copy}>
                        {breadcrumbs ? (
                            <div className={styles.breadcrumbs}>
                                {breadcrumbs}
                            </div>
                        ) : null}
                        {eyebrow ? (
                            <p className={styles.eyebrow}>{eyebrow}</p>
                        ) : null}
                        <PageTitle
                            title={title}
                            animated={variant === "home"}
                        />
                        {description ? (
                            <div className={styles.description}>
                                {description}
                            </div>
                        ) : null}
                    </div>
                </div>
            </header>

            {renderSeparator(separator, color, 0)}
        </div>
    );
}

function PageTitle({ title, animated }: { title: string; animated: boolean }) {
    if (animated) {
        return (
            <LRZScrambleText
                preset="heading-1"
                as="h1"
                speed={130}
                align="start"
                size="4xl"
                preserveSpaces
                color="blanc"
                characterSet="ucfirst"
                className={styles.title}
            >
                {title}
            </LRZScrambleText>
        );
    }

    return <h1 className={styles.title}>{title}</h1>;
}

function renderSeparator(
    separator: ReactNode | false | undefined,
    color: LRZColor,
    marginBlock: number,
) {
    if (separator === false) return null;
    if (separator !== undefined) return separator;

    return (
        <LRZSeparateur
            preset="spark"
            scope="content"
            size="lg"
            weight="thin"
            tone="strong"
            color={color}
            marginBlock={marginBlock}
            fadeEdges
        />
    );
}
