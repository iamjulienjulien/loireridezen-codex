import type { ReactNode } from "react";
import Link from "next/link";

import styles from "./CollectionOutro.module.css";

export type CollectionOutroProps = {
    note: ReactNode;
    href: string;
    mark?: ReactNode;
    linkLabel?: string;
    className?: string;
};

export default function CollectionOutro({
    note,
    href,
    mark,
    linkLabel = "Retour à l’index",
    className,
}: CollectionOutroProps) {
    return (
        <aside
            className={[styles.outro, className].filter(Boolean).join(" ")}
            aria-label="Fin de la collection"
            data-collection-outro=""
        >
            {mark ? (
                <span className={styles.mark} aria-hidden="true">
                    {mark}
                </span>
            ) : null}
            <p className={styles.copy}>{note}</p>
            <Link className={styles.link} href={href}>
                {linkLabel} <span aria-hidden="true">→</span>
            </Link>
        </aside>
    );
}
