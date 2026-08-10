import styles from "./DocMarkdownSyntax.module.css";

type DocMarkdownSyntaxProps = {
    code: string;
    description: string;
    note?: string;
    title: string;
};

/** Rend la syntaxe source à écrire dans un fichier Markdown ou MDX. */
export default function DocMarkdownSyntax({
    code,
    description,
    note,
    title,
}: DocMarkdownSyntaxProps) {
    return (
        <section
            className={styles.root}
            aria-label={`Syntaxe Markdown · ${title}`}
        >
            <header className={styles.header}>
                <p className={styles.kicker}>Syntaxe Markdown</p>
                <h2>{title}</h2>
                <p>{description}</p>
            </header>

            <pre className={styles.code}>
                <code>{code}</code>
            </pre>

            {note ? <p className={styles.note}>{note}</p> : null}
        </section>
    );
}
