import Link from "next/link";
import { LRZSymbol } from "@/components/LRZSymbol";
import type { IndexEntry } from "@/registry/indexes";
import { featureIsEnabled } from "@/registry/feature-flags";
import { isLRZCodexIndexSymbolSlug } from "@/registry/symbols";

export default function HomeContent({
    indexes,
}: {
    indexes: readonly IndexEntry[];
}) {
    const indexesCustomEmojiEnabled = featureIsEnabled("indexesCustomEmoji");

    return (
        <nav
            className="mt-10 grid gap-4"
            aria-label="Explorer les index du Codex"
        >
            {indexes.map((entry) => (
                <Link
                    key={entry.href}
                    href={entry.href}
                    className="group flex items-center gap-4 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--color-ambiance-surface)] p-5 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-[#c8893a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8893a]"
                >
                    {indexesCustomEmojiEnabled &&
                    isLRZCodexIndexSymbolSlug(entry.slug) ? (
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
                    <span className="min-w-0 flex-1">
                        <span className="mt-0.5 block font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-[var(--color-ambiance-texte-primaire)]">
                            {entry.title}
                        </span>
                        <span className="mt-1 block text-[13px] leading-snug text-[var(--color-ambiance-texte-secondaire)]">
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
        </nav>
    );
}
