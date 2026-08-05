"use client";

import Image from "next/image";
import Link from "next/link";
import PageFooter from "@/components/PageFooter";
import type { IndexEntry } from "@/registry/indexes";
import { featureIsEnabled } from "@/registry/feature-flags";
import styles from "./HomeContent.module.css";
import LRZLivingText from "@/components/LRZLivingText";

const INDEX_CUSTOM_EMOJI_SRC: Readonly<Record<string, string>> = {
    chateaux: "/symbols/symbol-chateaux.png",
    faune: "/symbols/symbol-faune.png",
    flore: "/symbols/symbol-flore.png",
    guinguettes: "/symbols/symbol-guinguettes.png",
};

export default function HomeContent({
    indexes,
}: {
    indexes: readonly IndexEntry[];
}) {
    const indexesCustomEmojiEnabled = featureIsEnabled("indexesCustomEmoji");

    return (
        <main
            className={`${styles.page} flex min-h-dvh items-center justify-center px-6 py-16`}
        >
            <div className={`${styles.content} w-full max-w-xl text-center`}>
                <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#a87029]">
                    Loire Ride Zen
                </p>
                <div className="mt-4">
                    <LRZLivingText.ScrambleText
                        preset="heading-1"
                        as="h1"
                        speed={130}
                        align="center"
                        size="4xl"
                        preserveSpaces
                        color="blanc"
                        characterSet="ucfirst"
                    >
                        Le Codex Ligérien
                    </LRZLivingText.ScrambleText>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ambiance-texte-secondaire)]">
                    Explorer, observer, raconter la Loire.
                </p>

                <div className="mx-auto mt-8 h-px w-24 bg-[#c8893a]/50" />

                <div className="mt-10 grid gap-4">
                    {indexes.map((entry) => {
                        const customEmojiSrc =
                            INDEX_CUSTOM_EMOJI_SRC[entry.slug];

                        return (
                            <Link
                                key={entry.href}
                                href={entry.href}
                                className="group flex items-center gap-4 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--color-ambiance-surface)] p-5 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-[#c8893a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8893a]"
                            >
                                <span
                                    aria-hidden
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[var(--gold-soft)] text-2xl"
                                >
                                    {indexesCustomEmojiEnabled &&
                                    customEmojiSrc ? (
                                        <Image
                                            src={customEmojiSrc}
                                            width={40}
                                            height={40}
                                            alt=""
                                        />
                                    ) : (
                                        entry.mark
                                    )}
                                </span>
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
                        );
                    })}
                </div>

                <PageFooter spacing="relaxed" signatureSpacing="none" />
            </div>
        </main>
    );
}
