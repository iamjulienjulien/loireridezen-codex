"use client";

import Link from "next/link";
import IndexFooter from "@/components/IndexFooter";
import { useAmbiance } from "@/hooks/useAmbiance";
import type { IndexEntry } from "@/registry/indexes";
import styles from "./HomeContent.module.css";

export default function HomeContent({
    indexes,
    showDevelopmentTools,
}: {
    indexes: readonly IndexEntry[];
    showDevelopmentTools: boolean;
}) {
    const [ambiance, setAmbiance] = useAmbiance();

    return (
        <main
            className={`${styles.page} flex min-h-dvh items-center justify-center px-6 py-16`}
        >
            <div className={`${styles.content} w-full max-w-xl text-center`}>
                <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#a87029]">
                    Loire Ride Zen
                </p>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight sm:text-5xl">
                    Le Codex ligérien
                </h1>
                <p className="mt-5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    Explorer, observer, raconter la Loire.
                </p>

                <div className="mx-auto mt-8 h-px w-24 bg-[#c8893a]/50" />

                <div className="mt-10 grid gap-4">
                    {indexes.map((entry) => (
                        <Link
                            key={entry.href}
                            href={entry.href}
                            className="group flex items-center gap-4 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-[#c8893a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8893a]"
                        >
                            <span
                                aria-hidden
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[var(--gold-soft)] text-2xl"
                            >
                                {entry.mark}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="mt-0.5 block font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-[var(--text-primary)]">
                                    {entry.title}
                                </span>
                                <span className="mt-1 block text-[13px] leading-snug text-[var(--text-secondary)]">
                                    {entry.description}
                                </span>
                            </span>
                            <span
                                aria-hidden
                                className="shrink-0 text-[#c8893a] transition-transform group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>
                    ))}
                </div>

                {showDevelopmentTools && (
                    <Link
                        href="/atelier"
                        className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--text-tertiary)] transition-colors hover:text-[#c8893a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8893a]"
                    >
                        <span aria-hidden>✎</span>
                        Atelier — esquisses de composants
                    </Link>
                )}

                <IndexFooter ambiance={ambiance} onAmbiance={setAmbiance}>
                    Le Codex Ligérien · Loire Ride Zen
                </IndexFooter>
            </div>
        </main>
    );
}
