"use client";

import { useEffect, useState } from "react";
import styles from "./atelier.module.css";

export type TocItem = { id: string; label: string };

export default function TableOfContents({ items }: { items: TocItem[] }) {
    const [active, setActive] = useState(items[0]?.id ?? "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    setActive(visible[0].target.id);
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
        );
        for (const it of items) {
            const el = document.getElementById(it.id);
            if (el) observer.observe(el);
        }
        return () => observer.disconnect();
    }, [items]);

    const go = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setActive(id);
        }
    };

    return (
        <nav className={styles.toc} aria-label="Sommaire">
            <span className={styles.tocTitle}>Sommaire</span>
            <ul className={styles.tocList}>
                {items.map((it) => {
                    const isActive = active === it.id;
                    return (
                        <li key={it.id}>
                            <a
                                href={`#${it.id}`}
                                onClick={(e) => go(e, it.id)}
                                className={`${styles.tocLink} ${isActive ? styles.tocActive : ""}`}
                                aria-current={isActive ? "true" : undefined}
                            >
                                <span className={styles.tocDot} aria-hidden />
                                {it.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
