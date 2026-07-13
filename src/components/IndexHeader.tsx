import type { CSSProperties } from "react";
import Link from "next/link";
import { getIndex, type IndexEntry, type IndexHref } from "@/registry/indexes";
import styles from "./IndexHeader.module.css";

type IndexActive = IndexEntry;

export default function IndexHeader({
    current,
    indexes,
    version = 5,
}: {
    current: IndexHref;
    indexes: readonly IndexEntry[];
    version?: 1 | 2 | 3 | 4 | 5;
}) {
    const active = getIndex(current) ?? indexes[0];

    if (version === 5) {
        return (
            <IndexHeaderV5
                current={current}
                active={active}
                indexes={indexes}
            />
        );
    }

    if (version === 4) {
        return (
            <IndexHeaderV4
                current={current}
                active={active}
                indexes={indexes}
            />
        );
    }

    if (version === 3) {
        return (
            <IndexHeaderV3
                current={current}
                active={active}
                indexes={indexes}
            />
        );
    }

    if (version === 2) {
        return (
            <IndexHeaderV2
                current={current}
                active={active}
                indexes={indexes}
            />
        );
    }

    return (
        <header className={styles.head}>
            <div className={styles.brand}>
                <span className={styles.mark} aria-hidden>
                    {active.mark}
                </span>
                <div>
                    <div className={styles.eyebrow}>Loire Ride Zen</div>
                    <div className={styles.siteTitle}>Le Codex ligérien</div>
                    <h1 className={styles.title}>{active.title}</h1>
                </div>
            </div>
            {indexes.length > 1 && (
                <nav className={styles.nav} aria-label="Index du Codex">
                    <span className={styles.navLabel}>Index</span>
                    {indexes.map((i) => (
                        <Link
                            key={i.href}
                            href={i.href}
                            className={styles.navBtn}
                            aria-current={
                                i.href === current ? "page" : undefined
                            }
                        >
                            <span className={styles.navEmoji} aria-hidden>
                                {i.mark}
                            </span>
                            {i.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}

function IndexHeaderV2({
    current,
    active,
    indexes,
}: {
    current: IndexHref;
    active: IndexActive;
    indexes: readonly IndexEntry[];
}) {
    return (
        <header className={styles.headV2}>
            <div className={styles.brandV2}>
                <span className={styles.markBadgeV2} aria-hidden>
                    {active.mark}
                </span>
                <div className={styles.brandTextV2}>
                    <span className={styles.eyebrowV2}>
                        Loire Ride Zen
                        <span className={styles.eyebrowDotV2} aria-hidden>
                            ·
                        </span>
                        Le Codex ligérien
                    </span>
                    <h1 className={styles.titleV2}>{active.title}</h1>
                </div>
            </div>
            {indexes.length > 1 && (
                <nav className={styles.navV2} aria-label="Index du Codex">
                    {indexes.map((i) => {
                        const isActive = i.href === current;
                        return (
                            <Link
                                key={i.href}
                                href={i.href}
                                className={styles.navBtnV2}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span className={styles.navEmojiV2} aria-hidden>
                                    {i.mark}
                                </span>
                                <span className={styles.navTextV2}>
                                    {i.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}

function IndexHeaderV3({
    current,
    active,
    indexes,
}: {
    current: IndexHref;
    active: IndexActive;
    indexes: readonly IndexEntry[];
}) {
    return (
        <header className={styles.headV3}>
            <div className={styles.brandV3}>
                <span className={styles.markBadgeV3} aria-hidden>
                    {active.mark}
                </span>
                <div className={styles.brandTextV3}>
                    <span className={styles.kickerV3}>
                        <span className={styles.kickerBarV3} aria-hidden />
                        Loire Ride Zen
                    </span>
                    <div className={styles.siteNameV3}>Le Codex ligérien</div>
                    <h1 className={styles.titleV3}>{active.title}</h1>
                </div>
            </div>
            {indexes.length > 1 && (
                <nav className={styles.navV3} aria-label="Index du Codex">
                    {indexes.map((i) => {
                        const isActive = i.href === current;
                        return (
                            <Link
                                key={i.href}
                                href={i.href}
                                className={styles.navBtnV3}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span className={styles.navEmojiV3} aria-hidden>
                                    {i.mark}
                                </span>
                                <span className={styles.navTextV3}>
                                    {i.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}

function IndexHeaderV4({
    current,
    active,
    indexes,
}: {
    current: IndexHref;
    active: IndexActive;
    indexes: readonly IndexEntry[];
}) {
    return (
        <header className={styles.headV4}>
            <div className={styles.brandV4}>
                <span className={styles.markBadgeV4} aria-hidden>
                    {active.mark}
                </span>
                <div className={styles.brandTextV4}>
                    <span className={styles.kickerV4}>
                        <span className={styles.kickerBarV4} aria-hidden />
                        Loire Ride Zen
                    </span>
                    <div className={styles.siteNameV4}>Le Codex ligérien</div>
                    <h1 className={styles.titleV4}>{active.title}</h1>
                </div>
            </div>
            {indexes.length > 1 && (
                <nav className={styles.navV4} aria-label="Index du Codex">
                    {indexes.map((i) => {
                        const isActive = i.href === current;
                        return (
                            <Link
                                key={i.href}
                                href={i.href}
                                className={styles.navBtnV4}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span className={styles.navEmojiV4} aria-hidden>
                                    {i.mark}
                                </span>
                                <span className={styles.navTextV4}>
                                    {i.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}

function IndexHeaderV5({
    current,
    active,
    indexes,
}: {
    current: IndexHref;
    active: IndexActive;
    indexes: readonly IndexEntry[];
}) {
    return (
        <header className={styles.headV5}>
            <div className={styles.brandV5}>
                <span
                    className={styles.markBadgeV5}
                    style={accentVar(active.accent)}
                    aria-hidden
                >
                    {active.mark}
                </span>
                <div className={styles.brandTextV5}>
                    <span className={styles.identityV5}>
                        <span
                            className={styles.kickerBarV5}
                            style={accentVar(active.accent)}
                            aria-hidden
                        />
                        <span
                            className={styles.brandNameV5}
                            style={accentVar(active.accent)}
                        >
                            Loire Ride Zen
                        </span>
                        <span className={styles.identitySepV5} aria-hidden>
                            ·
                        </span>
                        <Link href="/" className={styles.siteNameV5}>
                            Le Codex ligérien
                        </Link>
                    </span>
                    <h1 className={styles.titleV5}>{active.title}</h1>
                </div>
            </div>
            {indexes.length > 1 && (
                <nav className={styles.navV5} aria-label="Index du Codex">
                    {indexes.map((i) => {
                        const isActive = i.href === current;
                        return (
                            <Link
                                key={i.href}
                                href={i.href}
                                className={styles.navBtnV5}
                                style={accentVar(i.accent)}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span className={styles.navEmojiV5} aria-hidden>
                                    {i.mark}
                                </span>
                                <span className={styles.navTextV5}>
                                    {i.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}

function accentVar(color: string): CSSProperties {
    return { "--accent": color } as CSSProperties;
}
