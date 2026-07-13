import ReactMarkdown from "react-markdown";
import styles from "./IndexPresentation.module.css";
import { CSSProperties } from "react";
import { getIndex, IndexEntry, IndexHref } from "@/registry/indexes";

export default function IndexPresentation({
    description,
    children,
    current,
    indexes,
}: {
    /** Phrase d'accroche, affichée en tête avec lettrine. */
    description: string;
    /** Texte développé au format Markdown, sous l'accroche. */
    children: string;
    current: IndexHref;
    indexes: readonly IndexEntry[];
}) {
    const active = getIndex(current) ?? indexes[0];
    return (
        <section className={styles.presentation} aria-label="Présentation">
            <span
                className={styles.rule}
                style={accentVar(active.accent)}
                aria-hidden
            />
            <p className={styles.lead} style={accentVar(active.accent)}>
                {description}
            </p>
            <div className={styles.text}>
                <ReactMarkdown>{children}</ReactMarkdown>
            </div>
        </section>
    );
}

function accentVar(color: string): CSSProperties {
    return { "--accent": color } as CSSProperties;
}
