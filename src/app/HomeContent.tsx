import type { CSSProperties } from "react";
import { TrackedIndexLink } from "@/components/_layout/AnalyticsTracking";
import { LRZSymbol } from "@/components/_ui/LRZSymbol";
import { INDEX_UNIVERSES, type IndexEntry } from "@/registry/indexes";
import { isLRZCodexIndexSymbolSlug } from "@/registry/symbols";

export default function HomeContent({
    indexes,
}: {
    indexes: readonly IndexEntry[];
}) {
    const visibleUniverses = INDEX_UNIVERSES.map((universe) => ({
        ...universe,
        indexes: indexes.filter((index) => index.universe === universe.slug),
    })).filter((universe) => universe.indexes.length > 0);

    return (
        <nav
            className="mt-10 grid gap-8"
            aria-label="Explorer les index du Codex"
        >
            {visibleUniverses.map((universe) => {
                const headingId = `home-universe-${universe.slug}`;

                return (
                    <section
                        key={universe.slug}
                        aria-labelledby={headingId}
                        data-index-universe={universe.slug}
                    >
                        <h2
                            id={headingId}
                            className="px-1 font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-[var(--color-ambiance-texte-primaire)]"
                        >
                            {universe.title}
                        </h2>

                        <div className="mt-3 grid gap-4">
                            {universe.indexes.map((entry) => (
                                <HomeIndexLink key={entry.href} entry={entry} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </nav>
    );
}

function HomeIndexLink({ entry }: { entry: IndexEntry }) {
    const isPreview = !entry.env.includes("production");

    return (
        <TrackedIndexLink
            href={entry.href}
            indexSlug={entry.slug}
            source="home"
            data-index-format={entry.format}
            data-index-availability={isPreview ? "preview" : "published"}
            style={
                {
                    "--index-accent": entry.accent,
                } as CSSProperties
            }
            className={`group flex items-center gap-4 rounded-[10px] border bg-[var(--color-ambiance-surface)] p-5 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--index-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--index-accent)] ${
                isPreview
                    ? "border-dashed border-[var(--index-accent)]"
                    : "border-solid border-[var(--border-subtle)]"
            }`}
        >
            {isLRZCodexIndexSymbolSlug(entry.slug) ? (
                <LRZSymbol
                    collection="codex"
                    meta="index"
                    slug={entry.slug}
                    size="lg"
                    frame="subtle"
                    shape="rounded"
                    padding="sm"
                    decorative
                />
            ) : (
                <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[var(--gold-soft)] text-2xl"
                >
                    {entry.mark}
                </span>
            )}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="mt-0.5 font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-[var(--color-ambiance-texte-primaire)]">
                        {entry.title}
                    </h3>
                    {isPreview ? (
                        <span className="rounded-full border border-dashed border-[var(--index-accent)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[8px] font-semibold uppercase tracking-[0.1em] text-[var(--index-accent)]">
                            En préparation
                        </span>
                    ) : null}
                </div>
                <p className="mt-1 text-[13px] leading-snug text-[var(--color-ambiance-texte-secondaire)]">
                    {entry.description}
                </p>
            </div>
            <span
                aria-hidden
                className="shrink-0 text-[#c8893a] transition-transform group-hover:translate-x-1"
            >
                →
            </span>
        </TrackedIndexLink>
    );
}
