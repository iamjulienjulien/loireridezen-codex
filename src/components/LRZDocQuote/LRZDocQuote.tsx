import {
    type ComponentPropsWithoutRef,
    type ReactNode,
} from "react";

import styles from "./LRZDocQuote.module.css";

export type LRZDocQuoteVariant =
    | "default"
    | "highlight"
    | "fieldNote"
    | "testimonial";

export type LRZDocQuoteProps = Omit<
    ComponentPropsWithoutRef<"blockquote">,
    "children" | "cite"
> & {
    /** Contenu principal de la citation. */
    children: ReactNode;

    /** Présentation éditoriale de la citation. */
    variant?: LRZDocQuoteVariant;

    /** Auteur ou origine humaine de la citation. */
    author?: ReactNode;

    /** Ouvrage, page, lieu, date ou contexte de la citation. */
    source?: ReactNode;

    /** URL sémantique associée à la source. */
    cite?: string;

    /** Petit libellé affiché au-dessus du contenu. */
    label?: ReactNode;
};

export default function LRZDocQuote({
    children,
    variant = "default",
    author,
    source,
    cite,
    label,
    className,
    ...props
}: LRZDocQuoteProps) {
    const hasAttribution = Boolean(author || source);

    return (
        <figure
            className={[styles.root, className]
                .filter(Boolean)
                .join(" ")}
            data-variant={variant}
        >
            <blockquote
                {...props}
                cite={cite}
                className={styles.quote}
            >
                {label ? (
                    <span className={styles.label}>{label}</span>
                ) : null}

                <span
                    className={styles.mark}
                    aria-hidden="true"
                >
                    “
                </span>

                <div className={styles.content}>{children}</div>
            </blockquote>

            {hasAttribution ? (
                <figcaption className={styles.caption}>
                    <span
                        className={styles.rule}
                        aria-hidden="true"
                    />

                    <span className={styles.attribution}>
                        {author ? (
                            <span className={styles.author}>
                                {author}
                            </span>
                        ) : null}

                        {author && source ? (
                            <span
                                className={styles.separator}
                                aria-hidden="true"
                            >
                                ·
                            </span>
                        ) : null}

                        {source ? (
                            <cite className={styles.source}>
                                {source}
                            </cite>
                        ) : null}
                    </span>
                </figcaption>
            ) : null}
        </figure>
    );
}
